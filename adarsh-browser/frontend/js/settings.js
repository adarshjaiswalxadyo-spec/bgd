let settings = {
  darkMode: true,
  searchEngine: 'google',
  blockAds: true,
  enableAntiTracking: true,
  soundEffects: true
};

function loadSettings() {
  const saved = localStorage.getItem('adarsh_settings');
  if (saved) {
    settings = { ...settings, ...JSON.parse(saved) };
  }
  applySettings();
}

function saveSettings() {
  localStorage.setItem('adarsh_settings', JSON.stringify(settings));
}

function applySettings() {
  if (!settings.darkMode) {
    document.body.classList.add('light-mode');
  }
  
  const searchEngine = document.getElementById('searchEngine');
  if (searchEngine) {
    searchEngine.value = settings.searchEngine;
  }
}

function toggleDarkMode() {
  settings.darkMode = !settings.darkMode;
  document.body.classList.toggle('light-mode');
  saveSettings();
  
  const themeIcon = document.getElementById('themeIcon');
  themeIcon.textContent = settings.darkMode ? '🌙' : '☀️';
  
  showNotification(settings.darkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
  playSound('success');
}

function toggleMenu() {
  const menu = document.getElementById('menuDropdown');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  playSound('click');
}

function closeMenuWhenClickOutside() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.control-btn') && !e.target.closest('.menu-dropdown')) {
      document.getElementById('menuDropdown').style.display = 'none';
    }
  });
}

function toggleDownloads() {
  const sidebar = document.getElementById('sidebar');
  showNotification('📥 Downloads panel coming soon');
  playSound('click');
}

function toggleSettings() {
  const sidebar = document.getElementById('sidebar');
  const section = document.getElementById('settingsSection');
  
  document.getElementById('bookmarksSection').style.display = 'none';
  document.getElementById('historySection').style.display = 'none';
  document.getElementById('aiSection').style.display = 'none';
  
  if (section.style.display === 'none') {
    section.style.display = 'block';
    sidebar.classList.add('active');
    playSound('click');
  } else {
    section.style.display = 'none';
    sidebar.classList.remove('active');
  }
}

function showAbout() {
  playSound('click');
  alert(`🌟 ADARSH BROWSER 🌟\n\nDeveloped by Adarsh Jaiswal\nInstagram: @adar.xhevil\n\nVersion: 1.0.0\n\nNext-Generation Ultra Aesthetic Web Browser\n\nFeatures:\n✓ Ultra-Aesthetic UI\n✓ Multi-tab System\n✓ Bookmarks & History\n✓ AI Assistant\n✓ Dark Mode\n✓ Privacy Features\n\nWelcome to the future of browsing!`);
}

function exitBrowser() {
  if (confirm('Exit Adarsh Browser?')) {
    playSound('success');
    window.close();
  }
}

function startVoiceSearch() {
  showNotification('🎤 Voice search coming soon...');
  playSound('success');
}

function enterBrowser() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const browserContainer = document.getElementById('browserContainer');
  
  welcomeScreen.style.display = 'none';
  browserContainer.style.display = 'flex';
  
  playSound('success');
  showNotification('Welcome to Adarsh Browser!');
  
  renderTabs();
  loadTabContent(0);
  loadBookmarks();
  loadHistory();
  loadSettings();
  closeMenuWhenClickOutside();
}

loadSettings();