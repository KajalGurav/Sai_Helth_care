app.service("DeliveryChallanService", function ($http) {




    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/GetDeliveryChallanList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
    this.DeliveryChalanExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/DeliveryChalanExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
});

app.controller('DeliveryChallanCtrl', function ($scope, DeliveryChallanService) {

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;

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
    $scope.pageSize = 10;
    $scope.CUSTOMER_ID = null;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;

    GetTotalcount();


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = DeliveryChallanService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.DeliveryChallanList = "";
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
        if ($scope.DC_NUMBER === undefined || $scope.DC_NUMBER === "" || $scope.DC_NUMBER === null) {
            $scope.DC_NUMBER = null;
        }


        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE,
            DC_NUMBER: $scope.searchText
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
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = DeliveryChallanService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.DeliveryChallanList = response.data;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
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


    $scope.customFilter = function (admin) {
        var searchText = $scope.searchText ? $scope.searchText.toLowerCase() : '';
        return (admin.DC_NUMBER && admin.DC_NUMBER.toLowerCase().indexOf(searchText) !== -1) ||
            (admin.CUSTOMER_NAME && admin.CUSTOMER_NAME.toLowerCase().indexOf(searchText) !== -1) ||
            (admin.PRODUCT_NAME && admin.PRODUCT_NAME.toLowerCase().indexOf(searchText) !== -1);
    };

    $scope.SearchAdmin = function () {

        GetTotalcount();
    };


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


    $scope.exportToExcel = function () {
        var SearchingConditions = GetSearchingConditions();
        var dcNumber = $scope.searchText; // Assuming searchText contains the DC_NUMBER

        var exportConditions = {
            DC_NUMBER: dcNumber // Only send DC_NUMBER for export
        };

        console.log("Export Conditions: ", exportConditions); // Log the conditions

        var getrecord = DeliveryChallanService.DeliveryChalanExport(exportConditions);

        getrecord.then(function (response) {
            if (response.status === 404) {
                alert("No Data Found");
                return;
            } else {
                var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                var fileName = $scope.CUSTOMER_TYPE + '_Delivery_Chalan_Report.xls';
                link.download = fileName;
                link.click();
                $("#loader").css("display", 'none');
            }
        }, function () {
            alert("Error while exporting the report."); // Added an alert for error handling
            $("#loader").css("display", 'none');
        });
    };



});