import { likeSubject$ } from "../subjects";
import LIKE, { likingActivities, updateObjects } from "../constants";

const loading = activityId => {
    updateObjects(likingActivities, activityId, true);
    likeSubject$.next({ activityId, status: LIKE.LOADING });
};

const success = (activityId, likeCount, likeId, isLiked) => {
    updateObjects(likingActivities, activityId, false);
    likeSubject$.next({ activityId, likeCount, likeId, isLiked, status: LIKE.SUCCESS });
};

const failed = activityId => {
    updateObjects(likingActivities, activityId, false);
    likeSubject$.next({ activityId, status: LIKE.FAILED });
};

const isLiking = activityId => {
    return likingActivities.indexOf(activityId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isLiking,
};
