import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LikeScreen from "./presenter";
import { fetchLikes } from "modules/likes/actions";

function mapDispatchToProps(dispatch) {
    return {
        loadLikes: bindActionCreators(fetchLikes, dispatch),
    };
}
export default connect(
    null,
    mapDispatchToProps,
)(LikeScreen);
