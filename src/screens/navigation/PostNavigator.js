import { createStackNavigator } from "react-navigation-stack";

import transitionConfig from "./transitionConfig";
import { navigationOptions } from "utils/navigation";
import FullScreenVideoPlayer from "../main/FullScreenVideoPlayer";
import PostFeedScreen from "../main/PostFeedScreen";

const PostNavigator = createStackNavigator(
    {
        PostFeed: { screen: PostFeedScreen },
        FullScreenVideoPlayer: { screen: FullScreenVideoPlayer },
    },
    {
        initialRouteName: "PostFeed",
        headerMode: "none",
        transitionConfig,
    },
);

PostNavigator.navigationOptions = navigationOptions;

export default PostNavigator;
