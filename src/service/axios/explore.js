import { apiRequest } from "./api";
import R from "res/R";

export const fetchExploreFeeds = offset =>
    apiRequest("GET", `feed/timeline/explore`, null, {
        withReactionCounts: true,
        withOwnReactions: true,
        limit: R.limits.explore,
        ranking: "explore_latest",
        offset,
    });
