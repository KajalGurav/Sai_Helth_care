app.service("CategoryService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/SparePart/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/SparePart/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/SparePart/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePart/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };


    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
         /*   url: "/SparePart/GetProduct",*/
            url: "/SparePart/GetRegularProduct",
            params: {
                id: id
            }
        });
        return response;
    };
    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/SparePart/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/SparePart/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.ChangeStatus = function (id, status) {
        var response = $http({
            method: "POST",
            url: "/SparePart/ChangeStatus",
            params: {
                id: JSON.stringify(id),
                status: status
            }
        });
        return response;
    };
});




app.controller("SparePartCtrl", function ($scope, CategoryService) {


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
        var getcount = CategoryService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.SpareProductList = "";
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
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }
    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CategoryService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.SpareProductList = response.data;
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
        var getAdmin = CategoryService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }


    $scope.GetMenuChange = function () {

        GetAllManufacturer();
    };


    function GetAllManufacturer() {
        var getAdmin = CategoryService.GetManufacturer($scope.CAT_ID);
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;



        });
    }



    $scope.GetProductChange = function () {

        GetAllProduct();
    };


    function GetAllProduct() {
        var getAdmin = CategoryService.GetProduct($scope.M_ID);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;

        });
    }



    function Clear() {
        $scope.SP_ID = null;
        $scope.CAT_ID = null;
        $scope.M_ID = null;
        $scope.P_ID = null;
        $scope.SPARE_PART = "";
        $scope.HSN_CODE = "";
        $scope.PRICE = "";
        $scope.LETTER_REF_NO = "";

    }



    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Spare Part";
        Clear();
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.getForUpdate = function (Product) {
        //alert(Product.P_ID);
        $scope.Admin_Action = "Update Spare Part";
        
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.SP_ID = Product.SP_ID;
        $scope.CAT_ID = Product.CAT_ID;
        $scope.P_ID = Product.P_ID;
        $scope.M_ID = Product.M_ID;
        $scope.SPARE_PART = Product.SPARE_PART;
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


        //AddAdmin(tb_Admin);

    };

    $scope.AddAdmin = function () {
        tb_Admin = {

            SP_ID: $scope.SP_ID,
            P_ID: $scope.P_ID,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            SPARE_PART: $scope.SPARE_PART,
            HSN_CODE: $scope.HSN_CODE,
            PRICE: $scope.PRICE

        };
        if ($scope.Admin_Action === "Add Spare Part") {

            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Spare Part") {

            EditAdminRecord(tb_Admin);
        }
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = CategoryService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Spare Part added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Spare Part already added.");
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
        var datalist = CategoryService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Spare Part updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Spare Part already added.");
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


    $scope.OpenChangeStatus = function (Prod) {
        $scope.SP_ID = Prod.SP_ID;
        $scope.STATUS = Prod.STATUS;
        $("#Admin_Status").modal("show");
    }

    $scope.ChangeStatus = function () {
        $("#loader").css("display", '');
        var status = $scope.STATUS;
        var getStatus = CategoryService.ChangeStatus($scope.SP_ID, status);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#Admin_Status").modal("hide");
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