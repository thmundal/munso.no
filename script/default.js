var callbacks = [];
function l() {
	var css = ["http:\/\/fonts.googleapis.com/css?family=Open+Sans+Condensed:300","css/style.css","css/style-parallax.css"];
	// DO NOT LOAD THIS FILE (default.js) IN THE ARRAY! MEGASUPERRECURSIONMONSTER!
	var js = ["script/parallax.js","http:\/\/code.jquery.com/jquery-2.1.4.min.js"];
	var count = 0;

	function complete() {
		if((++count)===(css.length + js.length)) {
			callbacks.forEach(function(i) { i.call() });
		}
	}
	css.forEach(function(i) { {var c = document.createElement("link"); c.href = i; c.type = "text/css"; c.rel = "stylesheet"; document.head.appendChild(c); c.onload = complete; } });
	js.forEach(function(i) { {var j = document.createElement("script"); j.src=i; document.head.appendChild(j); j.onload = complete; } }); 
}

var raf = requestAnimationFrame || mozRequestAnimationFrame ||
		  webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) { raf(l);}
else {window.addEventListener('load', l);};

function addLoadedCallback(callback) {
	callbacks.push(callback);
}

addLoadedCallback(function() {
    function loadComplete() {
        if(thingstoload == thingsloaded) {
            document.getElementById("loading").style.display = "none";
        }        
    }
    
    // Load layer images
    var layers = $('.layer');
    var images = $('img');
    
    var thingstoload = images.length;
    var thingsloaded = 0;
    
    layers.each(function(i) {
        var bg = $(this).css("background-image");
        
        if(bg != "none") {
            thingstoload++;
            var url = bg.match(/(url\()+(.*)+(\))/)[2];
            var img = document.createElement("img");
            img.src = url;
            img.onload = function() {
                thingsloaded++;
                loadComplete();
            }
        }
    });
    $(images).one("load", function() {
        thingsloaded++;
        loadComplete();
    }).each(function() {
        if(this.complete) {
            $(this).load();
        }
    });
    
    loadComplete();
});