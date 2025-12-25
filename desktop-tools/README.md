# EVE Quartermaster - Desktop Tools

Companion utilities for managing EVE Online on desktop platforms.

## Linux Multi-Boxing Tools

Lightweight bash scripts for managing multiple EVE client windows on Linux.

### Prerequisites

```bash
# Ubuntu/Debian
sudo apt-get install wmctrl xdotool rofi

# Fedora/RHEL
sudo dnf install wmctrl xdotool rofi

# Arch Linux
sudo pacman -S wmctrl xdotool rofi
```

### Scripts

| Script | Description |
|--------|-------------|
| `eve_tile_all.sh` | Tile all EVE windows in a grid (3 columns default) |
| `eve_switcher.sh` | Interactive rofi/dmenu menu to select and focus a window |
| `eve_focus_main.sh` | Focus a specific window to fullscreen (1920x1080) |

### Usage

```bash
# Make scripts executable (first time only)
chmod +x linux/*.sh

# Tile all EVE windows in preview grid
./linux/eve_tile_all.sh

# Open interactive switcher menu
./linux/eve_switcher.sh

# Focus specific window by ID
./linux/eve_focus_main.sh 0x04800007
```

### Configuration

Edit the scripts to customize:

**eve_tile_all.sh:**
```bash
COLS=3          # Windows per row
PREVIEW_W=320   # Preview width (pixels)
PREVIEW_H=180   # Preview height (pixels)
GAP=10          # Space between windows
SCREEN_X=0      # X offset (for multi-monitor)
SCREEN_Y=0      # Y offset
```

**eve_focus_main.sh:**
```bash
MAIN_W=1920     # Fullscreen width
MAIN_H=1080     # Fullscreen height
```

### Keyboard Shortcuts (Optional)

Bind scripts to hotkeys for instant access:

**GNOME:**
```
Settings > Keyboard > Custom Shortcuts

Name: EVE Tile
Command: /path/to/desktop-tools/linux/eve_tile_all.sh
Shortcut: Super+E

Name: EVE Switch
Command: /path/to/desktop-tools/linux/eve_switcher.sh
Shortcut: Super+Shift+E
```

**i3/Sway:**
```bash
bindsym $mod+e exec ~/path/to/desktop-tools/linux/eve_tile_all.sh
bindsym $mod+Shift+e exec ~/path/to/desktop-tools/linux/eve_switcher.sh
```

### Platform Notes

- Requires X11 (Wayland via XWayland may work)
- Tested on Ubuntu 22.04+
