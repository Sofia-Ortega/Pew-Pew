var hit = false;
var x, y, nx, ny;
var coord;
var theta = 0;
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
    noStroke();

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

    //line in player
    stroke(255);
    nx= (Math.cos(theta)*25) + coord[0];//lots of unit circle
    ny = (-Math.sin(theta)*25) + coord[1];
    if(mouseIsPressed) {
        theta += .025;
    }
    line(coord[0], coord[1], nx, ny);


}

function mouseClicked() {
    bullets.push(new Bullet(coord[0], coord[1]))
}

function clearBullet(bullets) {
    //takes in array of bullet classes and returns updated bullet list w/o bullets that have gone off screen
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