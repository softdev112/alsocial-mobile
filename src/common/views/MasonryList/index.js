import React, { Component } from "react";
import {
    Dimensions,
    ScrollView,
    View,
    Image,
    TouchableWithoutFeedback,
    RefreshControl,
} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import memoize from "memoize-one";
import styles from "./styles";

const { width } = Dimensions.get("window");
const NUMBER_OF_COLUMNS = 2;
const ITEM_WIDTH = (width - 21) / NUMBER_OF_COLUMNS;
const COLUMN1_ITEM__LEFT_OFFSET = 7;
const COLUMN2_ITEM__LEFT_OFFSET = 3.5;
const MARGIN_BOTTOM = 7;
const NUMBER_OF_ITEMS = 10;

class MasonryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            column1VisibilityOffsetY: 0,
            column2VisibilityOffsetY: 0,
        };

        this.column1 = [];
        this.column2 = [];
        this.column1Height = 0;
        this.column2Height = 0;
        this.column1ItemPositions = {};
        this.column2ItemPositions = {};
    }

    _processItems = items => {
        this.column1 = [];
        this.column2 = [];
        this.column1Height = 0;
        this.column2Height = 0;
        this.column1ItemPositions = {};
        this.column2ItemPositions = {};

        items &&
            items.forEach((item, index) => {
                const widthChangeRatio = ITEM_WIDTH / item.dimensions.width;

                if (index % 2 === 0) {
                    this.column1.push({
                        ...item,
                        top: this.column1Height,
                    });
                    this.column1ItemPositions[parseInt(this.column1Height)] =
                        this.column1.length - 1;
                    this.column1Height =
                        this.column1Height +
                        item.dimensions.height * widthChangeRatio +
                        MARGIN_BOTTOM;
                } else {
                    this.column2.push({
                        ...item,
                        top: this.column2Height,
                    });
                    this.column2ItemPositions[parseInt(this.column2Height)] =
                        this.column2.length - 1;
                    this.column2Height =
                        this.column2Height +
                        item.dimensions.height * widthChangeRatio +
                        MARGIN_BOTTOM;
                }
            });
    };

    _memProcessItems = memoize(this._processItems);

    _onScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        let offsetY = parseInt(contentOffset.y);

        if (layoutMeasurement.height + offsetY + 300 >= contentSize.height) this._onEndReached();

        if (this.column1.length > 0) this._updateColumn1(offsetY);

        if (this.column2.length > 0) this._updateColumn2(offsetY);
    };

    _onEndReached = _.debounce(
        () => {
            this.props.items.length > 0 && this.props.onEndReached && this.props.onEndReached();
        },
        1000,
        { leading: true, trailing: false },
    );

    _updateColumn1 = async offsetY => {
        while (offsetY >= 0 && typeof this.column1ItemPositions[offsetY] === "undefined") {
            offsetY = offsetY - 1;
        }

        const index = this.column1ItemPositions[offsetY] || 0;

        if (this.state.column1VisibilityOffsetY !== index) {
            this.setState({ column1VisibilityOffsetY: index });
        }
    };

    _renderItem = (item, isColumnLeft) => {
        const widthChangeRatio = ITEM_WIDTH / item.dimensions.width;

        return (
            <TouchableWithoutFeedback
                key={item.id}
                onPress={() => this.props.onPressImage && this.props.onPressImage(item)}
            >
                <Image
                    style={{
                        position: "absolute",
                        top: item.top,
                        left: isColumnLeft ? COLUMN1_ITEM__LEFT_OFFSET : COLUMN2_ITEM__LEFT_OFFSET,
                        height: item.dimensions.height * widthChangeRatio,
                        width: ITEM_WIDTH,
                    }}
                    source={{ uri: item.uri }}
                />
            </TouchableWithoutFeedback>
        );
    };

    _updateColumn2 = async offsetY => {
        while (offsetY >= 0 && typeof this.column2ItemPositions[offsetY] === "undefined") {
            offsetY = offsetY - 1;
        }

        const index = this.column2ItemPositions[offsetY] || 0;

        if (this.state.column2VisibilityOffsetY !== index) {
            this.setState({ column2VisibilityOffsetY: index });
        }
    };

    render() {
        const { items, backgroundColor } = this.props;
        const { column1VisibilityOffsetY, column2VisibilityOffsetY } = this.state;
        this._memProcessItems(items);
        const column1 = this.column1;
        const column2 = this.column2;
        const column1Height = this.column1Height;
        const column2Height = this.column2Height;
        const column1RangeEnd =
            column1VisibilityOffsetY + NUMBER_OF_ITEMS < column1.length
                ? column1VisibilityOffsetY + NUMBER_OF_ITEMS
                : column1.length;
        const column1RangeStart =
            column1VisibilityOffsetY < column1RangeEnd
                ? column1VisibilityOffsetY
                : column1RangeEnd - NUMBER_OF_ITEMS >= 0
                ? column1RangeEnd - NUMBER_OF_ITEMS
                : 0;
        const column2RangeEnd =
            column2VisibilityOffsetY + NUMBER_OF_ITEMS < column2.length
                ? column2VisibilityOffsetY + NUMBER_OF_ITEMS
                : column2.length;
        const column2RangeStart =
            column2VisibilityOffsetY < column2RangeEnd
                ? column2VisibilityOffsetY
                : column2RangeEnd - NUMBER_OF_ITEMS >= 0
                ? column2RangeEnd - NUMBER_OF_ITEMS
                : 0;

        return (
            <ScrollView
                keyboardShouldPersistTaps={"always"}
                scrollEventThrottle={8}
                onScroll={this._onScroll}
                style={{ ...styles.container, backgroundColor }}
                refreshControl={
                    <RefreshControl
                        onRefresh={this.props.onRefresh}
                        refreshing={this.props.refreshing}
                    />
                }
            >
                <View style={styles.contentContainer}>
                    <View style={[styles.columnLeft, { height: column1Height }]}>
                        {column1.length > 0 &&
                            _.range(column1RangeStart, column1RangeEnd).map(visibleIndex => {
                                const item = column1[visibleIndex];
                                return this._renderItem(item, true);
                            })}
                    </View>

                    <View style={[styles.columnRight, { height: column2Height }]}>
                        {column2.length > 0 &&
                            _.range(column2RangeStart, column2RangeEnd).map(visibleIndex => {
                                const item = column2[visibleIndex];
                                return this._renderItem(item);
                            })}
                    </View>
                </View>

                {this.props.renderFooter && this.props.renderFooter()}
            </ScrollView>
        );
    }
}

MasonryList.defaultProps = {
    items: PropTypes.array,
    onEndReached: PropTypes.func,
    onPressImage: PropTypes.func,
    renderFooter: PropTypes.func,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    backgroundColor: PropTypes.string,
};

export default MasonryList;
