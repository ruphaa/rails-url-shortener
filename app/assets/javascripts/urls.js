
$(document).ready(function(){

    compileLinkDisplayTemplate();
    compileFormTemplate();

    $('#submit_btn').click(function() {
        console.log('hrll');
        const name = $('#url-input').val();
        const dataString = {url: name}
        $.ajax({
            url: "http://localhost:3000/urls",
            type: "POST",
            data: dataString,
            success: function(response){
              console.log(response);
              const urlId = response.urlId;
              const url = response.shortenedUrl;
              const linkContext = {
                  urlId: urlId,
                  shortUrl: url,
                  name: "ruphaa"
              };
              $('form').find('input:text').val('');
              $('.go-grow').remove();
              $('.url-wrapper').append('<div class="go-grow"></div>');
              compileLinkDisplayTemplate(linkContext);
            }
        });
    });

});

// compile handlebars template on document load

function compileLinkDisplayTemplate(linkContext) {
    $('.go-grow').html(HandlebarsTemplates['link'](linkContext));
}

function compileFormTemplate() {
    $('#form-wrapper').html(HandlebarsTemplates['form']({

    }));
}

// service calls


const displayUrlDetails = function(id) {
    const redirectUrl = "http://localhost:3000/urls/"+id+"/";
    console.log(redirectUrl);
    $.ajax({
        url: redirectUrl,
        type: "GET",
        success: function(response){
            console.log("success");
        }
    });
};

const displayNewForm = function() {
    $.ajax({
        url: "http://localhost:3000/urls/new",
        cache: false,
        success: function(html){
          $("#results").append(html);
        }
    });
};

