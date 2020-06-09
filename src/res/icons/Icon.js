import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Svg, { Path } from "react-native-svg";

const Root = styled(Svg)`
    cursor: pointer;
    display: inline-block;
    fill: ${({ theme }) => theme.color.transparentGrey};
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    position: relative;
    transition: all 0.2s ease-in-out;
    user-select: none;
`;

class Icon extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        height: PropTypes.number.isRequired,
        style: PropTypes.object,
        viewBox: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    };

    static defaultProps = {
        height: 24,
        width: 24,
    };

    render() {
        const { children, viewBox, style, ...other } = this.props;

        return (
            <Root {...other} viewBox={viewBox} style={style}>
                {children}
            </Root>
        );
    }
}

export default Icon;
