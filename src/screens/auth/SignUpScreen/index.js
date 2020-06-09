import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUp } from "modules/user/actions";
import SignUpScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        signUpRequest: bindActionCreators(signUp, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(SignUpScreen);
