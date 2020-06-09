cd $(dirname "${BASH_SOURCE[0]}") # Get into scripts directory by default
cd ../
echo
echo "Initializing project and starting server.."
echo
./as.sh 1 2
cd scripts