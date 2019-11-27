var images = document.getElementsByClassName("image_container")[0].getElementsByTagName("img");
//console.log(images[0]);
var image_width = images[0].clientWidth;
var number_of_images = images.length;
//console.log(number_of_images);
var image_container_width = document.getElementsByClassName("image_container")[0];
image_container_width.clientWidth = (number_of_images * image_width) + "px";

var image_container_total_width = (number_of_images * image_width);
// console.log(image_container_total_width);

image_container_width.style.transition = "all 0.4s ease-in-out";
var indicators = document.getElementsByClassName("indicator");

var image_indicators = document.getElementsByClassName("image_indicators")[0];

var next_arrow = document.getElementsByClassName("next_arrow")[0];
console.log(next_arrow);
var previous_arrow = document.getElementsByClassName("previous_arrow")[0];
console.log(previous_arrow);
var img_index = 0;

var timer = 0;

function add_indicator() {
    for (var i = 0; i < this.number_of_images; i++) {
        var ind = document.createElement('div');
        ind.classList.add("indicator");
        var main_class = document.getElementsByClassName("image_indicators")[0];
        main_class.appendChild(ind);

        (function(i) {
            ind.addEventListener("click", function() {

                // console.log("entered j", i);

                show_image(i + 1);

            });
        }(i));


    }
    //console.log(indicators);
    this.image_indicators.style.display = "flex";
    this.image_indicators.style.marginBottom = 5 + "%";
    for (var j = 0; j < this.indicators.length; j++) {
        this.indicators[j].style.marginLeft = 2 + "%";


        this.image_indicators.style.marginLeft = (15 - (j * 3)) + "%";

    }


}



add_indicator();






//console.log(image_container_width);



for (var i = 0; i < this.number_of_images; i++) {
    this.images[i].style.marginLeft = (i * this.image_width) + "px";
    //console.log(images[i].style.marginLeft);
}

var shift = 0;
// var current_image = 0;


function auto_slide() {
    clearInterval(timer);
    timer = setInterval(slide, 75);

}

function slide() {
    if (this.shift % 640 == 0) {
        this.shift_value = this.shift;
        //console.log("upper %640 shift>>", this.shift_value);
        for (var i = 0; i < this.number_of_images; i++) {

            this.indicators[i].style.backgroundColor = "transparent";
        }
        this.img_index++;
        if (this.img_index > this.number_of_images) { this.img_index = 1 }

        this.indicators[img_index - 1].style.backgroundColor = "oldlace";
        clearInterval(timer);
        //this.shift = this.shift_value;

        //console.log("lower %640 shift>>", this.shift);
        setTimeout(function() { auto_slide(); }, 1000);

    }



    this.image_container_width.style.marginLeft = -(this.shift) + "px";
    this.shift += 10;
    // console.log(this.shift);
    //console.log("outer timer shift>>", this.shift);
    if (this.shift == this.image_container_total_width - 620) {
        clearInterval(timer);
        //console.log("inside timer shift>>", this.shift);
        this.shift = 0;
        setTimeout(function() { auto_slide(); }, 1000);

    }

}

auto_slide();




var set_index = 0;

function show_image(n) {
    clearInterval(timer);
    for (var i = 0; i < this.number_of_images; i++) {


        this.indicators[i].style.backgroundColor = "transparent";
    }

    this.img_index = n - 1;
    if (this.img_index == this.number_of_images) { this.img_index = 0 }
    if (this.img_index < 0) { this.img_index = this.number_of_images - 1 }
    this.set_index = this.img_index;
    //console.log("show image index>>", this.img_index);
    this.indicators[this.set_index].style.backgroundColor = "oldlace";

    this.shift = (this.set_index) * 640;

    this.image_container_width.style.marginLeft = -(this.shift) + "px";
    setTimeout(function() { auto_slide(); }, 1000);
}



function plus_image(m) {
    // this.timer.stop();
    if (m > 0) {
        show_image(this.img_index + 1);
    } else {
        show_image(this.img_index);
    }
}

// next_arrow.addEventListener("click", function() {

//     // console.log("entered j", i);

//     show_image(this.img_index + 1);

// });

// previous_arrow.addEventListener("click", function() {

//     // console.log("entered j", i);

//     show_image(this.img_index);

// });