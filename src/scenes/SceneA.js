export class SceneA extends Phaser.Scene{

    constructor(){
        super('SceneA');

        this.player;
        this.cursors;
        this.monster;
        this.drawablePlatforms;
        this.key;
        this.nightmareModeOn = false;

        this.playerStartingX = 120;
        this.playerStartingY = 400;

        this.monsterStartingX = 300;
        this.monsterStartingY = 150;
    }

    preload ()
    {
        this.load.image('platformWhite', 'assets/textures/platformWhite.png');
        this.load.image('platformBlack', 'assets/textures/platformBlack.png');
        this.load.image('player', 'assets/Protagonist.png');
        this.load.spritesheet('monster', 'assets/textures/monster1_spritesheet.png', {frameWidth:32, frameHeight:32,endFrame:5});
        //this.load.image('key','assets/textures/Key.png');

    }

    create ()
    {
        //Player sprite and physics init
        this.player = this.physics.add.sprite(this.playerStartingX, this.playerStartingY, 'player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        //monster setup
        this.monster = this.physics.add.sprite(this.monsterStartingX, this.monsterStartingY,"monster").setScale(4);
        this.monster.body.setGravity(0);
        //animation config
        let monsterconfig = {
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 23, first: 23 }),
            frameRate: 5,
            repeat:-1,
        };
        this.anims.create(monsterconfig);
        this.monster.anims.play('wobble');

        //this.key = this.physics.add.sprite(650,375,'key');

        this.physics.add.collider(this.player, this.drawablePlatforms);
        this.setupKeybindings(this);
        this.drawWorld(this);
    }

    update () {
        this.checkMovement();
        this.monsterMovement(this);
    }

    checkMovement() {

        console.log(this.window.height)
        if(this.player.y >= window.height) {
            this.resetObjectsToStartingPosition();
        }

        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            console.log('left')
        }
        else if(this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            console.log('right')
        } else {
            this.player.setVelocityX(0)
        }

        if(this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    monsterMovement(ctx){
        if(this.nightmareModeOn){
            ctx.physics.moveToObject(this.monster,this.player,80);
            let collider = ctx.physics.add.collider(this.player, this.monster, null,  () =>
            {
                this.resetObjectsToStartingPosition();
                this.nightmareModeOn = false;
                this.drawWorld(ctx);
                ctx.physics.world.removeCollider(collider);
            }, ctx);
        } else {
            this.monster.body.stop();

        }
    }

    drawWorld(ctx) {

        try {

            if(this.drawablePlatforms) {
                let children = this.drawablePlatforms.getChildren()
                children.forEach(element => {
                    element.disableBody(true, true);
                });
            }

            if(this.nightmareModeOn) {
                //Nightmare platforms
                this.monster.visible = true;
                this.drawablePlatforms = this.physics.add.staticGroup();
                this.drawablePlatforms.create(width/2, height, null).refreshBody();
                this.drawablePlatforms.create(200, 570, 'platformBlack').refreshBody();
                this.drawablePlatforms.create(600, 400, 'platformBlack').refreshBody();
                this.physics.add.collider(this.player, this.drawablePlatforms);
            } else {
                //Reality platforms
                this.monster.visible = false;
                this.drawablePlatforms = this.physics.add.staticGroup();
                this.drawablePlatforms.create(200, 570, 'platformWhite').refreshBody();
                this.drawablePlatforms.create(1100, 250, 'platformWhite').refreshBody();
                this.physics.add.collider(this.player, this.drawablePlatforms);
            }
        } catch (err) {
            console.log(err);
        }
    }

    setupKeybindings(ctx) {
        this.cursors = ctx.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keyup', event => {
            if(event.code == "Space") {
                this.nightmareModeOn = !this.nightmareModeOn;
                this.drawWorld(ctx);
            }
        });
    }

    resetObjectsToStartingPosition() {
        this.player.setPosition(this.playerStartingX, this.playerStartingY);
        this.monster.setPosition(this.monsterStartingX, this.monsterStartingY);
    }
}