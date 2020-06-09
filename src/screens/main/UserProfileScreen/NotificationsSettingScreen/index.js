import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationsSettingScreen from "./presenter";
import { disableBraze, enableBraze } from "modules/braze/actions";

const mapStateToProps = state => ({
    brazeStatus: state.brazeState.brazeStatus,
    pushNotificationStatus: state.brazeState.pushNotificationStatus,
});

const mapDispatchToProps = dispatch => ({
    disableBraze: bindActionCreators(disableBraze, dispatch),
    enableBraze: bindActionCreators(enableBraze, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationsSettingScreen);
