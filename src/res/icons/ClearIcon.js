// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    fill?: ColorValue,
};

const ClearIcon = ({ fill, style }: Props) => (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill={fill} style={style}>
        <Path d='M12,5a7,7,0,1,0,7,7A7,7,0,0,0,12,5Zm3.0679,9.1758a.75.75,0,1,1-1.0605,1.0605L12,13.229,9.9927,15.2363a.75.75,0,0,1-1.0605-1.0605l2.0073-2.0073L8.9321,10.1611A.75.75,0,0,1,9.9927,9.1006L12,11.1079l2.0073-2.0073a.75.75,0,0,1,1.0605,1.0605l-2.0073,2.0073Z' />
    </Svg>
);

ClearIcon.defaultProps = {
    fill: "#111",
};

export default ClearIcon;
