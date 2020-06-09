import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActivityFeedItem from "./presenter";
import { reactionAdd } from "modules/activity/actions";

function mapStateToProps(state) {
    const {
        userState: { _id },
    } = state;
    return {
        userId: _id,
    };
}
// function mapDispatchToProps(dispatch) {
//     return {
//         queryLike: bindActionCreators(reactionAdd, dispatch),
//     };
// }

export default connect(
    mapStateToProps,
    null,
)(ActivityFeedItem);
