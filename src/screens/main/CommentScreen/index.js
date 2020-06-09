import { connect } from "react-redux";
import CommentScreen from "./presenter";
import { addComment, loadComments, updateComment } from "modules/activity/actions";
import { loadSingleActivity } from "modules/feed/actions";
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        user: userState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        commentsRequest: bindActionCreators(loadComments, dispatch),
        submitCommentRequest: bindActionCreators(addComment, dispatch),
        fetchSingleActivityRequest: bindActionCreators(loadSingleActivity, dispatch),
        updateCommentRequest: bindActionCreators(updateComment, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentScreen);
