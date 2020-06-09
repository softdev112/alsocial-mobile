import React, { PureComponent } from "react";
import DeviceInfo from "react-native-device-info";
import PropTypes from "prop-types";
import { TextWrap } from "./styles";

class AppVersion extends PureComponent {
    render() {
        const { style } = this.props;
        return (
            <TextWrap style={style}>
                {`v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
            </TextWrap>
        );
    }
}

AppVersion.propTypes = {
    style: PropTypes.object,
};

AppVersion.defaultProps = {
    style: null,
};
export default AppVersion;
