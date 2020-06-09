import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const loadTimelineFeed = createAction(types.FEED_TIMELINE);
export const loadExploreFeed = createAction(types.FEED_EXPLORE);
export const loadSingleActivity = createAction(types.FEED_SINGLE);
export const loadHashtagFeed = createAction(types.FEED_HASHTAG);
