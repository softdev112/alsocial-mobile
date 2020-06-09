// @flow
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const SentIcon = ({ disabled }: Object) => (
    <Svg width={25} height={24} viewBox='0 0 25 24'>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G
                id='Comments'
                transform='translate(-336.000000, -373.000000)'
                fill={disabled ? "rgba(71,78,85,0.25)" : "#88cfc9"}
            >
                <G id='right-arrow-(1)' transform='translate(336.000000, 373.000000)'>
                    <Path
                        d='M24.4282294,10.771882 L1.26564588,0.0814587973 C0.896826281,-0.0860244989 0.456737194,0.013752784 0.200167038,0.330902004 C-0.0581848552,0.648051225 -0.0670935412,1.09883073 0.178786192,1.42488864 L7.79571269,11.5807906 L0.178786192,21.7366927 C-0.0670935412,22.0627506 -0.0581848552,22.5153118 0.198385301,22.8306793 C0.371213808,23.0462695 0.629565702,23.1620824 0.891481069,23.1620824 C1.01798441,23.1620824 1.14448775,23.1353563 1.26386414,23.0801225 L24.4264477,12.3896993 C24.7435969,12.2435969 24.9449332,11.9282294 24.9449332,11.5807906 C24.9449332,11.2333519 24.7435969,10.9179844 24.4282294,10.771882 Z'
                        id='Path'
                    />
                </G>
            </G>
        </G>
    </Svg>
);

export default SentIcon;
