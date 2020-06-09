import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditProfileScreen from "./presenter";
import { updateProfile } from "modules/user/actions";

function mapStateToProps(state) {
    const {
        userState: {
            bio,
            city,
            country,
            email,
            gender,
            name,
            postalCode,
            profileImage,
            coverImage,
            state: userState,
            location,
            website,
        },
    } = state;
    return {
        user: {
            bio,
            city,
            country,
            email,
            gender,
            name,
            postalCode,
            profileImage,
            coverImage,
            state: userState,
            location,
            website,
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateProfile: bindActionCreators(updateProfile, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProfileScreen);
