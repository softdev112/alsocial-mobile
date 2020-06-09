import React, { Component } from "react";
import { View, Text } from "react-native";
import _, { uniqBy } from "lodash";
import { Subject } from "rxjs";
import { NavigationEvents } from "react-navigation";
import styles from "./styles";

import NavigationService from "service/Navigation";

import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import timelineObservables from "observable/timeline";

import { ActivityFeedItem, ActivityFeedScreen, ProfileHeader, NotExistUser } from "components";

import { TabButton } from "common/buttons";
import { NavigationBar } from "common/views";
import { SeparatorView, ContentView, DescriptionText, BoldText } from "common/themed";

import { Main } from "utils/navigation";

import { EllipsisIcon, LockIcon } from "res/icons";
import { IconWrap } from "common/icons";

import R from "res/R";

const FeedType = {
    post: "user",
    like: "like",
};
class UserProfileScreen extends Component {
    _feedRef: ?ActivityFeedScreen = null;

    _isLoadedPostFeeds = false;
    _postFeedState: Object = null;
    _likeFeedState: Object = null;
    _postNext = undefined;
    _likeNext = undefined;
    _isFocused = false;

    initialState = {
        user: null,
        hasBack: false,
        isLoadingFollow: true,
        isFollowing: false,
        isBlocked: false,
        isBlockedProfile: false,
        feedType: FeedType.post,
        isOwner: false,
        isPublic: true,
        mention: null,
        isExist: true,
    };

    _callbackSubject$ = new Subject();

