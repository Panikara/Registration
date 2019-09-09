/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />

var app = angular.module("MyLogin", ["appforget", "NewPassword"]);

var newpassword = angular.module("NewPassword", ['ngRoute']);

newpassword.controller("myNewPassword", function ($scope, $http) {
    //alert("NewPassword");
    $scope.name = "";
    
    $scope.tryToChangepassword = "";
    $scope.name = $scope.tryToChangepassword.UserName;
    $scope.password = "";
    $scope.email = $scope.tryToChangepassword.Email;
    $scope.address = $scope.tryToChangepassword.Address;
    $scope.UpdatePassword = function () {
       // alert("Try to NewPassword")
        $http.get("/Home/Login?name=" + $scope.name).then(function (response) {
            $scope.tryToChangepassword = response.data;
            if (response.data != 0) {
                $scope.emailspan = "";
            } else {
                $scope.emailspan = "New Please Register or Enter Correct Username ";
                //alert();
            }

           
           // console.log($scope.tryToChangepassword);
        })
    }
    $scope.SetComplete = function () {

      
         $http({
            method: "POST",
            url: "/Home/Update",

            data: "{id: '" + $scope.tryToChangepassword.Id + "',username: '" + $scope.name + "', password: '" + $scope.password + "',email: '" + $scope.tryToChangepassword.Email + "',address:'" + $scope.tryToChangepassword.Address + "'}",

            dataType: 'json',
            headers: { "Content-Type": "application/json" }
         })
         alert("Password Successfully Updated Login Now.");
      
       then(function (response) {
           console.log(response.data);
          // $scope.details.push(response.data);
           alert("Password Successfully Updated Login Now.")
       })
    }
    
})

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
   // $scope.GetAllData = "";
        $(document).ready(function () {
            $('#SingleRecordData').hide();
        });
   
        $scope.LoginForm1 = function () {
            alert("Clear")
            $scope.name = "";
            $scope.password = "";
        }



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
            debugger;
            console.log(response.data);
            $scope.loginDetails = response.data;
            console.log($scope.loginDetails);
            if (response.data != 0) {
                if (response.data == $scope.loginDetails) {
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
                debugger;
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
    $scope.ClearDat = function () {
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