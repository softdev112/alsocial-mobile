import React, { PureComponent } from "react";
import { Keyboard, View } from "react-native";
import { SearchBar, AutoCompleteMention } from "common/views";
import MixpanelService from "service/Mixpanel";

class SearchHeader extends PureComponent {
    _autoCompleteRef: ?AutoCompleteMention = null;

    state = {
        text: "",
    };

    componentDidMount(): void {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    componentWillUnmount(): void {
        this._autoCompleteRef = null;
    }

    _onSelectUser = user => {
        this.setState({
            text: "",
        });
        this._onBlur();

        MixpanelService.trackEvent("search", { first_action_taken: "clicked on result" });
    };

    _onBlur = () => {
        Keyboard.dismiss();
        if (this._autoCompleteRef) {
            this._autoCompleteRef._dismissAutoComplete();
        }
    };

    _onFocus = () => {
        MixpanelService.trackEvent("search", { first_action_taken: "clicked on search bar" });
    };

    _onChangeText = (text: string) => {
        this.setState({ text });
        if (this._autoCompleteRef) {
            this._autoCompleteRef._handleMentionDebounced(text);
        }
    };

    _renderTextInput = () => {
        const { text } = this.state;

        return (
            <SearchBar
                text={text}
                onBlur={this._onBlur}
                onFocus={this._onFocus}
                onChangeText={this._onChangeText}
            />
        );
    };

    render() {
        return (
            <AutoCompleteMention
                onRef={ref => (this._autoCompleteRef = ref)}
                renderTextInput={this._renderTextInput}
                onSelectedUser={this._onSelectUser}
                onPress={null}
                search={true}
            />
        );
    }
}

export default SearchHeader;
