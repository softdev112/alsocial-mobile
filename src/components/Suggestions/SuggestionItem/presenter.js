import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles, { ContainerView, UsernameText } from "./styles";
import R from "res/R";
import { AvatarImage } from "common/images";
import { FollowButton } from "common/buttons";

class SuggestionItem extends PureComponent {
    render() {
        const { user, keyValue } = this.props;
        const { _id, username } = user;
        return (
            <ContainerView key={keyValue}>
                <AvatarImage
                    size={R.dimensions.suggestion.avatar}
                    actorId={_id}
                    actor={user}
                    type={"Recommendation"}
                />
                <UsernameText numberOfLines={1}>{username}</UsernameText>
                <FollowButton
                    userId={_id}
                    isSuggestions={true}
                    type='Recommended Feed'
                    size='small'
                    loadingIndicatorColor={R.colors.white}
                />
            </ContainerView>
        );
    }
}

SuggestionItem.propTypes = {
    user: PropTypes.object,
    keyValue: PropTypes.string,
};

export default SuggestionItem;
