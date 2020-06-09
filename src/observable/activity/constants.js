global.likingActivities = global.likingActivities ? global.likingActivities : [];
global.repostingActivities = global.repostingActivities ? global.repostingActivities : [];
global.deletingActivities = global.deletingActivities ? global.deletingActivities : [];
global.deletingComments = global.deletingComments ? global.deletingComments : [];
global.likingComments = global.likingComments ? global.likingComments : [];
global.reportingActivities = global.reportingActivities ? global.reportingActivities : [];
global.reportingComments = global.reportingComments ? global.reportingComments : [];
global.deletingRepostActivities = global.deletingRepostActivities
    ? global.deletingRepostActivities
    : [];
global.isLoadingSuggestions =
    global.isLoadingSuggestions === undefined ? false : global.isLoadingSuggestions;
global.updatingActivity = global.updatingActivity ? global.updatingActivity : [];
global.updatingComments = global.updatingComments ? global.updatingComments : [];
global.updatingRepost = global.updatingRepost ? global.updatingRepost : [];

let likingActivities = global.likingActivities;
let repostingActivities = global.repostingActivities;
let deletingActivities = global.deletingActivities;
let deletingComments = global.deletingComments;
let likingComments = global.likingComments;
let reportingActivities = global.reportingActivities;
let reportingComments = global.reportingComments;
let deletingRepostActivities = global.deletingRepostActivities;
let isLoadingSuggestions = global.isLoadingSuggestions;
let updatingActivity = global.updatingActivity;
let updatingComments = global.updatingComments;
let updatingRepost = global.updatingRepost;

const CommentStatus = {
    DELETE: 0,
    ADD: 1,
    LIKE: 2,
};

const LOADING = 0;
const SUCCESS = 1;
const FAILED = 2;

const updateObjects = (objects, id, processing) => {
    const index = objects.indexOf(id);
    if (!processing && index !== -1) {
        objects.splice(index, 1);
    } else if (processing && index === -1) {
        objects.push(id);
    }
};

module.exports = {
    likingActivities,
    repostingActivities,
    deletingActivities,
    deletingComments,
    likingComments,
    reportingActivities,
    reportingComments,
    deletingRepostActivities,
    isLoadingSuggestions,
    updatingActivity,
    updatingComments,
    updatingRepost,
    CommentStatus,
    LOADING,
    SUCCESS,
    FAILED,
    updateObjects,
};
