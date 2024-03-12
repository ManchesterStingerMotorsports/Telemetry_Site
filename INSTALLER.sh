#!/bin/bash

# Specify the directory name
dir_name="Telemetry_Site"

# Check if the directory exists
if [ -d "$dir_name" ]; then
    # If it does, delete it
    echo "Directory $dir_name exists. Deleting now..."
    rm -rf "$dir_name"
else
    # If it doesn't, print a message
    echo "Directory $dir_name does not exist."
fi

# Clone + Switch Branch
git clone https://github.com/ManchesterStingerMotorsports/Telemetry_Site.git
cd Telemetry_Site
git checkout influx_generators

# VENV
python3 -m venv ./.venv
source .venv/bin/activate

## Install Reqs
pip install -r requirements.txt

## Setup Bucket File

cd db_simulation

echo "Organisation Name: "
read org_name

echo "Token: "
read token

echo "token = '$token'
org = '$org_name'" > bucket.py

echo "Installation Complete ✅"