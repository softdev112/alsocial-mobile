// @flow
import React from "react";
import Svg, { Circle } from "react-native-svg";

import R from "res/R";

type Props = {
    fill?: ColorValue,
};

const EllipsisIcon = ({ fill }: Props) => (
    <Svg width={18} height={18} fill={fill} viewBox='0 0 17 5'>
        <Circle cx='2.5' cy='2.5' r='1.5' />
        <Circle cx='8.5' cy='2.5' r='1.5' />
        <Circle cx='14.5' cy='2.5' r='1.5' />
    </Svg>
);

EllipsisIcon.defaultProps = {
    fill: R.colors.dark,
};

export default EllipsisIcon;
