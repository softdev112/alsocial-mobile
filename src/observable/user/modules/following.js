import { followingSubject$ } from "../subjects";
import FOLLOWING, { followings, followUsers } from "../constants";
import { updateObjects } from "../../utils";

const loading = userId => {
    updateObjects(followings, userId, true);
    followingSubject$.next({ userId, status: FOLLOWING.LOADING });
};

const success = (userId, followStatus) => {
    updateObjects(followings, userId, false);
    followUsers[userId] = { ...followUsers[userId], ...followStatus };
    followingSubject$.next({
        userId,
        followStatus: followUsers[userId],
        status: FOLLOWING.SUCCESS,
    });
};

const failed = userId => {
    updateObjects(followings, userId, false);
    followingSubject$.next({ userId, status: FOLLOWING.FAILED });
};

const isLoading = userId => {
    return followings.indexOf(userId) !== -1;
};

const getFollowStatus = userId => {
    return followUsers[userId] ? followUsers[userId] : null;
};

module.exports = {
    loading,
    success,
    failed,
    isLoading,
    getFollowStatus,
};
