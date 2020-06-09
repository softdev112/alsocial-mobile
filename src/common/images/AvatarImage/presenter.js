import React, { PureComponent } from "react";
import { View, PixelRatio } from "react-native";
import PropTypes from "prop-types";
import R from "res/R";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import ImageIconButton from "../../buttons/ImageIconButton";
import { styles, AvatarArea, Avatar } from "./styles";

class AvatarImage extends PureComponent {
    static getDerivedStateFromProps(props, state) {
        const { owner, actorId } = props;
        if (owner._id === actorId) {
            return {
                user: { ...owner },
            };
        } else {
            return {
                user: props.actor && props.actor?.data ? props.actor?.data : props.actor,
            };
        }
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
                user: actor && actor?.data ? actor?.data : actor,
            };
        }
    }

    _onPress = () => {
        const { onPress, owner, actorId, profileId, actor, type } = this.props;
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
        const { uri, size, style, onPickImage, preventOnPress } = this.props;
        const { user } = this.state;
        let profileImage = user ? user.profileImage : uri;
        profileImage = profileImage
            ? profileImage.startsWith("http")
                ? `${profileImage}${
                      profileImage.includes("?") ? "&" : "?"
                  }w=${PixelRatio.getPixelSizeForLayoutSize(size)}&auto=format&fit=max`
                : profileImage
            : null;

        return (
            <AvatarArea
                onPress={() => (preventOnPress ? null : this._onPress())}
                size={size}
                style={style}
                activeOpacity={preventOnPress ? 1 : 0.5}
            >
                <Avatar
                    source={{ uri: profileImage || R.images.avatar }}
                    resizeMode={"cover"}
                    onError={() => {}}
                />
                {onPickImage && (
                    <View style={[styles.cameraIcon, { marginTop: -size / 2 - 12 }]}>
                        <ImageIconButton
                            cropHeight={1200}
                            cropWidth={1200}
                            onResponseImage={onPickImage}
                            isCrop={true}
                        />
                    </View>
                )}
            </AvatarArea>
        );
    }
}

AvatarImage.propTypes = {
    uri: PropTypes.string,
    size: PropTypes.number,
    actor: PropTypes.object,
    actorId: PropTypes.string,
    profileId: PropTypes.string,
    onPress: PropTypes.func,
    onPickImage: PropTypes.func,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    preventOnPress: PropTypes.bool,
    type: PropTypes.string,
};

AvatarImage.defaultProps = {
    uri: null,
    size: R.dimensions.image.avatar.normal,
    profileId: null,
    onPress: null,
    onPickImage: null,
    borderWidth: 1,
    borderColor: R.colors.borderGrey,
    preventOnPress: false,
};

export default AvatarImage;
