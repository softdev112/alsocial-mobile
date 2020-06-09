import { signUpEmailSubject$ } from "../subjects";
import SIGNUP from "../constants";

const loading = () => {
    signUpEmailSubject$.next(SIGNUP.LOADING);
};

const success = () => {
    signUpEmailSubject$.next(SIGNUP.SUCCESS);
};

const failed = () => {
    signUpEmailSubject$.next(SIGNUP.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
