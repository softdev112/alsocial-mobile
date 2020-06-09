import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const startExplore = createAction(types.EXPLORE_START);
export const stopExplore = createAction(types.EXPLORE_STOP);

export const loadExploreFeed = createAction(types.EXPLORE_FEED_LOAD);
export const loadExploreFeedFinished = createAction(types.EXPLORE_FEEDS_LOAD_FINISHED);
