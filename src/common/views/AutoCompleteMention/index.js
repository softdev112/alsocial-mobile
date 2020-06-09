import React, { PureComponent } from "react";
import { Platform } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import R from "res/R";
import Autocomplete from "react-native-autocomplete-input";
import UserItem from "../UserItem";
import _ from "lodash";
import { searchMentions } from "utils/mention";
import { LineView } from "../../themed";
import { withTheme } from "styled-components";

class AutoCompleteMention extends PureComponent {
    _handleMentionDebounced: string => mixed;

    state = {
        searchList: [],
        query: "",
    };

    constructor(props: Object) {
        super(props);
        this._handleMentionDebounced = _.debounce(this._handleMention, 300);
    }

    componentDidMount(): void {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    componentWillUnmount(): void {
        this._handleMentionDebounced = null;
    }

    _handleMention = async text => {
        if (!text.length) {
            this._dismissAutoComplete();
            return;
        }

        await this.setState({
            searchList: [],
            query: text,
        });

        searchMentions(text, ({ query, results }) => {
            if (query === this.state.query && results && Array.isArray(results)) {
                this.setState({
                    searchList: results,
                });
            } else {
                this._dismissAutoComplete();
            }
        });
    };

    _dismissAutoComplete = async () => {
        await this.setState({
            searchList: [],
            query: "",
        });
    };
    _renderSeparator = () => <LineView />;
    _keyExtractor = (item: Object, index: number) => `mention-${item.id}-${index}`;
    _renderItem = ({ item, index }) => {
        const { id, profileImage, username, name } = item;
        return (
            <UserItem
                avatar={profileImage}
                username={username}
                containerStyle={styles.userContainer}
                actorId={id}
                onSelectedUser={this.props.onSelectedUser}
                onPress={this.props.onPress}
                size={R.dimensions.image.avatar.small}
                actor={item}
                fullName={this.props.search ? name : null}
                keyValue={this._keyExtractor(item, index)}
                style={{ flex: 1 }}
            />
        );
    };

    render() {
        const {
            renderTextInput,
            containerStyle,
            listStyle,
            listContainerStyle,
            onShowResults,
            theme,
        } = this.props;
        const { searchList } = this.state;
        return (
            <Autocomplete
                data={searchList}
                keyboardShouldPersistTaps={"always"}
                autoCorrect={false}
                onShowResults={onShowResults}
                renderItem={this._renderItem}
                renderTextInput={renderTextInput}
                containerStyle={{
                    ...Platform.select({
                        ios: styles.autocompleteContainerIOS,
                        android: styles.autocompleteContainerAndroid,
                    }),
                    ...containerStyle,
                }}
                inputContainerStyle={styles.inputContainerStyle}
                listStyle={{
                    ...styles.listStyle,
                    ...listStyle,
                    backgroundColor: theme.color.background,
                }}
                listContainerStyle={{
                    ...styles.listContainer,
                    ...listContainerStyle,
                    borderColor: theme.color.lightGrey,
                    borderWidth: searchList && !!searchList.length ? 1 : 0,
                }}
                renderSeparator={this._renderSeparator}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

AutoCompleteMention.propTypes = {
    containerStyle: PropTypes.object,
    listStyle: PropTypes.object,
    listContainerStyle: PropTypes.object,
    renderTextInput: PropTypes.func,
    onSelectedUser: PropTypes.func,
    onPress: PropTypes.func,
    onShowResults: PropTypes.func,
    search: PropTypes.bool,
};

AutoCompleteMention.defaultProps = {
    containerStyle: {},
    listStyle: {},
    listContainerStyle: {},
    renderTextInput: () => {},
    onSelectedUser: user => {},
    onPress: () => {},
    onShowResults: null,
    search: false,
};

export default withTheme(AutoCompleteMention);
