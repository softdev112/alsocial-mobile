import React, { Component } from "react";
import PropTypes from "prop-types";
import R from "res/R";
import IconButton from "../IconButton";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { EllipsisIcon } from "res/icons";
import { withTheme } from "styled-components";
import { withBottomSheet } from "components/BottomSheet";

class BlockButton extends Component {
    state = {
        isLoading: false,
        isBlocked: false,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextState.isLoading !== this.state.isLoading ||
            nextState.isBlocked !== this.state.isBlocked
        );
    }

    constructor(props) {
        super(props);
        const { userId } = props;
        const followStatus = userObservables.modules.following.getFollowStatus(userId);
        this.state = {
            isLoading: userObservables.modules.following.isLoading(userId),
            isBlocked: followStatus && followStatus.following === "block",
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
                    if (status === userObservables.constants.LOADING) {
                        this.setState({ isLoading: true });
                    } else if (status === userObservables.constants.SUCCESS) {
                        this.setState({
                            isBlocked: followStatus?.following === "block",
                            isLoading: false,
                        });
                    } else {
                        this.setState({ isLoading: false });
                    }
                },
            ),
        );
    };

    _onPress = () => {
        const { updateFollowingStatus, userId, username } = this.props;
        const options = this.state.isBlocked
            ? [`${R.strings.button.unblock} ${username}`, "Cancel"]
            : [`${R.strings.button.block} ${username}`, "Cancel"];
        const cancelButtonIndex = 1;
        const { showBottomSheet } = this.props;

        showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    if (this.state.isBlocked) {
                        updateFollowingStatus({ userId, action: R.strings.button.unblock });
                    } else {
                        updateFollowingStatus({ userId, action: R.strings.button.block });
                    }
                }
            },
        );
    };

    render() {
        const { style, theme } = this.props;
        const { isLoading, isBlocked } = this.state;
        return (
            <IconButton
                icon={<EllipsisIcon fill={theme.color.dark} />}
                disabled={isLoading || isBlocked === null}
                onPress={this._onPress}
                style={style}
            />
        );
    }
}

BlockButton.propTypes = {
    userId: PropTypes.string,
    username: PropTypes.string,
    updateFollowingStatus: PropTypes.func,
    style: PropTypes.object,
};

BlockButton.defaultProps = {};

export default withObservableStream({})(withTheme(withBottomSheet(BlockButton)));
