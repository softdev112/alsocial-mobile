import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import _debounce from "lodash/debounce";
import _differenceWith from "lodash/differenceWith";
import _uniqBy from "lodash/uniqBy";
import anchorme from "anchorme";
import { hashOgUrl, generateRandomId } from "utils/helper";
import { groupAdjacent } from "utils/groupAdjacent";
import { AttachmentCardImage, AttachmentCard } from "common/views";
import { IconButton } from "common/buttons";
import { CloseIcon } from "res/icons";

class PostAttachments extends Component {
    _handleOgDebounced: string => mixed;

    initialState = () => ({
        ogScrapping: false,
        order: [],
        ogStateByUrl: {},
        imageUploads: [],
        fileUploads: [],
    });

    constructor(props) {
        super(props);
        this._handleOgDebounced = _debounce(this.handleOG, 300);
        this.state = { ...this.initialState() };
    }

    componentDidMount = () => {
        this.props.onRef(this);
        this.props.attachments.forEach(attachment => {
            let { type, content } = attachment;
            if (type === "og") {
                this.addLinks([content]);
            } else if (type === "images") {
                if (content.includes("stream-cloud-uploads")) {
                    this.addImage({ contentType: "image/jpeg", imageUri: content });
                } else {
                    this.addGif(content.slice(0, content.lastIndexOf("?")));
                }
            }
        });
    };

    resetState = () => {
        this.setState({ ...this.initialState() });
    };

    addImage = async images => {
        if (Array.isArray(images)) {
            images.forEach(async image => {
                await this.setState(prevState => {
                    const id = generateRandomId();
                    const imageUri = image.imageUri;
                    prevState.imageUploads[id] = {
                        id,
                        file: image,
                        previewUri: imageUri,
                    };
                    return {
                        order: [
                            ...prevState.order,
                            {
                                type: "images",
                                id,
                            },
                        ],
                        imageUploads: prevState.imageUploads,
                    };
                });
            });
        } else {
            await this.setState(prevState => {
                const id = generateRandomId();
                const imageUri = images.imageUri;
                prevState.imageUploads[id] = {
                    id,
                    file: images,
                    previewUri: imageUri,
                };

                return {
                    order: [
                        ...prevState.order,
                        {
                            type: "images",
                            id,
                        },
                    ],
                    imageUploads: prevState.imageUploads,
                };
            });
        }
        this.props.onChangeStatus();
    };

    addLinks = async links => {
        await this.setState(prevState => {
            const oldUrls = Object.keys(prevState.ogStateByUrl).filter(
                key => !prevState.ogStateByUrl[key].dismissed,
            );
            const urls = links.filter(item => !!item).map(item => item.url);
            const newUrls = _differenceWith(urls, oldUrls, (url1, url2) => {
                return url1 === url2 || url1.startsWith(url2) || url2.startsWith(url1);
            });

            const newState = {
                order: [
                    ...prevState.order,
                    ...newUrls.map(url => ({
                        type: "og",
                        id: url,
                    })),
                ],
            };
            let newLinks = {};
            links.filter(item => !!item).forEach(item => (newLinks[item.url] = item));
            for (const url of newUrls) {
                const resp = newLinks[url];
                if (typeof resp === "object") {
                    const validOg =
                        resp.images || resp.videos || resp.description || resp.title || resp.url;
                    prevState.ogStateByUrl[url] = {
                        scrapingActive: false,
                        data: resp,
                        dismissed: !validOg,
                        validOg,
                    };
                }
            }
            newState.ogStateByUrl = prevState.ogStateByUrl;
            return newState;
        });
        this.props.onChangeStatus();
    };

