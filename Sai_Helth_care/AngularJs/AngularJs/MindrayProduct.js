app.service("CategoryService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicProduct/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicProduct/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicProduct/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicProduct/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
    this.MedtronicProductExport = function (SearchingConditions) {
        debugger

        var response = $http({

            method: "POST",
            url: "/MedtronicProduct/MedtronicProductExport",

            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Product/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

});

app.controller("ProductCtrl", function ($scope, CategoryService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.PRODUCT_NAME = null;
    GetTotalcount();

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = CategoryService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.ProductList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }




    function GetSearchingConditions() {

        if ($scope.PRODUCT_SEARCH_NAME === undefined || $scope.PRODUCT_SEARCH_NAME === "" || $scope.PRODUCT_SEARCH_NAME === null) {
            $scope.PRODUCT_SEARCH_NAME = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            PRODUCT_NAME: $scope.PRODUCT_SEARCH_NAME
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
            $scope.ProductList = response.data;

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
        $scope.P_ID = "";
        $scope.PRODUCT_NAME = "";
        $scope.HSN_CODE = "";
        $scope.MRP = "";
        $scope.BASIC_PRICE = "";
        $scope.GST_PERCENTAGE = "";
    }
    $scope.AdminClick = function () {
        Clear();
        $scope.Admin_Action = "Add Product";

        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.getForUpdate = function (admin) {
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.PRODUCT_NAME = admin.PRODUCT_NAME;
        $scope.HSN_CODE = admin.HSN_CODE;
        $scope.MRP = parseFloat(admin.MRP);
        $scope.BASIC_PRICE = parseFloat(admin.BASIC_PRICE);
        $scope.GST_PERCENTAGE = parseFloat(admin.GST_PERCENTAGE);

        $scope.Admin_Action = "Update Product";

        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };



    $scope.AddAdmin = function () {
        $("#loader").css("display", '');

        tb_Admin = {
            P_ID: parseInt($scope.P_ID),
            PRODUCT_NAME: $scope.PRODUCT_NAME,
            HSN_CODE: $scope.HSN_CODE,
            MRP: parseFloat($scope.MRP),
            BASIC_PRICE: parseFloat($scope.BASIC_PRICE),
            GST_PERCENTAGE: parseFloat($scope.GST_PERCENTAGE)
        };

        if ($scope.Admin_Action === "Add Product") {
            AddAdminRecord(tb_Admin);

        }
        else if ($scope.Admin_Action === "Update Product") {
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = CategoryService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
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
        var datalist = CategoryService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
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
        var getStatus = CategoryService.ChangeStatus(Admin.P_ID);
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
    $scope.exportToExcel = function () {

        MedtronicProductExport();
    }
    function MedtronicProductExport() {
        var SearchingConditions = GetSearchingConditions(); // This should now contain CUSTOMER_NAME
        var getrecord = CategoryService.MedtronicProductExport(SearchingConditions);
        getrecord.then(function (response) {
            if (response.status === 404) {
                alert("No Data Found");
                return;
            } else {
                var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Medtronic_Product_Report.xls';
                link.click();
                $("#loader").css("display", 'none');
            }
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


});