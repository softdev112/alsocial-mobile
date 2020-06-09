// @flow

import React, { Component } from "react";
import { Modal, View, PixelRatio, Platform } from "react-native";
import PropTypes from "prop-types";
import ImageViewer from "react-native-image-zoom-viewer";
import styles from "./styles";
import { NavigationBar } from "../../views";
import Icon from "react-native-vector-icons/AntDesign";
import R from "res/R";
import _ from "lodash";
import { ContainerView, StatusBarView } from "common/themed";

class ModalImages extends Component {
    state = { visibleModal: false, currentIndex: 0, images: [] };

    static getDerivedStateFromProps(props, state) {
        const { images } = props;
        const width = PixelRatio.getPixelSizeForLayoutSize(R.dimensions.screen.width);
        return {
            ...state,
            images: images
                .filter(img => typeof img === "string")
                .map(img =>
                    img.includes("fit=max")
                        ? img
                        : `${img}${img.includes("?") ? "&" : "?"}w=${width}&auto=format&fit=clamp`,
                ),
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextState.visibleModal !== this.state.visibleModal ||
            !_.isEqual(nextState.images, this.state.images)
        );
    }

    componentDidMount(): void {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    openModal = async (image = null) => {
        let index = 0;
        if (image) {
            const { images } = this.props;
            index = images && images.indexOf(image);
        }
        await this.setState({
            visibleModal: true,
            currentIndex: Math.max(index, 0),
        });
    };

    // _renderFooter = () => {
    //     const { actor, activity, organicActivity, ownPost, isRepost, onCloseReq } = this.props;
    //     return (
    //         <View style={styles.footerContainer}>
    //             <FeedActionBar
    //                 actor={actor}
    //                 activity={activity}
    //                 organicActivity={organicActivity}
    //                 ownPost={ownPost}
    //                 isRepost={isRepost}
    //                 containerStyle={styles.transparent}
    //                 onPressComment={onCloseReq}
    //                 onPressRepost={onCloseReq}
    //                 onPressLikes={onCloseReq}
    //             />
    //         </View>
    //     );
    // };

    _renderHeader = (currentIndex: string, allSize: string) => {
        const title = this.props.showIndicator ? `${currentIndex}/${allSize}` : "";
        this.setState({
            currentIndex,
        });
        return (
            <View style={styles.headerContainer}>
                <NavigationBar
                    title=''
                    leftIcon={<Icon name='close' size={26} color='white' />}
                    handleLeft={this._closeModal}
                    backgroundColor='transparent'
                    borderWidth={0}
                />
            </View>
        );
    };

    _closeModal = () => {
        this.setState({
            visibleModal: false,
        });
    };
    render() {
        const { visibleModal, currentIndex, images } = this.state;
        return visibleModal ? (
            <ContainerView>
                <Modal visible={visibleModal} transparent={true}>
                    {Platform.OS === "ios" ? <StatusBarView /> : null}
                    <View style={styles.container}>
                        {images && !!images.length ? (
                            <ImageViewer
                                imageUrls={images.map(item => ({ url: item }))}
                                enableImageZoom
                                enableSwipeDown
                                index={currentIndex}
                                onSwipeDown={this._closeModal}
                                renderIndicator={this._renderHeader}
                                saveToLocalByLongPress={false}
                            />
                        ) : null}
                    </View>
                </Modal>
            </ContainerView>
        ) : null;
    }
}

ModalImages.propTypes = {
    images: PropTypes.array,
    sizes: PropTypes.array,
    showIndicator: PropTypes.bool,
};

ModalImages.defaultProps = {
    images: [],
    showIndicator: true,
};

export default ModalImages;
