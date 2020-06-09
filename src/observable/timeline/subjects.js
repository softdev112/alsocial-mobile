import { Subject } from "rxjs";

const feedsSubject$ = new Subject();
const suggestionsSubject$ = new Subject();
const newTimelineSubject$ = new Subject();
const newFeedsSubject$ = new Subject();

module.exports = {
    feedsSubject$,
    suggestionsSubject$,
    newTimelineSubject$,
    newFeedsSubject$,
};
