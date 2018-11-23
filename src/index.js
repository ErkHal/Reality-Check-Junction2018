import 'phaser';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const switchDimensionsKey = this.input.keyboard.addKey(Phaser.input.Keyboard.KeyCodes.Space);

let player;
let cursors;
let platformsReality;
let platformsNightmare;

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('platformGreen', 'assets/textures/platformGreen.png')
    this.load.image('player', 'assets/Protagonist.png');
}

function create ()
{
    player = this.physics.add.sprite(100, 400, 'player');
    player.setBounce(0);
    player.setCollideWorldBounds(true);     
    player.body.setGravityY(300)
    cursors = this.input.keyboard.createCursorKeys();

    platformsReality = this.physics.add.staticGroup();

    platformsReality.create(400, 568, 'platformGreen').setScale(1.9).refreshBody();
    platformsReality.create(600, 440, 'platformGreen').setScale(0.8).refreshBody();
    platformsReality.create(50, 250, 'platformGreen').setScale(0.7).refreshBody();
    platformsReality.create(750, 220, 'platformGreen').setScale(0.5).refreshBody();
    this.physics.add.collider(player, platformsReality);
}

function update () {
    checkMovement();
}

function checkMovement() {
    if(cursors.left.isDown) {
        player.setVelocityX(-160)
        console.log('left')
    }
    else if(cursors.right.isDown) {
        player.setVelocityX(160)
        console.log('right')
    } else {
        player.setVelocityX(0)
    }

    if(cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    } 
}
