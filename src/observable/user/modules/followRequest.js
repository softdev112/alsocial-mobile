import { confirmingFollowRequestSubject$, deletingFollowRequestSubject$ } from "../subjects";
import FOLLOWING, {
    confirmingFollowRequests,
    deletingFollowRequests,
    followUsers,
} from "../constants";
import { updateObjects } from "../../utils";

const loading = (userId, isDelete) => {
    updateObjects(isDelete ? deletingFollowRequests : confirmingFollowRequests, userId, true);
    if (isDelete) {
        confirmingFollowRequestSubject$.next({ userId, status: FOLLOWING.LOADING });
    } else {
        deletingFollowRequestSubject$.next({ userId, status: FOLLOWING.LOADING });
    }
};

const success = (userId, follower, isDelete) => {
    updateObjects(isDelete ? deletingFollowRequests : confirmingFollowRequests, userId, false);
    const followStatus = followUsers[userId];
    if (followStatus) {
        followStatus.follower = follower;
        followingSubject$.next({ userId, followStatus, status: FOLLOWING.SUCCESS });
    }
    if (isDelete) {
        confirmingFollowRequestSubject$.next({ userId, status: FOLLOWING.SUCCESS });
    } else {
        deletingFollowRequestSubject$.next({ userId, status: FOLLOWING.SUCCESS });
    }
};

const failed = (userId, isDelete) => {
    updateObjects(isDelete ? deletingFollowRequests : confirmingFollowRequests, userId, false);
    if (isDelete) {
        confirmingFollowRequestSubject$.next({ userId, status: FOLLOWING.FAILED });
    } else {
        deletingFollowRequestSubject$.next({ userId, status: FOLLOWING.FAILED });
    }
};

const isConfirming = userId => {
    return confirmingFollowRequests.indexOf(userId) !== -1;
};

const isDeleting = userId => {
    return deletingFollowRequests.indexOf(userId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isConfirming,
    isDeleting,
};
