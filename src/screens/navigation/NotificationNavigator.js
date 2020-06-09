import { createStackNavigator } from "react-navigation-stack";

import transitionConfig from "./transitionConfig";
import NotificationScreen from "../main/NotificationScreen";
import UserProfileScreen from "../main/UserProfileScreen";
import CommentScreen from "../main/CommentScreen";
import FollowScreen from "../main/FollowScreen";
import LikeScreen from "../main/LikeScreen";
import RepostScreen from "../main/RepostScreen";
import { navigationOptions } from "utils/navigation";
import HashTagScreen from "../main/HashTagScreen";
import SettingsScreen from "../main/UserProfileScreen/SettingsScreen";
import AboutScreen from "../auth/AboutScreen";
import PrivacyScreen from "../auth/PrivacyScreen";
import TermsScreen from "../auth/TermsScreen";
import LicenseScreen from "../auth/LicenseScreen";
import AccountScreen from "../main/UserProfileScreen/AccountScreen";
import EditProfileScreen from "../main/UserProfileScreen/EditProfileScreen";
import InviteScreen from "../main/UserProfileScreen/InviteScreen";
import ChangePasswordScreen from "../main/UserProfileScreen/ChangePasswordScreen";
import FullScreenVideoPlayer from "../main/FullScreenVideoPlayer";

const NotificationNavigator = createStackNavigator(
    {
        Notification: { screen: NotificationScreen },
        User: { screen: UserProfileScreen },
        Comment: { screen: CommentScreen },
        Follow: { screen: FollowScreen },
        Like: { screen: LikeScreen },
        Repost: { screen: RepostScreen },
        HashTag: { screen: HashTagScreen },
        Settings: { screen: SettingsScreen },
        About: { screen: AboutScreen },
        Privacy: { screen: PrivacyScreen },
        Terms: { screen: TermsScreen },
        License: { screen: LicenseScreen },
        Account: { screen: AccountScreen },
        EditProfile: { screen: EditProfileScreen },
        Invite: { screen: InviteScreen },
        ChangePassword: { screen: ChangePasswordScreen },
        FullScreenVideoPlayer: { screen: FullScreenVideoPlayer },
    },
    {
        initialRouteName: "Notification",
        headerMode: "none",
        transitionConfig,
    },
);

NotificationNavigator.navigationOptions = navigationOptions;

export default NotificationNavigator;
