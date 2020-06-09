// @flow
import stream from "getstream";
import { eventChannel } from "redux-saga";
import axios from "axios";
import queryString from "query-string";
import R from "res/R";

class GetStreamClient {
    constructor(credentials, userId) {
        const { apiKey, userToken, streamToken, appId, baseUrl } = credentials;
        this._userToken = userToken;
        this._streamToken = streamToken;

        this._streamJSClient = stream.connect(apiKey, this._streamToken, appId);
        this._streamRESTClient = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${this._userToken}`,
                "Content-Type": "application/json",
            },
        });

        this._userReference = this._streamJSClient.user(userId);

        this._notificationJSReference = this._streamJSClient.feed(
            "notification",
            userId,
            this._streamToken,
        );

        this._timelineJSReference = this._streamJSClient.feed(
            "timeline",
            userId,
            this._streamToken,
        );

        this._profileFeedJSReference = this._streamJSClient.feed("user", userId, this._streamToken);

        this.restReference = (next, url, _nextPage, singleActivity) =>
            this._streamRESTClient
                .get(url, {
                    params: {
                        withReactionCounts: true,
                        withOwnReactions: true,
                        limit: R.limits.activities,
                        withRecentReactions: true,
                        withOwnChildren: true,
                        id_lt:
                            !singleActivity && next && this[_nextPage]
                                ? this[_nextPage]
                                : undefined,
                        id_lte: singleActivity,
                        id_gte: singleActivity,
                    },
                })
                .then(res => res)
                .then(res => {
                    const { data } = res;
                    if (data.next) {
                        const { next: nextUri } = data;
                        const parsedNext = queryString.parseUrl(nextUri);
                        this[_nextPage] = parsedNext?.query?.id_lt;
                    }

                    return data;
                })
                .catch(error => ({ error }));

        this._timelineRestReference = (next = false) =>
            this.restReference(next, `feed/timeline/${userId}`, "_nextTimeline");

        this._profileFeedRestReference = (next = false) =>
            this.restReference(next, `feed/user/${userId}`, "_nextProfileFeed");

        this._selectedProfileFeedRestReference = (next = false, profileId, singleActivity) =>
            this.restReference(
                next,
                `feed/user/${profileId}`,
                "_nextSelectedProfileFeed",
                singleActivity,
            );

        this._hashtagFeedRestReference = (next = false, hashtag) =>
            this.restReference(next, `feed/hashtag/${hashtag}`, "_nextHashtagFeed");

        this._commentsRestReference = (next = false, activity_id) =>
            this._streamRESTClient
                .get("reaction", {
                    params: {
                        limit: R.limits.comments,
                        withOwnChildren: true,
                        activity_id,
                        kind: "comment",
                        id_lt: next && this._nextComments ? this._nextComments : undefined,
                    },
                })
                .then(res => res)
                .then(res => {
                    const { data } = res;
                    if (data.next) {
                        const { next: nextUri } = data;
                        const parsedNext = queryString.parseUrl(nextUri);
                        this._nextComments = parsedNext?.query?.id_lt;
                    }
                    return data;
                })
                .catch(error => ({ error }));
    }

    addReaction({ activity, kind, feedId, data = {}, targetFeeds = [], parentId, type }) {
        return this._streamRESTClient
            .post("reaction", {
                activity,
                kind,
                data,
                option: {
                    feedId,
                    targetFeeds,
                    parentId,
                },
            })
            .then(res => res)
            .then(res => {
                const { data } = res;
                return data;
            })
            .catch(error => ({ error }));
    }

    removeReaction({ reactionId }) {
        return this._streamRESTClient
            .delete(`reaction/${reactionId}`)
            .then(res => res)
            .then(res => {
                const { data } = res;
                return data;
            })
            .catch(error => ({ error }));
    }

    userReference() {
        return this._userReference;
    }

    notificationReference() {
        return this._notificationJSReference;
    }

    notificationChannel() {
        return eventChannel(emit => {
            this._notificationJSReference.subscribe(emit);
            return () => this._notificationJSReference.unsubscribe(emit);
        });
    }

    timelineReference({ next }) {
        return this._timelineRestReference(next);
    }

    timelineChannel() {
        return eventChannel(emit => {
            this._timelineJSReference.subscribe(emit);
            return () => this._timelineJSReference.unsubscribe(emit);
        });
    }

    profileFeedReference({ next }) {
        return this._profileFeedRestReference(next);
    }

    profileFeedChannel() {
        return eventChannel(emit => {
            this._profileFeedJSReference.subscribe(emit);
            return () => this._profileFeedJSReference.unsubscribe(emit);
        });
    }

    selectedProfileFeedReference({ next, profileId, singleActivity }) {
        return this._selectedProfileFeedRestReference(next, profileId, singleActivity);
    }

    selectedProfileFeedChannel({ profileId }) {
        this._selectedProfileFeedJSReference = this._streamJSClient.feed(
            "user",
            profileId,
            this._streamToken,
        );

        return eventChannel(emit => {
            this._selectedProfileFeedJSReference.subscribe(emit);
            return () => this._selectedProfileFeedJSReference.unsubscribe(emit);
        });
    }

    hashtagFeedReference({ next, hashtag }) {
        return this._hashtagFeedRestReference(next, hashtag);
    }

    hashtagFeedChannel({ hashtag }) {
        const _hashtagFeedJSReference = this._streamJSClient.feed(
            "hashtag",
            hashtag,
            this._streamToken,
        );

        return eventChannel(emit => {
            _hashtagFeedJSReference.subscribe(emit);
            return () => _hashtagFeedJSReference.unsubscribe(emit);
        });
    }

    commentsReference({ next, activity_id }) {
        return this._commentsRestReference(next, activity_id);
    }
}

const instance = (credentials, userId) => new GetStreamClient(credentials, userId);

Object.freeze(instance);

export default instance;
