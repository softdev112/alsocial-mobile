// @flow
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const CameraIcon = () => (
    <Svg width={18} height={16} viewBox='0 0 18 16'>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G
                id='Profile_edit'
                transform='translate(-222.000000, -158.000000)'
                fill='#999999'
                fillRule='nonzero'
            >
                <G id='007-camera' transform='translate(213.000000, 148.000000)'>
                    <G id='Group'>
                        <G id='camera' transform='translate(9.000000, 10.000000)'>
                            <Path
                                d='M1.77777778,1.77777778 L4.44444444,1.77777778 L6.22222222,0 L11.5555556,0 L13.3333333,1.77777778 L16,1.77777778 C16.9818396,1.77777778 17.7777778,2.573716 17.7777778,3.55555556 L17.7777778,14.2222222 C17.7777778,15.2040618 16.9818396,16 16,16 L1.77777778,16 C0.795938223,16 0,15.2040618 0,14.2222222 L0,3.55555556 C-1.97372982e-16,2.573716 0.795938223,1.77777778 1.77777778,1.77777778 Z M8.88888889,4.44444444 C6.43429,4.44444444 4.44444444,6.43429 4.44444444,8.88888889 C4.44444444,11.3434878 6.43429,13.3333333 8.88888889,13.3333333 C11.3434878,13.3333333 13.3333333,11.3434878 13.3333333,8.88888889 C13.3333333,6.43429 11.3434878,4.44444444 8.88888889,4.44444444 Z M8.88888889,6.22222222 C10.3616482,6.22222222 11.5555556,7.41612956 11.5555556,8.88888889 C11.5555556,10.3616482 10.3616482,11.5555556 8.88888889,11.5555556 C7.41612956,11.5555556 6.22222222,10.3616482 6.22222222,8.88888889 C6.22222222,7.41612956 7.41612956,6.22222222 8.88888889,6.22222222 Z'
                                id='Shape'
                            />
                        </G>
                    </G>
                </G>
            </G>
        </G>
    </Svg>
);

export default CameraIcon;