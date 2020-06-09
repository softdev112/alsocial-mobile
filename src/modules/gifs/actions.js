import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const fetchGifs = createAction(types.GIFS_FETCH);
