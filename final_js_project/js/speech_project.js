var record = document.getElementsByClassName("record_div")[0];
var record_event;
var play_sound = document.getElementsByClassName("play_div")[0];
var a = 3;
var speech_array = [];
var speech_play = 0;
var record_interval;

record.addEventListener("click", record_event = function(event) {
    record_audio(a);
    var b = a;
    var interval = setInterval(() => {
        if (microphone_flag == 1) {
            document.getElementById("record_time").innerHTML = b + "sec";
            b--;
        }
        if (microphone_flag == 2) {
            document.getElementById("record_time").innerHTML = b + "sec";
            console.log("clear interval");
            clearInterval(interval);
            console.log(array);
            console.log(play);
            // play.play();
            document.getElementById("record_time").innerHTML = "recorded";
        }
    }, 1000);

});
play_sound.addEventListener("click", function(event) {
        if (microphone_flag == 2) {

            play.play();

        }
    })
    // console.log(play);

// play_audio();
// console.log(record_audio.arguments);