// @flow
import React, { PureComponent } from "react";
import { Platform } from "react-native";
import R from "res/R";
import CustomTextInput from "../CustomTextInput";
import Autocomplete from "react-native-autocomplete-input";
import { View } from "react-native";
import algolia from "algoliasearch";
import _ from "lodash";
import styles from "./styles";
import UserItem from "../../views/UserItem";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import { LineView } from "../../themed";

type SearchItem = {
    id: string,
    name: string,
    objectID: string,
    type: string,
    username: string,
    _highlightResult: Object,
};

type State = {|
    searchList: Array<SearchItem>,
    selection: number,
    left: number,
    right: number,
    pos: number,
    searchStarted: boolean,
    focused: boolean,
    isAutoComplete: boolean,
|};

class ActivityTextInput extends PureComponent<*, State> {
    textInputRef: Object = React.createRef();
    _handleMentionDebounced: string => mixed;

    state = {
        selection: 0,
        left: 0,
        right: 0,
        pos: 0,
        inputHeight: 44,
        searchList: [],
        searchStarted: false,
        focused: false,
        isAutoComplete: false,
    };

    constructor(props: Object) {
        super(props);
        this._handleMentionDebounced = _.debounce(this.handleMention, 300);
    }

    componentDidMount() {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    handleMention = async (query: Object) => {
        const client = await algolia(
            R.configs.ALGOLIA_SEARCH.APP_ID,
            R.configs.ALGOLIA_SEARCH.API_KEY,
        );

        this.setState({
            searchStarted: true,
        });
        if (query) {
            const index = client.initIndex(R.configs.ALGOLIA_SEARCH.INDEX);
            index.search({ query }, (err, res) => {
                if (!err) {
                    const normalizedList = _.uniqBy(res.hits, i => i.id);
                    this.setState({
                        searchList: normalizedList,
                    });
                }
            });
        } else {
            this.setState({
                searchList: [],
            });
        }
    };

    _onSelectUser = user => {
        const { text, onChangeText, onSelectUser } = this.props;
        if (onSelectUser) {
            onSelectUser(user);
            return;
        }

        this._handleMentionDebounced("");
        const { left, right, pos } = this.state;

        let newText = "";

        if (right < 0) {
            newText = `${text.slice(0, left)}@${user.username}`;
        } else {
            newText = `${text.slice(0, left)}@${user.username}${text.slice(right + pos)}`;
        }
        this.setState({
            searchList: [],
        });
        onChangeText(newText);
    };
    _renderSeparator = () => <LineView />;
    _keyExtractor = (item: Object, index: number) => `item-${item.id}-${index}`;
    _renderItem = ({ item }) => {
        const { id, profileImage, name, username } = item;
        return (
            <UserItem
                avatar={profileImage}
                containerStyle={styles.userContainer}
                username={username}
                fullName={name}
                actorId={id}
                onPress={() => this._onSelectUser(item)}
                size={R.dimensions.image.avatar.small}
                actor={item}
                style={{ flex: 1 }}
            />
        );
    };

    _onSelectionChange = ({
        nativeEvent: {
            selection: { end, start },
        },
    }: Object) => {
        if (end === start) this.setState({ selection: start });
    };

    _onFocus = () => this.setState({ focused: true });

    _onBlur = () => {
        this.setState({
            searchList: [],
        });
    };

    _onChangeText = (text: string) => {
        const { onChangeText } = this.props;
        onChangeText(text);
        this.getWordAt(text);
    };

    _onShowResults = isShow => {
        if (this.state.isAutoComplete !== isShow) {
            this.setState({ isAutoComplete: isShow });
        }
    };

    getWordAt = (text: string) => {
        const str = String(text);
        const pos = Number(this.state.selection) >>> 0;
        let mention = "";

        const left = str.slice(0, pos).search(/[@\w._]+$/);
        const right = str.slice(pos).search(/\s/);

        if (right < 0) {
            mention = str.slice(left);
        } else {
            mention = str.slice(left, right + pos);
        }
        if (mention && mention[0] === "@") {
            this.setState({ left, right, pos });
            return this._handleMentionDebounced(mention.slice(1));
        }

        return this._handleMentionDebounced("");
    };

    _renderTextInput = () => {
        const { textInputStyle, placeholder, onLayout, text, multiline } = this.props;
        return (
            <View style={styles.textInputContainer} onLayout={onLayout}>
                <CustomTextInput
                    ref={ref => (this.textInputRef = ref)}
                    multiline={multiline}
                    onChangeText={this._onChangeText}
                    onSelectionChange={this._onSelectionChange}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                    value={text}
                    placeholder={placeholder}
                    style={{ ...styles.textInput, ...textInputStyle }}
                    autoFocus
                    scrollEnabled={false}
                />
            </View>
        );
    };

    render() {
        const { searchList, text } = this.state;
        const { containerStyle, inputContainerStyle, theme } = this.props;
        return (
            <Autocomplete
                data={searchList}
                defaultValue={text}
                keyboardShouldPersistTaps={"always"}
                onShowResults={this._onShowResults}
                autoCorrect={false}
                renderItem={this._renderItem}
                renderTextInput={this._renderTextInput}
                containerStyle={
                    Platform.OS === "ios"
                        ? { ...containerStyle, zIndex: 999 }
                        : { ...styles.autocompleteContainer, ...containerStyle }
                }
                inputContainerStyle={{ ...styles.inputContainerStyle, ...inputContainerStyle }}
                listStyle={[styles.listStyle, { borderColor: theme.color.lightGrey }]}
                renderSeparator={this._renderSeparator}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

ActivityTextInput.propTypes = {
    textInputStyle: PropTypes.object,
    placeholder: PropTypes.string,
    onLayout: PropTypes.func,
    containerStyle: PropTypes.object,
    inputContainerStyle: PropTypes.object,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    multiline: PropTypes.bool,
    onSelectUser: PropTypes.func,
};

ActivityTextInput.defaultProps = {};

export default withTheme(ActivityTextInput);
