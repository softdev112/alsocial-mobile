import { select, put, call, take, takeLatest, race, cancel, fork } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import NavigationService from "service/Navigation";
import { getUserId } from "../user/selectors";
import * as userApis from "service/axios/user";
import * as feedApis from "service/axios/feed";
import userObservables from "observable/user";
import {
    invalidToken,
    logInSuccess,
    logOut,
    validToken,
    fetchUserProfileSuccess,
} from "../user/actions";
import { getLoadingStatus, getLatestProfileFeedId } from "./selectors";

function* navigationWatcher(): Saga<void> {
    while (true) {
        try {
            const {
                toFollowers,
                toFollowing,
                toEdit,
                toSettings,
                toComments,
                toLikes,
                toOtherProfile,
                toRepost,
            } = yield race({
                toFollowers: take(actions.profileToFollowers),
                toFollowing: take(actions.profileToFollowing),
                toEdit: take(actions.profileToEdit),
                toSettings: take(actions.profileToSettings),
                toComments: take(actions.profileToComments),
                toLikes: take(actions.profileToLikes),
                toOtherProfile: take(actions.profileToOtherProfile),
                toRepost: take(actions.profileToRepost),
            });

            yield put(actions.profileNavigation());
            const isLoading = yield select(getLoadingStatus);
            if (isLoading) {
                yield take(actions.profileCallFinished);
            }

            if (toFollowers) {
                yield call(navigationWorker, toFollowers.payload);
            } else if (toFollowing) {
                yield call(navigationWorker, toFollowing.payload);
            } else if (toEdit) {
                yield call(navigationWorker, toEdit.payload);
            } else if (toSettings) {
                yield call(navigationWorker, toSettings.payload);
            } else if (toComments) {
                yield call(navigationWorker, toComments.payload);
            } else if (toLikes) {
                yield call(navigationWorker, toLikes.payload);
            } else if (toOtherProfile) {
                yield call(navigationWorker, toOtherProfile.payload);
            } else if (toRepost) {
                yield call(navigationWorker, toRepost.payload);
            }
        } catch (e) {
            yield console.log(e);
        }
    }
}

function* profileApisWatcher(): Saga<void> {
    while (true) {
        try {
            const { onRefresh, onLoadingMore, onNavigation } = yield race({
                onRefresh: take(actions.profileCallRefresh),
                onLoadingMore: take(actions.profileCallLoadingMore),
                onNavigation: take(actions.profileNavigation),
            });

            if (!onNavigation) {
                if (onRefresh) {
                    yield call(loadProfileWatcher, onRefresh.payload);
                } else if (onLoadingMore) {
                    yield call(loadActivityFeedWatcher, onLoadingMore.payload);
                }
                yield put(actions.profileCallFinished());
            }
        } catch (e) {
            yield console.log(e);
        }
    }
}

function* loadProfileWatcher(payload) {
    const { callbackSubject, profileId } = payload;

    try {
        yield call([callbackSubject, callbackSubject.next], {
            loading: true,
            profileId,
        });

        const { finishedLoadProfile } = yield race({
            finishedLoadProfile: call(fetchUserProfileWorker, profileId),
            startNavigation: take(actions.profileNavigation),
        });

        if (finishedLoadProfile) {
            const { profile, error } = finishedLoadProfile;
            if (profile) {
                if (profile.error) {
                    yield call([callbackSubject, callbackSubject.next], {
                        profileId,
                        cancelled: true,
                        error: profile.error,
                    });
                } else {
                    const id = profile._id;
                    const userId = yield select(getUserId);
                    let isAvailable = userId === id;

                    if (!isAvailable) {
                        const followStatus = userObservables.modules.following.getFollowStatus(id);
                        const isFollowing = followStatus && followStatus.following === "follow";
                        const isBlocked =
                            followStatus &&
                            (followStatus.following === "block" ||
                                followStatus.follower === "block");
                        const isPublic =
                            typeof profile?.isPublic === "boolean" ? profile?.isPublic : true;
                        isAvailable = isPublic || (!isBlocked && isFollowing);
                    }

                    yield call([callbackSubject, callbackSubject.next], {
                        profile,
                        profileId: id,
                        isAvailableFeed: isAvailable,
                    });

                    if (isAvailable) {
                        const { didLoadedFeeds } = yield race({
                            didLoadedFeeds: call(fetchActivityFeedsWorker, {
                                ...payload,
                                profileId: id,
                            }),
                            navigation: take(actions.profileNavigation),
                        });

                        if (didLoadedFeeds) {
                            yield call(didLoadedActivityFeedsWorker, {
                                payload: { ...payload, profileId: id },
                                didLoadedFeeds,
                            });
                        }
                    }
                }
            } else {
                yield call([callbackSubject, callbackSubject.next], {
                    profileId,
                    cancelled: true,
                    error,
                });
            }
        }
    } catch (e) {
        throw e;
    }
}

