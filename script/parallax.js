addLoadedCallback(function() {
    var pos = 0;
    var motion = false;
    
    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft,curtop];
    }
	(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();
    
    var anchors = $("a[id$=_anchor]"), pos = 0, motion = false;
    $(anchors).each(function(i) {
        anchors[i].realpos = findPos(this);
    });
    console.log(anchors);
    
    function anchorByPath(path) {
        for(var i=0; i<anchors.length; i++) {
            if("/slide-"+$(anchors[i]).attr("data-link") == path) {
                return i;
            }                
        }
        return 0;
    }
    
    function anchorByHash(hash) {
        for(var i=0; i<anchors.length; i++) {
            if(hash == "#"+$(anchors[i]).attr("id")) {
                return i;
            }
        }
        return 0;
    }

    var p = anchorByPath(location.pathname);
    if(p>0) {
        $('.parallax').scrollTop(anchors[p].realpos[1]);
        $('.parallax').scrollLeft(anchors[p].realpos[0]);
        pos = p;
    }
    $('a[href*=#]:not([href=#]), .anchor-link').click(function(event) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var pos = anchorByHash(this.hash);
            console.log(this.hash);
            
            scrollToIndex(pos);
            event.preventDefault();
            return false;
        } else if($(this).hasClass("anchor-link")) {
            console.log(this.target);
            
            scrollToIndex(anchorByHash(this.target));
            event.preventDefault();
            return false;
        }
    });
    
	$(".parallax").bind("mousewheel", function(e, delta) {
        if($(window).width() < 1280) {
            $(this).css("overflow-y", "scroll");
            console.log("mobile?");
            return true;
        }
            
		if(!motion) {
			delta = delta || e.originalEvent.detail / 3 || e.originalEvent.deltaY / 100;		
			pos += delta;
			
			if(pos < 0) {
				pos = 0;
			} else if(pos > anchors.length-1) {
				pos = anchors.length-1;
			} else {
				scrollToIndex(pos);
			}
		}
		e.preventDefault();
	});
    
    function scrollToIndex(index, skiptrack) {
        if(!motion) {
            motion = true;
            pos = index;
            
            $(".parallax").stop().animate({
                scrollTop:anchors[pos].realpos[1],
                scrollLeft:anchors[pos].realpos[0]
            }, 1000, function() {
                motion = false;
                if(!skiptrack)
                    window.history.pushState("", "", '/slide-' + $(anchors[pos]).attr("data-link"));
                
                // Let google analytics know about the navigation
                if(typeof ga != "undefined")
                    ga("send", "pageview", '/slide-' + $(anchors[pos]).attr("data-link"))
            });
        }
    }
    
    $(window).on("popstate", function(e) {
        scrollToIndex(anchorByPath(location.pathname), true);
        console.log(e);
    });
});