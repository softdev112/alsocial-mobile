// @flow
import React from "react";
import { Platform } from "react-native";
import R from "res/R";
import CustomTextInput from "../CustomTextInput";

const BorderTextInput = props => {
    const { style, ...rest } = props;
    const paddingVertical = Platform.select({ ios: 10, android: 5 });
    return (
        <CustomTextInput
            style={{
                paddingTop: paddingVertical,
                paddingBottom: paddingVertical,
                ...R.palette.textInput.border,
                ...style,
            }}
            {...rest}
        />
    );
};

export default BorderTextInput;
