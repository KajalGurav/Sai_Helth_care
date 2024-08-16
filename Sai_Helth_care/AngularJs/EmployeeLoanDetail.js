app.service("EmployeeService", function ($http) {
    this.getRecordbyPaging = function () {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/GetEmpPayLoanList",
            data: JSON.stringify()
        });
        return response;
    };

    this.AddSettlementAmount = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/AddSettlementAmount",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
});

app.controller("EmloyeeLoanCtrl", function ($scope, EmployeeService) {

    GetRecordbyPaging();
    function GetRecordbyPaging() {
        var getrecord = EmployeeService.getRecordbyPaging();
        getrecord.then(function (response) {
            $scope.EmployeeLoanList = response.data;
            $scope.LOAN_OUTSTANDING = $scope.EmployeeLoanList[0].LOAN_OUTSTANDING;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }
    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    $scope.AdminClick = function () {
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };

    $scope.AddAdmin = function () {
        var datalist = EmployeeService.AddSettlementAmount();
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Loan settlement amount added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
                GetRecordbyPaging();
            }
            else if (d.data.success === false) {
                alert("Loan settlement amount already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                //alert("Error.");
                $("#loader").css("display", 'none');
            });
       
    }

});