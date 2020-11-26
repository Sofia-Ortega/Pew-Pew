

class Boundaries {
    constructor(x1, y1, height, width) {
        this.x = x1;
        this.y = y1;
        this.h = height;
        this.w = width;
    }

    checkHit(userx, usery, userRadius) {
        return collideRectCircle(this.x, this.y, this.w, this.h, userx, usery, userRadius);

    }

    display() {
        rect(this.x, this.y, this.h, this.w);
    }
}

module.exports.Boundaries = Boundaries;