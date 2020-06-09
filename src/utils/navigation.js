export const Root = {
    AuthLoading: "AuthLoading",
    AuthStack: "AuthStack",
    MainStack: "MainStack",
    Interests: "Interests",
    NewVersion: "NewVersion",
};

export const Auth = {
    Auth: "Auth",
    SignUpSettings: "SignUpSettings",
    ResetPassword: "ResetPassword",
    NewPassword: "NewPassword",
    About: "About",
    Terms: "Terms",
    Privacy: "Privacy",
    License: "License",
};

export const Main = {
    PostFeed: "PostFeed",
    Timeline: "Timeline",
    Search: "Search",
    Notification: "Notification",
    User: "User",
    Profile: "UserProfile",
    Settings: "Settings",
    Comment: "Comment",
    Account: "Account",
    EditProfile: "EditProfile",
    Display: "Display",
    Follow: "Follow",
    Like: "Like",
    Repost: "Repost",
    Post: "Post",
    HashTag: "HashTag",
    Invite: "Invite",
    ChangePassword: "ChangePassword",
    Login: "Login",
    SignUp: "SignUp",
    FullScreenVideoPlayer: "FullScreenVideoPlayer",
    Notifications: "Notifications",
};

export function navigationOptions({ navigation: { state } }: Object) {
    const { routes } = state;
    const lastRoute = routes.length && routes[routes.length - 1];

    let tabBarVisible = true;

    // if (state.index > 0) {
    //     tabBarVisible = false;
    // }

    const routeName = lastRoute?.routeName;
    if (
        routeName === Main.Repost ||
        routeName === Main.Post ||
        routeName === Main.PostFeed ||
        routeName === Main.Settings ||
        routeName === Main.Invite ||
        routeName === Main.Account ||
        routeName === Main.ChangePassword ||
        routeName === Main.Comment ||
        routeName === Auth.About ||
        routeName === Auth.License ||
        routeName === Auth.Privacy ||
        routeName === Auth.Terms ||
        routeName === Main.FullScreenVideoPlayer ||
        routeName === Main.Display ||
        routeName === Main.Notifications
    ) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
}
