import Mixpanel from "react-native-mixpanel";
import R from "res/R";

function init() {
    return Mixpanel.sharedInstanceWithToken(R.configs.MIXPANEL_API_TOKEN).catch(error =>
        console.log(error.message),
    );
}

function identify(user) {
    Mixpanel.identify(user._id);
    Mixpanel.set({
        $email: user.email,
        $first_name: user.name,
        $last_name: "",
        $braze_external_id: user._id,
        username: user.username,
        gender: user.gender,
    });
}

function trackEvent(event, properties = null) {
    if (properties === null) {
        Mixpanel.track(event);
    } else {
        Mixpanel.trackWithProperties(
            event,
            typeof properties === "object" ? properties : { target_id: properties },
        );
    }
}

function checkMediaTypes(attachments) {
    const mediaTypes = [];
    const mediaProviders = [];

    if (attachments.images && attachments.images.length) mediaTypes.push("images");
    if (attachments.og && attachments.og.length) {
        attachments.og.forEach(og => {
            og.videos ? mediaTypes.push("videos") : mediaTypes.push("links");

            ["youtube", "twitter", "facebook", "instagram"].forEach(provider => {
                og.url.includes(provider) && mediaProviders.push(provider);
            });

            !og.url.includes("youtube") &&
                !og.url.includes("twitter") &&
                !og.url.includes("facebook") &&
                !og.url.includes("instagram") &&
                mediaProviders.push("other");
        });
    }

    if (!mediaTypes.length) mediaTypes.push("text only");
    if (!mediaProviders.length) mediaProviders.push("original/ours");

    return {
        mediaTypes: [...new Set(mediaTypes)].sort().join(" "),
        mediaProviders: [...new Set(mediaProviders)].sort().join(" "),
    };
}

export default {
    init,
    trackEvent,
    identify,
    checkMediaTypes,
};
