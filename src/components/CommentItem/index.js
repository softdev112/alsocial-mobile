import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CommentItem from "./presenter";
import { toggleLikeComment, deleteComment, reportComment } from "modules/activity/actions";

function mapStateToProps(state) {
    const {
        userState: { _id },
    } = state;
    return {
        ownId: _id,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        toggleLikeComment: bindActionCreators(toggleLikeComment, dispatch),
        deleteComment: bindActionCreators(deleteComment, dispatch),
        reportComment: bindActionCreators(reportComment, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentItem);
