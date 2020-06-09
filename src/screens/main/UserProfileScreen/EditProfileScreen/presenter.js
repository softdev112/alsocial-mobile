import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { styles, AvatarImageWrap, AgeAgreement } from "./styles";
import PropTypes from "prop-types";
import { NavigationBar, RegionBox, WithLabel } from "common/views";
import { CoverImage } from "common/images";
import { WithLabelTextInput } from "common/textInputs";
import { GenderPicker } from "common/picker";
import R from "res/R";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import NavigationService from "service/Navigation";
import { ContainerView, BoldText } from "common/themed";

const editProfile = R.strings.editProfile;

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            ...user,
            newCover: null,
            newAvatar: null,
            isLoading: false,
            isAutocomplete: false,
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
            userObservables.subjects.updateProfileSubject$.subscribe(status => {
                this.setState({ isLoading: status === userObservables.constants.LOADING });
                if (status === userObservables.constants.SUCCESS) {
                    NavigationService.back();
                }
            }),
        );
    };

    _onUpdateProfileImage = image => {
        this.setState({ newAvatar: image });
    };

    _onUpdateCoverImage = image => {
        this.setState({ newCover: image });
    };

    _onSaveProfile = () => {
        const { updateProfile } = this.props;
        const { isLoading, isAutocomplete, ...rest } = this.state;
        updateProfile(rest);
    };

    _onShowAutocomplete = showed => {
        if (this.state.isAutocomplete !== showed) {
            this.setState({ isAutocomplete: showed });
        }
    };

    // Render any loading content that you like here
    render() {
        const {
            profileImage,
            coverImage,
            name,
            bio,
            location,
            website,
            gender,
            country,
            state,
            newCover,
            newAvatar,
            isLoading,
            isAutocomplete,
        } = this.state;
        return (
            <ContainerView>
                <NavigationBar
                    title={editProfile.title}
                    hasBackButton={true}
                    rightButtonText={editProfile.save}
                    handleRight={this._onSaveProfile}
                    isLoading={isLoading}
                />
                <ScrollView
                    style={styles.flex}
                    scrollEnabled={!isAutocomplete}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <View style={styles.container}>
                        <CoverImage
                            uri={newCover ? newCover.imageUri : coverImage}
                            onPickImage={this._onUpdateCoverImage}
                        />
                        <AvatarImageWrap
                            uri={newAvatar ? newAvatar.imageUri : profileImage}
                            size={R.dimensions.image.avatar.profile}
                            onPickImage={this._onUpdateProfileImage}
                        />
                        <View style={styles.content}>
                            <WithLabelTextInput
                                label={editProfile.name}
                                placeholder={editProfile.name}
                                value={name}
                                onChangeText={text => this.setState({ name: text })}
                                editable={!isLoading}
                            />
                            <View style={styles.space} />
                            <WithLabelTextInput
                                label={editProfile.bio}
                                placeholder={editProfile.bio}
                                value={bio}
                                maxLength={150}
                                multiline
                                scrollEnabled={false}
                                onChangeText={text => this.setState({ bio: text })}
                                editable={!isLoading}
                                isMention={true}
                                onShowAutocomplete={this._onShowAutocomplete}
                            />
                            <View style={styles.space} />
                            <WithLabelTextInput
                                label={editProfile.location}
                                placeholder={editProfile.location}
                                value={location}
                                maxLength={30}
                                multiline
                                scrollEnabled={false}
                                onChangeText={text => this.setState({ location: text })}
                                editable={!isLoading}
                            />
                            <View style={styles.space} />
                            <WithLabelTextInput
                                label={editProfile.website}
                                placeholder={editProfile.website}
                                value={website}
                                maxLength={100}
                                multiline
                                scrollEnabled={false}
                                onChangeText={text => this.setState({ website: text })}
                                editable={!isLoading}
                            />
                            <View style={styles.largeSpace} />
                            <BoldText>{editProfile.privateInfo}</BoldText>
                            <View style={styles.space} />
                            <View style={styles.flex}>
                                <WithLabel label={editProfile.gender}>
                                    <GenderPicker
                                        onChangeGender={text => this.setState({ gender: text })}
                                        gender={gender}
                                        disabled={isLoading}
                                    />
                                </WithLabel>
                                <View style={styles.rowSpace} />
                            </View>
                            <View style={styles.space} />
                            <WithLabel label={editProfile.region}>
                                <RegionBox
                                    country={country ? country.toLowerCase() : ""}
                                    state={state ? state.toLowerCase() : ""}
                                    onChangeCountry={async text => {
                                        await this.setState({ country: text, state: "" });
                                    }}
                                    onChangeState={async text =>
                                        await this.setState({ state: text })
                                    }
                                    disabled={isLoading}
                                />
                            </WithLabel>
                            <View style={styles.largeSpace} />
                            <AgeAgreement>
                                If you are under 13 years of age, you may not use or be a member of
                                AllSocial.
                            </AgeAgreement>
                        </View>
                    </View>
                </ScrollView>
            </ContainerView>
        );
    }
}

EditProfileScreen.propTypes = {
    user: PropTypes.object,
};

export default withObservableStream({})(EditProfileScreen);
