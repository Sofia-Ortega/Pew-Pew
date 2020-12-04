var hit = false;
var x, y;
var radius = 50;
var coord, opp, oppBullet;
var newRect, p1, border;
var bullets = [];
var bulletsCoord = [];
let rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
var socket, id;

//FIXME: add more than 2 players thingy;

function setup() {
    createCanvas(600, 600);
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player(rgb, Math.floor(Math.random()*(width-100)+50), Math.floor(Math.random()*(height-100)+50));
    newRect = new Boundaries(500, 50, 60, 100);
    border = new Boundaries(0, 0, width, height);

    socket = io.connect('http://localhost:3000');

    socket.on('opp', (data) => {
        // console.log("the data:", data);
        opp = data;
    });

    socket.on('oppBullets', data => {
        oppBullet = data.xy;

    })

    socket.on('connect', () => {
        id = socket.id;
    })
}

function draw() {
    background(50);
    noStroke();
    bulletsCoord = [];


    //displaying shapes
    p1.display();
    newRect.display();
    bullets.forEach(bullets => {
        bullets.display();
    })

    if(id) {
        print(id);
    }
    //opponent
    if(opp) {
        //print(opp);
    //     fill(opp.color);
    //     noStroke();
    //     circle(opp.x, opp.y, radius);
    //
    //     stroke(255);
    //     strokeWeight(3);
    //     line(opp.x, opp.y, opp.nx, opp.ny);
    }

    if(oppBullet) {
        fill(255, 255, 255);
        oppBullet.forEach(bullets => {
            circle(bullets[0], bullets[1], 10)
        })

    }


    //updating coordinates
    p1.controls();
    bullets.forEach(bullets => {
        bullets.update();
        bulletsCoord.push(bullets.coordinates);

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


    socket.emit('player', p1.sendInfo);
    socket.emit('bullets', {'xy':bulletsCoord});

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