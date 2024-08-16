app.service("EmployeeTaskService", function ($http) {
    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeTask/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeTask/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.EmployeeTaskExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/EmployeeTask/EmployeeTaskExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
    
    this.GetallEmp = function () {
        return $http.get("/Dilivery_Challan/GetEmployee");
    };

    this.GetallEmpType = function () {
        return $http.get("/EmployeeTask/GetEmployeeType");
    };

    this.GetEmployeeTaskDetails = function () {
        var response = $http({
            method: "POST",
            url: "/EmployeeTask/GetEmployeeTaskDetails",
            data: JSON.stringify()
        });
        return response;
    };
});

app.controller('EmployeeTaskCtrl', function ($scope, EmployeeTaskService) {
    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.START_DATE = null;
    $scope.END_DATE = null;
    GetTotalcount();
    GetallEmp();
    GetallEmpType();
    GetEmployeeTaskDetails();

    function GetallEmp() {
        var GethomeList = EmployeeTaskService.GetallEmp();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }

    function GetallEmpType() {
        var GethomeList = EmployeeTaskService.GetallEmpType();
        GethomeList.then(function (response) {
            $scope.EmployeeTypeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = EmployeeTaskService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.EmployeeTaskList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }

    function GetSearchingConditions() {

        if ($scope.EMPLOYEE_ID === undefined || $scope.EMPLOYEE_ID === "" || $scope.EMPLOYEE_ID === null) {
            $scope.EMPLOYEE_ID = null;
        }

        $scope.START_DATE = $("#START_DATE").val();
        $scope.END_DATE = $("#END_DATE").val();

        if ($scope.START_DATE === undefined || $scope.START_DATE === '') {
            $scope.START_DATE = null;
        }
        if ($scope.END_DATE === undefined || $scope.END_DATE === '') {
            $scope.END_DATE = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            START_DATE: $scope.START_DATE,
            END_DATE: $scope.END_DATE,
            EmployeeType: $scope.EmployeeType,
            EMPLOYEE_ID: $scope.EMPLOYEE_ID
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

        var SearchingConditions = GetSearchingConditions();
        var getrecord = EmployeeTaskService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.EmployeeTaskList = response.data;
            // alert(JSON.stringify(ProductList));

            $("#loader").css("display", 'none');
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
        EmployeeTaskExport();
    }

    function EmployeeTaskExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = EmployeeTaskService.EmployeeTaskExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Employee Task Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }

    $scope.getData = function () {
        GetTotalcount();
    }

    function GetEmployeeTaskDetails() {
        $("#loader").css("display", '');
        var getrecord = EmployeeTaskService.GetEmployeeTaskDetails();
        getrecord.then(function (response) {
            $scope.TaskDetailList = response.data;
            $scope.EmployeeType = $scope.TaskDetailList[0].EmployeeType;
            // alert(JSON.stringify(ProductList));

            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
        //history.forward(); //Go to the next page in the stack
        //history.go(index); //Where index could be 1, -1, 56, etc.
    }
});