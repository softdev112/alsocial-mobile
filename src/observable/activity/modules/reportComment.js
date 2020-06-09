import { reportCommentSubject$ } from "../subjects";
import REPORT, { reportingComments, updateObjects } from "../constants";

const loading = commentId => {
    updateObjects(reportingComments, commentId, true);
    reportCommentSubject$.next({ commentId, status: REPORT.LOADING });
};

const success = commentId => {
    updateObjects(reportingComments, commentId, false);
    reportCommentSubject$.next({ commentId, status: REPORT.SUCCESS });
};

const failed = commentId => {
    updateObjects(reportingComments, commentId, false);
    reportCommentSubject$.next({ commentId, status: REPORT.FAILED });
};

const isReporting = commentId => {
    return reportingComments.indexOf(commentId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isReporting,
};
