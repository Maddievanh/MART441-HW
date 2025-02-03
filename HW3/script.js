// let story = 0 is the starting point. we continue with 1,2,3 as the story progresses bc it goes through different points. 
let story = 0; 
function makeChoice(choice) {
    // story ++ means the story (var) moves up by 1, every time makechoice is called. tracks each step of story so we can use diff text
    story++; 
    let storyText = document.getElementById("story-text"); // story text displayed on page
    let storyImage = document.getElementById("story-image"); //image displayed 
    let choicesDiv = document.getElementById("choices"); // choice displayed. matches story progress

    // refers to choices ID in html. An empty string removes all existing content inside the elem. Any prev buttons will be removed from page. 
    choicesDiv.innerHTML = '';

    // == means val of story is 1. val and type. when story is incremented story++, it becomes 1. as it progresses, the value goes up ++ (2,3)
    if (story === 1) {
        if (choice === 'Say hello') {
            storyText.textContent = "The frog welcomes you! He asks if you can help make tea. Do you";
            storyImage.src = "images/frog.jpg";
            createButtons('Collect herbs for him', 'Say no thank you.');
        } else if (choice === 'Go') {
            storyText.textContent = "You begin to head home, but you start to feel curious. Do you";
            storyImage.src = "images/confused.jpg";
            createButtons('Go back', 'Continue home');
        }

       
    } else if (story === 2) {
        if (choice === 'Collect herbs for him') {
            storyText.textContent = "You find some yummy herbs. Time to make some tea. Do you wish to stay and drink it?";
            storyImage.src = "images/herbs.jpg";
            createButtons('Yes', 'No, take me home.');
        } else if (choice === 'Say no thank you.') {
            storyText.textContent = "You decide to sit and talk, do you";
            storyImage.src = "images/talking.jpg";
            createButtons('Ask about his family', 'Ask about his home');
        } else if (choice === 'Go back') {
            storyText.textContent = "When you head back, do you";
            storyImage.src = "images/goback.jpg";
            createButtons('Sit and watch him out of curiosity', 'Go say hi');
        } else if (choice === 'Continue home') {
            storyText.textContent = "Are you sure?";
            storyImage.src = "images/walkingaway.jpg";
            createButtons('Yes, take me home.', 'Let me try again.');
        }
    } else if (story === 3) {
        if (choice === 'Yes') {
            storyText.textContent = "You sit and drink tea. You two become very close friends.";
            storyImage.src = "images/friends.jpg";
        } else if (choice === 'No, take me home.') {
            storyText.textContent = "Sorry to see you go.";
        } else if (choice === 'Ask about his family') {
            storyText.textContent = "His family is small, living in a nearby pond. He takes you to have dinner with them.";
            storyImage.src = "images/dinner.jpg"
        } else if (choice === 'Ask about his home') {
            storyText.textContent = "He tells you his home is in a nearby pond.";
            storyImage.src ="images/family.jpg";
        } else if (choice === 'Sit and watch him out of curiosity') {
            storyText.textContent = "You can tell the frog is friendly, you end up going home anyways. ";
            storyImage.src="images/walkingaway.jpg"
        } else if (choice === 'Go say hi') {
            storyText.textContent = "You approach the frog and he welcomes you to spend time with him.";
            storyImage.src="images/friends.jpg"
        } else if (choice === 'Yes, take me home.') {
            storyText.textContent = "Thanks for playing the game!";
        } else if (choice === 'Let me try again. ') {
            storyText.textContent = "Great!";
            storyImage.src = "images/friends.jpg";
        }

    }
}


/* this function is what creates the buttons to click.
 Let choicesdiv accesses DOM
 option1 and option2 rep the values for the button.
 use $ to for easier reading. $ means embed vars into a string. instead of \'' '\')>'.....
${option1}: insterts VALUE of opt1 into string
${opt1} etc inserts the RESULT to the string
 */

function createButtons(option1, option2) {
    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML += `<button onclick="makeChoice('${option1}')">${option1}</button>`;
    choicesDiv.innerHTML += `<button onclick="makeChoice('${option2}')">${option2}</button>`;
}

