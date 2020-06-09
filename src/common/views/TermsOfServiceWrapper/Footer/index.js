import React from "react";
import { View } from "react-native";
import { AppVersion } from "common/labels";
import styles from "./styles";
import { BoldText } from "../../../themed";

type Props = {
    footer: string,
    theme: ?Object,
};
const TermsOfServiceFooter = ({ footer = "", theme = null }: Props) => (
    <View style={styles.container}>
        <BoldText style={[styles.text, theme ? { color: theme.color.text } : null]}>
            {footer}
        </BoldText>
        <AppVersion style={[styles.appVersion, theme ? { color: theme.color.text } : null]} />
    </View>
);

export default TermsOfServiceFooter;
