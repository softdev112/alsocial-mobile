import React, { PureComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import styles, { RepostIconView } from "./styles";
import PropTypes from "prop-types";
import { AvatarImage } from "common/images";
import R from "res/R";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { ShareIcon } from "res/icons";
import { NormalText, BoldText, DescriptionText, ContentView } from "../../themed";

class UserItem extends PureComponent {
    static getDerivedStateFromProps(props, state) {
        const { owner, actorId } = props;
        if (owner._id === actorId) {
            return {
                user: { ...owner },
            };
        }
        return state;
    }
    constructor(props) {
        super(props);
        const { actorId, owner, actor } = this.props;
        if (owner._id === actorId) {
            this.state = {
                user: owner,
            };
        } else {
            this.state = {
                user: actor,
            };
        }
    }

    _onPress = () => {
        const { onPress, onSelectedUser, owner, actorId, profileId, actor, type } = this.props;
        if (onSelectedUser) {
            onSelectedUser(actor);
        }

        if (onPress) {
            onPress();
        } else {
            if (!actorId || actorId === profileId) {
                return;
            }
            if (owner._id === actorId) {
                NavigationService.navigate("UserProfileTab");
            } else if (actorId) {
                NavigationService.push(Main.User, {
                    profileId: actorId,
                    actor,
                });
            }
        }
    };

    render() {
        const {
            keyValue,
            containerStyle,
            avatar,
            size,
            actorId,
            profileId,
            onPress,
            usernameStyle,
            username,
            fullName,
            isRepost,
            preventOnPress,
            style,
            type,
            isBold,
        } = this.props;
        // if (!username) {
        //     return <DescriptionText>Invalid user</DescriptionText>;
        // }
        return (
            <TouchableOpacity
                onPress={preventOnPress || !username ? null : this._onPress}
                key={keyValue}
                activeOpacity={preventOnPress ? 1 : 0.5}
                style={{ ...styles.container, ...style }}
            >
                <ContentView style={{ ...styles.content, ...containerStyle }}>
                    <View>
                        <AvatarImage
                            uri={avatar}
                            size={size}
                            actorId={actorId}
                            actor={this.state.user}
                            profileId={profileId}
                            onPress={onPress}
                            preventOnPress={preventOnPress || !username}
                            type={type}
                        />
                        {isRepost ? (
                            <RepostIconView>
                                <ShareIcon />
                            </RepostIconView>
                        ) : null}
                    </View>
                    <View style={[styles.nameContainer, usernameStyle ? null : { flex: 1 }]}>
                        {isBold ? (
                            <BoldText style={usernameStyle} numberOfLines={1}>
                                {username ? username : "Unknown"}
                            </BoldText>
                        ) : (
                            <NormalText style={usernameStyle} numberOfLines={1}>
                                {username ? username : "Unknown"}
                            </NormalText>
                        )}
                        {fullName ? (
                            <DescriptionText numberOfLines={1}>{fullName}</DescriptionText>
                        ) : null}
                    </View>
                </ContentView>
            </TouchableOpacity>
        );
    }
}

UserItem.propTypes = {
    isRepost: PropTypes.bool,
    actor: PropTypes.object,
    avatar: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    actorId: PropTypes.string,
    profileId: PropTypes.string,
    containerStyle: PropTypes.object,
    usernameStyle: PropTypes.object,
    onPress: PropTypes.func,
    onSelectedUser: PropTypes.func,
    size: PropTypes.number,
    keyValue: PropTypes.string,
    preventOnPress: PropTypes.bool,
    type: PropTypes.string,
    isBold: PropTypes.bool,
};
UserItem.defaultProps = {
    isRepost: false,
    actor: null,
    fullName: null,
    profileId: null,
    containerStyle: null,
    usernameStyle: null,
    onPress: null,
    onSelectedUser: null,
    size: R.dimensions.image.avatar.normal,
    keyValue: null,
    preventOnPress: false,
    isBold: true,
};
export default UserItem;
