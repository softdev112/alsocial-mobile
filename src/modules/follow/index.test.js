// import { put, select, call } from "redux-saga/effects";
// import { cloneableGenerator } from "redux-saga/utils";
//
// import * as actions from "./actions";
// import * as types from "./actionTypes";
// import * as saga from "./saga";
// import reducer, { initialState } from "./reducer";
// import { activateLoaderScreen } from "../App/actions";
// import { followersStateSelector } from "./selectors";
//
// describe("follow Actions", () => {
//     it("should be create fetchFollowers action", () => {
//         expect(actions.fetchFollowers()).toEqual({ type: types.FOLLOWERS_FETCH_FOLLOWERS });
//     });
//
//     it("should be create fetchMoreFollowers action", () => {
//         expect(actions.fetchMoreFollowers()).toEqual({
//             type: types.FOLLOWERS_FETCH_MORE_FOLLOWERS,
//         });
//     });
//
//     it("should be create fetchFollowersSuccess action", () => {
//         expect(actions.fetchFollowersSuccess()).toEqual({
//             type: types.FOLLOWERS_FETCH_FOLLOWERS_SUCCESS,
//         });
//     });
//
//     it("should be create fetchFollowersFailure action", () => {
//         expect(actions.fetchFollowersFailure()).toEqual({
//             type: types.FOLLOWERS_FETCH_FOLLOWERS_FAILURE,
//         });
//     });
// });
//
// describe("follow Reducer", () => {
//     const fetchFollowersPayload = { type: "testType", userId: "testId" };
//     const fetchFollowersSuccessPayload = { type: "testType", userId: "testId" };
//     const fetchFollowersFailurePayload = { error: "Test error message" };
//
//     it("should return initial state", () => {
//         expect(reducer(undefined, {})).toEqual(initialState);
//     });
//
//     it("should return loading state", () => {
//         expect(reducer(undefined, actions.fetchFollowers(fetchFollowersPayload))).toEqual({
//             ...initialState,
//             ...fetchFollowersPayload,
//             loading: true,
//         });
//     });
//
//     it("should return loading state", () => {
//         expect(reducer(undefined, actions.fetchMoreFollowers())).toEqual({
//             ...initialState,
//             loading: true,
//         });
//     });
//
//     it("should return follow", () => {
//         expect(
//             reducer(undefined, actions.fetchFollowersSuccess(fetchFollowersSuccessPayload)),
//         ).toEqual({
//             ...initialState,
//             ...fetchFollowersSuccessPayload,
//         });
//     });
//
//     it("should return an error to store", () => {
//         expect(
//             reducer(undefined, actions.fetchFollowersFailure(fetchFollowersFailurePayload)),
//         ).toEqual({
//             ...initialState,
//             error: fetchFollowersFailurePayload,
//         });
//     });
// });
