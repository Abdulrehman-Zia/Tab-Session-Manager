// Get references to UI elements
const saveTabs = document.getElementById('saveTabs');
const loadTabs = document.getElementById('loadTabs');
const statusDiv = document.getElementById('status');
const tabCountDiv = document.getElementById('tabCount');

// Update tab count on load
updateTabCount();

// Save all open tabs to a file
saveTabs.addEventListener('click', async () => {
  try {
    // Get all tabs in current window
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    // Extract URLs from tabs
    const urls = tabs.map(tab => tab.url).filter(url => url && !url.startsWith('chrome://'));
    
    if (urls.length === 0) {
      showStatus('No valid tabs to save', 'error');
      return;
    }
    
    // Create file content with timestamp
    const timestamp = new Date().toISOString();
    const fileContent = {
      savedAt: timestamp,
      tabCount: urls.length,
      urls: urls
    };
    
    // Convert to JSON string
    const jsonString = JSON.stringify(fileContent, null, 2);
    
    // Create a blob and download it
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Generate filename with timestamp
    const filename = `saved-tabs-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    await chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    });
    
    showStatus(`✓ Saved ${urls.length} tabs to ${filename}`, 'success');
    
  } catch (error) {
    console.error('Error saving tabs:', error);
    showStatus(`✗ Error saving tabs: ${error.message}`, 'error');
  }
});

// Load tabs from a file
loadTabs.addEventListener('click', () => {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      // Read file content
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate data structure
      if (!data.urls || !Array.isArray(data.urls)) {
        throw new Error('Invalid file format');
      }
      
      // Open all tabs
      for (const url of data.urls) {
        await chrome.tabs.create({ url: url, active: false });
      }
      
      showStatus(`✓ Loaded ${data.urls.length} tabs`, 'success');
      updateTabCount();
      
    } catch (error) {
      console.error('Error loading tabs:', error);
      showStatus(`✗ Error loading tabs: ${error.message}`, 'error');
    }
  });
  
  // Trigger file picker
  fileInput.click();
});

// Helper function to show status messages
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }, 3000);
}

// Helper function to update tab count
async function updateTabCount() {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const validTabs = tabs.filter(tab => tab.url && !tab.url.startsWith('chrome://'));
    tabCountDiv.textContent = `Currently ${validTabs.length} tab${validTabs.length !== 1 ? 's' : ''} open`;
  } catch (error) {
    console.error('Error getting tab count:', error);
  }
}
