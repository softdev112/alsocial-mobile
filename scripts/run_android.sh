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

runAndroid() {
    while [ `adb devices | grep device | wc -l` -lt 2 ]
    do
        sleep 1s
    done
    echo "`echo $'\n '`Starting Android app on $EMULATOR`echo $'\n '`"
    cd ..
    yarn android
}

pickEmulator() {
    echo
    read -p "$DISPLAY_OPTIONS`echo $'\n '`Enter Option (ex: 2): " -n 1 -r
    echo

    if (($REPLY >= 0 && $REPLY < $i)) && [ "$REPLY" -eq "$REPLY" ] 2>/dev/null; then
        EMULATOR=${EMULATORS_ARRAY[$REPLY]}
        {
            PACKAGER=`lsof -i tcp:8081 | grep node | wc -l`
            if (($PACKAGER == 0)); then
                echo "Running packager not detected."
                ./initialize_and_start_server.sh
                echo
            fi
            ~/Library/Android/sdk/emulator/emulator -avd $EMULATOR &
            runAndroid
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
    RUNNING_DEVICES=`adb devices | grep device | wc -l`
    if (($RUNNING_DEVICES == 2)); then
        EMULATOR=`adb devices | grep device | tail -n 1 | awk '{print $1}'`
        echo "Debug device $EMULATOR already running"
        PACKAGER=`lsof -i tcp:8081 | grep node | wc -l`
        if (($PACKAGER == 0)); then
            echo "Running packager not detected."
            ./initialize_and_start_server.sh
            echo
        fi
        runAndroid
    else
        EMULATORS=`~/Library/Android/sdk/emulator/emulator -list-avds`
        DISPLAY_OPTIONS="Choose which emulator to run"

        IFS=$'\n' read -rd '' -a EMULATORS_ARRAY <<< "$EMULATORS"
        unset IFS

        for ((i = 0; i < ${#EMULATORS_ARRAY[@]}; i++));
        do
            DISPLAY_OPTIONS="$DISPLAY_OPTIONS`echo $'\n '`[$i]:`echo $'\t'`${EMULATORS_ARRAY[$i]}"
        done

        pickEmulator
    fi
}

main