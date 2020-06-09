import React, { PureComponent } from "react";
import ReactionButton from "../ReactionButton";
import { ReshareIcon } from "res/icons";
import { withTheme } from "styled-components";

class ShareButton extends PureComponent {
    render() {
        const { theme } = this.props;
        return (
            <ReactionButton
                inactiveIcon={<ReshareIcon style={{ marginTop: 7 }} fill={theme.color.grey} />}
                {...this.props}
            />
        );
    }
}

export default withTheme(ShareButton);
