import { newPasswordSubject$ } from "../subjects";
import NEW_PASSWORD from "../constants";

const loading = () => {
    newPasswordSubject$.next(NEW_PASSWORD.LOADING);
};

const success = () => {
    newPasswordSubject$.next(NEW_PASSWORD.SUCCESS);
};

const failed = () => {
    newPasswordSubject$.next(NEW_PASSWORD.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
