import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchScreen from "./presenter";
import { startExplore, stopExplore, loadExploreFeed } from "modules/explore/actions";

function mapStateToProps(state) {
    const {
        userState: { _id },
    } = state;
    return {
        userId: _id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startExplore: bindActionCreators(startExplore, dispatch),
        stopExplore: bindActionCreators(stopExplore, dispatch),
        loadExploreFeed: bindActionCreators(loadExploreFeed, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchScreen);
