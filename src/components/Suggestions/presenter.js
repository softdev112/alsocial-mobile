import React, { PureComponent } from "react";
import { View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { BoldText } from "common/themed";
import { IconButton } from "common/buttons";
import { RefreshIcon } from "res/icons";
import SuggestionItem from "./SuggestionItem";
import _ from "lodash";

class Suggestions extends PureComponent {
    state = {
        suggestions: [],
        page: 0,
        limit: 10,
        isLoading: false,
    };
    static getDerivedStateFromProps(props, state) {
        const { suggestionsPage } = props;
        if (suggestionsPage) {
            return { ...state, page: suggestionsPage };
        }
        return state;
    }

    componentDidMount(): void {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
        this._loadSuggestions();
    }

    componentWillUnmount = () => {
        this.props.unRef();
    };

    checkSuggestions = () => {
        const { suggestions } = this.state;
        if (!suggestions || !suggestions.length) {
            this._loadSuggestions();
        }
    };

    _loadSuggestions = async () => {
        if (this.state.isLoading) {
            return;
        }
        const { page, limit } = this.state;
        this.setState({ isLoading: true });
        const { loadSuggestionsRequest } = this.props;
        await loadSuggestionsRequest({
            page: page + 1,
            per_page: limit,
            callback: ({ suggestions, page: curPage, error, isLoading }) => {
                if (error) {
                    this.setState({ page: 0, isLoading: false });
                    if (curPage > 1) {
                        this._loadSuggestions();
                    }
                    return;
                }

                if (isLoading) {
                    if (this.state.isLoading !== isLoading) {
                        this.setState({ isLoading });
                    }
                } else if (suggestions && !!suggestions.length) {
                    this.setState({
                        suggestions,
                        page: curPage,
                        isLoading,
                    });
                } else if (curPage > 1) {
                    this.setState({
                        page: 0,
                        isLoading,
                    });
                    this._loadSuggestions();
                } else {
                    this.setState({ isLoading });
                }
            },
        });
    };

    _keyExtractor = (item: Object, index: number) => `item-${item._id}-${index}`;
    _renderItem = ({ item, index }) => {
        return <SuggestionItem user={item} keyValue={`suggestions-${item.id}-${index}`} />;
    };
    render() {
        const { suggestions, isLoading } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <BoldText>Suggestions</BoldText>
                        <IconButton
                            icon={<RefreshIcon />}
                            onPress={_.debounce(this._loadSuggestions, 500)}
                            disabled={isLoading}
                        />
                    </View>
                    <View style={styles.suggestionsContainer}>
                        {suggestions && suggestions.length ? (
                            <FlatList
                                style={styles.container}
                                data={suggestions}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            />
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
}

Suggestions.propTypes = {
    loadSuggestionsRequest: PropTypes.func,
};

export default Suggestions;
