import 'phaser';
import canvasResize from "./canvasResize";
import Player from './player';

const tileSize = 16;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: tileSize*11,
    height: tileSize*11,
    pixelArt: true,
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

let player;
let cursors;

let drawablePlatforms;

let nightmareModeOn = false;

let game = new Phaser.Game(config);

//Set game to fit browser window
window.onload = () => {
    canvasResize(game);
    window.onresize = () => canvasResize(game);
};

function preload ()
{
    this.drawablePlatforms = drawablePlatforms;
    this.load.image('player', 'assets/Protagonist.png');

    this.load.image("worldSpace", "assets/worldSpace.png");
}

function create ()
{
    //Player sprite and physics init
    player = this.physics.add.sprite(tileSize * 5, tileSize * 5, 'player');
    player.setBounce(0);
    player.setCollideWorldBounds(true);     
    player.body.setGravityY(300)

    // Load a map from a 2D array of tile indices
    const level = [
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   1,   1,   0,   0 ],
        [  0,   0,   1,   1,   0,   0,   1,   1,   1,   1,   1 ],
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ],
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ],
        [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1 ]
    ];

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ data: level, tileWidth: tileSize, tileHeight: tileSize });
    const tiles = map.addTilesetImage("worldSpace");
    const layer = map.createStaticLayer(0, tiles, 0, 0);
    layer.setCollision(1);
    this.physics.add.collider(player, layer);

    setupKeybindings(this);

    drawWorld(this);

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