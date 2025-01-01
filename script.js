// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const registerScreen = document.getElementById('registerScreen');
const mainScreen = document.getElementById('mainScreen');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');

const currentUserName = document.getElementById('currentUserName');
const homeButton = document.getElementById('homeButton');
const friendsButton = document.getElementById('friendsButton');
const messagesButton = document.getElementById('messagesButton');
const logoutButton = document.getElementById('logoutButton');

const homeSection = document.getElementById('home');
const friendsSection = document.getElementById('friends');
const messagesSection = document.getElementById('messages');

const postInput = document.getElementById('postInput');
const postButton = document.getElementById('postButton');
const postsContainer = document.getElementById('postsContainer');

const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');
const messagesContainer = document.getElementById('messagesContainer');

let currentUser = null;
const users = [];
const posts = [];
const messages = [];

// Event Listeners
registerLink.addEventListener('click', () => {
  loginScreen.classList.add('hidden');
  registerScreen.classList.remove('hidden');
});

loginLink.addEventListener('click', () => {
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    currentUserName.textContent = currentUser.name;
    loginScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
  } else {
    alert('Invalid credentials!');
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const phone = document.getElementById('registerPhone').value;
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  users.push({ name, phone, username, password });
  alert('Registration successful!');
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

postButton.addEventListener('click', () => {
  const content = postInput.value.trim();
  if (content) {
    posts.push({ user: currentUser.name, content });
    renderPosts();
    postInput.value = '';
  }
});

sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    messages.push({ user: currentUser.name, message });
    renderMessages();
    messageInput.value = '';
  }
});

logoutButton.addEventListener('click', () => {
  currentUser = null;
  mainScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

// Render Functions
function renderPosts() {
  postsContainer.innerHTML = posts.map(post => `<p><strong>${post.user}:</strong> ${post.content}</p>`).join('');
}

function renderMessages() {
  messagesContainer.innerHTML = messages.map(msg => `<p><strong>${msg.user}:</strong> ${msg.message}</p>`).join('');
}

// Navigation
homeButton.addEventListener('click', () => {
  homeSection.classList.remove('hidden');
  friendsSection.classList.add('hidden');
  messagesSection.classList.add('hidden');
});

friendsButton.addEventListener('click', () => {
  homeSection.classList.add('hidden');
  friendsSection.classList.remove('hidden');
  messagesSection.classList.add('hidden');
});

messagesButton.addEventListener('click', () => {
  homeSection.classList.add('hidden');
  friendsSection.classList.add('hidden');
  messagesSection.classList.remove('hidden');
});

