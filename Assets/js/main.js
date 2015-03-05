var pages = {
    Welcome: {pageUrl: "home.html"},
    "Our Macarons": {pageUrl: "macarons.html"},
    "Gifts & Parties": {pageUrl: "gifts-parties.html"},
    Contact: {pageUrl: "contact.html"}
};

$("document").ready(function(){
    createNav();
    getData("home.html");
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