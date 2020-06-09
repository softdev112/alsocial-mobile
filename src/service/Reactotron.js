/**
 * @flow
 */

import Reactotron from "reactotron-react-native";

Reactotron.configure()
    .useReactNative()
    .connect();

// console.tron = Reactotron;

export default Reactotron;
