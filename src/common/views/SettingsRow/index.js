import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles, { ContainerView } from "./styles";
import PropTypes from "prop-types";
import { AvatarImage } from "common/images";
import { ArrowIcon } from "res/icons";
import R from "res/R";
import { BoldText } from "../../themed";
import { IconWrap } from "../../icons";

type Props = {
    keyValue: PropTypes.string.isRequired,
    icon?: PropTypes.node,
    title: PropTypes.string,
    onPress?: PropTypes.func,
};

const SettingsRow = ({ keyValue, icon, title, onPress }: Props) => (
    <ContainerView onPress={onPress} key={keyValue}>
        <View style={styles.titleContainer}>
            {icon ? icon : null}
            <BoldText style={{ marginLeft: R.dimensions.element.space.small }} numberOfLines={1}>
                {title}
            </BoldText>
        </View>
        {onPress ? <IconWrap Icon={ArrowIcon} direction={"right"} /> : null}
    </ContainerView>
);

export default SettingsRow;
