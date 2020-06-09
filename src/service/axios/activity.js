// @flow
import R from "res/R";
import { apiStream, apiRequest, apiStreamImage } from "./api";

export const createActivityRequest = (data: Object) => apiRequest("POST", "activity", data);
export const fetchCommentsRequest = (activityId, next) =>
    apiRequest("GET", "reaction", null, {
        id_lt: next ? next : undefined,
        limit: R.limits.comment,
        withOwnChildren: true,
        activity_id: activityId,
        kind: R.strings.comment,
    });
export const likeActivityRequest = activity =>
    apiRequest("POST", "reaction", {
        type: "reaction",
        activity: activity?.id,
        kind: R.strings.like,
        data: {},
        option: {
            trackAnalytics: true,
            feedId: activity?.actor?.id,
        },
    });

export const dislikeActivityRequest = reactionId => apiRequest("DELETE", `reaction/${reactionId}`);
export const deleteActivityRequest = activityId => apiRequest("DELETE", `activity/${activityId}`);
export const updateActivityRequest = (activityId, activityData) =>
    apiRequest("PUT", `activity/${activityId}`, activityData);

export const addReactionRequest = (kind, activityId, feedId, data = {}) =>
    apiRequest("POST", "reaction", {
        type: "reaction",
        activity: activityId,
        kind,
        data,
        option: {
            trackAnalytics: true,
            feedId,
        },
    });

export const deleteReactionRequest = reactionId => apiRequest("DELETE", `reaction/${reactionId}`);
export const updateReactionRequest = (activityId, reactionId, text) =>
    apiRequest("PUT", `reaction/${reactionId}`, {
        activityId,
        data: { text },
        kind: R.strings.repost,
    });

export const likeCommentRequest = (activity, comment) =>
    apiRequest("POST", "reaction", {
        type: "childReaction",
        activity: comment?.id,
        kind: R.strings.commentLike,
        data: {},
        option: {
            feedId: activity?.actor?.id,
            parentId: comment?.activity_id,
            targetFeeds: comment?.isOwn ? [] : [`notification:${comment?.user_id}`],
        },
    });

export const updateCommentRequest = (activityId, commentId, text) =>
    apiRequest("PUT", `reaction/${commentId}`, {
        activityId: activityId,
        data: { text },
        kind: R.strings.comment,
    });

export const deleteCommentRequest = commentId => apiRequest("DELETE", `reaction/${commentId}`);

export const reportActivityRequest = (activity: Object, type: string) =>
    apiRequest("POST", "report", {
        reportedUser: activity?.actor?.id,
        activityId: activity?.id,
        activityVerb: activity?.verb,
        type,
    });

export const reportCommentRequest = (comment: Object, type: string) =>
    apiRequest("POST", "report", {
        reportedUser: comment.user_id,
        activityId: comment.id,
        type,
        activityVerb: "comment",
    });

export const repostActivityRequest = (activity, text) =>
    apiRequest("POST", `reaction`, {
        activity: activity?.id,
        data: { text },
        type: "reaction",
        kind: "repost",
        option: {
            trackAnalytics: true,
            feedId: activity?.actor?.id,
        },
    });

export const uploadImageRequest = (data: Object) => apiStreamImage("POST", "images", data);
