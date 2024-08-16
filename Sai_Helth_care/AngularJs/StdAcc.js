app.service("StdAccService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/StdAcc/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };


    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/GetProduct",
            params: {
                id: id
            }
        });
        return response;
    };
    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/StdAcc/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

});




app.controller("StdAccCtrl", function ($scope, StdAccService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    $scope.CITY_ID = null;
    GetTotalcount();
    GetAllCategory();




    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = StdAccService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.StdAccList = "";
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
            $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
            $scope.pager.pages.length = totalPages;
            $scope.pager.currentPage = totalPages;
            $scope.page = totalPages - 1;
            $scope.StdAccList = {};
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = StdAccService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.StdAccList = response.data;
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



    $scope.SearchAdmin = function () {
        GetTotalcount();
    };


    function GetAllCategory() {
        var getAdmin = StdAccService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }


    $scope.GetMenuChange = function () {

        GetAllManufacturer();
    };


    function GetAllManufacturer() {
        var getAdmin = StdAccService.GetManufacturer($scope.CAT_ID);
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;



        });
    }



    $scope.GetProductChange = function () {

        GetAllProduct();
    };


    function GetAllProduct() {
        var getAdmin = StdAccService.GetProduct($scope.M_ID);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;

        });
    }



    function Clear() {
        $scope.STD_ID = null;
        $scope.CAT_ID = null;
        $scope.M_ID = null;
        $scope.P_ID = null;
        $scope.STD_ACC_NAME = "";
        $scope.HSN_CODE = "";
        $scope.PRICE = "";
        $scope.LETTER_REF_NO = "";

    }



    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Standard Acc";
        Clear();
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.getForUpdate = function (Product) {
        //alert(Product.P_ID);
        $scope.Admin_Action = "Update Standard Acc";
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.STD_ID = Product.STD_ID;
        $scope.CAT_ID = Product.CAT_ID;
        $scope.P_ID = Product.P_ID;
        $scope.M_ID = Product.M_ID;
        $scope.STD_ACC_NAME = Product.STD_ACC_NAME;
        $scope.HSN_CODE = Product.HSN_CODE;
        $scope.PRICE = parseInt(Product.PRICE);

        //setTimeout(function myfunction() {
        //    var blankSelectOptions = $('option[value$="?"]');
        //    if (blankSelectOptions.length > 0) {
        //        $(blankSelectOptions).remove();
        //    }
        //    $("#CAT_ID").val($scope.CAT_ID);
        //    $("#M_ID").val($scope.M_ID);
        //    $("#P_ID").val($scope.P_ID);
        //}, 800);

        GetAllCategory();
        GetAllManufacturer();
        GetAllProduct();
        //alert(Product.M_ID);


        //$scope.AddAdmin(tb_Admin);

    };

    $scope.AddAdmin = function () {
        tb_Admin = {

            STD_ID: $scope.STD_ID,
            P_ID: $scope.P_ID,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            STD_ACC_NAME: $scope.STD_ACC_NAME,
            HSN_CODE: $scope.HSN_CODE,
            PRICE: $scope.PRICE

        };
        if ($scope.Admin_Action === "Add Standard Acc") {

            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Standard Acc") {

            EditAdminRecord(tb_Admin);
        }
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = StdAccService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Std Acc added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Std Acc already added.");
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
        var datalist = StdAccService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Std Acc updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Std Acc already added.");
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

    $scope.ChangeStatus = function (Admin) {
        $("#loader").css("display", '');
        var getStatus = StdAccService.ChangeStatus(Admin.STD_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});