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
    })
});