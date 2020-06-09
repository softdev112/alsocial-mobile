// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

type Props = {
    active: boolean,
    style?: PropTypes.object,
};

const RepostIcon = ({ active, style, fill }: Props) => (
    <Svg fill={active ? "#EDA751" : fill} width={24} height={24} style={style} viewBox='0 0 24 24'>
        <Path d='M18.7924,11.5505h0a1.0523,1.0523,0,0,0-1.2572.326A6.3766,6.3766,0,0,1,6.55,11.848l.7781-.2955a.5772.5772,0,0,0,.0317-1.066L4.9146,9.3875a.5773.5773,0,0,0-.7632.29l-1.099,2.4448a.5772.5772,0,0,0,.7314.7763l.8809-.3345A8.4809,8.4809,0,0,0,12.0973,17a8.5858,8.5858,0,0,0,7.2792-3.9471A1.081,1.081,0,0,0,18.7924,11.5505Z' />
        <Path d='M20.8015,5.0411l-.8148.3094A8.5624,8.5624,0,0,0,4.3294,4.8588a1.1024,1.1024,0,0,0,.62,1.418h0a1.0672,1.0672,0,0,0,1.3392-.4591A6.397,6.397,0,0,1,18.1,6.0671l-.8422.32A.5772.5772,0,0,0,17.226,7.453l1.9858.8927A1.08,1.08,0,0,0,20.64,7.8032l.8927-1.9859A.5772.5772,0,0,0,20.8015,5.0411Z' />
    </Svg>
);

RepostIcon.defaultProps = {
    style: {},
};

export default RepostIcon;
