let tabs = [{
  id: generateID(),
  title: 'New Tab',
  url: 'adarsh-browser://home',
  isActive: true,
  history: ['adarsh-browser://home'],
  historyIndex: 0
}];

let currentTabIndex = 0;

function createNewTab() {
  playSound('success');
  
  const newTab = {
    id: generateID(),
    title: 'New Tab',
    url: 'adarsh-browser://home',
    isActive: false,
    history: ['adarsh-browser://home'],
    historyIndex: 0
  };
  
  tabs.forEach(tab => tab.isActive = false);
  tabs.push(newTab);
  currentTabIndex = tabs.length - 1;
  
  renderTabs();
  loadTabContent(currentTabIndex);
  updateTabCount();
}

function closeTab(index) {
  if (tabs.length === 1) {
    showNotification('Cannot close the last tab');
    return;
  }
  
  playSound('click');
  tabs.splice(index, 1);
  
  if (currentTabIndex >= tabs.length) {
    currentTabIndex = tabs.length - 1;
  }
  
  tabs[currentTabIndex].isActive = true;
  renderTabs();
  loadTabContent(currentTabIndex);
  updateTabCount();
}

function activateTab(index) {
  playSound('click');
  
  tabs.forEach(tab => tab.isActive = false);
  tabs[index].isActive = true;
  currentTabIndex = index;
  
  renderTabs();
  loadTabContent(index);
}

function renderTabs() {
  const container = document.getElementById('tabsContainer');
  container.innerHTML = '';
  
  tabs.forEach((tab, index) => {
    const tabEl = document.createElement('div');
    tabEl.className = `tab ${tab.isActive ? 'active' : ''}`;
    tabEl.onclick = () => activateTab(index);
    
    tabEl.innerHTML = `
      <span>${tab.title.substring(0, 20)}</span>
      <span style="cursor: pointer;" onclick="event.stopPropagation(); closeTab(${index})">✕</span>
    `;
    
    container.appendChild(tabEl);
  });
}

function loadTabContent(index) {
  const tab = tabs[index];
  const webframe = document.getElementById('webframe');
  const homepage = document.getElementById('homepage');
  
  if (tab.url === 'adarsh-browser://home') {
    homepage.style.display = 'flex';
    webframe.style.display = 'none';
  } else {
    homepage.style.display = 'none';
    webframe.style.display = 'block';
    webframe.src = tab.url;
  }
}

function navigateTab(url) {
  const tab = tabs[currentTabIndex];
  tab.url = url;
  tab.title = url;
  
  if (tab.history[tab.historyIndex] !== url) {
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    tab.history.push(url);
    tab.historyIndex = tab.history.length - 1;
  }
  
  renderTabs();
  loadTabContent(currentTabIndex);
  addToHistory(url, url);
}

function goBack() {
  const tab = tabs[currentTabIndex];
  if (tab.historyIndex > 0) {
    tab.historyIndex--;
    tab.url = tab.history[tab.historyIndex];
    renderTabs();
    loadTabContent(currentTabIndex);
  }
}

function goForward() {
  const tab = tabs[currentTabIndex];
  if (tab.historyIndex < tab.history.length - 1) {
    tab.historyIndex++;
    tab.url = tab.history[tab.historyIndex];
    renderTabs();
    loadTabContent(currentTabIndex);
  }
}

function reloadPage() {
  playSound('click');
  loadTabContent(currentTabIndex);
  showNotification('Page reloaded');
}

function updateTabCount() {
  document.getElementById('tabCount').textContent = `${tabs.length} Tab${tabs.length !== 1 ? 's' : ''}`;
}

renderTabs();
updateTabCount();