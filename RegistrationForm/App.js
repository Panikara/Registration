/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />
var app = angular.module("MyReg", []);
app.controller("MyCtrl", function ($scope, $http, UniqueEmail, $window) {
    $(document).ready(function () {
        $('#PleaseLogin').hover(function () {
            alert("Please Login and Edit Your Details");
        });
        $("#ss").click(function () {
            $('#myModal').modal("hide");
        })

    });
    //$(document).ready(function () {
    //    $("#ss").click(function () {
    //        $('#myModal').modal("hide");
    //    })
    //})
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.address = "";
    $scope.list = {};
    $scope.GetAllData = [{}];
    $scope.emailspan = "";

    $http.get("/Home/GetAllData").then(function (response) {
        $scope.GetAllData = response.data;
        console.log($scope.GetAllData);
    })
    $window.onload = function () {
        $http.get("/Home/GetAllData").then(function (response) {
            $scope.GetAllData = response.data;
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
            if (response.data == 0) {
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

    //Jquery Datatable To Pdf

    document.getElementById('export').addEventListener('click',
        exportPDF);
    var specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '.no-export': function (element, renderer) {
            return true;
        }
    };
    function exportPDF() {
        var doc = new jsPDF('p', 'pt', 'a4');
        var source = document.getElementById('content').innerHTML;
        var margins = {
            top: 10,
            bottom: 10,
            left: 10,
            width: 790
        };
        doc.fromHTML(
              source, // HTML string or DOM elem ref.
              margins.left,
              margins.top, {
                  'width': margins.width,
                  'elementHandlers': specialElementHandlers
              },
        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            doc.save('sampath.pdf');
        }, margins);
    }

    $scope.loginShow = "";
    $scope.login = function () {
        alert("try");
        $http.get("/Home/Login?name=" + $scope.username).then(function (response) {
            alert("in");
            console.log(response.data);
            $scope.loginShow = response.data;
            console.log($scope.loginShow);
            if (response.data != 0) {
                if (response.data == $scope.loginShow) {
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