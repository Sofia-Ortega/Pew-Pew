var hit = false;
var x, y;
var r = 50;
var coord;
var newRect, p1;


function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player([255, 204, 0], 300, 100);
    newRect = new Boundaries(30, 50, 60, 100)
}

function draw() {
    background(100);

    fill([255, 204, 0]);
    // circle(x, y, r)
    p1.display()
    newRect.display()

    coord = p1.coordinates;
    hit = newRect.checkHit(coord[0], coord[1], r)


    p1.controls();
    p1.teleport(hit);

}


// function controls() {
//     if(keyIsDown(87)) {
//         y-=3;
//     }
//     else if(keyIsDown(83)) {
//         y+=3;
//     }
//     if(keyIsDown(65)) {
//         x-=3;
//     }
//     else if(keyIsDown(68)) {
//
//         x+=3;
//     }
// }

// function teleport(hit) {
//     if(hit) {
//         x = width/2;
//         y = height/2;
//     }
// }

class Player {
    constructor(color, startx, starty) {
        // color array of color
        //startx and stary is default start point
        this.color = color;
        this.startx = startx;
        this.starty = starty;
        this.x = startx;
        this.y = starty;
    }

    get coordinates() {
        return [this.x, this.y]
    }
    controls() {
        if(keyIsDown(87)) {
            this.y-=3;
        }
        else if(keyIsDown(83)) {
            this.y+=3;
        }
        if(keyIsDown(65)) {
            this.x-=3;
        }
        else if(keyIsDown(68)) {

            this.x+=3;
        }
    }

    display() {
        circle(this.x, this.y, 50);
    }

    teleport(hit) {
        if(hit) {
            this.x = this.startx;
            this.y = this.starty;
        }
    }

}
