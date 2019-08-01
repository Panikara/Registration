/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />

var app = angular.module("MyLogin", ["appforget"]);

var appforget = angular.module("appforget", ['ngRoute']);
appforget.controller("myForgot", function ($scope,$http,$window) {
    alert("ForgetPage")
    $scope.Check = function () {
        $http.get("/Home/Login?name=" + $scope.name).then(function (response) {
            if (response.data != 0) {
                $window.location = "NewPassword.html";
            }
        })
    }
})

app.controller("myLoginCtrl", function ($scope,$http) {
    alert("Ctrl");
   
        $(document).ready(function () {
            $('#SingleRecordData').hide();
        });
   
       



    $scope.LogOut = function () {
        alert("Are You sure Log Out.");
        $scope.name = "";
        $scope.password = "";
        $scope.loginDetails = "";
        $(document).ready(function () {
            $('#SingleRecordData').hide();
        });

    }

    $scope.name = "";
    $scope.password = "";
    $scope.loginDetails = "";
   
    $scope.LoginForm = function () {
        alert("Login");
        $http.get("/Home/Login?name=" + $scope.name).then(function (response) {
            $scope.loginDetails = response.data;
            console.log($scope.loginDetails);
            if (response.data != 0) {
                if (response.data.Password == $scope.password) {
                    $scope.Error = "";
                    alert("Your Successfully Login Welcome" + " " + $scope.name)
                    $(document).ready(function () {
                        $('#SingleRecordData').show();
                    });
                    
                }
                else {
                    $scope.Error = "Your credentials are Invaild";
                    $scope.loginDetails = "";
                    alert("Your credentials are Invaild");
                }
               
            }
        })
        //Checkname.Check($scope.name).then(function (response) {
           
        //    $scope.loginDetails = response.data;
        //    console.log($scope.loginDetails);
        //    if (response.data != 0) {
        //       //$scope.Message = "you are Already Exist";
        //        alert("Your Successfully Login Welcome"+" "+ $scope.name)
        //       // $window.location = "Register.html";
        //    }
        //})
    }
    $scope.ClearData = function () {
        alert("clear");
    }
   
});

//app.factory('Checkname', function ($http) {
//    alert("name");
//    var fac = {};

//    fac.Check = function (name) {
//        return $http.get("/Home/Login?name=" + name);
//    }
//    return fac;
//})