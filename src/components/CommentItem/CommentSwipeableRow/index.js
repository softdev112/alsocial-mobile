import React, { PureComponent } from "react";
import { Animated, View } from "react-native";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DeleteIcon, ReportIcon, ReplyIcon, EditIcon } from "res/icons";
import PropTypes from "prop-types";
import R from "res/R";

class CommentSwipeableRow extends PureComponent {
    renderRightAction = (index, x, progress) => {
        const { isOwn, onDelete, onReport, onReply, onEdit } = this.props;
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });

        const pressHandler = () => {
            this.close();
            if (index === 1) {
                if (isOwn) {
                    onDelete();
                } else {
                    onReport();
                }
            } else if (index === 2) {
                onReply();
            } else {
                onEdit();
            }
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[
                        styles.rightAction,
                        {
                            backgroundColor:
                                index === 3
                                    ? R.colors.teal
                                    : index === 2
                                    ? "#999999"
                                    : isOwn
                                    ? "#ed4855"
                                    : "#666666",
                        },
                    ]}
                    onPress={pressHandler}
                >
                    <View style={styles.icon}>
                        {index === 3 ? (
                            <EditIcon />
                        ) : index === 2 ? (
                            <ReplyIcon />
                        ) : isOwn ? (
                            <DeleteIcon />
                        ) : (
                            <ReportIcon />
                        )}
                    </View>
                </RectButton>
            </Animated.View>
        );
    };
    renderRightActions = progress => (
        <View style={{ width: this.props.isOwn ? 192 : 128, flexDirection: "row" }}>
            {this.props.isOwn ? this.renderRightAction(3, 192, progress) : null}
            {this.renderRightAction(1, 128, progress)}
            {this.renderRightAction(2, 64, progress)}
        </View>
    );
    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this._swipeableRow.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                rightThreshold={40}
                renderRightActions={this.renderRightActions}
            >
                {children}
            </Swipeable>
        );
    }
}

CommentSwipeableRow.propTypes = {
    isOwn: PropTypes.bool,
    onDelete: PropTypes.func,
    onReport: PropTypes.func,
    onReply: PropTypes.func,
    onEdit: PropTypes.func,
};

CommentSwipeableRow.defaultProps = {
    isOwn: false,
    onDelete: () => {},
    onReport: () => {},
    onReply: () => {},
    onEdit: () => {},
};

export default CommentSwipeableRow;
