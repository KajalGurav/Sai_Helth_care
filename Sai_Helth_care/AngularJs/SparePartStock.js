app.service("SpareStockService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/SparePartMangement/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };
    
    this.GetAllMedtronicProduct = function () {
        return $http.get("/SparePartMangement/GetAllMedtronicProduct");
    };
   

    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetProduct",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetPartTypes = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetPartTypes",
            params: {
                id: id
            }
        });
        return response;
    };

    

    this.GetParts = function (productId, partTypeId) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetParts",
            params: {
                productId: productId,
                partTypeId: partTypeId
            }
        });
        return response;
    };

    this.AddUpdateAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/AddUpdateAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.PartStockExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/PartStockExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetProductSerialNoListById = function (id, invoiceID) {
        var response = $http({
            method: "GET",
            url: "/InvoiceMaster/GetProductSerialNoListById",
            params: {
                id: id,
                invoiceID: invoiceID
            }
        });
        return response;
    };

    this.GetProductStock = function () {
        var response = $http({
            method: "POST",
            url: "/SparePartMangement/GetAllProductStock",
            data: JSON.stringify()
        });
        return response;
    };

});




app.controller("SparePartStockCtrl", function ($scope, SpareStockService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    $scope.START_DATE = null;
    $scope.END_DATE = null;
    /*$scope.PRODUCT_TYPE = "Regular";*/

    GetTotalcount();
    GetAllCategory();
    GetAllManufacturer();
    GetAllProduct();

    var MY_PARAMETER = window.location.search;
    $scope.STOCK_NO = MY_PARAMETER.split("=")[1];

    if ($scope.STOCK_NO != "NULL")
    {
        GetProductStock();
    }

    function GetProductStock() {
        var getrecord = SpareStockService.GetProductStock();
        getrecord.then(function (response) {
            $scope.StockEntryList = response.data;
            $scope.PRODUCT_TYPE = $scope.StockEntryList[0].PRODUCT_TYPE;
            $scope.CAT_ID = $scope.StockEntryList[0].CAT_ID;
            $scope.M_ID = $scope.StockEntryList[0].M_ID;
            $scope.P_ID = $scope.StockEntryList[0].P_ID;
            $scope.P_STOCK_ID = $scope.StockEntryList[0].P_STOCK_ID;
            $scope.STOCK_ENTRY_DATE = $scope.StockEntryList[0].STOCK_ENTRY_DATE;
            $scope.HSN_CODE = $scope.StockEntryList[0].HSN_CODE;
            $scope.P_SERIAL_NO = $scope.StockEntryList[0].P_SERIAL_NO;
            GetAllPartTypes($scope.P_ID);
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = SpareStockService.TotalRecordCount(SearchingConditions);
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
            END_DATE: $scope.END_DATE

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
        var getrecord = SpareStockService.getRecordbyPaging(SearchingConditions);
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

    $scope.Getdata = function () {
        if ($scope.START_DATE == "" || $scope.START_DATE == undefined || $scope.START_DATE == null || $scope.END_DATE == "" || $scope.END_DATE == undefined || $scope.END_DATE == null) {
            alert("Please select date range.");
            return;
        }
            GetTotalcount();
    }

    $scope.SearchAdmin = function () {
        GetTotalcount();
    };


    function GetAllCategory() {
        var getAdmin = SpareStockService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }


    $scope.GetMenuChange = function () {

        GetAllManufacturer();
    };


    function GetAllManufacturer() {
        if ($scope.CAT_ID == undefined) {
            $scope.CAT_ID = 0;
        }
        var getAdmin = SpareStockService.GetManufacturer($scope.CAT_ID);
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;



        });
    }



    $scope.GetProductChange = function () {

        GetAllProduct();
    };
    

    function GetAllProduct() {
        if ($scope.M_ID == undefined) {
            $scope.M_ID = 0;
        }
        var getAdmin = SpareStockService.GetProduct($scope.M_ID);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
            if ($scope.P_ID !== "" || $scope.P_ID !== null || $scope.P_ID !== undefined) {
                GetAllPartTypes($scope.P_ID);
            }
          
        });
    }

    function GetAllMedtronicProduct() {
        var getAdmin = SpareStockService.GetAllMedtronicProduct();
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
            if ($scope.P_ID !== "" || $scope.P_ID !== null || $scope.P_ID !== undefined) {
                GetAllPartTypes($scope.P_ID);
            }

        });
    }

    $scope.GetPartTypeChange = function (P_ID) {
        if (P_ID !== undefined && P_ID !== null && P_ID !== "") {
            GetAllPartTypes(P_ID);
            GetProductSerialNoList(P_ID, 0);
        }
    }

    function GetAllPartTypes(P_ID) {
        var prod = $scope.ProductList.filter(z => z.P_ID == P_ID)[0];
        var getAdmin = SpareStockService.GetPartTypes(prod.PT_ID);
        getAdmin.then(function (response) {
            $scope.PartTypeList = response.data;

        });
    }

    $scope.GetPartChange = function (P_ID) {
        GetAllParts();
    }
    function GetAllParts() {
        var getAdmin = SpareStockService.GetParts($scope.P_ID, $scope.PART_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.PartList = response.data;

        });
    }


    function Clear() {
        $scope.SP_STOCK_ID = "";
        //$scope.PART_ID = "";
        //$scope.PART_TYPE_ID = "";
        $scope.PART_SERIAL_NO = "";
        $scope.PART_NO = "";
        $scope.LOCATION = "";
        //$scope.REMARK = "";
        //$scope.STATUS = "";
        //$scope.CAT_ID = "";
        //$scope.M_ID = "";
        //$scope.P_ID = "";
        //$scope.PART_QTY = "";
        //$scope.PART_PRICE = "";
        //$scope.HSN_CODE = "";
        $scope.PENDING_QTY = "";
        $scope.P_STOCK_ID = "";
        $scope.PART_QTY = "";
        $scope.STOCK_ENTRY_DATE = "";
        $scope.STATUS = "";
        $scope.PART_PRICE = "";
        $scope.LOCATION = "";
        $scope.HSN_CODE = "";
        $scope.REMARK = "";
        //$scope.STOCK_ENTRY_DATE = "";

    }

    function ClearEdit() {
        $scope.SP_STOCK_ID = "";
        $scope.PART_ID = "";
        $scope.NEW_PRODUCT_TYPE = "";
        $scope.NEW_PART_TYPE_ID = "";
        $scope.NEW_PART_SERIAL_NO = "";
        $scope.NEW_PART_NO = "";
        $scope.NEW_LOCATION = "";
        $scope.NEW_REMARK = "";
        $scope.NEW_STATUS = "";
        $scope.CAT_ID = "";
        $scope.M_ID = "";
        $scope.P_ID = "";
        $scope.NEW_PART_QTY = "";
        $scope.NEW_PART_PRICE = "";
        $scope.NEW_HSN_CODE = "";
        $scope.NEW_PENDING_QTY = "";
        $scope.NEW_STOCK_ENTRY_DATE = "";

    }


    $scope.GetProductTypeChange = function () {
        Clear();
        if ($scope.PRODUCT_TYPE === "Medtronic") {
            GetAllMedtronicProduct();
        }
        else {
            GetAllCategory();
        }
    }


    //$scope.AddStock = function () {
    //    Clear();
    //    $scope.Admin_Action = "Add Spare Part";
    //    GetAllCategory();

    //}

    $scope.getForUpdate = function (Product) {
        $scope.Admin_Action = "Update Spare Part";

        $scope.SP_STOCK_ID = Product.SP_STOCK_ID;
        $scope.SP_STOCK_NO = Product.SP_STOCK_NO;
        $scope.NEW_P_STOCK_ID = Product.P_STOCK_ID;
        $scope.NEW_PRODUCT_TYPE = Product.PRODUCT_TYPE;
        $scope.NEW_PART_TYPE_ID = Product.PART_TYPE_ID;
        $scope.NEW_PART_SERIAL_NO = Product.PART_SERIAL_NO;
        $scope.NEW_PART_NO = Product.PART_NO;
        $scope.NEW_BATCH_NO = Product.BATCH_NO;
        $scope.NEW_PART_PRICE = Product.PART_PRICE;
        $scope.NEW_PART_QTY = Product.PART_QTY;
        $scope.NEW_LOCATION = Product.LOCATION;
        $scope.NEW_REMARK = Product.REMARK;
        $scope.NEW_STATUS = Product.STATUS;
        $scope.PART_ID = Product.PART_ID;
        $scope.CAT_ID = Product.CAT_ID;
        $scope.NEW_P_ID = Product.P_ID;
        $scope.M_ID = Product.M_ID;
        $scope.NEW_PENDING_QTY = Product.PENDING_QTY;
        $scope.NEW_HSN_CODE = Product.HSN_CODE;
        $scope.NEW_STOCK_ENTRY_DATE = Product.STOCK_ENTRY_DATE;
        $scope.INVOICE_ID = Product.INVOICE_ID;
        if ($scope.INVOICE_ID === "" || $scope.INVOICE_ID === null || $scope.INVOICE_ID === undefined) {
            GetProductSerialNoListUpdate(parseInt($scope.NEW_P_ID), 0);
        }
        else {
            GetProductSerialNoListUpdate(parseInt($scope.NEW_P_ID), $scope.INVOICE_ID);
        }
        
        //$("STOCK_ENTRY_DATE2").val()

        //GetAllCategory();
        //GetAllManufacturer();
        //GetAllProduct();
        //GetAllPartTypes($scope.P_ID);
        //GetAllParts();


    };

    $scope.AddUpdateAdmin = function (Action) {
        
        
        if (Action === "ADD") {
            $scope.STOCK_ENTRY_DATE = $("#STOCK_ENTRY_DATE").val();
            if ($scope.STOCK_ENTRY_DATE === "" || $scope.STOCK_ENTRY_DATE === null || $scope.STOCK_ENTRY_DATE === undefined) {
                alert("Enter Stock Entry date");
                return;
            }
            $scope.Admin_Action = "Add Spare Part";

            tb_Admin = {
                SP_STOCK_ID: $scope.SP_STOCK_ID,
                PRODUCT_TYPE: $scope.PRODUCT_TYPE,
                PART_TYPE_ID: $scope.PART_TYPE_ID,
                PART_SERIAL_NO: $scope.PART_SERIAL_NO,
                PART_NO: $scope.PART_NO,
                PART_PRICE: $scope.PART_PRICE,
                PART_QTY: $scope.PART_QTY,
                LOCATION: $scope.LOCATION,
                REMARK: $scope.REMARK,
                STATUS: $scope.STATUS,
                PART_ID: $scope.PART_ID,
                P_ID: $scope.P_ID,
                PENDING_QTY: $scope.PENDING_QTY,
                HSN_CODE: $scope.HSN_CODE,
                STOCK_ENTRY_DATE: $scope.STOCK_ENTRY_DATE,
                P_STOCK_ID: $scope.P_STOCK_ID,
                BATCH_NO: $scope.BATCH_NO,
                ACTION: Action
            }

            AddAdminRecord(tb_Admin);

        }
        else if (Action === "UPDATE") {
            $scope.NEW_STOCK_ENTRY_DATE = $("#STOCK_ENTRY_DATE2").val();
            if ($scope.NEW_STOCK_ENTRY_DATE === "" || $scope.NEW_STOCK_ENTRY_DATE === null || $scope.NEW_STOCK_ENTRY_DATE === undefined) {
                alert("Enter Stock Entry date");
                return;
            }

            tb_Admin = {
                SP_STOCK_ID: $scope.SP_STOCK_ID,
                PRODUCT_TYPE: $scope.NEW_PRODUCT_TYPE,
                PART_TYPE_ID: $scope.NEW_PART_TYPE_ID,
                PART_SERIAL_NO: $scope.NEW_PART_SERIAL_NO,
                PART_NO: $scope.NEW_PART_NO,
                PART_PRICE: $scope.NEW_PART_PRICE,
                PART_QTY: $scope.NEW_PART_QTY,
                LOCATION: $scope.NEW_LOCATION,
                REMARK: $scope.NEW_REMARK,
                STATUS: $scope.NEW_STATUS,
                PART_ID: $scope.PART_ID,
                P_ID: $scope.NEW_P_ID,
                PENDING_QTY: $scope.NEW_PENDING_QTY,
                HSN_CODE: $scope.NEW_HSN_CODE,
                STOCK_ENTRY_DATE: $scope.NEW_STOCK_ENTRY_DATE,
                P_STOCK_ID: $scope.NEW_P_STOCK_ID,
                BATCH_NO: $scope.NEW_BATCH_NO,
                ACTION: Action
            }

            EditAdminRecord(tb_Admin);
        }
       
        //if ($scope.Admin_Action === "Add Spare Part") {

        //    AddAdminRecord(tb_Admin);
        //}

        //else if ($scope.Admin_Action === "Update Spare Part") {

        //    EditAdminRecord(tb_Admin);
        //}
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = SpareStockService.AddUpdateAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Spare Part added successfully.");
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


    $scope.ClearEdit = function(){
        ClearEdit();
    }
    function EditAdminRecord(tb_Admin) {
        var datalist = SpareStockService.AddUpdateAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                ClearEdit(); GetRecordbyPaging();
                alert("Spare Part updated successfully.");
                $("#Stock_Edit").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Spare Part already added.");
                $("#Stock_Edit").modal("hide");
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
        PartStockExport();
    }
    function PartStockExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = SpareStockService.PartStockExport(SearchingConditions);
        getrecord.then(function (response) {
            if (response.status === 404) {
                alert("No Data Found");
                return;
            }
            else {
                var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Part Stock Report.xls';
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


    function GetProductSerialNoList(id, invoiceID)
    {
        var getAdmin = SpareStockService.GetProductSerialNoListById(id, invoiceID);
        getAdmin.then(function (response) {
            $scope.StockProductSerialNoList = response.data;

            if ($scope.StockProductSerialNoList.length > 0) {
                if ($scope.SERIAL_NO === "" || $scope.SERIAL_NO === null || $scope.SERIAL_NO === undefined) {
                    $scope.PSERIAL_NO_ID = "";
                    $scope.SERIAL_NO = "";
                }
                else {
                    var prod1 = $scope.StockProductSerialNoList.filter(z => z.P_SERIAL_NO == $scope.SERIAL_NO)[0];
                    if (prod1 === undefined || prod1 === null) {
                        $scope.PSERIAL_NO_ID = "";
                        $scope.SERIAL_NO = "";
                    }
                    else {
                        $scope.PSERIAL_NO_ID = prod1.P_STOCK_ID;
                        $scope.SERIAL_NO = prod1.P_SERIAL_NO;
                    }
                }
            }

        });
    }


    function GetProductSerialNoListUpdate(id, invoiceID) {
        var getAdmin = SpareStockService.GetProductSerialNoListById(id, invoiceID);
        getAdmin.then(function (response) {
            $scope.StockProductSerialNoListUpdate = response.data;

            if ($scope.StockProductSerialNoListUpdate.length > 0) {
                if ($scope.NEW_SERIAL_NO === "" || $scope.NEW_SERIAL_NO === null || $scope.NEW_SERIAL_NO === undefined) {
                    $scope.NEW_PSERIAL_NO_ID = "";
                    $scope.NEW_SERIAL_NO = "";
                }
                else {
                    var prod1 = $scope.StockProductSerialNoListUpdate.filter(z => z.P_SERIAL_NO == $scope.NEW_SERIAL_NO)[0];
                    if (prod1 === undefined || prod1 === null) {
                        $scope.NEW_PSERIAL_NO_ID = "";
                        $scope.NEW_SERIAL_NO = "";
                    }
                    else {
                        $scope.NEW_PSERIAL_NO_ID = prod1.P_STOCK_ID;
                        $scope.NEW_SERIAL_NO = prod1.P_SERIAL_NO;
                    }
                }
            }

        });
    }

    

    $scope.SelectProductSerialNoUpdate = function () {
        if ($scope.NEW_PSERIAL_NO_ID === "" || $scope.NEW_PSERIAL_NO_ID === null || $scope.NEW_PSERIAL_NO_ID === undefined) {
            $scope.NEW_PSERIAL_NO_ID = "";
            $scope.NEW_SERIAL_NO = "";
        }
        else {
            var prod1 = $scope.StockProductSerialNoListUpdate.filter(z => z.P_STOCK_ID == $scope.NEW_PSERIAL_NO_ID)[0];
            if (prod1 === undefined || prod1 === null) {
                $scope.NEW_PSERIAL_NO_ID = "";
                $scope.NEW_SERIAL_NO = "";
            }
            else {
                $scope.NEW_PSERIAL_NO_ID = prod1.P_STOCK_ID;
                $scope.NEW_SERIAL_NO = prod1.P_SERIAL_NO;
            }

        }
    }
    $scope.SelectProductSerialNo = function () {
        if ($scope.PSERIAL_NO_ID === "" || $scope.PSERIAL_NO_ID === null || $scope.PSERIAL_NO_ID === undefined) {
            $scope.PSERIAL_NO_ID = "";
            $scope.SERIAL_NO = "";
        }
        else {
            var prod1 = $scope.StockProductSerialNoList.filter(z => z.P_STOCK_ID == $scope.PSERIAL_NO_ID)[0];
            if (prod1 === undefined || prod1 === null) {
                $scope.PSERIAL_NO_ID = "";
                $scope.SERIAL_NO = "";
            }
            else {
                $scope.PSERIAL_NO_ID = prod1.P_STOCK_ID;
                $scope.SERIAL_NO = prod1.P_SERIAL_NO;
            }

        }
    }

    $scope.selectaccs = function (part) {
        $scope.PART_ID = part.PART_ID;
        $scope.PART_NAME = part.PART_NAME;
        $scope.showOptions = false;
       
    };
});