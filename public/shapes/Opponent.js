

class Opponent {
    constructor(startx, starty, id, color) {
        this.x = startx;
        this.y = starty;
        this.color = color;
        this.oppId = id;

        this.radius = 50;

    }

    get id() {
        return this.oppId;
    }

    get startXY() {
        return {
            'x': this.x,
            'y': this.y,
            'nx': 25 + this.x,
            'ny': 25 + this.y
        }
    }

    testDisplay() {
        fill(this.color)
        noStroke();
        circle(this.x, this.y, 50);


    }

    display(getX, getY, nx, ny) {
            fill(this.color);
            noStroke();
            circle(getX, getY, this.radius);

            stroke(255);
            strokeWeight(3);
            line(getX, getY, nx, ny);
    }


}