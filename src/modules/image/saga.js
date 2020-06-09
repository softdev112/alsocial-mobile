// @flow
import { takeLatest } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { Platform } from "react-native";
import { uploadImageRequest } from "service/axios/user";
import * as actions from "./actions";
function* uploadImageWorker(imageUri, contentType): Saga<String> {
    if (!Boolean(imageUri)) return false;
    try {
        const formData: FormData = new FormData();
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("file", {
            uri: imageUri,
            name: filename,
            type: Platform.OS === "android" ? contentType : type,
        });

        const upload = yield uploadImageRequest(formData);
        const { file } = yield upload.json();

        if (upload.ok) {
            return file;
        } else {
            return "";
        }
    } catch (err) {
        console.log(err);
        return "";
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.uploadImage, uploadImageWorker);
}
