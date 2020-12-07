
//takes in array of bullet classes and returns updated bullet list w/o bullets that have gone off screen
function clearBullet(bullets) {
    let i;
    for(i = bullets.length; i >= 0; i -= 1) {

        if(bullets[i]){
            let bulletCoord = bullets[i].coordinates;
            if(!border.checkHit(bulletCoord[0], bulletCoord[1])) {
                bullets.splice(i, 1);
            }

        }

    }

    return bullets;

}