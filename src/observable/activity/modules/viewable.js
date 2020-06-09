import { viewableSubject$ } from "../subjects";

const changedViewable = items => {
    viewableSubject$.next(items);
};

module.exports = {
    changedViewable,
};
