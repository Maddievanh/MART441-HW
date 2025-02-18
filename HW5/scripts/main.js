
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];

var blankImagePath = "images/shroom.jpg";

var actualImages = new Array();
    
function printBlanks()
{
    createRandomImageArray();
    for(var i = 0; i < imageTags.length; i++)
    {
        document.getElementById(imageTags[i]).src= blankImagePath;
    }
       
    
    
}

function createRandomImageArray()
{
    var actualImagePath = ["images/wizard.jpg", "images/butterfly.jpg", "images/dragon.jpg", "images/shroom.jpg", "images/witch.jpg", "images/fairy.jpg"];
    var count = Array(actualImagePath.length).fill(0);

    while(actualImages.length < 12)
    {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);

        if(count[randomNumber] < 2)
        {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}
    
  


function flipImage(number)
{
    document.getElementById(imageTags[number]).src= actualImages[number];   
}

