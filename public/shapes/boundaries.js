
class Boundaries {
    constructor(x1, y1, width, height) {
        this.x = x1;
        this.y = y1;
        this.w = width;
        this.h = height;

    }

    checkHit(userx, usery, userRadius) {
        return collideRectCircle(this.x, this.y, this.w, this.h, userx, usery, userRadius);

    }

    display() {
        rect(this.x, this.y, this.w, this.h);
    }
}

module.exports.Boundaries = Boundaries;