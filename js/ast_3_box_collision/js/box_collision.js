var container = document.getElementsByClassName('ball_collision_container')[0];
container.style.paddingTop = 0 + "px";
var container_width = container.clientWidth;
var container_height = container.clientHeight;
var ball_count = 0;
var ball = [];



function Box(parentElement, container_width, container_height, box_count) {
    this.width = 40;
    this.height = 40;
    this.box_count = box_count;
    this.boxes = [];
    this.x = [];
    this.y = [];
    this.container_width = container_width;
    this.container_height = container_height;
    //  console.log(container_width);

    //  console.log(typeof(this.x));
    //  console.log(this.x);
    this.dx = [];
    this.dy = [];

    this.box = [];
    this.parentElement = parentElement;
    var that = this;



    this.init = function() {
        for (var i = 0; i < this.box_count; i++) {
            box1 = document.createElement('div');
            box1.style.height = this.height + 'px';
            box1.style.width = this.width + 'px';
            box1.classList.add('box');
            this.parentElement.appendChild(box1);
            this.boxes.push(box1);
        }
        //  this.element.onclick = this.boxClicked.bind(this);
        //  this.draw();
        //  console.log("entered init");
        this.move_ball();
        //  this.ball_access();

    }

    //  this.ball_access() {

    //  }

    this.move_ball = function() {
        //  if (this.x < (this.width / 2) || this.x > (container_width - (this.width / 2))) {
        //      this.dx = -this.dx;

        //  }

        for (var i = 0; i < this.box_count; i++) {

            //  console.log("entered move_ball initialization");
            this.box[i] = this.boxes[i];


            this.dx[i] = Math.floor(Math.random() * 4) + 2;

            this.dy[i] = this.dx[i];

        }
        this.unique_entry();

        setInterval(this.draw, 16);

    }

    this.unique_entry = function() {
        //  console.log("inside unique");
        for (var i = 0; i < this.box_count; i++) {
            //  console.log("inside loop");
            this.x[i] = Math.floor(Math.random() * (container_width - (this.width + 45)));
            //  console.log("x>>", this.x[i]);
            this.y[i] = Math.floor(Math.random() * (container_height - (this.height + 45)));
            //  console.log("y>>", this.y[i]);
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
            if (that.x[i] < 5 || that.x[i] > (container_width - (that.width + 5))) {
                that.dx[i] = -that.dx[i];
                //  console.log(that.x[i], that.width);
            }
            if (that.y[i] < 5 || that.y[i] > (container_height - (that.height + 5))) {
                that.dy[i] = -that.dy[i];
                //  console.log("dx changed");
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

            //  console.log("entered draw initialization");
            that.box[i].style.left = that.x[i] + 'px';
            that.box[i].style.top = that.y[i] + 'px';
            that.x[i] += that.dx[i];
            that.y[i] += that.dy[i];
        }


    }

}

var parentElement = document.getElementById('ball_collision_container');

ball = new Box(parentElement, container_width, container_height, 10).init();