import React, { PureComponent } from "react";
import { View } from "react-native";
import styles, { SearchBarArea, SearchBarField } from "./styles";
import { SearchMiniIcon } from "res/icons";
import R from "res/R";
import { CustomButton } from "../../buttons";
import { CustomTextInput } from "../../textInputs";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

class SearchBar extends PureComponent {
    state = {
        isFocused: false,
    };

    _onFocus = () => {
        this.setState({ isFocused: true });
        const { onFocus } = this.props;
        if (onFocus) {
            onFocus();
        }
    };

    _onBlur = () => {
        this.setState({ isFocused: false });
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur();
        }
    };
    render() {
        const { isFocused } = this.state;
        const { onChangeText, text, theme, onLayout } = this.props;
        return (
            <SearchBarArea onLayout={onLayout}>
                <SearchBarField>
                    <SearchMiniIcon fill={theme.color.ashGrey} />
                    <CustomTextInput
                        style={styles.textInput}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        onChangeText={onChangeText}
                        value={text}
                        clearButtonMode='while-editing'
                        placeholder='Search'
                    />
                </SearchBarField>
                {isFocused ? (
                    <>
                        <View style={R.palette.space.right} />
                        <CustomButton
                            title={"Cancel"}
                            disabled={false}
                            isLoading={false}
                            onPress={this._onBlur}
                        />
                    </>
                ) : null}
            </SearchBarArea>
        );
    }
}

SearchBar.propTypes = {
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onLayout: PropTypes.func,
};

SearchBar.defaultProps = {
    text: "",
    onChangeText: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onLayout: () => {},
};

export default withTheme(SearchBar);
