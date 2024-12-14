app.service("CustomerService", function ($http) {

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetUpcomingExpiry",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
});


app.controller("AMCCtrl", function ($scope, CustomerService) {

    GetRecordbyPaging();


    $scope.CUSTOMER_TYPE = "Regular";

    $scope.Search = function () {
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.FARMER_SEARCH,
            STATE_ID: $scope.STATE_SEARCH

        };
        GetRecordbyPaging();
    }

    function GetRecordbyPaging() {

        var SearchingConditions = GetSearchingConditions();

        $("#loader").css("display", '');
        var getrecord = CustomerService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.UpcomingPmCmList = response.data;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }

    function GetSearchingConditions() {

        if ($scope.SearchKeyword === undefined || $scope.SearchKeyword === "" || $scope.SearchKeyword === null) {
            $scope.SearchKeyword = null;
        }


        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.SearchKeyword,
            STATE_ID: $scope.STATE_SEARCH

        };

        return SearchingConditions;

    }


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
});