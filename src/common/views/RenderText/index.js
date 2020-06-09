import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RenderText from "./presenter";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}

export default connect(
    mapStateToProps,
    null,
)(RenderText);
