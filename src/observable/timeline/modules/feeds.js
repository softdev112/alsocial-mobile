import { feedsSubject$ } from "../subjects";
import TIMELINE_FEED from "../constants";

const loading = () => {
    feedsSubject$.next(TIMELINE_FEED.LOADING);
};

const success = () => {
    feedsSubject$.next(TIMELINE_FEED.SUCCESS);
};

const failed = () => {
    feedsSubject$.next(TIMELINE_FEED.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
