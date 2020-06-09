import { connect } from "react-redux";
import ThemeProvider from "./presenter";
import { bindActionCreators } from "redux";
import { setAppThemeMode } from "modules/app/actions";

function mapStateToProps(state) {
    const { appState } = state;
    return {
        mode: appState.mode,
        isLightMode: appState.isLightMode,
        currentStatus: appState.currentStatus,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAppThemeMode: bindActionCreators(setAppThemeMode, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ThemeProvider);
