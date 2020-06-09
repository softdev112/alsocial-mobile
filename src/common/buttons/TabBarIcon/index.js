import React from "react";
import { View } from "react-native";
import { SearchIcon2, HomeIcon, ProfileIcon2, NotificationIcon, CreateIcon } from "res/icons";
import styles from "./styles";
import { IconWrap } from "../../icons";

type Props = { name: string, focused: boolean };

const getSvgIcon = (name: string, focused: boolean) => {
    switch (name) {
        case "home":
            return <IconWrap Icon={HomeIcon} focused={focused} />;
        case "search1":
            return <IconWrap Icon={SearchIcon2} focused={focused} />;
        case "user":
            return <IconWrap Icon={ProfileIcon2} focused={focused} />;
        case "bells":
            return <IconWrap Icon={NotificationIcon} focused={focused} />;
        case "create":
            return <IconWrap Icon={CreateIcon} focused={focused} />;
        default:
            return null;
    }
};

const TabBarIcon = ({ name, focused }: Props) => (
    <View style={styles.container}>{getSvgIcon(name, focused)}</View>
);

export default TabBarIcon;
