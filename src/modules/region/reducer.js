import { handleActions } from "redux-actions";
import * as actions from "./actions";

export const initialState = {
    region: {},
};

export default handleActions(
    {
        [actions.loadRegionSuccess]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
    },
    initialState,
);
