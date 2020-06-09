import moment from "moment";

const formatTime = date =>
    moment(date)
        .fromNow()
        .replace("minute", "min")
        .replace("second", "sec");

const formatTimeShort = date => {
    const secondsDiff = Math.ceil(Math.abs(moment.parseZone(date).diff(moment())) / 1000);
    if (secondsDiff < 5) return "just now";
    if (secondsDiff <= 44) return `${secondsDiff}s`;
    if (secondsDiff === 45) return "1m";

    const cutoffYearly = moment().subtract(1, "year");
    if (moment(date).isBefore(cutoffYearly)) return moment(date).format("MMM D, YYYY");

    const cutoff = moment().subtract(4, "days");
    if (moment(date).isBefore(cutoff)) return moment(date).format("MMM D");

    return moment
        .parseZone(date)
        .fromNow(true)
        .replace(/an? /, "1 ")
        .replace(/ seconds?/, "s")
        .replace(/ minutes?/, "m")
        .replace(/ hours?/, "h")
        .replace(/ days?/, "d")
        .replace(/ weeks?/, "w")
        .replace(/ months?/, "m")
        .replace(/ years?/, "y");
};

const formatDate = time => {
    return moment().diff(time + "Z", "seconds") > 0
        ? moment(time + "Z").fromNow()
        : moment().fromNow();
};

export { formatTime, formatTimeShort, formatDate };
