// @flow
import { call, put, select, take, takeLatest, takeEvery } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import R from "res/R";
import axios from "axios";

export function* loadRegionWorker(): Saga<void> {
    try {
        // const url = R.configs.REGION_URL;
        // const config = {
        //     method: "GET",
        //     url,
        // };
        // const response = yield call(axios, config);
        // yield call(console.log, response);
    } catch (e) {
        yield call(console.log, e);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.loadRegion, loadRegionWorker);
}
