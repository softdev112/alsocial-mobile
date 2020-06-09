import { Subject } from "rxjs";

const loginSubject$ = new Subject();
const signUpEmailSubject$ = new Subject();
const signUpSubject$ = new Subject();
const interestsSubject$ = new Subject();
const changePasswordSubject$ = new Subject();
const resetPasswordSubject$ = new Subject();
const newPasswordSubject$ = new Subject();
const updateProfileSubject$ = new Subject();
const updateAccountSubject$ = new Subject();
const deleteAccountSubject$ = new Subject();
const followingSubject$ = new Subject();
const confirmingFollowRequestSubject$ = new Subject();
const deletingFollowRequestSubject$ = new Subject();
const newFeedsSubject$ = new Subject();

module.exports = {
    loginSubject$,
    signUpEmailSubject$,
    signUpSubject$,
    interestsSubject$,
    changePasswordSubject$,
    resetPasswordSubject$,
    newPasswordSubject$,
    updateProfileSubject$,
    updateAccountSubject$,
    deleteAccountSubject$,
    followingSubject$,
    confirmingFollowRequestSubject$,
    deletingFollowRequestSubject$,
    newFeedsSubject$,
};
