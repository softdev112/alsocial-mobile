import { repostSubject$ } from "../subjects";
import REPOST, { repostingActivities } from "../constants";
import { updateObjects } from "../../utils";

const loading = activityId => {
    updateObjects(repostingActivities, activityId, true);
    repostSubject$.next({ activityId, status: REPOST.LOADING });
};

const success = (activityId, repostId) => {
    updateObjects(repostingActivities, activityId, false);
    repostSubject$.next({ activityId, repostId, status: REPOST.SUCCESS });
};

const failed = activityId => {
    updateObjects(repostingActivities, activityId, false);
    repostSubject$.next({ activityId, status: REPOST.FAILED });
};

const isLoading = activityId => {
    return repostingActivities.indexOf(activityId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isLoading,
};
