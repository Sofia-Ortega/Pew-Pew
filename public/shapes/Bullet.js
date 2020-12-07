

class Bullet {
    constructor(x, y, dirx, diry){
        this.x = x;
        this.y = y;
        this.dirx = dirx/5;
        this.diry = diry/5;
    }

    get coordinates() {
        return [this.x, this.y];
    }

    get sendInfo() {
        return {
            'x': this.x,
            'y': this.y,
            'dirx': this.dirx*5,
            'diry': this.diry*5
        }
    }
    display() {
        fill(255);
        circle(this.x, this.y, 10);
    }

    update() {
        this.x += this.dirx;
        this.y += this.diry;
    }




}