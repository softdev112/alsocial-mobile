import { Animated, Easing } from "react-native";

export default () => ({
    transitionSpec: {
        duration: 350,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
    },
});
