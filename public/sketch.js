var hit = false;
var x, y;
var coord, oppBullet;
var opp, tempXY;
var oppArray = []
var newRect, p1, border;
var bullets = [];
var bulletsCoord = [];
let rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
var socket, id;
var sentStart;
var oppXY = {};

var myIp = `http://${IP}:3000`;

//FIXME: add more than 2 players thingy;

function setup() {
    //............................Receiving..........................................
    socket = io.connect(myIp);

    socket.on('connect', () => {
        id = socket.id;
    })
    socket.on('startPacket', playerId => {
        print("Receving startInfo:", playerId);
        print("My id:", id);

        for (let id in playerId) {
            oppArray.push(new Opponent(playerId[id].x, playerId[id].y, id, playerId[id].color));
        }

        oppArray.forEach(opp => {
            oppXY = opp.startXY;
        })

        print(oppArray);

    })

    socket.on('oppConnect', (connectId) => {
        //print("Opponent connecting:", connectId);
        oppArray.push(new Opponent(connectId.x, connectId.y, connectId.id, connectId.color));
        print("Opp connecting:", oppArray)
    })

    socket.on('oppDisconnect', disconnectId => {
        print("Player has disconnected:", disconnectId);
        let i;
        for(i = oppArray.length; i >= 0; i -= 1) {
            if(oppArray[i]){
                if(oppArray[i].id === disconnectId){
                    oppArray.splice(i, 1);
                }
            }
        }

        //print(oppArray);

    })
    socket.on('oppXY', (data) => {
        //console.log("the data for oppXY:", data);
        oppXY = data;
        delete oppXY[socket.id];
        //print(oppXY);
    });

    socket.on('oppBullets', data => {
        oppBullet = data.xy;

    })

    //...............................Canvas Setup.....................................
    createCanvas(600, 600);
    noStroke();
    x = width/2;
    y = height/2;
    p1 = new Player(rgb, Math.floor(Math.random()*(width-100)+50), Math.floor(Math.random()*(height-100)+50));
    //newRect = new Boundaries(500, 50, 60, 100);
    border = new Boundaries(0, 0, width, height);

}

function draw() {
    background(50);
    noStroke();
    bulletsCoord = [];

    //displaying shapes
    p1.display();
    //newRect.display();
    bullets.forEach(bullets => {
        bullets.display();
    })


    // // opponent
    // if(oppArray) {
    oppArray.forEach(opp => {

        //opp.display(oppXY.x, oppXY.y, oppXY.nx, oppXY.ny);
        if(oppXY[opp.id]) {
            tempXY = oppXY[opp.id];
            print(tempXY.x, tempXY.y, tempXY.nx, tempXY.ny);
            opp.display(tempXY.x, tempXY.y, tempXY.nx, tempXY.ny);
            //opp.testDisplay();
        }
    })

    // }

    if(oppBullet) {
        fill(255, 255, 255);
        oppBullet.forEach(bullets => {
            circle(bullets[0], bullets[1], 10)
        })

    }


    //updating coordinates
    p1.controls();
    bullets.forEach(bullets => {
        bullets.update();
        bulletsCoord.push(bullets.coordinates);

    })

    bullets = p1.shoot(bullets);

    //checking if hit
    coord = p1.coordinates;
    hit = /*newRect.checkHit(coord[0], coord[1]) || */!(border.checkHit(coord[0], coord[1]));

    //if hit, teleport player to starting position and clear bullets
    if (hit) {
        p1.teleport(true);
        bullets = [];
    }

    //clear off-screen bullets
    bullets = clearBullet(bullets);


    if(!sentStart) {
        socket.emit('startInfo', p1.startInfo)
        sentStart = true;
    }

    socket.emit('xyPlayer', p1.sendInfo);
    socket.emit('bullets', {'xy':bulletsCoord});

}


function clearBullet(bullets) {
    //takes in array of bullet classes and returns updated bullet list w/o bullets that have gone off screen
    let i;
    for(i = bullets.length; i >= 0; i -= 1) {

        if(bullets[i]){
            let bulletCoord = bullets[i].coordinates;
            if(!border.checkHit(bulletCoord[0], bulletCoord[1])) {
                bullets.splice(i, 1);
            }

        }

    }

    return bullets;

}

function findSameId(dictId, id) {

}

