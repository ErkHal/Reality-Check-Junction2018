import 'phaser';
import canvasResize from "./canvasResize";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 16*48,
    height: 16*24,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y:300 },
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
let playerStartPosX = 100;
let playerStartPosY = 400;
let cursors;
let monster;
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
    this.load.image('platformGreen', 'assets/textures/platformGreen.png');
    this.load.image('platformRed', 'assets/textures/platformRed.png');
    this.load.image('player', 'assets/Protagonist.png');
    this.load.spritesheet('monster', 'assets/textures/monster1_spritesheet.png', {frameWidth:32, frameHeight:32,endFrame:5});

}

function create ()
{
    //Player sprite and physics init
    player = this.physics.add.sprite(playerStartPosX, playerStartPosY, 'player');
    player.setBounce(0);
    player.setCollideWorldBounds(true);     
    player.body.setGravityY(300);

    //animation config
    let monsterconfig = {
        key: 'wobble',
        frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 23, first: 23 }),
        frameRate: 5,
        repeat:-1,
    };

    this.anims.create(monsterconfig);

    //monster setup
    monster = this.physics.add.sprite(300,200,"monster").setScale(4);
    monster.body.setGravity(0);
    monster.anims.play('wobble');

    setupKeybindings(this);

    drawWorld(this);

}

function update () {
    checkMovement();
    monsterMovement(this);
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

function monsterMovement(ctx){
    if(nightmareModeOn){
        ctx.physics.moveToObject(monster,player,80);
        let collider = ctx.physics.add.collider(player, monster, null, function ()
        {
            player.setPosition(playerStartPosX,playerStartPosY);
            monster.setPosition(300,200);
            nightmareModeOn = false;
            drawWorld(ctx);
            ctx.physics.world.removeCollider(collider);
        }, ctx);
    }else{
        monster.body.stop();

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

