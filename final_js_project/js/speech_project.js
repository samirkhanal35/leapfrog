var body = document.body;
body.style.backgroundColor = "black";
// body.style.borderLeft = "1px solid red";
var playing = document.getElementsByClassName("playing")[0];
var record = document.getElementsByClassName("record_div")[0];
var record_event;
var play_sound = document.getElementsByClassName("play_div")[0];
// var play_sound1 = document.getElementsByClassName("play_div1")[0];
var segment_speech = document.getElementsByClassName("segment_div")[0];
var a = 5; //in seconds
var speech_array = [];
var speech_play = 0;
var record_interval;
var normalization_multiplier = 0;
var labels = document.getElementById("labels");
var prev_y = 0;
var label_height = 45;
var label_height_value = 150
var segmenting_div = document.getElementById("segmenting");



record.addEventListener("click", record_event = function(event) {
    microphone_flag = 0;
    // console.log(microphone_flag);
    record_audio(a);
    // console.log(a);
    var b = a;
    var interval_count = 1000;
    var interval = setInterval(() => {
        if (microphone_flag == 1) {
            if (interval_count % 1000 == 0) {
                document.getElementById("record_time").innerHTML = b + "sec";
                // console.log("microphone_flag>>1");
                b--;
            }
        }
        if (microphone_flag == 2) {
            document.getElementById("record_time").innerHTML = b + "sec";
            // console.log("clear interval");
            clearInterval(interval);
            // console.log("microphone_flag>>2");
            // console.log(play);
            // console.log(array.length);
            // play.play();
            document.getElementById("record_time").innerHTML = "recorded";
            // console.log("frequency_value>>", freq_value);
            // filterData();
        }
        interval_count += 200;
    }, 200);

});
play_sound.addEventListener("click", function(event) {
    if (microphone_flag == 2) {
        // console.log(array);
        playing.innerHTML = "Playing...";
        play_audio(play);
        // play.play();
        // playing.innerHTML = "Played";

    } else {
        playing.innerHTML = "Please record audio first!!";
    }
});

// play_sound1.addEventListener("click", function(event) {
//     if (microphone_flag == 2) {
//         // console.log("segmented_array value>>", segmented_arrays[0]);
//         playByteArray(array);
//         // play.play();

//     }
// });

segment_speech.addEventListener("click", function(event) {
    if (microphone_flag == 2) {
        segmenting_div.innerHTML = "Segmenting...";

        segment_audio(array);
        // body.style.borderLeft = "1px solid red";
        segmenting_div.innerHTML = "Segmented";
    } else {
        segmenting_div.innerHTML = "Please record audio first!!";
    }

});

// const filterData = function() {
//     const rawData = array;
//     const samples = 100;
//     const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
//     var filteredData = [];
//     for (let i = 0; i < blockSize; i++) {
//         var sample_place = i * samples;

//         filteredData.push(rawData[sample_place]);
//         // divide the sum by the block size to get the average
//     }
//     // var max = Math.max.apply(Math, filteredData);
//     // var min = Math.min.apply(Math, filteredData);
//     // console.log("max>>", max);
//     // console.log("min>>", min);
//     console.log("total no. of samples>>", array.length);
//     // console.log(filteredData);
//     // speech_visualization(filteredData, max, min);


//     // // console.log("max>>", max);
//     // var multiplier = Math.pow(max, -1);
//     // // console.log(filteredData);
//     // normalization_multiplier = multiplier;
//     // // console.log(normalization_multiplier);
//     // var normalized_Data = filteredData.map(normalizeData);
//     // draw(normalized_Data);
//     // console.log(filteredData_1);
//     // console.log(filteredData.length);
// }

// function normalizeData(filteredData) {
//     // console.log("entered normalization");
//     // console.log(filteredData);
//     // console.log(normalization_multiplier);
//     return filteredData * normalization_multiplier;
//     // console.log("values", filteredData);
// }


// function speech_visualization(filteredData, max, min) {
//     // console.log("entered speech_visualization ");
//     const canvas = document.getElementById("myCanvas");
//     var width = canvas.clientWidth;
//     // console.log(width);
//     var height = canvas.clientHeight;
//     // console.log(height);
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, width, height);
//     var x = 0;
//     prev_y = height / 2;
//     // console.log(prev_y);
//     for (var j = 0; j < filteredData.length; j++) {
//         // console.log("entered loop");
//         drawLineSegment(ctx, x, max, min, width, height, filteredData[j]);
//         x += 3;
//     }

// }

// const drawLineSegment = (ctx, x, max, min, width, height, data) => {
//     // console.log("entered draw fxn");
//     if (data < 0) { var dat = (-data) / min; } else {
//         var dat = data / max;
//     }
//     // console.log(dat);
//     // var y = height / 2 - (dat * 100);
//     var y = (height / 5) - 5 - (dat * 10);

//     ctx.lineWidth = 2; // how thick the line is
//     ctx.strokeStyle = "black"; // what color our line is
//     ctx.beginPath();
//     // // y = isEven ? y : -y;
//     ctx.moveTo(x, (height / 5) - 5);
//     ctx.lineTo(x, y);
//     // ctx.arc(x + 2, y + 2, 1, Math.PI);
//     // ctx.lineTo(x + 4, 0);
//     prev_y = y;
//     ctx.stroke();
// };
// console.log(play);

// play_audio();
// console.log(record_audio.arguments);