import { loginSubject$ } from "../subjects";
import LOGIN from "../constants";

const loading = () => {
    loginSubject$.next(LOGIN.LOADING);
};

const success = () => {
    loginSubject$.next(LOGIN.SUCCESS);
};

const failed = () => {
    loginSubject$.next(LOGIN.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
