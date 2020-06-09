import { Subject } from "rxjs";

const notificationSubject$ = new Subject();

module.exports = {
    notificationSubject$,
};
