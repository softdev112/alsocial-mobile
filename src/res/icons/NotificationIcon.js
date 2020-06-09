// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    focused?: boolean,
};

const NotificationIcon = ({ focused, fill }: Props) =>
    !focused ? (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Path d='M21 16a1 1 0 0 1-1-1V8A8 8 0 0 0 4 8v7a1.001 1.001 0 0 1-1 1 1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM5.816 16A2.965 2.965 0 0 0 6 15V8a6 6 0 0 1 12 0v7a2.965 2.965 0 0 0 .184 1zM8 20h8v2H8z' />
        </Svg>
    ) : (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Path d='M21 16a1 1 0 0 1-1-1V8A8 8 0 0 0 4 8v7a1.001 1.001 0 0 1-1 1 1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM8 20h8v2H8z' />
        </Svg>
    );

NotificationIcon.defaultProps = {
    focused: false,
};

export default NotificationIcon;
