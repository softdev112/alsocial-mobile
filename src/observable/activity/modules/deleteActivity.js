import { deleteSubject$ } from "../subjects";
import ACTIVITY, { deletingActivities, updateObjects } from "../constants";

const loading = activity => {
    activity.isDeleting = true;
    updateObjects(deletingActivities, activity?.id, true);
    deleteSubject$.next({ activity, status: ACTIVITY.LOADING });
};

const success = activity => {
    activity.isDeleting = false;
    updateObjects(deletingActivities, activity?.id, false);
    deleteSubject$.next({ activity, status: ACTIVITY.SUCCESS });
};

const failed = activity => {
    activity.isDeleting = false;
    updateObjects(deletingActivities, activity?.id, false);
    deleteSubject$.next({ activity, status: ACTIVITY.FAILED });
};

const isDeleting = activity => {
    return deletingActivities.indexOf(activity.id) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isDeleting,
};
