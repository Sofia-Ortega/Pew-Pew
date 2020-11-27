var hit = false;
var x, y;
var r = 50;
var coord;
var newRect, p1, border;



function setup() {
    createCanvas(800, 600);
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player([168, 168, 255], 300, 100);
    newRect = new Boundaries(30, 50, 60, 100);
    border = new Boundaries(0, 0, 800, 600);
}

function draw() {
    background(50);

    //displaying shapes
    p1.display()
    newRect.display()

    //updating coordinates
    p1.controls();

    //checking if hit
    coord = p1.coordinates;
    hit = newRect.checkHit(coord[0], coord[1]) || !(border.checkHit(coord[0], coord[1]));
    p1.teleport(hit);


}

