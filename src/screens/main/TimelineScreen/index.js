import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainApp } from "modules/app/actions";
import * as actions from "modules/timeline/actions";
import TimelineScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        startTimeline: bindActionCreators(actions.startTimeline, dispatch),
        stopTimeline: bindActionCreators(actions.stopTimeline, dispatch),
        loadTimeline: bindActionCreators(actions.loadTimelineFeeds, dispatch),
        loadNewFeeds: bindActionCreators(actions.loadNewTimelineFeeds, dispatch),
        setAppMainStatus: bindActionCreators(mainApp, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(TimelineScreen);
