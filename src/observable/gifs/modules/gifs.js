import { gifsSubject$ } from "../subjects";
import GIFS from "../constants";

const loading = () => {
    gifsSubject$.next({});
};

const success = ({ query, results, next, isNew }) => {
    gifsSubject$.next({
        results: results.map(gif => ({
            id: gif.id,
            standard: gif.media[0].gif.url,
            tiny: gif.media[0].tinygif.url,
            width: gif.media[0].gif.dims[0],
            height: gif.media[0].gif.dims[1],
        })),
        next,
        isNew,
        query,
    });
};

const failed = error => {
    gifsSubject$.next({ error });
};

module.exports = {
    loading,
    success,
    failed,
};
