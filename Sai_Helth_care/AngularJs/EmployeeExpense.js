app.service("ExpenseService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeExpense/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeExpense/GetAllExpenseList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.EmployeeExpenseExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeExpense/EmployeeExpenseExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetallEmp = function () {
        return $http.get("/Dilivery_Challan/GetEmployee");
    };
});


app.controller("ExpenseCtrl", function ($scope, ExpenseService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.EMP_ID = null;
    $scope.EMP_SEARCH = null;
    GetTotalcount();
    GetallEmp();

    function GetallEmp() {
        var GethomeList = ExpenseService.GetallEmp();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }
    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = ExpenseService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.ExpenseList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");
        });

    }


    function GetSearchingConditions() {
        if ($scope.EMP_SEARCH === undefined || $scope.EMP_SEARCH === "" || $scope.EMP_SEARCH === null) {
            $scope.EMP_SEARCH = null;
        }

        $scope.STARTING_DATE = $("#STARTING_DATE").val();

        if ($("#STARTING_DATE").val() === undefined || $("#STARTING_DATE").val() === null || $("#STARTING_DATE").val() === "") {
            $scope.STARTING_DATE = null;
        }

        $scope.ENDING_DATE = $("#ENDING_DATE").val();

        if ($("#ENDING_DATE").val() === undefined || $("#ENDING_DATE").val() === null || $("#ENDING_DATE").val() === "") {
            $scope.ENDING_DATE = null;
        }

        
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            EMP_ID: $scope.EMP_ID,
            EMP_NAME: $scope.EMP_SEARCH,
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

            $scope.pager.pages.length = 0;
            $scope.ExpenseList = {};

            return;
        }

        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;

        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = ExpenseService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.ExpenseList = response.data;
          

            
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


    $scope.exportToExcel = function () {
        EmployeeExpenseExport();
    }
    function EmployeeExpenseExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = ExpenseService.EmployeeExpenseExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Employee Expense Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


    $scope.SearchAdmin = function () {

        GetTotalcount();
    };
});