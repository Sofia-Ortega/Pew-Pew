hit = false;
var x, y;
var r = 50
var newRect;

// const Boundaries = require('./shapes/boundaries');

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

// class Boundaries {
//     constructor(x1, y1, width, height) {
//         this.x = x1;
//         this.y = y1;
//         this.w = width;
//         this.h = height;
//
//     }
//
//     checkHit(userx, usery, userRadius) {
//         return collideRectCircle(this.x, this.y, this.w, this.h, userx, usery, userRadius);
//
//     }
//
//     display() {
//         rect(this.x, this.y, this.w, this.h);
//     }
// }