    addGif = async url => {
        await this.setState(prevState => {
            const id = generateRandomId();
            const date = new Date();

            const file = {
                lastModified: date.getTime(),
                lastModifiedDate: date,
                name: url.slice(url.lastIndexOf("/") + 1),
                type: "image/gif",
                webkitRelativePath: "",
            };
            prevState.imageUploads[id] = {
                id,
                file,
                previewUri: url,
                url,
            };

            return {
                order: [
                    ...prevState.order,
                    {
                        type: "images",
                        id,
                    },
                ],
                imageUploads: prevState.imageUploads,
            };
        });
        this.props.onChangeStatus();
    };

    ogClient = async url => {
        const ogUrl = url.replace("https://mobile.twitter.com", "https://twitter.com");
        const client = global.streamClient;
        return await client?.og(ogUrl);
    };

    handleOG = async (text: string) => {
        let newUrls;

        const urlInfos = anchorme(text, {
            list: true,
            defaultProtocol: "https://",
            exclude: info => info.protocol !== "https://" && info.protocol !== "http://",
        });
        const urls = _uniqBy(urlInfos.map(info => info.protocol + info.encoded), hashOgUrl);

        const ExistBreakException = {};

        await this.setState(
            prevState => {
                let oldUrls = Object.keys(prevState.ogStateByUrl);
                const removedUrls = oldUrls.filter(key => {
                    try {
                        if (prevState.ogStateByUrl[key].dismissed) {
                            urls.forEach(url => {
                                if (key === url || key.startsWith(url) || url.startsWith(key))
                                    throw ExistBreakException;
                            });
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                    return true;
                });

                removedUrls.forEach(url => {
                    delete prevState.ogStateByUrl[url];
                });

                oldUrls = Object.keys(prevState.ogStateByUrl);
                newUrls = _differenceWith(urls, oldUrls, (url1, url2) => {
                    return url1 === url2 || url1.startsWith(url2) || url2.startsWith(url1);
                });
                const newState = {
                    order: [
                        ...prevState.order,
                        ...newUrls.map(url => ({
                            type: "og",
                            id: url,
                        })),
                    ],
                };

                for (const url of newUrls) {
                    prevState.ogStateByUrl[url] = {
                        scrapingActive: true,
                        dismissed: false,
                    };
                }
                newState.ogStateByUrl = prevState.ogStateByUrl;
                return newState;
            },
            () => {
                newUrls.forEach(async url => {
                    let resp;
                    try {
                        resp = await this.ogClient(url);

                        Object.keys(this.state.ogStateByUrl).forEach(key => {
                            const oldOg = this.state.ogStateByUrl[key];
                            if (
                                !oldOg.dismissed &&
                                oldOg.data &&
                                oldOg.data.scraped_url === resp.url
                            ) {
                                throw ExistBreakException;
                            }
                        });

                        resp.scraped_url = resp.url;
                        resp.url = url;
                        const validOg =
                            resp.images || resp.videos || resp.description || resp.title;

                        this.setState(prevState => {
                            prevState.ogStateByUrl[url] = {
                                scrapingActive: false,
                                data: resp,
                                dismissed: !validOg,
                                validOg,
                            };

                            return {
                                ogStateByUrl: prevState.ogStateByUrl,
                            };
                        });
                        this.props.onChangeStatus();
                    } catch (e) {
                        let error = e?.error?.code;
                        this.setState(prevState => {
                            prevState.ogStateByUrl[url] = {
                                scrapingActive: false,
                                data: error && error === 4 ? { url } : null, // 4 is a Stream error code for a fetch timeout
                                dismissed: false,
                                validOg: error && error === 4,
                            };
                            return { ogStateByUrl: prevState.ogStateByUrl };
                        });
                        this.props.onChangeStatus();
                    }
                });
            },
        );
    };

    _isOgScraping = () => this._orderedOgStates().some(state => state.scrapingActive);

    _orderedOgStates = () =>
        this.state.order
            .filter(({ type }) => type === "og")
            .map(({ id }) => this.state.ogStateByUrl[id])
            .filter(Boolean);

    _prepareAttachmentGroups = attachments => {
        const groups = groupAdjacent(({ type }) => type, attachments);
        return groups.map(({ key, values }) => ({
            type: key,
            contents: values.map(({ content }) => content),
        }));
    };

    _attachments = () => {
        return this.state.order
            .map(({ type, id }) => ({
                type,
                id,
                content: this._mapAttachment(type, id),
            }))
            .filter(({ content }) => Boolean(content));
    };

    _mapAttachment = (type, id) => {
        switch (type) {
            case "images":
                return this.state.imageUploads[id];
            case "files":
                return this.state.fileUploads[id];
            case "og":
                return this._mapAvailableOg(this.state.ogStateByUrl[id]);
            default:
                throw new Error(`Not supported type '${type}'.`);
        }
    };

    _mapAvailableOg = ogState => {
        if (!ogState) return null;
        if (!ogState.validOg) return null;
        if (!ogState.data) return null;
        if (ogState.dismissed) return null;
        return ogState.data;
    };

    _dismissOg = async og => {
        if (og && og.url !== null) {
            await this.setState(prevState => {
                const { ogStateByUrl } = prevState;
                ogStateByUrl[og.url].dismissed = true;
                return {
                    ogStateByUrl,
                    order: prevState.order.filter(({ type, id }) => type !== "og" || id !== og.url),
                };
            });
        }
        this.props.onChangeStatus();
    };

    _removeImage = async id => {
        await this.setState(prevState => {
            const img = prevState.imageUploads[id];
            if (!img) return {};

            delete prevState.imageUploads[id];
            return {
                imageUploads: prevState.imageUploads,
                order: prevState.order.filter(
                    ({ type, id: _id }) => type !== "images" || _id !== id,
                ),
            };
        });
        this.props.onChangeStatus();
    };
    _orderedImages = () =>
        this.state.order
            .filter(({ type }) => type === "images")
            .map(({ id }) => this.state.imageUploads[id]);

    _orderedFiles = () =>
        this.state.order
            .filter(({ type }) => type === "files")
            .map(({ id }) => this.state.fileUploads[id]);

    _availableOg = () => this._orderedOgStates().map(this._mapAvailableOg);

    _order = () => this.state.order;

    _isAvailable = () =>
        !!this._orderedImages().length ||
        !!this._orderedFiles().length ||
        !!this._availableOg().length;

    render() {
        const scraping = this._isOgScraping() ? (
            <ActivityIndicator style={{ padding: 15 }} />
        ) : null;
        const { isSubmitting } = this.props;
        const attachments = this._prepareAttachmentGroups(this._attachments()).map(
            attachmentGroup => {
                const { type, contents } = attachmentGroup;
                if (type === "og") {
                    return contents.map((content, i) => (
                        <View key={`${i}`} style={styles.attachment}>
                            <AttachmentCard {...content} />
                            <View style={styles.removeButtonContainer}>
                                <IconButton
                                    onPress={() => this._dismissOg(content)}
                                    icon={<CloseIcon />}
                                    disabled={isSubmitting}
                                />
                            </View>
                        </View>
                    ));
                } else {
                    return contents.map(image => (
                        <View key={`${image.id}`} style={styles.attachment}>
                            <React.Fragment>
                                <AttachmentCardImage imageUri={image.previewUri} />
                                <View style={styles.imageOverlay}>
                                    <IconButton
                                        onPress={() => this._removeImage(image.id)}
                                        icon={<CloseIcon />}
                                        disabled={isSubmitting}
                                    />
                                </View>
                            </React.Fragment>
                        </View>
                    ));
                }
            },
        );
        return (
            <>
                {scraping}
                {attachments}
            </>
        );
    }
}

PostAttachments.propTypes = {
    attachments: PropTypes.array,
    onChangeStatus: PropTypes.func,
    isSubmitting: PropTypes.bool,
};

PostAttachments.defaultProps = {
    attachments: [],
    onChangeStatus: () => {},
    isSubmitting: false,
};

export default PostAttachments;
