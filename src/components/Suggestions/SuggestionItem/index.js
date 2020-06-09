import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuggestionItem from "./presenter";

// function mapStateToProps(state) {
//     const {
//         userState: { _id },
//     } = state;
//     return {
//         ownerId: _id,
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//     };
// }

export default connect(
    null,
    null,
)(SuggestionItem);
