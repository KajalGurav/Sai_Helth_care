app.service("VendorPOService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/GetAllVendorPOList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
});


app.controller("VendorPOCtrl", function ($scope, VendorPOService) {

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
    $scope.CUSTOMER_ID = null;
    $scope.VENDOR_NAME = null;
    $scope.OWNER_NAME = null;
    GetTotalcount();
    
    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = VendorPOService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.VendorPOList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");
        });

    }


    function GetSearchingConditions() {
        if ($scope.VENDOR_SEARCH === undefined || $scope.VENDOR_SEARCH === "" || $scope.VENDOR_SEARCH === null) {
            $scope.VENDOR_SEARCH = null;
        }
        
        if ($("#STARTING_DATE").val() === undefined || $("#STARTING_DATE").val() === null || $("#STARTING_DATE").val() === "") {
            $scope.STARTING_DATE = null;
        }

        if ($("#ENDING_DATE").val() === undefined || $("#ENDING_DATE").val() === null || $("#ENDING_DATE").val() === "") {
            $scope.ENDING_DATE = null;
        }
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            VENDOR_NAME: $scope.VENDOR_SEARCH,
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
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = VendorPOService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.VendorPOList = response.data;
          

            
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
    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
    $scope.SearchAdmin = function () {

        GetTotalcount();
    };
});