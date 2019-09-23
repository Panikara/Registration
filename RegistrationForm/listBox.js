/// <reference path="c:\users\spuser.vtslindia\documents\visual studio 2015\Projects\BRegForm_1\BRegForm_1\scripts/angular.js" />
var app = angular.module("ListBox", []);
app.controller("BindingListBox", function ($scope, $http) {
    alert("hello")
    $scope.AllData = {};
    $scope.All = {};
    $http.get("/Home/GetAllData").then(function (response) {
        console.log(response.data);
        $scope.AllData = response.data;
        $scope.All = response.data;
        //  console.log($scope.All);
    })
    $scope.CheckSingle = function (email) {
        $http.get("/Home/UniqueEmail?email=" + email).then(function (response) {
            console.log(response.data)
            //  $scope.All = response.data;
        })
    }
    $(document).ready(function () {
        $('input[type="checkbox"]').click(function () {
            if ($(this).prop("checked") == true) {
                //console.log($scope.All);
                $('table').hide();
            }
            else {

                $http.get("/Home/GetAllData").then(function (response) {
                    $scope.All = response.data;
                    //  console.log($scope.All);
                    $('table').show();
                })



            }


        })
        $('.check').change(function () {
            $('.check').not(this).prop('checked', false);
        });
        $("#Call").click(function () {
            alert("call");
            $.ajax({
                url: "/Home/GetAllData",
                method: "GET",
                success: function (data) {
                    console.log(data);
                    var UserName = [];
                    var Id = [];
                    var Email = [];
                    for (var i in data) {
                        UserName.push(data[i].UserName);
                        Id.push(data[i].Id);
                        Email.push(data[i].Email);

                    }
                    var chartdata = {
                        labels: UserName,
                        datasets: [
                            {
                                label: 'User And ID Details in Bar Chart',
                                backgroundColor: 'rgba(255,0,102,0.2)',
                                borderColor: 'rgb(10, 48, 7)',
                                hoverBackgroundColor: 'rgb(7, 11, 48)',
                                hoverBorderColor: 'rgba(200, 200, 200, 1)',

                                data: Id,
                               // data:Email
                                //   borderDash: [5, 5],
                            }
                        ]
                    };
                    var ctx = $("#mycanvas");
                    // var ctx = mycanvas.getContext("2d");
                    var barGraph = new Chart(ctx, {
                        type: 'bar',
                        data: chartdata,
                        options: {
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 60,
                                        minRotation: 60,
                                        fontSize: 15
                                    }
                                }]
                            }
                        }
                    });
                    
                }


            })
        })

    })



})
