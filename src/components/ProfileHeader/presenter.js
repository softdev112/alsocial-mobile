import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import PropTypes from "prop-types";
import { LocationIcon, LinkMiniIcon } from "res/icons";
import { styles, AvatarImageWrap, MetaArea, Meta, MetaText } from "./styles";
import R from "res/R";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { merge } from "rxjs";
import ConfirmFollowRequest from "./ConfirmFollowRequest";
import _ from "lodash";
import { CountsLabel } from "common/labels";
import { Button, FollowButton, BlockButton } from "common/buttons";
import { ModalImages } from "common/modals";
import { MoreText } from "common/views";
import { CoverImage } from "common/images";
import { ContentView, BoldText, DescriptionText } from "common/themed";
import { withTheme } from "styled-components";

class ProfileHeader extends Component {
    _coverModalRef: ?ModalImages = null;
    _avatarModalRef: ?ModalImages = null;

    state = {
        isOwner: false,
    };

    constructor(props) {
        super(props);
        const { user, owner } = props;
        const data = user.data ? user.data : user;
        const isOwner = owner._id === data._id;
        this.state = {
            isOwner,
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        const { isOwner } = this.state;
        return (
            (isOwner && !_.isEqual(nextProps.owner, this.props.owner)) ||
            (!isOwner && !_.isEqual(nextProps.user, this.props.user)) ||
            nextProps.theme.type !== this.props.theme.type
        );
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this._coverModalRef = null;
        this._avatarModalRef = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            merge(
                userObservables.subjects.updateAccountSubject$,
                userObservables.subjects.updateProfileSubject$,
            ).subscribe(status => {
                if (this.state.isOwner && status === userObservables.constants.SUCCESS) {
                    this.forceUpdate();
                }
            }),
        );
    };

    _onPressFollowers = () => {
        const { user, toFollower } = this.props;
        if (user?.followers_count) {
            toFollower({ routeName: Main.Follow, params: { type: "Followers", id: user._id } });
        }
    };

    _onPressFollowings = () => {
        const { user, toFollowing } = this.props;
        if (user?.following_count) {
            toFollowing({ routeName: Main.Follow, params: { type: "Following", id: user._id } });
        }
    };

    _onPressWebsite = website => {
        Linking.openURL(website);
    };

    // Render any loading content that you like here
    render() {
        const { user, owner, theme } = this.props;
        const data = user.data ? user.data : user;
        const actor = owner._id === data._id ? owner : data;
        const {
            _id,
            coverImage,
            profileImage,
            username,
            name,
            bio,
            followers_count,
            following_count,
            location,
            website,
        } = actor;
        const formatWebsite = (!/https:?:\/\//.test(website)
            ? `https://${website}`
            : website
        ).trim();
        return (
            <ContentView>
                <ConfirmFollowRequest userId={_id} username={username} />
                <CoverImage
                    uri={coverImage}
                    onPress={() => {
                        if (this._coverModalRef && coverImage && !!coverImage.length) {
                            this._coverModalRef.openModal();
                        }
                    }}
                />
                <AvatarImageWrap
                    size={R.dimensions.image.avatar.profile}
                    actor={actor}
                    actorId={_id}
                    onPress={() => {
                        if (this._avatarModalRef && profileImage && !!profileImage.length) {
                            this._avatarModalRef.openModal();
                        }
                    }}
                    borderColor={R.colors.white}
                    borderWidth={5}
                />
                <View style={[styles.actionWrapper, styles.actionMargin]}>
                    {username ? (
                        owner._id === _id ? (
                            <View style={styles.actionWrapper}>
                                <Button
                                    label={R.strings.button.editProfile}
                                    onPress={() => NavigationService.navigate(Main.EditProfile)}
                                    size='large'
                                    type='outline'
                                />
                            </View>
                        ) : (
                            <View style={styles.actionWrapper}>
                                <FollowButton
                                    userId={_id}
                                    fetchable={true}
                                    size='large'
                                    type='outline'
                                />
                                <BlockButton
                                    userId={_id}
                                    username={username}
                                    style={{ marginLeft: 10 }}
                                />
                            </View>
                        )
                    ) : null}
                </View>
                <View style={styles.content}>
                    <BoldText style={{ fontSize: R.dimensions.text.username.large }}>
                        {username}
                    </BoldText>
                    <DescriptionText style={{ fontSize: R.dimensions.text.large }}>
                        {name}
                    </DescriptionText>
                    <View style={styles.space}>
                        <View style={styles.followWrapper}>
                            <CountsLabel
                                onPress={this._onPressFollowers}
                                counts={followers_count}
                                label={"Followers"}
                                isShow={true}
                                hasSuffix={false}
                                countStyle={{ fontFamily: R.fonts.Bold }}
                                textStyle={{ color: theme.color.text, fontFamily: R.fonts.Normal }}
                            />
                            <CountsLabel
                                onPress={this._onPressFollowings}
                                counts={following_count}
                                label={"Following"}
                                style={R.palette.space.left}
                                isShow={true}
                                hasSuffix={false}
                                countStyle={{ fontFamily: R.fonts.Bold }}
                                textStyle={{ color: theme.color.text, fontFamily: R.fonts.Normal }}
                            />
                        </View>
                    </View>
                    {bio ? (
                        <View style={styles.space}>
                            <MoreText text={bio.trim()} isMore={false} isBio={true} user={user} />
                        </View>
                    ) : null}
                    {location || website ? (
                        <MetaArea>
                            {location ? (
                                <Meta marginRight={10}>
                                    <LocationIcon />
                                    <MetaText
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                    >{`${location} `}</MetaText>
                                </Meta>
                            ) : null}
                            {website ? (
                                <Meta style={styles.metaItem}>
                                    <LinkMiniIcon />
                                    <MetaText
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        onPress={() => this._onPressWebsite(formatWebsite)}
                                        color={R.colors.teal}
                                    >
                                        {formatWebsite}
                                    </MetaText>
                                </Meta>
                            ) : null}
                        </MetaArea>
                    ) : null}
                </View>
                <ModalImages
                    onRef={ref => (this._avatarModalRef = ref)}
                    images={[profileImage]}
                    showIndicator={false}
                />
                <ModalImages
                    onRef={ref => (this._coverModalRef = ref)}
                    images={[coverImage]}
                    showIndicator={false}
                />
            </ContentView>
        );
    }
}

ProfileHeader.propTypes = {
    user: PropTypes.object,
};

export default withObservableStream({})(withTheme(ProfileHeader));
