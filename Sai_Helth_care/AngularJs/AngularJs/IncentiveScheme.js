app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/IncentiveMaster/TotalRecordCountIncentiveScheme",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/IncentiveMaster/GetIncentiveSchemeList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddEditAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/IncentiveMaster/AddUpdateIncentiveScheme",
            data: JSON.stringify(tB_admin),
            dataType: "json"
        });
        return response;
    };

    this.GetIncentiveServiceTypeList = function () {
        var response = $http({
            method: "POST",
            url: "/IncentiveMaster/GetIncentiveServiceTypeList"
        });
        return response;
    };

    this.GetIncentiveTypeList = function () {
        var response = $http({
            method: "POST",
            url: "/IncentiveMaster/GetIncentiveTypeList"
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
    this.GenerateSerialNo = function (tb_params) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };

});

app.controller("adminCtrl", function ($scope, AdminService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    GetTotalcount();




    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = AdminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.IncentiveSchemeList = "";
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



        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME

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
            $scope.IncentiveSchemeList = response.data;

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

    function GenerateSerialNo() {
        tb_params = {
            GenerateNoFor: "IncentiveScheme",
            CustomerTypeId: null
        }
        var getAdmin = AdminService.GenerateSerialNo(tb_params);
        getAdmin.then(function (response) {
            $scope.SERIAL_NO = response.data;
        });
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

    function GetallIncentiveServiceType() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = AdminService.GetIncentiveServiceTypeList();
        GethomeList.then(function (response) {
            $scope.IncentiveServiceTypeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }
    function GetallIncentiveType() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = AdminService.GetIncentiveTypeList();
        GethomeList.then(function (response) {
            $scope.IncentiveTypeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }


    function Clear() {
        $scope.IS_ID = null;
        $scope.SERIAL_NO = "";
        $scope.EMP_ID = null;
        $scope.REF_NO = "";
        $scope.INCENTIVE_DATE = "";
        $scope.INC_TYPE_ID = null;
        $scope.INC_SERVICE_TYPE_ID = null;
        $scope.INCENTIVE_AMOUNT = "";
        $scope.COMMENT = "";

        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }


    ////addcode//

    $scope.AdminClick = function () {
        Clear();

        $scope.Admin_Action = "Add Incentive Scheme";
        $scope.Action = "ADD";
        GenerateSerialNo();
        GetallEmployee();
        GetallIncentiveServiceType();
        GetallIncentiveType();
        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.getForUpdate = function (User) {
        $scope.Admin_Action = "Update Incentive Scheme";
        $scope.Action = "UPDATE";

        $("#Emp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.IS_ID = User.IS_ID;
        $scope.SERIAL_NO = User.SERIAL_NO;
        $scope.REF_NO = User.REF_NO;
        $scope.EMP_ID = User.EMP_ID;
        $scope.INC_TYPE_ID = User.INC_TYPE_ID;
        $scope.INC_SERVICE_TYPE_ID = User.INC_SERVICE_TYPE_ID;
        GetallEmployee();
        GetallIncentiveServiceType();
        GetallIncentiveType();
        $scope.INCENTIVE_AMOUNT = User.INCENTIVE_AMOUNT;
        $scope.COMMENT = User.COMMENT;
        $scope.INCENTIVE_DATE = User.INCENTIVE_DATE;
        $("#INCENTIVE_DATE").val($scope.INCENTIVE_DATE);
    };



    $scope.AddUpdateAdmin = function () {
        if ($("#INCENTIVE_DATE").val() === undefined || $("#INCENTIVE_DATE").val() === null || $("#INCENTIVE_DATE").val() === "") {
            alert("Please select Scheme Date!");
            return false;
        }
        $scope.INCENTIVE_DATE = $("#INCENTIVE_DATE").val();
        $("#loader").css("display", '');
        tb_Admin = {
            IS_ID: parseInt($scope.IS_ID), //for update table
            SERIAL_NO: $scope.SERIAL_NO,
            REF_NO: $scope.REF_NO,
            EMP_ID: parseInt($scope.EMP_ID),
            INC_TYPE_ID: parseInt($scope.INC_TYPE_ID),
            INC_SERVICE_TYPE_ID: parseInt($scope.INC_SERVICE_TYPE_ID),
            INCENTIVE_AMOUNT: parseFloat($scope.INCENTIVE_AMOUNT),
            COMMENT: $scope.COMMENT,
            INCENTIVE_DATE: $scope.INCENTIVE_DATE,
            ACTION: $scope.Action

        };
        if ($scope.Admin_Action === "Add Incentive Scheme") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Incentive Scheme") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Incentive added successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Incentive already added.");
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
                alert("Incentive updated successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Incentive already added.");
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