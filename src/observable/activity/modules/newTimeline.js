import { newTimelineSubject$ } from "../subjects";

const hasNewTimeline = (isOwn, length) => {
    newTimelineSubject$.next({ isOwn, length });
};

module.exports = {
    hasNewTimeline,
};
