import React, { PureComponent } from "react";
import { IconRow, IconView } from "./styles";
import { PhotoIcon, LinkIcon, GifIcon } from "res/icons";
import { IconWrap } from "../../icons";
import PropTypes from "prop-types";

class PostIcons extends PureComponent {
    // Render any loading content that you like here
    render() {
        const { isSubmitting, onPressImage, onPressLink, onPressGifs } = this.props;
        return (
            <IconRow>
                <IconView
                    icon={<IconWrap Icon={PhotoIcon} />}
                    onPress={onPressImage}
                    disabled={isSubmitting}
                />
                <IconView
                    icon={<IconWrap Icon={LinkIcon} style={{ marginTop: -2 }} />}
                    onPress={onPressLink}
                    disabled={isSubmitting}
                />

                <IconView
                    icon={<IconWrap Icon={GifIcon} style={{ marginTop: 2 }} />}
                    onPress={onPressGifs}
                    disabled={isSubmitting}
                />
            </IconRow>
        );
    }
}

PostIcons.propTypes = {
    isSubmitting: PropTypes.bool,
    onPressImage: PropTypes.func,
    onPressLink: PropTypes.func,
    onPressGifs: PropTypes.func,
};

export default PostIcons;
