import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FollowScreen from "./presenter";
import { fetchFollowers } from "modules/follow/actions";

function mapStateToProps(state) {
    const {
        userState: { _id },
    } = state;
    return {
        ownId: _id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadFollowRequest: bindActionCreators(fetchFollowers, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FollowScreen);
