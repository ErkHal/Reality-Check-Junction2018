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

const drawLevelPlatforms = (sceneContext, platformData, platformTexture) => {
    sceneContext.drawablePlatforms = sceneContext.physics.add.staticGroup();
    
    platformData.forEach( platformCoords => {
        sceneContext.drawablePlatforms.create(platformCoords[0], platformCoords[1], platformTexture).setScale(platformCoords[2]).refreshBody();
    })

    sceneContext.physics.add.collider(sceneContext.player, sceneContext.drawablePlatforms);
}

const checkPlayerMovement = (sceneContext) => {
    if (sceneContext.player.body.touching.down && sceneContext.cursors.up.isDown) {
            sceneContext.player.setVelocityY(-330);
            sceneContext.player.anims.play('jump', true);
            return;
    } else if (!sceneContext.player.body.touching.down) {
        sceneContext.player.anims.play('jump', true);
    }
    if(sceneContext.cursors.left.isDown) {
        sceneContext.player.setVelocityX(-160)
        sceneContext.player.anims.play('left-run', true);
        console.log('left')
    }
    else if(sceneContext.cursors.right.isDown) {
        sceneContext.player.setVelocityX(160)
        sceneContext.player.anims.play('right-run', true);
        console.log('right')
    } else {
        sceneContext.player.setVelocityX(0)
        if (sceneContext.player.body.touching.down) {
            sceneContext.player.anims.play('right');
        }
    }
}

module.exports = {
    drawKey,
    checkCollide,
    setupKeybindings,
    floorBoundCheck,
    drawLevelPlatforms,
    checkPlayerMovement
}