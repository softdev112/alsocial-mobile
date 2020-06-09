import React, { Component } from "react";
import { NavigationBar } from "common/views";
import { ActivityFeedItem, ActivityFeedScreen } from "components";
import PropTypes from "prop-types";
import R from "res/R";

class HashTagScreen extends Component {
    _feedRef: ?ActivityFeedScreen = null;
    _next = undefined;
    _isLoading = false;
    state = {
        hashTag: "",
    };

    constructor(props) {
        super(props);
        const { navigation } = props;
        const hashTag = navigation.getParam("hashTag", null);
        this.state = {
            hashTag,
        };
    }

    componentWillUnmount(): void {
        this._feedRef = null;
    }

    _loadHashTagFeeds = isRefresh => {
        if (!this._feedRef) {
            return;
        }

        if (isRefresh) {
            this._next = undefined;
        } else if (this._isLoading) {
            return;
        }

        const { hashTag } = this.state;
        const { loadHashTagFeeds } = this.props;
        loadHashTagFeeds({
            next: this._next,
            hashtag: hashTag.toLowerCase(),
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

    _onRefresh = () => {
        this._loadHashTagFeeds(true);
    };

    _onLoadMore = () => {
        this._loadHashTagFeeds(false);
    };

    _renderNavigationBar = () => {
        const { hashTag } = this.state;
        return (
            <NavigationBar
                title={hashTag.length > 25 ? `#${hashTag.slice(0, 25)}...` : `#${hashTag}`}
                hasBackButton={true}
            />
        );
    };

    _renderItem = ({ item, index }) => {
        const { hashTag } = this.state;
        return item.isDeleting ? null : (
            <ActivityFeedItem
                activity={item}
                keyValue={`hashtag-feed-${item.id}-${index}`}
                currentHashTag={hashTag}
                feedType={R.strings.feedType.hashtag}
            />
        );
    };
    // Render any loading content that you like here
    render() {
        return (
            <ActivityFeedScreen
                onRef={ref => (this._feedRef = ref)}
                renderNavigationBar={this._renderNavigationBar}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                feedType={R.strings.feedType.hashtag}
            />
        );
    }
}

HashTagScreen.propTypes = {
    loadHashTagFeeds: PropTypes.func,
};
// export default UserProfileScreen;
export default HashTagScreen;
