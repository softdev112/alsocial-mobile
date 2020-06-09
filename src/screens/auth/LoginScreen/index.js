import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn, validToken } from "modules/user/actions";
import LoginScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(logIn, dispatch),
        validToken: bindActionCreators(validToken, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(LoginScreen);
