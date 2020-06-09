import {
    deletingComments,
    likingActivities,
    likingComments,
    LOADING,
    SUCCESS,
    FAILED,
} from "../constants";
import repost from "./repost";
import { commentSubject$, likeSubject$, likeCommentSubject$ } from "../subjects";
import R from "res/R";

const completedReaction = (activity, reaction, isAdd) => {
    if (activity === null) {
        return null;
    }

    let ownReactions = {};
    let reactionCounts = {};
    let latestReactions = {};

    if (activity.id === reaction.activity_id) {
        if (reaction.kind === "comment_like") {
            const comment = activity.latest_reactions?.comment.find(
                ({ id }) => id === reaction.parent,
            );

            if (comment) {
                ownReactions = comment.own_children
                    ? comment.own_children
                    : (comment.own_children = {} && {});
                reactionCounts =
                    comment.children_counts && Object.keys(comment.children_counts).length
                        ? comment.children_counts
                        : (comment.children_counts = {} && {});
                latestReactions =
                    comment.latest_children && Object.keys(comment.latest_children).length
                        ? comment.latest_children
                        : (comment.latest_children = {} && {});
            }
        } else {
            ownReactions = activity.own_reactions;
            reactionCounts = activity.reaction_counts;
            latestReactions = activity.latest_reactions;
        }
    } else if (
        reaction.kind === R.strings.repost &&
        activity.verb === R.strings.repost &&
        activity.object.id === reaction.activity_id
    ) {
        ownReactions = activity.object.own_reactions;
        reactionCounts = activity.object.reaction_counts;
        latestReactions = activity.object.latest_reactions;
    }

    if (isAdd) {
        latestReactions[reaction.kind]
            ? latestReactions[reaction.kind].unshift({ ...reaction })
            : (latestReactions[reaction.kind] = [{ ...reaction }]);

        ownReactions[reaction.kind]
            ? ownReactions[reaction.kind].unshift({ ...reaction })
            : (ownReactions[reaction.kind] = [{ ...reaction }]);

        reactionCounts[reaction.kind]
            ? (reactionCounts[reaction.kind] += 1)
            : (reactionCounts[reaction.kind] = 1);
    } else {
        ownReactions[reaction.kind]
            ? (ownReactions[reaction.kind] = ownReactions[reaction.kind].filter(
                  ({ id }) => id !== reaction.id,
              ))
            : (ownReactions[reaction.kind] = []);

        reactionCounts[reaction.kind]
            ? Math.max((reactionCounts[reaction.kind] -= 1), 0)
            : (reactionCounts[reaction.kind] = 0);

        latestReactions[reaction.kind]
            ? (latestReactions[reaction.kind] = latestReactions[reaction.kind].filter(
                  ({ id }) => id !== reaction.id,
              ))
            : (latestReactions[reaction.kind] = []);
    }
    return activity;
};

const updateObjects = (objects, id, processing) => {
    const index = objects.indexOf(id);
    if (!processing && index !== -1) {
        objects.splice(index, 1);
    } else if (processing && index === -1) {
        objects.push(id);
    }
};

const likeActivitySubscription = (activity, processing) => {
    if (!activity || !activity.id) {
        return;
    }
    activity.isLiking = processing;
    updateObjects(likingActivities, activity.id, processing);
    likeSubject$.next(activity);
};

const commentSubscription = (activity, comment, processing, isAdd) => {
    if (!activity || !activity.id || !comment) {
        return;
    }
    if (!isAdd) {
        comment.isDeleting = processing;
        updateObjects(deletingComments, comment.id, processing);
        commentSubject$.next({ activity, comment, isAdd });
    } else if (!processing) {
        commentSubject$.next({ activity, comment, isAdd });
    }
};

const likeCommentSubscription = (activity, comment, processing) => {
    if (!comment || !comment.id) {
        return;
    }

    comment.isLiking = processing;
    updateObjects(likingComments, comment.id, processing);
    likeCommentSubject$.next({ activity, comment });
};

const handleReaction = (activity, kind, processing = false, isAdd = true, reaction = null) => {
    let nextActivity = activity;
    if (kind !== R.strings.repost && !processing && reaction !== null) {
        nextActivity = completedReaction(activity, reaction, isAdd);
    }
    if (kind === R.strings.like) {
        likeActivitySubscription(nextActivity, processing);
    } else if (kind === R.strings.repost) {
        if (processing) {
            repost.loading(activity?.id);
        } else if (reaction) {
            repost.success(activity?.id);
        } else {
            repost.failed(activity?.id);
        }
    } else if (kind === R.strings.comment) {
        commentSubscription(nextActivity, reaction, processing, isAdd);
    } else if (kind === R.strings.commentLike) {
        likeCommentSubscription(nextActivity, reaction, processing);
    }
};

const isReacting = (reaction, kind) => {
    let reacting = false;
    if (kind === R.strings.like) {
        reacting = reaction && reaction.id && likingActivities.indexOf(reaction.id) !== -1;
    } else if (kind === R.strings.repost) {
    } else if (kind === R.strings.commentLike) {
        reacting = reaction && reaction.id && likingComments.indexOf(reaction.id) !== -1;
    }
    return reacting;
};

module.exports = {
    completedReaction,
    handleReaction,
    isReacting,
};
