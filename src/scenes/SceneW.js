import 'phaser';

export class SceneW extends Phaser.Scene{
    constructor() {
        super('SceneW');
    }

    create() {
        this.make.text({
            x: 170,
            y: 100,
            text:"The End",
            style: {
                fontSize: '100px'
            }
        });
        this.make.text({
            x: 760,
            y: 410,
            text:"Made By: \nErkki Halinen\nMikko Uusimaa\nMarkus Pikkanen",
            style: {
                fontSize: '30px'
            }
        });
        this.make.text({
            x: 330,
            y: 630,
            text:"Junction Hackathon 2018 Game Jam Challenge\nTeam Flamebeanie",
            style: {
                fontSize: '18px'
            }
        });
        this.make.text({
            x: 270,
            y: 500,
            text:"Press F5 to restart",
            style: {
                fontSize: '25px',
                color: '#000'
            }
        });
    }
}