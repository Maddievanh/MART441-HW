
var myViewFinderArray = new Array();


class ViewFinder {
    constructor(title, image, description, author, imageYear) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.imageYear = imageYear;
    }

   
    toString() {
        return `<h2>${this.title}</h2>
                <img src='${this.image}' alt='${this.title}' width='300'>
                <p><strong>Description:</strong> ${this.description}</p>
                <p><strong>Author:</strong> ${this.author}</p>
                <p><strong>Year:</strong> ${this.imageYear}</p>`;
    }
}

function initializeArray() {

    myViewFinderArray.push(new ViewFinder(
        "Peaceful protest JAX, FL", "images/Love_sign.jpg", "A photo captured at a peaceful protest in Florida, advocating for equality.", "Cody Pulliam", 2020 ));
    
    myViewFinderArray.push(new ViewFinder(
        "I can't breathe", "images/Floyd2.jpg", "A painting representing George Floyd ad his senseless death.", "Láolú Senbanjo", 2020));
    
    myViewFinderArray.push(new ViewFinder(
        "Men and Boots", "images/Boots.jpg", "Photo taken to represent both feminine and masculine energies for a unique expression on gender roles", "Ricky Cohete", 2017));
    
    myViewFinderArray.push(new ViewFinder(
        "Conversation", "images/Twiggs.jpg", "A tribute painting to those who lost their lives in the shooting at Mother Emanuel Church in Charleston, South Carolina", "Leo Twiggs", 2018));
    
    myViewFinderArray.push(new ViewFinder(
        "Love & Bond", "images/embrace.jpg", "convey a message of acceptance and inclusion through it's composition and symbolism. It embodies the essence of embracing diversity and fostering love and unity within our society", "Faith Gbadero", 2024));
}


function accessInformation() {
    var randomNumber = Math.floor(Math.random() * myViewFinderArray.length);
    document.getElementById("content").innerHTML = myViewFinderArray[randomNumber].toString();
}


window.onload = initializeArray;
