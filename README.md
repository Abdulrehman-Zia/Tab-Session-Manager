# Samsung Tab Saver

A browser extension for Samsung Internet Browser that allows you to save and restore all open tabs.

## Features

- 💾 **Save All Tabs**: Export all currently open tab URLs to a JSON file
- 📂 **Load Tabs**: Import and restore tabs from a previously saved file
- 🎯 **Simple Interface**: Easy-to-use popup with two buttons
- 📊 **Tab Counter**: Shows the number of currently open tabs
- ⏰ **Timestamped Saves**: Each saved file includes a timestamp for organization

## Installation

### For Samsung Internet Browser

1. Download or clone this repository
2. Open Samsung Internet Browser
3. Navigate to `internet://extensions` (or `chrome://extensions`)
4. Enable "Developer mode"
5. Click "Load unpacked extension"
6. Select the `Samsung_Tab_Saver` folder

### For Chrome/Chromium Browsers (Testing)

1. Download or clone this repository
2. Open Chrome/Chromium browser
3. Navigate to `chrome://extensions`
4. Enable "Developer mode" (toggle in top right)
5. Click "Load unpacked"
6. Select the `Samsung_Tab_Saver` folder

## Usage

### Saving Tabs

1. Click the Samsung Tab Saver extension icon in your browser toolbar
2. Click the "Save All Tabs" button
3. Choose a location to save the JSON file
4. The file will contain all your currently open tab URLs with a timestamp

### Loading Tabs

1. Click the Samsung Tab Saver extension icon in your browser toolbar
2. Click the "Load Tabs" button
3. Select a previously saved JSON file
4. All tabs from the file will be opened in your browser

## File Format

Saved tab files are in JSON format and contain:

```json
{
  "savedAt": "2025-11-14T16:45:00.000Z",
  "tabCount": 5,
  "urls": [
    "https://example.com",
    "https://github.com",
    "https://stackoverflow.com"
  ]
}
```

## Permissions

The extension requires the following permissions:

- **tabs**: To access and create tabs
- **storage**: To store extension settings (future feature)
- **downloads**: To save tab data to a file

## Development

The extension consists of:

- `manifest.json`: Extension configuration
- `popup.html`: Extension popup interface
- `popup.js`: Main functionality (save/load tabs)
- `styles.css`: Styling for the popup
- `icons/`: Extension icons in various sizes

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Abdulrehman Zia
