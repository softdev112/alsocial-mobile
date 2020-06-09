import {
    changeUser,
    setPushNotificationSubscriptionType,
    setEmail,
    setFirstName,
    setAvatarImageUrl,
    setCountry,
    setHomeCity,
    setPhoneNumber,
    setGender,
    setCustomUserAttribute,
    NotificationSubscriptionTypes,
} from "react-native-appboy-sdk";

export function setBrazeOptions(userData) {
    const {
        _id,
        gender,
        email,
        name,
        username,
        profileImage,
        country,
        city,
        phone,
        interests,
    } = userData;
    changeUser(_id);
    setCustomUserAttribute("username", username);
    if (interests && interests.length) setCustomUserAttribute("interests", interests.join(", "));
    if (name) setFirstName(name);
    if (email) setEmail(email);
    if (profileImage) setAvatarImageUrl(decodeURI(profileImage));
    if (country) setCountry(country);
    if (city) setHomeCity(city);
    if (phone) setPhoneNumber(phone);
    if (gender) setGender(gender);
}

export function enableBraze() {
    setPushNotificationSubscriptionType(NotificationSubscriptionTypes.SUBSCRIBED);
}

export function disableBraze() {
    setPushNotificationSubscriptionType(NotificationSubscriptionTypes.UNSUBSCRIBED);
}
