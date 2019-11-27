var images = document.getElementsByClassName("image_container")[0].getElementsByTagName("img");
//console.log(images[0]);
var image_width = images[0].clientWidth;
var number_of_images = images.length;
//console.log(number_of_images);
var image_container_width = document.getElementsByClassName("image_container")[0];
image_container_width.clientWidth = (number_of_images * image_width) + "px";

var image_container_total_width = (number_of_images * image_width);
console.log(image_container_total_width);

image_container_width.style.transition = "all 0.4s ease-in-out";
var indicators = document.getElementsByClassName("indicator");

var image_indicators = document.getElementsByClassName("image_indicators")[0];

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

                console.log("entered j", i);

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
    timer = setInterval(slide, 1500);

}

function slide() {

    for (var i = 0; i < this.number_of_images; i++) {

        this.indicators[i].style.backgroundColor = "transparent";
    }
    this.img_index++;
    if (this.img_index > this.number_of_images) { this.img_index = 1 }

    this.indicators[img_index - 1].style.backgroundColor = "oldlace";

    image_container_width.style.marginLeft = -(this.shift) + "px";
    this.shift += 640;
    if (this.shift == image_container_total_width) { this.shift = 0 }

}

auto_slide();







function show_image(n) {
    clearInterval(timer);
    for (var i = 0; i < this.number_of_images; i++) {


        this.indicators[i].style.backgroundColor = "transparent";
    }

    this.img_index = n - 1;
    console.log(img_index);
    this.indicators[this.img_index].style.backgroundColor = "oldlace";
    this.shift = (this.img_index) * 640;
    this.image_container_width.style.marginLeft = -(this.shift) + "px";
    auto_slide();
}



function plus_image(m) {
    // this.timer.stop();
    if (m > 0) {
        show_image(this.img_index + m);
    } else {
        show_image(this.img_index);
    }
}