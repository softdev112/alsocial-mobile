import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authApp, setAppLightMode } from "modules/app/actions";
import AuthScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        setAppAuthStatus: bindActionCreators(authApp, dispatch),
        setAppLightMode: bindActionCreators(setAppLightMode, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(AuthScreen);
