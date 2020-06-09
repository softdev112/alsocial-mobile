import { resetPasswordSubject$ } from "../subjects";
import RESET_PASSWORD from "../constants";

const loading = () => {
    resetPasswordSubject$.next(RESET_PASSWORD.LOADING);
};

const success = () => {
    resetPasswordSubject$.next(RESET_PASSWORD.SUCCESS);
};

const failed = () => {
    resetPasswordSubject$.next(RESET_PASSWORD.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
