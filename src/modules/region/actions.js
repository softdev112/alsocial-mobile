import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const loadRegion = createAction(types.REGION_LOAD);
export const loadRegionSuccess = createAction(types.REGION_LOAD_SUCCESS);
