
var canvas;
var ctx;
var player;
var obstacles = [];
var collectibles = [];
var direction;
var score = 0;

$(document).ready(function () {
    setup();

    $(this).keypress(function (event) {
        getKey(event);
    });
});

function Square(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
}

function setup() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    player = new Square(50, 50, 40, 40, "#0000FF");

    $.getJSON("data/information.json", function (data) {
        for (var i = 0; i < data.squares.length; i++) {
            var size = data.squares[i].size;
            obstacles.push(new Square(
                data.squares[i].x,
                data.squares[i].y,
                size,
                size,
                "#FF0000"
            ));
        }

        $.getJSON("data/collectibles.json", function (data2) {
            for (var j = 0; j < data2.length; j++) {
                collectibles.push(new Square(
                    data2[j].x,
                    data2[j].y,
                    data2[j].size,
                    data2[j].size,
                    "#00FF00"
                ));
            }

            drawSquare();
        });
    });
}

function getKey(event) {
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char).toLowerCase();
    var oldX = player.x;
    var oldY = player.y;

    if (actualLetter == "w") {
        player.y -= 10;
        direction = "up";
    }
    if (actualLetter == "s") {
        player.y += 10;
        direction = "down";
    }
    if (actualLetter == "a") {
        player.x -= 10;
        direction = "left";
    }
    if (actualLetter == "d") {
        player.x += 10;
        direction = "right";
    }

    var collided = false;
    for (var i = 0; i < obstacles.length; i++) {
        if (hasCollided(player, obstacles[i])) {
            collided = true;
            break;
        }
    }
    if (collided) {
        player.x = oldX;
        player.y = oldY;
    }


    for (var j = collectibles.length - 1; j >= 0; j--) {
        if (hasCollided(player, collectibles[j])) {
            collectibles.splice(j, 1);
            score += 1;
            document.getElementById("score").textContent = score;
        }
    }

    drawSquare();
}

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    for (var i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = obstacles[i].color;
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }

    for (var j = 0; j < collectibles.length; j++) {
        ctx.fillStyle = collectibles[j].color;
        ctx.fillRect(collectibles[j].x, collectibles[j].y, collectibles[j].width, collectibles[j].height);
    }

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 30);
}

function hasCollided(obj1, obj2) {
    return !(
        (obj1.y + obj1.height < obj2.y) ||
        (obj1.y > obj2.y + obj2.height) ||
        (obj1.x + obj1.width < obj2.x) ||
        (obj1.x > obj2.x + obj2.width)
    );
}
