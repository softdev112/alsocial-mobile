import React, { PureComponent } from "react";
import { ActivityIndicator, Animated, PanResponder, View, FlatList } from "react-native";
import { uniqBy, remove } from "lodash";
import PropTypes from "prop-types";
import styles from "./styles";
import R from "res/R";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

class LightFlatList extends PureComponent {
    initialState = {
        items: null,
        isRefreshing: false,
        isLoadingMore: false,
        hasMoreItems: true,
        isLoaded: false,
        scrollY: new Animated.Value(0),
        // a performant workaround for the issue where FlatList's clipped subviews
        //  wont't rerender resulting in blank screens in between tab switching
        shouldRemoveClippedSubviews: false,
    };

    _listRef = React.createRef();

    constructor(props) {
        super(props);
        this._viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 60,
            minimumViewTime: 250,
        };
        const { startPanResponder, endPanResponder, items } = this.props;
        this._panResponder = PanResponder.create({
            onPanResponderStart: evt => startPanResponder(evt.nativeEvent),
            onPanResponderEnd: evt => endPanResponder(evt.nativeEvent),
            onPanResponderRelease: evt => endPanResponder(evt.nativeEvent),
            onPanResponderTerminate: evt => endPanResponder(evt.nativeEvent),
        });
        this.state = {
            ...this.initialState,
            items,
        };
    }

    componentDidMount() {
        const { onRef, onStart } = this.props;
        if (onRef) {
            onRef(this);
        }
        if (!onStart) {
            this._onRefresh();
        }
    }

    scrollToTop = () => {
        if (this._listRef) {
            this._listRef.scrollToOffset({ x: 0, y: 0 });
        }
    };
    scrollToIndex = index => {
        if (this._listRef) {
            this._listRef.scrollToIndex({ index, viewPosition: 0 });
        }
    };
    scrollToItem = item => {
        if (this._listRef) {
            this._listRef.scrollToItem({ item });
        }
    };
    scrollToOffset = offset => {
        if (this._listRef) {
            this._listRef.scrollToOffset({ offset });
        }
    };
    getStates = () => {
        return this.state;
    };

    resetLoading = async () => {
        if (this.state.isRefreshing || this.state.isLoadingMore) {
            await this.setState({ isRefreshing: false, isLoadingMore: false });
        }
        // this.forceUpdate();
    };

    noMore = async () => {
        if (this.state.hasMoreItems) {
            await this.setState({
                hasMoreItems: false,
            });
        }
        // this.forceUpdate();
    };

    refreshing = async () => {
        if (!this.state.isRefreshing || this.state.isLoadingMore) {
            await this.setState({ isRefreshing: true, isLoadingMore: false });
        }
        // this.forceUpdate();
    };

    loadingMore = async () => {
        if (this.state.isRefreshing || !this.state.isLoadingMore) {
            await this.setState({ isRefreshing: false, isLoadingMore: true });
        }
        // this.forceUpdate();
    };

    resetItems = items => {
        this.setState({
            items,
        });
    };

    updateItems = async (state, isRefresh) => {
        if (state === null) {
            await this.setState({
                items: null,
                isRefreshing: false,
                isLoadingMore: false,
                hasMoreItems: true,
            });
            if (isRefresh) {
                this._onRefresh();
            }
        } else {
            await this.setState({
                items: state.items,
                hasMoreItems: state.hasMoreItems,
                isRefreshing: false,
                isLoadingMore: false,
            });
            if (isRefresh) {
                this._onRefresh();
            }
        }
    };

    changeItem = async item => {
        const index = await this.state.items.findIndex(e => e.id === item.id);
        if (index !== -1) {
            let items = [...this.state.items];
            items[index] = { ...item };
            await this.setState({ items });
        }
    };

    deleteItem = async itemId => {
        const index = await this.state.items.findIndex(e => e.id === itemId);
        if (index !== -1) {
            let items = [...this.state.items];
            await items.splice(index, 1);
            await this.setState({ items });
        }
    };

    deleteActivityItem = async itemId => {
        const index = await this.state.items.findIndex(e => e.id === itemId);
        if (index !== -1) {
            let items = [...this.state.items];
            await items.splice(index, 1);
            await this.setState({ items: this._adjustSuggestionsIndex(items) });
        }
    };

    deletingActivityItem = async itemId => {
        const index = await this.state.items.findIndex(e => e.id === itemId);
        this._setDeletingItemStatus(index, true);
    };

    deletingActivityItemFailed = async itemId => {
        const index = await this.state.items.findIndex(e => e.id === itemId);
        this._setDeletingItemStatus(index, false);
    };

    _setDeletingItemStatus = async (index, isDeleting, isRepost = false) => {
        if (index !== -1) {
            let items = [...this.state.items];
            let item = items[index];
            items[index] = { ...item, [isRepost ? "isDeletingRepost" : "isDeleting"]: true };
            await this.setState({ items });
        }
    };

    deleteRepostItem = async repostId => {
        const index = await this.state.items.findIndex(
            e => e.repostId === repostId && e.verb === "repost",
        );
        if (index !== -1) {
            let items = [...this.state.items];
            await items.splice(index, 1);
            await this.setState({ items: this._adjustSuggestionsIndex(items) });
        }
    };

    deletingRepostItem = async repostId => {
        const index = await this.state.items.findIndex(
            e => e.repostId === repostId && e.verb === "repost",
        );
        this._setDeletingItemStatus(index, true, true);
    };

    deletingRepostItemFailed = async repostId => {
        const index = await this.state.items.findIndex(
            e => e.repostId === repostId && e.verb === "repost",
        );
        this._setDeletingItemStatus(index, false, true);
    };

    addItems = async newItems => {
        const { items } = this.state;
        const { keyString } = this.props;
        await this.setState({
            items: uniqBy([...newItems, ...items], keyString),
        });
    };

    _getItemsWithoutSuggestion = items => {
        const { suggestionIndex } = this.props;
        let newItems = items ? [...items] : [];
        if (suggestionIndex > 0) {
            if (newItems.length > 0) {
                newItems = newItems.filter(item => item.id !== R.strings.suggestions);
            }
        }
        return newItems;
    };

    _addSuggestion = items => {
        const { suggestionIndex } = this.props;
        let newItems = items ? [...items] : [];
        if (suggestionIndex > 0) {
            remove(newItems, item => item.isDeletingRepost || item.isDeleting);
            if (newItems.length > 2) {
                newItems.splice(suggestionIndex, 0, { id: R.strings.suggestions });
            } else {
                newItems.push({ id: R.strings.suggestions });
            }
        }
        return newItems;
    };

    _adjustSuggestionsIndex = items => {
        return this._addSuggestion(this._getItemsWithoutSuggestion(items));
    };

    appendItems = async ({ newItems, hasMore }) => {
        if (!newItems) {
            this.resetLoading();
            return;
        }

        const { items } = this.state;
        const { keyString } = this.props;
        await this.setState({
            items: this._addSuggestion(
                uniqBy([...newItems, ...this._getItemsWithoutSuggestion(items)], keyString),
            ),
            isRefreshing: false,
            isLoadingMore: false,
            hasMoreItems: hasMore ? hasMore : this.state.hasMoreItems,
        });
    };

    setItems = async (isNew, results, error, hasMore = null) => {
        if (error || !results) {
            this.resetLoading();
            return;
        }

        const { isRefreshing, isLoadingMore } = this.state;
        if ((isRefreshing && !isNew) || (isLoadingMore && isNew)) {
            return;
        }

        let hasMoreItems = true;
        if (hasMore === null) {
            const { limit } = this.props;
            if (limit && results.length < limit) {
                hasMoreItems = false;
            }
        } else {
            hasMoreItems = hasMore;
        }
        const { items } = this.state;
        const { keyString, orders } = this.props;
        let newItems = isNew
            ? uniqBy([...results], keyString)
            : uniqBy([...this._getItemsWithoutSuggestion(items), ...results], keyString);
        newItems = orders
            ? _.orderBy(newItems, Object.keys(orders), Object.values(orders))
            : newItems;
        await this.setState({
            items: this._addSuggestion(newItems),
            isLoadingMore: false,
            isRefreshing: false,
            isLoaded: true,
            hasMoreItems,
        });
    };

    defaultListFooterComponent = () => {
        const { items, isRefreshing, hasMoreItems, isLoaded } = this.state;
        if (isRefreshing || !isLoaded) {
            return null;
        }

        // const { emptyText, noMoreText } = this.props;
        if (!items || !items.length) {
            return null;
            // return (
            //     <View style={styles.footerContainer}>
            //         <DescriptionText>{emptyText}</DescriptionText>
            //     </View>
            // );
        }

        return hasMoreItems ? (
            <View style={styles.footerContainer}>
                <ActivityIndicator size='small' />
            </View>
        ) : null;

        // return hasMoreItems ? (
        //     <View style={styles.footerContainer}>
        //         <ActivityIndicator size='small' />
        //     </View>
        // ) : noMoreText ? (
        //     <View style={styles.footerContainer}>
        //         <DescriptionText>{noMoreText}</DescriptionText>
        //     </View>
        // ) : null;
    };

    _loadItems = async isRefresh => {
        const { isRefreshing, isLoadingMore, hasMoreItems } = this.state;
        if ((!isRefresh && (!hasMoreItems || isLoadingMore)) || (isRefresh && isRefreshing)) {
            return;
        }

        if (isRefresh) {
            await this.setState({ isRefreshing: true, isLoadingMore: false }, async () => {
                await this.props.onRefresh();
            });
        } else {
            this.setState({ isLoadingMore: true }, () => {
                this.props.onLoadMore();
            });
        }
    };

    _onRefresh = async () => {
        if (this.props.onRefresh) {
            await this._loadItems(true);
        } else {
            this.setState({ isRefreshing: false });
        }
    };

    _onLoadMore = () => {
        if (this.props.onLoadMore) {
            if (this.state.isLoadingMore || this.props.extraData || !this.state.isLoaded) {
                return;
            }

            if (this.state.hasMoreItems) {
                this._loadItems(false);
            }
        } else {
            this.setState({ isLoadingMore: false, hasMoreItems: false });
        }
    };

    _willFocus = payload => {
        this._removeClippedSubviews();
        const { onStart } = this.props;
        if (onStart) {
            onStart();
            if (this.state.items === null) {
                this._onRefresh();
            }
        }
    };

    _willBlur = payload => {
        if (this.state.isLoaded) {
            this._showClippedSubviews();
        }
        const { onStop } = this.props;
        if (onStop) {
            onStop();
        }
    };

    _removeClippedSubviews = () => this.setState({ shouldRemoveClippedSubviews: true });

    _showClippedSubviews = () => this.setState({ shouldRemoveClippedSubviews: false });

    render() {
        const {
            onRef,
            limit,
            emptyText,
            noMoreText,
            ListFooterComponent,
            onRefresh,
            onLoadMore,
            startPanResponder,
            endPanResponder,
            onViewableItemsChanged,
            keyboardShouldPersistTaps,
            ...rest
        } = this.props;
        const { isRefreshing, items } = this.state;
        return (
            <View style={styles.flex} {...this._panResponder.panHandlers}>
                <NavigationEvents onWillFocus={this._willFocus} onWillBlur={this._willBlur} />
                <FlatList
                    ref={ref => (this._listRef = ref)}
                    style={styles.container}
                    keyExtractor={item => item.id}
                    data={items ? items : []}
                    refreshing={isRefreshing}
                    viewabilityConfig={this._viewabilityConfig}
                    onRefresh={this._onRefresh}
                    scrollEventThrottle={6}
                    removeClippedSubviews={this.state.shouldRemoveClippedSubviews}
                    ListFooterComponent={
                        ListFooterComponent ? ListFooterComponent : this.defaultListFooterComponent
                    }
                    initialScrollNumToRender={2}
                    ListFooterComponentStyle={styles.flex}
                    ListHeaderComponentStyle={styles.flex}
                    keyboardShouldPersistTaps={
                        keyboardShouldPersistTaps ? keyboardShouldPersistTaps : "handled"
                    }
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.1}
                    onViewableItemsChanged={onViewableItemsChanged}
                    {...rest}
                />
            </View>
        );
    }
}

LightFlatList.propTypes = {
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    renderItem: PropTypes.func,
    limit: PropTypes.number,
    emptyText: PropTypes.string,
    noMoreText: PropTypes.string,
    extraData: PropTypes.node,
    startPanResponder: PropTypes.func,
    endPanResponder: PropTypes.func,
    items: PropTypes.array,
    onViewableItemsChanged: PropTypes.func,
    suggestionIndex: PropTypes.number,
    keyString: PropTypes.string,
    orders: PropTypes.object,
};

LightFlatList.defaultProps = {
    onStart: null,
    onStop: null,
    limit: 50,
    noMoreText: "No more",
    emptyText: "",
    extraData: null,
    startPanResponder: nativeEvent => {},
    endPanResponder: nativeEvent => {},
    items: null,
    onViewableItemsChanged: null,
    suggestionIndex: -1,
    keyString: "id",
    orders: null,
};

export default LightFlatList;
