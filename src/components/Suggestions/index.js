import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Suggestions from "./presenter";
import { loadSuggestions } from "modules/timeline/actions";

function mapDispatchToProps(dispatch) {
    return {
        loadSuggestionsRequest: bindActionCreators(loadSuggestions, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(Suggestions);
