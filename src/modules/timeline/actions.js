import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const startTimeline = createAction(types.TIMELINE_START);
export const stopTimeline = createAction(types.TIMELINE_STOP);

export const loadTimelineFeeds = createAction(types.TIMELINE_FEEDS_LOAD);
export const loadTimelineFeedsFinished = createAction(types.TIMELINE_FEEDS_LOAD_FINISHED);

export const loadSuggestions = createAction(types.TIMELINE_SUGGESTIONS_LOAD);
export const loadSuggestionsFinished = createAction(types.TIMELINE_SUGGESTIONS_LOAD_FINISHED);

export const loadNewTimelineFeeds = createAction(types.TIMELINE_NEW_FEEDS_LOAD);
export const loadNewTimelineFeedsFinished = createAction(types.TIMELINE_NEW_FEEDS_LOAD_FINISHED);
