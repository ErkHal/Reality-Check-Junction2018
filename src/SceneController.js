import 'phaser';
import { SceneA } from './scenes/SceneA';
import { SceneB } from './scenes/SceneB';
import { SceneC } from './scenes/SceneC';
import resize from "./windowResize";

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
        this.scene.start('SceneC');
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
    scene: [ Controller, SceneA, SceneB, SceneC]
};

let game = new Phaser.Game(config);

//resize canvas to fit window
window.onload = () => {
    resize(game);
    window.onresize = () => {
        resize(game);
    }
};