import { notificationSubject$ } from "./subjects";
import NOTIFICATION from "./constants";

const loading = (markSeen, from) => {
    if (from) {
        NOTIFICATION.isLoadingMore = true;
        NOTIFICATION.isRefreshing = false;
    } else {
        NOTIFICATION.isLoadingMore = false;
        NOTIFICATION.isRefreshing = true;
    }
    notificationSubject$.next({ markSeen, from, status: NOTIFICATION.LOADING });
};

const success = (markSeen, from, results, next) => {
    NOTIFICATION.isLoadingMore = false;
    NOTIFICATION.isRefreshing = false;
    notificationSubject$.next({
        markSeen,
        from,
        results,
        next,
        status: NOTIFICATION.SUCCESS,
    });
};

const failed = (markSeen, from) => {
    NOTIFICATION.isLoadingMore = false;
    NOTIFICATION.isRefreshing = false;
    notificationSubject$.next({ markSeen, from, status: NOTIFICATION.FAILED });
};

const isRefreshing = NOTIFICATION.isRefreshing;
const isLoadingMore = NOTIFICATION.isLoadingMore;

module.exports = {
    loading,
    success,
    failed,
    isRefreshing,
    isLoadingMore,
};
