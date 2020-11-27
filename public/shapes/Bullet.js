

class Bullet {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    get coordinates() {
        return [this.x, this.y];
    }
    display() {
        fill(255);
        circle(this.x, this.y, 10);
    }

    update() {
        this.y += 5;
        print(this.y);

    }


}