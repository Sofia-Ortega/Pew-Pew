
class Boundaries {
    constructor(x1, y1, width, height) {
        this.x = x1;
        this.y = y1;
        this.w = width;
        this.h = height;

    }

    checkHit(userx, usery) {
        return collideRectCircle(this.x, this.y, this.w, this.h, userx, usery, 50);

    }

    display() {
        fill(0)
        rect(this.x, this.y, this.w, this.h);
    }
}

module.exports.Boundaries = Boundaries;