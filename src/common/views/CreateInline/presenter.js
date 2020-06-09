import React, { PureComponent } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { AvatarImage } from "../../images";
import R from "res/R";
import styles, { PlaceholderText } from "./styles";
import PropTypes from "prop-types";
import PostIcons from "../PostIcons";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { SeparatorView } from "../../themed";

class CreateInline extends PureComponent {
    _onPost = action => {
        NavigationService.navigate(Main.PostFeed, { action });
    };
    // Render any loading content that you like here
    render() {
        const { owner, _id } = this.props;
        const { profileImage } = owner;
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this._onPost(R.constants.post.text)}>
                    <View style={styles.content}>
                        <AvatarImage
                            uri={profileImage}
                            size={R.dimensions.image.avatar.normal}
                            actorId={_id}
                            actor={owner}
                            onPress={null}
                            preventOnPress={true}
                        />
                        <PlaceholderText>{R.strings.whatshappening}</PlaceholderText>
                        <View style={styles.iconWrapper}>
                            <PostIcons
                                isSubmitting={false}
                                onPressImage={() => this._onPost(R.constants.post.image)}
                                onPressLink={() => this._onPost(R.constants.post.link)}
                                onPressGifs={() => this._onPost(R.constants.post.gif)}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <SeparatorView />
            </View>
        );
    }
}

CreateInline.propTypes = {
    owner: PropTypes.object,
};

export default CreateInline;
