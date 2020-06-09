import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreateInline from "./presenter";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}
// function mapDispatchToProps(dispatch) {
//     return {
//         queryLike: bindActionCreators(reactionAdd, dispatch),
//     };
// }

export default connect(
    mapStateToProps,
    null,
)(CreateInline);
