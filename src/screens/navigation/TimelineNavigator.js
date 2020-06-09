import { createStackNavigator } from "react-navigation-stack";

import transitionConfig from "./transitionConfig";
import TimelineScreen from "../main/TimelineScreen";
import UserProfileScreen from "../main/UserProfileScreen";
import CommentScreen from "../main/CommentScreen";
import FollowScreen from "../main/FollowScreen";
import LikeScreen from "../main/LikeScreen";
import RepostScreen from "../main/RepostScreen";
import { navigationOptions } from "utils/navigation";
import HashTagScreen from "../main/HashTagScreen";
import FullScreenVideoPlayer from "../main/FullScreenVideoPlayer";
import PostFeedScreen from "../main/PostFeedScreen";

const TimelineNavigator = createStackNavigator(
    {
        Timeline: { screen: TimelineScreen },
        User: { screen: UserProfileScreen },
        Comment: { screen: CommentScreen },
        Follow: { screen: FollowScreen },
        Like: { screen: LikeScreen },
        Repost: { screen: RepostScreen },
        Post: { screen: PostFeedScreen },
        HashTag: { screen: HashTagScreen },
        FullScreenVideoPlayer: { screen: FullScreenVideoPlayer },
    },
    {
        initialRouteName: "Timeline",
        headerMode: "none",
        transitionConfig,
    },
);

TimelineNavigator.navigationOptions = navigationOptions;

export default TimelineNavigator;
