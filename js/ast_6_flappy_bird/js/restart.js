function restart_game() {
    window.removeEventListener("keydown", event_listener, true);
    if (Highscore_value < score_value) {
        Highscore_value = score_value;
    }
    var flappybird = 0;
    var myObstacles = [];

    var myScore = 0;
    var score_value = 0;
    var myBackground = 0;
    var myMoving_background = 0;
    var background_sound = 0;
    var jump_sound = 0;
    var bird_prev_state = 0;
    var start_image = 0;

    window.addEventListener("keydown", event_listener = function(event) {
        if (event.keyCode == '32') {

            window.removeEventListener("keydown", event_listener, true);
            startGame();
        }
    }, true)

}


function startGame() {
    // background_sound = new sound("background_sound.mp3");
    jump_sound = new sound("jump_sound.mp3");
    // background_sound.play();
    GameArea.start();
    restart_image = new component(100, 80, "./images/restart.png", 150, 150, "image");
    flappybird = new bird_box(30, 30, "./images/bird.gif", 10, 120, "image");
    // start_image = new component(480, 270, "./images/background.png", 0, 0, "image");
    myBackground = new component(480, 270, "./images/background.png", 0, 0, "image");
    myBackground.update();
    // start_image.update();
    myMoving_background = new component(480, 20, "./images/bottom_background.png", 0, 270, "background");
    myScore = new component("30px", "Consolas", "white", 100, 40, "text");
    Highscore = new component("30px", "Consolas", "white", 250, 40, "text");

    flappybird.update();


}

startGame();