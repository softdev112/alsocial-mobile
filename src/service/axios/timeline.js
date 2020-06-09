import { apiRequest } from "./api";
import R from "res/R";

export const fetchSuggestionsRequest = (page: string, per_page: string) =>
    apiRequest("GET", `recommendations`, undefined, { page, per_page });

export const fetchActivityFeeds = ({ feedGroup, feedId, next, prev, limit }) =>
    apiRequest("GET", `feed/${feedGroup}/${feedId}`, null, {
        id_lt: next ? next : undefined,
        id_gt: prev ? prev : undefined,
        limit: prev ? (limit ? limit : undefined) : R.limits.activities,
        withReactionCounts: true,
        withOwnReactions: true,
    });
