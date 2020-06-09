import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContainerView } from "./styles";
import R from "res/R";
import ActivityFeedHeader from "./ActivityFeedHeader";
import ActivityFeedContent from "./ActivityFeedContent";
import { FeedActionBar } from "common/views";
import { ModalImages } from "common/modals";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";
import _ from "lodash";
import { resetActivityFeed } from "models/activityFeed";

class ActivityFeedItem extends Component {
    _modalRef: ?ModalImages = null;

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextProps.activity?.id === this.props.activity?.id &&
            (nextProps.activity.refresh ||
                nextProps.activity?.isDeleting !== this.props.activity?.isDeleting ||
                !_.isEqual(
                    nextProps.activity?.reaction_counts,
                    this.props.activity?.reaction_counts,
                ))
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.activity.refresh = false;
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        this._modalRef = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            activityObservables.subjects.deleteSubject$.subscribe(({ activity, status }) => {
                const { activity: prevActivity } = this.props;
                if (activity?.id !== prevActivity?.id) {
                    return;
                }

                prevActivity.isDeleting = activity.isDeleting;

                if (status !== activityObservables.constants.SUCCESS) {
                    this.forceUpdate();
                }
            }),
        );

        subscriptions.push(
            activityObservables.subjects.deleteRepostSubject$.subscribe(
                ({ activityId, repostId, status }) => {
                    const { activity } = this.props;
                    if (repostId !== activity?.repostId || activityId !== activity?.id) {
                        return;
                    }

                    activity.isDeleting = status === activityObservables.constants.LOADING;

                    if (status !== activityObservables.constants.SUCCESS) {
                        this.forceUpdate();
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.loadActivitySubject$.subscribe(
                ({ activityId, newActivity, status }) => {
                    if (status === activityObservables.constants.SUCCESS) {
                        const { activity } = this.props;
                        if (newActivity && activity?.id === activityId) {
                            const reset: Object = resetActivityFeed(newActivity);
                            Object.keys(reset).forEach(key => (activity[key] = reset[key]));
                            this.forceUpdate();
                        }
                    }
                },
            ),
        );
    };

    _onModalImages = async image => {
        if (this._modalRef) {
            this._modalRef.openModal(image);
        }
    };

    render() {
        const {
            activity,
            keyValue,
            userId,
            profileId,
            isChild,
            currentHashTag,
            onLayout,
            feedType,
            editing,
        } = this.props;
        const ownPost = activity?.actor?.id === userId;
        const isRepost = activity.verb === R.strings.repost;
        const organicActivity = isRepost ? activity.object : activity;
        const images = organicActivity?.attachments?.images;
        const actor = activity.actor;

        return activity.isDeleting || activity.isDeletingRepost ? null : (
            <ContainerView
                key={keyValue}
                pointerEvents={activity.isDeleting ? "none" : "auto"}
                onLayout={onLayout}
            >
                <ActivityFeedHeader
                    activity={activity}
                    isRepost={isRepost}
                    isReaction={false}
                    userId={userId}
                    profileId={profileId}
                    organicActivity={organicActivity}
                    isChild={isChild}
                    isDeleting={activity.isDeleting}
                    feedType={feedType}
                />
                <ActivityFeedContent
                    activity={activity}
                    userId={userId}
                    profileId={profileId}
                    currentHashTag={currentHashTag}
                    onModalImages={this._onModalImages}
                    feedType={feedType}
                    isChild={isChild}
                    editing={editing}
                />
                {!isChild && (
                    <FeedActionBar
                        actor={actor}
                        activity={activity}
                        organicActivity={organicActivity}
                        ownPost={ownPost}
                        isRepost={isRepost}
                        feedType={feedType}
                    />
                )}
                {images && !!images.length ? (
                    <ModalImages onRef={ref => (this._modalRef = ref)} images={images} />
                ) : null}
            </ContainerView>
        );
    }
}

ActivityFeedItem.propTypes = {
    activity: PropTypes.object.isRequired,
    userId: PropTypes.string,
    profileId: PropTypes.string,
    keyValue: PropTypes.string,
    isChild: PropTypes.bool,
    currentHashTag: PropTypes.string,
    onLayout: PropTypes.func,
    feedType: PropTypes.string,
    editing: PropTypes.bool,
};

ActivityFeedItem.defaultProps = {
    profileId: null,
    isChild: false,
    editing: false,
};

export default withObservableStream({})(ActivityFeedItem);
