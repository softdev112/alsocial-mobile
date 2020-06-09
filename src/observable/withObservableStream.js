import React from "react";

const withObservableStream = initialState => Component => {
    return class extends React.Component {
        _subscriptions: Array = [];

        constructor(props) {
            super(props);
            this.state = {
                ...initialState,
            };
        }

        componentWillUnmount(): void {
            this._clearSubscriptions();
        }

        _clearSubscriptions = () => {
            this._subscriptions.forEach((subscription, index) => subscription.unsubscribe());
            this._subscriptions = [];
        };

        render() {
            return (
                <Component
                    {...this.props}
                    {...this.state}
                    subscriptions={this._subscriptions}
                    clearSubscriptions={this._clearSubscriptions}
                />
            );
        }
    };
};

export default withObservableStream;
