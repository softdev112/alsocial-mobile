import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";
import FadeInOut from "../FadeInOut";

type Props = {
    visible: boolean,
};

class FormContainer extends PureComponent<Props> {
    render() {
        return (
            <FadeInOut {...this.props} style={styles.formContainer}>
                <View>{this.props.children}</View>
            </FadeInOut>
        );
    }
}

FormContainer.defaultProps = {
    visible: true,
};

export default FormContainer;
