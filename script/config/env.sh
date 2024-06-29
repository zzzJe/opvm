#!/bin/bash

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        -envVarValue)
            envVarValue="$2"
            shift 2
            ;;
        *)
            echo "Usage: ./env.sh -envVarValue <value>"
            exit 1
            ;;
    esac
done

# Environment variable name
envVarName="OPVM_HOME"

# Check if envVarValue is provided
if [[ -z "$envVarValue" ]]; then
    echo "Usage: ./env.sh -envVarValue <value>"
    exit 1
fi

# Set environment variable for the current session
export OPVM_HOME="$envVarValue"

# Set environment variable for future sessions (user level)
echo "export OPVM_HOME=$envVarValue" >> ~/.bashrc
source ~/.bashrc  # Reload .bashrc to apply changes immediately

# Verify if environment variable is set
if [[ "$OPVM_HOME" == "$envVarValue" ]]; then
    echo "\"$envVarName\" has been successfully set to \"$envVarValue\""
else
    echo "Failed to set \"$envVarName\""
fi
