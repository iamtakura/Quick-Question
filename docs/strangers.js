// STRANGERS MODE QUESTIONS
const strangersQuestions = [
    "What's the most interesting place you've visited?",
    "If you could have dinner with any historical figure, who?",
    "What skill do you wish you had time to learn?",
    "What's your perfect weekend activity?",
    "What would you choose to become an expert in?",
    "What book has impacted you recently?",
    "What's your unusual passion?",
    "Which decade would you time-travel to live in?",
    "Where's your favorite hidden-gem restaurant?",
    "What's something surprising about you?"
];

// IDENTICAL ANIMATION LOGIC AS FRIENDS PAGE
let currentQuestion = 0;
const elements = {
    question: document.getElementById('question-text'),
    counter: document.getElementById('current-q'),
    nextBtn: document.getElementById('next-btn'),
    card: document.getElementById('question-card')
};

// Initialize first question
elements.question.textContent = strangersQuestions[currentQuestion];

function flipCard() {
    elements.card.classList.add('flip');
    setTimeout(() => {
        currentQuestion = (currentQuestion + 1) % strangersQuestions.length;
        elements.question.textContent = strangersQuestions[currentQuestion];
        elements.counter.textContent = currentQuestion + 1;
        elements.card.classList.remove('flip');
    }, 300);
}

// Event listeners (same as friends page)
elements.nextBtn.addEventListener('click', flipCard);
document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) flipCard();
});

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