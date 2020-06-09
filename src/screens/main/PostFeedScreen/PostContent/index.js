import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PostContent from "./presenter";
import { createActivity, updateActivity } from "modules/activity/actions";
function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        createActivity: bindActionCreators(createActivity, dispatch),
        editActivity: bindActionCreators(updateActivity, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostContent);
