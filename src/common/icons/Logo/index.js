import React, { PureComponent } from "react";
import { LogoIcon } from "res/icons";
import { withTheme } from "styled-components";

class Logo extends PureComponent {
    render() {
        const { theme, mode, ...rest } = this.props;
        return <LogoIcon mode={mode ? mode : theme.type} {...rest} />;
    }
}

export default withTheme(Logo);
