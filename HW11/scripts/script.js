class Shape {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    setX(newX) { this.x = newX; }
    setY(newY) { this.y = newY; }
    setWidth(w) { this.width = w; }
    setHeight(h) { this.height = h; }
  
    get theX() { return this.x; }
    get theY() { return this.y; }
    get theWidth() { return this.width; }
    get theHeight() { return this.height; }
    get theColor() { return this.color; }
  }
  
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  let user = new Shape(50, 50, 30, 30, "blue");       // Circle (user-controlled)
  let enemy = new Shape(200, 150, 40, 40, "green");     // Triangle (autonomous)
  
  function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw user (circle)
    ctx.fillStyle = user.theColor;
    ctx.beginPath();
    ctx.arc(user.theX + user.theWidth / 2, user.theY + user.theHeight / 2, user.theWidth / 2, 0, Math.PI * 2);
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
  
    // Draw enemy (triangle)
    ctx.fillStyle = enemy.theColor;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(enemy.theX + enemy.theWidth / 2, enemy.theY);
    ctx.lineTo(enemy.theX, enemy.theY + enemy.theHeight);
    ctx.lineTo(enemy.theX + enemy.theWidth, enemy.theY + enemy.theHeight);
    ctx.closePath();
    ctx.fill();
  }
  
  function moveEnemy() {
    const maxX = canvas.width - enemy.theWidth;
    const maxY = canvas.height - enemy.theHeight;
  
    enemy.setX(Math.floor(Math.random() * maxX));
    enemy.setY(Math.floor(Math.random() * maxY));
  
    drawShapes();
  }
  
  function checkCollision(obj1, obj2) {
    return !(
      (obj1.theY + obj1.theHeight < obj2.theY) ||
      (obj1.theY > obj2.theY + obj2.theHeight) ||
      (obj1.theX + obj1.theWidth < obj2.theX) ||
      (obj1.theX > obj2.theX + obj2.theWidth)
    );
  }
  
  function randomColor() {
    return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
  }
  
  function handleKey(e) {
    const key = e.key.toLowerCase();
    const step = 10;
  
    if (key === 'w' && user.theY > 0) user.setY(user.theY - step);
    if (key === 's' && user.theY + user.theHeight < canvas.height) user.setY(user.theY + step);
    if (key === 'a' && user.theX > 0) user.setX(user.theX - step);
    if (key === 'd' && user.theX + user.theWidth < canvas.width) user.setX(user.theX + step);
  
    if (checkCollision(user, enemy)) {
      canvas.style.backgroundColor = randomColor();
      user.setWidth(Math.max(10, user.theWidth - 2));
      user.setHeight(Math.max(10, user.theHeight - 2));
      enemy.setWidth(enemy.theWidth + 2);
      enemy.setHeight(enemy.theHeight + 2);
    }
  
    drawShapes();
  }
  
  $(document).ready(() => {
    drawShapes();
    setInterval(moveEnemy, 4000);
    $(document).on('keydown', handleKey);
  });

   $("#playButton").on("click", function () {
    const song = document.getElementById("song");
    song.muted = false;
    song.play().catch(err => {
      console.error("Playback failed:", err);
    });
  });