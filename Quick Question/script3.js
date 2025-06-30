// Function to store selected mode and navigate to game page
function selectMode(mode) {
    localStorage.setItem("selectedMode", mode); // Store mode selection
    window.location.href = "game.html"; // Redirect to game page
}
