// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ArrowIcon } from "res/icons";
import { Logo } from "../../icons";
import InputBar from "./InputBar";
import {
    Nav,
    Title,
    CenterArea,
    LeftArea,
    RightArea,
    NavButton,
    NavButtonIcon,
    NavButtonClickable,
} from "./styles";
import R from "res/R";
import NavigationService from "service/Navigation";
import { IconWrap } from "../../icons";

class NavigationBar extends PureComponent {
    render() {
        const {
            title,
            hasBackButton,
            borderWidth,
            leftIcon,
            rightIcon,
            leftButtonText,
            rightButtonText,
            handleLeft,
            handleRight,
            disabled,
            isLoading,
            input,
            backgroundColor,
        } = this.props;
        return (
            <Nav borderWidth={borderWidth} backgroundColor={backgroundColor}>
                <LeftArea>
                    {leftIcon !== null || hasBackButton ? (
                        <NavButtonClickable
                            onPress={() => (handleLeft ? handleLeft() : NavigationService.back())}
                            style={{ paddingLeft: 14, paddingRight: 30 }}
                        >
                            <NavButtonIcon
                                onPress={() =>
                                    handleLeft ? handleLeft() : NavigationService.back()
                                }
                                disabled={false}
                                isLoading={false}
                            >
                                {leftIcon ? (
                                    leftIcon
                                ) : (
                                    <IconWrap Icon={ArrowIcon} direction='left' />
                                )}
                            </NavButtonIcon>
                        </NavButtonClickable>
                    ) : leftButtonText ? (
                        <NavButtonClickable onPress={handleLeft}>
                            <NavButton
                                onPress={handleLeft}
                                disabled={false}
                                isLoading={false}
                                label={leftButtonText}
                            />
                        </NavButtonClickable>
                    ) : null}
                </LeftArea>
                <CenterArea>
                    {input ? (
                        <InputBar>{input}</InputBar>
                    ) : title === null ? (
                        <Logo />
                    ) : (
                        title !== "" && (
                            <Title numberOfLines={1} ellipsizeMode='tail'>
                                {title}
                            </Title>
                        )
                    )}
                </CenterArea>
                <RightArea>
                    {rightIcon ? (
                        <NavButtonClickable
                            onPress={disabled || isLoading ? null : handleRight}
                            style={{ paddingLeft: 30, paddingRight: 14 }}
                        >
                            <NavButtonIcon
                                onPress={handleRight}
                                disabled={disabled}
                                isLoading={isLoading}
                            >
                                {rightIcon}
                            </NavButtonIcon>
                        </NavButtonClickable>
                    ) : rightButtonText ? (
                        <NavButtonClickable
                            onPress={disabled || isLoading ? null : handleRight}
                            style={{ paddingRight: 14 }}
                        >
                            <NavButton
                                onPress={handleRight}
                                disabled={disabled}
                                isLoading={isLoading}
                                label={rightButtonText}
                                indicatorColor={R.colors.white}
                            />
                        </NavButtonClickable>
                    ) : null}
                </RightArea>
            </Nav>
        );
    }
}

NavigationBar.propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.string,
    hasBackButton: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    leftButtonText: PropTypes.string,
    rightButtonText: PropTypes.string,
    handleLeft: PropTypes.func,
    handleRight: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    input: PropTypes.object,
    backgroundColor: PropTypes.string,
};

NavigationBar.defaultProps = {
    title: null,
    titleStyle: null,
    hasBackButton: false,
    borderWidth: 1,
    leftIcon: null,
    rightIcon: null,
    leftButtonText: null,
    rightButtonText: null,
    handleLeft: null,
    handleRight: null,
    disabled: false,
    isLoading: false,
    input: null,
};

export default NavigationBar;
