import 'phaser';

export class SceneW extends Phaser.Scene{
    constructor() {
        super('SceneW');
    }

    create() {
        this.text = this.make.text({
            x: 130,
            y: 100,
            text:"You're'r winner !",
            style: {
                fontSize: '100px'
            }
        });
    }
}