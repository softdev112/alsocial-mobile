import React, { PureComponent } from "react";
import ReactionButton from "../ReactionButton";
import { CommentIcon } from "res/icons";
import { withTheme } from "styled-components";

class CommentButton extends PureComponent {
    render() {
        const { theme } = this.props;
        return (
            <ReactionButton
                inactiveIcon={<CommentIcon style={{ marginTop: 5 }} fill={theme.color.grey} />}
                {...this.props}
            />
        );
    }
}

export default withTheme(CommentButton);
