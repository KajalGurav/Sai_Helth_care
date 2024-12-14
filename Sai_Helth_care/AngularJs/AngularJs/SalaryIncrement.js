app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Salary_Wayges/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Salary_Wayges/GetSalaryIncrementList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddEditAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/Salary_Wayges/AddUpdateSalaryIncrement",
            data: JSON.stringify(tB_admin),
            dataType: "json"
        });
        return response;
    };


    this.SalaryIncrementExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Salary_Wayges/GetSalaryIncrementExport",
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
                $scope.SalaryIncrementList = "";
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
            $scope.SalaryIncrementList = response.data;

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

    $scope.GetBasicSalary = function () {
        var emp = $scope.EmployeeList.filter(x => x.EMP_ID == parseInt($scope.EMP_ID))[0];
        $scope.BASIC_SALARY = parseFloat(emp.SALERY_PER_MONTH);
    } 

    $scope.CalTotal = function () {
        if ($scope.BASIC_SALARY === undefined || $scope.BASIC_SALARY === null || $scope.BASIC_SALARY === "") {
            $scope.BASIC_SALARY = 0;
        }
        if ($scope.INCREMENT_VALUE === undefined || $scope.INCREMENT_VALUE === null || $scope.INCREMENT_VALUE === "") {
            $scope.INCREMENT_VALUE = 0;
        }
        $scope.TOTAL_SALARY = parseInt($scope.BASIC_SALARY) + parseInt($scope.INCREMENT_VALUE);
    }

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
        $scope.BASIC_SALARY = "";
        $scope.INCREMENT_VALUE = "";
        $scope.INCREMENT_DATE = "";
        $scope.TOTAL_SALARY = "";
    }


    ////addcode//

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Increment";
        $scope.Action = "ADD";
        GetallEmployee();
        Clear();
      
        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.getForUpdate = function (User) {
        $scope.Admin_Action = "Update Increment";
        $scope.Action = "UPDATE";
        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.ESI_ID = User.ESI_ID;
        $scope.EMP_ID = User.EMP_ID;
        GetallEmployee();

        $scope.BASIC_SALARY = User.BASIC_SALARY;
        $scope.INCREMENT_VALUE = User.INCREMENT_VALUE;
        $scope.INCREMENT_DATE = User.INCREMENT_DATE;
        $("#INCREMENT_DATE").val($scope.INCREMENT_DATE);
        $scope.TOTAL_SALARY = parseInt(User.BASIC_SALARY) + parseInt(User.INCREMENT_VALUE);
    };



    $scope.AddUpdateAdmin = function () {
        if ($("#INCREMENT_DATE").val() === undefined || $("#INCREMENT_DATE").val() === null || $("#INCREMENT_DATE").val() === "") {
            alert("Please select Increment Date!");
            return false;
        }
        $scope.INCREMENT_DATE = $("#INCREMENT_DATE").val(); 
        $("#loader").css("display", '');
        tb_Admin = {
            ESI_ID: $scope.ESI_ID, //for update table
            EMP_ID: $scope.EMP_ID, 
            BASIC_SALARY: $scope.BASIC_SALARY,
            INCREMENT_VALUE: $scope.INCREMENT_VALUE,
            INCREMENT_DATE: $scope.INCREMENT_DATE,
            ACTION: $scope.Action,
            
        };
        if ($scope.Admin_Action === "Add Increment") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Increment") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Increment added successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Increment already added.");
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
                alert("Increment updated successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Increment already added.");
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



    $scope.ChangeStatus = function () {
        $("#loader").css("display", '');
        var getStatus = AdminService.ChangeStatus($scope.CITY_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#Admin_View").modal("hide");
            $("#loader").css("display", 'none');
            $.notify(response.data, "error");
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });

    };



    $scope.getAdmin = function (User) {
        var getAdmin = AdminService.getAdmin(User.CITY_ID);
        getAdmin.then(function (response) {
            $scope._Party = response.data;
            $scope.CITY_ID = $scope._Party.CITY_ID;
            //alert($scope.TALUKA_ID);
        });
    };

    $scope.exportToExcel = function () {
        SalaryIncrementExport();
    }
    function SalaryIncrementExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = AdminService.SalaryIncrementExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Salary Increment Report.xls';
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