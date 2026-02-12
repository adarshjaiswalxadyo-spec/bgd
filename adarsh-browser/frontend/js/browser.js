function handleAddressBarKey(event) {
  if (event.key === 'Enter') {
    const url = document.getElementById('addressBar').value;
    if (url.trim()) {
      playSound('success');
      navigateTab(formatURL(url));
      document.getElementById('addressBar').value = '';
    }
  }
}

function handleHomepageSearch(event) {
  if (event.key === 'Enter') {
    submitHomepageSearch();
  }
}

function submitHomepageSearch() {
  const query = document.getElementById('homepageSearch').value;
  if (query.trim()) {
    playSound('success');
    const searchEngine = document.getElementById('searchEngine').value;
    
    let searchUrl = '';
    switch(searchEngine) {
      case 'google':
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'duckduckgo':
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
      case 'bing':
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
      default:
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    navigateTab(searchUrl);
    document.getElementById('homepageSearch').value = '';
  }
}

function togglePrivateMode() {
  playSound('click');
  showNotification('🔒 Private Mode Enabled');
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch