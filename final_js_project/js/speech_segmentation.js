var array = [];
var array_buffer = [];
var play = 0;
var microphone_flag = 0;
var segmented_array = [];
var frequency = 0;
var audioContext;
var bar_value = 0;
var frequency_values = [];
var bars = []
var original_sound = [];

var barWidth = 2;
var barGutter = 2;
const barColor = "#49F1D5";

let canvas = null;
let canvasContext = null;
let width = 0;
let height = 0;
let halfHeight = 0;
let drawing = false;
var segmented_arrays = [];


this.record_audio = function(a) {
    audioContext = new AudioContext();
    bars = [];
    // An instance of AudioContext

    // This will become our input MediaStreamSourceNode
    let input = null;

    // This will become our AnalyserNode
    let analyser = null;

    // This will become our ScriptProcessorNode
    let scriptProcessor = null;

    // Canvas related variables


    var time = a * 1000;
    array = [];
    play = 0;
    microphone_flag = 0;
    var that = this;
    var mediastream;
    const audioChunks = [];
    // var index = 0;

    const processInput = audioProcessingEvent => {
        canvasContext.clearRect(0, 0, width, height);
        // console.log(audioProcessingEvent.data);
        // Create a new Uint8Array to store the analyser's frequencyBinCount 

        const tempArray = new Uint8Array(analyser.frequencyBinCount);

        // Get the byte frequency data from our array
        analyser.getByteFrequencyData(tempArray);
        // array.push(tempArray);
        frequency_values.push(tempArray);
        // console.log("length process input>>", tempArray.length);
        // console.log("length process input>>", tempArray);
        // Calculate the average volume and store that value in our bars Array
        bar_value = getAverageVolume(tempArray);
        bars.push(bar_value);

        // console.log("bars value>>", bars);
        // Render the bars
        renderBars(bars);
    }


    const getAverageVolume = freq_array => {
        const length = freq_array.length;
        let values = 0;
        let i = 0;

        // Loop over the values of the array, and count them
        for (i = 0; i < length; i++) {
            if (freq_array[i] > 0 && freq_array[i] <= 50) {
                freq_array[i] = 0;
            }
            values += freq_array[i];
            array.push(freq_array[i]);
        }

        // Return the avarag
        return values / length;
    }


    const renderBars = () => {
        if (!drawing) {
            drawing = true;

            window.requestAnimationFrame(() => {
                canvasContext.clearRect(0, 0, width, height);

                bars.forEach((bar, index) => {
                    // console.log("bars called");
                    canvasContext.fillStyle = barColor;

                    // Top part of the bar
                    canvasContext.fillRect((index * (barWidth + barGutter)), (halfHeight - (halfHeight * (bar / 100))), barWidth, (halfHeight * (bar / 100)));

                    // Bottom part of the bars
                    canvasContext.fillRect((index * (barWidth + barGutter)), halfHeight, barWidth, (halfHeight * (bar / 100)));
                });
                // index++;
                drawing = false;
            });
        }
    }



    // Wait untill the page has loaded
    this.init = function() {
        // Get the canvas element and context
        canvas = document.querySelector('canvas');
        canvasContext = canvas.getContext('2d');

        // Set the dimensions
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        halfHeight = height / 2;

        // Set the size of the canvas context to the size of the canvas element
        canvasContext.canvas.width = width;
        canvasContext.canvas.height = height;
        canvasContext.clearRect(0, 0, width, height);
        // Get the users microphone audio.
        navigator.mediaDevices.getUserMedia({
            audio: {
                sampleSize: 16,
                sampleRate: 16000,
                channelCount: 1,
                echoCancellation: false,
                noiseSuppression: true,

            },
            video: false
        }).then(stream => {
            var time = a * 1000;
            // this.array = [];
            // this.play = 0;
            array = [];
            play = 0;
            // Create the audio nodes
            var mediaStream = stream;
            microphone_flag = 1;
            const audioChunks = [];
            canvasContext.clearRect(0, 0, width, height);
            input = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            scriptProcessor = audioContext.createScriptProcessor();
            // var filter = audioContext.createBiquadFilter();
            // filter.type = filter.LOWPASS;
            // filter.frequency.value = 100;
            const mediaRecorder = new MediaRecorder(stream);

            // console.log(mediaRecorder);
            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            // Connect the audio nodes
            // filter.connect(analyser);
            input.connect(analyser);
            // input.connect(filter);

            analyser.connect(scriptProcessor);

            scriptProcessor.connect(audioContext.destination);
            scriptProcessor.onaudioprocess = processInput;


            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", event => {
                // microphone_flag = 1;
                audioChunks.push(event.data);
                // console.log("audiochunks>>", audioChunks);
                // console.log("audioChunks type>>", typeof(audioChunks));
                const audioBlob = new Blob(audioChunks);
                // array = audioChunks;
                // const audioBlob = new Blob(frequency_array);
                let fileReader = new FileReader();

                fileReader.readAsArrayBuffer(audioBlob);

                fileReader.onload = function(event) {
                    let arrayBuffer = fileReader.result;
                    // console.log(arrayBuffer.getChannelData(0));
                    original_sound = new Int8Array(arrayBuffer);
                    // console.log("original_sound >>", original_sound);
                    // scriptProcessor.onaudioprocess = processInput;
                    // console.log(audioBlob);
                };
                const audioUrl = URL.createObjectURL(audioBlob);
                play = new Audio(audioUrl);
                // console.log("play>>", play);
                // console.log(audioChunks);
                // microphone_flag = 2;

            });

            mediaRecorder.addEventListener("stop", () => {
                mediaStream.stop();
                analyser.disconnect(scriptProcessor);
                scriptProcessor.disconnect(audioContext.destination);
                microphone_flag = 2;
                // const audioBlob = new Blob(audioChunks);
                // // console.log(audioChunks);
                // // console.log(audioBlob);
                // const audioUrl = URL.createObjectURL(audioBlob);
                // play = new Audio(audioUrl);
                // let fileReader = new FileReader();

                // fileReader.readAsArrayBuffer(audioBlob);

                // fileReader.onload = function(event) {
                //     let arrayBuffer = fileReader.result;
                //     // console.log(arrayBuffer.getChannelData(0));
                //     array = new Int8Array(arrayBuffer);
                //     // console.log(array);

                //     // mediaDevices.MediaStreamTrack.stop();
                //     // return ({ array, play });
                // };
            });




            setTimeout(() => {

                mediaRecorder.stop();
                index = 0;



            }, time);
            mediaStream.stop = function() {
                this.getAudioTracks().forEach(function(track) {
                    track.stop();
                });
                this.getVideoTracks().forEach(function(track) { //in case... :)
                    track.stop();
                });
            };
        }, error => {
            // Something went wrong, or the browser does not support getUserMedia
        });


    };

    init();

}

