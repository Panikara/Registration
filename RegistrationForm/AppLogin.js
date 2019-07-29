/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />
var app = angular.module("MyLogin", []);
app.controller("myLoginCtrl", function ($http) {
    alert("hello")
    $scope.loginDetails = {};
    $scope.Login = function () {
        alert("Login");
        var post = $http({
            method: 'POST',
            url: "/Home/Login",
            data: "{username: '" + $scope.username + "', password: '" + $scope.password + "'}",
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        
    }
})