import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const NotificationIcon = ({ children, unreadCount }) => (
    <View>
        {children}
        {unreadCount > 0 ? (
            <View style={styles.container}>
                <Text style={styles.text} numberOfLines={1}>
                    {unreadCount >= 10 ? "9+" : unreadCount}
                </Text>
            </View>
        ) : null}
    </View>
);

export default NotificationIcon;
