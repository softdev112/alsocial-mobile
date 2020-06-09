import { signUpSubject$ } from "../subjects";
import SIGNUP from "../constants";

const loading = () => {
    signUpSubject$.next(SIGNUP.LOADING);
};

const success = () => {
    signUpSubject$.next(SIGNUP.SUCCESS);
};

const failed = () => {
    signUpSubject$.next(SIGNUP.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
