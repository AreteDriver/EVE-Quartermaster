#!/usr/bin/env bash
#
# eve_tile_all.sh - Tile all running EVE game windows in a grid
#
# Usage: ./eve_tile_all.sh
#

set -euo pipefail

# Check dependencies
for cmd in wmctrl; do
    if ! command -v "$cmd" &> /dev/null; then
        echo "Error: Required command '$cmd' not found."
        echo "Install with: sudo apt-get install $cmd"
        exit 1
    fi
done

# Grid configuration
COLS=3                # number of previews per row
PREVIEW_W=320         # preview width in pixels
PREVIEW_H=180         # preview height in pixels
GAP=10                # gap between previews in pixels

# Top-left of preview area (adjust for multi-monitor setups)
SCREEN_X=0
SCREEN_Y=0

# Get all game windows: "EVE - <char>" (excludes "EVE Launcher")
mapfile -t CLIENTS < <(wmctrl -l | grep -F "EVE - ")

if [ "${#CLIENTS[@]}" -eq 0 ]; then
    echo "No EVE client windows found."
    exit 0
fi

echo "Found ${#CLIENTS[@]} EVE client(s). Tiling..."

i=0
for LINE in "${CLIENTS[@]}"; do
    WIN_ID=$(echo "$LINE" | awk '{print $1}')

    ROW=$(( i / COLS ))
    COL=$(( i % COLS ))

    X=$(( SCREEN_X + COL * (PREVIEW_W + GAP) ))
    Y=$(( SCREEN_Y + ROW * (PREVIEW_H + GAP) ))

    # Remove fullscreen/maximize flags and resize/move
    if ! wmctrl -i -r "$WIN_ID" -b remove,fullscreen,maximized_vert,maximized_horz 2>/dev/null; then
        echo "Warning: Could not modify window $WIN_ID"
        continue
    fi

    if ! wmctrl -i -r "$WIN_ID" -e "0,$X,$Y,$PREVIEW_W,$PREVIEW_H" 2>/dev/null; then
        echo "Warning: Could not position window $WIN_ID"
        continue
    fi

    i=$(( i + 1 ))
done

echo "Tiled $i window(s) in ${COLS}-column grid."
