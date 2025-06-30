// ===== TRUTH OR DARE QUESTIONS =====
const questions = {
    truth: [
        "What's the most embarrassing thing you've done to impress someone you liked?",
        "Have you ever pretended to orgasm? Why?",
        "What's your biggest sexual turn-off?",
        "What's the wildest place you've had sex?",
        "Have you ever cheated on a partner? What happened?",
        "What's something you're into sexually but afraid to admit?",
        "What's the biggest lie you've told a partner?",
        "Have you ever sent nudes to the wrong person?",
        "What's your guilty pleasure in bed?",
        "What's the most inappropriate time you've gotten turned on?",
        // Sexual Truths (25)
        "Describe your most embarrassing sexual experience in vivid detail",
        "What's the most inappropriate place you've masturbated?",
        "Have you ever had a sexual fantasy about someone in this room? Who?",
        "What's the wildest thing you've done to get laid?",
        "Have you ever faked an orgasm with your current partner?",
        "What's your dirtiest sexting mistake?",
        "Describe your most painful sexual experience",
        "What's the most objects you've inserted sexually at once?",
        "Have you ever been caught having sex by a stranger? What happened?",
        "What's your biggest unfulfilled sexual fantasy?",

        // Social Truths (25)
        "What's the most illegal thing you've done and gotten away with?",
        "Have you ever stolen from a friend? What and why?",
        "What's the most manipulative thing you've done in a relationship?",
        "Have you ever secretly recorded someone without consent? Why?",
        "What's the worst thing you've done while drunk/high?",
        "Have you ever cheated on someone who truly loved you? Details?",
        "What's your biggest regret that would ruin your reputation?",
        "Have you ever pretended to be someone else online to catfish?",
        "What's the most you've ever lied to get sex?",
        "Have you ever revenge porned someone or considered it?"
    ],
    dare: [
        "Let the group choose a sexy outfit from your closet—you must wear it for 3 rounds",
        "Make out with the person to your left for 30 seconds",
        "Remove one clothing item and give it to someone else",
        "Whisper your dirtiest fantasy to the person on your right",
        "Let two people blindfold you and feed you something (no questions allowed)",
        "Do your best sexy dance on top of a table",
        "Exchange one clothing item with the person across from you",
        "Let the group create a dating profile for you using your phone",
        "Get spanked by everyone playing (one slap per person)",
        "Show the last text you sent your ex",
        // Physical Dares (25)
        "Let the group wax one part of your body (eyebrow/arm/leg)",
        "Wear your underwear on your head for the next 3 rounds",
        "Let someone draw a dirty picture on your back with permanent marker",
        "Do a handstand against the wall while someone removes your socks with their teeth",
        "Get spanked by everyone playing (one hard slap per person)",
        "Let the group choose an embarrassing tattoo with henna that lasts a week",
        "Swap an article of clothing with the person to your right",
        "Lick the floor in the bar/room you're in",
        "Let someone pour ice down your pants and sit for 1 minute",
        "Do a strip tease until someone tells you to stop",
        "Wear all your clothes backwards for the rest of the game",
        "Let someone style your hair with whatever they find in the kitchen",
        "Get blindfolded and let everyone feed you something mysterious (no veto)",
        "Do 20 pushups with someone sitting on your back",
        "Let the group tie your ankles together for the next 2 rounds",
        "Get a hickey in a visible place from the person to your left",
        "Put an ice cube in your mouth until it melts (no hands)",
        "Let someone draw a mustache on your face with permanent marker",
        "Wear your shoes on your hands for the next 10 minutes",
        "Do a sexy dance with a broom/stick as your partner",
        "Let the group choose one item from your closet you must wear next time you go out",
        "Get a piggyback ride from the heaviest person in the room",
        "Let someone pour a drink down your shirt/pants",
        "Do 10 squats while holding someone's legs",
        "Let the group choose an embarrassing notification sound for your phone",

        // Social Dares (25)
        "Call your ex and say you still love them (put on speaker)",
        "Post 'I wet the bed last night' on your social media for 1 hour",
        "Let the group send a text to your mom from your phone",
        "Go outside and shout your dirtiest fantasy at the top of your lungs",
        "Call a random number and try to sell them your underwear",
        "Let the group create a dating profile using your real photos",
        "Text your boss 'I quit' then immediately say it was a dare",
        "Go to the nearest store and ask where the condoms are in a baby voice",
        "Let someone post an embarrassing childhood photo on your Instagram",
        "Call a pizza place and order using only sexual innuendos",
        "Send your last nude to the third person in your contacts",
        "Let the group reply to 3 of your Instagram DMs",
        "Go outside and propose to the first person you see",
        "Call your parents and say you're dropping out to become a stripper",
        "Let someone change your Tinder bio to something humiliating",
        "Text your crush describing your dream wedding with them",
        "Post a screenshot of your browser history on your story",
        "Call a restaurant and ask if they serve 'hot beef injections'",
        "Let the group rename a contact in your phone",
        "Send 'I think we should see other people' to your most recent text",
        "Call a friend and confess to a crime you didn't commit",
        "Post a selfie with the caption 'Just got out of prison'",
        "Text your ex 'I still have your underwear'",
        "Change your profile picture to something the group chooses for 24hrs",
        "Send a voice note moaning to the last person you texted"
    ]
};

// Game State
let currentRound = 1;
let currentQuestion = "";
let currentType = "";

// DOM Elements
const truthBtn = document.getElementById('truth-btn');
const dareBtn = document.getElementById('dare-btn');
const nextBtn = document.getElementById('next-btn');
const questionElement = document.getElementById('question-text');
const counterElement = document.getElementById('current-q');
const card = document.getElementById('question-card');
const disclaimerModal = document.querySelector('.disclaimer-modal');
const agreeBtn = document.getElementById('agree-btn');

// Initialize
disclaimerModal.style.display = 'flex';


// Event Listeners
agreeBtn.addEventListener('click', () => {
    localStorage.setItem('todAgreed', 'true');
    disclaimerModal.style.display = 'none';
});

truthBtn.addEventListener('click', () => {
    currentType = 'truth';
    drawQuestion();
    toggleTOFButtons(false);
});

dareBtn.addEventListener('click', () => {
    currentType = 'dare';
    drawQuestion();
    toggleTOFButtons(false);
});

nextBtn.addEventListener('click', () => {
    if (currentRound >= 20) {
        endGame();
        return;
    }
    currentRound++;
    counterElement.textContent = currentRound;
    resetRound();
});

function drawQuestion() {
    const pool = questions[currentType];
    const randomIndex = Math.floor(Math.random() * pool.length);
    currentQuestion = pool[randomIndex];

    // Remove the question to avoid repeats
    questions[currentType].splice(randomIndex, 1);

    questionElement.textContent = currentQuestion;
    card.classList.add('flip');

    setTimeout(() => {
        card.classList.remove('flip');
    }, 300);
}

function toggleTOFButtons(show) {
    document.querySelector('.tof-selection').style.display = show ? 'block' : 'none';
    nextBtn.style.display = show ? 'none' : 'block';
}

function resetRound() {
    toggleTOFButtons(true);
    questionElement.textContent = "Will you choose Truth or Dare?";
}

function endGame() {
    questionElement.textContent = "Game Over! Want to play again?";
    nextBtn.textContent = "PLAY AGAIN";
    currentRound = 1;
    counterElement.textContent = currentRound;
    resetRound();
}

// Card flip animation
card.addEventListener('click', () => {
    card.classList.add('flip');
    setTimeout(() => {
        card.classList.remove('flip');
    }, 300);
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