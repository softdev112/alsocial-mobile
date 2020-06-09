import { connect } from "react-redux";

import NotificationIcon from "./presenter";

export default connect(state => ({ unreadCount: state.notificationState.unreadNotification }))(
    NotificationIcon,
);
