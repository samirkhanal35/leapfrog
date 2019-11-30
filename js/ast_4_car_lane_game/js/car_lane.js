var container = document.getElementsByClassName("main_container")[0];
var container_height = container.clientHeight;
// console.log("height>>", container_height);
var container_width = container.clientWidth;
// console.log("width>>", container_width);
var background_images = document.getElementsByClassName("background_container")[0].getElementsByTagName("img");


function car_lane_game(parentElement, container_height, container_width, background_images) {
    this.parentElement = parentElement;
    this.height = container_height;
    // console.log("height>>", this.height);
    this.width = container_width;
    this.background_images = background_images;
    console.log(this.background_images[0]);
    this.image_height = this.background_images[0].clientHeight;
    console.log("image height>>", this.image_height);
    var that = this;
    this.car_speed = 5;
    this.image_index = 0;
    this.car_position = 1;

    this.init = function() {
        // Array.from(this.background_images).forEach(function(image, index) {
        //     // console.log(image, index);
        //     var margin = -(index * that.image_height);
        //     // console.log(margin);
        //     image.style.marginTop = -(index * that.image_height) + "px";
        //     // console.log("margin top>>", image.style.marginTop);
        // });
        this.image_index = -(this.image_height - this.height);
        this.background_images[0].style.marginTop = this.image_index + "px";
        console.log(this.background_images[0].style.marginTop);
        // console.log(that.background_images[0]);
        this.starting();
        // background_container


    }

    this.starting = function() {
        var start_box_parent = document.getElementsByClassName("main_container")[0];
        var start_box = document.createElement('div');

        start_box.style.height = (this.height / 3) + "px";
        // console.log(this.height);
        start_box.style.width = (this.width / 2) + "px";

        start_box.style.top = ((this.height / 2) / 2) + "px";
        start_box.style.paddingTop = 5 + "%";
        // console.log("top>>", start_box.style.paddingTop);
        start_box.style.left = ((this.width / 2) / 2) + "px";
        // start_box.style.paddingLeft = 4 + "px";
        start_box.style.paddingBottom = 8 + "%";
        // console.log("left>>", start_box.style.paddingLeft)
        start_box.innerHTML = "<b> Car Lane Game</b>"
        start_box.classList.add("start_box");
        var start_image = document.createElement('img');
        // start_image.src = "https://www.animatedimages.org/data/media/426/animated-button-image-0329.gif";
        start_image.src = "https://www.animatedimages.org/data/media/426/animated-button-image-0575.gif";

        start_box.appendChild(start_image);
        start_box_parent.appendChild(start_box);
        start_image.addEventListener("click", function() {
            start_box.style.display = "none";
            that.start_playing_game();
        })


    }

    this.start_playing_game = function() {
        var main_car_parent = document.getElementsByClassName("main_container")[0];
        var main_car_box = document.createElement('div');

        main_car_box.style.height = (this.height / 5) + "px";

        main_car_box.style.width = (this.width / 5) + "px";

        main_car_box.style.top = (this.height - (this.height / 4.5)) + "px";


        main_car_box.style.left = (this.width / 2.6) + "px";

        main_car_box.classList.add("main_car_box");
        var main_car_image = document.createElement('img');
        main_car_image.src = "./images/main_car.png";

        main_car_box.appendChild(main_car_image);
        main_car_parent.appendChild(main_car_box);



        window.addEventListener("keydown", function(event) {
            if (event.keyCode == '39') {
                // right arrow key
                if (that.car_position == 1) {
                    main_car_box.style.left = (that.width / 1.3846) + "px";
                    that.car_position = 2;
                }
                if (that.car_position == 0) {
                    main_car_box.style.left = (that.width / 2.6) + "px";
                    that.car_position = 1;
                }

                if (that.car_position == 2) {
                    main_car_box.style.left = (that.width / 1.3846) + "px";
                    that.car_position = 2;
                }


                // console.log("right>>", (that.width / 1.5574));
            }
            if (event.keyCode == '37') {
                //left arrow key
                if (that.car_position == 1) {
                    main_car_box.style.left = (that.width / 13.50357) + "px";
                    that.car_position = 0;
                }
                if (that.car_position == 2) {
                    main_car_box.style.left = (that.width / 2.6) + "px";
                    that.car_position = 1;
                }
                if (that.car_position == 0) {
                    main_car_box.style.left = (that.width / 13.50357) + "px";
                    that.car_position = 0;
                }

            }
        });

        // main_car_box.onkeydown = function(event) {
        //     if (event.keyCode == '39') {
        //         console.log("right");
        //         main_car_box.style.left = (this.width / 3.8) + "px";
        //     }
        //     if (event.keyCode == '37') { main_car_box.style.left = (this.width / 1.8) + "px"; }

        // }





        setInterval(this.play_game, 30);


    }

    this.play_game = function() {
        that.background_movement();


    }


    this.background_movement = function() {
        if (that.image_index >= -that.car_speed) {
            that.image_index = -(that.image_height - that.height);
            that.car_speed += 1;
        }
        that.image_index += that.car_speed;
        that.background_images[0].style.marginTop = that.image_index + "px";

    }

    this.ending = function() {

    }



}

var parentElement = document.getElementsByClassName("main_container");

start_game = new car_lane_game(parentElement, container_height, container_width, background_images).init();