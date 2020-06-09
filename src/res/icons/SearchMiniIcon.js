// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    fill?: ColorValue,
};

const SearchMiniIcon = ({ fill, style }: Props) => (
    <Svg width={18} height={18} viewBox='0 0 18 18' style={style}>
        <Path
            fill={fill}
            d='M16,14.5859l-3.2583-3.2583a6.5241,6.5241,0,1,0-1.4141,1.4141L14.5859,16A1,1,0,0,0,16,14.5859ZM7.5,12A4.5,4.5,0,1,1,12,7.5,4.5049,4.5049,0,0,1,7.5,12Z'
        />
    </Svg>
);

SearchMiniIcon.defaultProps = {
    fill: "#111",
};

export default SearchMiniIcon;
