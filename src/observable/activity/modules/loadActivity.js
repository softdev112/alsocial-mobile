import { loadActivitySubject$ } from "../subjects";
import ACTIVITY from "../constants";

const loading = activityId => {
    loadActivitySubject$.next({ activityId, status: ACTIVITY.LOADING });
};

const success = (activityId, newActivity) => {
    loadActivitySubject$.next({
        activityId,
        newActivity,
        status: ACTIVITY.SUCCESS,
    });
};

const failed = activityId => {
    loadActivitySubject$.next({ activityId, status: ACTIVITY.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
