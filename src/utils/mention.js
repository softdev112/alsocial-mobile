import algolia from "algoliasearch";
import _ from "lodash";
import R from "res/R";

const algoliaIndex = algolia(
    R.configs.ALGOLIA_SEARCH.APP_ID,
    R.configs.ALGOLIA_SEARCH.API_KEY,
).initIndex(R.configs.ALGOLIA_SEARCH.INDEX);

export function getMentions(activity) {
    let mentions = activity.mentions || {};
    if (activity.verb === R.strings.repost) {
        mentions = { ...mentions, ...activity.object.mentions };
    }
    if (activity.reaction && activity.reaction.data && activity.reaction.data.mentions) {
        mentions = { ...mentions, ...activity.reaction.data.mentions };
    }
    return mentions;
}

export const searchMentions = async (query: Object, callback: Function) => {
    if (query && !callback) {
        return null;
    }

    await algoliaIndex.search({ query: query, hitsPerPage: 5 }, (err, res) => {
        if (!err) {
            const normalizedList = _.uniqBy(res.hits, i => i.id);
            callback({ query, results: normalizedList });
        } else {
            callback({});
        }
    });
};
