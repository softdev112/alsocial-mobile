import { likesSubject$ } from "./subjects";
import LIKES from "./constants";

const loading = (id, next) => {
    likesSubject$.next({ id, next, status: LIKES.LOADING });
};

const success = (id, next, results, likesNext) => {
    likesSubject$.next({
        id,
        next,
        results,
        likesNext,
        status: LIKES.SUCCESS,
    });
};

const failed = (id, next) => {
    likesSubject$.next({ id, next, status: LIKES.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
