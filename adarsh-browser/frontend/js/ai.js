let chatMessages = [];

function toggleAI() {
  const sidebar = document.getElementById('sidebar');
  const section = document.getElementById('aiSection');
  
  document.getElementById('bookmarksSection').style.display = 'none';
  document.getElementById('historySection').style.display = 'none';
  document.getElementById('settingsSection').style.display = 'none';
  
  if (section.style.display === 'none') {
    section.style.display = 'block';
    sidebar.classList.add('active');
    document.getElementById('chatInput').focus();
    playSound('success');
  } else {
    section.style.display = 'none';
    sidebar.classList.remove('active');
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  addChatMessage(message, 'user');
  input.value = '';
  playSound('click');
  
  setTimeout(() => {
    const aiResponse = getAIResponse(message);
    addChatMessage(aiResponse, 'ai');
  }, 300);
}

function addChatMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  
  const messageEl = document.createElement('div');
  messageEl.className = `chat-message ${sender}`;
  messageEl.textContent = text;
  
  messagesContainer.appendChild(messageEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(message) {
  const responses = {
    'hello': 'Hello! I\'m your Adarsh Browser AI Assistant. How can I help you today?',
    'help': 'I can help you with:\n• Web searches\n• Bookmarking\n• History management\n• General questions',
    'what can you do': 'I can assist with:\n✓ Answering questions\n✓ Helping with browser features\n✓ Smart suggestions',
    'hi': 'Welcome to Adarsh Browser! What would you like to know?',
    'search': 'You can use the search bar at the top to search the web using Google, DuckDuckGo, or Bing!',
    'bookmark': 'You can bookmark pages using the Bookmarks button or Ctrl+B shortcut!',
    'history': 'Your browsing history is saved automatically and accessible from the History panel!'
  };
  
  const lowerMessage = message.toLowerCase();
  
  for (let key in responses) {
    if (lowerMessage.includes(key)) {
      return responses[key];
    }
  }
  
  return `That's interesting! As your AI assistant, I can help you navigate Adarsh Browser more effectively. Is there anything specific you'd like to know?`;
}

function handleChatKey(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}