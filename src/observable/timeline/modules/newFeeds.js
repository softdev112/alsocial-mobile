import { newFeedsSubject$ } from "../subjects";
import NEW_FEEDS from "../constants";

const loading = () => {
    newFeedsSubject$.next({ status: NEW_FEEDS.LOADING });
};

const success = (newFeeds, next) => {
    newFeedsSubject$.next({ newFeeds, next, status: NEW_FEEDS.SUCCESS });
};

const failed = () => {
    newFeedsSubject$.next({ status: NEW_FEEDS.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
