import 'phaser';

export class SceneStart extends Phaser.Scene{
    constructor() {
        super('SceneStart');
    }
    preload(){
        this.load.image('arrow', 'assets/textures/MenuArrow.png');
    }

    create() {
        this.text = this.make.text({
            x: 100,
            y: 130,
            text:"Reality",
            style: {
                fontSize: '120px'
            }
        });
        this.text = this.make.text({
            x: 620,
            y: 190,
            text:"Check",
            style: {
                fontSize: '120px',
                color:'black',
            }
        });
        this.physics.add.sprite(430,430,'arrow').setScale(1.5);
        this.text = this.make.text({
            x: 500,
            y: 450,
            text:"Start",
            style: {
                fontSize: '100px'
            }
        });

        this.input.keyboard.on('keyup',event => {
            if(event.code === 'Enter'){
                this.scene.start('SceneA');
            }
        });
    }
}