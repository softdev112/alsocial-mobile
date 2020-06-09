// @flow
import { takeLatest, put, select } from "redux-saga/effects";
import type { Saga } from "redux-saga";

import { fetchGifs } from "./actions";
import gifObservables from "observable/gifs";

export function* fetchGifsWorker({ payload = {} }: Object): Saga<void> {
    const { type = "trending", query = "", next } = payload;

    try {
        gifObservables.modules.gifs.loading();
        const response = yield fetch(
            `https://api.tenor.com/v1/${type}?q=${query}&key=7BTDOHXU1D2C&limit=30&media_filter=minimal&contentfilter=high${
                next ? "&pos=" + next : ""
            }`,
        );
        const body = yield response.json();

        gifObservables.modules.gifs.success({ ...body, query, isNew: !(next && !!next.length) });
    } catch (err) {
        gifObservables.modules.gifs.failed(err);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(fetchGifs, fetchGifsWorker);
}
