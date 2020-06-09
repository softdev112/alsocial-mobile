import { deleteRepostSubject$ } from "../subjects";
import REPOST, { deletingRepostActivities, updateObjects } from "../constants";

const loading = repostId => {
    updateObjects(deletingRepostActivities, repostId, true);
    deleteRepostSubject$.next({ repostId, status: REPOST.LOADING });
};

const success = (activityId, repostId) => {
    updateObjects(deletingRepostActivities, repostId, false);
    deleteRepostSubject$.next({ activityId, repostId, status: REPOST.SUCCESS });
};

const failed = repostId => {
    updateObjects(deletingRepostActivities, repostId, false);
    deleteRepostSubject$.next({ repostId, status: REPOST.FAILED });
};

const isDeleting = repostId => {
    return deletingRepostActivities.indexOf(repostId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isDeleting,
};
