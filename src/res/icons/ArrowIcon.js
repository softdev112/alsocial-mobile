// @flow
import React from "react";
import Svg, { G, Polygon, Path } from "react-native-svg";

type Props = {
    direction?: string,
};

const getArrow = (direction: string, fill: string) => {
    switch (direction) {
        case "left":
            return <ArrowLeft fill={fill} />;
        case "right":
            return <ArrowRight fill={fill} />;
        case "down":
            return <ArrowDown fill={fill} />;
        case "up":
            return <ArrowUp fill={fill} />;
        default:
            return null;
    }
};

const ArrowRight = ({ fill }: Props) => (
    <Svg width={10} height={15} viewBox='0 0 10 15' fill={fill}>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G id='Menu_more' transform='translate(-349.000000, -100.000000)' fill='#C9C9C9'>
                <G id='keyboard-right-arrow-button' transform='translate(349.000000, 100.000000)'>
                    <Polygon
                        id='Path'
                        points='1.89189189 0 0 1.75 6.21621622 7.5 0 13.25 1.89189189 15 10 7.5'
                    />
                </G>
            </G>
        </G>
    </Svg>
);

const ArrowLeft = ({ fill }: Props) => (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill={fill}>
        <Path d='M14.5885,20.0018,7.2922,12.7055a.9977.9977,0,0,1,0-1.4109l7.2932-7.2932a1.0018,1.0018,0,0,1,1.4168,0h0a.9979.9979,0,0,1,0,1.4113L9.4149,12l6.5842,6.5842a1.0024,1.0024,0,0,1,0,1.4176h0A.9974.9974,0,0,1,14.5885,20.0018Z' />
    </Svg>
);

const ArrowDown = ({ fill }: Props) => (
    <Svg width={10} height={7} viewBox='0 0 10 7' fill={fill}>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G id='Profile_edit' transform='translate(-157.000000, -408.000000)' fill='#C9C9C9'>
                <G
                    id='keyboard-right-arrow-button-copy-4'
                    transform='translate(162.000000, 411.500000) rotate(-270.000000) translate(-162.000000, -411.500000) translate(159.000000, 407.000000)'
                >
                    <Polygon
                        id='Path'
                        points='1.13513514 0 0 1.05 3.72972973 4.5 0 7.95 1.13513514 9 6 4.5'
                    />
                </G>
            </G>
        </G>
    </Svg>
);

const ArrowUp = ({ fill }: Props) => (
    <Svg width={10} height={7} viewBox='0 0 11 8' fill={fill}>
        <G id='new-design' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
            <G id='Menu_more' transform='translate(-346.000000, -230.000000)' fill='#C9C9C9'>
                <G
                    id='keyboard-right-arrow-button-copy-2'
                    transform='translate(351.500000, 234.000000) rotate(-90.000000) translate(-351.500000, -234.000000) translate(348.000000, 229.000000)'
                >
                    <Polygon
                        id='Path'
                        points='1.32432432 0 0 1.16666667 4.35135135 5 0 8.83333333 1.32432432 10 7 5'
                    />
                </G>
            </G>
        </G>
    </Svg>
);

const Arrow = ({ direction = "", fill }: Props) => getArrow(direction, fill);

export default Arrow;
