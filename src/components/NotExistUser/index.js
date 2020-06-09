import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import styles, { HeaderWrap, ContentWrap } from "./styles";
import NavigationBar from "../../common/views/NavigationBar";
import R from "res/R";
import { ContainerView } from "common/themed";

class NotExistUser extends PureComponent {
    // Render any loading content that you like here
    render() {
        return (
            <ContainerView>
                <NavigationBar hasBackButton={true} title={"404"} />
                <View style={styles.content}>
                    <HeaderWrap>Hmm... looks like there’s nothing here.</HeaderWrap>
                    <ContentWrap>
                        The link you followed may be broken, or the page may have been removed.
                        Maybe head back and try something else?
                    </ContentWrap>
                </View>
            </ContainerView>
        );
    }
}

export default NotExistUser;
