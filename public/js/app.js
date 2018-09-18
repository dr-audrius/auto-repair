var app = angular.module("myApp", ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: "../html/cars.html",
        controller: "carCtrl"
    }).when('/cars', {
        templateUrl: "../html/cars.html",
        controller: "carCtrl"
    }).when('/car_repairs/:operation/:carId', {
        templateUrl: "../html/car_repairs.html",
        controller: "carCtrl"
    }).when('/add_car', {
        templateUrl: "../html/add_car.html",
        controller: "carCtrl"
    });



    var default_port = 4300;
    var default_url = "http://localhost";


});


























