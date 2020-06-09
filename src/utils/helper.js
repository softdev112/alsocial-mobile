// @flow
import React from "react";
import URL from "url-parse";
import qs from "query-string";
import R from "res/R";
import isURL from "is-url";
import { Dimensions, Platform, Alert, Linking } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const capitalize = str =>
    str
        .split(" ")
        .map(e => `${e.charAt(0).toUpperCase()}${e.slice(1)}`)
        .join(" ");

export function sanitizeURL(url) {
    if (url === null) {
        return url;
    }

    const proto = URL(url).protocol;
    if (proto === "https:" || proto === "http:" || proto === "ftp:") {
        return url;
    }

    return undefined;
}

export function generateRandomId() {
    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

/**
 * @return {string}
 */
function S4() {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * @param {string} url
 * @returns {string} value that can be used to distinguish between conceptually different urls
 */
export function hashOgUrl(url) {
    function normalizePort(parsed) {
        // if https, normalize to http
        if (parsed.port) {
            if (parsed.protocol === "https:" && parsed.port === "443") return "80";
            return parsed.port;
        }
        if (parsed.protocol === "http:") return "80";
        if (parsed.protocol === "https:") return "80";
        return parsed.port;
    }

    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");
    const port = normalizePort(parsed);
    const qp = qs.parse(parsed.query);
    const query = qs.stringify({
        v: qp.v || qp.w || qp.video || qp.watch,
    });
    const protocol =
        parsed.protocol === "http:" || parsed.protocol === "https:" ? "http:" : parsed.protocol;

    return `${protocol}//${parsed.auth}@${hostname}:${port}${parsed.pathname}?${query}`;
}

export function normalizeActivity(activity) {
    function normalizeOg(og) {
        if (!og) return [];
        if (Array.isArray(og)) return og;
        return [og];
    }

    function normalizeOrder(attachments) {
        // default order 'og, images, files'
        if (!attachments.order) {
            return [
                ...attachments.og.map((o, idx) => ({
                    type: "og",
                    idx,
                })),
                ...attachments.images.map((o, idx) => ({
                    type: "images",
                    idx,
                })),
                ...attachments.files.map((o, idx) => ({
                    type: "files",
                    idx,
                })),
            ];
        }

        return attachments.order;
    }

    const attachments = activity.attachments || {};

    // OPTIMIZE: might be worth it to apply normalization in-place and at top-level
    const normalizedActivity = {
        ...activity,
        attachments: {
            ...attachments,
            og: normalizeOg(attachments.og),
            files: attachments.files || [],
            images: attachments.images || [],
        },
    };

    normalizedActivity.attachments.order = normalizeOrder(normalizedActivity.attachments);

    return normalizedActivity;
}

export function prepareAttachments(attachments) {
    return attachments.order.reduce((a, { type, idx }) => {
        const content = attachments[type][idx];

        return content ? [...a, { type, idx, content }] : a;
    }, []);
}

const isValidURL = (value: string): boolean => isURL(value);
export async function getShareableContent(activity: Object) {
    const { text, object, actor, id } = activity;
    const message: string = object instanceof Object ? object.text : text;
    let url: string = `https://${R.configs.WEBSITE}/${actor.data.username}/${id}`;
    url = (await isValidURL(url)) ? encodeURI(url) : "";
    return [message, url];
}

export function isIphoneX() {
    const dimen = Dimensions.get("window");

    return (
        Platform.OS === "ios" &&
        (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
    );
}

export function handleDeniedPermissions(isCamera?: boolean) {
    const message = isCamera
        ? "Turn on Access to Camera to allow AllSocial to Take the Photo"
        : "Turn on Access to Photos to allow AllSocial to Read your Photos";
    Alert.alert("Access is denied", message, [
        {
            text: "Cancel",
            style: "cancel",
        },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
    ]);
}

export function checkPermissions(type: string, getImage: Function) {
    const isIOS = Platform.OS === "ios";
    return Promise.all([
        check(PERMISSIONS[isIOS ? "IOS" : "ANDROID"].CAMERA),
        check(isIOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
    ]).then(([camera, photo]) => {
        if (
            (camera !== RESULTS.GRANTED ||
                (camera === RESULTS.GRANTED && photo !== RESULTS.GRANTED)) &&
            type === "camera"
        ) {
            if (camera === RESULTS.BLOCKED) {
                return handleDeniedPermissions(true);
            }

            return request(PERMISSIONS[isIOS ? "IOS" : "ANDROID"].CAMERA).then(permission => {
                if (permission === RESULTS.GRANTED) {
                    if (photo === RESULTS.BLOCKED) {
                        handleDeniedPermissions();
                    } else {
                        getImage(type);
                    }
                }
            });
        }
        if (photo !== RESULTS.GRANTED && type === "library") {
            if (photo === RESULTS.BLOCKED) {
                return handleDeniedPermissions();
            }
            return request(
                isIOS ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ).then(permission => {
                if (permission === RESULTS.GRANTED) {
                    getImage(type);
                }
            });
        }
        if (
            (type === "camera" && camera === RESULTS.GRANTED) ||
            (type === "library" && photo === RESULTS.GRANTED)
        ) {
            getImage(type);
        }
    });
}

export const getHeight = (width, height) => {
    return (height / width) * R.dimensions.screen.width;
};

export function followersFormatter(number: number) {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    // eslint-disable-next-line no-bitwise
    const tier = (Math.log10(number) / 3) | 0;

    if (tier === 0) return { quantity: number, letter: "" };

    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;

    return { quantity: scaled.toFixed(1), letter: suffix };
}
