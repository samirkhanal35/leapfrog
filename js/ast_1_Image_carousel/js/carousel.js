var images = document.getElementsByTagName("img");
var container = document.getElementsByClassName("carousal_container")[0];
var image_container = document.getElementsByClassName("image_container")[0];

var indicators = document.getElementsByClassName("indicator");
//console.log(indicators[0]);
var indicator_numbers = indicators.length;

var container_width = container.clientWidth;
var number_of_images = images.length;


var img_index = 0;

function auto_slide() {
    setInterval(slide, 1500);

}

function slide() {

    for (var i = 0; i < number_of_images; i++) {

        images[i].style.display = "none";
        indicators[i].style.backgroundColor = "transparent";
    }
    img_index++;
    if (img_index > number_of_images) { img_index = 1 }
    images[img_index - 1].style.display = "block";
    indicators[img_index - 1].style.backgroundColor = "oldlace";

}

auto_slide();



function show_image(n) {
    for (var i = 0; i < number_of_images; i++) {

        images[i].style.display = "none";
        indicators[i].style.backgroundColor = "transparent";
    }
    indicators[n - 1].style.backgroundColor = "oldlace";
    images[n - 1].style.display = "block";
    img_index = n - 1;
}



function plus_image(m) {
    if (m > 0) {
        show_image(img_index + m);
    } else {
        show_image(img_index);
    }
}