#!/usr/bin/env bash
#
# eve_focus_main.sh - Focus a single EVE window to fullscreen
#
# Usage: ./eve_focus_main.sh <window-id>
#

set -euo pipefail

# Check dependencies
for cmd in wmctrl xdotool; do
    if ! command -v "$cmd" &> /dev/null; then
        echo "Error: Required command '$cmd' not found."
        echo "Install with: sudo apt-get install $cmd"
        exit 1
    fi
done

# Validate argument
WIN="${1:-}"
if [ -z "$WIN" ]; then
    echo "Usage: eve_focus_main.sh <window-id>"
    echo ""
    echo "Get window IDs with: wmctrl -l | grep 'EVE - '"
    exit 1
fi

# Validate window ID format (should be hex like 0x04800007)
if [[ ! "$WIN" =~ ^0x[0-9a-fA-F]+$ ]]; then
    echo "Error: Invalid window ID format: $WIN"
    echo "Window ID should be hexadecimal (e.g., 0x04800007)"
    exit 1
fi

# Fullscreen dimensions (adjust for your monitor)
MAIN_X=0
MAIN_Y=0
MAIN_W=1920
MAIN_H=1080

# Remove fullscreen/maximize flags
if ! wmctrl -i -r "$WIN" -b remove,fullscreen,maximized_vert,maximized_horz 2>/dev/null; then
    echo "Error: Could not modify window $WIN. Does it exist?"
    exit 1
fi

# Resize and position
if ! wmctrl -i -r "$WIN" -e "0,$MAIN_X,$MAIN_Y,$MAIN_W,$MAIN_H" 2>/dev/null; then
    echo "Error: Could not resize window $WIN"
    exit 1
fi

# Activate window
if ! xdotool windowactivate "$WIN" 2>/dev/null; then
    echo "Warning: Could not activate window $WIN"
fi

echo "Focused window $WIN (${MAIN_W}x${MAIN_H})"