this.play_audio = function(audio_play) {

    audio_play.play();


    // const audioBlob = new Blob([frequency_array], { type: 'application/octet-stream' });
    // // console.log(audioBlob);
    // const audioUrl = URL.createObjectURL(audioBlob);
    // var play_audios = new Audio(audioUrl);
    // // console.log(play_audios);
    // // console.log(this.play);
    // play_audios.play();



}

// //The intensity of a wave is proportional to the square of its amplitude

this.segment_audio = function(passed_array) {
    var seg_barWidth = 2;
    var seg_barGutter = 2;
    var seg = [];
    var seg_parts = [];
    var seg_count = 0;
    var renderBars = function(seg_value) {
        if (!drawing) {
            drawing = true;
            // var parent_div = document.getElementById("segmented_speech");
            var seg_canvas_play = document.createElement('div');
            var seg_canvas = document.createElement('canvas');
            seg_canvas.classList.add("seg_canvas");
            seg_canvas.style.marginLeft = 19.8 + "%";
            // seg_canvas.style.width = 800 + "px";
            // seg_canvas.style.height = 400 + "px";
            seg_canvas.style.float = 'left';
            seg_canvas.style.border = '1px solid blue';
            seg_canvas.style.marginTop = 25 + "px";
            seg_canvas_play.appendChild(seg_canvas);
            document.body.appendChild(seg_canvas_play);
            var seg_canvasContext = seg_canvas.getContext('2d');

            // Set the dimensions
            var seg_width = 800;
            var seg_height = 400;
            var seg_halfHeight = seg_height / 2;

            // Set the size of the canvas context to the size of the canvas element
            seg_canvasContext.canvas.width = seg_width;
            seg_canvasContext.canvas.height = seg_height;
            seg_canvasContext.clearRect(0, 0, seg_width, seg_height);
            // window.requestAnimationFrame(() => {

            // for (var j = 0; j < seg_value.length; j++) {
            seg_value.forEach((bar, index) => {
                // console.log("seq_value called>>");
                seg_canvasContext.fillStyle = barColor;

                // Top part of the bar
                seg_canvasContext.fillRect((index * (seg_barWidth + seg_barGutter)), (seg_halfHeight - (seg_halfHeight * (bar / 400))), seg_barWidth, (seg_halfHeight * (bar / 400)));

                // Bottom part of the bars
                seg_canvasContext.fillRect((index * (seg_barWidth + seg_barGutter)), seg_halfHeight, seg_barWidth, (seg_halfHeight * (bar / 400)));
            });
            // index++;
            drawing = false;

            var seg_play_button = document.createElement('div');
            seg_play_button.classList.add("seg_play_button");
            seg_play_button.style.marginLeft = 1 + "%";
            seg_play_button.style.width = 80 + "px";
            seg_play_button.style.height = 20 + "px";
            seg_play_button.style.float = 'left';
            seg_play_button.style.border = '1px solid blue';
            seg_play_button.style.marginTop = 25 + seg_halfHeight + "px";
            seg_play_button.style.textAlign = 'center';
            seg_play_button.innerHTML = 'Play';
            seg_play_button.style.color = 'white';
            seg_play_button.style.fontSize = 14 + "px";
            seg_play_button.style.backgroundColor = 'black';

            seg_count++;
            seg_canvas_play.appendChild(seg_play_button);


            (function(seg_count, seg_value) {
                seg_play_button.addEventListener("click", function(event) {
                    console.log("seg coutn>>", seg_count);
                    playByteArray(seg_value);
                });
            }(seg_count, seg_value, this));


            // seg_play_button.addEventListener("click", function(event) {
            //     console.log("seg coutn>>", seg_count);
            //     // playByteArray(seg_value);
            // }.bind(seg_count, seg_value, this));


            // });
            // }
        }
    }
    var seg_position = [];
    // console.log("inside segmentation");
    // console.log("frequency means>>", bars)
    // console.log("frequency values>>", frequency_values[0])
    var threshold_values = 0;
    var threshold_values_count = 0;
    var threshold = 1.58489319; //2dB => 10log10(1.58489319)


    for (var i = 0; i < (bars.length - 1); i++) {
        if ((bars[i + 1] - bars[i]) > threshold) {
            threshold_values += ((bars[i + 1] - bars[i]));
            threshold_values_count++;
        }

    }

    threshold = (threshold_values / threshold_values_count) / 2;

    // console.log("threshold value>>", threshold);
    for (var i = 0; i < (bars.length - 1); i++) {
        if ((bars[i + 1] - bars[i]) > threshold) {
            seg_position.push(i);
        }
        if ((i + 1) == bars.length) {
            seg_position.push(i + 1);
        }
    }
    // console.log("segment positions>>", seg_position);
    // console.log("frequency values>>", frequency_values[0][0]);
    // console.log("segment positions>>", seg_position.length - 1);
    var prev_position = seg_position[0];
    for (var i = 1; i < seg_position.length; i++) {
        for (var j = prev_position + 1; j <= seg_position[i]; j++) {

            for (var k = 0; k < frequency_values[j].length; k++) {
                seg_parts.push(frequency_values[j][k]);
            }
            // var zero_count = 0;
            // var middle_position_array = [];
            // var middle_position_array_flag = 0;
            // for (var k = 0; k < frequency_values[j].length; k++) {
            //     if (frequency_values[j][k] == 0) { zero_count++; }
            //     if (zero_count >= 200) {
            //         middle_position_array.push(frequency_values[j][k]);
            //         middle_position_array_flag = 1;
            //     }
            //     // var 
            //     // seg_parts.push(frequency_values[j][k]);
            // }
            // if (middle_position_array_flag != 1) {
            //     for (var k = 0; k < frequency_values[j].length; k++) {
            //         seg_parts.push(frequency_values[j][k]);
            //     }
            // } else {
            //     for (var k = 0; k < middle_position_array.length; k++) {
            //         seg_parts.push(middle_position_array[k]);
            //     }

            // }

        }
        // console.log(seg_parts);
        seg.push(seg_parts);
        seg_parts = [];
        prev_position = seg_position[i];
    }
    // console.log("seg>>", seg);
    // console.log("seg type>>", typeof(seg[0]));
    // segmented_arrays = seg;
    for (var i = 0; i < seg.length; i++) {
        // console.log("seg length>>", seg.length);
        const audioBlob = new Blob(seg[i]);
        // // array = audioChunks;
        // // const audioBlob = new Blob(frequency_array);
        let fileReader = new FileReader();

        fileReader.readAsArrayBuffer(audioBlob);

        fileReader.onload = function(event) {
            let arrayBuffer = fileReader.result;
            // console.log(arrayBuffer.getChannelData(0));
            var sounds = new Uint8Array(arrayBuffer);
            // var audio_speech = new Audio(sounds);'audio/ogg'
            segmented_arrays.push(sounds);
        };

        renderBars(seg[i]);
    }

}

// window.onload = init;
var context; // Audio context
var buf; // Audio buffer



function playByteArray(byteArray) {

    console.log("byteArray", byteArray);

    var audioContext = new AudioContext();

    var buffer = audioContext.createBuffer(1, byteArray.length, 4000);
    var buf = buffer.getChannelData(0);
    for (i = 0; i < byteArray.length; ++i) {
        buf[i] = byteArray[i];
    }

    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}