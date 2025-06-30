import { database, ref, push, set, onValue, update } from './firebase.js';
let currentRoom = {}; // Track room state
// DOM Elements
const questionElement = document.getElementById('question-text');
const nextButton = document.getElementById('next-btn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
// Questions for Friends mode
const friendsQuestions = [
    "What's the most embarrassing thing that's happened to you?",
    "If we were roommates, what would annoy you most about me?",
    "If I was to get dumped, what would you do to comfort me?",
    "What's your favorite memory of our friendship?",
    "If you could change one thing about me, what would it be?",
    "What's something you think I'm secretly good at?",
    "What's the weirdest habit I have that you've noticed?",
    "If we switched lives for a day, what would surprise you most?",
    "What's something you think I don't know about you?",
    "Where do you see our friendship in 5 years?"
];

// Initialize chat functionality
function initChat() {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Basic send message functionality
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'you');
            chatInput.value = '';
            scrollToBottom();
        }
    }

    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = content;
        chatBox.appendChild(messageElement);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Example: Add a welcome message
    addMessage("Welcome to the chat! Type a message to begin.", 'them');
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initChat);

// Start the game
init();