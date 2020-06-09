import { deleteCommentSubject$ } from "../subjects";
import DELETE, { deletingComments, updateObjects } from "../constants";

const loading = (activity, comment) => {
    updateObjects(deletingComments, comment?.id, true);
    deleteCommentSubject$.next({ activity, comment, status: DELETE.LOADING });
};

const success = (activity, comment) => {
    updateObjects(deletingComments, comment?.id, false);
    activity.commentCount = Math.max(activity.commentCount - 1, 0);
    deleteCommentSubject$.next({ activity, comment, status: DELETE.SUCCESS });
};

const failed = (activity, comment) => {
    updateObjects(deletingComments, comment?.id, false);
    deleteCommentSubject$.next({ activity, comment, status: DELETE.FAILED });
};

const isDeleting = commentId => {
    return deletingComments.indexOf(commentId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isDeleting,
};
