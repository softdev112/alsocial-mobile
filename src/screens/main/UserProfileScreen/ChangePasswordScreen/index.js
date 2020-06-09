import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChangePasswordScreen from "./presenter";
import { editPassword } from "modules/user/actions";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        userId: userState._id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        newPasswordRequest: bindActionCreators(editPassword, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangePasswordScreen);
