/**
 * @format
 */
if (__DEV__) {
    import("./src/redux/ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

// https://github.com/react-native-community/releases/issues/140#issuecomment-532819601
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

const root = gestureHandlerRootHOC(App);

AppRegistry.registerComponent(appName, () => root);
