import React, { Component } from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import R from "res/R";
import { ArrowIcon } from "res/icons";
import { withTheme } from "styled-components";
import { IconWrap } from "../../icons";
class GenderPicker extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return nextProps.gender !== this.props.gender;
    }

    _onChangeGender = (value, index) => {
        const { onChangeGender } = this.props;
        onChangeGender(value);
    };

    render() {
        const { gender, disabled, theme } = this.props;
        let value = "not specified";
        const genders = R.pickers.gender.map((item, index) => {
            const newItem = { ...item };
            if (item.value === gender) {
                value = gender;
                newItem.color = R.colors.black;
            } else {
                newItem.color = R.colors.black;
            }
            return newItem;
        });
        return (
            <View
                style={[R.themedStyles(theme).textInput.border, styles.container]}
                pinterEvents={disabled ? "none" : "auto"}
            >
                <RNPickerSelect
                    placeholder={{
                        label: "Not Specified",
                        value: "not specified",
                        color: R.colors.deltaGrey,
                    }}
                    items={genders}
                    onValueChange={this._onChangeGender}
                    value={value}
                    Icon={() => <IconWrap Icon={ArrowIcon} direction={"down"} />}
                    style={{ ...R.themedStyles(theme).pickerStyles }}
                />
            </View>
        );
    }
}

GenderPicker.propTypes = {
    onChangeGender: PropTypes.func,
    gender: PropTypes.string,
    disabled: PropTypes.bool,
};

GenderPicker.defaultProps = {
    onChangeGender: () => {},
    gender: "",
    disabled: false,
};
export default withTheme(GenderPicker);
