import { suggestionsSubject$ } from "../subjects";
import TIMELINE_SUGGESTIONS from "../constants";

const loading = () => {
    suggestionsSubject$.next(TIMELINE_SUGGESTIONS.LOADING);
};

const success = () => {
    suggestionsSubject$.next(TIMELINE_SUGGESTIONS.SUCCESS);
};

const failed = () => {
    suggestionsSubject$.next(TIMELINE_SUGGESTIONS.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
