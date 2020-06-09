// @flow
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const SentIcon = () => (
    <Svg width={10} height={14} viewBox='0 0 10 14'>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G
                id='Profile_edit'
                transform='translate(-16.000000, -464.000000)'
                fill='#474E55'
                fillRule='nonzero'
            >
                <G id='map-marker' transform='translate(16.000000, 464.000000)'>
                    <Path
                        d='M4.9,6.65 C3.93350169,6.65 3.15,5.86649831 3.15,4.9 C3.15,4.43587114 3.33437447,3.9907518 3.66256313,3.66256313 C3.9907518,3.33437447 4.43587114,3.15 4.9,3.15 C5.86649831,3.15 6.65,3.93350169 6.65,4.9 C6.65,5.36412886 6.46562553,5.8092482 6.13743687,6.13743687 C5.8092482,6.46562553 5.36412886,6.65 4.9,6.65 Z M4.9,-2.66453526e-16 C2.19380473,-1.19904087e-15 -2.66453526e-16,2.19380473 -8.8817842e-16,4.9 C-2.66453526e-16,8.575 4.9,14 4.9,14 C4.9,14 9.8,8.575 9.8,4.9 C9.8,2.19380473 7.60619527,4.4408921e-17 4.9,-2.66453526e-16 Z'
                        id='Shape'
                    />
                </G>
            </G>
        </G>
    </Svg>
);

export default SentIcon;
