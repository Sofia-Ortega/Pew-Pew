hit = false;
var x, y;

function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;
}

function draw() {
    background(hit ? 100 : 0);

    fill(hit ? [255, 204, 0]: [0,255, 0] );
    rect(200, 200, 100, 150)
    circle(x, y, 100)

    hit = collideRectCircle(200, 200, 100, 150, x, y, 100)

    controls();

    print('colliding?', hit);

}


function controls() {
    if(keyIsDown(38)) {
        y-=3;
    }
    if(keyIsDown(40)) {
        y+=3;
    }
    if(keyIsDown(37)) {
        x-=3;
    }
    if(keyIsDown(39)) {
        x+=3;
    }
}