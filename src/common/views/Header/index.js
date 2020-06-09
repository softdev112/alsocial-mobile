import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles, { ContentView } from "./styles";
import { BoldText } from "../../themed";

class Header extends PureComponent {
    render() {
        const { component, title } = this.props;
        return (
            <ContentView>
                {component ? (
                    component
                ) : title ? (
                    <BoldText style={styles.title}>{title}</BoldText>
                ) : null}
            </ContentView>
        );
    }
}

Header.propTypes = {
    component: PropTypes.node,
    title: PropTypes.string,
};

export default Header;