    static getDerivedStateFromProps(props, state) {
        if (state.user && props.owner._id === state.user._id) {
            return {
                ...state,
                user: { ...state.user, ...props.owner },
            };
        }
        return state;
    }
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            (this.state.isOwner && !_.isEqual(nextProps.owner, nextState.user)) ||
            (!this.state.isOwner && !_.isEqual(nextProps.user, nextState.user)) ||
            this.state.isBlocked !== nextState.isBlocked ||
            this.state.isBlockedProfile !== nextState.isBlockedProfile ||
            this.state.isPublic !== nextState.isPublic ||
            this.state.isFollowing !== nextState.isFollowing
        );
    }

    constructor(props) {
        super(props);
        const { navigation, owner } = props;
        let profileId;
        let actor;
        let mention;
        let isOwner;
        if (navigation) {
            profileId = navigation.getParam("profileId", null);
            actor = navigation.getParam("actor", null);
            mention = navigation.getParam("mention", null);
            isOwner = (!mention && !profileId) || profileId === owner._id;
            if (mention) {
                isOwner = isOwner || mention === owner.username;
                if (isOwner) {
                    profileId = owner._id;
                    actor = owner;
                } else {
                    this.state = {
                        ...this.initialState,
                        mention,
                        feedType: FeedType.post,
                        hasBack: true,
                    };
                    return;
                }
            }
        } else {
            actor = props.actor;
            profileId = actor?.id;
        }

        const isLoadingFollow = profileId && userObservables.modules.following.isLoading(profileId);
        const followStatus =
            profileId && userObservables.modules.following.getFollowStatus(profileId);
        const isFollowing = followStatus && followStatus.following === "follow";
        const isBlocked = followStatus && followStatus.following === "block";
        const isBlockedProfile = followStatus && followStatus.follower === "block";
        const isPublic = typeof actor?.isPublic === "boolean" ? actor?.isPublic : true;

        if (profileId && profileId !== owner._id) {
            let data = actor?.data ? actor?.data : actor;
            if (data && data._id === profileId) {
                this.state = {
                    ...this.initialState,
                    user: { ...data, following_count: 0, followers_count: 0 },
                    hasBack: true,
                    feedType: FeedType.post,
                    isLoadingFollow,
                    isFollowing,
                    isBlocked,
                    isBlockedProfile,
                    isOwner,
                    isPublic,
                };
            } else {
                this.state = {
                    ...this.initialState,
                    user: {
                        _id: profileId,
                        username: "",
                        following_count: 0,
                        followers_count: 0,
                    },
                    hasBack: true,
                    feedType: FeedType.post,
                    isFollowing,
                    isBlocked,
                    isBlockedProfile,
                    isLoadingFollow,
                    isOwner,
                    isPublic,
                };
            }
        } else {
            this.state = {
                ...this.initialState,
                user: { ...owner },
                hasBack: !navigation,
                feedType: FeedType.post,
                isFollowing,
                isBlocked,
                isBlockedProfile,
                isLoadingFollow,
                isOwner: true,
                isPublic,
            };
        }
    }

    componentDidMount(): void {
        this._setupObservables();
        const { navigation, onRef } = this.props;
        if (navigation) {
            this.refocusSubscription = navigation.addListener("refocus", this.scrollToTop);
        }
        if (onRef) {
            onRef(this);
        }
    }

    componentWillUnmount(): void {
        this._feedRef = null;
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        if (this.refocusSubscription) {
            this.refocusSubscription.remove();
        }
    }

    scrollToTop = async ({ isFocused }: Object) => {
        if (isFocused && this._feedRef && this._feedRef._listRef) {
            this._feedRef._listRef.scrollToTop();
            const { callRefresh } = this.props;
            const {
                user: { _id },
                feedType,
            } = this.state;

            await callRefresh({
                callbackSubject: this._callbackSubject$,
                profileId: _id,
                feedGroup: feedType,
                isAvailableFeed: false,
            });
        }
    };

    _setupObservables = () => {
        const { subscriptions } = this.props;

        if (this.state.isOwner) {
            subscriptions.push(
                timelineObservables.subjects.newTimelineSubject$.subscribe(({ isOwn }) => {
                    if (isOwn && this._feedRef) {
                        const items = this._feedRef.getStates().items;
                        this.props.loadNewPostFeeds({
                            latestFeedId: items && !!items.length ? items[0].id : undefined,
                        });
                    }
                }),
            );

            subscriptions.push(
                userObservables.subjects.newFeedsSubject$.subscribe(
                    ({ newFeeds, next, status }) => {
                        if (!this._feedRef) {
                            return;
                        }

                        if (this.state.feedType === FeedType.post) {
                            if (status === userObservables.constants.LOADING) {
                                if (this._isFocused) {
                                    this._feedRef.refreshing();
                                }
                            } else if (status === userObservables.constants.SUCCESS && !!newFeeds) {
                                const hasMore = next && next !== "";
                                if (!this._isLoadedPostFeeds) {
                                    this._postNext = hasMore ? next : undefined;
                                }
                                this._feedRef.appendItems({ newItems: newFeeds, hasMore });
                                this._isLoadedPostFeeds = true;
                            } else {
                                this._feedRef.resetLoading();
                            }
                        } else {
                            if (status === userObservables.constants.LOADING) {
                                this._postFeedState.isRefreshing = true;
                            } else {
                                this._postFeedState.isRefreshing = false;
                                if (status === userObservables.constants.SUCCESS && !!newFeeds) {
                                    const hasMore = next && next !== "";
                                    if (!this._isLoadedPostFeeds) {
                                        this._postNext = hasMore ? next : undefined;
                                    }
                                    const { items, hasMoreItems } = this._postFeedState;
                                    this._postFeedState.items = uniqBy(
                                        [...newFeeds, ...items],
                                        "id",
                                    );
                                    this._postFeedState.hasMoreItems = !!items?.length
                                        ? hasMore
                                        : hasMoreItems;
                                    this._isLoadedPostFeeds = true;
                                }
                            }
                        }
                    },
                ),
            );
        }

        subscriptions.push(
            userObservables.subjects.followingSubject$.subscribe(
                ({ userId, followStatus, status }) => {
                    if (
                        this.state.user &&
                        userId === this.state.user._id &&
                        status === userObservables.constants.SUCCESS
                    ) {
                        const isFollowing = followStatus?.following === "follow";
                        const isBlocked = followStatus && followStatus.following === "block";
                        const isBlockedProfile = followStatus && followStatus.follower === "block";
                        this.setState({ isFollowing, isBlocked, isBlockedProfile });
                        this._likeFeedState = null;
                        this._postFeedState = null;
                        if (isFollowing) {
                            this._feedRef.onRefresh();
                        } else {
                            this._feedRef.updateItems(null, false);
                        }
                    }
                },
            ),
        );

        subscriptions.push(
            this._callbackSubject$.subscribe(
                ({
                    loading,
                    cancelled,
                    next,
                    profile,
                    feeds,
                    feedNext,
                    profileId,
                    error,
                    isAvailableFeed,
                }) => {
                    if (!this._feedRef) {
                        return;
                    }

                    if (error || cancelled) {
                        if (error) {
                            this.setState({ isExist: false });
                        } else {
                            this._feedRef.resetLoading();
                        }
                    } else if (loading) {
                        if (next) {
                            this._feedRef.loadingMore();
                        }
                    } else if (profile) {
                        this._setUserProfile(profile);
                        if (!isAvailableFeed) {
                            this._feedRef.resetLoading();
                        }
                    } else if (feeds) {
                        const hasMore = feedNext && feedNext !== "";
                        this._feedRef.setItems(
                            next === null || next === undefined,
                            feeds,
                            error,
                            hasMore,
                        );
                        if (this.state.feedType === FeedType.post) {
                            this._isLoadedPostFeeds = true;
                            this._postNext = hasMore ? feedNext : undefined;
                        } else {
                            this._likeNext = hasMore ? feedNext : undefined;
                        }
                    }
                },
            ),
        );
    };

    isAvailableFeed = () => {
        const { isFollowing, isBlocked, isBlockedProfile, isOwner, isPublic } = this.state;
        return !(!isOwner && (isBlocked || isBlockedProfile || (!isPublic && !isFollowing)));
    };

    _setUserProfile = async results => {
        const { user } = this.state;
        const { _id: profileId } = results;

        const isLoadingFollow = userObservables.modules.following.isLoading(profileId);
        const followStatus = userObservables.modules.following.getFollowStatus(profileId);
        const isFollowing = followStatus && followStatus.following === "follow";
        const isBlocked = followStatus && followStatus.following === "block";
        const isBlockedProfile = followStatus && followStatus.follower === "block";

        const isPublic = typeof results?.isPublic === "boolean" ? results?.isPublic : true;
        await this.setState({
            user: { ...user, ...results },
            isPublic,
            isLoadingFollow,
            isFollowing,
            isBlocked,
            isBlockedProfile,
        });
    };

    _onRefresh = async () => {
        const { callRefresh } = this.props;
        const { user, feedType, mention } = this.state;

        this._isLoadedPostFeeds = false;
        const isAvailableFeed = this.isAvailableFeed();
        await callRefresh({
            callbackSubject: this._callbackSubject$,
            profileId: user ? user._id : mention,
            feedGroup: feedType,
            isAvailableFeed,
        });
    };

    _onLoadMore = async () => {
        const isAvailableFeed = this.isAvailableFeed();
        if (!isAvailableFeed) {
            if (this._feedRef) {
                this._feedRef.resetLoading();
            }
            return;
        }

        const { feedType } = this.state;
        const next = feedType === FeedType.post ? this._postNext : this._likeNext;

        if (next === null || next === undefined) {
            if (this._feedRef) {
                this._feedRef.resetLoading();
            }
            return;
        }

        const { user } = this.state;
        if (!user) {
            if (this._feedRef) {
                this._feedRef.resetLoading();
            }
            return;
        }

        const { callLoadingMore } = this.props;
        await callLoadingMore({
            callbackSubject: this._callbackSubject$,
            profileId: user._id,
            feedGroup: feedType,
            isAvailableFeed,
            next,
        });
    };

    _renderNavigationBar = () => {
        const { user, hasBack, isOwner, mention } = this.state;
        return (
            <NavigationBar
                borderWidth={0}
                title={user ? user.username : mention}
                hasBackButton={hasBack}
                rightIcon={isOwner ? <IconWrap Icon={EllipsisIcon} /> : null}
                handleRight={() => (isOwner ? NavigationService.navigate(Main.Settings) : null)}
            />
        );
    };

    _changeTab = async type => {
        if (type === this.state.feedType) {
            return;
        }

        await this.setState({ feedType: type });

        const { isLoadingFollow, isFollowing, isOwner, isPublic, isBlocked } = this.state;
        if (!isOwner && (isBlocked || isLoadingFollow || (!isPublic && !isFollowing))) {
            return;
        }
        if (this._feedRef) {
            if (type === FeedType.post) {
                this._likeFeedState = this._feedRef.getStates();
                await this._feedRef.updateItems(this._postFeedState);
            } else {
                this._postFeedState = this._feedRef.getStates();
                await this._feedRef.updateItems(this._likeFeedState);
            }
        }
    };
    _renderHeader = () => {
        const { isOwner, user, feedType } = this.state;
        return user ? (
            <View style={styles.headerContainer}>
                <View>
                    <ProfileHeader user={user} />
                </View>
                {isOwner ? (
                    <View style={styles.tabContainer}>
                        <TabButton
                            title={"Posts"}
                            isActive={feedType === FeedType.post}
                            onPress={() => this._changeTab(FeedType.post)}
                        />
                        <TabButton
                            title={"Likes"}
                            isActive={feedType === FeedType.like}
                            onPress={() => this._changeTab(FeedType.like)}
                        />
                    </View>
                ) : (
                    <SeparatorView style={styles.tabContainer} />
                )}
            </View>
        ) : null;
    };
    _renderItem = ({ item, index }) => {
        const { user, feedType } = this.state;
        return !user || item.isDeleting ? null : (
            <ActivityFeedItem
                activity={item}
                keyValue={`profile-feed-${item.id}-${index}`}
                profileId={user._id}
                feedType={
                    feedType === FeedType.post
                        ? R.strings.feedType.profile
                        : R.strings.feedType.likes
                }
            />
        );
    };

    _renderFollowStatus = (title, description) => {
        return (
            <ContentView style={styles.blockContainer}>
                <LockIcon />
                <View style={R.palette.space.left}>
                    <BoldText>{title}</BoldText>
                    <DescriptionText>{description}</DescriptionText>
                </View>
            </ContentView>
        );
    };

    _renderBlockedProfile = () => {
        return (
            <ContentView style={styles.blockContainer}>
                <BoldText style={{ fontSize: 24 }}>Blocked Profile</BoldText>
            </ContentView>
        );
    };
    // Render any loading content that you like here
    render() {
        const {
            isFollowing,
            isBlocked,
            isBlockedProfile,
            isOwner,
            isPublic,
            isExist,
            feedType,
        } = this.state;
        if (!isExist) {
            return <NotExistUser />;
        }

        const ListFooterComponent =
            !isBlocked && !isBlockedProfile && (isOwner || isFollowing || isPublic)
                ? null
                : isBlocked
                ? this._renderFollowStatus(
                      "Blocked Profile",
                      "You have to unblock this account to see their profile",
                  )
                : isBlockedProfile
                ? this._renderBlockedProfile()
                : this._renderFollowStatus(
                      "This account is private.",
                      "Follow this account to see their posts",
                  );
        return (
            <>
                <NavigationEvents
                    onDidFocus={payload => (this._isFocused = true)}
                    onDidBlur={payload => (this._isFocused = false)}
                />
                <ActivityFeedScreen
                    onRef={ref => (this._feedRef = ref)}
                    renderNavigationBar={this._renderNavigationBar}
                    renderHeader={this._renderHeader}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    ListFooterComponent={ListFooterComponent}
                    noMoreText={R.strings.noMoreList.post}
                    feedType={
                        feedType === FeedType.post
                            ? R.strings.feedType.profile
                            : R.strings.feedType.likes
                    }
                />
            </>
        );
    }
}

export default withObservableStream({})(UserProfileScreen);
