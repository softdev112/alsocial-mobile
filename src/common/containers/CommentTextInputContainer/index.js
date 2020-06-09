import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CommentTextInputContainer from "./presenter";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        user: userState,
    };
}

export default connect(
    mapStateToProps,
    null,
)(CommentTextInputContainer);
