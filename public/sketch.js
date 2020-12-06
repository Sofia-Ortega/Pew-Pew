var hit = false;
var coord, oppBullet;
var opp, tempXY;
var newRect, p1, border;
var socket;
var oppArray = []
var bullets = [];
var bulletsCoord = [];
let rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];

var oppXY = {};

//get ip address from ignored file
var myIp = `http://${IP}:3000`;


function setup() {
    //............................Receiving..........................................
    socket = io.connect(myIp);

    socket.on('startPacket', playerId => {
        //When player first connects, gets dict of all currently connected players and info to add to opp class

        for (let id in playerId) {
            oppArray.push(new Opponent(playerId[id].x, playerId[id].y, id, playerId[id].color));
        }

        //startXY begins at ea player's starting point
        oppArray.forEach(opp => {
            oppXY = opp.startXY; //FIXME: oppXY only last opp in array oppArray
        })

    })

    socket.on('oppConnect', (connectId) => {
        //once a new opp connects, already connected players get opp's info
        oppArray.push(new Opponent(connectId.x, connectId.y, connectId.id, connectId.color));
        //FIXME: initialize oppXY w this

    })

    socket.on('oppDisconnect', disconnectId => {
        //once opp disconnects, get their id and we delete from oppArray
        let i;
        for(i = oppArray.length; i >= 0; i -= 1) {
            //FIXME: perhaps in a function to be more efficient (break?)
            if(oppArray[i]){
                if(oppArray[i].id === disconnectId){
                    oppArray.splice(i, 1);
                }
            }
        }

    })
    socket.on('oppXY', (data) => {
        //Gets everyone's (including client himself) coordinates (x, y, nx, ny). Store in oppXY var and delete own info
        oppXY[data.id] = data;
        print(data);

    });

    socket.on('oppBullets', data => {
        //get opp xy values
        //FIXME: just need change in x and y, to calcuate path of opp bullets. Make a new opp class?
        oppBullet = data.xy;

    })

    //...............................Canvas Setup.....................................
    createCanvas(600, 600);

    //initialize player in player class in random location w random color
    p1 = new Player(rgb, Math.floor(Math.random()*(width-100)+50), Math.floor(Math.random()*(height-100)+50));
    //send starter info to server
    socket.emit('startInfo', p1.startInfo)

    //newRect = new Boundaries(500, 50, 60, 100);
    border = new Boundaries(0, 0, width, height);

}

//.............................................Draw.....................................................................
function draw() {
    background(50);
    bulletsCoord = [];

    //displaying shapes
    p1.display();
    //newRect.display();
    bullets.forEach(bullets => {
        bullets.display();
    })


    //........................Opponent....................................
    oppArray.forEach(opp => {
        if(oppXY[opp.id]) {
            tempXY = oppXY[opp.id];
            opp.display(tempXY.x, tempXY.y, tempXY.nx, tempXY.ny);
            //opp.testDisplay();
        }
    })

    if(oppBullet) {
        fill(255, 255, 255);
        oppBullet.forEach(bullets => {
            circle(bullets[0], bullets[1], 10)
        })

    }

    //..................................Updating player...............................

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

    //emits xy location of player
    //FIXME: only send when player moves and separate out x and y coordinates vs nx and ny coordinates
    if(p1.changeCoord) {
        print(p1.sendMove)
        socket.emit('xyPlayer', p1.sendMove);
    }

    //FIXME: uncecessary, only when player shoots send ONE value and have client calc the rest
    socket.emit('bullets', {'xy':bulletsCoord});

}






