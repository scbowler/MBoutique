var pages = {
    Welcome: {pageUrl: "home.html"},
    "Our Macarons": {pageUrl: "macarons.html"},
    "Gifts & Parties": {pageUrl: "gifts-parties.html"},
    Contact: {pageUrl: "contact.html"}
};

var formInfo = {
    name:  {regex0: /^[a-z ]+$/i,
            regex1: /^[a-z]{2,15}/i,
            regex2: / [a-z]{2,15}/i,
            regex3: /^[a-z]{2,15} [a-z]{2,15}$/i,
            error0: "-No numbers or symbols",
            error1: "-First name between 2-15 characters",
            error2: "-Last name between 2-15 characters",
            error3: "-First and last names",
            length: 4},
    email: {regex0: /@/g,
            regex1: /\.[a-z]{2,}$/i,
            regex2: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/i,
            error0: "-Requires @ symbol",
            error1: "-End with .com .net etc...",
            error2: "-Valid Email address",
            length: 3},
    phone: {regex0: /^[0-9 \-\.\(\)]+$/,
            regex1: /(\d{3}).?(\d{3}).?(\d{4})/,
            error0: "-'0-9' '()' '.' '-' Only",
            error1: "-Valid 10 digit phone number",
            length: 2},
    subject:{regex0: /^[a-z ]+$/i,
             regex1: /^.{2,50}$/,
             error0: "-No numbers or symbols",
             error1: "-Between 2-50 characters",
             length: 2},
    comments:{regex0: /^[a-z \?\.]+$/i,
             regex1: /^.{2,250}$/,
             error0: "-'Aa-Zz' '?' '.' Only",
             error1: "-Between 2-250 characters",
             length: 2},
    validated: 0
};

$("document").ready(function(){
    createNav();
    getData("contact.html");
    
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

function validate(ele){
    //console.log("My Ele= " + ele.val());
    //
    var userInput = ele.val();
    //console.log(ele.attr("gEntry"));
    if(userInput == "" || ele.attr("gEntry")){
        ele.removeAttr("gEntry");
        return true;
    }else{
        $('.error-container').remove();
    }
    var key = ele.attr("name");
    var div = $("<div class='error-container'></div>");
    
    for(var i=0; i < formInfo[key].length; i++){
        
        var innerDiv = $("<div>" + formInfo[key]["error" + i] + "</div>");
        if(userInput.match(formInfo[key]["regex" + i])){
            //console.log("I'm True!");
            innerDiv.removeClass('error');
            innerDiv.addClass('correct');
        }else{
            //console.log("I'm False!");
            //ele.removeClass("ok");
            ele.removeAttr("gEntry");
            innerDiv.removeClass('correct');
            innerDiv.addClass('error');
        }
        
        innerDiv.appendTo(div);
    }
    
    div.insertAfter(ele);
    
    if($(".correct").length === formInfo[key].length){
        //div.addClass("ok");
        ele.attr("gEntry", true);
        setTimeout(function(){div.html("OK!").addClass("correct")}, 400)
        setTimeout(function(){div.slideUp()}, 800);
        setTimeout(function(){console.log($(".ok").length)}, 500);
        
        return true;
    }else{
        return false;
    }
}

function submitForm(data, form){
    console.log("It Worked!!");
    console.log(data);
    form.val('');
    
}

/*function validate(){
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
                    regEx = /[a-zA-Z]{3,15} [a-zA-Z]{3,15}/;
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
                    regEx = /[a-zA-Z]{3,50}/;
                    errorMsg = "^ Between 3 and 50 Characters ^";
                    break;
                case "comments":
                    input = userInput.val();
                    regEx = /[\w \d]{3,250}/;
                    errorMsg = "^ Between 3 and 250 Characters. ^";
                    break;
                default: 
                    regEx = null;
                    break;
        }
        
        if(!input.match(regEx)){
            $("<div class='error alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + errorMsg + "</div>").insertAfter($(this)).hide().fadeIn();
            error = true;
        }else{
            formData[fieldName] = input;
        }
    });
    
    if(error){
        $("<div class='error alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Form was not submitted!</div>").insertAfter(".btn").hide().fadeIn();
        return false;
    }else{
        $("<div class='error alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Success!</strongs><br>Message has been sent.</div>").insertAfter(".btn").hide().fadeIn();
        submitForm(formData, input_info);
        return true;
    }
}*/