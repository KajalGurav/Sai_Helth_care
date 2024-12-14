app.service("InvoiceService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/GetInvoiceMasterList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.Delete_IM_SparePartsAndAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_SparePartsAndAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };

    this.Delete_IM_MedtronicAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_MedtronicAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };

});

app.controller('InvoiceCtrl', function ($scope, InvoiceService) {

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
    $scope.pageSize = 30;
    $scope.CUSTOMER_ID = null;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;
    $scope.INVOICE_DATE = null;

    GetTotalcount();

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = InvoiceService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.InvoiceList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }

    function GetSearchingConditions() {

        if ($scope.SEARCH_NAME === undefined || $scope.SEARCH_NAME === "" || $scope.SEARCH_NAME === null) {
            $scope.SEARCH_NAME = null;
        }
        if ($scope.INVOICE_DATE === undefined || $scope.INVOICE_DATE === "" || $scope.INVOICE_DATE === null) {
            $scope.INVOICE_DATE = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_NAME: $scope.SEARCH_NAME,
            FIRM_NAME: $scope.SEARCH_NAME,
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE,
            INVOICE_DATE:$scope.INVOICE_DATE
        };

        return SearchingConditions;

    }

    function initController() {
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
        var getrecord = InvoiceService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.InvoiceList = response.data;
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

    $scope.SearchAdmin = function () {

        GetTotalcount();
    };

    $scope.DeleteExistingRecord = function (id) {
        var data = {
            INVOICE_ID: 0,
            INVOICE_FOR: null,
            INVOICE_MED_ACC_ID:null
        }

        if (id == "Regular") {
            var datalist = InvoiceService.Delete_IM_SparePartsAndAccessories(data);
        }
        else if (id == "Medtronic") {
            var datalist = InvoiceService.Delete_IM_MedtronicAccessories(data);
        }
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_IM_SparePartsAndAccessories();
            }
            else {
                alert("Error Occured.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
   
});