let history = [];

function loadHistory() {
  const saved = localStorage.getItem('adarsh_history');
  history = saved ? JSON.parse(saved) : [];
  renderHistory();
  updateHistoryCount();
}

function addToHistory(title, url) {
  if (url.startsWith('adarsh-browser://')) return;
  
  const entry = {
    id: generateID(),
    title: title || url,
    url: url,
    visitedAt: new Date().toISOString()
  };
  
  history.unshift(entry);
  
  if (history.length > 100) {
    history = history.slice(0, 100);
  }
  
  localStorage.setItem('adarsh_history', JSON.stringify(history));
  renderHistory();
  updateHistoryCount();
}

function renderHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  
  if (history.length === 0) {
    historyList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No history</p>';
    return;
  }
  
  history.slice(0, 20).forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div style="flex: 1; text-align: left; cursor: pointer;" onclick="navigateTab('${entry.url}')">
        <strong>${entry.title.substring(0, 25)}</strong>
        <p style="font-size: 0.75rem; color: var(--text-secondary);">${formatDate(entry.visitedAt)}</p>
      </div>
      <span class="item-delete" onclick="removeFromHistory('${entry.id}')">✕</span>
    `;
    historyList.appendChild(item);
  });
}

function removeFromHistory(id) {
  history = history.filter(e => e.id !== id);
  localStorage.setItem('adarsh_history', JSON.stringify(history));
  renderHistory();
  updateHistoryCount();
}

function clearAllHistory() {
  if (confirm('Clear all history?')) {
    history = [];
    localStorage.setItem('adarsh_history', JSON.stringify(history));
    renderHistory();
    updateHistoryCount();
    showNotification('History cleared');
    playSound('success');
  }
}

function toggleHistory() {
  const sidebar = document.getElementById('sidebar');
  const section = document.getElementById('historySection');
  
  document.getElementById('bookmarksSection').style.display = 'none';
  document.getElementById('settingsSection').style.display = 'none';
  document.getElementById('aiSection').style.display = 'none';
  
  if (section.style.display === 'none') {
    section.style.display = 'block';
    sidebar.classList.add('active');
    renderHistory();
    playSound('click');
  } else {
    section.style.display = 'none';
    sidebar.classList.remove('active');
  }
}

function updateHistoryCount() {
  document.getElementById('historyCount').textContent = `${history.length} Item${history.length !== 1 ? 's' : ''}`;
}

loadHistory();