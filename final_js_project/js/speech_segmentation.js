var array = [];
var array_buffer = [];
var play = 0;
var microphone_flag = 0;
var segmented_array = [];
var frequency = 0;
var audioContext;


this.record_audio = function(a) {
    const bars = []
        // An instance of AudioContext

    // This will become our input MediaStreamSourceNode
    let input = null;

    // This will become our AnalyserNode
    let analyser = null;

    // This will become our ScriptProcessorNode
    let scriptProcessor = null;

    // Canvas related variables
    const barWidth = 2;
    const barGutter = 2;
    const barColor = "#49F1D5";

    let canvas = null;
    let canvasContext = null;
    let width = 0;
    let height = 0;
    let halfHeight = 0;
    let drawing = false;

    var time = a * 1000;
    array = [];
    play = 0;
    microphone_flag = 0;
    var that = this;
    var mediastream;
    const audioChunks = [];
    /**
     * Process the input of the ScriptProcessorNode.
     *
     * @param {audioProcessingEvent}
     */
    const processInput = audioProcessingEvent => {
        canvasContext.clearRect(0, 0, width, height);
        // console.log(audioProcessingEvent.data);
        // Create a new Uint8Array to store the analyser's frequencyBinCount 

        const tempArray = new Uint8Array(analyser.frequencyBinCount);

        // Get the byte frequency data from our array
        analyser.getByteFrequencyData(tempArray);
        // array.push(tempArray);
        // console.log("length>>", tempArray.length);
        // Calculate the average volume and store that value in our bars Array
        bars.push(getAverageVolume(tempArray));
        // console.log(bars);
        // Render the bars
        renderBars(bars);
    }

    /**
     * Calculate the average value from the supplied array.
     *
     * @param {Array<Int>}
     */
    const getAverageVolume = freq_array => {
        const length = freq_array.length;
        let values = 0;
        let i = 0;

        // Loop over the values of the array, and count them
        for (i = 0; i < length; i++) {
            values += freq_array[i];
            array.push(freq_array[i]);
        }

        // Return the avarag
        return values / length;
    }

    /**
     * Render the bars.
     */
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

                drawing = false;
            });
        }
    }



    // Wait untill the page has loaded
    this.init = function() {
        // Get the canvas element and context
        canvas = document.querySelector('canvas');
        canvasContext = canvas.getContext('2d');
        audioContext = new AudioContext();
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
            const mediaRecorder = new MediaRecorder(stream);

            // console.log(mediaRecorder);
            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            // Connect the audio nodes
            input.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);
            // scriptProcessor.onaudioprocess = processInput;
            scriptProcessor.onaudioprocess = processInput;

            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", event => {
                // microphone_flag = 1;
                audioChunks.push(event.data);
                console.log("audiochunks>>", audioChunks);
                const audioBlob = new Blob(audioChunks);
                // console.log(audioChunks);
                // console.log(audioBlob);
                const audioUrl = URL.createObjectURL(audioBlob);
                play = new Audio(audioUrl);
                console.log("play>>", play);
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

this.play_audio = function(frequency_array) {
    // var osc_flag = 0;
    // var oscillator = audioContext.createOscillator();

    // // oscillator.type = 'square';
    // console.log(frequency_array.length);
    // for (i = 0; i < frequency_array.length; i++) {
    //     // if (osc_flag > 0) {
    //     //     // console.log(frequency_array[i]);
    //     //     oscillator.stop();
    //     // }
    //     var oscillator = audioContext.createOscillator();
    //     oscillator.frequency.value = frequency_array[i]; // * (16000 / 1024); // value in hertz
    //     oscillator.connect(audioContext.destination);
    //     oscillator.start();
    //     osc_flag++;
    //     if (osc_flag >= frequency_array.length) {
    //         console.log("last frequency");
    //         oscillator.stop();
    //     }

    // }
    // // oscillator.stop();
    play.play();

    // 
    // const audioBlob = new Blob(passed_array);
    // let fileReader = new FileReader();

    // fileReader.readAsArrayBuffer(audioBlob);

    // fileReader.onload = function(event) {
    //     let arrayBuffer = fileReader.result;
    //     // console.log(arrayBuffer.getChannelData(0));
    //     var _array = new Int8Array(arrayBuffer);
    //     const audioBlob = new Blob([_array], { type: 'application/octet-stream' });
    //     console.log(audioBlob);
    //     const audioUrl = URL.createObjectURL(audioBlob);
    //     var play_audios = new Audio(audioUrl);
    //     console.log(play_audios);
    //     // console.log(this.play);
    //     play_audios.play();
    // };


}

// //The intensity of a wave is proportional to the square of its amplitude

// this.segment_audio = function(passed_array) {
//     // console.log("inside segmentation");
//     var max = Math.max.apply(Math, passed_array);
//     var min = Math.min.apply(Math, passed_array);
//     console.log("max>>", max);
//     console.log("min>>", min);
//     var changing_array = passed_array.map(copy_array);


//     var zero_count = 0;
//     for (var i = 0; i < changing_array.length; i++) {
//         if (i > 60) {
//             if (changing_array[i] > 0 && changing_array[i] <= 100) {
//                 changing_array[i] = 0;
//             }


//         } else { changing_array[i] = 0; }
//     }
//     // console.log(changing_array);
//     for (var i = 0; i < changing_array.length; i++) {

//         if (changing_array[i] == max) {
//             // console.log("peak found at>>", i);

//         }
//         if (changing_array[i] == min) {
//             // console.log("through found at>>", i);

//         }

//     }
//     // for (var i = 0; i < changing_array.length; i++) {
//     //     if (i > 60) {
//     //         if (changing_array[i] == 0) {
//     //             zero_count++;
//     //             // console.log(i);
//     //             // console.log(zero_count);
//     //             if (zero_count >= 13) {
//     //                 // console.log("seperator found");
//     //                 // console.log(i);
//     //             }

//     //         } else { zero_count = 0; }
//     //     } else { changing_array[i] = 0; }
//     // }

//     // console.log(changing_array);
//     array_buffer = changing_array.map(copy_array);


// }

// this.copy_array = function(value) {
//     return value;
// }