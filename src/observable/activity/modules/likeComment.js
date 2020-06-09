import { likeCommentSubject$ } from "../subjects";
import LIKE, { likingComments, updateObjects } from "../constants";

const loading = (activityId, commentId) => {
    updateObjects(likingComments, commentId, true);
    likeCommentSubject$.next({ activityId, commentId, status: LIKE.LOADING });
};

const success = (activityId, commentId, likeId, isLiked, likeCount) => {
    updateObjects(likingComments, commentId, false);
    likeCommentSubject$.next({
        activityId,
        commentId,
        likeId,
        isLiked,
        likeCount,
        status: LIKE.SUCCESS,
    });
};

const failed = (activityId, commentId) => {
    updateObjects(likingComments, commentId, false);
    likeCommentSubject$.next({ activityId, commentId, status: LIKE.FAILED });
};

const isLiking = commentId => {
    return likingComments.indexOf(commentId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isLiking,
};
