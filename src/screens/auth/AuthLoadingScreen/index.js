import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { invalidToken, validToken } from "modules/user/actions";
import AuthLoadingScreen from "./presenter";

// function mapStateToProps(state) {
//     const {
//         userState: { token, exp, lat },
//     } = state;
//     return {
//         token,
//         exp,
//         lat,
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         invalidToken: bindActionCreators(invalidToken, dispatch),
//         validToken: bindActionCreators(validToken, dispatch),
//     };
// }

export default connect(
    null,
    null,
)(AuthLoadingScreen);
