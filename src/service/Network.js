// @flow
import { select } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { getUserStreamToken, getUserToken } from "modules/user/selectors";
import { objToQueryString } from "./utils";
import R from "res/R";

export function* apiRequest(
    method: string = "POST",
    url: string,
    data: Object = {},
    params: Object = {},
): Saga<Object> {
    const token = yield select(getUserToken);
    let body;
    try {
        body = JSON.stringify(data);
    } catch (error) {
        console.log(error);
    }
    return yield fetch(`${R.configs.SOCIAL_BASE_URI}${url}?${objToQueryString(params)}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body,
    });
}

export function* apiStream(
    method: string,
    url: string,
    data: Object = {},
    params: Object = {},
): Saga<Object> {
    const streamToken = yield select(getUserStreamToken);
    const uri = `${R.configs.STREAM.BASE_URI}${url}/?api_key=${
        R.configs.STREAM.API_KEY
    }&location=unspecified&with_follow_counts=true${objToQueryString(params)}`;
    let body;
    try {
        body = JSON.stringify(data);
    } catch (error) {
        console.log(error);
    }
    return yield fetch(uri, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: streamToken,
            "stream-auth-type": "jwt",
        },
        body,
    });
}

export function* apiStreamImage(method: string, url: string, file: File): Object {
    const streamToken = yield select(getUserStreamToken);
    return yield fetch(`${R.configs.STREAM.BASE_URI}${url}/?api_key=${R.configs.STREAM.API_KEY}`, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: streamToken,
        },
        body: file,
    });
}
