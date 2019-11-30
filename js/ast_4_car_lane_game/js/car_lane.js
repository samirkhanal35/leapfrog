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

    this.init = function() {
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
            return;
        })


    }

    this.ending = function() {

    }



}

var parentElement = document.getElementsByClassName("main_container");

start_game = new car_lane_game(parentElement, container_height, container_width, background_images).init();