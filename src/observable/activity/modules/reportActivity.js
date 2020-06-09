import { reportActivitySubject$ } from "../subjects";
import REPORT, { reportingActivities, updateObjects } from "../constants";

const loading = activityId => {
    updateObjects(reportingActivities, activityId, true);
    reportActivitySubject$.next({ activityId, status: REPORT.LOADING });
};

const success = activityId => {
    updateObjects(reportingActivities, activityId, false);
    reportActivitySubject$.next({ activityId, status: REPORT.SUCCESS });
};

const failed = activityId => {
    updateObjects(reportingActivities, activityId, false);
    reportActivitySubject$.next({ activityId, status: REPORT.FAILED });
};

const isReporting = activityId => {
    return reportingActivities.indexOf(activityId) !== -1;
};

module.exports = {
    loading,
    success,
    failed,
    isReporting,
};
