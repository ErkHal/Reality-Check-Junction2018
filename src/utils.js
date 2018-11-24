export function checkCollision(player,obj,ctx){
    let collider = ctx.physics.add.collider(player, obj, null, function ()
    {
        if(obj === monster) {
            player.setPosition(playerStartPosX, playerStartPosY);
            monster.setPosition(300, 200);
            nightmareModeOn = false;
            drawWorld(ctx);
            ctx.physics.world.removeCollider(collider);
        }else if(obj === item){

        }

    }, ctx);
}