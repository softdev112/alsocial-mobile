import { PixelRatio } from "react-native";
import { modules } from "observable/activity";
import R from "res/R";

export const resetActivityFeed = activity => {
    if (!activity) {
        return activity;
    }

    activity.isLiking = modules.likeActivity.isLiking(activity?.id);
    activity.isDeleting = modules.deleteActivity.isDeleting(activity);
    activity.isReposting = modules.repost.isLoading(activity?.id);
    activity.refresh = true;

    const isRepost = activity.verb === R.strings.repost;
    const organicActivity = isRepost ? activity.object : activity;

    // Hack to disable/remove vimeo autoplays
    if (
        organicActivity.attachments &&
        organicActivity.attachments.og &&
        organicActivity.attachments.og.videos
    ) {
        organicActivity.attachments.og.videos = organicActivity.attachments.og.videos.filter(
            video =>
                !(video.url || "").includes("vimeo") || !(video.secure_url || "").includes("vimeo"),
        );
    }

    if (organicActivity.attachments && organicActivity.attachments.images) {
        organicActivity.attachments.images = organicActivity.attachments.images
            .filter(img => typeof img === "string")
            .map(
                img =>
                    `${img}${img.includes("?") ? "&" : "?"}w=${PixelRatio.getPixelSizeForLayoutSize(
                        R.dimensions.screen.width,
                    )}&auto=format&fit=max`,
            );
    }

    const { own_reactions = {}, reaction_counts = {} } = activity;
    const {
        own_reactions: organic_own_reactions = {},
        reaction_counts: organic_reaction_counts = {},
    } = organicActivity;

    const isReposted = organic_own_reactions.repost && !!organic_own_reactions.repost.length;
    const repostId = isReposted ? organic_own_reactions.repost[0]?.id : null;
    activity.isReposted = isReposted;
    activity.repostId = repostId;
    activity.isDeletingRepost = repostId ? modules.deleteRepost.isDeleting(repostId) : false;

    activity.isLiked = own_reactions.like && !!own_reactions.like.length;
    activity.likeCount = reaction_counts.like || 0;
    activity.commentCount = reaction_counts.comment || 0;
    activity.isPublicPost =
        typeof organicActivity?.actor?.data?.isPublic === "boolean"
            ? organicActivity?.actor?.data?.isPublic
            : true;

    if (
        own_reactions &&
        own_reactions[R.strings.like] &&
        own_reactions[R.strings.like].length > 0
    ) {
        activity.likeId = own_reactions[R.strings.like][0].id;
    }

    activity.likeUsers = activity?.latest_reactions?.like
        ? activity?.latest_reactions?.like
              .filter(({ user }) => user && user.data)
              .map(({ user: { data } }) => {
                  data.id = data._id;
                  return data;
              })
        : [];

    return activity;
};
