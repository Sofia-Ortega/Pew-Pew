var hit = false;
var x, y;
var r = 50
var newRect;


function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;

    newRect = new Boundaries(30, 50, 60, 100)
}

function draw() {
    background(100);

    fill(0);


    fill([255, 204, 0]);
    circle(x, y, r)
    newRect.display()

    hit = newRect.checkHit(x, y, r)

    controls();
    teleport(hit);

    print('colliding?', hit);

}


function controls() {
    if(keyIsDown(87)) {
        y-=3;
    }
    else if(keyIsDown(83)) {
        y+=3;
    }
    if(keyIsDown(65)) {
        x-=3;
    }
    else if(keyIsDown(68)) {

        x+=3;
    }
}

function teleport(hit) {
    if(hit) {
        x = width/2;
        y = height/2;
    }
}
