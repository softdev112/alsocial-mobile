import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Button } from "common/buttons";
import R from "res/R";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { NormalText, BoldText, ContentView } from "common/themed";

class ConfirmFollowRequest extends Component {
    state = {
        isFollower: false,
        isConfirming: false,
        isDeleting: false,
    };

    constructor(props) {
        super(props);
        const { userId } = props;
        const followStatus = userObservables.modules.following.getFollowStatus(userId);
        const isFollower = followStatus && followStatus.follower === "request";
        const isConfirming = userObservables.modules.followRequest.isConfirming(userId);
        const isDeleting = userObservables.modules.followRequest.isDeleting(userId);

        this.state = {
            isFollower,
            isConfirming,
            isDeleting,
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
        const { subscriptions } = this.props;
        subscriptions.push(
            userObservables.subjects.followingSubject$.subscribe(
                ({ userId, followStatus, status }) => {
                    if (userId !== this.props.userId) {
                        return;
                    }
                    if (status === userObservables.constants.SUCCESS) {
                        this.setState({ isFollower: followStatus?.follower === "request" });
                    }
                },
            ),
        );
        subscriptions.push(
            userObservables.subjects.confirmingFollowRequestSubject$.subscribe(
                ({ userId, status }) => {
                    if (userId !== this.props.userId) {
                        return;
                    }
                    if (status === userObservables.constants.LOADING) {
                        this.setState({
                            isConfirming: true,
                        });
                    } else {
                        this.setState({
                            isConfirming: false,
                            isFollower: status === userObservables.constants.SUCCESS,
                        });
                    }
                },
            ),
        );

        subscriptions.push(
            userObservables.subjects.deletingFollowRequestSubject$.subscribe(
                ({ userId, status }) => {
                    if (userId !== this.props.userId) {
                        return;
                    }
                    if (status === userObservables.constants.LOADING) {
                        this.setState({
                            isDeleting: true,
                        });
                    } else {
                        this.setState({
                            isDeleting: false,
                            isFollower: status === userObservables.constants.SUCCESS,
                        });
                    }
                },
            ),
        );
    };

    _onPressConfirm = () => {
        const { acceptFollow, userId } = this.props;
        acceptFollow({ userId, action: R.strings.button.followRequested });
    };
    _onPressDelete = () => {
        const { rejectFollow, userId } = this.props;
        rejectFollow({ userId, action: R.strings.button.followRejected });
    };
    // Render any loading content that you like here
    render() {
        const { isFollower, isConfirming, isDeleting } = this.state;
        if (!isFollower) {
            return null;
        }

        const { username } = this.props;
        return (
            <ContentView style={styles.container}>
                <NormalText>
                    <BoldText>{username}</BoldText>
                    {` wants to follow you:`}
                </NormalText>
                <View style={styles.actionContainer}>
                    <Button
                        label={"Confirm"}
                        onPress={this._onPressConfirm}
                        disabled={isDeleting}
                        isLoading={isConfirming}
                    />
                    <View style={R.palette.space.left} />
                    <Button
                        label={"Delete"}
                        onPress={this._onPressDelete}
                        disabled={isConfirming}
                        isLoading={isDeleting}
                        type={"outline"}
                    />
                </View>
            </ContentView>
        );
    }
}

ConfirmFollowRequest.propTypes = {
    userId: PropTypes.string,
    username: PropTypes.string,
};

// export default ProfileHeader;
export default withObservableStream({})(ConfirmFollowRequest);
