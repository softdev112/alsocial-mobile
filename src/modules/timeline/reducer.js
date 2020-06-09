import { combineActions, handleActions } from "redux-actions";
import * as actions from "./actions";

export const initialState = {
    feeds: [],
    suggestions: [],
};

export default handleActions({}, initialState);
