import { connect } from "react-redux";
import ModalGifs from "./presenter";
import { fetchGifs } from "modules/gifs/actions";
import { bindActionCreators } from "redux";

// function mapStateToProps(state) {
//     const { userState } = state;
//     return {
//         user: userState,
//     };
// }

function mapDispatchToProps(dispatch) {
    return {
        fetchGifs: bindActionCreators(fetchGifs, dispatch),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(ModalGifs);
