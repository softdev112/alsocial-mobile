export default feedType => {
    if (feedType === "Profile") return "profile posts feed";
    if (feedType === "Explore") return "explore feed";
    if (feedType === "Likes") return "profile likes feed";
    if (feedType === "Hashtag") return "hashtag feed";
    return "home feed";
};
