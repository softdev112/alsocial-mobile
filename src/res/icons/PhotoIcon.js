// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    fill?: ColorValue,
};

const PhotoIcon = ({ fill }: Props) => (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill={fill}>
        <Path d='M21.93,3H18.12l-.95-1.89A2,2,0,0,0,15.38,0H8.62A2.009,2.009,0,0,0,6.83,1.1L5.88,3H2.07A2.0741,2.0741,0,0,0,0,5.07V18.93A2.0741,2.0741,0,0,0,2.07,21H21.93A2.0741,2.0741,0,0,0,24,18.93V5.07A2.0741,2.0741,0,0,0,21.93,3ZM22,18.93a.0684.0684,0,0,1-.07.07L2,18.93,2.06,8l.01-1.61H2.06l.01-1V5l3.96.01,1.08.01L8.12,3l.5-1h6.76l.5,1,1.03,2.05.98.01L22,5.07Z' />
        <Path d='M12,6a5,5,0,1,0,5,5A5.0059,5.0059,0,0,0,12,6Zm0,8a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,12,14Z' />
    </Svg>
);

PhotoIcon.defaultProps = {
    fill: "#111",
};

export default PhotoIcon;
