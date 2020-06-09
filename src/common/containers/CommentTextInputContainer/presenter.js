import React, { PureComponent } from "react";
import { CommentView, CommentButton } from "./styles";
import PropTypes from "prop-types";

class CommentTextInputContainer extends PureComponent {
    render() {
        const { onLayout, inputContainerStyle, children, onSubmit, canSubmit, label } = this.props;
        return (
            <CommentView style={{ inputContainerStyle }} onLayout={onLayout}>
                {children}
                <CommentButton label={label} onPress={onSubmit} disabled={!canSubmit} />
            </CommentView>
        );
    }
}

CommentTextInputContainer.propTypes = {
    onLayout: PropTypes.func,
    inputContainerStyle: PropTypes.object,
    children: PropTypes.element.isRequired,
    onSubmit: PropTypes.func,
    canSubmit: PropTypes.bool,
    label: PropTypes.string,
};
CommentTextInputContainer.defaultProps = {
    onLayout: ({ nativeEvent }) => {},
    inputContainerStyle: {},
    onSubmit: text => {},
    canSubmit: false,
    label: "Reply",
};

export default CommentTextInputContainer;
