// @flow
import R from "res/R";
import { apiRequest } from "./api";

export const fetchActivityFeeds = ({ feedGroup, feedId, next }) =>
    apiRequest("GET", `feed/${feedGroup}/${feedId}`, null, {
        id_lt: next ? next : undefined,
        limit: R.limits.activities,
        withReactionCounts: true,
        withOwnReactions: true,
    });

export const fetchLatestActivityFeeds = ({ feedGroup, feedId, prev, limit }) =>
    apiRequest("GET", `feed/${feedGroup}/${feedId}`, null, {
        id_gt: prev ? prev : undefined,
        limit: limit ? limit : undefined,
        withReactionCounts: true,
        withOwnReactions: true,
    });

export const fetchExploreFeeds = offset =>
    apiRequest("GET", `feed/timeline/explore`, null, {
        withReactionCounts: true,
        withOwnReactions: true,
        limit: R.limits.explore,
        ranking: "explore_latest",
        offset,
    });

export const fetchHashtagFeeds = (hashtag, next) =>
    apiRequest("GET", `feed/hashtag/${hashtag}`, null, {
        id_lt: next ? next : undefined,
        limit: R.limits.hashtag,
        withReactionCounts: true,
        withOwnReactions: true,
    });

export const fetchSingleActivity = (feedGroup, feedId, activityId) =>
    apiRequest("GET", `feed/${feedGroup}/${feedId}`, null, {
        id_lte: activityId,
        id_gte: activityId,
        withReactionCounts: true,
        withOwnReactions: true,
    });
