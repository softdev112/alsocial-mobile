import React, { PureComponent } from "react";
import { Animated } from "react-native";
import R from "res/R";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

class AttachmentCardImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(props.defaultHeight),
            width: props.defaultWidth,
            opacity: new Animated.Value(0),
        };
    }

    _onLoad = e => {
        const {
            nativeEvent: {
                source: { width, height },
            },
        } = e;
        const ratio = height / width;
        const newHeight = this.state.width * ratio;
        Animated.parallel([
            Animated.timing(this.state.height, {
                toValue: newHeight,
                duration: 300,
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 300,
            }),
        ]).start();
    };

    render() {
        const { imageUri, theme } = this.props;
        const { width, height, opacity } = this.state;
        const style = { width, height, opacity: opacity, backgroundColor: theme.color.lightGrey };
        return (
            <Animated.Image
                source={{ uri: imageUri }}
                style={style}
                resizeMode={"cover"}
                onLoad={this._onLoad}
                onError={() => {}}
            />
        );
    }
}

AttachmentCardImage.propTypes = {
    imageUri: PropTypes.string,
    defaultHeight: PropTypes.number,
    defaultWidth: PropTypes.number,
};
AttachmentCardImage.defaultProps = {
    defaultWidth: R.dimensions.screen.width,
    defaultHeight: R.dimensions.screen.height / 3,
};

export default withTheme(AttachmentCardImage);
