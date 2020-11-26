hit = false;
var x, y;
var x1 = 0;
var y1 = 150;
var w1 = 150;
var h1 = 50;

function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;
}

function draw() {
    background(100);

    fill(0);
    rect(x1, y1, w1, h1)

    fill([255, 204, 0]);
    circle(x, y, 100)

    hit = collideRectCircle(x1, y1, w1, h1, x, y, 100)

    controls();
    checkHit(hit)

    print('colliding?', hit);

}


function controls() {
    if(keyIsDown(38)) {
        y-=3;
    }
    else if(keyIsDown(40)) {
        y+=3;
    }
    if(keyIsDown(37)) {
        x-=3;
    }
    else if(keyIsDown(39)) {

        x+=3;
    }
}

function checkHit(hit) {
    if(hit) {
        x = width/2;
        y = height/2;
    }
}