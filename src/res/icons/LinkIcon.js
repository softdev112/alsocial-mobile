// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    fill?: ColorValue,
};

const LinkIcon = ({ fill, style }: Props) => (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill={fill} style={style}>
        <Path d='M12.8267,9.502a.9963.9963,0,0,0,.1579,1.4l.0029.0023-.0023.0029a3.0033,3.0033,0,0,1,.4754,4.2159l-1.87,2.3457-1.2468,1.5638a3,3,0,0,1-4.6913-3.74l.6234-.7819A1,1,0,0,0,4.7147,13.261l-.0023.0029-.0006,0-.6234.7819A5,5,0,0,0,11.9073,20.28l1.2468-1.5638,1.87-2.3457a5.0059,5.0059,0,0,0-.7924-7.0265l.0019-.0023A1.0034,1.0034,0,0,0,12.8267,9.502Z' />
        <Path d='M12.1928,3.8808,10.946,5.4446,9.0757,7.79a5.0059,5.0059,0,0,0,.7924,7.0265l-.0019.0023a1,1,0,0,0,1.2493-1.5609l-.0029-.0023.0023-.0029A3.0033,3.0033,0,0,1,10.64,9.0371l1.87-2.3457,1.2468-1.5638a3,3,0,1,1,4.6913,3.74l-.6234.7819a1,1,0,0,0,1.5609,1.2493l.0023-.0029.0006,0,.6234-.7819a5,5,0,0,0-7.8189-6.2341Z' />
    </Svg>
);

LinkIcon.defaultProps = {
    fill: "#111",
};

export default LinkIcon;
