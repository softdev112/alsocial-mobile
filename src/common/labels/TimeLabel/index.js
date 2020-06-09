import React, { PureComponent } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { interval } from "rxjs";
import { formatTimeShort, formatDate } from "utils/time";
import R from "res/R";
import { DescriptionText } from "../../themed";

class TimeLabel extends PureComponent {
    state = {
        current: "",
    };
    _subscription: null;
    _timer = interval(10000);
    constructor(props) {
        super(props);
        this.state = {
            current: this._calcTime(),
        };
    }
    componentDidMount(): void {
        const { time } = this.props;
        if (!time) {
            return;
        }
        this._subscription = this._timer.subscribe(value => {
            const current = this._calcTime();
            this.setState({ current }, () => {
                this.forceUpdate();
            });
        });
    }

    _calcTime = () => {
        const { type, time } = this.props;
        let calcTime = "";
        if (type === R.strings.timeType.SHORT) {
            calcTime = formatTimeShort(time);
        } else {
            calcTime = formatDate(time);
        }
        return calcTime;
    };

    componentWillUnmount(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        if (this._timer) {
            this._timer = null;
        }
    }

    render() {
        const { style, ...rest } = this.props;
        const { current } = this.state;
        return (
            <DescriptionText style={style} {...rest}>
                {current}
            </DescriptionText>
        );
    }
}

TimeLabel.propTypes = {
    time: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.number,
};

TimeLabel.defaultProps = {
    time: "",
    style: {},
    type: R.strings.timeType.SHORT,
};

export default TimeLabel;
