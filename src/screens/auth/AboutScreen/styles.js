import R from "res/R";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import styled from "styled-components";
import { Button } from "common/buttons";

export const Root = styled.View`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;

export const Row = styled.View`
    align-items: center;
    display: flex;
    position: relative;
`;

export const H1 = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.xLarge};
    color: ${({ theme }) => theme.color.dark};
    font-weight: 100;
    letter-spacing: -2px;
    line-height: 56;
    margin: 110px 0 0;
    padding: 0 20px;
    position: relative;
    z-index: 10;
`;

export const MessageRow = styled.View`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
`;

export const MessageBox = styled.View`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    padding: 0 30px;
`;

export const MessageHeading = styled.Text`
    font-family: ${R.fonts.Normal};
    color: ${({ theme }) => theme.color.dark};
    font-size: 24px;
    font-weight: 900;
    line-height: 30;
`;

export const Message = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: 24px;
    line-height: 30;
    margin: 25px 0 0;
    color: ${({ theme }) => theme.color.dark};
`;

export const ShapeDiag = styled.View`
    background: #e6ede8;
    height: 160px;
    position: absolute;
    left: 20px;
    top: 160px;
    transform: rotate(-5deg);
    width: 230px;
    z-index: 2;
`;

export const ShapeSquare = styled.View`
    background: #fba75f;
    height: 160px;
    position: absolute;
    right: -10px;
    top: 280px;
    width: 160px;
    z-index: 2;
`;

export const Section1 = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: 100%;
`;

export const Section2 = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Section2PictureContainer = styled.View`
    height: 500px;
    position: relative;
    width: 100%;
    z-index: 4;
    padding-left: 60px;
`;

export const Section2PictureBack = styled.View`
    background: #f6e3df;
    width: 100%;
    height: 100%;
`;

export const Section2Picture = styled.Image`
    height: 100%;
    position: absolute;
    top: -60px;
    width: 100%;
    z-index: 3;
    overflow: hidden;
`;

export const Section3 = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const PictureRow = styled.View`
    width: 100%;
`;

export const PictureSide = styled.Image`
    height: 300px;
    position: relative;
    width: 100%;
    z-index: 3;
`;

export const ShapeShift = styled.View`
    border: 2px solid ${({ theme }) => theme.color.lightGrey};
    height: 250px;
    position: absolute;
    top: 230px;
    transform: rotate(40deg);
    width: 250px;
    z-index: 2;
`;

export const PictureWrapper = styled.View`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 140px auto 0;
    max-width: 2000px;
    width: 100%;
    z-index: 9;
`;

export const Picture = styled.ImageBackground`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 4;
`;

export const H2 = styled.Text`
    font-family: ${R.fonts.Normal};
    color: white;
    font-size: 30px;
    font-weight: 100;
    line-height: 48px;
    letter-spacing: -1px;
    text-align: center;
`;

export const PictureInfo = styled.View`
    flex-direction: column;
    position: relative;
    display: flex;
    margin: 150px auto;
    padding: 0 20px;
    text-align: center;
    width: 100%;
`;

export const PictureButton = styled(Button)`
    align-self: center;
    border-color: rgba(255, 255, 255, 0.6);
    color: white;
    margin: 60px auto 0px;
`;

export const PictureBox = styled.View`
    position: relative;
`;

export const ShapePicture = styled.View`
    background: #ffdd8b;
    height: 400px;
    position: absolute;
    right: -270px;
    transform: rotate(30deg);
    width: 400px;
    z-index: 3;
    bottom: -400px;
`;

export const Section4 = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
    margin-top: 60px;
`;

export const PictureCenter = styled.Image`
    height: 300px;
    position: relative;
    width: 100%;
    z-index: 3;
`;

export const MessageButton = styled(Button)`
    margin: 60px auto 0;
`;

export const ShapeOutline = styled.View`
    border: 2px solid ${({ theme }) => theme.color.lightGrey};
    height: 300px;
    position: absolute;
    top: 60px;
    transform: rotate(-10deg);
    width: 300px;
    z-index: 2;
`;

export const ShapeBold = styled.View`
    background: #d78098;
    height: 260px;
    position: absolute;
    right: -190px;
    top: 560px;
    transform: rotate(10deg);
    width: 260px;
    z-index: 2;
`;

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    content: {
        marginHorizontal: 0,
    },
});
