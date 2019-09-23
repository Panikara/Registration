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
        $("#hide").click(function () {
            alert("Hide");
            $('td:nth-child(2),th:nth-child(2)').addClass('MyHide');
        })
        $("Update").click(function () {
            $("#sname").addClass('MyHide');
            $("#spsd").addClass('MyHide');
            
        })
        
    });

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

    $('#demo').find('.Update, .Cancel').hide();
    $('#demo').on('click', '.Edit', function () {
        $('#demo').find('.Update, .Cancel').hide();
        $('#demo').find('.Edit').show();
        $('#demo').find('.Delete').show();
        $('*').prop('contenteditable', false)
        $(this).hide().siblings('.Update, .Cancel').show();
        currentTD = $(this).closest('td').siblings()
        $.each(currentTD, function () {
            $(this).attr("initialval", $(this).text())
            $(this).prop('contenteditable', true)
            $('td input').hide();
            $('td span').show();
        });
    });

    $('#demo').on('click', '.Update', function () {
        var $btn = $(this);
        $('#demo').find('.Update, .Cancel').hide();
        $btn.hide().siblings('.Edit').show();
        $btn.hide().siblings('.Delete').show();
       
        currentTD = $(this).closest('td').siblings()
        $.each(currentTD, function () {
            $(this).prop('contenteditable', false)
        });
    });

    $('#demo').on('click', '.Cancel', function () {
        var $btn = $(this);
        $('#demo').find('.Update, .Cancel').hide();
        $btn.hide().siblings('.Edit').show();
        $btn.hide().siblings('.Delete').show();


      
        currentTD = $(this).closest('td').siblings()
        $.each(currentTD, function () {
            $(this).text($(this).attr("initialval"));
            $(this).prop('contenteditable', false)
        });
    });



    $("body").on("click", "#demo .Edit", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                $(this).find("input").show();
                $(this).find("span").hide();
            }
        });
        row.find(".Update").show();
        row.find(".Cancel").show();
        row.find(".Delete").hide();
        $(this).hide();
    });

    $("body").on("click", "#demo .Update", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                var span = $(this).find("span");
                var input = $(this).find("input");
                span.html(input.val());
                span.show();
                input.hide();
            }
        });
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Cancel").hide();
        $(this).hide();

      
    });

    //Cancel event handler.
    $("body").on("click", "#demo .Cancel", function () {
        var row = $(this).closest("tr");
        $("td", row).each(function () {
            if ($(this).find("input").length > 0) {
                var span = $(this).find("span");
                var input = $(this).find("input");
                input.val(span.html());
                span.show();
                input.hide();
            }
        });
        row.find(".Edit").show();
        row.find(".Delete").show();
        row.find(".Update").hide();
        $(this).hide();
    });

    $scope.UpdatedTry = function () {
        
        
        $scope.NextLevel = function (s) {
            var Id = s.Id;
            var name = $scope.UserName;
           // s.UserName = name;
            alert(name);
            alert(s.UserName);
            alert(Id)
             $http({
               method: "POST",
                url: "/Home/tryOne",
                data: "{Id: '" + s.Id + "',username: '" + s.UserName + "', password: '" + s.Password + "',email: '" + s.Email + "',address:'" + s.Address + "'}",
                dataType: 'json',
                headers: { "Content-Type": "application/json" }
            });


                console.log(response.data);
               
                
          

        }
       
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

        var source = (document.getElementById('content').innerHTML);
        //var data = doc.autoTable(source);
        //doc.autoTable(data.columns[0], data.columns[1], data.columns[2])
        margins = {
            height:20,
            top: 40,
            bottom: 60,
            left: 40,
            width: 522
        };
        doc.fromHTML(
              source,// HTML string or DOM elem ref.
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
    $scope.Mpassword = "";
    $scope.login = function () {
        alert("try");
        $http.get("/Home/Login?name=" + $scope.username).then(function (response) {
            alert("in");
            console.log(response.data);
            $scope.loginShow = response.data;
            console.log($scope.loginShow);
            if (response.data != 0) {
                if (response.data == $scope.loginShow) {
                    if ($scope.Mpassword == $scope.loginShow.Password) {
                        alert("Your Successfully Login Welcome" + " " + $scope.username)
                    }
                    else {
                        alert("Password Wrong");
                    }

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