import { apiRequest, apiStream, apiStreamImage } from "./api";
import R from "res/R";

export const logInRequest = (data: Object) => apiRequest("POST", R.endpoints.logIn, data);
export const signUpRequest = (data: Object) => apiRequest("POST", R.endpoints.signUp, data);

export const userProfileRequest = (profileId: String) =>
    apiRequest("GET", `${R.endpoints.profile}/${profileId}`);

export const checkEmailRequest = (email: string) =>
    apiRequest("POST", R.endpoints.checkEmail, { email });
export const resetEmailRequest = (data: Object) =>
    apiRequest("POST", R.endpoints.resetPassword, data);
export const updatePasswordRequest = (data: Object, tokenUser: string) =>
    apiRequest("POST", R.endpoints.updatePassword, data, {}, tokenUser);
export const editPasswordRequest = ({ current, update, userId }: Object) =>
    apiRequest("PUT", "user/password", { current, update });
export const fetchRecommendations = (params: Object) =>
    apiRequest("GET", "recommendations/interest", undefined, params);

export const updateProfileRequest = (data: Object) => apiRequest("PUT", "user", data);
export const deleteAccountRequest = () => apiRequest("DELETE", "user");

export const fetchDetailsRequest = (id: string) => apiStream("GET", `user/${id}`);
export const fetchDetailsFollowersRequest = (username: string) =>
    apiRequest("GET", `profile/${username}`);
export const fetchUserRequest = (id?: string) => apiRequest("GET", "user");
export const fetchUserSuggestionsRequest = (page: string, per_page: string) =>
    apiRequest("GET", `recommendations`, undefined, { page, per_page });
export const updateDetailsRequest = (data: Object) =>
    apiStream("PUT", `user/${data._id}`, { data });
export const uploadImageRequest = (data: Object) => apiStreamImage("POST", "images", data);
export const verifyEmail = (params: Object) => apiRequest("GET", "auth/verify", undefined, params);
export const getUserId = (path: string) => apiRequest("GET", `user/${path}`);
