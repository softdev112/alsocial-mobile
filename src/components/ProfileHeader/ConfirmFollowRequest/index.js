import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConfirmFollowRequest from "./presenter";
import { acceptFollow, rejectFollow } from "modules/follow/actions";

// function mapStateToProps(state) {
//     const { userState } = state;
//     return {
//         owner: userState,
//     };
// }

function mapDispatchToProps(dispatch) {
    return {
        acceptFollow: bindActionCreators(acceptFollow, dispatch),
        rejectFollow: bindActionCreators(rejectFollow, dispatch),
    };
}
export default connect(
    null,
    mapDispatchToProps,
)(ConfirmFollowRequest);
