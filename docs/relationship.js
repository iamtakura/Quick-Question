// relationship.js - Complete Implementation

// ===== QUESTION DATABASE =====
const relationshipQuestions = {
    foundation: [
        "What's your love language and how can I better speak it?",
        "What's your biggest relationship deal-breaker?",
        "How do you prefer to apologize and receive apologies?",
        "What's something you wish I understood about your past?",
        "What's your attachment style (anxious/secure/avoidant)?",
        "What's your favorite memory of us from early in our relationship?",
        "What's something you're still learning about me?",
        "What family traditions do you want to keep or change?",
        "How do you define 'quality time' together?",
        "What's something small I do that makes you feel loved?",
        "What's your ideal way to spend a lazy Sunday together?",
        "How can we better support each other's personal growth?",
        "What's your favorite thing about our communication style?",
        "What's something you thought about me that turned out to be wrong?",
        "What's your favorite 'us' tradition we've created?"
    ],
    connection: [
        "What's something you're afraid to tell me but think I should know?",
        "What's your favorite non-physical way we connect?",
        "What's something you wish we did more of together?",
        "How do you feel our relationship has changed you as a person?",
        "What's a childhood experience that still affects you today?",
        "What's something you're proud of in our relationship?",
        "What's your favorite way I comfort you when you're upset?",
        "What's something you've learned about love from previous relationships?",
        "What's a dream you've never shared with anyone else?",
        "What's your favorite thing about how we handle conflicts?",
        "What's something you miss from earlier in our relationship?",
        "What's a fear you have about our future together?",
        "What's something you wish you could experience for the first time again with me?",
        "What's your favorite 'small moment' we've shared recently?",
        "What's something you think we understand about each other that others don't?"
    ],
    intimacy: [
        "What's your favorite memory of our physical intimacy?",
        "What's something you're curious to try in our intimate life?",
        "What's your ideal frequency for physical intimacy?",
        "What's something that always puts you in the mood?",
        "What's a non-sexual touch you love from me?",
        "What's your favorite place I've ever kissed you?",
        "What's something you find sexy that you think I don't know about?",
        "What's your favorite thing to hear during intimate moments?",
        "What's something that makes you feel most vulnerable with me?",
        "What's your favorite time of day for intimacy and why?",
        "What's a fantasy you've never shared with me?",
        "What's something that makes you feel most desired?",
        "What's your favorite piece of clothing I wear during intimate moments?",
        "What's something you'd like me to initiate more often?",
        "What's your favorite post-intimacy ritual with me?"
    ],
    future: [
        "Where do you see us living in 5 years?",
        "What's your ideal vision for our future family?",
        "What financial goals should we prioritize together?",
        "What's a dream vacation we should save for?",
        "How do you envision dividing household responsibilities long-term?",
        "What's your ideal work-life balance as a couple?",
        "How should we handle aging parents in the future?",
        "What values do you want to instill in our future children?",
        "What's your ideal way to celebrate major anniversaries?",
        "How do you want to grow old together?",
        "What's a skill you'd like us to learn together?",
        "How important is marriage to you and why?",
        "What's your ideal retirement scenario for us?",
        "How should we handle holidays with both families long-term?",
        "What's something you hope never changes about our relationship?"
    ]
};

// Combine all questions for 'All' category
relationshipQuestions.all = [
    ...relationshipQuestions.foundation,
    ...relationshipQuestions.connection,
    ...relationshipQuestions.intimacy,
    ...relationshipQuestions.future
];

// ===== DOM ELEMENTS =====
const questionElement = document.getElementById('question-text');
const counterElement = document.getElementById('current-q');
const nextButton = document.getElementById('next-btn');
const card = document.getElementById('question-card');
const categoryButtons = document.querySelectorAll('.category-btn');
const controlsContainer = document.querySelector('.controls');

// ===== GAME STATE =====
let currentQuestions = [];
let currentQuestionIndex = 0;
let activeCategory = 'foundation';

// ===== CORE FUNCTIONS =====
function initGame() {
    shuffleQuestions(activeCategory);
    updateQuestion();
    setupEventListeners();
    createScoreDisplay();
}

function shuffleQuestions(category) {
    currentQuestions = [...relationshipQuestions[category]];
    shuffleArray(currentQuestions);
    activeCategory = category;
    currentQuestionIndex = 0;
}

function updateQuestion() {
    questionElement.textContent = currentQuestions[currentQuestionIndex];
    counterElement.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
}

function showNextQuestion() {
    // Card flip animation
    card.classList.add('flip');

    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % currentQuestions.length;

        // Reshuffle if we've gone through all questions
        if (currentQuestionIndex === 0) {
            shuffleQuestions(activeCategory);
        }

        updateQuestion();
        card.classList.remove('flip');

        // Romantic effects
        triggerRomanticEffect();
    }, 300);
}

// ===== ANIMATIONS & EFFECTS =====
function triggerRomanticEffect() {
    // Card pulse animation
    card.style.animation = 'none';
    void card.offsetWidth; // Trigger reflow
    card.style.animation = 'redPulse 0.8s';

    // Random floating hearts
    if (Math.random() > 0.7) {
        createFloatingHeart();
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `-50px`;
    heart.style.fontSize = `${Math.random() * 20 + 15}px`;
    heart.style.opacity = '0.8';
    heart.style.zIndex = '100';
    heart.style.animation = `float-up ${Math.random() * 3 + 2}s linear forwards`;
    heart.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// ===== CATEGORY SELECTION =====
function setupCategoryButtons() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Change category
            const category = button.dataset.category;
            shuffleQuestions(category);
            updateQuestion();

            // Visual feedback
            card.style.animation = 'redPulse 0.8s';
            for (let i = 0; i < 3; i++) {
                setTimeout(createFloatingHeart, i * 200);
            }
        });
    });
}

// ===== SCORING SYSTEM =====
function createScoreDisplay() {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `
        <span>🌱 0</span> |
        <span>💞 0</span> |
        <span>🔥 0</span> |
        <span>🌟 0</span>
    `;
    document.querySelector('.game-container').prepend(scoreDisplay);
}

// ===== UTILITIES =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Next Question Button
    nextButton.addEventListener('click', showNextQuestion);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
            showNextQuestion();
        }
    });

    // Category Buttons
    setupCategoryButtons();

    // Romantic background effects
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.98) {
            createFloatingHeart();
        }
    });
}

// ===== INITIALIZE GAME =====
document.addEventListener('DOMContentLoaded', initGame);

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