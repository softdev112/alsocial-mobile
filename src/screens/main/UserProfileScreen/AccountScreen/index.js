import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountScreen from "./presenter";
import { updateAccount, deleteAccount } from "modules/user/actions";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        user: userState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAccount: bindActionCreators(updateAccount, dispatch),
        deleteAccount: bindActionCreators(deleteAccount, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountScreen);
