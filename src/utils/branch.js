import axios from "axios";
import { Platform } from "react-native";

import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import R from "res/R";
import { store } from "../../App";

const getUserInfo = async currentStore => {
    try {
        const { userState } = await currentStore.getState();

        const userToken = userState.token || null;
        const userId = userState._id || null;

        return { userToken, userId };
    } catch (e) {
        console.log("Error getting user state");
    }
};

const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj[key] !== undefined) {
            keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
    }
    return keyValuePairs.join("&");
};

const getApiUrl = (endpoint, params) => {
    return `${R.configs.SOCIAL_BASE_URI}${endpoint}?${
        params ? objToQueryString(params) + "&" : ""
    }api_key=${R.configs.STREAM.API_KEY}`;
};

const getApiHeaders = (headers = {}, token = null) => {
    return {
        Authorization: `Bearer ${token ? token : ""}`,
        "Content-Type": "application/json",
        ...headers,
    };
};

const navigateToContent = async params => {
    const { userToken, userId } = await getUserInfo(store);
    if (!userToken || !userId) return;

    if (params.activity_id) {
        try {
            const { activity_id, actor_id } = params;
            const options = {
                id_lte: activity_id,
                id_gte: activity_id,
                withReactionCounts: true,
                withOwnReactions: true,
            };

            const headers = getApiHeaders({}, userToken);
            const url = getApiUrl(`feed/user/${actor_id}`, options);

            const { data } = await axios({
                method: "GET",
                url,
                params: options,
                headers,
            });

            const activity = data.results.filter(a => a.id === activity_id)[0];

            return NavigationService.push(Main.Comment, {
                activity,
                feedType: "Profile",
                isMention: false,
            });
        } catch (e) {
            console.log(e);
        }
    }

    if (params.$canonical_url) {
        const { actor_id } = params;
        const username = params.$canonical_url.split("https://allsocial.com/")[1];

        setTimeout(
            () => {
                if (actor_id && username) {
                    if (userId === actor_id) {
                        return NavigationService.navigate(Main.Profile, {
                            profileId: actor_id,
                            username,
                        });
                    } else {
                        return NavigationService.push(Main.User, {
                            profileId: actor_id,
                            username,
                        });
                    }
                }
            },
            Platform.OS === "android" ? 1000 : 0,
        );
    }

    if (params.path && params.path !== "/") {
        try {
            const path = params.path.slice(1);

            const headers = getApiHeaders({}, userToken);
            const url = getApiUrl(`user/${path}`);

            const { data: profileId } = await axios({
                method: "GET",
                url,
                headers,
            });

            if (profileId && !profileId.includes("<")) {
                return NavigationService.push(Main.User, {
                    profileId,
                    username: path,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
};

export const branchNavigation = async params => {
    if (params["+non_branch_link"] || !params["+clicked_branch_link"]) return;

    return navigateToContent(params);
};
