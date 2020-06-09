import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import PickerImage from "utils/image";
import ModalLink from "./ModalLink";
import ModalGifs from "./ModalGifs";
import { PostIcons } from "common/views";
import styles from "./styles";
import R from "res/R";
import { withBottomSheet } from "components/BottomSheet";

class PostFooter extends PureComponent {
    state = {
        openModalLink: false,
        openModalGifs: false,
        action: null,
    };

    constructor(props) {
        super(props);
        const { action } = this.props;
        this.state = {
            openModalLink: action === R.constants.post.link,
            openModalGifs: action === R.constants.post.gif,
            action,
        };
    }

    componentDidMount() {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    _handleImagePress = () => {
        const { onPickerImage, showBottomSheet } = this.props;
        new PickerImage(onPickerImage, false, 100, 100, showBottomSheet).onPickerImage();
    };

    _openLinkModal = async () => {
        if (!this.state.openModalLink) {
            this.setState({ openModalLink: true });
        }
    };

    _openGifModal = async () => {
        if (!this.state.openModalGifs) {
            await this.setState({ openModalGifs: true });
        }
    };

    _onSelectedLink = links => {
        const { onAddLink } = this.props;
        onAddLink(links);
        this.setState({
            openModalLink: false,
        });
    };
    _onSelectedGif = async url => {
        const { onAddGif } = this.props;
        await onAddGif(url);

        this.setState({
            openModalGifs: false,
        });
    };

    render() {
        const { openModalLink, openModalGifs } = this.state;
        const { isSubmitting } = this.props;
        return (
            <View style={styles.container}>
                <PostIcons
                    isSubmitting={isSubmitting}
                    onPressImage={this._handleImagePress}
                    onPressLink={this._openLinkModal}
                    onPressGifs={this._openGifModal}
                />
                <ModalGifs
                    visibleModal={openModalGifs}
                    onCloseReq={() => this.setState({ openModalGifs: false })}
                    onSelectedGif={this._onSelectedGif}
                />
                <ModalLink
                    visibleModal={openModalLink}
                    onCloseReq={() => this.setState({ openModalLink: false })}
                    onSelectLink={this._onSelectedLink}
                />
            </View>
        );
    }
}

PostFooter.propTypes = {
    onPickerImage: PropTypes.func,
    onAddLink: PropTypes.func,
    onAddGif: PropTypes.func,
    isSubmitting: PropTypes.bool,
    action: PropTypes.number,
};

PostFooter.defaultProps = {
    isSubmitting: false,
    action: R.constants.post.text,
};

export default withBottomSheet(PostFooter);
