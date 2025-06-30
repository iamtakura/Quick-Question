document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const modeButtons = document.querySelectorAll('.mode-btn');
    const rulesContent = document.getElementById('rules-content');

    // Rules data for all modes
    const rulesData = {
        strangers: {
            title: "Strangers Mode Rules",
            audience: "Perfect for: People who just met, icebreaker events, or networking situations",
            questions: "Questions will be: Lighthearted, non-personal, and fun to help break the ice",
            instructions: "How to play:\n1. Take turns answering questions\n2. Keep answers appropriate for public settings\n3. Expand beyond yes/no answers",
            warning: "🚫 No yes/no answers allowed! Explain your responses.",
            link: "game.html"
        },
        friends: {
            title: "Friends Mode Rules",
            audience: "Perfect for: Close friends, friend groups, or teammates",
            questions: "Questions will be: Personal but not too deep, fun revelations about your friendship",
            instructions: "How to play:\n1. Answer honestly but keep it fun\n2. No judgment zone\n3. Elaborate on your answers",
            warning: "🚫 Single-word answers will be punished with embarrassing follow-up questions!",
            link: "friends.html"
        },
        dating: {
            title: "Dating Mode Rules",
            audience: "Perfect for: New couples, people getting to know each other romantically",
            questions: "Questions will be: Flirty, slightly personal, but still comfortable",
            instructions: "How to play:\n1. Be honest but maintain boundaries\n2. Respect each other's comfort levels\n3. Use this to spark interesting conversations",
            warning: "🚫 'I don't know' is not an acceptable answer!",
            link: "dating.html"
        },
        relationship: {
            title: "Relationship Mode Rules",
            audience: "Perfect for: Established couples looking to deepen their connection",
            questions: "Questions will be: Deep, meaningful, and sometimes challenging",
            instructions: "How to play:\n1. Create a safe space before starting\n2. Be completely honest\n3. Use the opportunity for growth",
            warning: "🚫 Avoid defensive responses - this is about understanding each other",
            link: "relationship.html"
        },
        "truth-dare": {
            title: "Truth or Dare Rules",
            audience: "Perfect for: Wild friend groups who enjoy challenges",
            questions: "Content will be: Hilarious dares and revealing truths",
            instructions: "How to play:\n1. Choose truth or dare when it's your turn\n2. Complete your challenge within 60 seconds\n3. No backing out once you've chosen!",
            warning: "🔥 Warning: This mode gets intense quickly! Play at your own risk",
            link: "truth-dare.html"
        }
    };

    // Handle mode button clicks
    modeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent immediate document click

            // Collapse any open dropdown first
            rulesContent.style.maxHeight = null;

            // Set small timeout before expanding new content
            setTimeout(() => {
                const mode = this.dataset.mode;
                const data = rulesData[mode];

                // Generate rules content HTML
                rulesContent.innerHTML = `
                    <div class="rules-content">
                        <h3>${data.title}</h3>
                        <p><strong>${data.audience}</strong></p>
                        <p>${data.questions}</p>
                        <ul class="rules-list">
                            ${data.instructions.split('\n').map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <p class="warning">${data.warning}</p>
                        <a href="${data.link}" class="play-now-btn">
                            Play ${mode.replace('-', ' ')} Mode Now →
                        </a>
                    </div>
                `;

                // Animate dropdown opening
                rulesContent.style.maxHeight = rulesContent.scrollHeight + "px";

                // Scroll to dropdown on mobile
                if (window.innerWidth < 768) {
                    rulesContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 10);
        });
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function () {
        rulesContent.style.maxHeight = null;
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            rulesContent.style.maxHeight = null;
        }
    });
});
// Add this at the end of the file
function adjustContentForFooter() {
    const footerHeight = document.querySelector('footer').offsetHeight;
    document.body.style.paddingBottom = `${footerHeight}px`;

    // Adjust dropdown position if open
    const rulesContent = document.getElementById('rules-content');
    if (rulesContent.style.maxHeight && rulesContent.style.maxHeight !== '0px') {
        rulesContent.scrollIntoView({ block: 'nearest' });
    }
}

// Run on load and resize
window.addEventListener('load', adjustContentForFooter);
window.addEventListener('resize', adjustContentForFooter);