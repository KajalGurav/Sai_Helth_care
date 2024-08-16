app.service("CustomerService", function ($http) {

    this.getRecordbyPaging = function () {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetUpcomingPmCm",
            data: JSON.stringify()
        });
        return response;
    };

    this.getAmcDetail = function (id) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/getAmcDetail",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetAllCustomer = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCustomerList",
            params: {
                id: id
            }
        });
        return response;
    };
});


app.controller("AdminCtrl", function ($scope, CustomerService) {

    GetRecordbyPaging();

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.CUSTOMER_TYPE_NAME = PARAM[0].split('=').pop();
    if ($scope.CUSTOMER_TYPE_NAME === '1') {
        $scope.CUSTOMER_TYPE = "Regular";
    }
    else if ($scope.CUSTOMER_TYPE_NAME === '2') {
        $scope.CUSTOMER_TYPE = "AERB";
    }
    else if ($scope.CUSTOMER_TYPE_NAME === '3') {
        $scope.CUSTOMER_TYPE = "Medtronic";
    }
    else if ($scope.CUSTOMER_TYPE_NAME === '4') {
        $scope.CUSTOMER_TYPE = "Carestream";
    }
    else if ($scope.CUSTOMER_TYPE_NAME === '5') {
        $scope.CUSTOMER_TYPE = "Mindray";
    }

    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var getrecord = CustomerService.getRecordbyPaging();
        getrecord.then(function (response) {
            $scope.UpcomingPmCmList = response.data;
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
});