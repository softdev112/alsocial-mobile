import React from "react";
import { Keyboard, Platform } from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import TimelineNavigator from "./TimelineNavigator";
import SearchNavigator from "./SearchNavigator";
import PostNavigator from "./PostNavigator";
import NotificationNavigator from "./NotificationNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { NotificationIcon, TabBarIcon } from "common/buttons";

class TabBarComponent extends React.Component {
    state = {
        visible: true,
    };

    componentDidMount() {
        if (Platform.OS === "android") {
            this.keyboardEventListeners = [
                Keyboard.addListener("keyboardDidShow", this.visible(false)),
                Keyboard.addListener("keyboardDidHide", this.visible(true)),
            ];
        } else {
            this.keyboardEventListeners = [
                Keyboard.addListener("keyboardWillShow", this.visible(false)),
                Keyboard.addListener("keyboardWillHide", this.visible(true)),
            ];
        }
    }

    componentWillUnmount() {
        this.keyboardEventListeners &&
            this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
    }

    visible = visible => () => this.setState({ visible });

    render() {
        if (!this.state.visible) {
            return null;
        } else {
            return <BottomTabBar {...this.props} />;
        }
    }
}

const MainNavigator = createBottomTabNavigator(
    {
        TimelineTab: {
            screen: TimelineNavigator,
            navigationOptions: {
                tabBarIcon: props => <TabBarIcon {...props} name='home' />,
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    const { isFocused } = navigation;

                    if (isFocused) {
                        navigation.emit("refocus", { isFocused: isFocused() });
                    }
                    defaultHandler();
                },
            },
        },
        SearchTab: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarIcon: props => <TabBarIcon {...props} name='search1' />,
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    const { isFocused } = navigation;

                    if (isFocused) {
                        navigation.emit("refocus", { isFocused: isFocused() });
                    }
                    defaultHandler();
                },
            },
        },
        PostFeedTab: {
            screen: PostNavigator,
            navigationOptions: {
                tabBarIcon: props => <TabBarIcon {...props} name='create' />,
                tabBarVisible: false,
            },
        },
        NotificationTab: {
            screen: NotificationNavigator,
            navigationOptions: {
                tabBarIcon: props => (
                    <NotificationIcon>
                        <TabBarIcon {...props} name='bells' />
                    </NotificationIcon>
                ),
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    const { isFocused } = navigation;

                    if (isFocused) {
                        navigation.emit("refocus", { isFocused: isFocused() });
                    }
                    defaultHandler();
                },
            },
        },
        UserProfileTab: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarIcon: props => <TabBarIcon {...props} name='user' />,
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    const { isFocused } = navigation;

                    if (isFocused) {
                        navigation.emit("refocus", { isFocused: isFocused() });
                    }
                    defaultHandler();
                },
            },
        },
    },
    {
        initialRouteName: "TimelineTab",
        navigationOptions: {
            header: null,
        },
        tabBarComponent: props => <TabBarComponent {...props} />,
        defaultNavigationOptions: ({ screenProps }) => ({
            tabBarOptions: {
                showIcon: true,
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    backgroundColor: screenProps.theme.color.background,
                },
                safeAreaInset: { bottom: "never", top: "never" },
            },
        }),
    },
);

export default MainNavigator;
