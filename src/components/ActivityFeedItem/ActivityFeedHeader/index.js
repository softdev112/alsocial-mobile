import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActivityFeedHeader from "./presenter";
import { reportActivity, deleteActivity } from "modules/activity/actions";

function mapStateToProps(state) {
    const {
        userState: { _id, username },
    } = state;
    return {
        ownerId: _id,
        ownerUsername: username,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteRequest: bindActionCreators(deleteActivity, dispatch),
        reportRequest: bindActionCreators(reportActivity, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivityFeedHeader);
