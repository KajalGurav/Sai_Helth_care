app.service("ProductStockService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/ProductStockMangement/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };


    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/GetProduct",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddUpdateAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/AddUpdateAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetAllCustomer = function () {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/GetCustomerList",
        });
        return response;
    };

    this.GetAllVendor = function () {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/GetVendorList",
        });
        return response;
    };

    this.GetEmployee = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetEmployee",
        });
        return response;
    };

    this.GetLatestRecords = function (tb_params) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };

    this.ProductStockExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/ProductStockMangement/ProductStockExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetManufacturerList = function () {
        var response = $http({
            method: "GET",
            url: "/ProductStockMangement/GetManufacturerList",
        });
        return response;
    };


    this.GetProductList = function () {
        console.log("Hello");
        var response = $http({
            method: "GET",
            url: "/ProductStockMangement/GetProductList",
        });
        return response;
    };
});




app.controller("ProductStockCtrl", function ($scope, ProductStockService, $filter) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    $scope.START_DATE = null;
    $scope.END_DATE = null;
    $scope.IS_URD_SUPPLIER = 0;
    /* $scope.PRODUCT_TYPE = "Regular";*/

    GetTotalcount();
    GetAllManufacturerList();
    GetAllProductList();
    GetAllProduct();


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = ProductStockService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.StockEntryList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }


    $scope.ProductList1 = [
        { P_ID: 1, PRODUCT_NAME: 'Product A' },
        { P_ID: 2, PRODUCT_NAME: 'Product B' },
        // More products...
    ];

    function GetSearchingConditions() {

        if ($scope.SEARCH_NAME === undefined || $scope.SEARCH_NAME === "" || $scope.SEARCH_NAME === null) {
            $scope.SEARCH_NAME = null;
        }
        $scope.START_DATE = $("#START_DATE").val();
        $scope.END_DATE = $("#END_DATE").val();

        if ($scope.START_DATE === undefined || $scope.START_DATE === '') {
            $scope.START_DATE = null;
        }
        if ($scope.END_DATE === undefined || $scope.END_DATE === '') {
            $scope.END_DATE = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME,
            START_DATE: $scope.START_DATE,
            END_DATE: $scope.END_DATE,
            P_TYPE: $scope.P_TYPE,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            P_ID: $scope.P_ID
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
        var getrecord = ProductStockService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.StockEntryList = response.data;
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
    $scope.OnProductChange = function () {
        // Logic to find the selected product by its name
        const selectedProduct = $scope.ProductList.find(prod => prod.PRODUCT_NAME === $scope.searchProductText);
        if (selectedProduct) {
            $scope.P_ID = selectedProduct.P_ID; // Set the product ID based on selection
        } else {
            $scope.P_ID = null; // Reset if not found
        }
    };
    $scope.OnProductChange = function () {
        if ($scope.P_ID === undefined || $scope.P_ID === null || $scope.P_ID === "") {
            $scope.AccessoriesList = [];
            $scope.SparePartList = [];
        }
        else {
            GetAllAccessories();
            GetAllSparepart();
            GetProductSerialNoList($scope.P_ID, $scope.M_ID);
        }
    };
    function GetAllSparepart() {
        var getAdmin = ProductStockService.GetAllSparepart(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparePartList = response.data;
        });
    }

    function GetAllAccessories() {
        var getAdmin = ProductStockService.GetAllAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }
    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "ProductStock",
            CustomerTypeId: null
        }
        var LatestDocNo = ProductStockService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            //$scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            $scope.P_STOCK_NO = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.STOCK_ENTRY_DATE = today;
        });
        //console.log($scope.AddPayment);
    }

    function GetEmployee() {
        var getAdmin = ProductStockService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }
    function GetAllCategory() {
        var getAdmin = ProductStockService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });

        var getAdmin = ProductStockService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList1 = response.data;
        });
    }


    $scope.GetMenuChange = function () {

        GetAllManufacturer();
    };


    function GetAllManufacturer() {
        var getAdmin = ProductStockService.GetManufacturer($scope.CAT_ID);
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;



        });
    }



    $scope.GetProductChange = function () {
        console.log("Current M_ID:", $scope.M_ID);
        GetAllProduct();
    };


    //function GetAllProduct() {
    //    var getAdmin = ProductStockService.GetProduct($scope.M_ID);
    //    getAdmin.then(function (response) {
    //        $scope.ProductList = response.data;

    //    });
    //}
    function GetAllProduct() {
        var getAdmin = ProductStockService.GetProduct($scope.M_ID);
        getAdmin.then(function (response) {
            if (response.data && response.data.length > 0) {
                console.log("Product data:", response.data);
                $scope.ProductList = response.data;
            } else {
                console.warn("No products found for M_ID:", $scope.M_ID);
            }
        }, function (error) {
            console.error("Failed to fetch products:", error);
        });
    }



    function GetAllCustomer() {
        var getAdmin = ProductStockService.GetAllCustomer();
        getAdmin.then(function (response) {
            $scope.AllCustomerList = response.data;

        });
    }


    function GetAllVendor() {
        var getAdmin = ProductStockService.GetAllVendor();
        getAdmin.then(function (response) {
            $scope.AllVendorList = response.data;

        });
    }

    function Clear() {
        $scope.P_STOCK_ID = null;
        $scope.P_STOCK_NO = "";
        $scope.PRODUCT_TYPE = "";
        $scope.CAT_ID = null;
        $scope.M_ID = null;
        $scope.P_ID = null;
        $scope.P_SERIAL_NO = "";
        $scope.P_QTY = "";
        $scope.PENDING_QTY = "";
        $scope.IS_URD_SUPPLIER = 0;
        $scope.URD_SUPPLIER_ID = null;
        $scope.VENDOR_SUPPLIER_ID = null;
        $scope.SUPPLIER_CONTACT_PERSON = "";
        $scope.DEPART_FROM = "";
        $scope.INVOICE_NO = "";
        $scope.MATERIAL_RECEIVED_DATE = "";
        $scope.DC_NO = "";
        $scope.VEHICAL_NO = "";
        $scope.ARRIVE_AT = "";
        $scope.EMPLOYEE_ID = null;
        $scope.COMMENTS = "";
        $scope.SHIPMENT_DETAILS = "";
        $scope.HSN_CODE = "";
        $scope.AddProductStock.$setPristine();
        $scope.AddProductStock.$setUntouched();
    }

    $scope.GetSupplierChange = function () {
        $scope.URD_SUPPLIER_ID = "";
        $scope.VENDOR_SUPPLIER_ID = "";
        $scope.SUPPLIER_CONTACT_PERSON = "";
    }
    $scope.GetContactPersonChange = function (id, isUrd) {

        if (id !== "" || id !== null || id !== undefined) {
            if (isUrd === 1) {
                var user = $scope.AllCustomerList.filter(z => z.Customer_ID === id)[0];
                $scope.SUPPLIER_CONTACT_PERSON = user.CUSTOMER_NAME;
            }
            else if (isUrd === 0) {
                var user = $scope.AllVendorList.filter(z => z.V_ID === id)[0];
                $scope.SUPPLIER_CONTACT_PERSON = user.VENDOR_NAME;
            }
        }

    }

    $scope.GetProductTypeChange = function () {
        $scope.CAT_ID = "";
        $scope.M_ID = "";
        $scope.P_ID = "";
        $scope.P_SERIAL_NO = "";
        $scope.P_QTY = "";
        if ($scope.PRODUCT_TYPE === "Medtronic") {
            GetAllProduct();
        }
        else {
            GetAllCategory();
        }
    }


    $scope.getForUpdate = function (Product) {
        $scope.Admin_Action = "Update Product";
        $("#Product_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.P_STOCK_ID = Product.P_STOCK_ID;
        $scope.P_STOCK_NO = Product.P_STOCK_NO;
        $scope.STOCK_ENTRY_DATE = Product.STOCK_ENTRY_DATE;
        $scope.PRODUCT_TYPE = Product.PRODUCT_TYPE;
        $scope.CAT_ID = Product.CAT_ID;
        $scope.M_ID = Product.M_ID;
        $scope.P_ID = Product.P_ID;
        $scope.P_SERIAL_NO = Product.P_SERIAL_NO;
        $scope.P_QTY = Product.P_QTY;
        $scope.PENDING_QTY = Product.PENDING_QTY;
        $scope.IS_URD_SUPPLIER = Product.IS_URD_SUPPLIER;
        $scope.URD_SUPPLIER_ID = Product.URD_SUPPLIER_ID;
        $scope.VENDOR_SUPPLIER_ID = Product.VENDOR_SUPPLIER_ID;
        $scope.SUPPLIER_CONTACT_PERSON = Product.SUPPLIER_CONTACT_PERSON;
        $scope.DEPART_FROM = Product.DEPART_FROM;
        $scope.INVOICE_NO = Product.INVOICE_NO;
        $scope.MATERIAL_RECEIVED_DATE = Product.MATERIAL_RECEIVED_DATE;
        $scope.DC_NO = Product.DC_NO;
        $scope.VEHICAL_NO = Product.VEHICAL_NO;
        $scope.ARRIVE_AT = Product.ARRIVE_AT;
        $scope.EMPLOYEE_ID = Product.EMPLOYEE_ID;
        $scope.COMMENTS = Product.COMMENTS;
        $scope.SHIPMENT_DETAILS = Product.SHIPMENT_DETAILS;
        $scope.HSN_CODE = Product.HSN_CODE;

        GetAllCategory();
        GetAllManufacturer();
        GetAllProduct();
        GetEmployee();
        GetAllCustomer();
        GetAllVendor();
    };


    $scope.AddAdmin = function () {
        Clear();
        /*  $scope.PRODUCT_TYPE = "Regular";*/
        $scope.Admin_Action = "Add Product";
        GetLatestRecord();
        GetAllCategory();
        GetEmployee();
        GetAllCustomer();
        GetAllVendor();
        $("#Product_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        var currentDate = new Date();
        $scope.STOCK_ENTRY_DATE = $filter('date')(currentDate, 'dd/MM/yyyy');
    }

    $scope.AddUpdateAdmin = function () {

        /* $scope.STOCK_ENTRY_DATE = $("#STOCK_ENTRY_DATE").val();*/
        $scope.MATERIAL_RECEIVED_DATE = $("#MATERIAL_RECEIVED_DATE").val();
        if ($scope.STOCK_ENTRY_DATE === "" || $scope.STOCK_ENTRY_DATE === null || $scope.STOCK_ENTRY_DATE === undefined) {
            alert("Enter Stock Entry Date");
            return;
        }

        if ($scope.MATERIAL_RECEIVED_DATE === "" || $scope.MATERIAL_RECEIVED_DATE === null || $scope.MATERIAL_RECEIVED_DATE === undefined) {
            alert("Enter Material Received Date");
            return;
        }

        if ($scope.Admin_Action === "Add Product") {
            Action = "ADD";

        } else {
            Action = "UPDATE";
        }

        tb_Admin = {
            P_STOCK_ID: $scope.P_STOCK_ID,
            P_STOCK_NO: $scope.P_STOCK_NO,
            STOCK_ENTRY_DATE: $scope.STOCK_ENTRY_DATE,
            PRODUCT_TYPE: $scope.PRODUCT_TYPE,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            P_ID: $scope.P_ID,
            P_SERIAL_NO: $scope.P_SERIAL_NO,
            P_QTY: parseInt($scope.P_QTY),
            IS_URD_SUPPLIER: $scope.IS_URD_SUPPLIER,
            URD_SUPPLIER_ID: $scope.URD_SUPPLIER_ID,
            VENDOR_SUPPLIER_ID: $scope.VENDOR_SUPPLIER_ID,
            SUPPLIER_CONTACT_PERSON: $scope.SUPPLIER_CONTACT_PERSON,
            DEPART_FROM: $scope.DEPART_FROM,
            INVOICE_NO: $scope.INVOICE_NO,
            MATERIAL_RECEIVED_DATE: $scope.MATERIAL_RECEIVED_DATE,
            DC_NO: $scope.DC_NO,
            VEHICAL_NO: $scope.VEHICAL_NO,
            ARRIVE_AT: $scope.ARRIVE_AT,
            EMPLOYEE_ID: $scope.EMPLOYEE_ID,
            COMMENTS: $scope.COMMENTS,
            SHIPMENT_DETAILS: $scope.SHIPMENT_DETAILS,
            HSN_CODE: $scope.HSN_CODE,
            PENDING_QTY: $scope.PENDING_QTY,
            ACTION: Action
        }

        if ($scope.Admin_Action === "Add Product") {

            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Product") {

            EditAdminRecord(tb_Admin);
        }
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = ProductStockService.AddUpdateAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product added successfully.");
                $("#Product_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
                /* $("#Product_add").modal("hide");*/
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
        debugger
        var datalist = ProductStockService.AddUpdateAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product updated successfully.");
                $("#Product_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                debugger
                alert("Product already added.");
                $("#Product_add").modal("hide");
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
        ProductStockExport();
    }
    function ProductStockExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = ProductStockService.ProductStockExport(SearchingConditions);
        getrecord.then(function (response) {
            if (response.status === 404) {
                alert("No Data Found");
                return;
            }
            else {
                var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Product Stock Report.xls';
                link.click();
                $("#loader").css("display", 'none')
            }
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    function GetAllManufacturerList() {
        var getAdmin = ProductStockService.GetManufacturerList();
        getAdmin.then(function (response) {
            $scope.ManufacturerList1 = response.data;
        });
    }

    function GetAllProductList() {
        var getAdmin = ProductStockService.GetProductList();
        getAdmin.then(function (response) {
            $scope.ProductList1 = response.data;
        });
    }
    // Define AngularJS controller function to export data
    app.controller('CategoryCtrl', function ($scope, $http) {
        $scope.exportToExcel = function () {
            // Get the search query from the model
            var searchQuery = $scope.FARMER_SEARCH;

            // Redirect to the server-side action with the search query
            window.location.href = '/PRoduct_Master/ExportToExcel?CategoryName=' + encodeURIComponent(searchQuery);
        };
    });


});