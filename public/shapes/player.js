

class Player {
    constructor(color, startx, starty) {
        // color array of color
        //startx and stary is default start point
        this.color = color;
        this.x = startx;
        this.y = starty;
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
        circle(this.x, this.y, 10);
    }

}