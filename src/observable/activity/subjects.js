import { Subject } from "rxjs";

const likeSubject$ = new Subject();
const repostSubject$ = new Subject();
const deleteRepostSubject$ = new Subject();
const deleteSubject$ = new Subject();
const commentSubject$ = new Subject();
const deleteCommentSubject$ = new Subject();
const likeCommentSubject$ = new Subject();
const newPostFeedSubject$ = new Subject();
const newTimelineSubject$ = new Subject();
const reportActivitySubject$ = new Subject();
const reportCommentSubject$ = new Subject();
const loadActivitySubject$ = new Subject();
const viewableSubject$ = new Subject();
const updateActivitySubject$ = new Subject();
const updateCommentSubject$ = new Subject();
const updateRepostSubject$ = new Subject();

module.exports = {
    likeSubject$,
    repostSubject$,
    deleteRepostSubject$,
    deleteSubject$,
    commentSubject$,
    deleteCommentSubject$,
    likeCommentSubject$,
    newPostFeedSubject$,
    newTimelineSubject$,
    reportActivitySubject$,
    reportCommentSubject$,
    loadActivitySubject$,
    viewableSubject$,
    updateActivitySubject$,
    updateCommentSubject$,
    updateRepostSubject$,
};
