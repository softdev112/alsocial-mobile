import React, { PureComponent } from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import R from "res/R";
import { ArrowIcon } from "res/icons";
import { IconWrap } from "../../icons";

class ThemePicker extends PureComponent {
    state = {
        mode: "light",
    };
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode ? props.mode : "light",
        };
    }
    _onChangeTheme = async (value, index) => {
        const { setAppThemeMode } = this.props;
        await this.setState(
            {
                mode: value,
            },
            () => {
                setAppThemeMode(value);
            },
        );
    };

    render() {
        const { mode } = this.state;
        const themes = R.pickers.theme.map((item, index) => {
            return { ...item, color: R.colors.black };
        });
        const value = mode ? mode : "light";
        const theme = R.theme(value);
        return (
            <View style={[R.themedStyles(theme).textInput.border, styles.container]}>
                <RNPickerSelect
                    placeholder={{}}
                    items={themes}
                    onValueChange={this._onChangeTheme}
                    value={value}
                    Icon={() => <IconWrap Icon={ArrowIcon} direction={"down"} />}
                    style={{ ...R.themedStyles(theme).pickerStyles }}
                />
            </View>
        );
    }
}

export default ThemePicker;
