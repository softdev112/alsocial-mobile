import { updateRepostSubject$ } from "../subjects";
import { LOADING, SUCCESS, FAILED } from "../constants";

const loading = () => {
    updateRepostSubject$.next({ status: LOADING });
};

const success = activityId => {
    updateRepostSubject$.next({ activityId, status: SUCCESS });
};

const failed = () => {
    updateRepostSubject$.next({ status: FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
