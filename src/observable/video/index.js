import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const changedFullscreenSubject$ = new Subject();

const enterFullscreen = () => {
    changedFullscreenSubject$.pipe(debounceTime(500)).next(true);
};

const exitFullscreen = () => {
    changedFullscreenSubject$.pipe(debounceTime(500)).next(false);
};

module.exports = {
    changedFullscreenSubject$,
    enterFullscreen,
    exitFullscreen,
};
