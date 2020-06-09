import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedActionBar from "./presenter";
import { toggleLikeActivity, repostActivity, deleteRepostActivity } from "modules/activity/actions";

function mapDispatchToProps(dispatch) {
    return {
        toggleLikeActivity: bindActionCreators(toggleLikeActivity, dispatch),
        repostRequest: bindActionCreators(repostActivity, dispatch),
        deleteRepostRequest: bindActionCreators(deleteRepostActivity, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(FeedActionBar);
