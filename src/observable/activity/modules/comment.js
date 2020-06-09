import { commentSubject$ } from "../subjects";
import COMMENT from "../constants";

const loading = activity => {
    commentSubject$.next({ activity, status: COMMENT.LOADING });
};

const success = (activity, comment) => {
    activity.commentCount = Math.max(activity.commentCount + 1, 0);
    commentSubject$.next({ activity, comment, status: COMMENT.SUCCESS });
};

const failed = activity => {
    commentSubject$.next({ activity, status: COMMENT.FAILED });
};

module.exports = {
    loading,
    success,
    failed,
};
