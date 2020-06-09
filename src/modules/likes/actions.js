import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const fetchLikes = createAction(types.LIKED_USERS);
