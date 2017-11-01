
var dir = "../background_images/";

//find the season
var date = new Date();
if(date.getMonth() >= 2 && date.getMonth() < 5 ){
dir += "spring/";
} else if(date.getMonth() >= 5 && date.getMonth() < 8 ){
dir += "summer/";
} else if(date.getMonth() >= 8 && date.getMonth() < 11 ){
dir += "fall/";
} else if(date.getMonth() == 11 || date.getMonth() >= 0 && date.getMonth() < 2 ){
dir += "winter/";
}


//create array of images
var images = [];
function ajax() {
	return $.ajax({
		url : dir,
		success: function (data) {
		    $(data).find("a").attr("href", function (i, val) {
		        if( val.match(/\.(jpe?g|png|gif)$/) ) { 
		            images.push(dir + val);
		        } 
		    });
		}
	});
}
ajax();

//pick random image from array and set it as background
$.when(ajax()).done(function() {
if ( document.getElementById("body") != null){document.getElementById("body").style = "background : url('" + images[Math.floor(Math.random() * images.length)] + "');background-repeat:no-repeat; background-position:center center; background-attachment:fixed; background-size:cover;";}
});


