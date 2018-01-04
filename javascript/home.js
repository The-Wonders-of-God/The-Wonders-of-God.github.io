comments = "<br/><br/><div id='disqus_thread'></div>\
<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>";

//add newest posts to page
function getresentposts(num) {
var postnames = [];
var addposts = "";
	return $.get("/javascript/posts.json", function( jsontext ){
		var json = JSON.parse(jsontext);
		postnames = json.posts;
			for(var j=1; j<num+1; j++){
				$.get(dir1 + postnames[postnames.length - j], function( posttext ) {
					if(posttext != null){
    					addposts += posttext + "<a href='/?post="+postnames[postnames.length - j] + "'>Comments</a>";
    				} else {
    					addposts += "<h2>Sorry thare was an error</h2>";
    				}
    				if(j+1>=num) {if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = addposts ;}}
				}, 'text');
			}
	},'text');
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
	getresentposts(3);
} else {
	getpost(findGetParameter("post"));
}
