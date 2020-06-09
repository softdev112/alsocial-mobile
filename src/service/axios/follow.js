import R from "res/R";
import { apiRequest } from "./api";

export const fetchFollowUsersRequest = (id, page, type) =>
    apiRequest("GET", R.endpoints.follow, null, { id, page, type, per_page: R.limits.follow });
export const fetchFollowingStatusRequest = (profileId: string) =>
    apiRequest("GET", `follow/${profileId}`);
export const updateFollowingStatusRequest = (profileId: string) =>
    apiRequest("POST", `follow/${profileId}`);
export const deleteFollowingStatusRequest = (profileId: string) =>
    apiRequest("DELETE", `follow/${profileId}`);
export const blockFollowingStatusRequest = (profileId: string) =>
    apiRequest("POST", `follow/${profileId}/block`);
export const deleteBlockFollowingStatusRequest = (profileId: string) =>
    apiRequest("DELETE", `follow/${profileId}/block`);
export const acceptFollowRequest = (profileId: string) =>
    apiRequest("POST", `follow/${profileId}/request`);
export const rejectFollowRequest = (profileId: string) =>
    apiRequest("DELETE", `follow/${profileId}/request`);
export const fetchDetailsRequest = (profileId: string) => apiRequest("GET", `profile/${profileId}`);
