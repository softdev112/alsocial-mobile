// @flow
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const EditIcon = () => (
    <Svg width={24} height={24} viewBox='0 0 18 18'>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G transform='translate(-341.000000, -40.000000)' fill='#ffffff' fillRule='nonzero'>
                <G id='pencil' transform='translate(341.000000, 40.000000)'>
                    <Path d='M17.71,4.0425 C18.1,3.6525 18.1,3.0025 17.71,2.6325 L15.37,0.2925 C15,-0.0975 14.35,-0.0975 13.96,0.2925 L12.12,2.1225 L15.87,5.8725 L17.71,4.0425 Z M0,14.2525 L0,18.0025 L3.75,18.0025 L14.81,6.9325 L11.06,3.1825 L0,14.2525 Z' />
                </G>
            </G>
        </G>
    </Svg>
);

export default EditIcon;
