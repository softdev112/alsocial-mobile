import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateInterests, validToken } from "modules/user/actions";
import InterestsScreen from "./presenter";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        userId: userState._id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInterestsRequest: bindActionCreators(updateInterests, dispatch),
        validToken: bindActionCreators(validToken, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InterestsScreen);
