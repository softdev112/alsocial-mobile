import React, { PureComponent } from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import { SearchArea, SearchWrapper, SearchInput } from "./styles";
import R from "res/R";
import { SearchMiniIcon } from "res/icons";
import { withTheme } from "styled-components";

class SearchBox extends PureComponent {
    state = {
        text: "",
    };

    onChangeText = text => {
        this.setState({ text }, () => {
            this.props.onChangeText(text);
        });
    };

    setFocus = () => this.refs.searchInput.focus();

    render() {
        const { text } = this.state;
        const { placeholder, style, theme } = this.props;
        return (
            <SearchArea style={style}>
                <TouchableWithoutFeedback onPress={this.setFocus}>
                    <SearchWrapper>
                        <SearchMiniIcon fill={theme.color.ashGrey} style={{ marginLeft: 12 }} />
                        <SearchInput
                            ref='searchInput'
                            onChangeText={this.onChangeText}
                            value={text}
                            placeholder={placeholder}
                            placeholderTextColor={theme.color.dark}
                            autoFocus
                        />
                    </SearchWrapper>
                </TouchableWithoutFeedback>
            </SearchArea>
        );
    }
}

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    style: PropTypes.object,
};
export default withTheme(SearchBox);
