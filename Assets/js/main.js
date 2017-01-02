
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'homeController',
        controllerAs: 'hc'
    }).when('/contact-us', {
        templateUrl: 'contact.html',
        controller: 'contactController',
        controllerAs: 'cc'
    }).when('/gifts-parties', {
        templateUrl: 'gifts-parties.html',
        controller: 'giftController',
        controllerAs: 'gc'
    }).when('/our-macarons', {
        templateUrl: 'macarons.html',
        controller: 'macaronsController',
        controllerAs: 'mc'
    }).otherwise({
        redirectTo: '/'
    })
});

app.controller('homeController', function(){
    this.imgUrl = 'Assets/images/welcome-image.png';

}).controller('contactController', function(){
    this.imgUrl = 'Assets/images/contact-image.png';

}).controller('giftController', function(){
    this.imgUrl = 'Assets/images/gifts-parties-image.png';

}).controller('macaronsController', function(){
    this.imgUrl = 'Assets/images/our-macarons-image.png';

});