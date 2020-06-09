import { updateProfileSubject$ } from "../subjects";
import PROFILE from "../constants";

const loading = () => {
    updateProfileSubject$.next(PROFILE.LOADING);
};

const success = () => {
    updateProfileSubject$.next(PROFILE.SUCCESS);
};

const failed = () => {
    updateProfileSubject$.next(PROFILE.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
