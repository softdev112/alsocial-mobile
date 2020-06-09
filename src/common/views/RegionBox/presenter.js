import React, { Component } from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import R from "res/R";
import { ArrowIcon } from "res/icons";
import { IconWrap } from "../../icons";
import { withTheme } from "styled-components";
import { capitalize } from "utils/helper";

const region = R.region;

class RegionBox extends Component {
    state = { countries: [], countryItems: [], stateItems: [], country: "", state: "" };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return nextState.country !== this.state.country || nextState.state !== this.state.state;
    }

    constructor(props) {
        super(props);
        const { country, state } = props;
        const countries = region.countries.map(value => {
            return {
                label: capitalize(value),
                value,
                color: R.colors.black,
            };
        });
        const items = this._getItems(countries, country, state);
        this.state = { ...items, countries, country, state };
    }

    _getItems = (countries, country, state) => {
        const countryItems = countries; //this._changeItemsStatus(countries, country);
        const stateItems = this._getStateItems(country, state);
        return { countryItems, stateItems };
    };

    _getStateItems = (country, state) => {
        return country.length && region.states[country]
            ? region.states[country].map(value => {
                  return {
                      label: capitalize(value),
                      value,
                      color: R.colors.black, //value === state ? R.colors.black : R.colors.deltaGrey,
                  };
              })
            : [];
    };

    _onChangeCountry = value => {
        if (value === this.state.country) {
            return;
        }

        this.setState({ state: "" }, () => {
            const items = this._getItems(this.state.countries, value, "");
            this.setState({ ...items, country: value });

            const { onChangeCountry } = this.props;
            onChangeCountry(value);
        });
    };

    _onChangeState = value => {
        if (value === this.state.state) {
            return;
        }

        this.setState({ state: value });
        const { onChangeState } = this.props;
        onChangeState(value);
    };

    render() {
        const { countryItems, country, stateItems, state, disabled } = this.state;
        const { theme } = this.props;

        return (
            <View>
                <View style={styles.rowContainer}>
                    <View style={[styles.rowItemContainer, R.themedStyles(theme).textInput.border]}>
                        <RNPickerSelect
                            placeholder={{
                                label: R.strings.region.country,
                                value: "",
                                color: R.colors.deltaGrey,
                            }}
                            value={country}
                            items={countryItems}
                            onValueChange={this._onChangeCountry}
                            useNativeAndroidPickerStyle={Platform.OS === "android"}
                            disabled={disabled}
                            Icon={() => <IconWrap Icon={ArrowIcon} direction={"down"} />}
                            style={{ ...R.themedStyles(theme).pickerStyles }}
                        />
                    </View>
                    <View style={styles.rowSpace} />
                    <View style={[styles.rowItemContainer, R.themedStyles(theme).textInput.border]}>
                        <RNPickerSelect
                            placeholder={{
                                label: R.strings.region.state,
                                value: "",
                                color: R.colors.deltaGrey,
                            }}
                            value={state}
                            items={stateItems}
                            onValueChange={this._onChangeState}
                            useNativeAndroidPickerStyle={Platform.OS === "android"}
                            disabled={disabled}
                            Icon={() => <IconWrap Icon={ArrowIcon} direction={"down"} />}
                            style={{ ...R.themedStyles(theme).pickerStyles }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

RegionBox.propTypes = {
    onChangeCountry: PropTypes.func,
    onChangeState: PropTypes.func,
    country: PropTypes.string,
    state: PropTypes.string,
};

RegionBox.defaultProps = {
    onChangeCountry: () => {},
    onChangeState: () => {},
    country: "",
    state: "",
};
export default withTheme(RegionBox);
