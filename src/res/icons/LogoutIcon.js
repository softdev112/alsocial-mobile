// @flow
import React from "react";
import Svg, { G, Path } from "react-native-svg";

type Props = {};

const LogoutIcon = () => (
    <Svg width={20} height={24} viewBox='0 0 20 24'>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G
                id='Menu_more'
                transform='translate(-16.000000, -288.000000)'
                fill='#88cfc9'
                fillRule='nonzero'
            >
                <G id='019-lock-copy-2' transform='translate(16.000000, 287.000000)'>
                    <G
                        id='019-lock-copy'
                        transform='translate(10.000000, 12.769231) rotate(-180.000000) translate(-10.000000, -12.769231) translate(0.000000, 0.769231)'
                    >
                        <G id='Group-9'>
                            <Path
                                d='M2.30769231,4.76923077 L0,4.76923077 L0,23.2307692 L20,23.2307692 L20,4.76923077 L17.6923077,4.76923077 L2.30769231,4.76923077 Z M18.4615385,6.30769231 L18.4615385,21.6923077 L1.53846154,21.6923077 L1.53846154,6.30769231 L18.4615385,6.30769231 Z'
                                id='Shape'
                            />
                            <Path
                                d='M9,3.55271368e-14 L9,11.7246845 L10.5384615,11.7246845 L10.5384615,3.55271368e-14 C10.5384615,3.55271368e-14 9,3.55271368e-14 9,3.55271368e-14 Z'
                                id='Shape'
                            />
                        </G>
                    </G>
                </G>
            </G>
        </G>
    </Svg>
);

export default LogoutIcon;
