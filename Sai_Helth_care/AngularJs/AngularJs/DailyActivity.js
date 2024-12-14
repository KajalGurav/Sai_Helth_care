app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dailly_Activity/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dailly_Activity/GetDailyActivityList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddEditAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/Dailly_Activity/AddUpdateDailyActivity",
            data: JSON.stringify(tB_admin),
            dataType: "json"
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
    this.GetCityList = function () {
        var response = $http({
            method: "POST",
            url: "/Dailly_Activity/GetCityList"
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
                $scope.DailyActivityList = "";
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

            $scope.pager.pages.length = 0;
            $scope.DailyActivityList = {};

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
            $scope.DailyActivityList = response.data;

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

    function GetallCity() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = AdminService.GetCityList();
        GethomeList.then(function (response) {
            $scope.CityList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }


    function Clear() {
        $scope.EMP_ID = "";
        $scope.CITY_ID = "";
        $scope.ACTIVITY_NOTE = "";
        $scope.ACTIVITY_DATE = "";
        $scope.ADMIN_NOTE = "";
    }


    ////addcode//

    $scope.AdminClick = function () {
        Clear();
        $scope.Admin_Action = "Add Activity";
        $scope.Action = "ADD";
        GetallEmployee();
        GetallCity();
        $("#Emp_add").modal("show");

    };


    $scope.getForUpdate = function (User) {
        Clear();
        $scope.Admin_Action = "Update Activity";
        $scope.Action = "UPDATE";
        $("#Emp_add").modal("show");

        $scope.DAILY_ACTIVITY_ID = User.DAILY_ACTIVITY_ID;
        $scope.EMP_ID = User.EMP_ID;
        $scope.CITY_ID = User.CITY_ID;
        GetallEmployee();
        GetallCity();
        $scope.ACTIVITY_NOTE = User.ACTIVITY_NOTE;
        $scope.ACTIVITY_DATE = User.ACTIVITY_DATE;
        $scope.ADMIN_NOTE = User.ADMIN_NOTE;
        $("#ACTIVITY_DATE").val($scope.ACTIVITY_DATE);
    };



    $scope.AddUpdateAdmin = function () {
        if ($("#ACTIVITY_DATE").val() === undefined || $("#ACTIVITY_DATE").val() === null || $("#ACTIVITY_DATE").val() === "") {
            alert("Please select Activity Date!");
            return false;
        }
        $scope.ACTIVITY_DATE = $("#ACTIVITY_DATE").val(); 
        $("#loader").css("display", '');
        tb_Admin = {
            DAILY_ACTIVITY_ID: $scope.DAILY_ACTIVITY_ID, //for update table
            EMP_ID: $scope.EMP_ID, 
            CITY_ID: $scope.CITY_ID,
            ACTIVITY_NOTE: $scope.ACTIVITY_NOTE,
            ACTIVITY_DATE: $scope.ACTIVITY_DATE,
            ADMIN_NOTE: $scope.ADMIN_NOTE,
            ACTION: $scope.Action,
            
        };
        if ($scope.Admin_Action === "Add Activity") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Activity") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Activity added successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Activity already added.");
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
                alert("Activity updated successfully.");
                $("#Emp_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Activity already added.");
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



    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});