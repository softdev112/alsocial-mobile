// @flow
import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {
    focused?: boolean,
};

const ProfileIcon2 = ({ focused, fill }: Props) =>
    !focused ? (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Path d='M12 12a6 6 0 1 0-6-6 6.007 6.007 0 0 0 6 6zm0-10a4 4 0 1 1-4 4 4.004 4.004 0 0 1 4-4zM20.077 21.585l.988-.195a.506.506 0 0 0 .386-.65 9.996 9.996 0 0 0-18.902 0c-.098.284.09.591.494.671l.882.175a.499.499 0 0 0 .564-.33 7.995 7.995 0 0 1 15.022 0 .5.5 0 0 0 .566.33z' />
        </Svg>
    ) : (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Circle cx='12' cy='6' r='6' />
            <Path d='M21.252 20.24a6.924 6.924 0 0 0-.5-1.058 10.325 10.325 0 0 0-.748-1.166A10.097 10.097 0 0 0 19 16.89a9.925 9.925 0 0 0-14 0 10.097 10.097 0 0 0-1.004 1.127 10.325 10.325 0 0 0-.748 1.166 6.924 6.924 0 0 0-.5 1.058c-.211.574.381 1.15.993 1.15H20.26c.612 0 1.204-.576.993-1.15z' />
        </Svg>
    );

export default ProfileIcon2;
