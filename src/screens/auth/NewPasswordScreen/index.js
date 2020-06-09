import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resetPassword } from "modules/user/actions";
import NewPasswordScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        resetPasswordRequest: bindActionCreators(resetPassword, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(NewPasswordScreen);
