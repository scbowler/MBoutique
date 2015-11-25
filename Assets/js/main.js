
    var app = angular.module("mboutiqueApp", ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl: "home.html",
            controller: "mainController"
        })
        .when('/our-macarons', {
            templateUrl: "macarons.html",
            controller: "macaronsController"
        })
        .when('/gifts-parties', {
            templateUrl: "gifts-parties.html",
            controller: "giftsController"
        })
        .when('/contact', {
            templateUrl: "contact.html",
            controller: "contactController"
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('mainController', function($scope){
    $scope.banner = "Assets/images/welcome-image.png";

}).controller('macaronsController', function($scope){
    $scope.banner = "Assets/images/our-macarons-image.png";

}).controller('giftsController', function($scope){
    $scope.banner = "Assets/images/gifts-parties-image.png";

}).controller('contactController', function($scope){
    $scope.banner = "Assets/images/contact-image.png";
});