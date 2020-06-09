import { interestsSubject$ } from "../subjects";
import INTEREST from "../constants";

const loading = () => {
    interestsSubject$.next({ status: INTEREST.LOADING });
};

const success = () => {
    interestsSubject$.next({ status: INTEREST.SUCCESS });
};

const failed = () => {
    interestsSubject$.next({ status: INTEREST.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
