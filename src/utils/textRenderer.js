import React from "react";
import { Linking } from "react-native";
import anchorme from "anchorme";
import _truncate from "lodash/truncate";
import twitter from "twitter-text";
import twitterExtractMentions from "twitter-extract-mentions";

const textRenderer = (text, onClickMention, onClickHashtag, TextWrap, TealText) =>
    text
        .split(/\r?\n/g)
        .map((line, i) =>
            line
                .split(" ")
                .map((word, j) => {
                    if (onClickMention && word.startsWith("@")) {
                        const username = twitterExtractMentions(word);
                        if (!username.length) return word;

                        return (
                            <TextWrap key={`item-${i}${j}`}>
                                {!word.startsWith(`@${username[0]}`) &&
                                    word.slice(0, word.indexOf(username[0]) - 1)}
                                <TealText
                                    onPress={() => onClickMention && onClickMention(username[0])}
                                >
                                    @{username[0]}
                                </TealText>
                                {!word.endsWith(username[0]) &&
                                    word.slice(word.indexOf(username[0]) + username[0].length)}
                            </TextWrap>
                        );
                    }
                    if (onClickHashtag && word.includes("#")) {
                        const hashtag = twitter.extractHashtags(word);
                        if (!hashtag.length) return word;

                        return (
                            <TextWrap key={`item-${i}${j}`}>
                                {!word.startsWith(`#${hashtag[0]}`) &&
                                    word.slice(0, word.indexOf(hashtag[0]) - 1)}
                                <TealText
                                    onPress={() => onClickHashtag && onClickHashtag(hashtag[0])}
                                >
                                    #{hashtag[0]}
                                </TealText>
                                {!word.endsWith(hashtag[0]) &&
                                    word.slice(word.indexOf(hashtag[0]) + hashtag[0].length)}
                            </TextWrap>
                        );
                    }
                    if (anchorme.validate.url(word) || anchorme.validate.email(word)) {
                        const link = anchorme(word, { list: true });
                        if (
                            link[0].protocol !== "http://" &&
                            link[0].protocol !== "https://" &&
                            link[0].protocol !== "mailto:"
                        ) {
                            return word;
                        }
                        const url = link[0].protocol + link[0].encoded;
                        const urlText = _truncate(link[0].encoded, { length: 33 });
                        return (
                            <TealText onPress={() => Linking.openURL(url)} key={`item-${i}${j}`}>
                                {urlText}
                            </TealText>
                        );
                    }

                    return word;
                })
                .reduce((acc, elem) => (acc === null ? [elem] : [acc, " ", elem])),
        )
        .reduce((acc, elem) => (acc === null ? [elem] : [acc, "\n", elem]));

export default textRenderer;
