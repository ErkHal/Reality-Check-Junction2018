import 'phaser';
import {SceneA} from './scenes/SceneA';

class Controller extends Phaser.Scene {

    constructor () {
        super('Controller');

        this.active;
        this.currentScene;
    }

    setActiveScene(scene){
        this.activate.setData('active',false);
        this.currentScene = scene;
    }

    create(){
        this.scene.start('SceneA');

        this.currentScene = this.scene.get('SceneA');
    }

}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 700,
    pixelArt: true,
    backgroundColor: "#2b2b2b",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Controller, SceneA]
};

let game = new Phaser.Game(config);