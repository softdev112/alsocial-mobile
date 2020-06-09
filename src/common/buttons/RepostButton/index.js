import React, { PureComponent } from "react";
import ReactionButton from "../ReactionButton";
import { RepostIcon } from "res/icons";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

class RepostButton extends PureComponent {
    render() {
        const { style, isReposted, onPress, isLoading, theme } = this.props;
        return (
            <>
                <ReactionButton
                    isActive={isReposted}
                    onPress={onPress}
                    activeIcon={<RepostIcon active={true} style={{ marginTop: 5 }} />}
                    inactiveIcon={
                        <RepostIcon
                            active={false}
                            style={{ marginTop: 5 }}
                            fill={theme.color.grey}
                        />
                    }
                    style={style}
                    isLoading={isLoading}
                />
            </>
        );
    }
}
RepostButton.propTypes = {
    isReposted: PropTypes.bool,
    onPress: PropTypes.func,
};

RepostButton.defaultProps = {
    isReposted: false,
};

export default withTheme(RepostButton);
