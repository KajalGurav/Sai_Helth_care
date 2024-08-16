app.service("CategoryService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/TotalRecordCountAccessories",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/GetAccessoriesList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/AddUpdateMedtronicAccessories",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetProduct = function (productTypeID, Type) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetProduct",
            params: {
                productTypeID: productTypeID,
                Type: Type
            }
        });
        return response;
    };

    //this.GetProduct = function (productTypeID) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Quotation_Registration/GetProduct",
    //        params: {
    //            productTypeID: productTypeID
    //        }
    //    });
    //    return response;
    //};

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };
});

app.controller("ProductCtrl", function ($scope, CategoryService) {

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.ACC_TYPE_ID = parseInt(PARAM[0].split('=').pop());
    var ACC_TYPE_ID = $scope.ACC_TYPE_ID;
    if ($scope.ACC_TYPE_ID === 1) {
        $scope.ACC_TYPE_NAME = "Main System";
    }
    else if ($scope.ACC_TYPE_ID === 2) {
        $scope.ACC_TYPE_NAME = "Attachments";
    }
    else if ($scope.ACC_TYPE_ID === 3) {
        $scope.ACC_TYPE_NAME = "Tools";
    }

    $("#loader").css("display", '');
    $scope.PageNo = 0;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    GetTotalcount();


    function GetAllProduct() {
        var productTypeID = 3;
        var getAdmin = CategoryService.GetProduct(productTypeID,"New");
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
        });
    }


    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = CategoryService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.AccessoriesList = "";
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
            SEARCH_NAME: $scope.SEARCH_NAME,
            MED_ACCESSORY_TYPE_ID: $scope.ACC_TYPE_ID
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
            $scope.AccessoriesList = response.data;

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

    function Clear() {
        $scope.MED_ACC_ID = "";
        $scope.P_ID = "";
        $scope.ACCESSORY_CODE = "";
        $scope.ACCESSORY_NAME = "";
        $scope.HSN_CODE = "";
        $scope.MRP = "";
        $scope.BASIC_PRICE = "";
        $scope.GST_PERCENTAGE = "";
        $scope.ACTION = "";
    }
    $scope.AdminClick = function () {
        Clear();
        $scope.Admin_Action = "Add Accessories";
        $scope.ACTION = "ADD";
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        GetAllProduct();

    };


    $scope.getForUpdate = function (admin) {

        $scope.MED_ACC_ID = parseInt(admin.MED_ACC_ID);
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.ACCESSORY_CODE = admin.ACCESSORY_CODE;
        $scope.ACCESSORY_NAME = admin.ACCESSORY_NAME;
        $scope.HSN_CODE = admin.HSN_CODE;
        $scope.ACC_TYPE_ID = parseInt(admin.MED_ACCESSORY_TYPE_ID);
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.MRP = parseFloat(admin.MRP);
        $scope.BASIC_PRICE = parseFloat(admin.BASIC_PRICE);
        $scope.GST_PERCENTAGE = parseFloat(admin.GST_PERCENTAGE);
        $scope.Admin_Action = "Update Accessories";
        $scope.ACTION = "UPDATE";
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        GetAllProduct();

    };



    $scope.AddAdmin = function () {
        $("#loader").css("display", '');

        tb_Admin = {
            MED_ACC_ID: parseInt($scope.MED_ACC_ID),
            P_ID: parseInt($scope.P_ID),
            MED_ACCESSORY_TYPE_ID: parseInt($scope.ACC_TYPE_ID),
            ACCESSORY_CODE: $scope.ACCESSORY_CODE,
            ACCESSORY_NAME: $scope.ACCESSORY_NAME,
            HSN_CODE: $scope.HSN_CODE,
            MRP:parseFloat($scope.MRP),
            BASIC_PRICE:parseFloat($scope.BASIC_PRICE ),
            GST_PERCENTAGE: parseFloat($scope.GST_PERCENTAGE),
            ACTION: $scope.ACTION
        };
        
        if ($scope.Admin_Action === "Add Accessories") {
           AddAdminRecord(tb_Admin);
           
        }
        else if ($scope.Admin_Action === "Update Accessories") {
          EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = CategoryService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Accessories added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Accessories already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all mandatory fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }





    function EditAdminRecord(tb_Admin) {
        var datalist = CategoryService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Accessories updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Accessories already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all mandatory fields.");
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
        var getStatus = CategoryService.ChangeStatus(Admin.MED_ACC_ID);
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