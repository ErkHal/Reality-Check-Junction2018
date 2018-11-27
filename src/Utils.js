const drawKey = (sceneContext) => {
    sceneContext.keyCollected = false;
    sceneContext.key = sceneContext.physics.add.sprite(sceneContext.keyX, sceneContext.keyY,'key').setScale(2);
}

const checkCollide = (objA,objB) => {
    return Phaser.Geom.Intersects.RectangleToRectangle(objA.getBounds(), objB.getBounds());
}

const floorBoundCheck = (sceneContext) =>{
    if(sceneContext.player.y > 671){
        sceneContext.resetLevel();
    }
}

const setupKeybindings = (sceneContext) => {
    sceneContext.cursors = sceneContext.input.keyboard.createCursorKeys();

    sceneContext.input.keyboard.on('keyup', event => {
        if(event.code === "Space") {
            sceneContext.nightmareModeOn = !sceneContext.nightmareModeOn;
            sceneContext.drawWorld();
        }
    });
}

module.exports = {
    drawKey,
    checkCollide,
    setupKeybindings,
    floorBoundCheck
}