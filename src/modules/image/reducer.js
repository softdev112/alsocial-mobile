import { handleActions, combineActions } from "redux-actions";

import { addImageInfo } from "./actions";

const initialState = {};

export default handleActions(
    {
        [combineActions(addImageInfo)]: (state, { payload }) => ({
            ...state,
            [payload.id]: {
                ...payload,
            },
        }),
    },
    initialState,
);
