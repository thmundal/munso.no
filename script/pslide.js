
/* Smooth scrolling to anchor-points on page (slides)

TODO:
- Dynamically add back-to-top button
- Some determination about which anchor-points to include, or even maybe custom containers (non-anchors)
- Make it into a jQuery-plugin

*/
var pslide = {
    slides:[],
    index:0,
    target:$("body"),
    motion:false,
    offset:0,

    init: function(target) {
        this.target = target;
        this.slides = $("a[name]");
        if(location.hash != "")
            this.index = this.find(location.hash.replace("#", ""));
    },

    slideTo:function(i) {
        if(!this.motion) {
            if(isNaN(i)) 
                var i = this.find(i);
            
            if(i>this.slides.length || i===false)
                return;

            var pos = this.slides[i].offsetTop;
            ofst = this.offset;

            this.motion = true;
            $(this.target).animate({
                scrollTop: pos + ofst
            }, 1000, function() {
                pslide.motion = false;
            });
            this.index = i;
            

            if(pslide.index > 0) {
                $('.back-to-top').css("display", "block");
            } else {
                $('.back-to-top').css("display", "none");
            }
        }
    },
    
    find: function(name) {
        for(var i in this.slides) {
            if(this.slides[i].tagName == "A") {
                
                // Apparently in FF and IE this.slides[i].hasOwnProperty("name") returns false...
                if(this.slides[i].name == name) {
                    return i;
                }
            }
        }
        return false;
    },
    
    wheelSlide:function(delta, callback) {
        if(!pslide.motion) {
            if(delta > 0 && pslide.index > 0)
                pslide.index--;
            else if(delta < 0 && pslide.index < pslide.slides.length - 1)
                pslide.index++;
            else
                return;

            pslide.slideTo(pslide.index);
            
            if(typeof(callback) == "function") {
                callback.call(this);
            }
        }
    }
}