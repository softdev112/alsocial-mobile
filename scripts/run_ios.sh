cd $(dirname "${BASH_SOURCE[0]}") # Get into scripts directory by default

#check if stdout is a terminal...
if test -t 1; then

    # see if it supports colors...
    ncolors=$(tput colors)

    if test -n "$ncolors" && test $ncolors -ge 8; then
        normal="$(tput sgr0)"
        red="$(tput setaf 1)"
    fi
fi

pickEmulator() {
    echo
    read -p "$DISPLAY_OPTIONS`echo $'\n '`Enter Option (ex: 2): "
    echo

    if (($REPLY >= 0 && $REPLY < $i)) && [ "$REPLY" -eq "$REPLY" ] 2>/dev/null; then
        if [ "$REPLY" -gt "$(( ${#EMULATORS_ARRAY[@]} - 1))" ]
        then
            EMULATOR=${DEVICES_ARRAY[${#REPLY} - ${#EMULATOR_ARRAY[@]} - 1]}
            DEVICE_TYPE="--device"
        else
            EMULATOR=${EMULATORS_ARRAY[$REPLY]}
            DEVICE_TYPE="--simulator"
        fi
        {
            PACKAGER=`lsof -i tcp:8081 | grep node | wc -l`
            if (($PACKAGER == 0)); then
                echo "Running packager not detected. Initializing and starting app server.."
                ./initialize_and_start_server.sh
                echo
            fi
            yarn ios $DEVICE_TYPE="$EMULATOR"
        } || {
            echo "`echo $'\n '`${red}Something went wrong${normal}"
            exit 1
        }
    else
        echo "`echo $'\n '`${red}Invalid selection $REPLY${normal}"
        pickEmulator
    fi
}

main() {
    EMULATOR_OS_VERSION=`xcodebuild -showsdks | grep iphonesimulator | sed 's/^.*iphonesimulator//'`
    EMULATORS=`instruments -s devices 2> /dev/null  | grep "^iP.*(Simulator)$" | sed "s/ ($EMULATOR_OS_VERSION.*$//" | sort -u`
    DEVICES=`instruments -s devices 2> /dev/null  | grep "^.*iP.*(.*) \[.*\]$" | sed "s/ (.*) \[.*\]$//" | sort -u`
    # EMULATORS=`xcrun simctl list devices | awk "/--\ iOS\ $EMULATOR_OS_VERSION\ --/{f=1;next} /--/{f=0} f" | sed "s/([A-Z0-9]\{8\}.*$//" | awk '{$1=$1};1' | sort -u`
    DISPLAY_OPTIONS="Choose which emulator to run"

    IFS=$'\n' read -rd '' -a EMULATORS_ARRAY <<< "$EMULATORS"
    IFS=$'\n' read -rd '' -a DEVICES_ARRAY <<< "$DEVICES"
    unset IFS

    for ((i = 0; i < ${#EMULATORS_ARRAY[@]}; i++));
    do
        DISPLAY_OPTIONS="$DISPLAY_OPTIONS`echo $'\n\t '`[$i]:`echo $'\t'`${EMULATORS_ARRAY[$i]}"
    done
    if [ "${#DEVICES_ARRAY[@]}" -gt "0" ]
    then
        DISPLAY_OPTIONS="$DISPLAY_OPTIONS`echo $'\n '`Or device"
    fi
    for ((i; i < ${#EMULATORS_ARRAY[@]} + ${#DEVICES_ARRAY[@]}; i++));
    do
        DISPLAY_OPTIONS="$DISPLAY_OPTIONS`echo $'\n\t '`[$i]:`echo $'\t'`${DEVICES_ARRAY[${#i} - ${#EMULATOR_ARRAY[@]} - 1]}"
    done

    pickEmulator
}

main