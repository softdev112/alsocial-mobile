// @flow
import React, { Component } from "react";
import { View, FlatList, Linking, Platform } from "react-native";
import { NavigationBar, InviteUserItem, SearchBox } from "common/views";
import styles from "./styles";
import { InviteType } from "utils/contacts";
import _debounce from "lodash/debounce";
import { ContainerView, LineView } from "common/themed";

class InviteScreen extends Component {
    state = {
        contacts: [],
        search: [],
    };
    constructor(props) {
        super(props);
        const { navigation } = props;
        const type = navigation.getParam("type", InviteType.email);
        const contacts = navigation
            .getParam("contacts")
            .filter(item =>
                type === InviteType.email
                    ? item?.emailAddresses?.length
                    : item?.phoneNumbers.length,
            )
            .map(contact => {
                contact.fullName = `${contact.givenName || ""} ${contact.familyName || ""}`.trim();
                contact.selected = false;
                return contact;
            })
            .sort((a, b) => {
                const nameA = a.fullName.toLowerCase(),
                    nameB = b.fullName.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        const username = navigation.getParam("username");
        this.state = {
            contacts,
            search: contacts,
            username,
            canSend: false,
            type,
        };
    }

    keyExtractor = (item: Object) => `item-${item.recordID}`;

    handlePressUser = (id: string) => {
        const { search } = this.state;
        this.setState(
            {
                search: search.map(item => {
                    if (item.recordID === id) item.selected = Boolean(!item.selected);
                    return item;
                }),
            },
            () => {
                const length = this.state.contacts.filter(item => {
                    if (item.selected) return true;
                }).length;
                this.setState({ canSend: Boolean(length) });
            },
        );
    };

    _selectedContacts = () => {
        const { contacts } = this.state;
        return contacts.filter(item => {
            return item.selected;
        });
    };

    sendEmail = () => {
        const contacts = this._selectedContacts().map(item => item?.emailAddresses[0]?.email);

        if (!contacts.length) return;

        const addresses = JSON.stringify(contacts)
            .replace(/"/g, "")
            .substring(1)
            .slice(0, -1);
        const body = `I'm on AllSocial now! Download the app and follow me @${this.state.username} ! ( https://allsocial.com/${this.state.username} )`;
        const recipients = contacts.length === 1 ? contacts[0] : addresses;

        Linking.openURL(`mailto:${recipients}?subject=Hi, I'm on AllSocial!&body=${body}`);

        let properties = {};
        for (let i = 0; i < contacts.length; i++) {
            properties[i + 1] = contacts[i];
        }
    };

    sendSms = async () => {
        const contacts = this._selectedContacts().map(item => item?.phoneNumbers[0]?.number);

        if (!contacts.length) return;

        const addresses = JSON.stringify(contacts)
            .replace(/"/g, "")
            .substring(1)
            .slice(0, -1);
        const body = `I'm on AllSocial now! Download the app and follow me @${this.state.username} ! ( https://allsocial.com/${this.state.username} )`;
        const separator = Platform.OS === "ios" ? "&" : "?";
        const iosLinkPrefix = contacts.length === 1 ? "sms:" : "sms:/open?addresses=";
        const linkPrefix = Platform.OS === "ios" ? iosLinkPrefix : "sms:";
        const recipients = contacts.length === 1 ? contacts[0] : addresses;

        Linking.openURL(`${linkPrefix}${recipients}${separator}body=${body}`);

        let properties = {};
        for (let i = 0; i < contacts.length; i++) {
            properties[i + 1] = contacts[i];
        }
    };

    renderItem = ({ item, index }: Object) => {
        const { type } = this.state;
        return (
            <InviteUserItem
                keyValue={`invite-${item.recordID}-${index}`}
                avatar={item.thumbnailPath}
                onPress={() => this.handlePressUser(item.recordID)}
                name={item.fullName}
                subName={
                    type === InviteType.email
                        ? item?.emailAddresses[0]?.email
                        : item?.phoneNumbers[0]?.number
                }
                selected={item.selected}
            />
        );
    };

    renderSeparator = () => <LineView />;

    onSearch = (value: string) => {
        const { contacts, type } = this.state;
        if (value.length >= 1) {
            if (type === InviteType.email) {
                this.setState({
                    search: contacts.filter(
                        item =>
                            item.fullName.startsWith(value) ||
                            (item.emailAddresses &&
                                item.emailAddresses.length &&
                                item.emailAddresses[0].email?.startsWith(value)),
                    ),
                });
            } else {
                this.setState({
                    search: contacts.filter(
                        item =>
                            item.fullName.startsWith(value) ||
                            (item.phoneNumbers &&
                                item.phoneNumbers.length &&
                                item.phoneNumbers[0].number?.startsWith(value)),
                    ),
                });
            }
        } else {
            this.setState({ search: contacts });
        }
    };

    render() {
        const { search, canSend, type } = this.state;
        return (
            <ContainerView>
                <NavigationBar
                    hasBackButton={true}
                    rightButtonText='Send'
                    handleRight={() => {
                        type === InviteType.email ? this.sendEmail() : this.sendSms();
                    }}
                    disabled={!canSend}
                    input={
                        <SearchBox
                            onChangeText={_debounce(this.onSearch, 300)}
                            placeholder='Search'
                        />
                    }
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        scrollEnabled
                        data={search}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        ItemSeparatorComponent={this.renderSeparator}
                        removeClippedSubviews={true}
                    />
                </View>
            </ContainerView>
        );
    }
}

export default InviteScreen;
