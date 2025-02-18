This week when using ChatGPT to recreate the homework, it was different, but also has the same premice! I used your example to base my game on, so it was interesting to see the way they went about it. The way the examlpe was set up was much simpler for me to read and helped me understand how each part was used. The one part I did like about ChatGPT's, is when you click on the matches the cards immediately turned back over. I thought that was a good function to add to a memory game like this.  It also used const instead of var- I have noticed when asking AI to do the homework, const is typically used over var. I enjoy being able to see all of the different ways coders can go about setting essentially the same exact thing up, with slightly differing code. 



CODE: 

document.addEventListener("DOMContentLoaded", function () {
    const imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];
    const blankImagePath = "images/shroom.jpg";
    let actualImages = [];
    let firstSelection = null;
    let secondSelection = null;
    let attempts = 0;
    let matches = 0;

    function createRandomImageArray() {
        const actualImagePath = [
            "images/wizard.jpg", "images/butterfly.jpg", "images/dragon.jpg", "images/shroom.jpg", "images/witch.jpg", "images/fairy.jpg"
        ];
        let count = Array(actualImagePath.length).fill(0);

        while (actualImages.length < 12) {
            let randomNumber = Math.floor(Math.random() * actualImagePath.length);
            if (count[randomNumber] < 2) {
                actualImages.push(actualImagePath[randomNumber]);
                count[randomNumber]++;
            }
        }
    }

    function printBlanks() {
        createRandomImageArray();
        imageTags.forEach(id => {
            document.getElementById(id).src = blankImagePath;
        });
    }

    function flipImage(index) {
        if (firstSelection !== null && secondSelection !== null) return; // Prevent flipping more than two

        let imgElement = document.getElementById(imageTags[index]);
        imgElement.src = actualImages[index];

        if (firstSelection === null) {
            firstSelection = { index, element: imgElement };
        } else {
            secondSelection = { index, element: imgElement };
            checkMatch();
        }
    }

    function checkMatch() {
        attempts++;
        if (actualImages[firstSelection.index] === actualImages[secondSelection.index]) {
            matches++;
            firstSelection = null;
            secondSelection = null;
            if (matches === 6) {
                setTimeout(() => alert(`Game Over! Total Attempts: ${attempts}`), 500);
            }
        } else {
            setTimeout(() => {
                firstSelection.element.src = blankImagePath;
                secondSelection.element.src = blankImagePath;
                firstSelection = null;
                secondSelection = null;
            }, 1000);
        }
    }

    printBlanks();

    imageTags.forEach((id, index) => {
        document.getElementById(id).addEventListener("click", () => flipImage(index));
    });
});
