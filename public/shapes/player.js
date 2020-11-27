

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
        fill(this.color);
        circle(this.x, this.y, 50);
    }

    teleport(hit) {
        if(hit) {
            this.x = this.startx;
            this.y = this.starty;
        }
    }

}
