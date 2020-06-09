import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadHashtagFeed } from "modules/feed/actions";
import HashTagScreen from "./presenter";

function mapDispatchToProps(dispatch) {
    return {
        loadHashTagFeeds: bindActionCreators(loadHashtagFeed, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(HashTagScreen);
