# Contributing to Samsung Tab Saver

Thank you for your interest in contributing to Samsung Tab Saver! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Make your changes
3. Test in a Chromium-based browser
4. Submit a pull request

## Code Structure

```
Samsung_Tab_Saver/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js           # Main functionality
├── styles.css         # Styling
├── icons/             # Extension icons
├── README.md          # Main documentation
├── INSTALLATION.md    # Installation guide
└── example-saved-tabs.json  # Example file format
```

## Testing Your Changes

1. **Load the extension in Chrome/Edge**
   - Go to `chrome://extensions`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the extension directory

2. **Test the save functionality**
   - Open multiple tabs with different URLs
   - Click the extension icon
   - Click "Save All Tabs"
   - Verify the downloaded JSON file is correct

3. **Test the load functionality**
   - Close all tabs except one
   - Click the extension icon
   - Click "Load Tabs"
   - Select the previously saved file
   - Verify all tabs are restored

4. **Check the console**
   - Right-click on the extension popup and select "Inspect"
   - Check for any JavaScript errors

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Handle errors gracefully

## Security Considerations

When adding new features, ensure:

- All URLs are validated before use
- No external scripts are loaded
- User data is not sent to external servers
- Permissions are minimal and justified
- Input is sanitized and validated

## Submitting Changes

1. Create a descriptive branch name (e.g., `feature/export-to-csv`)
2. Make your changes in focused commits
3. Test thoroughly in multiple browsers if possible
4. Update documentation if needed
5. Submit a pull request with a clear description

## Feature Ideas

Potential features for future development:

- [ ] Export to different formats (CSV, plain text)
- [ ] Organize saved sessions with custom names
- [ ] Automatic periodic backups
- [ ] Filter tabs by domain before saving
- [ ] Merge multiple saved sessions
- [ ] Search within saved sessions
- [ ] Cloud sync via browser storage
- [ ] Keyboard shortcuts
- [ ] Dark mode
- [ ] Session history

## Bug Reports

When reporting bugs, include:

- Browser name and version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Console error messages

## Questions?

Feel free to open an issue for questions or suggestions!
