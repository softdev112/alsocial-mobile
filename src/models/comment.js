import _uniqBy from "lodash/uniqBy";
import { modules } from "observable/activity";

export const resetComment = (ownId, comment) => {
    const { user } = comment;
    const { id: actorId } = user;

    const { comment_like = [] } = { ...comment.own_children };
    const { comment_like: comment_like_latest = [] } = { ...comment.latest_children };

    comment.likeId = comment_like.length ? comment_like[0]?.id : null;

    const isLiked = !!comment_like.length;
    comment.isLiked = isLiked;
    comment.likeCount = comment.children_counts?.comment_like || 0;
    comment.commentLikers = _uniqBy(
        comment_like_latest
            .filter(e => !(e.user_id === ownId && !isLiked))
            .map(e => e.user.data)
            .filter((e, i, a) => a.indexOf(e) === i),
        "_id",
    );
    comment.time = comment?.created_at;
    comment.user = user.data;
    comment.isOwn = actorId === ownId;

    comment.isLiking = modules.likeComment.isLiking(comment?.id);
    comment.isDeleting = modules.deleteComment.isDeleting(comment?.id);
    comment.refresh = true;
    comment.isViewable = false;

    return comment;
};
