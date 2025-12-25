#!/usr/bin/env bash
#
# eve_switcher.sh - Interactive menu to switch between EVE clients
#
# Usage: ./eve_switcher.sh
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FOCUS_SCRIPT="$SCRIPT_DIR/eve_focus_main.sh"

# Check dependencies
if ! command -v wmctrl &> /dev/null; then
    echo "Error: Required command 'wmctrl' not found."
    echo "Install with: sudo apt-get install wmctrl"
    exit 1
fi

# Check for menu program (rofi preferred, dmenu as fallback)
if command -v rofi &> /dev/null; then
    MENU_CMD="rofi -dmenu -p 'Pick EVE Alt'"
elif command -v dmenu &> /dev/null; then
    MENU_CMD="dmenu -p 'Pick EVE Alt'"
else
    echo "Error: Neither 'rofi' nor 'dmenu' found."
    echo "Install with: sudo apt-get install rofi"
    exit 1
fi

# Check focus script exists
if [ ! -x "$FOCUS_SCRIPT" ]; then
    echo "Error: Focus script not found or not executable: $FOCUS_SCRIPT"
    exit 1
fi

# Get all game windows
mapfile -t CLIENTS < <(wmctrl -l | grep -F "EVE - ")

if [ "${#CLIENTS[@]}" -eq 0 ]; then
    echo "No EVE client windows found."
    exit 0
fi

# Show menu and get selection
CHOICE=$(printf '%s\n' "${CLIENTS[@]}" \
    | awk '{id=$1; $1=""; $2=""; print id "  " substr($0,3)}' \
    | eval "$MENU_CMD") || true

WIN_ID=$(echo "$CHOICE" | awk '{print $1}')

# Exit if no selection
if [ -z "$WIN_ID" ]; then
    exit 0
fi

# Focus the selected window
"$FOCUS_SCRIPT" "$WIN_ID"
