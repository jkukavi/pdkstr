#!/bin/bash

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
no_color='\033[0m'

# Local MongoDB connection details
LOCAL_URI="mongodb://localhost:27017"

# Directory to store the dump
DUMP_DIR="$(dirname $0)/dump"

# Prompt user for production database password
read -s -p "Enter password for database: " PROD_PASSWORD
echo

# Build the production URI with the entered password
PROD_URI="mongodb+srv://podkaster:$PROD_PASSWORD@pkcluster.crvpn.mongodb.net"

echo -e "\n${green}Dumping database to a local folder.${no_color}\n" 

# Create the dump
mongodump --uri="$PROD_URI" --out $DUMP_DIR -v

echo -e "${green}Success dumping prod to local folder.${no_color}\n" 
