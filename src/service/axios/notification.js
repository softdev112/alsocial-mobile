// @flow
import R from "res/R";
import { apiRequest } from "./api";

export const fetchNotifications = (to: String, from: String, markSeen: Boolean) =>
    apiRequest("GET", `notification`, null, {
        withReactionCounts: true,
        withOwnReactions: true,
        ...(to ? {} : { limit: R.limits.notification }),
        mark_seen: markSeen,
        ...(from ? { id_lt: from } : {}),
        ...(to ? { id_gt: to } : {}),
    });
