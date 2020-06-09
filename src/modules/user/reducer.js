import { handleActions, combineActions } from "redux-actions";
import * as actions from "./actions";

export const initialState = {
    token: null,
    streamToken: null,
    jti: null,
    _id: null,
    exp: null,
    lat: null,
    bio: "",
    city: "",
    country: "",
    email: "",
    gender: "",
    interests: [],
    isPublic: false,
    name: "",
    phone: "",
    postalCode: "",
    profileImage: "",
    coverImage: "",
    state: "",
    username: "",
    followers_count: 0,
    following_count: 0,
    location: "",
    website: "",
};

export default handleActions(
    {
        [combineActions(
            actions.logInSuccess,
            actions.signUpSuccess,
            actions.updateProfileSuccess,
            actions.fetchUserDetailsSuccess,
            actions.fetchUserProfileSuccess,
        )]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [combineActions(actions.invalidToken, actions.logOut)]: () => ({
            initialState,
        }),
    },
    initialState,
);
