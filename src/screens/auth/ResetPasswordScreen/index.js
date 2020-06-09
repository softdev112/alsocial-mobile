import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendResetEmail } from "modules/user/actions";
import ResetPasswordForm from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        resetPasswordRequest: bindActionCreators(sendResetEmail, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(ResetPasswordForm);
