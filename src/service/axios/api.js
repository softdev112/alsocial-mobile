import axios from "axios";
import { call, put } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import {
    getApiUrl,
    getApiHeaders,
    getStreamUrl,
    getStreamHeaders,
    getStreamImageHeaders,
} from "../utils";
import R from "res/R";
import { invalidToken } from "modules/user/actions";
import queryString from "query-string";

function* axiosRequest(config): Saga<Object> {
    try {
        const response = yield axios(config)
            .then(res => res)
            .catch(error => error.response);
        if (response?.data?.error === "Token is invalid.") {
            yield put(invalidToken());
        }

        let data = response?.data;
        if (data) {
            if (data?.next) {
                const parsedNext = queryString.parseUrl(data?.next);
                const query = parsedNext?.query;
                if (query) {
                    let next = query?.id_lt;
                    if (!next) {
                        next = query?.offset;
                    }
                    return yield { ...data, next };
                }
            }
            return yield data;
        } else {
            return yield {};
        }
    } catch (e) {
        return yield e;
    }
}
export function* apiRequest(method, path, data, params, token = null): Saga<Object> {
    try {
        const url = yield call(getApiUrl, path, params);
        const headers = yield call(getApiHeaders, {}, token);
        const config = {
            method,
            headers,
            url,
            data,
        };
        return yield call(axiosRequest, config);
    } catch (e) {
        throw e;
    }
}

export function* apiStream(method, path, data, params): Saga<Object> {
    const url = yield call(getStreamUrl, path, params);
    const headers = yield call(getStreamHeaders);
    const config = {
        method,
        headers,
        url,
        data,
    };
    return yield call(axiosRequest, config);
}

export function* apiStreamImage(method: string, path: string, file: File): Saga<Object> {
    const url = `${R.configs.STREAM.BASE_URI}${path}/?api_key=${R.configs.STREAM.API_KEY}`;
    const headers = yield call(getStreamImageHeaders);
    const config = {
        method,
        headers,
        url,
        data: file,
    };
    return yield call(axiosRequest, config);
}

export const socialApi = userToken =>
    axios.create({
        baseURL: R.configs.SOCIAL_BASE_URI,
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
    });

export const streamApi = userToken =>
    axios.create({
        baseURL: R.configs.SOCIAL_BASE_URI,
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
        },
    });
