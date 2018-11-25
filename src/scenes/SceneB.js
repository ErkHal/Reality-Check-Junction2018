import playerAnims from "../playerAnims";

export class SceneB extends Phaser.Scene {

    constructor(){
        super('SceneB');
        this.nextScene = 'SceneC';

        this.player;
        this.cursors;
        this.monster;
        this.drawablePlatforms;
        this.key;
        this.doubledoor;
        this.nightmareModeOn = false;

        this.playerStartingX = 120;
        this.playerStartingY = 620;

        this.monsterStartingX = 300;
        this.monsterStartingY = 150;
        this.monsterSpeed = 80;

        this.keyX = 1150;
        this.keyY = 300;
        this.keyCollected = false;

        this.doubledoorX = 1150;
        this.doubledoorY = 77;
    }

    preload ()
    {
        this.load.image('platformWhite', 'assets/textures/platformWhite.png');
        this.load.image('platformBlack', 'assets/textures/platformBlack.png');
        this.load.spritesheet('player', 'assets/player-all.png', {frameWidth: 10, frameHeight: 14, endFrame: 10});
        this.load.spritesheet('monster', 'assets/textures/monster1_spritesheet.png', {frameWidth:32, frameHeight:32,endFrame:5});
        this.load.image('key','assets/textures/Key.png');
        this.load.image('doubledoor','assets/textures/doubledoor.png');

    }

    create ()
    {
        //Player sprite and physics init
        this.player = this.physics.add.sprite(this.playerStartingX, this.playerStartingY, 'player').setScale(4);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);
        //player animations
        playerAnims.forEach(anim => {
           this.anims.create({
               key: anim.key,
               frames: this.anims.generateFrameNumbers('player', {
                   start: anim.start,
                   end: anim.end,
               }),
               frameRate: 7
           })
        });

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

        this.drawKey();
        this.doubledoor = this.physics.add.sprite(this.doubledoorX, this.doubledoorY,'doubledoor').setScale(4);

        this.physics.add.collider(this.player, this.drawablePlatforms);
        this.setupKeybindings(this);
        this.drawWorld(this);
    }

    update () {
        this.checkMovement();
        this.monsterMovement();
        this.floorBoundCheck();

        if(this.checkCollide(this.player,this.key)){
            this.collectItem(this.key);
        }

        //Start next level when player reaches door with the key
        if (this.keyCollected && this.checkCollide(this.player,this.doubledoor)){
            this.scene.start(this.nextScene);
        }
    }

    checkCollide(objA,objB){
        return Phaser.Geom.Intersects.RectangleToRectangle(objA.getBounds(), objB.getBounds());
    }

    floorBoundCheck(){
        if(this.player.y > 671){
            this.resetLevel();
        }
    }

    collectItem(obj){
        this.keyCollected = true;
        obj.visible = false;
        obj.destroy();
    }

    drawKey(){
        this.keyCollected = false;
        this.key = this.physics.add.sprite(this.keyX, this.keyY,'key').setScale(2);
    }

    checkMovement() {
        if (this.player.body.touching.down && this.cursors.up.isDown) {
                this.player.setVelocityY(-330);
                this.player.anims.play('jump', true);
                return;
        } else if (!this.player.body.touching.down) {
            this.player.anims.play('jump', true);
        }
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left-run', true);
            console.log('left')
        }
        else if(this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            this.player.anims.play('right-run', true);
            console.log('right')
        } else {
            this.player.setVelocityX(0)
            if (this.player.body.touching.down) {
                this.player.anims.play('right');
            }
        }
    }

    monsterMovement(){
        if(this.nightmareModeOn) {

            this.physics.moveToObject(this.monster, this.player, this.monsterSpeed)
            this.checkCollide(this.player, this.monster)
            ? this.resetLevel()
            : {}
        } else {
            this.monster.body.stop();
        }
    }

    drawWorld() {

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
                this.drawablePlatforms.create(120, 680, 'platformBlack').setScale(0.5).refreshBody();
                this.drawablePlatforms.create(300, 570, 'platformBlack').setScale(0.7).refreshBody();
                this.drawablePlatforms.create(600, 400, 'platformBlack').setScale(0.6).refreshBody();
                this.drawablePlatforms.create(1000, 250, 'platformBlack').setScale(0.5).refreshBody();
                this.drawablePlatforms.create(1250, 120, 'platformBlack').refreshBody();
                this.physics.add.collider(this.player, this.drawablePlatforms);
            } else {
                //Reality platforms
                this.monster.visible = false;
                this.drawablePlatforms = this.physics.add.staticGroup();
                this.drawablePlatforms.create(120, 680, 'platformWhite').setScale(0.5).refreshBody();
                this.drawablePlatforms.create(1250, 120, 'platformWhite').refreshBody();
                this.drawablePlatforms.create(1250, 320, 'platformWhite').refreshBody();
                this.physics.add.collider(this.player, this.drawablePlatforms);
            }
        } catch (err) {
            console.log(err);
        }
    }

    setupKeybindings() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keyup', event => {
            if(event.code === "Space") {
                this.nightmareModeOn = !this.nightmareModeOn;
                this.drawWorld();
            }
        });
    }

    resetLevel() {
        this.player.setPosition(this.playerStartingX, this.playerStartingY);
        this.monster.setPosition(this.monsterStartingX, this.monsterStartingY);
        this.nightmareModeOn = false;
        this.drawWorld();
        this.drawKey();
    }
}