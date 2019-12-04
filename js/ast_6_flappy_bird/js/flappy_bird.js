var flappybird;
var myObstacles = [];

var myScore;
var score_value = 0;
var myBackground;
var myMoving_background;
var background_sound;
var jump_sound;
var bird_prev_state;
var start_image;
var event_listener;

var GameArea = {
    canvas: document.createElement("canvas"),

    start: function() {
        myObstacles = [];
        score_value = 0;
        this.canvas.width = 480;
        this.canvas.height = 290;
        this.context = this.canvas.getContext("2d");

        this.frameNo = 0;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // background_sound.play();
        // start_image.addEventListener("click", function(event) {

        // })
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener("keydown", event_listener = function(event) {
            if (event.keyCode == '32') {
                jump_sound.play();
                // bird_prev_state = GameArea.context;
                // bird_prev_state.save();
                // bird_prev_state.translate(flappybird.x, flappybird.y);
                // bird_prev_state.rotate(-30);
                // bird_prev_state.fillRect(flappybird.width / -2, flappybird.height / -2, flappybird.width, flappybird.height);

                flappybird.y -= 30;
                // ctx.restore();
                flappybird.gravitySpeed = 0;

            }

        }, true);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}



function updateGameArea() {
    var x, y1, y2, obstacle_height;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (flappybird.crashWith(myObstacles[i])) {
            GameArea.stop();
            setTimeout(restart_game, 1000);
        }
        if (myObstacles[i].x + 20 < 0) {
            score_value++;
            myObstacles.splice(i, 1);
        }
    }
    GameArea.clear();
    myBackground.update();
    myMoving_background.newPos();
    myMoving_background.update();
    flappybird.y += 1;
    flappybird.newPos();
    // myBackground.newPos();

    flappybird.update();
    GameArea.frameNo += 1;
    if (GameArea.frameNo == 1 || everyinterval(150)) {
        x = GameArea.canvas.width; //width
        minHeight = 100;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 80;
        maxGap = 100;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(20, height, "./images/pipe1.png", x, 0, "image"));
        myObstacles.push(new component(20, 270 - height - gap, "./images/pipe.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    if (score_value % 1 == 0) {
        myScore.text = Math.floor(score_value / 2); //to maintain with speed of execution
        myScore.update();
    }
}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function everyinterval(n) {
    if ((GameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}



function bird_box(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.gravity = 0.12;
    this.gravitySpeed = 0;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.update = function() {
        ctx = GameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        // if (this.gravitySpeed == 0) { bird_prev_state.restore(); }
        this.y += this.speedY + this.gravitySpeed;
        var rockbottom = GameArea.canvas.height - (this.height + 18);
        if (this.y > rockbottom) {
            this.y = rockbottom;
            GameArea.stop();
            setTimeout(restart_game, 1000);
        }



    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}




function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = -1;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }

    this.update = function() {
        ctx = GameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else if (this.type == "text") {
            // ctx.fillStyle = "black";
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);

        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }

    }

}


// function restart_game() {
//     window.removeEventListener("keydown", event_listener, true);
//     var flappybird = 0;
//     var myObstacles = [];

//     var myScore = 0;
//     var score_value = 0;
//     var myBackground = 0;
//     var myMoving_background = 0;
//     var background_sound = 0;
//     var jump_sound = 0;
//     var bird_prev_state = 0;
//     var start_image = 0;
//     startGame();
// }


// function startGame() {
//     // background_sound = new sound("background_sound.mp3");
//     jump_sound = new sound("jump_sound.mp3");
//     // background_sound.play();
//     GameArea.start();
//     flappybird = new bird_box(30, 30, "./images/bird.gif", 10, 120, "image");
//     // start_image = new component(480, 270, "./images/background.png", 0, 0, "image");
//     myBackground = new component(480, 270, "./images/background.png", 0, 0, "image");
//     myBackground.update();
//     // start_image.update();
//     myMoving_background = new component(480, 20, "./images/bottom_background.png", 0, 270, "background");
//     myScore = new component("30px", "Consolas", "white", 280, 40, "text");

//     flappybird.update();


// }

// startGame();

// function starting_box() {
//     var starting_div = document.createElement("div");
//     var body = document.getElementsByTagName("body");
//     starting_div.style.height = 290 / 2 + "px";
//     starting_div.style.width = 480 / 2 + "px";
//     starting_div.style.top = (290 / 2) / 2 + "px";
//     starting_div.style.left = (480 / 2) / 2 + "px";
//     starting_div.innerHTML = "<b>Start Game</b>";
//     starting_div.classList.add("start_box");
//     var start_image = document.createElement("img");
//     start_image.src = "https://www.animatedimages.org/data/media/426/animated-button-image-0329.gif";
//     starting_div.appendChild(start_image);
//     body.appendChild(starting_div);
//     start_image.addEventListener("click", function() {
//         document.getElementsByClassName("start_box")[0].remove();

//     })

// }

// starting_box();