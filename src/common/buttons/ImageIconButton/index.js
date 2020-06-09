import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { IconButton } from "common/buttons";
import { CameraIcon2 } from "res/icons";
import PickerImage from "utils/image";
import { withBottomSheet } from "components/BottomSheet";

class ImageIconButton extends PureComponent {
    handlePicturePress = () => {
        const { onResponseImage, isCrop, cropWidth, cropHeight, showBottomSheet } = this.props;
        new PickerImage(
            onResponseImage,
            isCrop,
            cropWidth,
            cropHeight,
            showBottomSheet,
        ).onPickerImage();
    };

    // Render any loading content that you like here
    render() {
        return <IconButton onPress={this.handlePicturePress} icon={<CameraIcon2 />} />;
    }
}

ImageIconButton.propTypes = {
    cropWidth: PropTypes.number,
    cropHeight: PropTypes.number,
    isCrop: PropTypes.bool,
    onResponseImage: PropTypes.func,
};

ImageIconButton.defaultProps = {
    cropWidth: 200,
    cropHeight: 200,
    isCrop: true,
};

export default withBottomSheet(ImageIconButton);
