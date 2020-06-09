import React, { Component } from "react";
import { NavigationBar, LightFlatList, UserItem } from "common/views";
import R from "res/R";
import styles from "./styles";
import { capitalize } from "utils/helper";
import { ContainerView } from "common/themed";

class FollowScreen extends Component {
    _listRef: ?LightFlatList = null;
    state = {
        page: 0,
        type: "",
        userId: "",
    };

    constructor(props) {
        super(props);
        const { navigation } = props;
        const type = navigation.getParam("type").replace(/^\w/, c => c.toLowerCase());
        const userId = navigation.getParam("id") || "";
        this.state = {
            page: 0,
            type,
            userId,
        };
    }

    componentWillUnmount(): void {
        this._listRef = null;
    }

    _loadUsers = isRefresh => {
        if (!this._listRef) {
            return;
        }

        const { type, page, userId } = this.state;
        const { loadFollowRequest } = this.props;
        loadFollowRequest({
            userId,
            type,
            page: isRefresh ? 0 : page + 1,
            callback: ({ results, page: curPage, error }) => {
                if (this._listRef) {
                    if (Array.isArray(results)) {
                        this._listRef.setItems(
                            isRefresh,
                            results.map(item => {
                                item.id = item._id;
                                return item;
                            }),
                            error,
                        );
                        this.setState({
                            page: curPage,
                        });
                    } else {
                        this._listRef.resetLoading();
                    }
                }
            },
        });
    };

    _onRefresh = () => {
        this._loadUsers(true);
    };

    _onLoadMore = () => {
        this._loadUsers(false);
    };

    _renderItem = ({ item, index }) => {
        const { _id, profileImage, username } = item;
        return (
            <UserItem
                avatar={profileImage}
                containerStyle={styles.userContainer}
                username={username}
                actorId={_id}
                actor={item}
                size={R.dimensions.image.avatar.large}
                keyValue={`user-${_id}-${index}`}
                style={{ flex: 1 }}
            />
        );
    };
    // Render any loading content that you like here
    render() {
        const { type } = this.state;
        return (
            <ContainerView>
                <NavigationBar title={capitalize(type)} hasBackButton={true} />
                <LightFlatList
                    onRef={ref => (this._listRef = ref)}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    limit={R.limits.follow}
                    noMoreText={null}
                />
            </ContainerView>
        );
    }
}

// export default UserProfileScreen;
export default FollowScreen;
