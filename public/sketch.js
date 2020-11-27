var hit = false;
var x, y;
var coord;
var newRect, p1, border;
var bullets = []



function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player([168, 168, 255], 300, 100);
    newRect = new Boundaries(500, 50, 60, 100);
    border = new Boundaries(0, 0, 800, 600);
}

function draw() {
    background(50);

    //displaying shapes
    p1.display()
    newRect.display()
    bullets.forEach(bullets => {
        bullets.display();
    })

    //updating coordinates
    p1.controls();
    bullets.forEach(bullets => {
        bullets.update();
    })

    //checking if hit
    coord = p1.coordinates;
    hit = newRect.checkHit(coord[0], coord[1]) || !(border.checkHit(coord[0], coord[1]));

    //if hit, teleport player to stargin position and clear bullets
    if (hit) {
        p1.teleport(true);
        bullets = [];
    }

    //clear off-screen bullets
    bullets = clearBullet(bullets);


}

function mouseClicked() {
    bullets.push(new Bullet(coord[0], coord[1]))
}

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