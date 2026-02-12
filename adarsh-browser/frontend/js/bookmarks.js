let bookmarks = [];

function loadBookmarks() {
  const saved = localStorage.getItem('adarsh_bookmarks');
  bookmarks = saved ? JSON.parse(saved) : [];
  renderBookmarks();
}

function saveBookmarks() {
  localStorage.setItem('adarsh_bookmarks', JSON.stringify(bookmarks));
}

function addBookmark(title, url) {
  const bookmark = {
    id: generateID(),
    title: title || 'Bookmark',
    url: url || 'https://',
    createdAt: new Date().toISOString()
  };
  
  bookmarks.push(bookmark);
  saveBookmarks();
  showNotification('⭐ Bookmark added!');
  playSound('success');
  renderBookmarks();
  updateBookmarkCount();
}

function addCurrentBookmark() {
  const tab = tabs[currentTabIndex];
  addBookmark(tab.title, tab.url);
}

function removeBookmark(id) {
  bookmarks = bookmarks.filter(b => b.id !== id);
  saveBookmarks();
  showNotification('Bookmark removed');
  renderBookmarks();
  updateBookmarkCount();
}

function renderBookmarks() {
  const bookmarksList = document.getElementById('bookmarksList');
  bookmarksList.innerHTML = '';
  
  if (bookmarks.length === 0) {
    bookmarksList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No bookmarks yet</p>';
    return;
  }
  
  bookmarks.forEach(bookmark => {
    const item = document.createElement('div');
    item.className = 'bookmark-item';
    item.innerHTML = `
      <div style="flex: 1; text-align: left; cursor: pointer;" onclick="navigateTab('${bookmark.url}')">
        <strong>${bookmark.title}</strong>
        <p style="font-size: 0.75rem; color: var(--text-secondary);">${getDomainFromURL(bookmark.url)}</p>
      </div>
      <span class="item-delete" onclick="removeBookmark('${bookmark.id}')">✕</span>
    `;
    bookmarksList.appendChild(item);
  });
}

function toggleBookmarks() {
  const sidebar = document.getElementById('sidebar');
  const section = document.getElementById('bookmarksSection');
  
  document.getElementById('historySection').style.display = 'none';
  document.getElementById('settingsSection').style.display = 'none';
  document.getElementById('aiSection').style.display = 'none';
  
  if (section.style.display === 'none') {
    section.style.display = 'block';
    sidebar.classList.add('active');
    renderBookmarks();
    playSound('click');
  } else {
    section.style.display = 'none';
    sidebar.classList.remove('active');
  }
}

function updateBookmarkCount() {
  document.getElementById('bookmarkCount').textContent = `${bookmarks.length} Bookmark${bookmarks.length !== 1 ? 's' : ''}`;
}

loadBookmarks();
updateBookmarkCount();