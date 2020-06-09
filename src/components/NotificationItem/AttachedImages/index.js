import React, { PureComponent } from "react";
import { Image, View } from "react-native";
import { CustomImage } from "common/images";
import styles, { ImageWrap } from "./styles";
import R from "res/R";
import PropTypes from "prop-types";

class AttachedImages extends PureComponent {
    formatImage = url => {
        const isOurs = url.includes("stream-cloud-uploads");

        if (isOurs) return `${url}${url.includes("?") ? "&" : "?"}w=100`;

        return url;
    };

    prepareAttachmentImages = attachments => {
        if (attachments === undefined) {
            return null;
        }
        const getImage = (type, content) => {
            if (!content) return null;
            if (type === "images") return content;
            if (type === "og" && content.images) {
                const { 0: ogimage } = { ...content.images };

                if (ogimage && typeof ogimage.image === "string") return ogimage.image;
            }

            return null;
        };

        if (!attachments.order) {
            let images = [];

            Object.keys(attachments).forEach(key => {
                const attachment = attachments[key];

                if (key === "og") {
                    const ogImages = [];
                    const ogAttachment = Array.isArray(attachment) ? attachment : [attachment];

                    ogAttachment.forEach(e => {
                        const image = getImage("og", e);

                        if (image) ogImages.push(image);
                    });

                    if (ogImages.length) images = [...images, ...ogImages];
                } else if (key === "images" && attachment.length) {
                    images = [...images, ...attachment];
                }
            });

            return images.length ? images : null;
        }

        return attachments.order.reduce((a, { type, idx }) => {
            const image = getImage(type, attachments[type][idx]);

            return image ? [...a, image] : a;
        }, []);
    };
    render() {
        const { activity } = this.props;
        if (
            activity.attachments &&
            (activity.verb === "repost" || activity.verb === "post" || activity.verb === "comment")
        ) {
            const images = this.prepareAttachmentImages(activity.attachments);
            return (
                images && (
                    <View style={styles.container}>
                        {images.slice(0, 5).map((e, i) => (
                            <ImageWrap
                                uri={`${this.formatImage(e)}`}
                                key={`e-${i}`}
                                resizeMode={"cover"}
                            />
                        ))}
                    </View>
                )
            );
        }
        return null;
    }
}

AttachedImages.propTypes = {
    activity: PropTypes.object,
};

export default AttachedImages;
