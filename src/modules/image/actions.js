import { createAction } from "redux-actions";
import * as types from "./actionTypes";

export const addImageInfo = createAction(types.IMAGE_INFO);
export const uploadImage = createAction(types.IMAGE_UPLOAD);
