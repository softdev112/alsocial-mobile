// @flow
import React from "react";
import Svg, { G, Path, Defs, Use } from "react-native-svg";
import R from "res/R";

type Props = {
    focused?: boolean,
};

const MenuIcon = ({ focused }: Props) => (
    <Svg width={34} height={21} viewBox='0 0 18 24'>
        <Defs>
            <Path
                d='M31.9941,3 L1.5001,3 C0.6711,3 0.0001,2.329 0.0001,1.5 C0.0001,0.671 0.6711,0 1.5001,0 L31.9941,0 C32.8221,0 33.4941,0.671 33.4941,1.5 C33.4941,2.329 32.8221,3 31.9941,3'
                id='path-1'
            />
            <Path
                d='M31.9941,11.6255 L1.5001,11.6255 C0.6711,11.6255 0.0001,10.9535 0.0001,10.1255 C0.0001,9.2975 0.6711,8.6255 1.5001,8.6255 L31.9941,8.6255 C32.8221,8.6255 33.4941,9.2975 33.4941,10.1255 C33.4941,10.9535 32.8221,11.6255 31.9941,11.6255'
                id='path-2'
            />
            <Path
                d='M31.9941,20.2514 L1.5001,20.2514 C0.6711,20.2514 0.0001,19.5794 0.0001,18.7514 C0.0001,17.9234 0.6711,17.2514 1.5001,17.2514 L31.9941,17.2514 C32.8221,17.2514 33.4941,17.9234 33.4941,18.7514 C33.4941,19.5794 32.8221,20.2514 31.9941,20.2514'
                id='path-3'
            />
        </Defs>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G id='Home_feed' transform='translate(-316.000000, -1716.000000)'>
                <G id='Group-13' transform='translate(0.000000, 1701.000000)'>
                    <G id='Group-10-Copy' transform='translate(316.000000, 15.000000)'>
                        <G id='Fill-1'>
                            <Use fill={R.colors.teal} href='#path-1' />
                        </G>
                        <G id='Fill-4'>
                            <Use fill={R.colors.teal} href='#path-2' />
                        </G>
                        <G id='Fill-7'>
                            <Use fill={R.colors.teal} href='#path-3' />
                        </G>
                    </G>
                </G>
            </G>
        </G>
    </Svg>
);

MenuIcon.defaultProps = {
    focused: false,
};

export default MenuIcon;
