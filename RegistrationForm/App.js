/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />
var app = angular.module("MyReg", []);
app.controller("MyCtrl", function ($scope, $http, UniqueEmail, $window) {

    $(document).ready(function () {
        $('#PleaseLogin').hover(function () {
            alert("Please Login and Edit Your Details");
        });
       
    });
    $(document).ready(function (){
        $("#ss").click(function () {
            $('#myModal').modal("hide");
        })
    })

   

    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.address = "";
    $scope.list = {};
    $scope.GetAllData = "";
    $scope.emailspan = "";

    $http.get("/Home/GetAllData").then(function (response) {
        $scope.GetAllData = response.data;
        console.log(response.data);
    })

    $window.onload = function () {
        $http.get("/Home/GetAllData").then(function (response) {
           // $scope.GetAllData = response.data;
            console.log(response.data);
        })
    }
    
    

    $scope.wasSubmitted = false;

    $scope.submit = function () {
        $scope.wasSubmitted = true;
    };



    $scope.Check = function () {
        UniqueEmail.Check($scope.email).then(function (response) {
            console.log(response.data);
           
          
            if (response.data ==0) {
                //  return "Email is already Exist";
                $scope.emailspan = "";
             
            }
            else {
                $scope.emailspan = "Email is already Exist Please Login";
                //alert();
            }
            
         
           
        })
    }

    $scope.SaveData = function () {
        
        var post = $http({
            method: "POST",
            url: "/Home/Index",

            data: "{username: '" + $scope.username + "', password: '" + $scope.password + "',email: '" + $scope.email + "',address:'" + $scope.address + "'}",

            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
           


            $scope.GetAllData.push(data)
         
        });
        $scope.username = "";
        $scope.password = "";
        $scope.email = "";
        $scope.address = "";
    }
    $scope.submit = function () {
        alert("Data is Successfully Saved.");
    }
    $scope.GetAllData = function () {
        $http.get("/Home/GetAllData").then(function (response) {
            console.log(response.data);
        })
    }
    $scope.DeleteRecord = function (email) {
      //  $window.location = "login2.html";
        $http.get("/Home/DeleteRecord?email=" + email)

    }

    $scope.login = function () {
        alert("try");
        $http.get("/Home/Login?name=" + $scope.username).then(function (response) {
            alert("in");
            console.log(response.data);
            $scope.loginDetails = response.data;
            if (response.data != 0) {
                if (response.data.username == $scope.loginDetails.username) {
                    alert("Your Successfully Login Welcome" + " " + $scope.username)
                }
            }
        })
    }
})

app.factory('UniqueEmail', function ($http) {
    alert("UEmail");
    var fac = {};

    fac.Check = function (email) {
        return $http.get("/Home/UniqueEmail?email=" + email);
    }
    return fac;
})




app.directive("disableBtn", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $el = $(element);
            var submitBtn = $el.find('button[type="submit"]');
            var _name = attrs.name;
            scope.$watch(_name + '.$valid', function (val) {
                if (val) {
                    submitBtn.removeAttr('disabled');
                } else {
                    submitBtn.attr('disabled', 'disabled');
                }
            })
        }
    }
})