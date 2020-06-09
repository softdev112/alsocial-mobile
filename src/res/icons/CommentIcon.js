// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

type Props = {
    style?: PropTypes.object,
};

const CommentIcon = ({ style, fill }: Props) => (
    <Svg fill={fill} width={24} height={24} style={style} viewBox='0 0 24 24'>
        <Path
            fill='none'
            d='M18.81,10.03A6.4115,6.4115,0,0,0,19,8.5,6.5,6.5,0,1,0,12.5,15a6.412,6.412,0,0,0,1.53-.19'
        />
        <Path d='M4,8.5a8.5018,8.5018,0,0,0,11.81,7.83l3.9.67h.09A1.2035,1.2035,0,0,0,21,15.8l-.01-.17-.66-3.82A8.5,8.5,0,1,0,4,8.5Zm2,0a6.5,6.5,0,0,1,13,0,6.4115,6.4115,0,0,1-.19,1.53,6.6414,6.6414,0,0,1-.56,1.49l.47,2.75.1.55-.55-.1-2.75-.47a6.6436,6.6436,0,0,1-1.49.56A6.412,6.412,0,0,1,12.5,15,6.5127,6.5127,0,0,1,6,8.5Z' />
    </Svg>
);

CommentIcon.defaultProps = {
    style: {},
};

export default CommentIcon;
