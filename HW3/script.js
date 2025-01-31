// script.js
let path = "";

function makeChoice(choice) {
    path += choice;

    let storyText = "";
    let imageSrc = "";
    let resultText = "";

    if (path === "continue") {
        storyText = "You find a hidden cave.";
        imageSrc = "cave.jpg";
    } else if (path === "center") {
        storyText = "You encounter a friendly gnome.";
        imageSrc = "gnome.jpg";
    } else if (path === "leave") {
        storyText = "You stumble upon a treasure chest!";
        imageSrc = "treasure.jpg";
        resultText = "You win!";
    } else if (path === "leftleft") {
      storyText = "The cave is dark and spooky.";
      imageSrc = "darkcave.jpg";
      resultText = "You are scared!";
    } else if (path === "leftcenter" || path === "centercenter" || path === "rightcenter" || path === "leftright" || path === "centerleft" || path === "centerright" || path === "rightleft" || path === "rightright" || path === "leftleftleft" || path === "leftleftcenter" || path === "leftleftright" || path === "leftcenterleft" || path === "leftcentercenter" || path === "leftcenterright" || path === "leftrightleft" || path === "leftrightcenter" || path === "leftrightright" || path === "centerleftleft" || path === "centerleftcenter" || path === "centerleftright" || path === "centercenterleft" || path === "centercentercenter" || path === "centercenterright" || path === "centerrightleft" || path === "centerrightcenter" || path === "centerrightright" || path === "rightleftleft" || path === "rightleftcenter" || path === "rightleftright" || path === "rightrightleft" || path === "rightrightcenter" || path === "rightrightright" || path === "rightleftleft" || path === "rightleftcenter" || path === "rightleftright" || path === "rightrightleft" || path === "rightrightcenter" || path === "rightrightright") {
      storyText = "You are lost.";
      imageSrc = "lost.jpg";
      resultText = "Game Over";
    }


    document.getElementById("story").textContent = storyText;
    document.getElementById("scene").src = imageSrc;
    document.getElementById("result").textContent = resultText;
}