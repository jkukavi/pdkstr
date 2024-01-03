#!/bin/bash

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
no_color='\033[0m'

# Local MongoDB connection details
LOCAL_URI="mongodb://localhost:27017"

# Directory to store the dump
DUMP_DIR="$(dirname $0)/dump"


echo -e "\n${green}Restoring database from local folder into local database.${no_color}\n" 

# Restore the dump locally, and --drop to drop any existing items inside known collections
mongorestore --uri="$LOCAL_URI" $DUMP_DIR --drop -v

echo -e "\n${green}Restoration of prod dump into local database successful.${no_color}" 