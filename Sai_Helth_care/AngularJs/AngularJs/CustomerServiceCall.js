app.service("CustomercallService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/GetAllServiceCallRequestAssign",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.ServiceCallExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/ServiceCallExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetPriorityList = function (SearchingConditions) {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetPriorityList"
        });
        return response;
    };
    this.GetCallStatusList = function (SearchingConditions) {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetCallStatusList"
        });
        return response;
    };

    this.GetAllEmployee = function () {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetEmployeeList"
        });
        return response;
    };


});


app.controller("CustomerCallCtrl", function ($scope, CustomercallService) {


    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();

    if ($scope.CUSTOMER_TYPE === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
    }
    else if ($scope.CUSTOMER_TYPE === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
    }
    else if ($scope.CUSTOMER_TYPE === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
    }
    else if ($scope.CUSTOMER_TYPE === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
    }
    else if ($scope.CUSTOMER_TYPE === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
    }

    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    //$scope.CUSTOMER_TYPE_ID = null;
    $scope.CALL_PRIORITY_TYPE_ID = null;
    $scope.CALL_STATUS = null;
    $scope.EMP_ID = null;
    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;
    GetTotalcount();
    GetPriorityList();
    GetCallStatusList();
    GetAllEmployee();
    function GetAllEmployee() {
        var getState = CustomercallService.GetAllEmployee();
        getState.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }
    function GetPriorityList() {
        var getcount = CustomercallService.GetPriorityList();
        getcount.then(function (d) {
            $scope.CallPriorityList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GetCallStatusList() {
        var getcount = CustomercallService.GetCallStatusList();
        getcount.then(function (d) {
            $scope.CallStatusList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GetTotalcount() {
        //alert("GetTotalcount");
        var SearchingConditions = GetSearchingConditions();
        var getcount = CustomercallService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.CustomerCallList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");
        });

    }


    function GetSearchingConditions() {
        if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.CUSTOMER_NAME = null;
        }
        if ($scope.FIRM_NAME === undefined || $scope.FIRM_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.FIRM_NAME = null;
        }
        if ($scope.CUSTOMER_TYPE_ID === undefined || $scope.CUSTOMER_TYPE_ID === "" || $scope.CUSTOMER_TYPE_ID === 0 || $scope.CUSTOMER_TYPE_ID === "0") {
            $scope.CUSTOMER_TYPE_ID = null;
        }
        if ($scope.CALL_PRIORITY_TYPE_ID === undefined || $scope.CALL_PRIORITY_TYPE_ID === "" || $scope.CALL_PRIORITY_TYPE_ID === 0 || $scope.CALL_PRIORITY_TYPE_ID === "0") {
            $scope.CALL_PRIORITY_TYPE_ID = null;
        }
        if ($scope.CALL_STATUS === undefined || $scope.CALL_STATUS === "" || $scope.CALL_STATUS === 0 || $scope.CALL_STATUS === "0") {
            $scope.CALL_STATUS = null;
        }
        if ($scope.EMP_ID === undefined || $scope.EMP_ID === "" || $scope.EMP_ID === 0 || $scope.EMP_ID === "0") {
            $scope.EMP_ID = null;
        }
        if ($("#STARTING_DATE1").val() === undefined || $("#STARTING_DATE1").val() === "" || $("#STARTING_DATE1").val() === null) {
            $scope.STARTING_DATE = null;
        }
        else {
            $scope.STARTING_DATE = $("#STARTING_DATE1").val();
        }
        if ($("#ENDING_DATE1").val() === undefined || $("#ENDING_DATE1").val() === "" || $("#ENDING_DATE1").val() === null) {
            $scope.ENDING_DATE = null;
        }
        else {
            $scope.ENDING_DATE = $("#ENDING_DATE1").val();
        }
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            CALL_PRIORITY_TYPE_ID: $scope.CALL_PRIORITY_TYPE_ID,
            CALL_STATUS: $scope.CALL_STATUS,
            EMP_ID: $scope.EMP_ID,
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE
        };

        return SearchingConditions;

    }



    function initController() {
        // initialize to page 1
        setPage(1);
    }

    $scope.setPage = function (page) {
        setPage(page);
    };


    $scope.setPage = function (page) {
        setPage(page);
    };

    function setPage(page) {
        var totalPages = Math.ceil($scope.totalRecordCount / $scope.pageSize);
        if (page < 0 || page > totalPages) {
            $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
            $scope.pager.pages.length = totalPages;
            $scope.pager.currentPage = totalPages;
            $scope.page = totalPages - 1;
            $scope.FarmerList = {};
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomercallService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.CustomerCallList = response.data;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');

        });
    }

    $scope.exportToExcel = function () {
        ServiceCallExport();
    }
    function ServiceCallExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomercallService.ServiceCallExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Service Call Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }

    function GetPager(totalItems, currentPage, pageSize) {
        $scope.page = currentPage - 1;
        currentPage = currentPage || 1;
        pageSize = pageSize || 100;

        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {

            startPage = 1;
            endPage = totalPages;
        } else {

            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = range(startPage, endPage);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }



    $scope.SearchAdmin = function () {

        GetTotalcount();
    };


    $scope.getdate = function () {

        $scope.STARTING_DATE = $("#STARTING_DATE").val();
        $scope.ENDING_DATE = $("#ENDING_DATE").val();

        GetTotalcount();
    };

});
