import { deleteAccountSubject$ } from "../subjects";
import ACCOUNT_DELETE from "../constants";

const loading = () => {
    deleteAccountSubject$.next(ACCOUNT_DELETE.LOADING);
};

const success = () => {
    deleteAccountSubject$.next(ACCOUNT_DELETE.SUCCESS);
};

const failed = () => {
    deleteAccountSubject$.next(ACCOUNT_DELETE.FAILED);
};

module.exports = {
    loading,
    success,
    failed,
};
