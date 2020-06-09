import React, { Component } from "react";
import { View } from "react-native";
import styles, { ContainerView, SelectionView, SelectedCircleView } from "./styles";
import PropTypes from "prop-types";
import { AvatarImage } from "common/images";
import { BoldText, DescriptionText } from "../../themed";
import { withTheme } from "styled-components";
import { TouchableContentView } from "../../themed";

class InviteUserItem extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return nextProps.selected !== this.props.selected;
    }

    render() {
        const { profileImage, name, subName, onPress, keyValue, selected, theme } = this.props;
        return (
            <ContainerView key={keyValue} onPress={onPress}>
                <View style={styles.content}>
                    <AvatarImage uri={profileImage} onPress={onPress} />
                    <View style={styles.nameContainer}>
                        <BoldText numberOfLines={1}>{name}</BoldText>
                        <DescriptionText numberOfLines={1}>{subName}</DescriptionText>
                    </View>
                </View>
                {selected ? (
                    <SelectionView style={{ borderColor: theme.color.teal }}>
                        <SelectedCircleView />
                    </SelectionView>
                ) : (
                    <SelectionView style={{ borderColor: theme.color.lightGrey }} />
                )}
            </ContainerView>
        );
    }
}

InviteUserItem.propTypes = {
    profileImage: PropTypes.string,
    name: PropTypes.string,
    subName: PropTypes.string,
    onPress: PropTypes.func,
    keyValue: PropTypes.string,
    selected: PropTypes.bool,
};
export default withTheme(InviteUserItem);
