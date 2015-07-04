addLoadedCallback(function() {
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
    
    function anchorByPath(path) {
        for(var i=0; i<anchors.length; i++) {
            if("/slide-"+$(anchors[i]).attr("data-link") == path) {
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
    
    $('a[href*=#]:not([href=#])').click(function(event) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = this.hash.replace("#", "");

            event.preventDefault();
            return false;
        }
    });
	
	$(".parallax").bind("mousewheel", function(e, delta) {
		if(!motion) {
			delta = delta || e.originalEvent.detail / 3 || e.originalEvent.deltaY / 100;		
			pos += delta;
			
			if(pos < 0) {
				pos = 0;
			} else if(pos > anchors.length-1) {
				pos = anchors.length-1;
			} else {
				motion = true;
                
				$(this).stop().animate({
					scrollTop:anchors[pos].realpos[1],
                    scrollLeft:anchors[pos].realpos[0]
				}, 1000, function() {
					motion = false;
                    window.history.pushState("", "", '/slide-' + $(anchors[pos]).attr("data-link"));
				});
			}
		}
		e.preventDefault();
	});
});