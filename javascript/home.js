comments = "";

//add posts with index between num1 and num2 to page
function getresentposts(num1,num2) {
var postnames = [];
var addposts = "";
	return $.ajax({
		url : dir1,
		success: function (data) {
		    $(data).find("a").attr("href", function (i, val) {
		    		//postnames.push(new Array(2));
		            //postnames[postnames.length-1][0] = parseInt(val.substring(12,val.length), 10);
		            //postnames[postnames.length-1][1] = val;
		            postnames.push(val);
		    });
		    //sort postnames by index newest first
			//postnames.sort(function sortFunction(a, b) {if (a[0] === b[0]) {return 0;}else {return (a[0] > b[0]) ? -1 : 1;}});
			postnames.sort(function(a, b){return parseInt(b.substring(12,b.length), 10) - parseInt(a.substring(12,a.length), 10) });
			console.log(postnames);
			for(var j=num1; j<num2; j++){
				$.get(dir1 + postnames[j], function( posttext ) {
					if(posttext != null){
    					addposts += posttext + comments;
    				} else {
    					addposts += "<h2>Sorry there was an error</h2>";
    				}
    				if(j+1>=num2) {if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = addposts;}}
				}, 'text');
			}
		}
	});
}

function getpost(post) {
$.get(dir1 + post , function( posttext ) {
	if(posttext != null){
    	if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = posttext + comments;}
    } else {
    	if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = "<h2>Sorry there is no post named " + post + "</h2>";}
    }
}, 'text');
}

//if post selected display it else display 3 most recent posts
if(findGetParameter("post") == null){
	getresentposts(5,8);
} else {
	getpost(findGetParameter("post"));
}

