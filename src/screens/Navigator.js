import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "./auth/AuthLoadingScreen";
import AuthNavigator from "./navigation/AuthNavigator";
import InterestsScreen from "./auth/InterestsScreen";
import MainScreen from "./main/MainScreen";
import NewVersionScreen from "./newVersion";
const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        AuthStack: AuthNavigator,
        Interests: InterestsScreen,
        MainStack: MainScreen,
        NewVersion: NewVersionScreen,
    },
    {
        initialRouteName: "AuthLoading",
        navigationOptions: {
            header: "none",
        },
    },
);

export default createAppContainer(RootStack);
