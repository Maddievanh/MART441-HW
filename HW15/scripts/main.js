// Declare game variables
var player;
var stars;
var bombs;
var platforms;
var cursors;
var level = 1;
var levelText;
var score = 0;
var scoreText;
var gameOver = false;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);


function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('player', 'assets/fairy.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('magic', 'assets/magic.png');
    this.load.image('cloud', 'assets/cloud.png'); // New cloud platform!
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
}

function create() {
    this.add.image(400, 300, 'background');

    platforms = this.physics.add.staticGroup();


let cloud1 = platforms.create(100, 500, 'cloud').setScale(0.5);
cloud1.refreshBody();
cloud1.body.setSize(cloud1.width * 0.6, cloud1.height * 0.6);
cloud1.body.setOffset(20, 10);

let cloud2 = platforms.create(400, 500, 'cloud').setScale(0.5 );
cloud2.refreshBody();
cloud2.body.setSize(cloud2.width * 0.6, cloud2.height * 0.6);
cloud2.body.setOffset(20, 10);

let cloud3 = platforms.create(760, 500, 'cloud').setScale(0.5);
cloud3.refreshBody();
cloud3.body.setSize(cloud3.width * 0.6, cloud3.height * 0.6);
cloud3.body.setOffset(20, 10);


let cloud4 = platforms.create(300, 400, 'cloud').setScale(0.5);
cloud4.refreshBody();
cloud4.body.setSize(cloud4.width * 0.6, cloud4.height * 0.6);
cloud4.body.setOffset(20, 10);

let cloud5 = platforms.create(600, 350, 'cloud').setScale(0.5);
cloud5.refreshBody();
cloud5.body.setSize(cloud5.width * 0.6, cloud5.height * 0.5);
cloud5.body.setOffset(20, 10);



    player = this.physics.add.sprite(90, 450, 'player').setScale(1.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);


    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    player.anims.play('fly', true);


    stars = this.physics.add.group({
        key: 'star',
        repeat: 5,
        setXY: { x: 50, y: 0, stepX: 125 }
    });

    stars.children.iterate(function (child) {
        child.setScale(0.5);   
         child.setGravityY(300);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.body.checkCollision.down = true;
        child.setCollideWorldBounds(true);
    });


    bombs = this.physics.add.group();
    bombs.create(200, 0, 'bomb').setScale(0.2);
    bombs.create(30, 0, 'bomb').setScale(0.2);

    this.time.delayedCall(4000, () => {
        let delayedBomb = bombs.create(495, 0, 'bomb').setScale(0.2);
        delayedBomb.setGravityY(300);
        delayedBomb.setCollideWorldBounds(true);
        delayedBomb.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    }, [], this);

    bombs.children.iterate(function (child) {
        child.setGravityY(300);
        child.setCollideWorldBounds(true);
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });


    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);


    this.physics.add.collider(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);


   
    levelText = this.add.text(16, 16, 'Level: ' + level, { fontSize: '24px', fill: '#fff' });
    scoreText = this.add.text(16, 44, 'Score: ' + score, { fontSize: '24px', fill: '#fff' });

 
    cursors = this.input.keyboard.createCursorKeys();
    cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}


function update() {
    if (gameOver) return;

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.space.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
    }

    if (stars.countActive(true) === 0) {
        level++;
        levelText.setText('Level: ' + level);
        score += 100;
        scoreText.setText('Score: ' + score);
    
        this.time.delayedCall(100, () => {
            this.scene.restart();
        });
    }
}


function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitBomb(player, bomb) {
    player.setTint(0xff0000);
    this.time.delayedCall(500, () => {
        this.scene.restart();
    });
}