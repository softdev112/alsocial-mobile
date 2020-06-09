// @flow
import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    focused: boolean,
};

const CreateIcon = ({ focused, fill }: Props) => (
    <Svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' fill={fill}>
        <Path
            d='M7.093 9.244A13.962 13.962 0 1 0 18 4 13.925 13.925 0 0 0 7.093 9.244z'
            fill='none'
        />
        <Path
            d='M18 4a13.919 13.919 0 0 1 5.37 1.075l1.484-3.711A17.946 17.946 0 0 0 4.02 6.684l3.073 2.56A13.973 13.973 0 0 1 18 4z'
            fill='#ffe397'
        />
        <Path
            d='M24.855 1.364l-1.485 3.71a13.966 13.966 0 0 1 5.12 22.167l3.07 2.559a17.957 17.957 0 0 0-6.705-28.436z'
            fill='#88cfc9'
        />
        <Path
            d='M4 18a13.925 13.925 0 0 1 3.093-8.756L4.02 6.684a17.953 17.953 0 0 0 6.341 27.592l1.787-3.574A14.007 14.007 0 0 1 4 18z'
            fill='#ff9a69'
        />
        <Path
            d='M18 32a13.894 13.894 0 0 1-5.851-1.298l-1.787 3.573A17.877 17.877 0 0 0 31.56 29.8l-3.07-2.559A13.956 13.956 0 0 1 18 32z'
            fill='#ce728e'
        />
    </Svg>
);

export default CreateIcon;
