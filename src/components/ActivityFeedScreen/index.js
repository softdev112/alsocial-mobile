import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LightFlatList } from "common/views";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";
import R from "res/R";
import { resetActivityFeed } from "models/activityFeed";
import _ from "lodash";
import MixpanelService from "service/Mixpanel";
import { capitalize } from "utils/helper";
import getFeedGroup from "utils/getFeedGroup";
import { ContainerView, SeparatorView } from "common/themed";

class ActivityFeedScreen extends PureComponent {
    _listRef: ?LightFlatList = null;
    state = { viewableItems: [] };

    componentDidMount(): void {
        this.props.onRef(this);
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this._listRef = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            activityObservables.subjects.deleteSubject$.subscribe(({ activity, status }) => {
                if (status === activityObservables.constants.LOADING) {
                    this._onRequestDeleteActivity(activity?.id);
                } else if (status === activityObservables.constants.SUCCESS) {
                    this._onDeleteActivitySuccess(activity?.id);
                } else if (status === activityObservables.constants.FAILURE) {
                    this._onDeleteActivityFailure(activity?.id);
                }
            }),
        );

        subscriptions.push(
            activityObservables.subjects.loadActivitySubject$.subscribe(
                ({ activityId, newActivity, status }) => {
                    if (status === activityObservables.constants.SUCCESS) {
                        if (!newActivity) {
                            this._onDeleteActivitySuccess(activityId);
                        }
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteRepostSubject$.subscribe(
                ({ activityId, repostId, status }) => {
                    if (status === activityObservables.constants.LOADING) {
                        this._onRequestDeleteRepostActivity(repostId);
                    } else if (status === activityObservables.constants.SUCCESS) {
                        this._onDeleteRepostActivitySuccess(repostId);
                    } else if (status === activityObservables.constants.FAILED) {
                        this._onDeleteRepostActivityFailure(repostId);
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.updateActivitySubject$.subscribe(async ({ status }) => {
                if (status === activityObservables.constants.SUCCESS) {
                    await this.onRefresh();
                }
            }),
        );

        subscriptions.push(
            activityObservables.subjects.updateRepostSubject$.subscribe(async ({ status }) => {
                if (status === activityObservables.constants.SUCCESS) {
                    await this.onRefresh();
                }
            }),
        );
    };

    _onRequestDeleteRepostActivity = repostId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deletingRepostItem(repostId);
    };

    _onDeleteRepostActivitySuccess = repostId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deleteRepostItem(repostId);
    };

    _onDeleteRepostActivityFailure = repostId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deletingRepostItemFailed(repostId);
    };

    _onRequestDeleteActivity = activityId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deletingActivityItem(activityId);
    };

    _onDeleteActivitySuccess = activityId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deleteActivityItem(activityId);
    };

    _onDeleteActivityFailure = activityId => {
        if (!this._listRef) {
            return;
        }
        this._listRef.deletingActivityItemFailed(activityId);
    };

    _checkLiking = items => {
        if (!items) {
            return [];
        }

        return items.filter(item => !item?.flagged).map(item => resetActivityFeed(item));
    };

    onRefresh = async () => {
        if (this._listRef) {
            await this._listRef._onRefresh();
        }
    };
    getStates = () => {
        if (this._listRef) {
            return this._listRef.getStates();
        }
        return null;
    };
    setItems = (isNew, results, error, hasMore = null) => {
        if (this._listRef) {
            this._listRef.setItems(isNew, this._checkLiking(results), error, hasMore);
        }
    };

    updateItems = (state, isRefresh = true) => {
        if (this._listRef) {
            this._listRef.updateItems(state, isRefresh);
        }
    };

    resetLoading = () => {
        if (this._listRef) {
            this._listRef.resetLoading();
        }
    };

    appendItems = ({ newItems, hasMore }) => {
        if (this._listRef) {
            this._listRef.appendItems({ newItems: this._checkLiking(newItems), hasMore });
        }
    };

    noMore = () => {
        if (this._listRef) {
            this._listRef.noMore();
        }
    };

    refreshing = () => {
        if (this._listRef) {
            this._listRef.refreshing();
        }
    };

    loadingMore = () => {
        if (this._listRef) {
            this._listRef.loadingMore();
        }
    };

    changeItem = async item => {
        if (this._listRef) {
            this._listRef.changeItem(item);
        }
    };

    _onViewableItemsChanged = async ({ viewableItems, changed }) => {
        if (viewableItems.length) {
            await this.setState(prevState => {
                const newItems = viewableItems
                    .filter(item => item?.item?.id !== R.strings.suggestions && item.isViewable)
                    .map(item => {
                        return {
                            id: item?.item?.id,
                            verb: item?.item?.verb,
                            actorId: item?.item?.actor?.id,
                        };
                    });

                activityObservables.modules.viewable.changedViewable(newItems.map(item => item.id));

                const { feedType } = this.props;
                viewableItems.forEach(item => {
                    if (item.item.id !== "Suggestions") {
                        const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                            item.item.attachments,
                        );

                        MixpanelService.trackEvent("impressions", {
                            second_post_type: item.verb === "post" ? "original posts" : "reposts",
                            third_media_type: item.verb === "repost" ? "NA" : mediaTypes,
                            fourth_media_provider: mediaProviders,
                            fifth_feed_type: getFeedGroup(feedType),
                            username: item.item.actor.data.username,
                            link: `allsocial.com/${item.item.actor.id}/${item.item.id}`,
                        });
                    }
                });
                return { viewableItems: { ...newItems } };
            });
        }
    };

    // Render any loading content that you like here
    render() {
        const {
            renderNavigationBar,
            renderHeader,
            onRef,
            noMoreText,
            emptyText,
            ...rest
        } = this.props;
        return (
            <ContainerView>
                {renderNavigationBar()}
                <LightFlatList
                    onRef={ref => (this._listRef = ref)}
                    limit={R.limits.activities}
                    noMoreText={noMoreText ? noMoreText : R.strings.noMoreList.activity}
                    ListHeaderComponent={renderHeader}
                    ItemSeparatorComponent={() => <SeparatorView />}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    orders={{ time: "desc" }}
                    {...rest}
                />
            </ContainerView>
        );
    }
}

ActivityFeedScreen.propTypes = {
    renderNavigationBar: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    feedType: PropTypes.string,
};

ActivityFeedScreen.defaultProps = {};

export default withObservableStream({})(ActivityFeedScreen);
