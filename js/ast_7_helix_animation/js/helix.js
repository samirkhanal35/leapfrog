var canvas = document.getElementById('helix');
var context = canvas.getContext('2d');
var phase = 0;
var speed = 0.03;
var maxCircleRadius = 8;
var frameCount = 0;
var numRows = 10;
var numCols = 15;
var numStrands = 2;
var y;
var colors = ['#FFAE73', '#FEA978', '#FEA57C', '#FEA081', '#FE9B86', '#FA968B', '#F59190', '#F08C95', '#EB879A', '#E17DA4'];


function draw() {
    // background(51);
    context.clearRect(0, 0, canvas.width, canvas.height);

    var x = 0
    var columnOffset = 0;
    frameCount++;
    phase = frameCount * speed;

    for (var strand = 0; strand < numStrands; strand++) {
        if (strand === 0) {
            var strandPhase = phase;
        } else {
            var strandPhase = phase + strand * Math.PI;
        }
        x = 0;
        for (var column = 0; column < numCols; column++) {
            x = x + 30;
            columnOffset = (column * 2 * Math.PI) / 15; //value of columnoffset from 0 to 2PI

            for (var row = 0; row < numRows; row++) {
                var y = canvas.height / 4 + row * 10 + Math.sin(strandPhase + columnOffset) * 50;
                //sizeOffset changes the radius of the circle
                var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + columnOffset) + 1) * 0.4;
                var circleRadius = sizeOffset * maxCircleRadius;

                context.beginPath();
                context.arc(x, y, circleRadius, 0, Math.PI * 2, false);
                context.fillStyle = colors[row];
                context.fill();
                context.closePath();
            }
        }
    }
}

setInterval(draw, 20);