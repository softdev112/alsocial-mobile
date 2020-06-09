import { updateActivitySubject$ } from "../subjects";
import { LOADING, SUCCESS, FAILED } from "../constants";

const loading = () => {
    updateActivitySubject$.next({ status: LOADING });
};

const success = () => {
    updateActivitySubject$.next({ status: SUCCESS });
};

const failed = () => {
    updateActivitySubject$.next({ status: FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
