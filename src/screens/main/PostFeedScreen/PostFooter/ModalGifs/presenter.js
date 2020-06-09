import React, { PureComponent } from "react";
import { Modal, KeyboardAvoidingView, View, ActivityIndicator, Platform } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { SearchBox, NavigationBar, MasonryList } from "common/views";
import withObservableStream from "observable/withObservableStream";
import gifsObservables from "observable/gifs";
import _debounce from "lodash/debounce";
import { CloseIcon } from "res/icons";
import { uniqBy } from "lodash";
import { withTheme } from "styled-components";
import { ContainerView, StatusBarView } from "common/themed";

class ModalGifs extends PureComponent {
    _searchState = null;
    _gifState = null;

    _gifNext = "";
    _searchNext = "";
    _query = "";

    initialState = {
        items: null,
        isRefreshing: false,
        isLoadingMore: false,
        hasMoreItems: true,
        isLoaded: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
        };
    }

    componentDidMount(): void {
        this._setupObservables();
        if (this.state.items === null) {
            this._onRefresh();
        }
    }

    componentWillUnmount(): void {
        console.log("Unmount");
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this._searchNext = null;
        this._gifNext = null;
        this._query = null;
        this._searchState = null;
        this._gifState = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            gifsObservables.subjects.gifsSubject$.subscribe(
                ({ query: search, results, next, isNew, error }) => {
                    const query = this._query;
                    if (search !== undefined && query === search) {
                        this.setItems(
                            isNew,
                            results.map(item => {
                                return {
                                    id: item.tiny,
                                    uri: item.tiny,
                                    dimensions: { width: item.width, height: item.height },
                                };
                            }),
                            error,
                        );
                        if (query && !!query.length) {
                            this._searchNext = next;
                        } else {
                            this._gifNext = next;
                        }
                    }
                },
            ),
        );
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
        const newItems = await (isNew
            ? uniqBy([...results], "id")
            : uniqBy([...items, ...results], "id"));
        await this.setState({
            items: newItems,
            isLoadingMore: false,
            isRefreshing: false,
            isLoaded: true,
            hasMoreItems,
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

    resetLoading = async () => {
        if (this.state.isRefreshing || this.state.isLoadingMore) {
            await this.setState({ isRefreshing: false, isLoadingMore: false });
        }
    };

    _loadGifs = isRefresh => {
        const { fetchGifs } = this.props;
        const isSearch = this._query && !!this._query.length;
        fetchGifs({
            type: isSearch ? "search" : "trending",
            query: this._query,
            next: isRefresh ? null : isSearch ? this._searchNext : this._gifNext,
        });
    };

    _loadItems = async isRefresh => {
        const { isRefreshing, isLoadingMore, hasMoreItems } = this.state;
        if ((!isRefresh && (!hasMoreItems || isLoadingMore)) || (isRefresh && isRefreshing)) {
            return;
        }

        if (isRefresh) {
            await this.setState({ isRefreshing: true, isLoadingMore: false }, () => {
                this._loadGifs(true);
            });
        } else {
            await this.setState({ isLoadingMore: true }, () => {
                this._loadGifs(false);
            });
        }
    };

    _onRefresh = () => {
        this._loadItems(true);
    };

    _onLoadMore = () => {
        if (this.state.isLoadingMore || this.props.extraData) {
            return;
        }

        if (this.state.hasMoreItems) {
            this._loadItems(false);
        }
    };

    _renderNavigationBar = () => {
        const { onCloseReq } = this.props;
        return (
            <NavigationBar
                leftIcon={<CloseIcon />}
                hasBackButton={true}
                handleLeft={onCloseReq}
                input={
                    <SearchBox
                        onChangeText={_debounce(this._onSearch, 500)}
                        placeholder={"Search for GIFs"}
                        style={styles.search}
                    />
                }
            />
        );
    };

    _onSearch = (query: string) => {
        if (query === this._query) {
            return;
        }
        this._query = query;
        this._onRefresh();
        if (query && !!query.length) {
            this._gifState = this.state;
            this.updateItems(this._searchState);
        } else {
            this._searchState = this.state;
            this.updateItems(this._gifState);
        }
    };

    defaultListFooterComponent = () => {
        const { isRefreshing, hasMoreItems, isLoaded } = this.state;
        if (isRefreshing || !isLoaded) {
            return null;
        }

        return hasMoreItems ? (
            <View style={styles.footerContainer}>
                <ActivityIndicator size='small' />
            </View>
        ) : null;
    };

    _onPressImage = data => {
        this.props.onSelectedGif(data.uri);
    };

    // Render any loading content that you like here
    render() {
        const { visibleModal, onCloseReq, theme } = this.props;
        const { items, isRefreshing } = this.state;
        return (
            <ContainerView>
                <Modal visible={visibleModal} onRequestClose={onCloseReq}>
                    <KeyboardAvoidingView
                        style={styles.flex}
                        behavior='padding'
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -310}
                        enabled
                    >
                        <View style={styles.container}>
                            {Platform.OS === "ios" ? <StatusBarView /> : null}
                            {this._renderNavigationBar()}

                            <MasonryList
                                items={items ? items : []}
                                onEndReached={() => this._onLoadMore()}
                                onPressImage={this._onPressImage}
                                onRefresh={() => this._onRefresh()}
                                refreshing={isRefreshing}
                                renderFooter={this.defaultListFooterComponent}
                                backgroundColor={theme.color.background}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </ContainerView>
        );
    }
}

ModalGifs.propTypes = {
    fetchGifs: PropTypes.func,
    visibleModal: PropTypes.bool,
    onCloseReq: PropTypes.func,
    onSelectedGif: PropTypes.func,
};

ModalGifs.defaultProps = {
    visibleModal: false,
};

export default withObservableStream({})(withTheme(ModalGifs));
