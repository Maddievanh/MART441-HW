
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

var player;
var stars;
var gems;
var spikes;
var platforms;
var cursors;
var level = 1;
var levelText;
var score = 0;
var scoreText;
var gameOver = false;

var game = new Phaser.Game(config);


function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('elephant', 'assets/elephant.png');
    this.load.image('spike', 'assets/spike.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('gem', 'assets/gem.png'); 
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(100, 500, 'ground');
    platforms.create(500, 500, 'ground');
    platforms.create(400, 500, 'ground');
    platforms.create(760, 500, 'ground');


    player = this.physics.add.sprite(90, 450, 'elephant').setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    stars = this.physics.add.group({
        key: 'star',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
        child.setGravityY(300);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.body.checkCollision.down = true; 
        child.setCollideWorldBounds(true); 
    });
   
    gems = this.physics.add.group();

    gems.create(300, 0, 'gem').setScale(0.5);
    gems.create(500, 0, 'gem').setScale(0.5);
    gems.create(700, 0, 'gem').setScale(0.5);
    
    gems.children.iterate(function (child) {
        child.setGravityY(300);
        child.setCollideWorldBounds(true);
        child.setBounceY(0.6);
    });

    spikes = this.physics.add.group();
    spikes.create(150, 0, 'spike').setScale(0.5);
    spikes.create(640, 0, 'spike').setScale(0.5);
    this.time.delayedCall(4000, () => {
        let delayedSpike = spikes.create(500, 0, 'spike').setScale(0.5);
        delayedSpike.setGravityY(300);
        delayedSpike.setCollideWorldBounds(true);
        delayedSpike.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    }, [], this);

    spikes.children.iterate(function (child) {
        child.setGravityY(300);
        child.setCollideWorldBounds(true);
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(spikes, platforms);
    this.physics.add.collider(gems, platforms);
    this.physics.add.collider(player, stars, collectStar, null, this);
    this.physics.add.collider(player, spikes, hitSpike, null, this);
    this.physics.add.collider(player, gems, collectGem, null, this);

    levelText = this.add.text(16, 16, 'Level: ' + level, {
        fontSize: '24px', fill: '#fff'
    });

    scoreText = this.add.text(16, 44, 'Score: ' + score, {
        fontSize: '24px', fill: '#fff'
    });

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

    if (stars.countActive(true) === 0 && gems.countActive(true) === 0) {
        level++;
        levelText.setText('Level: ' + level);
        score += 100;
        scoreText.setText('Score: ' + score);
        this.scene.restart();
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

function collectGem(player, gem) {
    gem.disableBody(true, true);
    score += 50;
    scoreText.setText('Score: ' + score);
}

function hitSpike(player, spike) {
    player.setTint(0xff0000);
    this.time.delayedCall(500, () => {
        this.scene.restart();
    });
}
