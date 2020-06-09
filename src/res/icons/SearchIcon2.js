// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    focused?: boolean,
};

const SearchIcon2 = ({ focused, fill }: Props) =>
    !focused ? (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Path d='M21.707 20.56l-4.44-4.43a9.074 9.074 0 1 0-1.52 1.3l4.54 4.54a.976.976 0 0 0 .71.3 1.01 1.01 0 0 0 .71-.3.996.996 0 0 0 0-1.41zM10.678 17a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z' />
        </Svg>
    ) : (
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill={fill}>
            <Path d='M21.727 19.855l-3.77-3.769a9.585 9.585 0 1 0-2.273 1.97l3.922 3.92a1.5 1.5 0 1 0 2.12-2.12zM4.172 10a6.5 6.5 0 1 1 6.5 6.5 6.508 6.508 0 0 1-6.5-6.5z' />
        </Svg>
    );

export default SearchIcon2;
