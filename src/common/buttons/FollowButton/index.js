import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FollowButton from "./presenter";
import { updateFollowingStatus } from "modules/follow/actions";

function mapDispatchToProps(dispatch) {
    return {
        updateFollowingStatus: bindActionCreators(updateFollowingStatus, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(FollowButton);
