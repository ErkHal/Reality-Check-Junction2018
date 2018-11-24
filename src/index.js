import 'phaser';
import canvasResize from "./canvasResize";

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

let switchDimensionsKey;

let player;
let cursors;

let drawablePlatforms;

let nightmareModeOn = false;

const game = new Phaser.Game(config);

//Set game to fit browser window
window.onload = () => {
    canvasResize(game);
    window.onresize = () => canvasResize(game);
};

function preload ()
{
    this.drawablePlatforms = drawablePlatforms;
    this.load.image('platformGreen', 'assets/textures/platformGreen.png')
    this.load.image('platformRed', 'assets/textures/platformRed.png')
    this.load.image('player', 'assets/Protagonist.png');
}

function create ()
{
    //Player sprite and physics init
    player = this.physics.add.sprite(100, 400, 'player');
    player.setBounce(0);
    player.setCollideWorldBounds(true);     
    player.body.setGravityY(300)

    setupKeybindings(this)

    drawWorld(this)

}

function update () {
    checkMovement();
}

function drawWorld(ctx) {

    try {

        if(drawablePlatforms) {
            let children = drawablePlatforms.getChildren()
            children.forEach(element => {
                element.disableBody(true, true);
            });
        }

        if(nightmareModeOn) {
            //Nightmare platforms
            drawablePlatforms = ctx.physics.add.staticGroup();
            drawablePlatforms.create(200, 570, 'platformRed').refreshBody();
            drawablePlatforms.create(600, 570, 'platformRed').refreshBody();
            drawablePlatforms.create(1000, 570, 'platformRed').refreshBody();
            ctx.physics.add.collider(player, drawablePlatforms);
        } else {
            //Reality platforms
            drawablePlatforms = ctx.physics.add.staticGroup();
            drawablePlatforms.create(200, 570, 'platformGreen').refreshBody();
            drawablePlatforms.create(600, 570, 'platformGreen').refreshBody();
            drawablePlatforms.create(1000, 570, 'platformGreen').refreshBody();
            ctx.physics.add.collider(player, drawablePlatforms);
        }
    } catch (err) {
        console.log(err);
    }
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

function setupKeybindings(ctx) {
    cursors = ctx.input.keyboard.createCursorKeys();

    ctx.input.keyboard.on('keyup', event => {
        if(event.code == "Space") {
            nightmareModeOn = !nightmareModeOn
            drawWorld(ctx);
        }
    });
}