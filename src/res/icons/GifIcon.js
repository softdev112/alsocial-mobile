// @flow
import React from "react";
import Svg, { Path, Polygon, Rect } from "react-native-svg";

type Props = {
    fill?: ColorValue,
};

const GifIcon = ({ fill, style }: Props) => (
    <Svg width={26} height={24} viewBox='0 0 26 24' fill={fill} style={style}>
        <Path d='M23.9512,0H2.0488A2.0509,2.0509,0,0,0,0,2.0488V17.9512A2.0509,2.0509,0,0,0,2.0488,20H23.9512A2.0509,2.0509,0,0,0,26,17.9512V2.0488A2.0509,2.0509,0,0,0,23.9512,0ZM24,17.9512A.0484.0484,0,0,1,23.9512,18L2,17.9512,2.0488,2,24,2.0488Z' />
        <Polygon points='19 11 21 11 21 9 19 9 19 8 22 8 22 6 17 6 17 14 19 14 19 11' />
        <Rect x='13' y='6' width='2' height='8' />
        <Path d='M7.89,14.01A3.9511,3.9511,0,0,0,11,12.63V9.52H8V11H9.15v.64a2,2,0,1,1,.3-3L10.9,7.26a3.9995,3.9995,0,1,0-3.01,6.75Z' />
    </Svg>
);

GifIcon.defaultProps = {
    fill: "#111",
};

export default GifIcon;
