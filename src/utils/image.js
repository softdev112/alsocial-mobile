import { Keyboard, NativeModules } from "react-native";
import { checkPermissions } from "./helper";

const ImagePicker = NativeModules.ImageCropPicker;
class PickerImage {
    _onResponseImage: Function;
    _showBottomSheet: Function;
    _isCrop: Boolean;
    _cropWidth: Number;
    _cropHeight: Number;
    constructor(
        onResponseImage: Function,
        isCrop = false,
        cropWidth = 100,
        cropHeight = 100,
        showBottomSheet: Function,
    ) {
        this._onResponseImage = onResponseImage;
        this._showBottomSheet = showBottomSheet;
        this._isCrop = isCrop;
        this._cropWidth = cropWidth;
        this._cropHeight = cropHeight;
    }

    onPickerImage = () => {
        Keyboard.dismiss();
        let options = ["Take photo", "Select photo", "Cancel"];
        const cancelButtonIndex = 2;
        this._showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    checkPermissions("camera", this.getImage);
                } else if (buttonIndex === 1) {
                    checkPermissions("library", this.getImage);
                }
            },
        );
    };

    getImage = (type: string) => {
        let options = {
            cropping: this._isCrop,
            mediaType: "photo",
            forceJpg: true,
            writeTempFile: true,
            compressImageQuality: 1.0,
            compressImageMaxWidth: 2000,
            compressImageMaxHeight: 2000,
        };

        if (this._isCrop) {
            options = { ...options, width: this._cropWidth, height: this._cropHeight };
        }

        if (type === "camera") {
            ImagePicker.openCamera({
                ...options,
            })
                .then(image => {
                    this.pickedImage(image);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            ImagePicker.openPicker({
                ...options,
                multiple: !this._isCrop,
            })
                .then(image => {
                    this.pickedImage(image);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    pickedImage = result => {
        if (Array.isArray(result)) {
            this._onResponseImage(
                result.map(image => {
                    return { imageUri: image.uri || image.path, contentType: image.mime };
                }),
            );
        } else {
            const resultUri = result.uri || result.path;
            let contentType = result.mime;
            this._onResponseImage({
                imageUri: resultUri,
                contentType,
            });
        }
    };
}

export default PickerImage;
