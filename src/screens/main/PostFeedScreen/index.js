import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PostFeedScreen from "./presenter";

function mapStateToProps(state) {
    const {
        userState: { _id },
    } = state;
    return {
        userId: _id,
    };
}
// function mapDispatchToProps(dispatch) {
//     return {
//         queryLike: bindActionCreators(reactionAdd, dispatch),
//     };
// }
export default connect(
    null,
    null,
)(PostFeedScreen);
