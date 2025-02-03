let storyState = "start"; // Variable to track the progress

// Function to update the story text and choices based on the user's choice
function updateStory(newStory, choices) {
    document.getElementById("story-text").innerHTML = newStory;
    let choicesHTML = "";

    // Dynamically generate buttons based on choices array
    choices.forEach(choice => {
        choicesHTML += `<button onclick="${choice.functionName}()">${choice.text}</button>`;
    });

    document.getElementById("choices").innerHTML = choicesHTML;
}

// Initial story
function startStory() {
    storyState = "start";
    updateStory(
        "You wake up in a mysterious forest. You can hear the sound of a river nearby. What will you do?",
        [
            {text: "Follow the river", functionName: "followRiver"},
            {text: "Look for food", functionName: "lookForFood"},
            {text: "Rest under a tree", functionName: "restUnderTree"}
        ]
    );
}

// Follow the river choice
function followRiver() {
    storyState = "river";
    updateStory(
        "You follow the river downstream and find a boat. Do you take the boat or keep walking along the bank?",
        [
            {text: "Take the boat", functionName: "takeBoat"},
            {text: "Keep walking", functionName: "keepWalkingAlongRiver"},
            {text: "Go back", functionName: "startStory"}
        ]
    );
}

// Look for food choice
function lookForFood() {
    storyState = "food";
    updateStory(
        "You find some berries growing nearby. They look safe to eat. Do you eat them or keep searching?",
        [
            {text: "Eat the berries", functionName: "eatBerries"},
            {text: "Keep searching", functionName: "keepSearchingForFood"},
            {text: "Go back", functionName: "startStory"}
        ]
    );
}

// Rest under a tree choice
function restUnderTree() {
    storyState = "rest";
    updateStory(
        "You rest under the tree and feel refreshed. Suddenly, a shadow looms over you. It's a friendly wolf. What will you do?",
        [
            {text: "Pet the wolf", functionName: "petWolf"},
            {text: "Run away", functionName: "runAway"},
            {text: "Go back", functionName: "startStory"}
        ]
    );
}

// Take the boat choice
function takeBoat() {
    storyState = "boat";
    updateStory(
        "You sail down the river and reach a small island. There's a cave in front of you. Do you enter the cave or explore the island?",
        [
            {text: "Enter the cave", functionName: "enterCave"},
            {text: "Explore the island", functionName: "exploreIsland"},
            {text: "Go back", functionName: "followRiver"}
        ]
    );
}

// Keep walking along the river choice
function keepWalkingAlongRiver() {
    storyState = "walk";
    updateStory(
        "You walk further down the river and discover a village. Do you approach the village or keep walking?",
        [
            {text: "Approach the village", functionName: "approachVillage"},
            {text: "Keep walking", functionName: "keepWalkingAlongRiver"},
            {text: "Go back", functionName: "followRiver"}
        ]
    );
}

// Eat the berries choice
function eatBerries() {
    storyState = "eatBerries";
    updateStory(
        "The berries are delicious, but suddenly you start feeling dizzy. It seems they were poisoned! You fall unconscious.",
        [
            {text: "Try to wake up", functionName: "tryToWakeUp"},
            {text: "Rest again", functionName: "restUnderTree"},
            {text: "Go back", functionName: "lookForFood"}
        ]
    );
}

// Keep searching for food choice
function keepSearchingForFood() {
    storyState = "searching";
    updateStory(
        "You search the forest for more food and find some mushrooms. Do you eat them or leave them alone?",
        [
            {text: "Eat the mushrooms", functionName: "eatMushrooms"},
            {text: "Leave them alone", functionName: "leaveMushrooms"},
            {text: "Go back", functionName: "lookForFood"}
        ]
    );
}

// Pet the wolf choice
function petWolf() {
    storyState = "petWolf";
    updateStory(
        "The wolf seems friendly! It leads you to a hidden treasure chest. Do you open the chest or leave it alone?",
        [
            {text: "Open the chest", functionName: "openChest"},
            {text: "Leave it alone", functionName: "leaveChest"},
            {text: "Go back", functionName: "restUnderTree"}
        ]
    );
}

// Run away choice
function runAway() {
    storyState = "runAway";
    updateStory(
        "You run away as fast as you can, but you trip and fall. A group of animals come to your aid. Do you thank them or run further?",
        [
            {text: "Thank them", functionName: "thankAnimals"},
            {text: "Run further", functionName: "runAway"},
            {text: "Go back", functionName: "restUnderTree"}
        ]
    );
}

// Go back to the initial point (if needed)
function goBack() {
    storyState = "start";
    updateStory(
        "You wake up in a mysterious forest. You can hear the sound of a river nearby. What will you do?",
        [
            {text: "Follow the river", functionName: "followRiver"},
            {text: "Look for food", functionName: "lookForFood"},
            {text: "Rest under a tree", functionName: "restUnderTree"}
        ]
    );
}

// Initialize the game when the page loads
startStory();
