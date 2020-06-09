import React from "react";
import { View, ImageBackground, TouchableWithoutFeedback } from "react-native";
import R from "res/R";
import PropTypes from "prop-types";
import styles, { ContentView } from "./styles";
import ImageIconButton from "../../buttons/ImageIconButton";

type Props = {
    uri?: PropTypes.string,
    height?: PropTypes.number,
    onPickImage: PropTypes.func,
    onPress: PropTypes.func,
};

const CoverImage = ({
    uri = null,
    height = R.dimensions.image.cover.height,
    onPickImage = null,
    onPress = () => {},
}: Props) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <ContentView style={{ height }}>
                {!uri || uri === "" ? null : (
                    <ImageBackground
                        style={styles.cover}
                        source={{ uri: uri }}
                        onError={() => {}}
                    />
                )}
                {onPickImage && (
                    <View style={styles.cameraIcon}>
                        <ImageIconButton
                            cropWidth={500 * 3.4375}
                            cropHeight={500}
                            onResponseImage={onPickImage}
                            isCrop={true}
                        />
                    </View>
                )}
            </ContentView>
        </TouchableWithoutFeedback>
    );
};

export default CoverImage;
