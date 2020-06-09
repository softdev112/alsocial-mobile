import { createStackNavigator } from "react-navigation-stack";

import transitionConfig from "./transitionConfig";
import UserProfileScreen from "../main/UserProfileScreen";
import SettingsScreen from "../main/UserProfileScreen/SettingsScreen";
import AboutScreen from "../auth/AboutScreen";
import PrivacyScreen from "../auth/PrivacyScreen";
import TermsScreen from "../auth/TermsScreen";
import CommentScreen from "../main/CommentScreen";
import LicenseScreen from "../auth/LicenseScreen";
import AccountScreen from "../main/UserProfileScreen/AccountScreen";
import EditProfileScreen from "../main/UserProfileScreen/EditProfileScreen";
import FollowScreen from "../main/FollowScreen";
import LikeScreen from "../main/LikeScreen";
import RepostScreen from "../main/RepostScreen";
import { navigationOptions } from "utils/navigation";
import HashTagScreen from "../main/HashTagScreen";
import InviteScreen from "../main/UserProfileScreen/InviteScreen";
import ChangePasswordScreen from "../main/UserProfileScreen/ChangePasswordScreen";
import FullScreenVideoPlayer from "../main/FullScreenVideoPlayer";
import PostFeedScreen from "../main/PostFeedScreen";
import DisplayScreen from "../main/UserProfileScreen/DisplayScreen";
import NotificationsSettingScreen from "../main/UserProfileScreen/NotificationsSettingScreen";

const ProfileNavigator = createStackNavigator(
    {
        Profile: { screen: UserProfileScreen },
        Settings: { screen: SettingsScreen },
        About: { screen: AboutScreen },
        Privacy: { screen: PrivacyScreen },
        Terms: { screen: TermsScreen },
        Comment: { screen: CommentScreen },
        License: { screen: LicenseScreen },
        Account: { screen: AccountScreen },
        Display: { screen: DisplayScreen },
        EditProfile: { screen: EditProfileScreen },
        User: { screen: UserProfileScreen },
        Follow: { screen: FollowScreen },
        Like: { screen: LikeScreen },
        Repost: { screen: RepostScreen },
        Post: { screen: PostFeedScreen },
        HashTag: { screen: HashTagScreen },
        Invite: { screen: InviteScreen },
        ChangePassword: { screen: ChangePasswordScreen },
        FullScreenVideoPlayer: { screen: FullScreenVideoPlayer },
        Notifications: { screen: NotificationsSettingScreen },
    },
    {
        initialRouteName: "Profile",
        headerMode: "none",
        transitionConfig,
    },
);

ProfileNavigator.navigationOptions = navigationOptions;

export default ProfileNavigator;
