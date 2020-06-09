import { createStackNavigator } from "react-navigation-stack";

import transitionConfig from "./transitionConfig";
import SearchScreen from "../main/SearchScreen";
import UserProfileScreen from "../main/UserProfileScreen";
import CommentScreen from "../main/CommentScreen";
import FollowScreen from "../main/FollowScreen";
import LikeScreen from "../main/LikeScreen";
import RepostScreen from "../main/RepostScreen";
import { navigationOptions } from "utils/navigation";
import HashTagScreen from "../main/HashTagScreen";
import FullScreenVideoPlayer from "../main/FullScreenVideoPlayer";

const SearchNavigator = createStackNavigator(
    {
        Search: { screen: SearchScreen },
        User: { screen: UserProfileScreen },
        Comment: { screen: CommentScreen },
        Follow: { screen: FollowScreen },
        Like: { screen: LikeScreen },
        Repost: { screen: RepostScreen },
        HashTag: { screen: HashTagScreen },
        FullScreenVideoPlayer: { screen: FullScreenVideoPlayer },
    },
    {
        initialRouteName: "Search",
        headerMode: "none",
        transitionConfig,
    },
);

SearchNavigator.navigationOptions = navigationOptions;

export default SearchNavigator;
