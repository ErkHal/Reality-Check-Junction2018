
export class SceneA extends Phaser.Scene{

    constructor(){
        super('SceneA');

        this.player;
        this.cursors;
        this.monster;
        this.drawablePlatforms;
        this.key;
        this.nightmareModeOn = false;
    }

    preload ()
    {
        this.load.image('platformGreen', 'assets/textures/platformGreen.png');
        this.load.image('platformRed', 'assets/textures/platformRed.png');
        this.load.image('player', 'assets/Protagonist.png');
        this.load.spritesheet('monster', 'assets/textures/monster1_spritesheet.png', {frameWidth:32, frameHeight:32,endFrame:5});
        this.load.image('key','assets/textures/Key.png');

    }

    create ()
    {
        //Player sprite and physics init
        this.player = this.physics.add.sprite(300,400, 'player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        //monster setup
        this.monster = this.physics.add.sprite(300,200,"monster").setScale(4);
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

        this.key = this.physics.add.sprite(650,375,'key');
        this.setupKeybindings(this);

        this.drawWorld(this);

    }

    update () {
        this.checkMovement();
        this.monsterMovement(this);
    }

    checkMovement() {
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
                this.player.setPosition(300,400);
                this.monster.setPosition(300,200);
                this.nightmareModeOn = false;
                this.drawWorld(ctx);
                ctx.physics.world.removeCollider(collider);
            }, ctx);
        }else{
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
               this.drawablePlatforms = ctx.physics.add.staticGroup();
                this.drawablePlatforms.create(200, 570, 'platformRed').refreshBody();
                this.drawablePlatforms.create(600, 570, 'platformRed').refreshBody();
                this.drawablePlatforms.create(1000, 570, 'platformRed').refreshBody();
                ctx.physics.add.collider(this.player, this.drawablePlatforms);
            } else {
                //Reality platforms
                this.rawablePlatforms = ctx.physics.add.staticGroup();
                this.rawablePlatforms.create(200, 570, 'platformGreen').refreshBody();
                this.rawablePlatforms.create(600, 570, 'platformGreen').refreshBody();
                this.rawablePlatforms.create(1000, 570, 'platformGreen').refreshBody();
                ctx.physics.add.collider(this.player, this.drawablePlatforms);
            }
        } catch (err) {
            console.log(err);
        }
    }

    setupKeybindings(ctx) {
        this.cursors = ctx.input.keyboard.createCursorKeys();

        ctx.input.keyboard.on('keyup', event => {
            if(event.code == "Space") {
                this.nightmareModeOn = !this.nightmareModeOn;
                this.drawWorld(ctx);
            }
        });
    }
}