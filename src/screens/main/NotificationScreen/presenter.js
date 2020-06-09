import React, { Component } from "react";
import { ContainerView, LineView } from "common/themed";
import { NavigationBar, LightFlatList } from "common/views";
import R from "res/R";
import { NotificationItem } from "components";
import withObservableStream from "observable/withObservableStream";
import notificationObservables from "observable/notification";

class NotificationScreen extends Component {
    _listRef: ?LightFlatList = null;
    _next = undefined;
    _isLoaded = false;

    state = {
        isFocused: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }

    componentDidMount(): void {
        const { navigation } = this.props;
        this.refocusSubscription = navigation.addListener("refocus", this.scrollToTop);
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this.refocusSubscription.remove();
    }

    _setupObservables = () => {
        const { subscriptions, seenNotifications } = this.props;
        subscriptions.push(
            notificationObservables.subjects.notificationSubject$.subscribe(
                ({ markSeen, from, results, next, status }) => {
                    if (status === notificationObservables.constants.SUCCESS) {
                        const hasMore = next !== "" && next !== null && next !== undefined;
                        if (this._listRef) {
                            if (!Array.isArray(results)) {
                                this._listRef.resetLoading();
                            } else {
                                if (markSeen) {
                                    this._listRef.setItems(!from, results, null, hasMore);
                                } else {
                                    this._listRef.appendItems({ newItems: results, hasMore });
                                }
                            }
                        } else {
                            this._listRef.resetLoading();
                        }
                        if (from === this._next) {
                            this._next = hasMore ? next : undefined;
                        }

                        if (this.state.isFocused) {
                            seenNotifications();
                        }
                    } else if (status === notificationObservables.constants.FAILED) {
                        if (this._listRef) {
                            this._listRef.resetLoading();
                        }
                    }
                },
            ),
        );
    };

    scrollToTop = () => {
        const { seenNotifications } = this.props;
        seenNotifications();

        if (this._listRef) {
            this._listRef.scrollToTop();
            this._listRef._onRefresh();
        }
    };

    _loadNotifications = isRefresh => {
        if (!this._listRef) {
            return;
        }

        const { loadNotifications } = this.props;
        loadNotifications({
            from: this._next,
            isRefresh,
            markSeen: true,
        });
    };

    _onRefresh = () => {
        if (notificationObservables.modules.isRefreshing) {
            return;
        }
        this._next = undefined;
        this._loadNotifications(true);
    };

    _onLoadMore = () => {
        if (
            notificationObservables.modules.isRefreshing ||
            notificationObservables.modules.isLoadingMore
        ) {
            return;
        }
        this._loadNotifications(false);
    };

    _onStart = () => {
        this.setState({ isFocused: true });

        const { seenNotifications } = this.props;
        seenNotifications();
        if (!this._isLoaded && this._listRef) {
            this._listRef._onRefresh();
            this._isLoaded = true;
        }
    };

    _onStop = () => {
        this.setState({ isFocused: false });
    };

    // Render any loading content that you like here
    render() {
        const { notifications, userId, username } = this.props;
        return (
            <ContainerView>
                <NavigationBar title={R.strings.header.notifications} />
                <LightFlatList
                    onRef={ref => (this._listRef = ref)}
                    renderItem={({ item, index }) => (
                        <NotificationItem
                            notification={item}
                            keyValue={`{notification-${item.id}-${index}`}
                            userId={userId}
                            username={username}
                        />
                    )}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    ItemSeparatorComponent={() => <LineView />}
                    items={notifications}
                    onStart={this._onStart}
                    onStop={this._onStop}
                    keyString={"group"}
                />
            </ContainerView>
        );
    }
}

export default withObservableStream({})(NotificationScreen);
