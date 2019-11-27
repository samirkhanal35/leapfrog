var images = document.getElementsByTagName("img");
var container = document.getElementsByClassName("carousal_container")[0];
var carousal_container = document.getElementsByClassName("carousal_container");
var image_container = document.getElementsByClassName("image_container")[0];
var image_container_width = document.getElementsByClassName("image_container");

//image_container_width.style.transition = "all 0.4s ease-in-out";

var indicators = document.getElementsByClassName("indicator");
//console.log(indicators[0]);
var indicator_numbers = indicators.length;

var image_width = images[0].clientWidth;

var container_width = container.clientWidth;

var number_of_images = images.length;

image_container_width.clientWidth = (number_of_images * image_width) + "px";

//console.log(image_container_width);

var img_index = 0;

for (var i = 0; i < number_of_images; i++) {
    images[i].style.marginLeft = (i * image_width) + "px";
    console.log(images[i].style.marginLeft);
}


function auto_slide() {
    setInterval(slide, 2000);

}

function slide() {

    for (var i = 0; i < number_of_images; i++) {
        images[i].style.marginLeft = (i * image_width) + "px";
        indicators[i].style.backgroundColor = "transparent";
    }
    img_index++;
    if (img_index > number_of_images) { img_index = 1 }
    //image_container_width.style.marginLeft = -(img_index * image_width) + "px";
    images[img_index - 1].style.marginLeft = 0 + "px";
    // images[img_index - 1].style.display = "block";
    indicators[img_index - 1].style.backgroundColor = "oldlace";

}

auto_slide();



function show_image(n) {
    for (var i = 0; i < number_of_images; i++) {

        images[i].style.marginLeft = (i * image_width) + "px";
        indicators[i].style.backgroundColor = "transparent";
    }
    indicators[n - 1].style.backgroundColor = "oldlace";
    images[n - 1].style.marginLeft = 0 + "px";
    img_index = n - 1;
}



function plus_image(m) {
    if (m > 0) {
        show_image(img_index + m);
    } else {
        show_image(img_index);
    }
}