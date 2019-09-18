/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />
var app = angular.module("AutoComplete", []);

app.controller("MyAutoComplete", function ($scope, $http) {
    alert("auto");
    $scope.AutoEmail = function (email) {
  
        $http.get("/Home/UniqueEmail?email=" + $scope.email).then(function (response) {
            $scope.all = response.data;
            console.log($scope.all);
            $scope.username = response.data[0].UserName;
            $scope.password = response.data[0].Password;

        })

    }
})