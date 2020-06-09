// @flow
import { apiRequest } from "./api";

export const fetchActivityLikes = (activityId: String, next: String) =>
    apiRequest("GET", `reaction`, null, { activity_id: activityId, kind: "like", id_lt: next });

export const fetchCommentLikes = (commentId: String, next: String) =>
    apiRequest("GET", `reaction`, null, { reaction_id: commentId, id_lt: next });
