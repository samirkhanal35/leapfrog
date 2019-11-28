var container = document.getElementsByClassName('ant_smasher_container')[0];
container.style.paddingTop = 0 + "px";
var container_width = container.clientWidth;
var container_height = container.clientHeight;
var ball_count = 0;
var ball = [];



function Box(parentElement, container_width, container_height, box_count, width, height) {
    //this.total_score = document.getElementsByClassName('score');
    this.width = width;
    this.height = height;
    this.box_count = box_count;
    this.boxes = [];
    this.x = [];
    this.y = [];
    this.container_width = container_width;
    this.container_height = container_height;
    this.dx = [];
    this.dy = [];
    this.box = [];
    this.parentElement = parentElement;
    var that = this;
    this.score = 0;
    this.init = function() {
        for (var i = 0; i < this.box_count; i++) {
            box1 = document.createElement('div');
            box1.style.height = this.height + 'px';
            box1.style.width = this.width + 'px';
            box1.style.backgroundImage = "url('./images/ant-walking.gif')";
            box1.classList.add('box');
            this.parentElement.appendChild(box1);
            this.boxes.push(box1);


            // box1.addEventListener("click", function() {

            //     console.log("inside the eventlistener");
            //     that.score++;
            //     console.log(that.score);
            //     box1.style.display = "none";



            // }.bind(box1, this));


            (function(i) {
                box1.addEventListener("click", function() {
                    console.log("inside the eventlistener");
                    that.score++;
                    console.log(that.score);


                    document.getElementById("score").innerHTML = "Total Score:" + that.score;
                    that.boxes[i].style.display = "none";
                });
            }(i, this));



        }

        this.move_ball();
    }


    this.move_ball = function() {

        for (var i = 0; i < this.box_count; i++) {

            this.box[i] = this.boxes[i];
            this.dx[i] = Math.floor(Math.random() * 2) + 1;
            this.dy[i] = this.dx[i];

        }
        this.unique_entry();

        setInterval(this.draw, 30);

    }

    this.unique_entry = function() {

        for (var i = 0; i < this.box_count; i++) {

            this.x[i] = Math.floor(Math.random() * (container_width - (2 * this.width)));

            this.y[i] = Math.floor(Math.random() * (container_height - (2 * this.height)));

            if (i > 0) {
                for (var j = 0; j < i; j++) {
                    if (this.x[i] < this.x[j] + this.width &&
                        this.x[i] + this.width > this.x[j] &&
                        this.y[i] < this.y[j] + this.height &&
                        this.y[i] + this.height > this.y[j]) {
                        this.unique_entry();
                    }
                }
            }
        }
    }




    this.draw = function() {
        for (var i = 0; i < that.box_count; i++) {
            if (that.x[i] <= 5 || that.x[i] >= (container_width - (that.width + 5))) {
                that.dx[i] = -that.dx[i];
            }
            if (that.y[i] <= 5 || that.y[i] >= (container_height - (that.height + 5))) {
                that.dy[i] = -that.dy[i];
            }
            for (var j = 0; j < that.box_count; j++) {
                if (j != i) {
                    if (that.x[i] < that.x[j] + that.width &&
                        that.x[i] + that.width > that.x[j] &&
                        that.y[i] < that.y[j] + that.height &&
                        that.y[i] + that.height > that.y[j]) {
                        that.dx[i] = -that.dx[i];
                        that.dx[j] = -that.dx[j];
                        that.dy[i] = -that.dy[i];
                        that.dy[j] = -that.dy[j];
                    }
                }
            }
            that.box[i].style.left = that.x[i] + 'px';
            that.box[i].style.top = that.y[i] + 'px';
            that.x[i] += that.dx[i];
            that.y[i] += that.dy[i];
        }
    }

}

var parentElement = document.getElementById('ant_smasher_container');

var box_width = 40;
var box_height = 40;
var number_of_boxes = 7;
start_collision = new Box(parentElement, container_width, container_height, number_of_boxes, box_width, box_height).init();