var imageSelector = "#artImage";
var textSelector = "#artText";
var shapeSelector = "#artShape";

var allImages = new Array();
var allTexts = new Array();
var allShapes = new Array();

class ArtElement {
    constructor(selector, content) {
        this.selector = selector;
        this.content = content;
    }

    get theSelector() {
        return this.selector;
    }

    get theContent() {
        return this.content;
    }

    toString() {
        return this.selector + ":" + this.content;
    }
}

function initializeArray() {
    allImages.push(new ArtElement("#artImage", "images/image1.jpg"));
    allImages.push(new ArtElement("#artImage", "images/image2.jpg"));
    allImages.push(new ArtElement("#artImage", "images/image3.jpg"));

    allShapes.push(new ArtElement("#artShape", "square"));
    allShapes.push(new ArtElement("#artShape", "circle"));
    allShapes.push(new ArtElement("#artShape", "triangle"))

    allTexts.push(new ArtElement("#artText", "Australia is wider than the moon, measuring almost 4,000 km in diameter from east to west."));
    allTexts.push(new ArtElement("#artText", "In the 1830s, ketchup was sold as a medicine to treat diarrhea, indigestion, and jaundice."));
    allTexts.push(new ArtElement("#artText", "It's illegal to own just one guinea pig in Switzerland."));
;
}

$(document).ready(function () {
    initializeArray();
    console.log(allImages.length);
    console.log(allImages[0].toString());
    console.log(allTexts[0].toString());
    console.log(allShapes[0].toString());

    var currentImageIndex = 0;
    var currentTextIndex = 0;
    var currentShapeIndex = 0;
    let animationStarted = false;

    $(allImages[0].theSelector).attr("src", allImages[0].theContent);

    $("#start").click(function () {
        if (!animationStarted) {
            animationStarted = true;
            $("#artImage").fadeIn(1000);
            $("#artShape").fadeIn(1000); 
    
            switchImage();
            switchText();
            switchShape();
            moveElements();

            setInterval(moveElements, 2500);
            setInterval(switchImage, 3000);
            setInterval(switchText, 4000);
            setInterval(switchShape, 5000);
        }
    });

    function switchImage() {
        $(imageSelector).fadeOut(1000, function () {
            currentImageIndex = (currentImageIndex + 1) % allImages.length;
            $(imageSelector).attr("src", allImages[currentImageIndex].theContent);
            $(imageSelector).fadeIn(1000);
        });
    }

    function switchText() {
        $(textSelector).fadeOut(1000, function () {
            currentTextIndex = (currentTextIndex + 1) % allTexts.length;
            $(textSelector).text(allTexts[currentTextIndex].theContent);
            $(textSelector).fadeIn(1000);
        });
    }

    function switchShape() {
        $(shapeSelector).fadeOut(1000, function () {
            currentShapeIndex = (currentShapeIndex + 1) % allShapes.length;
            $(shapeSelector).removeClass().addClass("artElement " + allShapes[currentShapeIndex].theContent);
            $(shapeSelector).fadeIn(1000);
        });
    }

    function moveElements() {
        let maxWidth = $(window).width() - 150;
        let maxHeight = $(window).height() - 150;

        $("#artShape").animate({
            left: Math.random() * maxWidth + "px",
            top: Math.random() * maxHeight + "px"
        });

        $("#artText").animate({
            left: Math.random() * maxWidth + "px",
            top: Math.random() * maxHeight + "px"
        });

        $("#artImage").animate({
            left: Math.random() * maxWidth + "px",
            top: Math.random() * maxHeight + "px"
        });
    }
});