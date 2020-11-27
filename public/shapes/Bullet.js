

class Bullet {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    display() {
        fill(255);
        circle(this.x, this.y, 10);
    }
}