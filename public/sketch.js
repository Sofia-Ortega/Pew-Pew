var hit = false;
var x, y;
var coord, oppCoord;
var newRect, p1, border;
var bullets = [];
let rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
var socket;

function setup() {
    createCanvas(600, 600); //FIXME: change borders depending on widht
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player(rgb, 300, 100);
    newRect = new Boundaries(500, 50, 60, 100);
    border = new Boundaries(0, 0, width, height);

    socket = io.connect('http://localhost:3000');

    socket.on('opp', (data) => {
        oppCoord = data;
    });
}

function draw() {
    background(50);
    noStroke();



    //displaying shapes
    p1.display();
    newRect.display();
    bullets.forEach(bullets => {
        bullets.display();
    })

    //opponent
    if(oppCoord) {
        noStroke();
        print(rgb);
        fill(rgb[2], rgb[1], rgb[0]);
        circle(oppCoord.x, oppCoord.y, 50);
    }



    //updating coordinates
    p1.controls();
    bullets.forEach(bullets => {
        bullets.update();
    })

    bullets = p1.shoot(bullets);

    //checking if hit
    coord = p1.coordinates;
    hit = newRect.checkHit(coord[0], coord[1]) || !(border.checkHit(coord[0], coord[1]));

    //if hit, teleport player to starting position and clear bullets
    if (hit) {
        p1.teleport(true);
        bullets = [];
    }

    //clear off-screen bullets
    bullets = clearBullet(bullets);

    socket.emit('player', {'x': coord[0], 'y': coord[1]})
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