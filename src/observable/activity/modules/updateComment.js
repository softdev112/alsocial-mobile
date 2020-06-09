import { updateCommentSubject$ } from "../subjects";
import COMMENT from "../constants";

const loading = (activityId, commentId) => {
    updateCommentSubject$.next({ activityId, commentId, status: COMMENT.LOADING });
};

const success = (activityId, commentId, newComment) => {
    updateCommentSubject$.next({ activityId, commentId, newComment, status: COMMENT.SUCCESS });
};

const failed = (activityId, commentId) => {
    updateCommentSubject$.next({ activityId, commentId, status: COMMENT.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
