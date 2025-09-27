// dating.js - Complete Consolidated Script

// ===== CORE FUNCTIONALITY =====
const datingQuestions = {
    flirty: [
        "What's your go-to flirty text to send someone?",
        "How would you flirt with me across a crowded room?",
        "What's your favorite cheesy pickup line?",
        "What's something you find irresistibly attractive?",
        "What's your favorite physical feature about yourself?",
        "What's your idea of a perfect first kiss?",
        "What outfit makes you feel most confident?"
    ],
    deep: [
        "What does emotional intimacy mean to you?",
        "What's your biggest relationship lesson learned?",
        "How do you handle conflict in relationships?",
        "What makes someone 'relationship material' to you?",
        "What's something you're hoping to experience with a partner?",
        "How do you show love without using words?",
        "What's your definition of trust in a relationship?"
    ],
    playful: [
        "Where would you take me on a surprise date?",
        "What's your idea of a perfect lazy Sunday together?",
        "Describe our imaginary weekend getaway",
        "Where would you take me for a spontaneous adventure?",
        "What's your favorite way to be comforted?",
        "If we were characters in a rom-com, what would our meet-cute be?",
        "What ridiculous couple costume would we wear?"
    ],
    all: []
};

// Combine all questions
datingQuestions.all = [...datingQuestions.flirty, ...datingQuestions.deep, ...datingQuestions.playful];

// DOM Elements
const questionElement = document.getElementById('question-text');
const counterElement = document.getElementById('current-q');
const nextButton = document.getElementById('next-btn');
const card = document.getElementById('question-card');
const categoryButtons = document.querySelectorAll('.category-btn');

// Game State
let currentQuestions = [];
let currentQuestionIndex = 0;
let activeCategory = 'all';

// ===== INITIALIZATION =====
function initGame() {
    shuffleQuestions(activeCategory);
    updateQuestion();
    setupEventListeners();
    window.addEventListener('scroll', handleScroll);
}
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

// ===== CORE FUNCTIONS =====
function shuffleQuestions(category) {
    currentQuestions = [...datingQuestions[category]];
    shuffleArray(currentQuestions);
    activeCategory = category;
}

function updateQuestion() {
    questionElement.textContent = currentQuestions[currentQuestionIndex];
    counterElement.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
}

function showNextQuestion() {
    card.classList.add('flip');

    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % currentQuestions.length;
        if (currentQuestionIndex === 0) shuffleQuestions(activeCategory);

        updateQuestion();
        card.classList.remove('flip');
        triggerRomanticEffect();
    }, 300);
}

// ===== HELPER FUNCTIONS =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function triggerRomanticEffect() {
    // Card pulse
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'pulse 0.8s';

    // Floating hearts
    if (Math.random() > 0.7) {
        createFloatingHeart(
            card.getBoundingClientRect().left + card.offsetWidth / 2,
            card.getBoundingClientRect().top
        );
    }
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = '#ff6b8b';
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.opacity = '0.8';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = `float-up ${Math.random() * 2 + 1}s forwards`;
    heart.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// ===== EVENT HANDLERS =====
function setupEventListeners() {
    // Category Selection
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Visual feedback
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Animation
            button.style.animation = 'none';
            void button.offsetWidth;
            button.style.animation = 'heartBeat 0.8s';

            // Hearts explosion
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createFloatingHeart(
                        button.getBoundingClientRect().left + button.offsetWidth / 2,
                        button.getBoundingClientRect().top
                    );
                }, i * 200);
            }

            // Change category
            const category = button.dataset.category;
            shuffleQuestions(category);
            currentQuestionIndex = 0;
            updateQuestion();
        });
    });

    // Next Question
    nextButton.addEventListener('click', showNextQuestion);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
            showNextQuestion();
        }
    });

    // Romantic background effects
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.98) {
            createFloatingHeart(e.clientX, e.clientY);
        }
    });
}

// ===== START THE GAME =====
initGame();
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
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