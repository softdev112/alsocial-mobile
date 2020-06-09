import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import R from "res/R";
import Button from "../Button";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { isEqual } from "lodash";

class FollowButton extends Component {
    state = {
        isLoading: false,
        followStatus: null,
        isShow: true,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextState.isLoading !== this.state.isLoading ||
            !isEqual(nextState.followStatus, this.state.followStatus)
        );
    }

    constructor(props) {
        super(props);
        const { userId, fetchable, isShow, followStatus } = props;
        this.state = {
            isShow,
            isLoading: userObservables.modules.following.isLoading(userId),
            followStatus: followStatus
                ? followStatus
                : fetchable
                ? userObservables.modules.following.getFollowStatus(userId)
                : { following: false, follower: false },
        };
    }
    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions, userId: id } = this.props;
        subscriptions.push(
            userObservables.subjects.followingSubject$.subscribe(
                ({ userId, followStatus, status }) => {
                    if (userId !== id) {
                        return;
                    }
                    if (status === userObservables.constants.LOADING) {
                        this.setState({ isLoading: true });
                    } else if (status === userObservables.constants.SUCCESS) {
                        this.setState({
                            followStatus,
                            isLoading: false,
                            isShow: this.state.isShow || followStatus.following !== "follow",
                        });
                    } else {
                        this.setState({ isLoading: false });
                    }
                },
            ),
        );
    };

    _onPress = () => {
        const { updateFollowingStatus, userId, feedType, activity } = this.props;
        const { followStatus } = this.state;
        const isRequested = followStatus && followStatus.following === "request";
        const isBlocked = followStatus && followStatus.following === "block";
        const isFollowing = followStatus && followStatus.following === "follow";

        updateFollowingStatus({
            userId,
            action:
                isFollowing || isRequested
                    ? R.strings.button.follow
                    : isBlocked
                    ? R.strings.button.unblock
                    : R.strings.button.following,
            type: feedType,
            activity,
        });
    };

    render() {
        const {
            buttonStyle,
            textStyle,
            buttonHeight,
            loadingIndicatorColor,
            isSuggestions,
            type,
            size,
            style,
        } = this.props;
        const { isLoading, followStatus, isShow } = this.state;
        const isRequested = followStatus && followStatus.following === "request";
        const isBlocked = followStatus && followStatus.following === "block";
        const isFollowing = followStatus && followStatus.following === "follow";
        const isRejected = followStatus && followStatus.follower === "block";

        return (
            isShow && (
                <Button
                    label={
                        isBlocked
                            ? R.strings.button.unblock
                            : isRejected
                            ? R.strings.button.blocked
                            : isRequested
                            ? isSuggestions
                                ? R.strings.button.requested
                                : R.strings.button.followRequested
                            : isFollowing
                            ? R.strings.button.following
                            : R.strings.button.follow
                    }
                    textStyle={textStyle}
                    disabled={followStatus === null || isRejected}
                    isLoading={isLoading}
                    onPress={this._onPress}
                    size={size}
                    type={type}
                    style={style}
                    indicatorColor={loadingIndicatorColor}
                />
            )
        );
    }
}

FollowButton.propTypes = {
    userId: PropTypes.string,
    buttonStyle: PropTypes.object,
    buttonHeight: PropTypes.number,
    loadingIndicatorColor: PropTypes.string,
    textStyle: PropTypes.object,
    updateFollowingStatus: PropTypes.func,
    isSuggestions: PropTypes.bool,
    fetchable: PropTypes.bool,
    followStatus: PropTypes.object,
    isShow: PropTypes.bool,
    feedType: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
};

FollowButton.defaultProps = {
    buttonStyle: {},
    textStyle: {},
    buttonHeight: R.dimensions.button.height.normal,
    loadingIndicatorColor: R.colors.teal,
    isSuggestions: false,
    fetchable: false,
    followStatus: null,
    isShow: true,
    size: "normal",
    type: "button",
};

export default withObservableStream({})(FollowButton);
