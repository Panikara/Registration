/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />

var app = angular.module("Mouseevents", []);

app.controller("MyMouseController", function ($scope,$http) {
    $scope.show = function () {
      //  alert("try to show");
        $(document).ready(function () {
            $("#try").hover(function () {
                $('#myModal').modal('show');
            });
        });
    }
    
})