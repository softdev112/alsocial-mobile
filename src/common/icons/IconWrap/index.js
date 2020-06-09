import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

class IconWrap extends PureComponent {
    render() {
        const { Icon, theme, ...rest } = this.props;
        return <Icon fill={theme.color.grey} {...rest} />;
    }
}

IconWrap.propTypes = {
    Icon: PropTypes.elementType,
};

export default withTheme(IconWrap);
