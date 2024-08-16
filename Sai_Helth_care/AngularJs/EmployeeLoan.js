app.service("EmployeeService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetalleEmoloyee = function () {
        return $http.get("/Employee_Loan/GetEmployee");
    };

    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Loan/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


});



app.controller("EmloyeeLoanCtrl", function ($scope, EmployeeService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetalleEmoloyee();

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = EmployeeService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.EmployeeLoanList = "";
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
        if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
            $scope.STATE_SEARCH = null;
        }


        var SearchingConditions = {

            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME,
            STATE_ID: $scope.STATE_SEARCH
            //STARTING_DATE: $scope.STARTING_DATE,
            //ENDING_DATE: $scope.ENDING_DATE
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
        var getrecord = EmployeeService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.EmployeeLoanList = response.data;
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



    function GetalleEmoloyee() {
        var GethomeList = EmployeeService.GetalleEmoloyee();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }



    function Clear() {
        $scope.EMP_LOAN_ID = "";
        $scope.EMP_ID = "";
        $scope.LOAN_AMOUNT = "";
        $scope.INTREST_RATE = "";
        $scope.INSTALLMENT_AMOUNT = "";
        $scope.LOAN_OUTSTANDING = "";
        $scope.REASON = "";

    }

   

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Loan";
        Clear();
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };




    $scope.getForUpdate = function (admin) {
      
        $scope.Admin_Action = "Update Loan";
        $scope.EMP_LOAN_ID = admin.EMP_LOAN_ID;
        $scope.EMP_ID = admin.EMP_ID;
        $scope.LOAN_AMOUNT = admin.LOAN_AMOUNT;
        $scope.INTREST_RATE = admin.INTREST_RATE;
        $scope.INSTALLMENT_AMOUNT = admin.INSTALLMENT_AMOUNT;
        $scope.LOAN_OUTSTANDING = admin.LOAN_OUTSTANDING;
        $scope.REASON = admin.REASON;

        $("#Admin_Addupdate").modal("show");
        AddAdmin(tb_Admin);

    };

    $scope.AddAdmin = function () {
        
        tb_Admin = {
            EMP_LOAN_ID: $scope.EMP_LOAN_ID,
            EMP_ID: $scope.EMP_ID,
            LOAN_AMOUNT: $scope.LOAN_AMOUNT,
            INTREST_RATE: $scope.INTREST_RATE,
            INSTALLMENT_AMOUNT: $scope.INSTALLMENT_AMOUNT,
            LOAN_OUTSTANDING: $scope.LOAN_OUTSTANDING,
            REASON: $scope.REASON,

        };
        if ($scope.Admin_Action === "Add Loan") {

            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Loan") {

            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = EmployeeService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Loan added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Loan already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                //alert("Error.");
                $("#loader").css("display", 'none');
            });
    }



    function EditAdminRecord(tb_Admin) {
        var datalist = EmployeeService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Loan updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Loan already added.");
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



    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }



});