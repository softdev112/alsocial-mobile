#!/bin/bash
#check if stdout is a terminal...
if test -t 1
then

    # see if it supports colors...
    ncolors=$(tput colors)

    if test -n "$ncolors" && test $ncolors -ge 8
    then
        bold="$(tput bold)"
        underline="$(tput smul)"
        standout="$(tput smso)"
        normal="$(tput sgr0)"
        black="$(tput setaf 0)"
        red="$(tput setaf 1)"
        green="$(tput setaf 2)"
        yellow="$(tput setaf 3)"
        blue="$(tput setaf 4)"
        magenta="$(tput setaf 5)"
        cyan="$(tput setaf 6)"
        white="$(tput setaf 7)"
        gray="$(tput setaf 8)"
    fi
fi


# install_java() {
#     current_location=`pwd`
#     cd ~/Downloads
#     curl -v -j -k -L -H "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-macosx-x64.dmg > jdk-8u171-macosx-x64.dmg
#     hdiutil attach jdk-8u171-macosx-x64.dmg
#     sudo installer -pkg /Volumes/JDK\ 8\ Update\ 171/JDK\ 8\ Update\ 171.pkg -target /
#     diskutil umount /Volumes/JDK\ 8\ Update\ 171
#     rm jdk-8u171-macosx-x64.dmg
#     cd $current_location
# }

# install_android_studio() {
#     current_location=`pwd`
#     cd ~/Downloads
#     curl -v -j -k -L -H "" https://dl.google.com/dl/android/studio/install/3.1.2.0/android-studio-ide-173.4720617-mac.dmg > android-studio-ide-173.4720617-mac.dmg
#     hdiutil attach android-studio-ide-173.4720617-mac.dmg
#     mv /Volumes/Android\ Studio\ 3.1.2/Android\ Studio.app /Applications/
#     diskutil umount /Volumes/Android\ Studio\ 3.1.2/Android\ Studio.app
#     rm android-studio-ide-173.4720617-mac.dmg
#     cd $current_location
# }

# install_android_sdk_manager_cli() {
#     current_location=`pwd`
#     cd ~/Downloads
#     curl -v -j -k -L -H "" https://dl.google.com/android/repository/sdk-tools-darwin-3859397.zip > sdk-tools-darwin-3859387.zip
#     unzip -a sdk-tools-darwin-3859387.zip
#     rm sdk-tools-darwin-3859387.zip
#     cd $current_location
# }

