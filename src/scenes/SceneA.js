
export class SceneA extends Phaser.Scene{

    constructor(){
        super('SceneA');

        this.player;
        this.cursors;
        this.monster;
        this.drawablePlatforms;
        this.key;
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



    }

    update () {

    }
}