var pages = {
    Welcome: {pageUrl: "home.html"},
    "Our Macarons": {pageUrl: "macarons.html"},
    "Gifts & Parties": {pageUrl: "gifts-parties.html"},
    Contact: {pageUrl: "contact.html"}
};

$("document").ready(function(){
    createNav();
    getData("home.html");
    
    $("#formBtn").on("click", function(){
        validate();
    });
    
    $(".contact-form").on("focusleft", "input", function(){
        alert($(this) + " lost focus");
    });
});

function getData(link){
    $.get(link, function(data){
        $('#contentDisplay').html(data);
    });
}

function createNav(){
    
    var mainNav = $("#mainNav");
    for(item in pages){
        var newLi = $("<li><a>" + item + "</a></li>");
        newLi.on("click", "a", function(){
            var myPage = pages[$(this).text()];
            getData(myPage.pageUrl);
        })
        mainNav.append(newLi);
    }
}

function validate(){
    var input_info = $("form input, form textarea");
    var error = false;
    var formData = {};
    
    $(".error, .correct").slideUp().remove();
    
    input_info.each(function(){
        
        var input = '';
        var regEx = null;
        var errorMsg = '';
        var userInput = $(this);
        var fieldName = userInput.attr('name');
        
        switch(fieldName){
                
                case "name":
                    input = userInput.val();
                    regEx = /[a-zA-Z]{2,15} [a-zA-Z]{2,15}/;
                    errorMsg = "^ Example: 'John Smith' ^";
                    break;
                case "email":
                    input = userInput.val();
                    regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    errorMsg = "^ Example: 'name@mail.com' ^";
                    break;
                case "phone":
                    input = userInput.val();
                    regEx = /(\d{3}).?(\d{3}).?(\d{4})/;
                    errorMsg = "^ Example: '888-888-8888' ^";
                    break;
                case "subject":
                    input = userInput.val();
                    regEx = /[a-zA-Z].{2,100}/;
                    errorMsg = "^ Between 2 and 100 Characters ^";
                    break;
                case "comments":
                    input = userInput.val();
                    regEx = /[\w \d].{2,1000}/;
                    errorMsg = "^ Between 2 and 1000 Characters. ^";
                    break;
                default: 
                    regEx = null;
                    break;
        }
        
        if(!input.match(regEx)){
            $("<span class='error'>" + errorMsg + "</span>").insertAfter($(this)).hide().fadeIn();
            error = true;
        }else{
            formData[fieldName] = input;
        }
    });
    
    if(error){
        $("<div class='error'>Form was not submitted!</div>").insertAfter(".btn").hide().fadeIn();
        return false;
    }else{
        $("<div class='correct'>Success!<br>Message has been sent.</div>").insertAfter(".btn").hide().fadeIn();
        submitForm(formData, input_info);
        return true;
    }
}

function submitForm(data, form){
    console.log("It Worked!!");
    console.log(data);
    form.val('');
    
}