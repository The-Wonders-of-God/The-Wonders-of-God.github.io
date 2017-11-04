var posts = [];
var dir1 = "../posts/";
var postsyear = [];

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getpostyear() {
	postsyear = [];
	var date = new Date();
	return $.get("/javascript/posts.json", function( jsontext ){
		//put all posts in postsyear array
		var json = JSON.parse(jsontext);
		postsyear = json.posts;
		    postsyear.sort(function(a, b){return parseInt(a.substring(12,a.length), 10) - parseInt(b.substring(12,b.length), 10)});
		    //format the posts into a string
			for (var i = 2014; i < date.getFullYear(); i++){
				var yearString = "";
				yearString += "<li class='has-sub'><a href='#'><span>" + i +"</span></a><ul>" ;
				for(var j=0; j<postsyear.length; j++){
					if(postsyear[j].includes(i)){
						if ((i%2) == 0){
							 yearString += "<li class='even'><a href='?post=" + postsyear[j] + "'><span>" + postsyear[j].substring(0,11) +"</span></a></li>" ;
						} else {
							 yearString +=  "<li class='odd'><a href='?post=" + postsyear[j] + "'><span>"+ postsyear[j].substring(0,11) +"</span></a></li>" ;
						}
					}
				}
					if(yearString == "<li class='has-sub'><a href='#'><span>" + i +"</span></a><ul>"){
						yearString += "<li class='odd'><a href='#'><span>No posts</span></a></li>";
					}
				//add string to document
				if ( document.getElementById("innercssmenu") != null){document.getElementById("innercssmenu").innerHTML +=  yearString + "</ul> </li>" ;}
				if ( document.getElementById("menu2") != null){document.getElementById("menu2").innerHTML +=  yearString + "</ul> </li>" ;}
			}
		
	},'text');
}

//animate side bar menu
$.when(getpostyear()).done(function() {
$('#cssmenu ul ul li:odd').addClass('odd');
$('#cssmenu ul ul li:even').addClass('even');
$('#cssmenu > ul > li > a').click(function() {
  $('#cssmenu li').removeClass('active');
  $(this).closest('li').addClass('active'); 
  var checkElement = $(this).next();
  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('#cssmenu ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }
  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false;
  }
});
});
