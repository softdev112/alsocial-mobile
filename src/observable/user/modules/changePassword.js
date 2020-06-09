import { changePasswordSubject$ } from "../subjects";
import CHANGE_PASSWORD from "../constants";

const loading = () => {
    changePasswordSubject$.next(CHANGE_PASSWORD.LOADING);
};

const success = () => {
    changePasswordSubject$.next(CHANGE_PASSWORD.SUCCESS);
};

const failed = () => {
    changePasswordSubject$.next(CHANGE_PASSWORD.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
