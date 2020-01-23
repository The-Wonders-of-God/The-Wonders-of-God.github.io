//Made by Jacob Piela
comments = "<br/><br/><div id='disqus_thread'></div>\
<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>";

//add newest posts to page
function getResentPosts(num) {
var postnames = [];
var addposts = "";
	return $.get("/javascript/posts.json", function( jsontext ){
		var json = JSON.parse(jsontext);
		postnames = json.posts;
				$.get(postsDir + postnames[postnames.length - 1], function( posttext ) {
					if(posttext != null){
    					addposts += posttext + "<a href='/?post="+postnames[postnames.length - 1] + "'>Comments</a>";
    				} else {
    					addposts += "<h2>Sorry thare was an error</h2>";
    				}
				}, 'text');
				$.get(postsDir + postnames[postnames.length - 2], function( posttext ) {
					if(posttext != null){
    					addposts += posttext + "<a href='/?post="+postnames[postnames.length - 2] + "'>Comments</a>";
    				} else {
    					addposts += "<h2>Sorry thare was an error</h2>";
    				}
				}, 'text');
			

	$.get(postsDir + postnames[postnames.length - 3], function( posttext ) {
					if(posttext != null){
    					addposts += posttext + "<a href='/?post="+postnames[postnames.length - 3] + "'>Comments</a>";
    				} else {
    					addposts += "<h2>Sorry thare was an error</h2>";
    				}
    				if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = addposts ;}
				}, 'text');
			
	},'text');
}

function getpost(post) {
$.get(postsDir + post , function( posttext ) {
	if(posttext != null){
    	if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = posttext + comments;}
    } else {
    	if ( document.getElementById("post") != null){document.getElementById("post").innerHTML = "<h2>Sorry there is no post named " + post + "</h2>";}
    }
}, 'text');
}

//if post selected display it else display 3 most recent posts
if(findGetParameter("post") == null){
	getResentPosts();
} else {
	getpost(findGetParameter("post"));
}
