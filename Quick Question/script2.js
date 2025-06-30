// List of predefined questions
const questions = [
    "What’s one thing you’ve always wanted to learn?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a childhood memory that makes you smile?",
    "What’s your dream travel destination and why?",
    "If you had to eat one meal for the rest of your life, what would it be?",
    "What’s one habit you admire in others?",
    "What’s a book or movie that changed your perspective?",
    "If you could have any superpower, what would it be?",
    "What’s a skill you think everyone should learn?",
    "If you won the lottery, what’s the first thing you’d do?"
];

let currentQuestionIndex = 0;

// Function to load the next question with a flip effect
function loadNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const card = document.getElementById("question-card");
        const frontText = document.getElementById("question");
        const backText = document.getElementById("question-back");

        // Set the next question on the back of the card
        backText.innerText = questions[currentQuestionIndex];

        // Flip the card
        card.classList.add("flipped");

        // After animation, update front text and remove flip class
        setTimeout(() => {
            frontText.innerText = questions[currentQuestionIndex];
            card.classList.remove("flipped");
        }, 600); // Matches CSS transition duration

        // Update progress text
        document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} of 10`;

        currentQuestionIndex++;
    } else {
        document.getElementById("question").innerText = "Game Over! Thanks for playing.";
        document.getElementById("next-btn").style.display = "none"; // Hide button when done
    }
}

// Add event listener to button
document.addEventListener("DOMContentLoaded", function () {
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", loadNextQuestion);
    }
});
