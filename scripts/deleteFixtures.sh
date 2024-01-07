#!/bin/bash

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
no_color='\033[0m'

rm -rf ./src/routers/mainRouter/__test__/nockFixtures/

# Delete fixtures
echo -e "\n${green}Deleted fixtures.${no_color}\n" 
