// @flow
import React, { PureComponent } from "react";
import { CustomButton } from "../../../buttons";
import styles, { ContentView } from "./styles";
import R from "res/R";
import NavigationService from "service/Navigation";
import { withTheme } from "styled-components";
import PropTypes from "prop-types";

class TermsButtons extends PureComponent {
    render() {
        const { hide, disabled, theme } = this.props;
        const textStyle = { color: theme.color.grey };
        return hide ? null : (
            <ContentView style={{ opacity: hide ? 0 : 1 }} pointerEvents={hide ? "none" : "auto"}>
                <CustomButton
                    title={R.strings.auth.about}
                    buttonStyle={styles.button}
                    textStyle={textStyle}
                    onPress={() => NavigationService.navigate("About")}
                    disabled={disabled}
                    isLoading={false}
                />
                <CustomButton
                    title={R.strings.auth.terms}
                    buttonStyle={styles.button}
                    textStyle={textStyle}
                    onPress={() => NavigationService.navigate("Terms")}
                    disabled={disabled}
                    isLoading={false}
                />
                <CustomButton
                    title={R.strings.auth.privacy}
                    buttonStyle={styles.button}
                    textStyle={textStyle}
                    onPress={() => NavigationService.navigate("Privacy")}
                    disabled={disabled}
                    isLoading={false}
                />
            </ContentView>
        );
    }
}

TermsButtons.propTypes = {
    hide: PropTypes.boolean,
    disabled: PropTypes.boolean,
};

TermsButtons.defaultProps = {
    hide: false,
    disabled: false,
};

export default withTheme(TermsButtons);
