import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import styles, { ItemContainerView, ItemLabel, HeaderTitle } from "./styles";
import R from "res/R";
import { NavigationBar } from "common/views";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { ContainerView } from "common/themed";

class InterestsScreen extends Component {
    state = {
        isLoading: false,
        interests: [],
        allowNextStep: false,
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.state = {
            isLoading: false,
            interests: R.strings.interests.map(title => {
                return { title, selected: false };
            }),
            selected: [],
            allowNextStep: false,
        };
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            userObservables.subjects.interestsSubject$.subscribe(({ status }) => {
                this.setState({
                    isLoading: status === userObservables.constants.LOADING,
                });
                if (status === userObservables.constants.SUCCESS) {
                    this.props.validToken();
                }
            }),
        );
    };

    _onPress = index => {
        const { interests, selected } = this.state;
        interests[index] = Object.assign({}, interests[index], {
            selected: !interests[index].selected,
        });
        if (interests[index].selected) {
            selected.push(interests[index].title);
        } else {
            const selectedItemIndex = selected.indexOf(interests[index].title);
            if (selectedItemIndex > -1) {
                selected.splice(selectedItemIndex, 1);
            }
        }
        const allowNextStep = selected.length >= 3;
        this.setState({ interests, selected, allowNextStep });
    };
    handleSubmitPress = () => {
        const { selected, allowNextStep } = this.state;
        const { updateInterestsRequest, userId } = this.props;
        if (allowNextStep) {
            this.setState({
                isLoading: true,
            });
            updateInterestsRequest({ interests: selected, _id: userId });
        }
    };
    handleCancelPress = () => {
        const { validToken } = this.props;
        validToken();
    };
    renderItem = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => this._onPress(index)}
                key={index.toString()}
                activeOpacity={1}
            >
                <ItemContainerView selected={item.selected}>
                    <ItemLabel selected={item.selected}>{item.title}</ItemLabel>
                </ItemContainerView>
            </TouchableOpacity>
        );
    };
    render() {
        const { isLoading, interests, allowNextStep } = this.state;
        return (
            <ContainerView>
                <NavigationBar
                    title={"Interests"}
                    rightButtonText='Next'
                    handleRight={this.handleSubmitPress}
                    disabled={!allowNextStep}
                    isLoading={isLoading}
                />
                <ScrollView contentContainerStyle={styles.containerGrid}>
                    <View style={styles.header}>
                        <HeaderTitle>Select at least three interests to get started.</HeaderTitle>
                    </View>
                    {interests.map((item, index) => this.renderItem(item, index))}
                </ScrollView>
            </ContainerView>
        );
    }
}

export default withObservableStream({})(InterestsScreen);
