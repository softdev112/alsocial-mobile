import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileHeader from "./presenter";
import { profileToFollowing, profileToFollowers } from "modules/profile/actions";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toFollowing: bindActionCreators(profileToFollowing, dispatch),
        toFollower: bindActionCreators(profileToFollowers, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileHeader);
