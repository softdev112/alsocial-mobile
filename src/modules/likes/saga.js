// @flow
import { call, takeLatest } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import * as apis from "service/axios/likes";
import likesObservables from "observable/likes";

export function* likesWorker({ payload }: Object): Saga<void> {
    const { id, type, next } = payload;
    try {
        likesObservables.modules.loading(id, next);

        let response;
        if (type === "activity") {
            response = yield call(apis.fetchActivityLikes, id, next);
        } else {
            response = yield call(apis.fetchCommentLikes, id, next);
        }
        const { results, next: likesNext } = response;
        if (Array.isArray(results)) {
            likesObservables.modules.success(id, next, results, likesNext);
        } else {
            likesObservables.modules.failed(id, next);
        }
    } catch (e) {
        console.error(e);
        likesObservables.modules.failed(id, next);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.fetchLikes, likesWorker);
}
