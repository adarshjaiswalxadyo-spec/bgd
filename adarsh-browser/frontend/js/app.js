/**
 * Adarsh Browser - Main Application
 * Developed by Adarsh Jaiswal
 * Instagram: @adar.xhevil
 */

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Adarsh Browser initializing...');
  
  setupEventListeners();
  
  renderTabs();
  loadBookmarks();
  loadHistory();
  loadSettings();
  
  console.log('✅ Adarsh Browser ready!');
});

// Setup event listeners
function setupEventListeners() {
  // Prevent default drag and drop
  document.addEventListener('dragover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T: New Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      createNewTab();
    }
    
    // Ctrl/Cmd + W: Close Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
      e.preventDefault();
      closeTab(currentTabIndex);
    }
    
    // Ctrl/Cmd + B: Bookmarks
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      toggleBookmarks();
    }
    
    // Ctrl/Cmd + H: History
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      toggleHistory();
    }
    
    // Ctrl/Cmd + L: Address bar focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      document.getElementById('addressBar').focus();
    }
  });
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  showNotification('An error occurred');
});

// Version info
console.log('%c🌟 ADARSH BROWSER 🌟', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by Adarsh Jaiswal', 'color: #00d9ff; font-size: 14px;');
console.log('%cInstagram: @adar.xhevil', 'color: #ff006e; font-size: 14px;');
console.log('%cVersion: 1.0.0', 'color: #8f00ff; font-size: 12px;');