# Installation Guide

## For Samsung Internet Browser

Samsung Internet Browser supports Chrome extensions (with some limitations). Here's how to install the Tab Saver extension:

### Method 1: Developer Mode (Recommended for Testing)

1. **Download the Extension**
   - Clone this repository or download it as a ZIP file
   - If downloaded as ZIP, extract it to a folder

2. **Enable Developer Mode**
   - Open Samsung Internet Browser
   - Type `internet://extensions` in the address bar (or `chrome://extensions` if that doesn't work)
   - Look for a "Developer mode" toggle and enable it

3. **Load the Extension**
   - Click on "Load unpacked" or "Load unpacked extension"
   - Navigate to the folder containing the extension files
   - Select the folder and confirm

4. **Verify Installation**
   - The extension icon should appear in your browser toolbar
   - You should see "Samsung Tab Saver" in your extensions list

### Method 2: Testing in Chrome/Edge First

If you have trouble with Samsung Internet, you can test the extension in Chrome or Edge first:

1. Open Chrome or Edge browser
2. Navigate to `chrome://extensions` or `edge://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension folder
6. Test the functionality

Once it works in Chrome/Edge, it should work similarly in Samsung Internet.

## For Other Chromium-Based Browsers

The extension is compatible with any Chromium-based browser that supports Manifest V3:

- Google Chrome
- Microsoft Edge
- Brave
- Opera
- Vivaldi

Follow the same steps as for Samsung Internet, using the appropriate extensions URL for your browser.

## Permissions Explanation

The extension requires these permissions:

- **tabs**: To read and create browser tabs
- **storage**: For potential future features (currently unused)
- **downloads**: To save the tabs file to your computer

These are minimal permissions needed for the extension to function.

## Troubleshooting

### Extension doesn't appear after installation
- Make sure you selected the correct folder (the one containing manifest.json)
- Check that Developer mode is enabled
- Try restarting your browser

### Can't save tabs
- Check that the extension has the downloads permission
- Verify your browser's download settings allow file downloads
- Check browser console for error messages (F12 > Console)

### Can't load tabs
- Ensure the JSON file is properly formatted
- Check that the file contains valid URLs
- Verify the file wasn't corrupted during download

### Extension works in Chrome but not Samsung Internet
- Samsung Internet may have additional restrictions
- Try using `internet://extensions` instead of `chrome://extensions`
- Some Samsung Internet versions may not support all Chrome extensions

## Uninstalling

To remove the extension:

1. Go to your browser's extensions page
2. Find "Samsung Tab Saver"
3. Click "Remove" or the trash icon
4. Confirm the removal
