import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { BoldText } from "../../../themed";

type Props = {
    header: string,
};

const TermsOfServiceHeader = ({ header = "" }: Props) => (
    <View style={styles.container}>
        <BoldText style={styles.text}>{header}</BoldText>
    </View>
);

export default TermsOfServiceHeader;
