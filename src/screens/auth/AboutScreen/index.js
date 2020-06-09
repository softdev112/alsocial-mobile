// @flow
import React, { Component } from "react";
import { TermsOfServiceWrapper } from "common/views";
import NavigationService from "service/Navigation";
import { Main, Auth } from "utils/navigation";
import R from "res/R";

import styles, {
    Root,
    H1,
    Message,
    MessageBox,
    MessageHeading,
    Section1,
    ShapeDiag,
    ShapeSquare,
    Row,
    Section2,
    Section2PictureContainer,
    Section2PictureBack,
    Section2Picture,
    Section3,
    PictureRow,
    PictureSide,
    ShapeShift,
    PictureWrapper,
    PictureBox,
    Picture,
    H2,
    PictureInfo,
    PictureButton,
    ShapePicture,
    MessageRow,
    Section4,
    PictureCenter,
    MessageButton,
    ShapeOutline,
    ShapeBold,
} from "./styles";

class AboutScreen extends Component {
    render() {
        return (
            <TermsOfServiceWrapper
                header={R.strings.about.title}
                footer={R.strings.about.footer}
                showHeader={false}
                containerStyle={styles.content}
            >
                <Root>
                    <Section1>
                        <H1>
                            A new place to connect your world, express who you are, and get
                            creative.
                        </H1>
                        <MessageBox style={{ marginTop: 180 }}>
                            <MessageHeading>Join the excitement.</MessageHeading>
                            <Message style={{ fontWeight: "900" }}>
                                Stay in touch with friends both old and new.
                            </Message>
                        </MessageBox>
                        <ShapeDiag />
                        <ShapeSquare />
                    </Section1>
                    <Section2>
                        <Row style={{ width: "100%", marginTop: 120 }}>
                            <Section2PictureContainer>
                                <Section2PictureBack />
                                <Section2Picture source={R.images.daddy} resizeMode={"cover"} />
                            </Section2PictureContainer>
                            <MessageBox
                                style={{ marginTop: 40, paddingLeft: 100, paddingRight: 40 }}
                            >
                                <MessageHeading>Share what matters most to you.</MessageHeading>
                                <Message>
                                    Show off your favorite hobby or explore a new one. Let your
                                    friends see what you’re up to.
                                </Message>
                            </MessageBox>
                        </Row>
                    </Section2>
                    <Section3>
                        <Row style={{ marginTop: 60 }}>
                            <PictureRow>
                                <PictureSide source={R.images.camera} resizeMode={"cover"} />
                                <ShapeShift />
                            </PictureRow>
                            <MessageBox style={{ marginTop: 40 }}>
                                <MessageHeading>Be Creative.</MessageHeading>
                                <Message>
                                    Express yourself with photos, videos, text, GIFs, social media,
                                    and more.
                                </Message>
                            </MessageBox>
                        </Row>
                    </Section3>
                    <PictureWrapper>
                        <PictureBox>
                            <Picture source={R.images.color} resizeMode={"cover"}>
                                <PictureInfo>
                                    <H2>Come explore the latest of what others are sharing.</H2>
                                    <PictureButton
                                        label='Explore All'
                                        type='outline'
                                        size='large'
                                        textColor={R.colors.white}
                                        onPress={() => {
                                            NavigationService.navigate(Main.Search);
                                        }}
                                    />
                                </PictureInfo>
                            </Picture>
                            <ShapePicture />
                        </PictureBox>
                        <MessageRow>
                            <MessageBox style={{ marginTop: 50 }}>
                                <MessageHeading>Freedom to share.</MessageHeading>
                                <Message>Share all the things that are important to you.</Message>
                            </MessageBox>
                            <MessageBox style={{ marginTop: 100 }}>
                                <MessageHeading>Connect with what you love.</MessageHeading>
                                <Message>
                                    See all of the content from people or groups you follow.
                                </Message>
                            </MessageBox>
                        </MessageRow>
                    </PictureWrapper>
                    <Section4>
                        <Row>
                            <PictureCenter source={R.images.jump} resizeMode={"cover"} />
                            <MessageBox style={{ marginTop: 110 }}>
                                <MessageHeading style={{ textAlign: "center" }}>
                                    Ready to have a go?
                                </MessageHeading>
                                <Message style={{ textAlign: "center" }}>
                                    Come join others in exploring and sharing the stories, topics
                                    and friends you care about.
                                </Message>
                            </MessageBox>
                            <ShapeOutline />
                            <ShapeBold />
                        </Row>
                    </Section4>
                </Root>
            </TermsOfServiceWrapper>
        );
    }
}

export default AboutScreen;
