global.followUsers = global.followUsers ? global.followUsers : {};
global.followings = global.followings ? global.followings : [];
global.confirmingFollowRequests = global.confirmingFollowRequests
    ? global.confirmingFollowRequests
    : [];
global.deletingFollowRequests = global.deletingFollowRequests ? global.deletingFollowRequests : [];
const LOADING = 0;
const SUCCESS = 1;
const FAILED = 2;

let followUsers = global.followUsers;
let followings = global.followings;
let confirmingFollowRequests = global.confirmingFollowRequests;
let deletingFollowRequests = global.deletingFollowRequests;

module.exports = {
    LOADING,
    SUCCESS,
    FAILED,
    followUsers,
    followings,
    confirmingFollowRequests,
    deletingFollowRequests,
};
