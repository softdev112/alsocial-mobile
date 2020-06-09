import { handleActions, combineActions } from "redux-actions";
import { profileCallFinished, profileCallRefresh } from "./actions";

export const initialState = {
    isLoading: false,
};

export default handleActions(
    {
        [profileCallFinished]: state => ({
            ...state,
            isLoading: false,
        }),
        [profileCallRefresh]: state => ({
            ...state,
            isLoading: true,
        }),
    },
    initialState,
);
