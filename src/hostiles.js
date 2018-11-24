
export class Monster{
        name;
        scene;

    constructor(name,scene){
        this.name = name;
        this.scene = scene;
    }

    preload(){
        this.scene.load.spritesheet('monster', 'assets/textures/monster1_spritesheet.png', {frameWidth:32, frameHeight:32,endFrame:5});
    }

    create(){
        let monsterconfig = {
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 23, first: 23 }),
            frameRate: 5,
            repeat:-1,
        };

        this.anims.create(monsterconfig);

        //monster setup
        let monster = this.scene.physics.add.sprite(300,200,"monster").setScale(4);
        monster.body.setGravity(0);
        monster.anims.play('wobble');

        return monster;
    }
}