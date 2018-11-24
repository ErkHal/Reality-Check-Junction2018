
export default class Player {

    constructor(name, scene) {
        this.name = name;
        this.scene = scene;
    }

    preload(preload) {
        this.scene.load.image(name, 'assets/Protagonist.png');
    }

    create() {
        const createdPlayer = this.scene.physics.add.sprite(16 * 2, 16 * 2, name);
        createdPlayer.setBounce(0);
        createdPlayer.setCollideWorldBounds(true);
        createdPlayer.body.setGravityY(300);
        return createdPlayer;
    }
}