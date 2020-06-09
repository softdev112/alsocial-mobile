import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SettingsScreen from "./presenter";
import { initInvitation } from "modules/invitation/actions";
import { logOut } from "modules/user/actions";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        user: userState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inviteFriends: bindActionCreators(initInvitation, dispatch),
        logOut: bindActionCreators(logOut, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsScreen);
