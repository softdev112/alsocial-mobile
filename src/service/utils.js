import { select, call } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { getUserToken, getUserStreamToken } from "modules/user/selectors";
import R from "res/R";

export function objToQueryString(obj: Object): string {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj[key] !== undefined) {
            keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
    }
    return keyValuePairs.join("&");
}

export function* getApiUrl(endpoint: String, params: Object): Saga<String> {
    return yield `${R.configs.SOCIAL_BASE_URI}${endpoint}?${
        params ? objToQueryString(params) + "&" : ""
    }api_key=${R.configs.STREAM.API_KEY}`;
}

export function* getApiHeaders(headers = {}, token: Object = null): Saga<Object> {
    let userToken = token;
    if (!userToken) {
        userToken = yield select(getUserToken);
    }
    return yield {
        Authorization: `Bearer ${userToken ? userToken : ""}`,
        "Content-Type": "application/json",
        Connection: "close",
        ...headers,
    };
}

export function* getStreamUrl(endpoint: String, params: Object): Saga<String> {
    return yield `${R.configs.STREAM.BASE_URI}${endpoint}/?api_key=${
        R.configs.STREAM.API_KEY
    }&location=unspecified&with_follow_counts=true${params ? "&" + objToQueryString(params) : ""}`;
}

export function* getStreamHeaders(headers = {}): Saga<Object> {
    const streamToken = yield select(getUserStreamToken);
    return yield {
        "stream-auth-type": "jwt",
        "Content-Type": "application/json",
        Authorization: streamToken ? streamToken : "",
        ...headers,
    };
}

export function* getStreamImageHeaders(headers = {}): Saga<Object> {
    const streamToken = yield select(getUserStreamToken);
    return yield {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: streamToken ? streamToken : "",
        ...headers,
    };
}
