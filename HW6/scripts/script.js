var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];

var blankImagePath = "images/shroom.jpg";
var firstNumber = -1;
var secondNumber = -1;
var score = 0;
var allFound = 0;
var attempts = 0;

// JSON declaration
var player = {"firstname": "", "lastname": "", "age": 0, "score": 0};
var actualImages = [];

function printBlanks() {
    createRandomImageArray();
    for (var i = 0; i < imageTags.length; i++) {
        document.getElementById(imageTags[i]).src = blankImagePath;
    }
}

function createRandomImageArray() {
    actualImages = [];  // Reset the array
    var actualImagePath = ["images/wizard.jpg", "images/butterfly.jpg", "images/dragon.jpg", "images/shroom.jpg", "images/witch.jpg", "images/fairy.jpg"];
    var count = Array(actualImagePath.length).fill(0);

    while (actualImages.length < 12) {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);

        if (count[randomNumber] < 2) {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}

function flipImage(number) {
    if (firstNumber >= 0 && secondNumber < 0) {
        secondNumber = number;
        document.getElementById(imageTags[secondNumber]).src = actualImages[secondNumber];
            var playerInfo = localStorage.getItem("playerInfo");
            if (playerInfo) {
                player = JSON.parse(playerInfo);
            }
        // Increase attempts every time two cards are flipped
        attempts++;

    
        if (actualImages[secondNumber] !== actualImages[firstNumber]) {
            score++;
            setTimeout(imagesDisappear, 1000); // Wait 1 second before flipping back
        } else {
            score++;
            allFound++;

            // Reset selection for next turn
            firstNumber = -1;
            secondNumber = -1;

            // Check if the game is over
            if (allFound === actualImages.length / 2) {
                player.score = score;
                player.attempts = attempts; // Save attempts
                localStorage.setItem("playerInfo", JSON.stringify(player)); // Store in localStorage
                window.location.href = "page3.html"; // Redirect to results page
            }
        }
    } else if (firstNumber < 0) {
        firstNumber = number;
        document.getElementById(imageTags[firstNumber]).src = actualImages[firstNumber];
    }
}
// Function to flip unmatched images back over
function imagesDisappear() {
    document.getElementById(imageTags[firstNumber]).src = blankImagePath;
    document.getElementById(imageTags[secondNumber]).src = blankImagePath;

    // Reset selection AFTER flipping back
    firstNumber = -1;
    secondNumber = -1;
}

// Save player details and redirect to game page
function saveUserDetails() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;

    // Store player details in localStorage
    var player = {
        firstname: firstName,
        lastname: lastName,
        age: age,
        score: 0,
        attempts: 0
    };
    localStorage.setItem("playerInfo", JSON.stringify(player));

    // Redirect to the game page
    window.location.href = "game.html"; // Ensure this is the correct filename
}

// Load player info

function playerInfo() {
    var playerInformation = localStorage.getItem("playerInfo");
    if (playerInformation) {
        player = JSON.parse(playerInformation);
        var str = "Name: " + player.firstname + " " + player.lastname + "<br>" +
                  "Age: " + player.age + "<br>" +
                  "Score: " + player.score + "<br>" +
                  "Attempts: " + player.attempts;
        if (document.getElementById("endInformation") !== null) {
            document.getElementById("endInformation").innerHTML = str;
        }
    }
}