// @flow
import React, { PureComponent } from "react";
import CustomTextInput from "../CustomTextInput";

class FocusTextInput extends PureComponent {
    _textInputRef: ?CustomTextInput = null;

    static defaultProps = {
        editable: true,
    };

    state = {
        isFirst: true,
        editable: true,
    };

    static getDerivedStateFromProps(props, state) {
        const { editable } = props;
        if (state.isFirst && props.editable) {
            return {
                editable: state.isFirst ? !editable : editable,
                isFirst: false,
            };
        } else if (editable !== state.editable) {
            return {
                editable,
                isFirst: false,
            };
        }
        return {
            editable,
            isFirst: false,
        };
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }

        if (this.props.editable) {
            setTimeout(() => {
                this.setState({ editable: true }, () => {
                    if (this.props.autoFocus) {
                        this.setFocus();
                    }
                });
            }, 100);
        }
    }

    setFocus = () => {
        if (this._textInputRef && this.state.editable) {
            this._textInputRef.setFocus();
        }
    };

    render() {
        const { onRef, editable, autoFocus, ...rest } = this.props;
        return (
            <CustomTextInput
                onRef={ref => (this._textInputRef = ref)}
                editable={this.state.editable}
                {...rest}
            />
        );
    }
}

export default FocusTextInput;