function* loadActivityFeedWatcher(payload) {
    try {
        const { didLoadedFeeds, refresh } = yield race({
            didLoadedFeeds: call(fetchActivityFeedsWorker, payload),
            navigation: take(actions.profileNavigation),
            refresh: take(actions.profileCallRefresh),
        });

        if (didLoadedFeeds) {
            yield call(didLoadedActivityFeedsWorker, { payload, didLoadedFeeds });
        } else if (refresh) {
            yield call(loadProfileWatcher, refresh.payload);
        }
    } catch (e) {
        throw e;
    }
}

function* didLoadedActivityFeedsWorker({
    payload: { callbackSubject, profileId, feedGroup },
    didLoadedFeeds: { feeds, feedNext, next, error },
}): Saga<void> {
    if (feeds) {
        yield call([callbackSubject, callbackSubject.next], {
            feeds,
            feedNext,
            next,
            profileId,
            feedGroup,
        });
    } else {
        yield call([callbackSubject, callbackSubject.next], {
            cancelled: true,
            next,
            profileId,
            error,
        });
    }
}

function* fetchUserProfileWorker(profileId): Saga<Object> {
    try {
        const {
            exception,
            detail,
            data,
            followers_count,
            following_count,
            following,
            follower,
        } = yield call(userApis.userProfileRequest, profileId);

        if (exception) {
            return yield { error: detail };
        } else if (data) {
            const results = {
                ...data,
                followers_count: Math.max(followers_count - 1, 0),
                following_count: Math.max(following_count - 1, 0),
                following,
                follower,
            };

            const userId = yield select(getUserId);
            if (userId === results._id) {
                yield put(fetchUserProfileSuccess(results));
            } else {
                userObservables.modules.following.success(results._id, { following, follower });
            }
            return yield { profile: results };
        } else {
            return yield { error: "Not Exist" };
        }
    } catch (err) {
        yield console.error(err);
        throw err;
    }
}

function* fetchActivityFeedsWorker({ feedGroup, profileId, next }): Saga<Object> {
    try {
        const data = yield call(feedApis.fetchActivityFeeds, {
            feedGroup,
            feedId: profileId,
            next,
        });

        const { results, next: feedNext } = data;
        if (results) {
            return yield { feeds: results, feedNext, next };
        } else {
            return yield { feeds: [], feedNext: null, next };
        }
    } catch (e) {
        yield console.error(e);
        throw e;
    }
}

function* navigationWorker({ routeName, params, event, properties }): Saga<void> {
    if (routeName === "UserProfileTab") {
        yield call(NavigationService.navigate, routeName, params);
    } else {
        yield call(NavigationService.push, routeName, params);
    }
}

function* fetchNewProfileFeedsWorker({ payload: { latestFeedId } }): Saga<void> {
    try {
        userObservables.modules.newFeeds.loading();
        const userId = yield select(getUserId);
        const { results, next } =
            latestFeedId === ""
                ? yield call(feedApis.fetchActivityFeeds, {
                      feedGroup: "user",
                      feedId: userId,
                  })
                : yield call(feedApis.fetchLatestActivityFeeds, {
                      feedGroup: "user",
                      feedId: userId,
                      prev: latestFeedId,
                  });

        if (results) {
            userObservables.modules.newFeeds.success(results, next);
        } else {
            userObservables.modules.newFeeds.failed();
        }
    } catch (error) {
        yield console.error(error);
        userObservables.modules.newFeeds.failed();
    }
}

export default function*() {
    yield takeLatest(actions.profileNewFeeds, fetchNewProfileFeedsWorker);

    while (yield take([logInSuccess, validToken])) {
        const navigationTask = yield fork(navigationWatcher);
        const apiTask = yield fork(profileApisWatcher);

        yield take([logOut, invalidToken]);

        yield cancel(navigationTask);
        yield cancel(apiTask);
    }
}
