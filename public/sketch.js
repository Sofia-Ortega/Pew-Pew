hit = false;
var x, y;
var r = 100


function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;

    newRect = new Boundaries(10, 20, 50, 10)
}

function draw() {
    background(100);

    fill(0);


    fill([255, 204, 0]);
    circle(x, y, 100)
    newRect.display()
    hit = newRect.checkHit(x, y, r)
    // hit = collideRectCircle(x1, y1, w1, h1, x, y, 100)

    controls();
    teleport(hit);

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

function teleport(hit) {
    if(hit) {
        x = width/2;
        y = height/2;
    }
}

class Boundaries {
    constructor(x1, y1, height, width) {
        this.x = x1;
        this.y = y1;
        this.h = height;
        this.w = width;
    }

    checkHit(userx, usery, userRadius) {
        return collideRectCircle(this.x, this.y, this.w, this.h, userx, usery, userRadius);

    }

    display() {
        rect(this.x, this.y, this.h, this.w);
    }
}