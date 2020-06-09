import React, { Component } from "react";
import { Platform, View } from "react-native";
import SearchHeader from "./SearchHeader";
import { ActivityFeedItem, ActivityFeedScreen } from "components";
import PropTypes from "prop-types";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import R from "res/R";
import styles from "./styles";

class SearchScreen extends Component {
    _feedRef: ?ActivityFeedScreen = null;
    _headerRef: ?SearchHeader = null;
    _offset = 0;
    _isLoading = false;

    state = {
        enableAutocompleteScroll: true,
        text: "",
    };

    componentDidMount(): void {
        const { navigation } = this.props;
        this.refocusSubscription = navigation.addListener("refocus", this.scrollToTop);
    }

    componentWillUnmount(): void {
        this._feedRef = null;
        this._headerRef = null;
        this.refocusSubscription.remove();
    }

    scrollToTop = ({ isFocused }: Object) => {
        if (isFocused && this._feedRef && this._feedRef._listRef) {
            this._feedRef._listRef.scrollToTop();
        }
    };

    _loadExplore = isRefresh => {
        if (!this._feedRef) {
            return;
        }

        if (isRefresh) {
            this._offset = 0;
        } else if (this._isLoading) {
            return;
        }

        const { loadExploreFeed } = this.props;
        loadExploreFeed({
            offset: this._offset,
            callback: ({ isLoading, results, next, offset, error }) => {
                if (!this._feedRef) {
                    return;
                }
                this._isLoading = isLoading;
                if (!isLoading) {
                    if (error === undefined && results && Array.isArray(results)) {
                        const hasMore = next !== "" && next !== null && next !== undefined;
                        this._feedRef.setItems(isRefresh, results, error, hasMore);
                        if (!hasMore) {
                            this._offset = 0;
                        } else {
                            this._offset = next;
                        }
                    } else {
                        this._feedRef.resetLoading();
                    }
                }
            },
        });
    };

    _onRefresh = () => {
        this._loadExplore(true);
    };

    _onLoadMore = () => {
        if (this._offset > 0) {
            this._loadExplore(false);
        }
    };

    _onEnableScroll = status => {
        this.setState({
            enableAutocompleteScroll: status,
        });
    };

    _onChangeText = text => {
        this.setState({ text });
    };

    _onSelectUser = user => {
        const { userId } = this.props;
        this.setState({ text: "" });

        if (userId !== user?.id) {
            NavigationService.navigate(Main.User, { profileId: user.id, user });
        } else {
            NavigationService.navigate(Main.Profile);
        }
    };
    _handlePanResponder = nativeEvent => {
        this._dismissSearch();
    };

    _handleScrollBeginDrag = nativeEvent => {
        this._dismissSearch();
    };

    _dismissSearch = () => {
        if (this._headerRef) {
            this._headerRef._onBlur();
        }
    };

    _renderSearchBar = () => (
        <SearchHeader
            onRef={ref => (this._headerRef = ref)}
            onChangeText={this._onChangeText}
            onSelectUser={this._onSelectUser}
        />
    );

    _renderNavigationBar = () => {
        return (
            <>
                {this._renderSearchBar()}
                <View style={styles.header} />
            </>
        );
    };

    _renderItem = ({ item, index }) => {
        return item.isDeleting ? null : (
            <ActivityFeedItem
                activity={item}
                keyValue={`explore-feed-${item.id}-${index}`}
                feedType={R.strings.feedType.explore}
            />
        );
    };

    render() {
        const { startExplore, stopExplore } = this.props;
        return (
            <ActivityFeedScreen
                onRef={ref => (this._feedRef = ref)}
                renderNavigationBar={this._renderNavigationBar}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                startPanResponder={this._handlePanResponder}
                onScrollBeginDrag={this._handleScrollBeginDrag}
                limit={R.limits.explore}
                feedType={R.strings.feedType.explore}
                onStart={startExplore}
                onStop={stopExplore}
            />
        );
    }
}

SearchScreen.propTypes = {
    loadExploreFeed: PropTypes.func.isRequired,
};

export default SearchScreen;
