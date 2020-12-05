

class Opponent {
    constructor(startx, starty) {
        this.x = startx;
        this.y = starty;

        this.radius = 50;

    }

    get startXY() {
        return {
            'x': this.x,
            'y': this.y,
            'nx': 25 + this.x,
            'ny': 25 + this.y
        }
    }


    display(getX, getY, nx, ny, color) {
            fill(color);
            noStroke();
            circle(getX, getY, this.radius);

            stroke(255);
            strokeWeight(3);
            line(getX, getY, nx, ny);
    }


}