import { StyleSheet } from "react-native";
import R from "res/R";
import { CustomImage } from "common/images";
import styled from "styled-components";

export const ImageWrap = styled(CustomImage)`
    width: ${R.dimensions.image.notification.normal};
    height: ${R.dimensions.image.notification.normal};
    border-radius: 3px;
    background-color: ${({ theme }) => theme.color.lightGrey};
    margin-right: ${R.dimensions.element.space.normal};
    overflow: hidden;
`;
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: R.dimensions.element.space.normal,
    },
});
