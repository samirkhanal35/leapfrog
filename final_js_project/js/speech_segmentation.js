var array = [];
var play = 0;
var microphone_flag = 0;

this.record_audio = function(a) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
        var time = a * 1000;
        // this.array = [];
        // this.play = 0;
        array = [];
        play = 0;
        microphone_flag = 0;
        var that = this;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        microphone_flag = 1;
        this.console.log("inside record_audio", microphone_flag);
        var mediaStream = stream;

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {

            audioChunks.push(event.data);
            // console.log(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            play = new Audio(audioUrl);
            // play = () => audio.play();
            // this.play.play();
            // get arrayBuffer from blob
            let fileReader = new FileReader();

            fileReader.readAsArrayBuffer(audioBlob);

            fileReader.onload = function(event) {
                let arrayBuffer = fileReader.result;
                // console.log(arrayBuffer.getChannelData(0));
                array = new Int8Array(arrayBuffer);
                // console.log(array);
                mediaStream.stop();
                microphone_flag = 2;
                // mediaDevices.MediaStreamTrack.stop();
                // return ({ array, play });
            };

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



    });
}