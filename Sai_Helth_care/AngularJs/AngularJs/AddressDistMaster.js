app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/CityMaster/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/CityMaster/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetallState = function () {
        return $http.get("/CityMaster/GetStateById");
    };


    this.AddAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/CityMaster/AddAdmin_Record",
            data: JSON.stringify(tB_admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tB_admin) {
        var response = $http({
            method: "POST",
            url: "/CityMaster/EditAdmin",
            data: JSON.stringify(tB_admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/CityMaster/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };


    this.getAdmin = function (id) {
        var response = $http({
            method: "GET",
            url: "/CityMaster/GetadminById",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };


});

app.controller("CITYCtrl", function ($scope, AdminService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    $scope.CITY_ID = null;
    GetTotalcount();
  
    


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = AdminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.DISTRICTList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }



    function GetSearchingConditions() {

        if ($scope.FARMER_SEARCH === undefined || $scope.FARMER_SEARCH === "" || $scope.FARMER_SEARCH === null) {
            $scope.FARMER_SEARCH = null;
        }
        if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
            $scope.STATE_SEARCH = null;
        }


        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.FARMER_SEARCH,
            STATE_ID: $scope.STATE_SEARCH

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
            $scope.FarmerList = {};

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
            $scope.DISTRICTList = response.data;

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



    function GetallState() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = AdminService.GetallState();
        GethomeList.then(function (response) {
            $scope.STATELIST = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }


    function Clear() {
        $scope.STATE_ID = null;
        $scope.CITY_NAME = "";


    }


    ////addcode//

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add City";
        Clear();

        GetallState();

        $("#Admin_AddState").modal("show");

    };


    $scope.getForUpdate = function (User) {
        $scope.Admin_Action = "Update City";
        
        
        var getAdmin = AdminService.getAdmin(User.CITY_ID);
        getAdmin.then(function (response) {
            $scope._Party = response.data;;
            $scope.CITY_NAME = $scope._Party.CITY_NAME;
            $scope.STATE_ID = parseInt($scope._Party.STATE_ID);
            $scope.STATE_NAME = $scope._Party.STATE_NAME;
            $scope.CITY_ID = parseInt($scope._Party.CITY_ID);

            GetallState();
            //setTimeout(function myfunction() {
            //    var blankSelectOptions = $('option[value$="?"]');
            //    if (blankSelectOptions.length > 0) {
            //        $(blankSelectOptions).remove();
            //    }
            //    $("#STATE_ID").val($scope.STATE_ID);
            //}, 500);

           
        });
        $("#Admin_AddState").modal("show");
    };



    $scope.AddUpdateAdmin = function () {
        $("#loader").css("display", '');
        tb_Admin = {
            CITY_ID: $scope.CITY_ID, //for update table
            CITY_NAME: $scope.CITY_NAME,
            STATE_ID: $scope.STATE_ID
            
        };
        if ($scope.Admin_Action === "Add City") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update City") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("City added successfully.");
                $("#Admin_AddState").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("City already added.");
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
        var datalist = AdminService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("City updated successfully.");
                $("#Admin_AddState").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("City already added.");
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