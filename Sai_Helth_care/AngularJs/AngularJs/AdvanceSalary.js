app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Advance_Salary/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Advance_Salary/GetAdvanceSalaryList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddEditAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/Advance_Salary/AddUpdateAdvanceSalary",
            data: JSON.stringify(tB_admin),
            dataType: "json"
        });
        return response;
    };

    this.AdvanceSalaryExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Advance_Salary/GetAdvanceSalaryListExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetEmployeeList = function () {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetEmployeeList"
        });
        return response;
    };

});

app.controller("adminCtrl", function ($scope, AdminService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.EMPLOYEE_ID = null;
    $scope.SEARCH_NAME = null;
    GetTotalcount();
    GetallEmp();

    function GetallEmp() {
        var GethomeList = AdminService.GetEmployeeList();
        GethomeList.then(function (response) {
            $scope.EmployeeListSearch = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = AdminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.AdvanceSalaryList = "";
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
            EMP_ID: $scope.EMPLOYEE_ID,
            SEARCH_NAME: $scope.SEARCH_NAME,
            START_DATE: $scope.STARTING_DATE,
            END_DATE: $scope.ENDING_DATE

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
        var getrecord = AdminService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.AdvanceSalaryList = response.data;

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

    $scope.SearchAdmin = function () {
        GetTotalcount();
    };

    function GetallEmployee() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = AdminService.GetEmployeeList();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }

    function Clear() {
        $scope.EMP_ID = null;
        $scope.ADVANCE_AMOUNT = "";
        $scope.ADVANCE_DATE = "";
    }

    ////addcode////

    $scope.AdminClick = function () {
        Clear();
        $scope.Admin_Action = "Add Advance Salary";
        $scope.Action = "ADD";
        GetallEmployee();
        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };

    $scope.getForUpdate = function (User) {
        Clear();
        $scope.Admin_Action = "Update Advance Salary";
        $scope.Action = "UPDATE";
        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.EAS_ID = User.EAS_ID;
        $scope.EMP_ID = User.EMP_ID;
        GetallEmployee();

        $scope.ADVANCE_AMOUNT = User.ADVANCE_AMOUNT;
        $scope.ADVANCE_DATE = User.ADVANCE_DATE;
        $("#ADVANCE_DATE").val($scope.ADVANCE_DATE);
    };



    $scope.AddUpdateAdmin = function () {
        if ($("#ADVANCE_DATE").val() === undefined || $("#ADVANCE_DATE").val() === null || $("#ADVANCE_DATE").val() === "") {
            alert("Please select Advance Date!");
            return false;
        }
        $scope.ADVANCE_DATE = $("#ADVANCE_DATE").val(); 
        $("#loader").css("display", '');
        tb_Admin = {
            EAS_ID: $scope.EAS_ID, //for update table
            EMP_ID: $scope.EMP_ID, 
            ADVANCE_AMOUNT: $scope.ADVANCE_AMOUNT,
            ADVANCE_DATE: $scope.ADVANCE_DATE,
            ACTION: $scope.Action,
            
        };
        if ($scope.Admin_Action === "Add Advance Salary") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Advance Salary") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Advance Amount added successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Advance Amount already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }





    function EditAdminRecord(tb_Admin) {
        var datalist = AdminService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Advance Amount updated successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Advance Amount already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    $scope.exportToExcel = function () {
        AdvanceSalaryExport();
    }
    function AdvanceSalaryExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = AdminService.AdvanceSalaryExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Advance Salary Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});