let storyStep = 0;

// function with 3 parameters, updates image, text, and style
function updateStory(text, image, color) {
    let storyElement = document.getElementById("storyText");

    storyElement.textContent = text;
    document.getElementById("storyImage").src = image;
    document.getElementById("userInput").value = "";

    // change text color
    document.getElementById("storyText").style.color = color;
}

function handleUserChoice() {
    let userInput = document.getElementById("userInput").value.toLowerCase().trim();

    // Validate input using a while loop
    while (!isValidInput(userInput)) {
        alert("Invalid choice. Please enter: 'hi', 'leave', 'help', 'walk', 'stay', 'home', 'tea', 'back', 'path', 'go', 'yes', or 'no'.");
        userInput = prompt("Try again:").toLowerCase().trim(); // to lower case means whatevrr is typed will be input as lower case. trim will leave out any spaces that were input before or after word. 
    }

    let storyText = "";
    let imageSrc = "images/fairywalk.PNG";
    let textColor = "black";

    switch (storyStep) {
        case 0:
            if (userInput === "hi") {
                storyText = "You decide to sit by the frog. You exchange names, and he asks if you will collect herbs for his tea? (yes/no)";
                imageSrc = "images/talking.jpeg";
                textColor = "darkblue";
                storyStep = 1;
            } else if (userInput === "leave") {
                storyText = "You decide to walk away. As you are walking, you hear something down the path. Do you try and get help from the frog or keep walking? (help/walk)";
                imageSrc = "images/darkforest.jpeg";
                textColor = "white";
                storyStep = 1;
            }
            break;

        case 1:
            if (userInput === "yes") {
                storyText = "The frog leads you to a secret path in the forest. Do you want to go? (yes/no)";
                imageSrc = "images/path.jpeg";
                textColor = "darkblue";
                storyStep = 2;
            } else if (userInput === "no") {
                storyText = "The frog tells you to continue on your way. Press restart to try again!";
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "walk") {
                storyText = "You decide not to get help and keep walking. A goblin runs out! Do you turn back or run home? (back/home)";
                imageSrc = "images/goblinscare.PNG"; // goblin
                textColor = "white";
                storyStep = 2;
            } else if (userInput === "help") {
                storyText = "You go back to the frog for help! He offers to take a different path with you. Do you take the path or go home? (path/go)";
                imageSrc = "images/path.jpg";
                textColor = "darkblue";
                storyStep = 2;
            }
            break;

        case 2:
            if (userInput === "yes") {
                storyText = "You find a rare and magical herb! Do you pick it to put in your tea? (yes/no)";
                imageSrc = "images/herb.PNG"; // add herb
                textColor = "darkblue";
                storyStep = 3;
            } else if (userInput === "no") {
                storyText = "The frog says he has to go. You decide to walk home. Click restart to try the story again!";
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "back") {
                storyText = "You turn back! The frog sees you and makes the goblin disappear. Do you thank the frog by making tea or go home? (tea/home)";
                imageSrc = "images/froggoblin.PNG"; 
                textColor = "darkblue";
                storyStep = 3;
            } else if (userInput === "home") {
                storyText = "You decide to run home! The goblin chases and catches you. Oh no! Click restart to try again.";
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "path") {
                storyText = "The frog leads you down a different path where he finds his friend, a gnome. The gnome offers you a special drink. Do you stay or leave? (stay/leave)";
                imageSrc = "images/fairygnometea.PNG"; // tea
                textColor = "darkblue";
                storyStep = 3;
            } else if (userInput === "go") {
                storyText = "You choose not to go with the frog. The goblin chases you all the way home. Click restart to try again!";
                textColor = "white";
                storyStep = 5;
            }
            break;

        case 3:
            if (userInput === "yes") {
                storyText = "You steep the herb in your tea. Your wings feel tingly. Suddenly, you are healed! Do you stay with the frog or go home? (stay/home)";
                imageSrc = "images/fairydrinkalone.PNG";
                textColor = "darkblue";
                storyStep = 4;
            } else if (userInput === "no") {
                storyText = "You decide not to put the herb in your tea. You and the frog chat until it's time to head home. Click restart to try again!";
                imageSrc = "images/fairytea.jpeg";
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "tea") {
                storyText = "You make tea for the frog from herbs you found while walking. You enjoy tea together, and he fixes your wings. Click restart to try a different path!";
                imageSrc = "images/frogfixwings.PNG"; 
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "home") {
                storyText = "You go home, leaving the frog upset. Click restart to try again!";
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "stay") {
                storyText = "You drink the tea the gnome gave you and begin to fly! Your wings were fixed. Yay! Click restart to try a different path!";
                imageSrc = "images/flyone.PNG";  
                textColor = "white";
                storyStep = 5;
            } else if (userInput === "leave") {
                storyText = "You walk away with broken wings, leaving the frog and gnome. Click restart to try again!";
                textColor = "white";
                storyStep = 5;
            }
            break;

        case 4:
            if (userInput === "stay") {
                storyText = "You stay and spend time with the frog. When it's time to leave, you are able to fly again! Click restart to try a different path!";
                imageSrc = "images/flytwo.PNG"; 
                textColor = "darkblue";
            } else if (userInput === "home") {
                storyText = "You go home with your healed wings after thanking the frog. Click restart to try a different path!";
                imageSrc = "images/goodbye.PNG";   
                textColor = "white";
            }
            storyStep = 5;
            break;

        case 5:
            restartStory();
            break;
    }

    updateStory(storyText, imageSrc, textColor);
}

function isValidInput(input) {
    const validChoices = ["hi", "leave", "help", "walk", "stay", "home", "go", "yes", "tea", "path", "back", "no"];
    return validChoices.includes(input);
}

function restartStory() {
    storyStep = 0;
    updateStory("One day as you walk along a stream trying to find something to cure your hurt wings, you see a lonely frog. Do you say hi or leave?", "images/fairywalk.PNG", "black");
    document.getElementById("restartButton").style.display = "block";
}
