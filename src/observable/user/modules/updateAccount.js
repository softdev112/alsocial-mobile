import { updateAccountSubject$ } from "../subjects";
import PROFILE from "../constants";

const loading = () => {
    updateAccountSubject$.next(PROFILE.LOADING);
};

const success = () => {
    updateAccountSubject$.next(PROFILE.SUCCESS);
};

const failed = () => {
    updateAccountSubject$.next(PROFILE.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
