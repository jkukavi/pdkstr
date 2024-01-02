#!/bin/bash

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
no_color='\033[0m'

# Prompt user for production database password
read -s -p "Enter password for database: " PROD_PASSWORD
echo

# Build the production URI with the entered password
PROD_URI="mongodb+srv://podkaster:$PROD_PASSWORD@pkcluster.crvpn.mongodb.net"

# Local MongoDB connection details
LOCAL_URI="mongodb://localhost:27017"

# Directory to store the dump
DUMP_DIR="./dump"

echo -e "\n${green}Dumping database to a local folder.${no_color}\n" 

# Create the dump
mongodump --uri="$PROD_URI" --out $DUMP_DIR -v

echo -e "\n${green}Restoring database from local folder into local database.${no_color}\n" 

# Restore the dump locally, and --drop to drop any existing items inside known collections
mongorestore --uri="$LOCAL_URI" $DUMP_DIR --drop -v

echo -e "\n${green}Restoration successful.${no_color}" 

echo -e "${green}Deleting dump.${no_color}"

# Clean up the dump directory (optional)
rm -rf $DUMP_DIR

echo -e "${green}Deleted dump.${no_color}"

echo -e "${green}Success dumping prod to local.${no_color}\n" 
