import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserProfileScreen from "./presenter";
import {
    profileToFollowing,
    profileToFollowers,
    profileToEdit,
    profileToSettings,
    profileToComments,
    profileToLikes,
    profileToOtherProfile,
    profileToRepost,
    profileCallRefresh,
    profileCallLoadingMore,
    profileNewFeeds,
} from "modules/profile/actions";

function mapStateToProps(state) {
    const { userState } = state;
    return {
        owner: userState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toFollowing: bindActionCreators(profileToFollowing, dispatch),
        toFollowers: bindActionCreators(profileToFollowers, dispatch),
        toEdit: bindActionCreators(profileToEdit, dispatch),
        toSettings: bindActionCreators(profileToSettings, dispatch),
        toComments: bindActionCreators(profileToComments, dispatch),
        toLikes: bindActionCreators(profileToLikes, dispatch),
        toOtherProfile: bindActionCreators(profileToOtherProfile, dispatch),
        toRepost: bindActionCreators(profileToRepost, dispatch),
        callRefresh: bindActionCreators(profileCallRefresh, dispatch),
        callLoadingMore: bindActionCreators(profileCallLoadingMore, dispatch),
        loadNewPostFeeds: bindActionCreators(profileNewFeeds, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserProfileScreen);
