import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import styles from "./styles";
import { ContentView } from "../../themed";
import { withTheme } from "styled-components";
import R from "res/R";

export type Props = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    isActive: PropTypes.bool,
};
class TabButton extends PureComponent {
    render() {
        const { title, onPress, isActive, theme } = this.props;
        return (
            <ContentView style={styles.container}>
                <CustomButton
                    buttonStyle={{
                        ...styles.button,
                    }}
                    textStyle={{
                        fontFamily: R.fonts.Bold,
                        color: theme.color.dark,
                    }}
                    title={title}
                    onPress={onPress}
                    disabled={false}
                    isLoading={false}
                    indicator={null}
                />
                <View
                    style={{
                        ...styles.bottomLine,
                        backgroundColor: isActive ? theme.color.yellow : theme.color.lightGrey,
                    }}
                />
            </ContentView>
        );
    }
}

export default withTheme(TabButton);
