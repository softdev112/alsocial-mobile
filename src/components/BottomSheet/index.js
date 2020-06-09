import React, { Component } from "react";
import { Platform, TouchableOpacity as TouchableOpacityReactNative } from "react-native";
import { TouchableOpacity as TouchableOpacityGestureHandler } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import {
    Sheet,
    SheetContainer,
    SheetOption,
    SheetOptionText,
    Overlay,
    SheetHandle,
} from "./styles";

const TouchableOpacity =
    Platform.OS === "android" ? TouchableOpacityGestureHandler : TouchableOpacityReactNative;

export const BottomSheetContext = React.createContext();

export class BottomSheetProvider extends Component {
    state = {
        sheetVisible: false,
        options: [],
        snapPoints: [1, -100],
        callback: () => {},
        cancelButtonIndex: 1,
    };

    _showBottomSheet = ({ options, cancelButtonIndex }, callback) => {
        this.setState({
            options,
            callback,
            snapPoints: [options.length * 50 + (Platform.OS === "android" ? 50 : 0), -100],
            sheetVisible: true,
            cancelButtonIndex,
        });
    };

    _hideBottomSheet = () => {
        this.setState({ sheetVisible: false });
    };

    render() {
        const { children } = this.props;
        const { sheetVisible, options, snapPoints, callback, cancelButtonIndex } = this.state;

        return (
            <BottomSheetContext.Provider
                value={{
                    showBottomSheet: this._showBottomSheet,
                    hideBottomSheet: this._hideBottomSheet,
                    options: options,
                    snapPoints: snapPoints,
                    sheetVisible: sheetVisible,
                    callback: callback,
                    cancelButtonIndex: cancelButtonIndex,
                }}
            >
                {children}
                {sheetVisible ? (
                    <Overlay onPress={this._hideBottomSheet} activeOpacity={1} />
                ) : null}
                <BottomSheetViewContainer />
            </BottomSheetContext.Provider>
        );
    }
}

class BottomSheetView extends Component {
    _renderContent = options => (
        <Sheet>
            <SheetHandle />
            <SheetContainer>
                {options &&
                    options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (index === this.props.cancelButtonIndex) {
                                    this.props.hideBottomSheet();
                                } else {
                                    this.props.hideBottomSheet();
                                    this.props.callback && this.props.callback(index);
                                }
                            }}
                        >
                            <SheetOption>
                                <SheetOptionText>{option}</SheetOptionText>
                            </SheetOption>
                        </TouchableOpacity>
                    ))}
            </SheetContainer>
        </Sheet>
    );

    componentDidUpdate(prevProps) {
        const { sheetVisible, snapPoints } = this.props;
        const { sheetVisible: sheetVisiblePreviously } = prevProps;

        if (!sheetVisiblePreviously && sheetVisible) {
            this.bottomSheetRef.snapTo(0);
        } else if (sheetVisiblePreviously && !sheetVisible) {
            this.bottomSheetRef.snapTo(snapPoints.length - 1);
        }
    }

    render() {
        const { options, hideBottomSheet, snapPoints } = this.props;

        return (
            <BottomSheet
                ref={btmshtRef => {
                    this.bottomSheetRef = btmshtRef;
                }}
                initialSnap={snapPoints.length - 1}
                snapPoints={snapPoints}
                renderContent={() => this._renderContent(options)}
                onCloseEnd={() => {
                    hideBottomSheet();
                }}
                enabledInnerScrolling={Platform.OS === "android" ? true : false}
            />
        );
    }
}

export const withBottomSheet = InnerComponent => props => (
    <BottomSheetContext.Consumer>
        {contextProps => <InnerComponent {...props} {...contextProps} />}
    </BottomSheetContext.Consumer>
);

export const BottomSheetViewContainer = withBottomSheet(BottomSheetView);
