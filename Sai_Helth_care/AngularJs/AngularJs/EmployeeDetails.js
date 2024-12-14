app.service("UserService", function ($http) {
    this.GetUserList = function () {
        return $http.get("/CheckInUser/GetUserList");
    };

    this.GetEmployeeDetails = function (EMP_ID) {
        var response = $http({
            method: "GET",
            url: "/Employee_Regi/GetEmployeeDetails",
            params: {
                EMP_ID: EMP_ID
            }
        });
        return response;
    };
});
app.controller('EmployeeDetailsController', function ($scope, UserService) {
    //alert();

    var splitted = window.location.pathname.split('/');
    $scope.EMP_ID = splitted.pop();

    GetEmployeeDetails();

    function GetEmployeeDetails() {
        var getAdmin = UserService.GetEmployeeDetails($scope.EMP_ID);
        getAdmin.then(function (response) {
            $scope.EmployeeDetails = response.data;
            //alert(JSON.stringify($scope.EmployeeDetails));
        });
    }



    $scope.OnCategoryClick = function (id) {
        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";

            getAllAssignTherpist();
        }
        else if (id === '1') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";

            GetAllDietPlan();
        }
        else if (id === '2') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "block";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";

            GetallExpences();
        }
        else if (id === '3') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "block";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallRoomDetails();
        }

        else if (id === '4') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "block";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallCaseSheet();
        }


        else if (id === '5') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "block";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallCasehistory();
        }

        else if (id === '6') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "block";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetDealerPayment();
        }

        else if (id === '7') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "block";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallDocument();
        }


        else if (id === '8') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "block";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallClearance();

        }



        else if (id === '9') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "block";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallYoga();

        }

        else if (id === '10') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "block";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetallDoctorCasehistory();

        }


        else if (id === '11') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "block";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "none";
            GetAll();
        }



        else if (id === '12') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "block";
            document.getElementById('Demoexample_13').style.display = "none";
            GetDealerPayment();
            GetAll();
        }
        else if (id === '13') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_12').style.display = "none";
            document.getElementById('Demoexample_13').style.display = "block";
            //GetDealerPayment();
            GetAll();

        }
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }




});