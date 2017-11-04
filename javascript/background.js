
var dir = "../background_images/";

//get array of images
var images = [];
function ab(){
	return $.get("/javascript/background.json", function( jsontext ){
		var json = JSON.parse(jsontext);
		//find the season
		var date = new Date();
		if(date.getMonth() >= 2 && date.getMonth() < 5 ){
		dir += "spring/";
		images = json.spring;
		} else if(date.getMonth() >= 5 && date.getMonth() < 8 ){
		dir += "summer/";
		images = json.summer;
		} else if(date.getMonth() >= 8 && date.getMonth() < 11 ){
		dir += "fall/";
		images = json.fall;
		} else if(date.getMonth() == 11 || date.getMonth() >= 0 && date.getMonth() < 2 ){
		dir += "winter/";
		images = json.winter;
		}
	},'text');
}

//pick random image from array and set it as background
$.when(ab()).done(function() {
if ( document.getElementById("body") != null){document.getElementById("body").style = "background : url('" + dir + images[Math.floor(Math.random() * images.length)] + "');background-repeat:no-repeat; background-position:center center; background-attachment:fixed; background-size:cover;";}
});


