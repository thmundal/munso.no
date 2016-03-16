addLoadedCallback(function() {
    var height = document.body.clientHeight,
        width = document.body.clientWidth;
    
    is_mobile = (width < 1280);
        
    
    $(window).bind("resize", function(event) {
        height = document.body.clientHeight;
        width = document.body.clientWidth;
        is_mobile = (width < 1280);
    });
    
    function loadComplete() {
        if(thingstoload == thingsloaded) {
            document.getElementById("loading").style.display = "none";
        }
    }    
    
    if(is_mobile) {
        adjustToMobile();
    }
    
    function adjustToMobile() {
        console.log("Probably a mobile or tablet, adjust accordingly");
        // document.body.requestFullScreen();
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
    
    $("#the-contact-form").on("submit", function(e) {
        var data = new Object;
        var valid = true;
        $("#the-contact-form input[type!=submit], #the-contact-form select, #the-contact-form textarea").each(function(elem) {
            if(!$(this).val()) {
                $(this).css("border-color", "#F00");
                $(this).parent().append($("<div></div>")
                    .addClass("error-message")
                    .html($(this).attr("data-error"))
                    .css({
                        "font-size":"16px",
                        position:"absolute",
                        top:$(this).offset().top + 3 + "px",
                        left:$(this).offset().left + $(this).width() + 15 + "px",
                        padding:"3px",
                        background:"#F00",
                        color:"#FFF"
                    }));
                $(this).on("keydown", function() {
                    $(this).parent().find(".error-message").remove();
                });
                valid = false;
                return;
            }
            data[$(this).attr("name")] = $(this).val()
        });
        
        if(valid) {
            $.ajax({
                url:"contact.php",
                method:"POST",
                data: data
            }).done(function(data) {
                console.log(data);
                if(data.status == 200) {
                    $("#contact-form").html("<p style='text-align:center'>Thank you for your message</p>")
                }
            });
        }
        return false;
        e.preventDefault();
    });
    
    $("#fb-like").attr({
        "class":"fb-like",
        "data-href":"https://developers.facebook.com/docs/plugins/",
        "data-layout":"button",
        "data-action":"like",
        "data-show-faces":"false",
        "data-share":"false"
    }).css("z-index", "50000");
    
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=272097879492470";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});