initialize() {
    echo "Checking installation.."

    xcode=`ls /Applications/Xcode*.app 2>/dev/null | wc -l`
    if [ $xcode != 0 ]
    then
        brew=$(which brew)
        if [ ${#brew} == 0 ]
        then
            echo "Homebrew does not exist, installing"
            /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        fi

        export GEM_HOME=$HOME/.gem
        export PATH=$GEM_HOME/bin:$PATH

        # install cocoapods
        gem install cocoapods

        # detox requirements if we ever add integration tests
        # applesimutils=$(which applesimutils)
        # if [ ${#applesimutils} == 0 ]
        # then
        #     echo "applesimutils does not exist, installing"
        #     brew tap wix/brew
        #     brew update
        #     brew install applesimutils
        #     brew untap wix/brew
        #     /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        # fi

        yarn=$(which yarn)
        if [ ${#yarn} == 0 ]
        then
            echo "yarn does not exist, installing"
            brew install yarn
        fi

        watchman=$(which watchman)
        if [ ${#watchman} == 0 ]
        then
            echo "watchman does not exist, installing"
            brew install watchman
        fi

        unset PREFIX
        unset npm_config_prefix
        if [ -s ~/.nvm/nvm.sh ]
        then
            echo ""
        else
            echo "nvm does not exist, installing"
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
            [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        fi
        . ~/.nvm/nvm.sh
        nvmrc=`cat .nvmrc`
        nvm_res=`nvm ls | grep "$nvmrc"`
        if [ "$nvm_res" != "" ]
        then
            nvm use
        else
            nvm install
        fi
        npm install -g ios-deploy --save >/dev/null 2>&1


        echo "☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️️☁️☁️☁️☁️☁️☁️☁️☁️☁️️️️️️️"
        echo -e "🚀\t${green}✔︎${normal} ${yellow}Xcode installed${normal}\t🚀"
        echo -e "🚀\t${green}✔︎${normal} ${blue}yarn installed${normal}\t🚀"
        echo -e "🚀\t${green}✔︎${normal} ${magenta}Homebrew installed${normal}\t🚀"
        echo -e "🚀\t${green}✔︎${normal} ${green}Cocoapods installed${normal}\t🚀"
        echo -e "🚀\t${green}✔︎${normal} ${cyan}watchman installed${normal}\t🚀"
        echo -e "🚀\t${green}✔︎${normal} ${white}nvm installed${normal}\t\t🚀"
        echo "🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊"

        watchman watch-del-all
        lsof -i tcp:8081 | grep 'node' | awk '{print $2}' | tail -n 1 | xargs kill -9
        rm -rf node_modules
        yarn

        # library patches
        yes | cp ./custom/java/react-native-branch-RNBranchModule.java ./node_modules/react-native-branch/android/src/main/java/io/branch/rnbranch/RNBranchModule.java
        yes | cp ./custom/js/react-native-extra-dimensions-android.config.js ./node_modules/react-native-extra-dimensions-android/react-native.config.js
        yes | cp ./custom/json/react-native-extra-dimensions-android-package.json ./node_modules/react-native-extra-dimensions-android/package.json

        cd ios
        pod install --repo-update
        cd ..

        echo "Everything checked, installed, and prepared.`echo $'\n '`Packager ready to be started.`echo $'\n '`"
    else
        echo "${red}Error: Xcode does not exist in Applications folder, please download and install it${normal}"
    fi
}

start() {
    watchman watch-del-all
    lsof -i tcp:8081 | grep 'node' | awk '{print $2}' | tail -n 1 | xargs kill -9
    nohup npm run start -- --reset-cache >/dev/null 2>&1 &
}

iosBuild() {
    echo
    read -p "${gray}Choose which build type:${normal}`echo $'\n\n '`[1]: Release`echo $'\n '`[2]: Dev`echo $'\n\n '`${standout}Enter selection:${normal} " -n 1 -r
    echo
    case "$REPLY" in
        1)
            # yarn test
            # testValue=$?
            # if [ $testValue -ne 0 ]
            # then
            #     echo "${red}Unit testing failed, not proceeding.${normal}"
            # else
            #     echo "Unit testing passed, proceeding.."
            cd ios
            xcodebuild clean -workspace AllSocialMobile.xcworkspace -scheme AllSocialMobile -configuration Release
            xcodebuild archive -workspace AllSocialMobile.xcworkspace -scheme AllSocialMobile -configuration Release
            cd ..
            # fi
            ;;
        2)
            # yarn test
            # testValue=$?
            # if [ $testValue -ne 0 ]
            # then
            #     echo "${red}Unit testing failed, not proceeding.${normal}"
            # else
            #     echo "Unit testing passed, proceeding.."
            cd ios
            xcodebuild clean -workspace AllSocialMobile.xcworkspace -scheme AllSocialMobile -configuration Debug
            xcodebuild archive -workspace AllSocialMobile.xcworkspace -scheme AllSocialMobile -configuration Debug
            cd ..
            # fi
            ;;
        *)
            echo "${red}Invalid selection${normal}"
            iosBuild
            ;;
    esac
}

androidBuild() {
    echo
    read -p "${gray}Choose which build type:${normal}`echo $'\n\n '`[1]: Release`echo $'\n '`[2]: Dev`echo $'\n\n '`${standout}Enter selection:${normal} " -n 1 -r
    echo
    case "$REPLY" in
        1)
            # yarn test
            # testValue=$?
            # if [ $testValue -ne 0 ]
            # then
            #     echo "${red}Unit testing failed, not proceeding.${normal}"
            # else
            #     echo "Unit testing passed, proceeding.."
            cd android
            ./gradlew clean bundleRelease
            cd ..
            # fi
            ;;
        2)
            # yarn test
            # testValue=$?
            # if [ $testValue -ne 0 ]
            # then
            #     echo "${red}Unit testing failed, not proceeding.${normal}"
            # else
            #     echo "Unit testing passed, proceeding.."
            cd android
            ./gradlew clean bundleDebug
            cd ..
            # fi
            ;;
        *)
            echo "${red}Invalid selection${normal}"
            androidBuild
            ;;
    esac
}

build() {
    echo
    read -p "${gray}Choose which OS to build:${normal}`echo $'\n\n '`[1]: Android`echo $'\n '`[2]: iOS`echo $'\n\n '`${standout}Enter selection:${normal} " -n 1 -r
    echo
    case "$REPLY" in
        1)
            androidBuild
            ;;
        2)
            iosBuild
            ;;
        *)
            echo "${red}Invalid selection${normal}"
            build
            ;;
    esac
}

main() {
    if [ $# -eq 0 ]
    then
        echo
        read -p "${gray}Choose what you want to do:${normal}`echo $'\n\n '`[1]: initialize project`echo $'\n '`[2]: start packager`echo $'\n '`[3]: start Android emulator`echo $'\n '`[4]: start iOS emulator`echo $'\n '`[5]: create release build for Android/iOS`echo $'\n\n '`${standout}Enter selection:${normal} " -n 1 -r
        echo
        case "$REPLY" in
            1)
                initialize
                ;;
            2)
                start
                ;;
            3)
                ./scripts/run_android.sh
                ;;
            4)
                ./scripts/run_ios.sh
                ;;
            5)
                build
                ;;
            *)
                echo "${red}Invalid selection${normal}"
                main
                ;;
        esac
    else
        if [[ $* == *"1"* ]]; then
            initialize
        fi
        if [[ $* == *"2"* ]]; then
            start
        fi
        if [[ $* == *"3"* ]]; then
            ./scripts/run_android.sh
        fi
        if [[ $* == *"4"* ]]; then
            ./scripts/run_ios.sh
        fi
        if [[ $* == *"5"* ]]; then
            build
        fi
    fi
}

echo "All Social wizard"
main $*