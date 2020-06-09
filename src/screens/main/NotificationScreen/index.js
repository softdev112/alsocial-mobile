import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNotifications, seenMarkNotifications } from "modules/notification/actions";
import NotificationScreen from "./presenter";

function mapStateToProps(state) {
    const {
        userState: { _id, username },
        notificationState: { notifications, unreadNotification },
    } = state;
    return {
        userId: _id,
        username,
        notifications,
        unreadNotification,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadNotifications: bindActionCreators(fetchNotifications, dispatch),
        seenNotifications: bindActionCreators(seenMarkNotifications, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationScreen);
