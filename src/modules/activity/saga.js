// @flow
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Alert } from "react-native";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import MixpanelService from "service/Mixpanel";
import { BranchEvent } from "react-native-branch";
import activityObservables from "observable/activity";
import * as activityApis from "service/axios/activity";
import { Platform } from "react-native";
import R from "res/R";
import ImagePicker from "react-native-image-crop-picker";
import getFeedGroup from "utils/getFeedGroup";

function* loadCommentsWorker({ payload: { activityId, next, callback } }): Saga<void> {
    try {
        callback({ isLoading: true, curNext: next });
        const data = yield call(activityApis.fetchCommentsRequest, activityId, next);
        callback({ ...data, isLoading: false, curNext: next });
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, curNext: next });
    }
}

/// Toggle Like Activity
function* toggleLikeActivityWorker({ payload }: Object): Saga<void> {
    const { activity, feedType } = payload;
    if (activityObservables.modules.likeActivity.isLiking(activity?.id)) {
        return;
    }
    try {
        activityObservables.modules.likeActivity.loading(activity?.id);

        if (activity.likeId) {
            yield call(dislikeActivityWorker, activity, feedType);
        } else {
            yield call(likeActivityWorker, activity, feedType);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.likeActivity.failed(activity);
    }
}
function* likeActivityWorker(activity: Object, feedType): Saga<void> {
    try {
        const data = yield call(activityApis.likeActivityRequest, activity);

        if (data) {
            if (data.error) {
                activityObservables.modules.likeActivity.failed(activity?.id);
            } else {
                activityObservables.modules.likeActivity.success(
                    activity?.id,
                    activity.likeCount + 1,
                    data.id,
                    true,
                );

                const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                    activity.attachments,
                );

                yield call(MixpanelService.trackEvent, "likes", {
                    first_action_taken: "like",
                    second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                    third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                    fourth_media_provider: mediaProviders,
                    fifth_feed_type: getFeedGroup(feedType),
                });

                new BranchEvent("like", null, {
                    actor_id: activity?.id,
                    target_user: activity?.actor?.id,
                }).logEvent();
            }
        } else {
            activityObservables.modules.likeActivity.failed(activity?.id);
        }
    } catch (error) {
        throw error;
    }
}

function* dislikeActivityWorker(activity: Object, feedType): Saga<void> {
    let reactionId = activity.likeId;

    if (reactionId === null) {
        throw {};
    }

    try {
        const data = yield call(activityApis.deleteReactionRequest, reactionId);

        if (data) {
            if (data.error) {
                activityObservables.modules.likeActivity.failed(activity?.id);
            } else {
                const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                    activity.attachments,
                );

                yield call(MixpanelService.trackEvent, "likes", {
                    first_action_taken: "unlike",
                    second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                    third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                    fourth_media_provider: mediaProviders,
                    fifth_feed_type: getFeedGroup(feedType),
                });

                new BranchEvent("unlike", null, {
                    actor_id: activity?.id,
                    target_user: activity?.actor?.id,
                }).logEvent();

                activityObservables.modules.likeActivity.success(
                    activity?.id,
                    Math.max(activity.likeCount - 1, 0),
                    data?.id,
                    false,
                );
            }
        } else {
            activityObservables.modules.likeActivity.failed(activity?.id);
        }
    } catch (error) {
        throw error;
    }
}

