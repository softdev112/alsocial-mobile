import { newPostFeedSubject$ } from "../subjects";
import POST_FEED from "../constants";

const loading = () => {
    newPostFeedSubject$.next(POST_FEED.LOADING);
};

const success = () => {
    newPostFeedSubject$.next(POST_FEED.SUCCESS);
};

const failed = () => {
    newPostFeedSubject$.next(POST_FEED.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
