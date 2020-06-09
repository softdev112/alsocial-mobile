import React, { Component } from "react";
import { View, Platform } from "react-native";
import { NavigationBar, CreateInline } from "common/views";
import PropTypes from "prop-types";
import { ActivityFeedItem, ActivityFeedScreen, Suggestions, NewActivity } from "components";
import withObservableStream from "observable/withObservableStream";
import timelineObservables from "observable/timeline";
import R from "res/R";
import styles from "./styles";
import { branchNavigation } from "utils/branch";
import { BranchConsumer } from "../../../context/BranchContext";
import branch from "react-native-branch";

class TimelineScreen extends Component {
    _feedRef: ?ActivityFeedScreen = null;
    _suggestionsRef: ?Suggestions = null;
    _next = null;
    _isLoading = false;
    _isFocused = false;

    state = {
        newTimelines: 0,
    };

    async componentDidMount(): void {
        const { setAppMainStatus, navigation } = this.props;
        this.refocusSubscription = navigation.addListener("refocus", this.scrollToTop);
        this._setupObservables();
        setAppMainStatus();

        if (!this.props.params.navigated) {
            if (Platform.OS === "android") {
                const params = await branch.getLatestReferringParams(true);
                await this.props.setParams({ ...params, navigated: "true" });
                this.callBranch(this.props.params);
            }
        }

        if (this.props.params.navigated === "false") {
            await this.props.setParams({ ...this.props.params, navigated: "true" });
            this.callBranch(this.props.params);
        }
    }

    callBranch = params => {
        if (!this.state.branchCalled) {
            branchNavigation(params);
            this.setState({ branchCalled: true });
        }
    };

    componentWillUnmount(): void {
        this._feedRef = null;
        this._suggestionsRef = null;
        this.refocusSubscription.remove();

        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            timelineObservables.subjects.newTimelineSubject$.subscribe(({ isOwn, length }) => {
                const newTimelines = this.state.newTimelines + length;
                if (isOwn && this._feedRef && this._feedRef._listRef) {
                    this._feedRef._listRef.scrollToTop();
                    this.setState({ newTimelines: 0 });
                    const items = this._feedRef.getStates().items;
                    this.props.loadNewFeeds({
                        latestFeedId: items && !!items.length ? items[0].id : undefined,
                        limit: newTimelines,
                    });
                } else {
                    this.setState({
                        newTimelines,
                    });
                }
            }),
        );

        subscriptions.push(
            timelineObservables.subjects.newFeedsSubject$.subscribe(
                ({ newFeeds, next, status }) => {
                    if (!this._feedRef) {
                        return;
                    }
                    if (status === timelineObservables.constants.LOADING) {
                        if (this._isFocused) {
                            this._feedRef.refreshing();
                        }
                    } else if (status === timelineObservables.constants.SUCCESS && !!newFeeds) {
                        const hasMore = next && next !== "";
                        this._feedRef.appendItems({ newItems: newFeeds, hasMore });
                    } else {
                        this._feedRef.resetLoading();
                    }
                },
            ),
        );
    };

    scrollToTop = ({ isFocused }: Object) => {
        if (isFocused && this._feedRef && this._feedRef._listRef) {
            this._feedRef._listRef.scrollToTop();
        }
    };

    _loadTimeline = async isRefresh => {
        if (!this._feedRef) {
            return;
        }

        if (isRefresh) {
            this._next = undefined;
        } else if (this._isLoading) {
            return;
        }

        const { loadTimeline } = this.props;
        await loadTimeline({
            next: this._next,
            callback: ({ isLoading, results, next, curNext, error }) => {
                if (!this._feedRef || this._next !== curNext) {
                    return;
                }
                this._isLoading = isLoading;
                if (!isLoading) {
                    if (error === undefined && Array.isArray(results)) {
                        const hasMore = next !== null && next !== undefined;
                        this._feedRef.setItems(isRefresh, results, error, hasMore);
                        this._next = next;
                    } else {
                        this._feedRef.resetLoading();
                    }
                }
            },
        });
    };

    _onRefresh = async () => {
        if (this._suggestionsRef) {
            this._suggestionsRef.checkSuggestions();
        }
        await this.setState({ newTimelines: 0 });
        await this._loadTimeline(true);
    };

    _onLoadMore = () => {
        this._loadTimeline(false);
    };

    _renderNavigationBar = () => {
        const { newTimelines } = this.state;
        return (
            <>
                <NavigationBar />
                <NewActivity counter={newTimelines} onPress={this._handleNewActivityPress} />
            </>
        );
    };

    _handleNewActivityPress = async () => {
        if (this._feedRef) {
            if (this._feedRef._listRef) {
                await this._feedRef._listRef.scrollToTop();
            }
            const items = this._feedRef.getStates().items;
            await this.props.loadNewFeeds({
                latestFeedId: items && !!items.length ? items[0].id : undefined,
                limit: this.state.newTimelines,
            });
        }
        await this.setState({ newTimelines: 0 });
    };

    _renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <CreateInline />
            </View>
        );
    };

    _renderItem = ({ item, index }) => {
        if (item.id === R.strings.suggestions) {
            return (
                <Suggestions
                    onRef={ref => (this._suggestionsRef = ref)}
                    unRef={() => (this._suggestionsRef = null)}
                    key={R.strings.suggestions}
                />
            );
        } else {
            return item.isDeleting ? null : (
                <ActivityFeedItem
                    activity={item}
                    keyValue={`timeline-feed-${item.id}-${index}`}
                    feedType={R.strings.feedType.timeline}
                />
            );
        }
    };

    _onStart = () => {
        this.props.startTimeline();
        this._isFocused = true;
        if (this._suggestionsRef) {
            this._suggestionsRef.checkSuggestions();
        }
    };

    _onStop = () => {
        this._isFocused = false;
        this.props.stopTimeline();
        if (this._feedRef) {
            this._feedRef.resetLoading();
        }
    };

    render() {
        return (
            <ActivityFeedScreen
                onRef={ref => (this._feedRef = ref)}
                renderNavigationBar={this._renderNavigationBar}
                renderHeader={this._renderHeader}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                feedType={R.strings.feedType.timeline}
                onStart={this._onStart}
                onStop={this._onStop}
                suggestionIndex={2}
            />
        );
    }
}

TimelineScreen.propTypes = {
    startTimeline: PropTypes.func.isRequired,
    stopTimeline: PropTypes.func.isRequired,
    loadTimeline: PropTypes.func.isRequired,
    setAppMainStatus: PropTypes.func.isRequired,
};

const ContextTimeline = props => (
    <BranchConsumer>
        {({ params, setParams }) => (
            <TimelineScreen {...props} params={params} setParams={setParams} />
        )}
    </BranchConsumer>
);

export default withObservableStream({})(ContextTimeline);
