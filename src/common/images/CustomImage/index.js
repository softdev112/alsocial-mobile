import React from "react";
import PropTypes from "prop-types";

import { ImageWrap } from "./styles";

type Props = {
    uri?: PropTypes.string,
    style?: PropTypes.object,
    resizeMode: PropTypes.string,
};

const CustomImage = ({ uri = null, style = null, resizeMode = null }: Props) => {
    return (
        uri && (
            <ImageWrap
                style={style}
                source={{ uri }}
                resizeMode={resizeMode ? resizeMode : "contain"}
                onError={() => {}}
            />
        )
    );
};

export default CustomImage;
