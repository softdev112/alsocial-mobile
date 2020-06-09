import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ThemePicker from "./presenter";
import { setAppThemeMode } from "modules/app/actions";

function mapStateToProps(state) {
    const { appState } = state;
    return {
        mode: appState.mode,
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
)(ThemePicker);
