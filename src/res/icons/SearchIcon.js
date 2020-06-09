// @flow
import React from "react";
import type { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Svg, { G, Path, Defs, Use } from "react-native-svg";

type Props = {
    tintColor?: ColorValue,
    focused?: boolean,
    height?: number,
    width?: number,
};

const setColor = (focused, tintColor): ColorValue => {
    if (focused) return "#88cfc9";
    return tintColor ? tintColor : "#474E55";
};

const SearchIcon = ({ focused, height, width, tintColor }: Props) => (
    <Svg width={width} height={height} viewBox='0 0 32 32'>
        <Defs>
            <Path
                d='M24.7214469,20.0432402 L30.5625,25.8851 C31.8125,27.1351 31.8125,29.1631 30.5625,30.4131 L30.4145,30.5621 C29.1635,31.8121 27.1345,31.8121 25.8845,30.5621 L20.0435955,24.7211955 C18.0628802,25.8960357 15.7523522,26.571 13.2871,26.571 C5.9611,26.571 0.0001,20.612 0.0001,13.287 C0.0001,5.961 5.9611,1.24344979e-14 13.2871,1.24344979e-14 C20.6121,1.24344979e-14 26.5711,5.961 26.5711,13.287 C26.5711,15.7521463 25.8961937,18.0625816 24.7214469,20.0432402 Z M13.2871,3 C7.6151,3 3.0001,7.615 3.0001,13.287 C3.0001,18.958 7.6151,23.571 13.2871,23.571 C18.9581,23.571 23.5711,18.958 23.5711,13.287 C23.5711,7.615 18.9581,3 13.2871,3 Z'
                id='path-1'
            />
        </Defs>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G id='Home_feed' transform='translate(-98.000000, -1710.000000)'>
                <G id='Group-13' transform='translate(0.000000, 1701.000000)'>
                    <G id='Group-5-Copy' transform='translate(98.000000, 9.000000)'>
                        <G id='Combined-Shape'>
                            <Use fill={setColor(focused, tintColor)} href='#path-1' />
                        </G>
                    </G>
                </G>
            </G>
        </G>
    </Svg>
);

SearchIcon.defaultProps = {
    tintColor: "#474E55",
    focused: false,
    height: 32,
    width: 32,
};

export default SearchIcon;
