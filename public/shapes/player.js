

class Player {
    constructor(color, startx, starty) {
        // color array of color
        //startx and stary is default start point
        this.color = color;
        this.startx = startx;
        this.starty = starty;
        this.x = startx;
        this.y = starty;
        this.theta = 0;
        this.nx = (Math.cos(this.theta)*25) + this.x;
        this.ny = (-Math.sin(this.theta)*25) + this.y;
        this.storeFrame = -25;
    }

    get coordinates() {
        return [this.x, this.y]
    }

    get aim() {
        return [this.x, this.nx, this.y, this.ny];
    }

    controls() {
        // to move player
        if(keyIsDown(87)) {
            this.y-=3;
        } else if(keyIsDown(83)) {
            this.y+=3;
        }
        if(keyIsDown(65)) {
            this.x-=3;
        } else if(keyIsDown(68)) {
            this.x+=3;
        }

        // to aim
        if(keyIsDown(39) || keyIsDown(38)) {
            this.theta -= 0.05;
        } else if(keyIsDown(37) || keyIsDown(40)) {
            this.theta += 0.05;
        }

    }

    display() {
        fill(this.color);

        noStroke();
        circle(this.x, this.y, 50);

        //line in player
        stroke(255);
        this.nx = (Math.cos(this.theta)*25) + this.x;
        this.ny = (-Math.sin(this.theta)*25) + this.y;
        line(this.x, this.y, this.nx, this.ny);
    }

    teleport(hit) {
        if(hit) {
            this.x = this.startx;
            this.y = this.starty;
        }
    }

    shoot(bullets) {
        if (keyIsDown(32) && Math.abs(frameCount-this.storeFrame >= 25)) {
            let dirx = this.nx - this.x;
            let diry = this.ny - this.y
            bullets.push(new Bullet(this.nx, this.ny, dirx, diry));
            this.storeFrame = frameCount
        }
        return bullets;
    }

}
