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
        this.scene.launch('SceneA');

        this.currentScene = this.scene.get('SceneA');
    }

}
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
    scene: [ Controller, SceneA]
};

let game = new Phaser.Game(config);