/// Toggle Like Comment
function* toggleLikeCommentWorker({ payload }: Object): Saga<void> {
    const { activity, comment, feedType } = payload;

    if (activityObservables.modules.likeComment.isLiking(comment?.id)) {
        return;
    }
    try {
        activityObservables.modules.likeComment.loading(activity?.id, comment?.id);

        if (comment.isLiked) {
            yield call(dislikeCommentWorker, activity, comment, feedType);
        } else {
            yield call(likeCommentWorker, activity, comment, feedType);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.likeComment.failed(activity?.id, comment?.id);
    }
}
function* likeCommentWorker(activity: Object, comment: Object, feedType): Saga<void> {
    try {
        const data = yield call(activityApis.likeCommentRequest, activity, comment);

        if (data) {
            activityObservables.modules.likeComment.success(
                activity?.id,
                comment?.id,
                data.id,
                true,
                comment.likeCount + 1,
            );
            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            yield call(MixpanelService.trackEvent, "likes", {
                first_action_taken: "like",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
            });

            new BranchEvent("like", null, {
                actor_id: comment.id,
                target_user: comment.user_id,
            }).logEvent();
        } else {
            activityObservables.modules.likeComment.failed(activity?.id, comment?.id);
        }
    } catch (error) {
        throw error;
    }
}

function* dislikeCommentWorker(activity: Object, comment: Object, feedType): Saga<void> {
    let reactionId = comment?.likeId;
    if (!reactionId) {
        throw {};
    }

    try {
        const data = yield call(activityApis.deleteReactionRequest, reactionId);

        if (data) {
            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            yield call(MixpanelService.trackEvent, "likes", {
                first_action_taken: "unlike",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
            });

            new BranchEvent("unlike", null, {
                actor_id: comment?.id,
                target_user: comment?.user?.id,
            }).logEvent();

            activityObservables.modules.likeComment.success(
                activity?.id,
                comment?.id,
                null,
                false,
                Math.max(comment?.likeCount - 1, 0),
            );
        } else {
            activityObservables.modules.likeComment.failed(activity?.id, comment?.id);
        }
    } catch (error) {
        throw error;
    }
}

function* uploadImage(imageUri, contentType): Saga<void> {
    if (!Boolean(imageUri)) return false;
    try {
        const formData: FormData = new FormData();
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("file", {
            uri: imageUri,
            name: filename,
            type: Platform.OS === "android" ? contentType : type,
        });

        const { file } = yield activityApis.uploadImageRequest(formData);

        if (file) {
            return file;
        } else {
            return "";
        }
    } catch (err) {
        console.log(err);
        return "";
    }
}

export function* createActivityWorker({ payload }: Object): Saga<void> {
    let { attachments, object, text, verb } = payload;
    try {
        activityObservables.modules.post.loading();
        const images = attachments.images;
        let uploadedImages = [];
        let uploadedNewImages = false;
        for (let i = 0; i < images.length; i++) {
            if (images[i].url) {
                uploadedImages.push(images[i].url);
            } else {
                const file = images[i].file;
                const url = yield call(uploadImage, file.imageUri, file.contentType);
                uploadedImages.push(url);
                uploadedNewImages = true;
            }
        }
        if (uploadedNewImages) {
            ImagePicker.clean().then(() => {
                console.log("clean images");
            });
        }
        attachments.images = uploadedImages;

        if (uploadedImages && !!uploadedImages.length) {
            object = uploadedImages[0];
        }

        yield call(activityApis.createActivityRequest, {
            activityData: { attachments, object, text, verb },
            feedGroup: "user",
        });

        const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(attachments);

        yield call(MixpanelService.trackEvent, "posts", {
            first_action_taken: "created",
            second_post_type: "original posts",
            third_media_type: mediaTypes,
            fourth_media_provider: mediaProviders,
        });

        activityObservables.modules.post.success();
    } catch (e) {
        activityObservables.modules.post.failed();
    }
}

export function* deleteActivityWorker({ payload }: Object): Saga<void> {
    const { id, repostId, verb, actor, attachments } = payload;
    const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(attachments);

    try {
        if (repostId && verb === "repost") {
            yield put(actions.deleteRepostActivity(payload));
        } else {
            activityObservables.modules.deleteActivity.loading(payload);
            const data = yield call(activityApis.deleteActivityRequest, id);
            if (data) {
                activityObservables.modules.deleteActivity.success(payload);

                yield call(MixpanelService.trackEvent, "posts", {
                    first_action_taken: "delete",
                    second_post_type: "original posts",
                    third_media_type: mediaTypes,
                    fourth_media_provider: mediaProviders,
                });
            } else {
                activityObservables.modules.deleteActivity.failed(payload);
            }
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.deleteActivity.failed(payload);
    }
}

export function* updateActivityWorker({ payload }: Object): Saga<void> {
    let { attachments, object, id, text, verb, actor } = payload;
    try {
        activityObservables.modules.updateActivity.loading();
        const images = attachments.images;
        let uploadedImages = [];
        let uploadedNewImages = false;
        for (let i = 0; i < images.length; i++) {
            if (images[i].url) {
                uploadedImages.push(images[i].url);
            } else {
                const file = images[i].file;
                let url = "";
                if (file.imageUri.startsWith("http")) {
                    url = file.imageUri;
                } else {
                    url = yield call(uploadImage, file.imageUri, file.contentType);
                }
                uploadedImages.push(url);
                uploadedNewImages = true;
            }
        }
        if (uploadedNewImages) {
            ImagePicker.clean().then(() => {
                console.log("clean images");
            });
        }
        attachments.images = uploadedImages;

        if (uploadedImages && !!uploadedImages.length) {
            object = uploadedImages[0];
        }

        const data = yield call(activityApis.updateActivityRequest, id, {
            activityData: { attachments, object, text, verb },
        });

        if (data) {
            activityObservables.modules.updateActivity.success();
            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(attachments);

            yield call(MixpanelService.trackEvent, "posts", {
                first_action_taken: "edit",
                second_post_type: "original posts",
                third_media_type: mediaTypes,
                fourth_media_provider: mediaProviders,
            });
        } else {
            activityObservables.modules.updateActivity.failed();
        }
    } catch (e) {
        yield call(console.log, e);
        activityObservables.modules.updateActivity.failed();
    }
}

export function* reportCommentWorker({ payload: { comment, typeReport } }: Object): Saga<void> {
    try {
        activityObservables.modules.reportComment.loading(comment?.id);

        const { error } = yield call(activityApis.reportCommentRequest, comment, typeReport);

        if (error) {
            activityObservables.modules.reportComment.failed(comment?.id);
        } else {
            yield call(
                Alert.alert,
                "Thank you!",
                "We will review your report as soon as possible.",
            );

            activityObservables.modules.reportComment.success(comment?.id);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.reportComment.failed(comment?.id);
    }
}

export function* reportActivityWorker({ payload: { activity, typeReport } }: Object): Saga<void> {
    try {
        activityObservables.modules.reportActivity.loading(activity?.id);

        const { error } = yield call(activityApis.reportActivityRequest, activity, typeReport);

        if (error) {
            activityObservables.modules.reportActivity.failed(activity?.id);
        } else {
            yield call(
                Alert.alert,
                "Thank you!",
                "We will review your report as soon as possible.",
            );

            activityObservables.modules.reportActivity.success(activity?.id);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.reportActivity.failed(activity?.id);
    }
}

/// Toggle Like Activity
function* repostActivityWorker({ payload: { activity, text } }: Object): Saga<void> {
    if (activityObservables.modules.repost.isLoading(activity?.id)) {
        return;
    }
    try {
        activityObservables.modules.repost.loading(activity?.id);
        const response = yield call(activityApis.repostActivityRequest, activity, text);
        activityObservables.modules.repost.success(activity?.id, response.id);

        const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
            activity.attachments,
        );

        yield call(MixpanelService.trackEvent, "posts", {
            first_action_taken: "created",
            second_post_type: "reposts",
            third_media_type: mediaTypes,
            fourth_media_provider: mediaProviders,
        });
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.repost.failed(activity?.id);
    }
}
function* deleteRepostActivityWorker({ payload }: Object): Saga<void> {
    const { id, repostId, attachments } = payload;

    if (activityObservables.modules.deleteRepost.isDeleting(repostId)) {
        return;
    }

    try {
        activityObservables.modules.deleteRepost.loading(repostId);
        const { error } = yield call(activityApis.deleteReactionRequest, repostId);
        if (error) {
            activityObservables.modules.deleteRepost.failed(repostId);
        } else {
            activityObservables.modules.deleteRepost.success(id, repostId);
            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(attachments);

            yield call(MixpanelService.trackEvent, "posts", {
                first_action_taken: "delete",
                second_post_type: "reposts",
                third_media_type: mediaTypes,
                fourth_media_provider: mediaProviders,
            });
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.deleteRepost.failed(repostId);
    }
}
function* updateRepostActivityWorker({ payload: { activity, text } }: Object): Saga<void> {
    const { id, reaction } = activity;

    try {
        activityObservables.modules.updateRepost.loading();
        yield call(activityApis.updateReactionRequest, reaction.activity_id, reaction.id, text);
        activityObservables.modules.updateRepost.success(id);

        const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
            activity.attachments,
        );

        yield call(MixpanelService.trackEvent, "posts", {
            first_action_taken: "edit",
            second_post_type: "reposts",
            third_media_type: mediaTypes,
            fourth_media_provider: mediaProviders,
        });
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.updateRepost.failed();
    }
}
/// Comment
function* addCommentWorker({ payload }: Object): Saga<void> {
    const { activity, comment, feedType } = payload;
    try {
        const data = yield call(
            activityApis.addReactionRequest,
            R.strings.comment,
            activity?.id,
            activity?.actor?.id,
            { text: comment },
        );

        if (data) {
            activityObservables.modules.comment.success(activity, data);

            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            yield call(MixpanelService.trackEvent, "comments", {
                first_action_taken: "commented",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
            });
        } else {
            activityObservables.modules.comment.failed(activity);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.comment.failed(activity);
    }
}

function* updateCommentWorker({ payload }: Object): Saga<void> {
    const { activity, activityId, commentId, text, feedType } = payload;
    try {
        const data = yield call(activityApis.updateCommentRequest, activityId, commentId, text);

        if (data) {
            activityObservables.modules.updateComment.success(activityId, commentId, data);

            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            yield call(MixpanelService.trackEvent, "comments", {
                first_action_taken: "edit",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
            });
        } else {
            activityObservables.modules.updateComment.failed(activityId, commentId);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.updateComment.failed(activityId, commentId);
    }
}

function* deleteCommentWorker({ payload: { activity, comment, feedType } }: Object): Saga<void> {
    try {
        activityObservables.modules.deleteComment.loading(activity, comment);

        const data = yield call(activityApis.deleteReactionRequest, comment.id);

        if (data) {
            activityObservables.modules.deleteComment.success(activity, comment);

            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            yield call(MixpanelService.trackEvent, "comments", {
                first_action_taken: "delete",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
            });
        } else {
            activityObservables.modules.deleteComment.failed(activity, comment);
        }
    } catch (error) {
        yield call(console.log, error);
        activityObservables.modules.deleteComment.failed(activity, comment);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.loadComments, loadCommentsWorker);
    yield takeEvery(actions.createActivity, createActivityWorker);
    yield takeEvery(actions.deleteActivity, deleteActivityWorker);
    yield takeEvery(actions.updateActivity, updateActivityWorker);
    yield takeEvery(actions.reportActivity, reportActivityWorker);
    yield takeEvery(actions.reportComment, reportCommentWorker);
    yield takeEvery(actions.toggleLikeActivity, toggleLikeActivityWorker);
    yield takeEvery(actions.toggleLikeComment, toggleLikeCommentWorker);
    yield takeEvery(actions.deleteComment, deleteCommentWorker);
    yield takeEvery(actions.addComment, addCommentWorker);
    yield takeEvery(actions.updateComment, updateCommentWorker);
    yield takeEvery(actions.repostActivity, repostActivityWorker);
    yield takeEvery(actions.deleteRepostActivity, deleteRepostActivityWorker);
    yield takeEvery(actions.updateRepostActivity, updateRepostActivityWorker);
}
