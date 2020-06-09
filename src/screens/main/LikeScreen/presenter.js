import React, { Component } from "react";
import { NavigationBar, LightFlatList, UserItem } from "common/views";
import R from "res/R";
import styles from "./styles";
import { ContainerView } from "common/themed";
import withObservableStream from "observable/withObservableStream";
import likesObservables from "observable/likes";

const LikesType = {
    ACTIVITY: 0,
    COMMENT: 1,
};

class LikeScreen extends Component {
    _listRef: ?LightFlatList = null;
    _id = null;
    _next = undefined;
    _type = LikesType.ACTIVITY;

    constructor(props) {
        super(props);
        const { navigation } = props;
        this._id = navigation.getParam("activityId", null);
        if (this._id === null) {
            this._id = navigation.getParam("commentId", null);
            this._type = LikesType.COMMENT;
        }
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this._listRef = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;

        subscriptions.push(
            likesObservables.subjects.likesSubject$.subscribe(
                ({ id, next, results, likesNext, status }) => {
                    if (id === this._id && next === this._next) {
                        if (status === likesObservables.constants.SUCCESS) {
                            if (this._listRef) {
                                const hasMore = likesNext && likesNext !== "";
                                this._listRef.setItems(
                                    next === null || next === undefined,
                                    results
                                        .map(item => item?.user?.data)
                                        .filter(item => item)
                                        .map(item => {
                                            item.id = item._id;
                                            return item;
                                        }),
                                    null,
                                    hasMore,
                                );
                                this._next = likesNext;
                            }
                        } else {
                            if (this._listRef) {
                                this._listRef.resetLoading();
                            }
                        }
                    }
                },
            ),
        );
    };

    _onRefresh = () => {
        const { loadLikes } = this.props;
        this._next = undefined;
        loadLikes({
            id: this._id,
            type: this._type === LikesType.ACTIVITY ? "activity" : "comment",
        });
    };

    _onLoadMore = async () => {
        const { loadLikes } = this.props;
        loadLikes({
            id: this._id,
            type: this._type === LikesType.ACTIVITY ? "activity" : "comment",
            next: this._next,
        });
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
        return (
            <ContainerView>
                <NavigationBar title={"Likes"} hasBackButton={true} />
                <LightFlatList
                    onRef={ref => (this._listRef = ref)}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    noMoreText={""}
                />
            </ContainerView>
        );
    }
}

export default withObservableStream({})(LikeScreen);
