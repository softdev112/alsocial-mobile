import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RepostScreen from "./presenter";
import { repostActivity, updateRepostActivity } from "modules/activity/actions";
function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        repostRequest: bindActionCreators(repostActivity, dispatch),
        editRequest: bindActionCreators(updateRepostActivity, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepostScreen);
