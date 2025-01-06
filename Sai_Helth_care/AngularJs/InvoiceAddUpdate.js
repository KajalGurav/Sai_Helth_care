app.service("InvoiceService", function ($http) {

    this.GenerateInvoiceNumber = function (tb_params) {

        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };

    this.GetAllCustomer = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCustomerList",
            params: {
                id: id
            }
        });
        return response;

    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/Product/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/Product/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePart/GetProduct",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetAllAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetStdAccPart",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetAllSparepart = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetSparepart",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetIncludingAllTaxes = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetIncludingAllTaxes",
        });
        return response;
    };

    this.GetGSTPercentage = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetGSTPercentage",
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

    this.AddPartsAccessories = function (tb_AddPartsAccessories) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/AddPartsAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };

    this.Get_IM_SparePartsAndAccessories = function (id1, id2) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Get_IM_SparePartsAndAccessories",
            params: {
                Q_ID: id1,
                INVOICE_ID: id2
            }
        });
        return response;
    };

    this.Delete_IM_SparePartsAndAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_SparePartsAndAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };

    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/AddUpdateInvoice",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetForUpdate = function (id) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/GetInvoiceDetailsForUpdate",
            params: {
                INVOICE_ID: id
            }
        });
        return response;
    };
    this.GetForPrintDetails = function (id) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/GetInvoiceForPrint",
            params: {
                INVOICE_ID: id
            }
        });
        return response;
    };

    this.GetCompanyDetails = function (bankid) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: bankid
            }
        });
        return response;
    };

    this.GetInvoiceDCById = function (id) {
        var response = $http({
            method: "GET",
            url: "/InvoiceMaster/GetInvoiceDCById",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/UpdateChallanImage",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetInvoiceIRById = function (id) {
        var response = $http({
            method: "GET",
            url: "/InvoiceMaster/GetInvoiceIRById",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

    this.EditIRAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/UpdateIRImage",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.DeleteUploadedDocument = function (tb_params) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/DeleteUploadedDocument",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };

    this.DownloadDocument = function (path) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/DownloadDocument",
            params: {
                FilePath: path
            }
        });
        return response;
    };

    this.GetReferenceNoByType = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetReferenceNoByType",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetProductQuotDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProductQuotDetails",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetProductMindrayQuotDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/MindrayQuotation/GetProductQuotDetails",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetPartSerialNoListById = function (id, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE) {
        var response = $http({
            method: "GET",
            url: "/InvoiceMaster/GetPartSerialNoListById",
            params: {
                id: id,
                INVOICE_ACCESSORIES_ID: INVOICE_ACCESSORIES_ID,
                INVOICE_SPAREPART_ID: INVOICE_SPAREPART_ID,
                invoiceID: invoiceID,
                P_STOCK_ID: P_STOCK_ID,
                CUSTOMER_TYPE: CUSTOMER_TYPE
            }
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

    this.UpdatePartsAccessories = function (tb_AddPartsAccessories) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/UpdatePartsAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };
});


app.controller("AddUpdateInvoiceCtrl", function ($scope, InvoiceService) {

    $scope.Math = window.Math;
    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.Customer_ID = parseInt(PARAM[2].split('=').pop());
    $scope.INVOICE_ID = parseInt(PARAM[3].split('=').pop());
    var CUSTOMER_TYPE_NAME = $scope.CUSTOMER_TYPE;

    // Now, use this value to set CUSTOMER_TYPE_ID and PO_LABEL based on the customer type
    if (CUSTOMER_TYPE_NAME === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
        $scope.PO_LABEL = "Refurbished Delivery Challan";  // Set the label for Regular customer type
    }
    else if (CUSTOMER_TYPE_NAME === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
        $scope.PO_LABEL = "AERB PO"; // Or whatever label you want for AERB
    }
    else if (CUSTOMER_TYPE_NAME === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
        $scope.PO_LABEL = "Medtronic PO"; // Label for Medtronic
    }
    else if (CUSTOMER_TYPE_NAME === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
        $scope.PO_LABEL = "Carestream PO"; // Label for Carestream
    }
    else if (CUSTOMER_TYPE_NAME === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
        $scope.PO_LABEL = "Mindray Delivery Challan";  // Set the label for Mindray customer type
    }

    if (PARAM.length == 6) {
        $scope.F_ID = parseInt(PARAM[4].split('=').pop());
        $scope.Q_ID = parseInt(PARAM[5].split('=').pop());
    }
    else {
        $scope.F_ID = null;
        $scope.Q_ID = null;
    }

    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.Customer_ID;
    var INVOICE_ID = $scope.INVOICE_ID;
    $scope.IS_INVOICEForSparePart = 0;
    $("#CAT_ID").prop("disabled", false);
    $("#M_ID").prop("disabled", false);
    $("#P_ID").prop("disabled", false);

    console.log(PARAM);

    if ($scope.CUSTOMER_TYPE === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
    }
    else if ($scope.CUSTOMER_TYPE === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
    }
    else if ($scope.CUSTOMER_TYPE === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
    }
    else if ($scope.CUSTOMER_TYPE === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
    }
    else if ($scope.CUSTOMER_TYPE === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
    }
    if (CUSTOMER_TYPE_NAME === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
        $scope.PO_LABEL = "Refurbished Delivery Challan";  // Set the label for Regular customer type
    }
    else if (CUSTOMER_TYPE_NAME === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
        $scope.PO_LABEL = "AERB PO"; // Or whatever label you want for AERB
    }
    else if (CUSTOMER_TYPE_NAME === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
        $scope.PO_LABEL = "Medtronic PO"; // Label for Medtronic
    }
    else if (CUSTOMER_TYPE_NAME === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
        $scope.PO_LABEL = "Carestream PO"; // Label for Carestream
    }
    else if (CUSTOMER_TYPE_NAME === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
        $scope.PO_LABEL = "Mindray Delivery Challan";  // Set the label for Mindray customer type
    }
    if (CUSTOMER_TYPE_NAME === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
        $scope.PO_LABEL1 = "Refurbished Invoice Tax";  // Set the label for Regular customer type
    }
    else if (CUSTOMER_TYPE_NAME === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
        $scope.PO_LABEL1 = "AERB Invoice Tax"; // Or whatever label you want for AERB
    }
    else if (CUSTOMER_TYPE_NAME === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
        $scope.PO_LABEL1 = "Medtronic Invoice Tax"; // Label for Medtronic
    }
    else if (CUSTOMER_TYPE_NAME === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
        $scope.PO_LABEL = "Carestream PO"; // Label for Carestream
    }
    else if (CUSTOMER_TYPE_NAME === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
        $scope.PO_LABEL1 = "Mindray Invoice Tax";  // Set the label for Mindray customer type
    }

    $scope.IS_DISABLE = false;

    var editor = CKEDITOR.instances.PAYMENT_TERMS_DETAILS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('PAYMENT_TERMS_DETAILS', {
        uiColor: '#9AB8F3'
    });

    if ($scope.INVOICE_ID === 0) {
        $scope.Admin_Action = "Add Invoice";
        $scope.Action = "Add";
        if ($scope.Customer_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        else {
            $scope.Customer_ID = null;
        }

        if (PARAM.length == 6) {
            GetReferenceNo();

            GetQuotationProductDetails(parseInt($scope.Q_ID))
        }

        $scope.INVOICE_For = 'Accessories';
        $scope.INVOICE_ID = null;
        GetAllCustomerFirm();
        GenerateInvoiceNumber();
        GetAllCustomers();
        GetAllCategory();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        GetAllBanks();
        $("#loader").css("display", 'none');
    }

    else {
        $scope.Admin_Action = "Update Invoice";
        $scope.Action = "Update";
        if ($scope.Customer_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        var getAdmin = InvoiceService.GetForUpdate($scope.INVOICE_ID);
        getAdmin.then(function (response) {
            $scope.InvoiceDetailsList = response.data;
            $scope.INVOICE_For = 'Accessories';
            getForUpdate($scope.InvoiceDetailsList);
        });
    }

    function GetAllBanks() {
        var getAdmin = InvoiceService.GetCompanyDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }

    $scope.DeleteUploadedDocument = function (Doc_Type) {
        $('.btn-no').text("No");
        $('.btn-yes').text("Yes");
        var txt;
        if (confirm("Do you want to Delete the Uploaded Document?")) {
            txt = "Yes";
        } else {
            txt = "No";
        }
        if (txt === "No") {
            return;
        }

        tb_params = {
            DELETE_DOC_FOR: "Invoice",
            RECORD_ID: parseInt($scope.INVOICE_ID),
            DOCUMENT_TYPE: Doc_Type
        }
        var getAdmin = InvoiceService.DeleteUploadedDocument(tb_params);
        getAdmin.then(function (response) {
            if (response.data.success === 1) {
                alert("Document deleted successfully!");
                var getAdmin = InvoiceService.GetForUpdate($scope.INVOICE_ID);

                getAdmin.then(function (response) {
                    $scope.InvoiceDetailsList = response.data;
                    $scope.INVOICE_For = 'Accessories';
                    getForUpdate($scope.InvoiceDetailsList);
                });
                if (Doc_Type === "CHALLAN_IMAGE") {
                    $("#Admin_Addupdate").modal("hide");
                }
                else if (Doc_Type === "INSTALLATION_REPORT") {
                    $("#Admin_AddupdateIR").modal("hide");
                }
            }
            else {
                alert("Error occured while deleting document!");
            }
        },
            function () {
                alert("Error.");

            });
    };

    $scope.DownloadFile = function (fileURL) {
        var downloadUrl = '/InvoiceMaster/DownloadDocument?FilePath=' + encodeURIComponent(fileURL);
        window.location.href = downloadUrl;
    }

    function GenerateInvoiceNumber() {
        tb_params = {
            GenerateNoFor: "Invoice",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var getAdmin = InvoiceService.GenerateInvoiceNumber(tb_params);
        getAdmin.then(function (response) {

            $scope.LatestRecord = response.data;
            $scope.INVOICE_Number = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.INVOICE_DATE = today;
        });
    }

    function GetQuotationProductDetailsMain(PO_NUMBER) {

        if (PO_NUMBER !== "" && PO_NUMBER !== null && PO_NUMBER !== undefined) {
            Get_IM_SparePartsAndAccessories();
            var quot = $scope.PurchaseOrderList.filter(z => z.REF_NO_LIST === PO_NUMBER)[0];
            $scope.Q_ID = parseInt(quot.Quot_ID);

            $("#CAT_ID").prop("disabled", true);
            $("#M_ID").prop("disabled", true);
            $("#P_ID").prop("disabled", true);

            GetQuotationProductDetails($scope.Q_ID);
            /* DeletePartsOnPOChange();*/
        } else {
            /* DeletePartsOnPOChange();*/
            //$scope.CAT_ID = null;
            //$scope.M_ID = null;
            //$scope.P_ID = null;
            //$("#CAT_ID").prop("disabled", false);
            //$("#M_ID").prop("disabled", false);
            //$("#P_ID").prop("disabled", false);
        }
    }

    $scope.GetQuotationProductDetails = function (PO_NUMBER) {
        GetQuotationProductDetailsMain(PO_NUMBER);
    }

    function GetQuotationProductDetails(id) {
        if ($scope.CUSTOMER_TYPE_ID === "5" || $scope.CUSTOMER_TYPE_ID === 5) {
            var getAdmin = InvoiceService.GetProductMindrayQuotDetails(id);
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;
                AddPOProductToCart($scope.ProductQuotList, 5);
            });
            //console.log($scope.AddPayment1);
        }
        else {
            var getAdmin = InvoiceService.GetProductQuotDetails(id);
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;
                AddPOProductToCart($scope.ProductQuotList, 1);
            });
            //console.log($scope.AddPayment1);
        }
    }

    function GetAllCustomers() {

        var getAdmin = InvoiceService.GetAllCustomer($scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.AllCustomerList = response.data;

        });
    }

    $scope.OnCustomerChange = function () {
        if ($scope.Customer_ID === undefined || $scope.Customer_ID === null || $scope.Customer_ID === "") {
            $scope.CustomerFirmList = [];
            $scope.FirmName = '';  // Clear Firm Name
            $scope.F_ID = null;     // Ensure F_ID is cleared as well
        } else {
            // Fetch the firms related to the customer
            GetAllCustomerFirm();
        }
    };



    function GetAllCustomerFirm() {
        var getAdmin = InvoiceService.GetFirmList($scope.Customer_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;

            // Check if there are any firms and set F_ID to the first firm's F_ID
            if ($scope.CustomerFirmList && $scope.CustomerFirmList.length > 0) {
                // Set F_ID to the first firm by default or use another logic if necessary
                $scope.F_ID = $scope.CustomerFirmList[0].F_ID;
                $scope.FirmName = $scope.CustomerFirmList[0].FIRM_NAME; // Set the Firm Name as well
            } else {
                $scope.F_ID = null;  // Clear F_ID if no firms are found
                $scope.FirmName = ''; // Clear Firm Name
            }
        });
    }




    function GetAllCategory() {
        var getAdmin = InvoiceService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }

    $scope.OnCategoryChange = function () {
        if ($scope.CAT_ID === undefined || $scope.CAT_ID === null || $scope.CAT_ID === "") {
            $scope.ManufacturerList = [];
        }
        else {
            GetAllManufacturer();
        }
    };

    function GetAllManufacturer() {
        var getAdmin = InvoiceService.GetManufacturer(parseInt($scope.CAT_ID));
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;
        });
    }

    $scope.OnManufacturerChange = function () {
        if ($scope.M_ID === undefined || $scope.M_ID === null || $scope.M_ID === "") {
            $scope.ProductList = [];
        }
        else {
            GetAllProduct();
        }
    };

    function GetAllProduct() {
        var getAdmin = InvoiceService.GetProduct(parseInt($scope.M_ID));
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
        });
    }

    $scope.OnProductChange = function () {
        if ($scope.P_ID === undefined || $scope.P_ID === null || $scope.P_ID === "") {
            $scope.AccessoriesList = [];
            $scope.SparePartList = [];
        }
        else {
            GetAllAccessories();
            GetAllSparepart();
            GetProductSerialNoList($scope.P_ID, $scope.INVOICE_ID);
        }
    };

    function GetAllAccessories() {
        var getAdmin = InvoiceService.GetAllAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }

    function GetAllSparepart() {
        var getAdmin = InvoiceService.GetAllSparepart(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparePartList = response.data;
        });
    }

    function GetIncludingAllTaxes() {
        var getAdmin = InvoiceService.GetIncludingAllTaxes();
        getAdmin.then(function (response) {
            $scope.IncludingAllTaxesList = response.data;
        });
    }

    function GetGSTPercentage() {
        var getAdmin = InvoiceService.GetGSTPercentage();
        getAdmin.then(function (response) {
            $scope.GSTPercentageList = response.data;
        });
    }

    function GetEmployee() {
        var getAdmin = InvoiceService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }

    function GetReferenceNo() {
        var receiptType = "PurchaseOrder";
        tb_Admin = {
            TYPE: receiptType,
            CUSTOMER_ID: $scope.Customer_ID,
            FIRM_ID: $scope.F_ID
        };

        var getAdmin = InvoiceService.GetReferenceNoByType(tb_Admin);

        getAdmin.then(function (response) {
            $scope.PurchaseOrderList = response.data;

            // Automatically select the first PO or the one matching criteria
            if ($scope.Q_ID) {
                var QuotID = parseInt($scope.Q_ID);
                var PO = $scope.PurchaseOrderList.find(z => z.Quot_ID === QuotID);
                if (PO) {
                    $scope.PO_NUMBER = PO.REF_NO_LIST;
                }
            } else if ($scope.PurchaseOrderList.length > 0) {
                $scope.PO_NUMBER = $scope.PurchaseOrderList[0].REF_NO_LIST; // Auto-select the first PO Number
            }

            // Trigger dependent function if PO_NUMBER is assigned
            if ($scope.PO_NUMBER) {
                $scope.GetQuotationProductDetails($scope.PO_NUMBER);
            }

            console.log($scope.PurchaseOrderList);
        });
    }

    $scope.GetReferenceNo = function () {
        GetReferenceNo();
    }

    function Get_IM_SparePartsAndAccessories() {
        var getAdmin = InvoiceService.Get_IM_SparePartsAndAccessories($scope.Q_ID, $scope.INVOICE_ID);
        getAdmin.then(function (response) {
            $scope.IM_SparePartsAndAccessories = response.data;

            $scope.AddUpdateInvoiceDisable = false;
            for (let i = 0; i < $scope.IM_SparePartsAndAccessories.length; i++) {
                if ($scope.IM_SparePartsAndAccessories[i].SERIAL_NO === "" || $scope.IM_SparePartsAndAccessories[i].SERIAL_NO === null || $scope.IM_SparePartsAndAccessories[i].SERIAL_NO === undefined) {
                    $scope.AddUpdateInvoiceDisable = true;
                }
            }
        });
    };

    $scope.AddPartsButtonClicked = function () {
        $scope.AddPartsAccessories_Action = "Add";
        $scope.AddPartsAccessories();

    };

    $scope.AddPartsAccessories = function () {

        $scope.IsAccessoriesSelected = undefined;
        $scope.IsSparePartSelected = undefined;

        if ($scope.PART_QTY === "" || $scope.PART_QTY === undefined || $scope.PART_QTY === null) {
            alert("Enter valid Part Quantity");
            return;
        }

        if ($scope.PART_PRICE === "" || $scope.PART_PRICE === undefined || $scope.PART_PRICE === null) {
            alert("Enter valid Part Price");
            return;
        }

        if ($scope.INVOICE_For === "Accessories") {
            if ($scope.STD_ID === undefined || $scope.STD_ID === null || $scope.STD_ID === "") {
                $scope.IsAccessoriesSelected = "No";
                return false;
            }
        }
        else if ($scope.INVOICE_For === "SpareParts") {
            if ($scope.SP_ID === undefined || $scope.SP_ID === null || $scope.SP_ID === "") {
                $scope.IsSparePartSelected = "No";
                return false;
            }
        }



        /*$("#loader").css("display", '');*/
        tb_AddPartsAccessories = {
            INVOICE_ID: $scope.INVOICE_ID,
            INVOICE_For: $scope.INVOICE_For,
            STD_ID: $scope.STD_ID,
            SP_ID: $scope.SP_ID,
            PART_QTY: $scope.PART_QTY,
            PART_PRICE: $scope.PART_PRICE,
            HSN_CODE: $scope.PART_HSN_CODE,
            SERIAL_NO: $scope.PART_SERIAL_NO,
            QUOTATION_ID: 0,
            Q_ID: $scope.Q_ID,

        };
        if ($scope.AddPartsAccessories_Action === "Add") {
            AddPartsAccessories(tb_AddPartsAccessories);
        }

    };

    function AddPOProductToCart(ProductQuotList, custTypeId) {
        if (ProductQuotList.length === 0) {
            alert("No Products found against selected PO Number");
            return;
        } else {

            $scope.P_ID = ProductQuotList[0].P_ID;
            $scope.M_ID = ProductQuotList[0].M_ID;
            $scope.CAT_ID = ProductQuotList[0].CAT_ID;
            $scope.HSN_CODE = ProductQuotList[0].HSN_CODE;

            $scope.INVOICE_QTY = ProductQuotList[0].QUANTITY;
            $scope.INVOICE_PRICE = ProductQuotList[0].PRODUCTPRICE;

            GetAllManufacturer();
            GetAllProduct();
            GetAllAccessories();
            GetAllSparepart();
            GetProductSerialNoList($scope.P_ID, $scope.INVOICE_ID);

            if (ProductQuotList[0].QUOTATION_TYPE === "Sales") {

                $scope.IS_INVOICEForSparePart = 0;
            }
            else {
                $scope.IS_INVOICEForSparePart = 1;
            }
            $scope.INVOICE_For = "";

            if (custTypeId === 5) {

                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "Accessories";
                    var accList = ProductQuotList[i].PROBE_PARTLIST;
                    for (let j = 0; j < accList.length; j++) {
                        if (accList[j].STDACC_QUANTITY > 1) {
                            for (let k = 0; k < accList[j].STDACC_QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    STD_ID: accList[j].AccID,
                                    SP_ID: null,
                                    PART_QTY: 1,
                                    PART_PRICE: accList[j].ACCPRICE,
                                    HSN_CODE: accList[j].HSN_CODE,
                                    QUOTATION_ID: accList[j].QUOTATION_ID,
                                    Q_ID: $scope.Q_ID,
                                    SERIAL_NO: null
                                };
                                $scope.QUOTATION_ID = accList[j].QUOTATION_ID;
                                AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                STD_ID: accList[j].AccID,
                                SP_ID: null,
                                PART_QTY: accList[j].PROBE_QUANTITY,
                                PART_PRICE: accList[j].ACCPRICE,
                                HSN_CODE: accList[j].HSN_CODE,
                                QUOTATION_ID: accList[j].QUOTATION_ID,
                                Q_ID: $scope.Q_ID,
                                SERIAL_NO: null
                            };
                            $scope.QUOTATION_ID = accList[j].QUOTATION_ID;
                            AddPartsAccessories(tb_AddPartsAccessories);
                        }

                    }
                }

            }
            else if (custTypeId === 1) {

                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "SpareParts";
                    var spareList = ProductQuotList[i].SPARE_PARTLIST;
                    for (let j = 0; j < spareList.length; j++) {
                        if (spareList[j].SPARE_QUANTITY > 1) {
                            for (let k = 0; k < spareList[j].SPARE_QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    STD_ID: null,
                                    SP_ID: spareList[j].AccID,
                                    PART_QTY: 1,
                                    PART_PRICE: spareList[j].ACCPRICE,
                                    HSN_CODE: spareList[j].HSN_CODE,
                                    QUOTATION_ID: spareList[j].QUOTATION_ID,
                                    Q_ID: $scope.Q_ID,
                                    SERIAL_NO: null
                                };
                                $scope.QUOTATION_ID = spareList[j].QUOTATION_ID,
                                    AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                STD_ID: null,
                                SP_ID: spareList[j].AccID,
                                PART_QTY: spareList[j].SPARE_QUANTITY,
                                PART_PRICE: spareList[j].ACCPRICE,
                                HSN_CODE: spareList[j].HSN_CODE,
                                QUOTATION_ID: spareList[j].QUOTATION_ID,
                                Q_ID: $scope.Q_ID,
                                SERIAL_NO: null
                            };
                            $scope.QUOTATION_ID = spareList[j].QUOTATION_ID,
                                AddPartsAccessories(tb_AddPartsAccessories);
                        }

                    }
                }
                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "Accessories";
                    var accList = ProductQuotList[i].STD_ACC_LIST;
                    for (let j = 0; j < accList.length; j++) {
                        if (accList[j].STDACC_QUANTITY > 1) {
                            for (let k = 0; k < accList[j].STDACC_QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    STD_ID: accList[j].StdAccID,
                                    SP_ID: null,
                                    PART_QTY: 1,
                                    PART_PRICE: 0,
                                    HSN_CODE: accList[j].HSN_CODE,
                                    QUOTATION_ID: accList[j].QUOTATION_ID,
                                    Q_ID: $scope.Q_ID,
                                    SERIAL_NO: null
                                };
                                $scope.QUOTATION_ID = accList[j].QUOTATION_ID;
                                AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                STD_ID: accList[j].StdAccID,
                                SP_ID: null,
                                PART_QTY: accList[j].STDACC_QUANTITY,
                                PART_PRICE: 0,
                                HSN_CODE: accList[j].HSN_CODE,
                                QUOTATION_ID: accList[j].QUOTATION_ID,
                                Q_ID: $scope.Q_ID,
                                SERIAL_NO: null
                            };
                            $scope.QUOTATION_ID = accList[j].QUOTATION_ID;
                            AddPartsAccessories(tb_AddPartsAccessories);
                        }
                    }
                }
            }
        }
    }

    function AddPartsAccessories(tb_AddPartsAccessories) {


        var datalist = InvoiceService.AddPartsAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {

                Get_IM_SparePartsAndAccessories();
            }
            else if (d.data.success === -1) {
                Get_IM_SparePartsAndAccessories();
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

    $scope.SelectProductSerialNo = function () {
        if ($scope.NEW_PSERIAL_NO_ID === "" || $scope.NEW_PSERIAL_NO_ID === null || $scope.NEW_PSERIAL_NO_ID === undefined) {
            $scope.NEW_PSERIAL_NO_ID = "";
            $scope.SERIAL_NO = "";
        }
        else {
            var prod1 = $scope.StockProductSerialNoList.filter(z => z.P_STOCK_ID == $scope.NEW_PSERIAL_NO_ID)[0];
            if (prod1 === undefined || prod1 === null) {
                $scope.NEW_PSERIAL_NO_ID = "";
                $scope.SERIAL_NO = "";
            }
            else {
                $scope.NEW_PSERIAL_NO_ID = prod1.P_STOCK_ID;
                $scope.SERIAL_NO = prod1.P_SERIAL_NO;
            }

        }
    }

    function GetProductSerialNoList(id, invoiceID) {
        var getAdmin = InvoiceService.GetProductSerialNoListById(id, invoiceID);
        getAdmin.then(function (response) {
            $scope.StockProductSerialNoList = response.data;

            if ($scope.StockProductSerialNoList.length > 0) {
                if ($scope.SERIAL_NO === "" || $scope.SERIAL_NO === null || $scope.SERIAL_NO === undefined) {
                    $scope.NEW_PSERIAL_NO_ID = "";
                    $scope.SERIAL_NO = "";
                }
                else {
                    var prod1 = $scope.StockProductSerialNoList.filter(z => z.P_SERIAL_NO == $scope.SERIAL_NO)[0];
                    if (prod1 === undefined || prod1 === null) {
                        $scope.NEW_PSERIAL_NO_ID = "";
                        $scope.SERIAL_NO = "";
                    }
                    else {
                        $scope.NEW_PSERIAL_NO_ID = prod1.P_STOCK_ID;
                        $scope.SERIAL_NO = prod1.P_SERIAL_NO;
                    }
                }
            }

        });
    }

    $scope.EditSerialNo = function (part) {
        $scope.PART_ID = part.SP_ACCESSORIES_ID;
        $scope.NEW_INVOICE_For = part.INVOICE_FOR;
        $scope.NEW_PART_PRICE = part.PART_PRICE;
        $scope.NEW_HSN_CODE = part.HSN_CODE;
        $scope.NEW_SERIAL_NO = part.SERIAL_NO;
        $scope.ID = part.ID;


        var P_STOCK_ID = null;
        if ($scope.NEW_PSERIAL_NO_ID == undefined || $scope.NEW_PSERIAL_NO_ID == "" || $scope.NEW_PSERIAL_NO_ID == null) {
            P_STOCK_ID = null;
        }
        else {
            P_STOCK_ID = parseInt($scope.NEW_PSERIAL_NO_ID)
        }


        if (part.INVOICE_FOR == "Accessories") {

            var INVOICE_ACCESSORIES_ID = $scope.ID;
            var INVOICE_SPAREPART_ID = null;

            GetSerialNoList($scope.PART_ID, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, $scope.INVOICE_ID, P_STOCK_ID, $scope.CUSTOMER_TYPE);
        }
        if (part.INVOICE_FOR == "SpareParts") {
            var INVOICE_ACCESSORIES_ID = null;
            var INVOICE_SPAREPART_ID = $scope.ID;

            GetSerialNoList($scope.PART_ID, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, $scope.INVOICE_ID, P_STOCK_ID, $scope.CUSTOMER_TYPE);
        }


    }

    function GetSerialNoList(id, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE) {
        var getAdmin = InvoiceService.GetPartSerialNoListById(id, INVOICE_ACCESSORIES_ID, INVOICE_SPAREPART_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE);
        getAdmin.then(function (response) {
            $scope.StockPartSerialNoList = response.data;

            if ($scope.StockPartSerialNoList.length > 0) {
                if ($scope.NEW_SERIAL_NO === "" || $scope.NEW_SERIAL_NO === null || $scope.NEW_SERIAL_NO === undefined) {
                    $scope.NEW_SERIAL_NO_ID = "";
                    $scope.NEW_SERIAL_NO = "";
                }
                else {
                    var part1 = $scope.StockPartSerialNoList.filter(z => z.PART_SERIAL_NO == $scope.NEW_SERIAL_NO)[0];
                    if (part1 === undefined || part1 === null) {
                        $scope.NEW_SERIAL_NO_ID = "";
                        $scope.NEW_SERIAL_NO = "";
                    }
                    else {
                        $scope.NEW_SERIAL_NO_ID = part1.SP_STOCK_ID;
                        $scope.NEW_SERIAL_NO = part1.PART_SERIAL_NO;
                    }

                }

            }

        });
    }

    $scope.SelectSerialNo = function () {
        if ($scope.NEW_SERIAL_NO_ID === "" || $scope.NEW_SERIAL_NO_ID === null || $scope.NEW_SERIAL_NO_ID === undefined) {
            $scope.NEW_SERIAL_NO_ID = "";
            $scope.NEW_SERIAL_NO = "";
        }
        else {
            var part1 = $scope.StockPartSerialNoList.filter(z => z.SP_STOCK_ID == $scope.NEW_SERIAL_NO_ID)[0];
            if (part1 === undefined || part1 === null) {
                $scope.NEW_SERIAL_NO_ID = "";
                $scope.NEW_SERIAL_NO = "";
            }
            else {
                $scope.NEW_SERIAL_NO_ID = part1.SP_STOCK_ID;
                $scope.NEW_SERIAL_NO = part1.PART_SERIAL_NO;
            }
        }
    }

    $scope.UpdatePartsAccessories = function () {


        $("#loader").css("display", '');
        tb_AddPartsAccessories = {
            ID: $scope.ID,
            INVOICE_ID: $scope.INVOICE_ID,
            INVOICE_For: $scope.NEW_INVOICE_For,
            PART_PRICE: $scope.NEW_PART_PRICE,
            HSN_CODE: $scope.NEW_HSN_CODE,
            SERIAL_NO: $scope.NEW_SERIAL_NO

        };

        UpdatePartsAccessories(tb_AddPartsAccessories);

    };

    function UpdatePartsAccessories(tb_AddPartsAccessories) {
        var datalist = InvoiceService.UpdatePartsAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                $("#SerialNo_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
                Get_IM_SparePartsAndAccessories();
            }
            else if (d.data.success === -1) {
                alert("Serial No already used.");
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

    $scope.Delete_IM_SparePartsAndAccessories = function (data) {
        Delete_IM_SparePartsAndAccessories(data);
    }

    function Delete_IM_SparePartsAndAccessories(data) {
        var datalist = InvoiceService.Delete_IM_SparePartsAndAccessories(data);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_IM_SparePartsAndAccessories();
            }
            else {
                alert("Error Occured.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });

    }

    function getForUpdate(admin) {
        $scope.Admin_Action = "Update Invoice";
        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.INVOICE_DATE = admin.INVOICE_DATE;
        $scope.INVOICE_Number = admin.INVOICE_NUMBER;
        $scope.DC_Number = admin.DC_NUMBER;
        $scope.PI_Number = admin.PI_NUMBER;
        $("#INVOICE_DATE").val(admin.INVOICE_DATE);
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.CAT_ID = parseInt(admin.CAT_ID);
        $scope.M_ID = parseInt(admin.M_ID);
        $scope.F_ID = parseInt(admin.F_ID);
        $scope.HSN_CODE = admin.HSN_CODE;
        $scope.SERIAL_NO = admin.SERIAL_NO;
        $scope.INVOICE_QTY = parseInt(admin.QUANTITY);
        $scope.BANK_ID = parseInt(admin.BANK_ID);
        $scope.INVOICE_PRICE = parseFloat(admin.PRICE);
        $scope.IS_INVOICEForSparePart = admin.IS_INVOICE_FOR_SPAREPARTS;
        $scope.TOTAL_AMOUNT = parseFloat(admin.TOTAL_AMOUNT);
        $scope.IAT_ID = parseInt(admin.INC_ALL_TAXES);
        $scope.GST_VALUE = admin.GST;
        var getAdmin = InvoiceService.GetGSTPercentage();
        getAdmin.then(function (response) {
            $scope.GSTPercentageList = response.data;
            if ($scope.GST_VALUE === undefined || $scope.GST_VALUE === null || $scope.GST_VALUE === "" || $scope.GST_VALUE === NaN) {
                $scope.GSTP_ID = null;
                $scope.GST_VALUE = null;
            }
            else {
                var gstlist = $scope.GSTPercentageList.filter(z => z.GST_PERC == parseInt($scope.GST_VALUE))[0];
                $scope.GSTP_ID = gstlist.GSTP_ID;
            }
            GetIncludingAllTaxes();
            CalculateTaxAmount();
        });
        $scope.TAX_AMOUNT = parseFloat(admin.TAX_AMOUNT);
        $scope.AMOUNT_INC_TAX = parseFloat(admin.AMOUNT_INC_TAX);
        $scope.OTHER_SERVICES_AMOUNT = parseFloat(admin.OTHER_SERVICES_AMOUNT);
        $scope.EMP_ID = parseInt(admin.EMP_ID);
        $scope.COMMENTS = admin.COMMENTS;
        $scope.ADMIN_REMARK = admin.ADMIN_REMARK;
        $scope.DISPATCHED_THROUGH = admin.DISPATCHED_THROUGH;
        $scope.DESTINATION = admin.DESTINATION;
        $scope.SERIAL_NO_OF_TUBE = admin.SERIAL_NO_OF_TUBE;
        $scope.WARRANTY_IN_DMY = admin.WARRANTY_IN_DMY;
        $scope.WARRANTY_PERIOD = admin.WARRANTY_PERIOD;
        $scope.SOFTWARE_VERSION = admin.SOFTWARE_VERSION;
        $scope.NO_OF_TRANSDUCER = parseInt(admin.NO_OF_TRANSDUCER);
        $scope.PNDT_ACKNOWLEDGEMENT_IMAGE = admin.PNDT_ACKNOWLEDGEMENT_IMAGE;
        $scope.PNDT_CERTIFICATE_IMAGE = admin.PNDT_CERTIFICATE_IMAGE;
        $scope.WARRANTY_FROM = admin.WARRANTY_FROM;
        $("#WARRANTY_FROM").val(admin.WARRANTY_FROM);
        $scope.WARRANTY_TO = admin.WARRANTY_TO;
        $("#WARRANTY_TO").val(admin.WARRANTY_TO);
        $scope.INSTALLATION_DATE = admin.INSTALLATION_DATE;
        $("#INSTALLATION_DATE").val(admin.INSTALLATION_DATE);
        $scope.PO_NUMBER = admin.PO_NUMBER;
        $scope.PO_DATE = admin.PO_DATE;
        $scope.IGST = admin.IGST;
        if ($scope.PO_NUMBER !== "" && $scope.PO_NUMBER !== null && $scope.PO_NUMBER !== undefined) {
            $("#CAT_ID").prop("disabled", true);
            $("#M_ID").prop("disabled", true);
            $("#P_ID").prop("disabled", true);
            GetReferenceNo();
        }
        else {
            $("#CAT_ID").prop("disabled", false);
            $("#M_ID").prop("disabled", false);
            $("#P_ID").prop("disabled", false);
            Get_IM_SparePartsAndAccessories();
        }
        $scope.PNDT_ACK_NO = admin.PNDT_ACK_NO;
        $scope.PNDT_NO = admin.PNDT_NO;
        if (admin.PNDT_ACKNOWLEDGEMENT_IMAGE === null || admin.PNDT_ACKNOWLEDGEMENT_IMAGE === "" || admin.PNDT_ACKNOWLEDGEMENT_IMAGE === undefined) {
            $scope.IS_PDF1 = null;
        }
        else {
            var imageExtension = admin.PNDT_ACKNOWLEDGEMENT_IMAGE.substring(admin.PNDT_ACKNOWLEDGEMENT_IMAGE.lastIndexOf('.') + 1);
            if (imageExtension.toLowerCase() === "pdf") {
                $scope.IS_PDF1 = 1;
            }
            else {
                $scope.IS_PDF1 = 0;
            }
        }
        if (admin.PNDT_CERTIFICATE_IMAGE === null || admin.PNDT_CERTIFICATE_IMAGE === "" || admin.PNDT_CERTIFICATE_IMAGE === undefined) {
            $scope.IS_PDF2 = null;
        }
        else {
            var imageExtension2 = admin.PNDT_CERTIFICATE_IMAGE.substring(admin.PNDT_CERTIFICATE_IMAGE.lastIndexOf('.') + 1);
            if (imageExtension2.toLowerCase() === "pdf") {
                $scope.IS_PDF2 = 1;
            }
            else {
                $scope.IS_PDF2 = 0;
            }
        }

        setTimeout(function () {
            if ($scope.IS_PDF1 === 1) {
                $scope.PreviewPDF1 = $scope.PNDT_ACKNOWLEDGEMENT_IMAGE;
            }
            else {
                $scope.PreviewImage = $scope.PNDT_ACKNOWLEDGEMENT_IMAGE;
            }

            if ($scope.IS_PDF2 === 1) {
                $scope.PreviewPDF2 = $scope.PNDT_CERTIFICATE_IMAGE;
            }
            else {
                $scope.PreviewImage2 = $scope.PNDT_CERTIFICATE_IMAGE;
            }


            $scope.$apply(); //this triggers a $digest
        }, 1000);
        GetAllCustomers();
        GetAllCustomerFirm();
        GetAllCategory();
        GetAllManufacturer();
        GetAllProduct();
        GetEmployee();
        GetAllAccessories();
        GetAllSparepart();
        GetAllBanks();
        //Get_IM_SparePartsAndAccessories();
        GetReferenceNo();
        GetProductSerialNoList($scope.P_ID, $scope.INVOICE_ID);
        $scope.PAYMENT_TERMS_DETAILS = admin.PAYMENT_TERMS_DETAILS;
        var editor = CKEDITOR.instances.PAYMENT_TERMS_DETAILS;
        if (editor) { editor.destroy(true); }
        CKEDITOR.replace('PAYMENT_TERMS_DETAILS', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        CKEDITOR.instances.PAYMENT_TERMS_DETAILS.setData($scope.PAYMENT_TERMS_DETAILS);
        $("#loader").css("display", 'none');
    };

    $scope.AddUpdateAccount = function () {
        $("#loader").css("display", 'none');
        $scope.INVOICE_DATE = $("#INVOICE_DATE").val();
        $scope.WARRANTY_FROM = $("#WARRANTY_FROM").val();
        $scope.PO_DATE = $("#PO_DATE").val();
        $scope.WARRANTY_TO = $("#WARRANTY_TO").val();
        $scope.INSTALLATION_DATE = $("#INSTALLATION_DATE").val();
        if ($scope.INVOICE_DATE === "" || $scope.INVOICE_DATE === undefined || $scope.INVOICE_DATE === null) {
            alert("Please select Invoice Date!");
            return;
        }
        if ($scope.IS_INVOICEForSparePart === "" || $scope.IS_INVOICEForSparePart === undefined || $scope.IS_INVOICEForSparePart === null) {
            alert("Please select Invoice For Spare Part field!");
            return;
        }

        //if ($scope.PO_NUMBER == "") {
        //    alert("Please Add PO Number");
        //    return;
        //}

        //if ($scope.PO_DATE == "") {
        //    alert("Please Add PO Date");
        //    return;
        //}

        let tnc = CKEDITOR.instances.PAYMENT_TERMS_DETAILS.getData();
        if (tnc === "" || tnc === undefined || tnc === null) {
            alert("Please add Payment Terms Details!");
            return;
        }
        if ($scope.Admin_Action === "Add Invoice") {
            $scope.ACTION = "ADD";
            tb_Admin = {
                INVOICE_NUMBER: $scope.INVOICE_Number,
                PI_NUMBER: $scope.PI_Number,
                DC_NUMBER: $scope.DC_Number,
                Customer_ID: parseInt($scope.Customer_ID),
                INVOICE_DATE: $scope.INVOICE_DATE,
                P_ID: parseInt($scope.P_ID),
                F_ID: parseInt($scope.F_ID),
                QUANTITY: parseInt($scope.INVOICE_QTY),
                BANK_ID: parseInt($scope.BANK_ID),
                PRICE: parseFloat($scope.INVOICE_PRICE),
                HSN_CODE: $scope.HSN_CODE,
                SERIAL_NO: $scope.SERIAL_NO,
                IS_INVOICE_FOR_SPAREPARTS: parseInt($scope.IS_INVOICEForSparePart),
                TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
                INC_ALL_TAXES: $scope.IAT_ID,
                GST: parseInt($scope.GSTP_ID),
                TAX_AMOUNT: parseFloat($scope.TAX_AMOUNT),
                AMOUNT_INC_TAX: parseFloat($scope.AMOUNT_INC_TAX),
                OTHER_SERVICES_AMOUNT: parseFloat($scope.OTHER_SERVICES_AMOUNT),
                EMP_ID: parseInt($scope.EMP_ID),
                COMMENTS: $scope.COMMENTS,
                WARRANTY_IN_DMY: $scope.WARRANTY_IN_DMY,
                WARRANTY_PERIOD: $scope.WARRANTY_PERIOD,
                ADMIN_REMARK: $scope.ADMIN_REMARK,
                WARRANTY_FROM: $scope.WARRANTY_FROM,
                WARRANTY_TO: $scope.WARRANTY_TO,
                INSTALLATION_DATE: $scope.INSTALLATION_DATE,
                PO_NUMBER: $scope.PO_NUMBER,
                PNDT_ACK_NO: $scope.PNDT_ACK_NO,
                PNDT_NO: $scope.PNDT_NO,
                DISPATCHED_THROUGH: $scope.DISPATCHED_THROUGH,
                DESTINATION: $scope.DESTINATION,
                SERIAL_NO_OF_TUBE: $scope.SERIAL_NO_OF_TUBE,
                SOFTWARE_VERSION: $scope.SOFTWARE_VERSION,
                NO_OF_TRANSDUCER: parseInt($scope.NO_OF_TRANSDUCER),
                PAYMENT_TERMS_DETAILS: CKEDITOR.instances.PAYMENT_TERMS_DETAILS.getData(),
                PO_DATE: $scope.PO_DATE,
                IGST: $scope.IGST,
                ACTION: $scope.ACTION
            };

            tb_Admin = getImageData(chooseimageFileUploader_AddBanner, tb_Admin, 1);

            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.PNDT_ACKNOWLEDGEMENT_IMAGE = "Yes";
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Image Size Exceeded") {
                alert("Max allowed file size 2MB");
                return;
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Sorry... Invalid File") {
                alert("Invalid File Uploaded");
                return;
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.");
                return;
            }
            else {
                tb_Admin.PNDT_ACKNOWLEDGEMENT_IMAGE = $scope.PNDT_ACKNOWLEDGEMENT_IMAGE;
            }

            tb_Admin = getImageData(chooseimageFileUploader_AddBanner2, tb_Admin, 2);
            if (tb_Admin.IsImageChoosen1 === "Yes") {
                tb_Admin.PNDT_CERTIFICATE_IMAGE = "Yes";
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Image Size Exceeded") {
                alert("Max allowed file size 2MB");
                return;
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Sorry... Invalid File") {
                alert("Invalid File Uploaded");
                return;
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.");
                return;
            }
            else {
                tb_Admin.PNDT_CERTIFICATE_IMAGE = $scope.PNDT_CERTIFICATE_IMAGE;
            }

            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Invoice") {
            $scope.ACTION = "UPDATE";
            tb_Admin = {
                INVOICE_ID: $scope.INVOICE_ID,
                INVOICE_NUMBER: $scope.INVOICE_Number,
                PI_NUMBER: $scope.PI_Number,
                DC_NUMBER: $scope.DC_Number,
                Customer_ID: parseInt($scope.Customer_ID),
                INVOICE_DATE: $scope.INVOICE_DATE,
                P_ID: parseInt($scope.P_ID),
                F_ID: parseInt($scope.F_ID),
                QUANTITY: parseInt($scope.INVOICE_QTY),
                BANK_ID: parseInt($scope.BANK_ID),
                PRICE: parseFloat($scope.INVOICE_PRICE),
                HSN_CODE: $scope.HSN_CODE,
                SERIAL_NO: $scope.SERIAL_NO,
                IS_INVOICE_FOR_SPAREPARTS: parseInt($scope.IS_INVOICEForSparePart),
                TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
                INC_ALL_TAXES: $scope.IAT_ID,
                GST: parseInt($scope.GSTP_ID),
                TAX_AMOUNT: parseFloat($scope.TAX_AMOUNT),
                AMOUNT_INC_TAX: parseFloat($scope.AMOUNT_INC_TAX),
                OTHER_SERVICES_AMOUNT: parseFloat($scope.OTHER_SERVICES_AMOUNT),
                EMP_ID: parseInt($scope.EMP_ID),
                COMMENTS: $scope.COMMENTS,
                WARRANTY_IN_DMY: $scope.WARRANTY_IN_DMY,
                WARRANTY_PERIOD: $scope.WARRANTY_PERIOD,
                ADMIN_REMARK: $scope.ADMIN_REMARK,
                WARRANTY_FROM: $scope.WARRANTY_FROM,
                WARRANTY_TO: $scope.WARRANTY_TO,
                INSTALLATION_DATE: $scope.INSTALLATION_DATE,
                PO_NUMBER: $scope.PO_NUMBER,
                PNDT_ACK_NO: $scope.PNDT_ACK_NO,
                PNDT_NO: $scope.PNDT_NO,
                DISPATCHED_THROUGH: $scope.DISPATCHED_THROUGH,
                DESTINATION: $scope.DESTINATION,
                SERIAL_NO_OF_TUBE: $scope.SERIAL_NO_OF_TUBE,
                SOFTWARE_VERSION: $scope.SOFTWARE_VERSION,
                NO_OF_TRANSDUCER: parseInt($scope.NO_OF_TRANSDUCER),
                PAYMENT_TERMS_DETAILS: CKEDITOR.instances.PAYMENT_TERMS_DETAILS.getData(),
                ACTION: $scope.ACTION,
                IGST: $scope.IGST
            };

            tb_Admin = getImageData(chooseimageFileUploader_AddBanner, tb_Admin, 1);
            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.PNDT_ACKNOWLEDGEMENT_IMAGE = "Yes";
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Image Size Exceeded") {
                alert("Max allowed file size 2MB");
                return;
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Sorry... Invalid File") {
                alert("Invalid File Uploaded");
                return;
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.result === "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.");
                return;
            }
            else {
                tb_Admin.PNDT_ACKNOWLEDGEMENT_IMAGE = $scope.PNDT_ACKNOWLEDGEMENT_IMAGE;
            }

            tb_Admin = getImageData(chooseimageFileUploader_AddBanner2, tb_Admin, 2);
            if (tb_Admin.IsImageChoosen1 === "Yes") {
                tb_Admin.PNDT_CERTIFICATE_IMAGE = "Yes";
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Image Size Exceeded") {
                alert("Max allowed file size 2MB");
                return;
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Sorry... Invalid File") {
                alert("Invalid File Uploaded");
                return;
            }
            else if (tb_Admin.IsImageChoosen1 === "No" && tb_Admin.result1 === "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.");
                return;
            }
            else {
                tb_Admin.PNDT_CERTIFICATE_IMAGE = $scope.PNDT_CERTIFICATE_IMAGE;
            }

            EditAdminRecord(tb_Admin);
        }
    };

    $scope.CalculateTaxAmount = function () {
        CalculateTaxAmount();
    }

    $scope.CalculateTaxAmount = function () {
        var gst = 0;

        // Check GST value
        if ($scope.GSTP_ID === "" || $scope.GSTP_ID === undefined || $scope.GSTP_ID === null) {
            gst = 0;
        } else {
            gst = parseFloat($scope.GSTP_ID);
        }

        // If GST is included in total amount
        if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
            $scope.IS_GST_INCLUDED = true;

            // Calculate actual amount (excluding GST)
            var ACTUAL_AMOUNT = ($scope.TOTAL_AMOUNT / (1 + (gst / 100))).toFixed(2);

            // Tax amount is the difference between total and actual amounts
            $scope.TAX_AMOUNT = (parseFloat($scope.TOTAL_AMOUNT) - parseFloat(ACTUAL_AMOUNT)).toFixed(2);
            $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT; // Amount including tax is the total amount

        } else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
            $scope.IS_GST_INCLUDED = false;

            // If GST is not included, calculate tax based on total amount and GST percentage
            $scope.TAX_AMOUNT = ($scope.TOTAL_AMOUNT * gst) / 100;

            // Amount including tax is total amount plus tax
            $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT + $scope.TAX_AMOUNT;
        }
    }


    $scope.CalculateAmountProduct = function () {
        if ($scope.INVOICE_PRICE === undefined || $scope.INVOICE_PRICE === "" || $scope.INVOICE_PRICE === null) {
            $scope.INVOICE_PRICE = 0;
        }
        if ($scope.INVOICE_QTY === undefined || $scope.INVOICE_QTY === "" || $scope.INVOICE_QTY === null) {
            $scope.INVOICE_QTY = 0;
        }
        $scope.TOTAL_AMOUNT = $scope.INVOICE_PRICE * $scope.INVOICE_QTY;

        CalculateTaxAmount();

    }

    $scope.CalculateAmountSparePart = function () {
        var partList = $scope.IM_SparePartsAndAccessories;
        $scope.Total_Price = 0;
        for (let i in partList) {
            $scope.Total_Price = $scope.Total_Price + (parseFloat(partList[i].PART_PRICE) * parseInt(partList[i].PART_QTY));
        }
        $scope.TOTAL_AMOUNT = $scope.Total_Price;

        CalculateTaxAmount();
    }

    $scope.IsIncludingTax = function () {
        console.log("IAT_ID:", $scope.IAT_ID); // Check the value of IAT_ID
        if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
            $scope.IS_GST_INCLUDED = true;
        }
        else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
            $scope.IS_GST_INCLUDED = false;
        }
        // Call CalculateTaxAmount to update the tax-related fields
        $scope.CalculateTaxAmount();
    };
    function AddAdminRecord(tb_Admin) {
        // Ensure F_ID is part of the data being sent
        tb_Admin.F_ID = $scope.F_ID; // Set F_ID to the selected firm ID

        var datalist = InvoiceService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Invoice added successfully.");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
                }
            }
            else if (d.data.success === false) {
                alert("Invoice already added.");
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
        var datalist = InvoiceService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Invoice updated successfully.");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
                }
            }
            else if (d.data.success === false) {
                alert("Invoice already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function (error) {
                console.log(JSON.stringify(error));
                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    $scope.Cancel = function () {
        if ($scope.PAGE_NAME === "Master") {
            window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
        }

    };

    window.processHTML = function (htmlContent, id) {
        var content = htmlContent.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, function (m) {
            return m.replace(/[\n\t]+/g, "");
        });
        $("#" + id).html(content);
    };

    $scope.PrintChallan = function () {

        if (confirm("Do you want to print Customer Name! Press Ok if Yes and Cancel if No.")) {
            document.getElementById('CustomerName3').style.display = "block";
        } else {
            document.getElementById('CustomerName3').style.display = "none";
        }

        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.ChallanList = response.data;
        });

        var getCompany = InvoiceService.GetCompanyDetails($scope.BANK_ID);
        getCompany.then(function (response) {
            $scope.CmpDetailsList = response.data;
            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS.replace(/â€“/g, "–");

            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
            $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
            $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;
        });
    }

    $scope.PrintInstallationReport = function () {
        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.InvoiceList = response.data;
            $scope.prodList = $scope.InvoiceList.ProductList;
            if ($scope.prodList[0].CAT_ID === 1 || $scope.prodList[0].CAT_ID === "1") {
                $("#InstallationReport2").modal("show");
            }
            else {
                $("#InstallationReport1").modal("show");
            }
        });



        var getCompany = InvoiceService.GetCompanyDetails($scope.BANK_ID);
        getCompany.then(function (response) {
            $scope.CmpDetailsList = response.data;
            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
            $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
            $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;
        });
    }

    function inWords(num) {
        var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
        if (n[5] == 0) {
            str += 'Only';
        }
        else {
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : '';
        }

        return str;
    }

    $scope.PrintProformaInvoice = function () {

        if (confirm("Do you want to print Customer Name! Press Ok if Yes and Cancel if No.")) {
            document.getElementById('CustomerName2').style.display = "block";
        } else {
            document.getElementById('CustomerName2').style.display = "none";
        }

        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.InvoiceList = response.data;

            $scope.COMMENTS = $scope.InvoiceList.COMMENTS;
            window.processHTML($scope.InvoiceList.PAYMENT_TERMS_DETAILS, "TNC");
            $scope.amtInwords1 = inWords(Math.round(($scope.InvoiceList.TAX_AMOUNT)));
            $scope.amtInwords2 = inWords(Math.round(($scope.InvoiceList.AMOUNT_INC_TAX)));
            if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                if ($scope.InvoiceList.GST === null || $scope.InvoiceList.GST === undefined || $scope.InvoiceList.GST === "") {
                    let ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT).toFixed(2);
                    $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
                }
                else {
                    let ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT / (1 + (parseInt($scope.InvoiceList.GST) / 100))).toFixed(2);
                    $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
                }

            }
            else {
                $scope.ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT).toFixed(2);
            }

            var getCompany = InvoiceService.GetCompanyDetails($scope.InvoiceList.BANK_ID);
            getCompany.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
                $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;

                if ($scope.GST_NO == "") {
                    document.getElementById('PGST_NO').style.display = "none";
                }
                else {
                    document.getElementById('PGST_NO').style.display = "block";
                }
            });
        });
    }

    $scope.PrintTaxInvoice = function () {

        if (confirm("Do you want to print Customer Name! Press Ok if Yes and Cancel if No.")) {
            document.getElementById('CustomerName').style.display = "block";
            document.getElementById('CustomerName1').style.display = "block";
        } else {
            document.getElementById('CustomerName').style.display = "none";
            document.getElementById('CustomerName1').style.display = "none";
        }


        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.InvoiceList = response.data;
            $scope.CUSTOMER_GSTIN_NUMBER = $scope.InvoiceList.CUSTOMER_GSTIN_NUMBER;
            if ($scope.CUSTOMER_GSTIN_NUMBER == "") {
                document.getElementById('CUSTOMER_GSTIN_NUMBER').style.display = "none";
            }
            else {
                document.getElementById('CUSTOMER_GSTIN_NUMBER').style.display = "block";
            }
            window.processHTML($scope.InvoiceList.PAYMENT_TERMS_DETAILS, "TNC1");
            $scope.amtInwords1 = inWords(Math.round(($scope.InvoiceList.TAX_AMOUNT)));
            $scope.amtInwords2 = inWords(Math.round(($scope.InvoiceList.AMOUNT_INC_TAX)));
            $scope.TAX_AMOUNT = ($scope.InvoiceList.TAX_AMOUNT).toFixed(2);
            $scope.AMOUNT_INC_TAX = ($scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);
            if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                var ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT / (1 + (parseInt($scope.InvoiceList.GST) / 100))).toFixed(2);

                $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
            }
            else {
                $scope.ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT).toFixed(2);
            }
            console.log($scope.InvoiceList.IS_INVOICE_FOR_SPAREPARTS);
            var getCompany = InvoiceService.GetCompanyDetails($scope.InvoiceList.BANK_ID);
            getCompany.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
                $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;


                if ($scope.GST_NO == "") {
                    document.getElementById('GST_NO').style.display = "none";
                }
                else {
                    document.getElementById('GST_NO').style.display = "block";
                }

            });
        });
    }

    $scope.PrintChallanDetails = function (id) {
        var printHtml = document.getElementById(id).outerHTML;

        // Generate full HTML for the new window
        var elementPage = `
        <html>
            <head>
                <style>
                    @media print {
                        @page {
                            size: A4;
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .page-header {
                            position: fixed;
                            top: 0;
                            width: 100%;
                            height: 50px;
                            background-color: white;
                            z-index: 1;
                        }
                        .print-content {
                            margin-top: 60px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="page-header">
                    <img src={{CmpDetailsList[0].COMPANY_LETTERHEAD}} alt="Header Image">
                </div>
                <div class="print-content">
                    ${printHtml}
                </div>
            </body>
        </html>`;

        // Open a new window and inject the printable content
        var WindowObject = window.open('', '_blank');
        WindowObject.document.write(elementPage);
        WindowObject.document.close();
        setTimeout(function () {
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
        }, 1000);
    };



    $scope.UploadChallan = function () {

        var getChallan = InvoiceService.GetInvoiceDCById($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.ChallanImageList = response.data;
            if ($scope.ChallanImageList !== null || $scope.ChallanImageList !== undefined || $scope.ChallanImageList !== "") {
                $scope.CHALLAN_IMAGE = $scope.ChallanImageList.CHALLAN_IMAGE;

                if ($scope.CHALLAN_IMAGE === null || $scope.CHALLAN_IMAGE === "" || $scope.CHALLAN_IMAGE === undefined) {
                    $scope.IS_PDF3 = null;
                }
                else {
                    var imageExtension = $scope.CHALLAN_IMAGE.substring($scope.CHALLAN_IMAGE.lastIndexOf('.') + 1);
                    if (imageExtension.toLowerCase() === "pdf") {
                        $scope.IS_PDF3 = 1;
                    }
                    else {
                        $scope.IS_PDF3 = 0;
                    }
                }
                setTimeout(function () {
                    if ($scope.IS_PDF3 === 1) {
                        $scope.PreviewPDF3 = $scope.CHALLAN_IMAGE;
                    }
                    else {
                        $scope.PreviewImage3 = $scope.CHALLAN_IMAGE;
                    }

                    $scope.$apply();
                });
            }
            $("#Admin_Addupdate").modal("show");
        });
    }

    $scope.AddImage = function () {

        $("#loader").css("display", '');
        tb_Admin = {
            INVOICE_ID: $scope.INVOICE_ID,
            CHALLAN_IMAGE: $scope.CHALLAN_IMAGE,

        }

        tb_Admin = getImageData(chooseimageFileUploader_AddBanner3, tb_Admin, 3);
        if (tb_Admin.IsImageChoosen2 === "Yes") {
            tb_Admin.CHALLAN_IMAGE = "Yes";
        }
        else {
            tb_Admin.CHALLAN_IMAGE = $scope.CHALLAN_IMAGE;
            if ($scope.CHALLAN_IMAGE == "") {
                alert("Please Select Challan Image/PDF");
                $("#loader").css("display", 'none');
                return;
            }
        }
        EditChallanRecord(tb_Admin);
    };

    function EditChallanRecord(tb_Admin) {
        var datalist = InvoiceService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Challan uploaded successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Challan already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    $scope.UploadIR = function () {

        var getIR = InvoiceService.GetInvoiceIRById($scope.INVOICE_ID);
        getIR.then(function (response) {
            $scope.IRImageList = response.data;
            if ($scope.IRImageList !== null || $scope.IRImageList !== undefined || $scope.IRImageList !== "") {
                $scope.INSTALLATION_REPORT_IMAGE = $scope.IRImageList.INSTALLATION_REPORT_IMAGE;
                if ($scope.INSTALLATION_REPORT_IMAGE === null || $scope.INSTALLATION_REPORT_IMAGE === "" || $scope.INSTALLATION_REPORT_IMAGE === undefined) {
                    $scope.IS_PDF4 = null;
                }
                else {
                    var imageExtension = $scope.INSTALLATION_REPORT_IMAGE.substring($scope.INSTALLATION_REPORT_IMAGE.lastIndexOf('.') + 1);
                    if (imageExtension.toLowerCase() === "pdf") {
                        $scope.IS_PDF4 = 1;
                    }
                    else {
                        $scope.IS_PDF4 = 0;
                    }
                }
                setTimeout(function () {
                    if ($scope.IS_PDF4 === 1) {
                        $scope.PreviewPDF4 = $scope.INSTALLATION_REPORT_IMAGE;
                    }
                    else {
                        $scope.PreviewImage4 = $scope.INSTALLATION_REPORT_IMAGE;
                    }

                    $scope.$apply();
                });
            }
            $("#Admin_AddupdateIR").modal("show");
        });
    }

    $scope.AddIRImage = function () {

        $("#loader").css("display", '');
        tb_Admin = {
            INVOICE_ID: $scope.INVOICE_ID,
            INSTALLATION_REPORT_IMAGE: $scope.INSTALLATION_REPORT_IMAGE,

        }

        tb_Admin = getImageData(chooseimageFileUploader_AddBanner4, tb_Admin, 4);
        if (tb_Admin.IsImageChoosen3 === "Yes") {
            tb_Admin.INSTALLATION_REPORT_IMAGE = "Yes";
        }
        else {
            tb_Admin.INSTALLATION_REPORT_IMAGE = $scope.INSTALLATION_REPORT_IMAGE;
        }
        EditIRRecord(tb_Admin);
    };

    function EditIRRecord(tb_Admin) {
        var datalist = InvoiceService.EditIRAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Installation Report uploaded successfully.");
                $("#Admin_AddupdateIR").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Installation Report already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error.");
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
            history.back();
        }
    }

    ///////////////////////////////// Image Validation ///////////////////////////////////////////////

    var chooseimageFileUploader_AddBanner = $('#chooseimageFileUploader_AddBanner');
    var chooseimageFileUploader_AddBanner2 = $('#chooseimageFileUploader_AddBanner2');
    var chooseimageFileUploader_AddBanner3 = $('#chooseimageFileUploader_AddBanner3');
    var chooseimageFileUploader_AddBanner4 = $('#chooseimageFileUploader_AddBanner4');

    var reader = new FileReader();
    var fileName;
    var contentType;

    var reader2 = new FileReader();
    var fileName2;
    var contentType2;

    var reader3 = new FileReader();
    var fileName3;
    var contentType3;

    var reader4 = new FileReader();
    var fileName4;
    var contentType4;

    chooseimageFileUploader_AddBanner.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 1);
    });
    chooseimageFileUploader_AddBanner2.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 2);
    });
    chooseimageFileUploader_AddBanner3.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 3);
    });

    chooseimageFileUploader_AddBanner4.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 4);
    });

    function ReadUploadedFilesData(fileuploader, id) {
        var file = $(fileuploader[0].files);
        if (parseInt(id) === 1) {

            $scope.PNDT_ACKNOWLEDGEMENT_IMAGE = "";


            //To Check Cancel Button Is Clicked In File Uploader
            if (file.length > 0) {
                //alert("File Selected");

            }
            else {

                setTimeout(function () {
                    $scope.PreviewPDF1 = "";
                    $scope.PreviewImage = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName = file[0].name;
            contentType = file[0].type;
            reader.readAsDataURL(file[0]);
            console.log(contentType.toLowerCase());
            if (contentType.toLowerCase() === "application/pdf") {
                $scope.IS_PDF1 = 1;
            }
            else {
                $scope.IS_PDF1 = 0;
            }
        }
        else if (parseInt(id) === 2) {
            $scope.PNDT_CERTIFICATE_IMAGE = "";

            if (file.length > 0) {

            }
            else {

                setTimeout(function () {
                    $scope.PreviewPDF2 = "";
                    $scope.PreviewImage2 = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage2);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName2 = file[0].name;
            contentType2 = file[0].type;
            reader2.readAsDataURL(file[0]);
            console.log(contentType2.toLowerCase());
            if (contentType2.toLowerCase() === "application/pdf") {
                $scope.IS_PDF2 = 1;
            }
            else {
                $scope.IS_PDF2 = 0;
            }
        }
        else if (parseInt(id) === 3) {
            $scope.CHALLAN_IMAGE = "";


            //To Check Cancel Button Is Clicked In File Uploader
            if (file.length > 0) {
                //alert("File Selected");

            }
            else {

                setTimeout(function () {
                    $scope.PreviewPDF3 = "";
                    $scope.PreviewImage3 = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage3);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName3 = file[0].name;
            contentType3 = file[0].type;
            reader3.readAsDataURL(file[0]);
            console.log(contentType3.toLowerCase());
            if (contentType3.toLowerCase() === "application/pdf") {
                $scope.IS_PDF3 = 1;
            }
            else {
                $scope.IS_PDF3 = 0;
            }

        }
        else if (parseInt(id) === 4) {
            $scope.INSTALLATION_REPORT_IMAGE = "";


            //To Check Cancel Button Is Clicked In File Uploader
            if (file.length > 0) {
                //alert("File Selected");

            }
            else {

                setTimeout(function () {
                    $scope.PreviewPDF4 = "";
                    $scope.PreviewImage4 = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage4);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName4 = file[0].name;
            contentType4 = file[0].type;
            reader4.readAsDataURL(file[0]);
            console.log(contentType4.toLowerCase());
            if (contentType4.toLowerCase() === "application/pdf") {
                $scope.IS_PDF4 = 1;
            }
            else {
                $scope.IS_PDF4 = 0;
            }
        }

    }

    function validateFileReader(fileuploader, id) {
        if (typeof (FileReader) !== "undefined") {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.pdf)$/;

            if (fileuploader.val() === '') {
                return "Please Choose Image First";
            }
            else {
                var file = $(fileuploader[0].files);
                var fileExtension = file[0].name.substr((file[0].name.lastIndexOf('.') + 1));
                var imgName = 'image.' + fileExtension;
                if (regex.test(imgName.toLowerCase())) {

                    if (parseInt(id) === 1) {
                        if ($scope.IsImageEdited === false) {
                            var imageSize = Math.round(file[0].size / 1024);
                            if (imageSize < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String;
                            if (fileExtension === "pdf") {
                                base64String = $scope.PreviewPDF1;
                            }
                            else {
                                base64String = $scope.PreviewImage;
                            }

                            let padding;
                            let inBytes;
                            let base64StringLength;
                            if (base64String.endsWith('==')) { padding = 2; }
                            else if (base64String.endsWith('=')) { padding = 1; }
                            else { padding = 0; }

                            base64StringLength = base64String.length;
                            console.log(base64StringLength);
                            inBytes = (base64StringLength / 4) * 3 - padding;
                            console.log(inBytes);
                            this.kbytes = inBytes / 1000;

                            if (this.kbytes < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }
                        }
                    }
                    else if (parseInt(id) === 2) {
                        if ($scope.IsImageEdited2 === false) {
                            var imageSize = Math.round(file[0].size / 1024);

                            if (imageSize < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String;
                            if (fileExtension === "pdf") {
                                base64String = $scope.PreviewPDF2;
                            }
                            else {
                                base64String = $scope.PreviewImage2;
                            }

                            let padding;
                            let inBytes;
                            let base64StringLength;
                            if (base64String.endsWith('==')) { padding = 2; }
                            else if (base64String.endsWith('=')) { padding = 1; }
                            else { padding = 0; }

                            base64StringLength = base64String.length;
                            console.log(base64StringLength);
                            inBytes = (base64StringLength / 4) * 3 - padding;
                            console.log(inBytes);
                            this.kbytes = inBytes / 1000;

                            if (this.kbytes < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }
                        }
                    }
                    else if (parseInt(id) === 3) {
                        if ($scope.IsImageEdited3 === false) {
                            var imageSize = Math.round(file[0].size / 1024);

                            if (imageSize < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String;
                            if (fileExtension === "pdf") {
                                base64String = $scope.PreviewPDF3;
                            }
                            else {
                                base64String = $scope.PreviewImage3;
                            }


                            let padding;
                            let inBytes;
                            let base64StringLength;
                            if (base64String.endsWith('==')) { padding = 2; }
                            else if (base64String.endsWith('=')) { padding = 1; }
                            else { padding = 0; }

                            base64StringLength = base64String.length;
                            console.log(base64StringLength);
                            inBytes = (base64StringLength / 4) * 3 - padding;
                            console.log(inBytes);
                            this.kbytes = inBytes / 1000;

                            if (this.kbytes < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }
                        }
                    }
                    else if (parseInt(id) === 4) {
                        if ($scope.IsImageEdited4 === false) {
                            var imageSize = Math.round(file[0].size / 1024);

                            if (imageSize < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String;
                            if (fileExtension === "pdf") {
                                base64String = $scope.PreviewPDF4;
                            }
                            else {
                                base64String = $scope.PreviewImage4;
                            }


                            let padding;
                            let inBytes;
                            let base64StringLength;
                            if (base64String.endsWith('==')) { padding = 2; }
                            else if (base64String.endsWith('=')) { padding = 1; }
                            else { padding = 0; }

                            base64StringLength = base64String.length;
                            console.log(base64StringLength);
                            inBytes = (base64StringLength / 4) * 3 - padding;
                            console.log(inBytes);
                            this.kbytes = inBytes / 1000;

                            if (this.kbytes < 2048) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }
                        }
                    }

                } else {
                    return "Sorry... Invalid File";
                }
            }

        } else {
            return "Please Use Another Browser, This Browser is Not Supporting Image Uploader.";
        }
    }

    function getImageData(chooseimageFileUploader, tb_object, id) {
        var result = validateFileReader(chooseimageFileUploader, id);
        var IsImageChoosen = "No";

        if (id === 1) {
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";
                var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
                var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                console.log(imageExtension);
                if (imageExtension.toLowerCase() === ".pdf") {
                    $scope.IS_PDF1 = 1;
                }
                else {
                    $scope.IS_PDF1 = 0;
                }

                if ($scope.IsImageEdited === false) {
                    imageBase64Data = reader.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if (imageExtension.toLowerCase() === ".pdf") {
                        if ($scope.PreviewPDF1 !== undefined && $scope.PreviewPDF1 !== null && $scope.PreviewPDF1 !== "") {
                            imageBase64Data = $scope.PreviewPDF1.split(';')[1].replace("base64,", "");
                        }
                    }
                    else {
                        if ($scope.PreviewImage1 !== undefined && $scope.PreviewImage1 !== null && $scope.PreviewImage1 !== "") {
                            imageBase64Data = $scope.PreviewImage1.split(';')[1].replace("base64,", "");
                        }
                    }

                }
            }

            tb_object.IsImageChoosen = IsImageChoosen;
            tb_object.ImageName = imageName;
            tb_object.ImageExtension = imageExtension;
            tb_object.ImageBase64Data = imageBase64Data;

            tb_object.result = result;

            return tb_object;
        }
        else if (id === 2) {
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";

                var imageName = fileName2.substring(0, fileName2.lastIndexOf('.'));
                var imageExtension = '.' + fileName2.substring(fileName2.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                console.log(imageExtension);
                if (imageExtension.toLowerCase() === ".pdf") {
                    $scope.IS_PDF2 = 1;
                }
                else {
                    $scope.IS_PDF2 = 0;
                }
                if ($scope.IsImageEdited2 === false) {
                    imageBase64Data = reader2.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if (imageExtension.toLowerCase() === ".pdf") {
                        if ($scope.PreviewPDF2 !== undefined && $scope.PreviewPDF2 !== null && $scope.PreviewPDF2 !== "") {
                            imageBase64Data = $scope.PreviewPDF2.split(';')[1].replace("base64,", "");
                        }
                    }
                    else {
                        if ($scope.PreviewImage2 !== undefined && $scope.PreviewImage2 !== null && $scope.PreviewImage2 !== "") {
                            imageBase64Data = $scope.PreviewImage2.split(';')[1].replace("base64,", "");
                        }
                    }


                }
            }
            tb_object.IsImageChoosen1 = IsImageChoosen;
            tb_object.ImageName1 = imageName;
            tb_object.ImageExtension1 = imageExtension;
            tb_object.ImageBase64Data1 = imageBase64Data;

            tb_object.result1 = result;

            return tb_object;
        }
        else if (id === 3) {
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";

                var imageName = fileName3.substring(0, fileName3.lastIndexOf('.'));
                var imageExtension = '.' + fileName3.substring(fileName3.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                if (imageExtension.toLowerCase() === ".pdf") {
                    $scope.IS_PDF3 = 1;
                }
                else {
                    $scope.IS_PDF3 = 0;
                }
                if ($scope.IsImageEdited3 === false) {
                    imageBase64Data = reader3.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if (imageExtension.toLowerCase() === ".pdf") {
                        if ($scope.PreviewPDF3 !== undefined && $scope.PreviewPDF3 !== null && $scope.PreviewPDF3 !== "") {
                            imageBase64Data = $scope.PreviewPDF3.split(';')[1].replace("base64,", "");
                        }
                    }
                    else {
                        if ($scope.PreviewImage3 !== undefined && $scope.PreviewImage3 !== null && $scope.PreviewImage3 !== "") {
                            imageBase64Data = $scope.PreviewImage3.split(';')[1].replace("base64,", "");
                        }
                    }



                }
            }

            tb_object.IsImageChoosen2 = IsImageChoosen;
            tb_object.ImageName2 = imageName;
            tb_object.ImageExtension2 = imageExtension;
            tb_object.ImageBase64Data2 = imageBase64Data;

            tb_object.result2 = result;

            return tb_object;
        }
        else if (id === 4) {
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";

                var imageName = fileName4.substring(0, fileName4.lastIndexOf('.'));
                var imageExtension = '.' + fileName4.substring(fileName4.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                if (imageExtension.toLowerCase() === ".pdf") {
                    $scope.IS_PDF4 = 1;
                }
                else {
                    $scope.IS_PDF4 = 0;
                }
                if ($scope.IsImageEdited4 === false) {
                    imageBase64Data = reader4.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if (imageExtension.toLowerCase() === ".pdf") {
                        if ($scope.PreviewPDF4 !== undefined && $scope.PreviewPDF4 !== null && $scope.PreviewPDF4 !== "") {
                            imageBase64Data = $scope.PreviewPDF4.split(';')[1].replace("base64,", "");
                        }
                    }
                    else {
                        if ($scope.PreviewImage4 !== undefined && $scope.PreviewImage4 !== null && $scope.PreviewImage4 !== "") {
                            imageBase64Data = $scope.PreviewImage4.split(';')[1].replace("base64,", "");
                        }
                    }



                }
            }

            tb_object.IsImageChoosen3 = IsImageChoosen;
            tb_object.ImageName3 = imageName;
            tb_object.ImageExtension3 = imageExtension;
            tb_object.ImageBase64Data3 = imageBase64Data;

            tb_object.result3 = result;

            return tb_object;
        }
    }

    $scope.OpenFileUploader_AddBanner = function (id) {
        if (parseInt(id) === 1) {
            chooseimageFileUploader_AddBanner.click();
        }
        else if (parseInt(id) === 2) {
            chooseimageFileUploader_AddBanner2.click();
        }
        else if (parseInt(id) === 3) {
            chooseimageFileUploader_AddBanner3.click();
        }
        else if (parseInt(id) === 4) {
            chooseimageFileUploader_AddBanner4.click();
        }
    };

    $scope.IsImageEdited = false;
    $scope.IsImageEdited2 = false;
    $scope.IsImageEdited3 = false;
    $scope.IsImageEdited4 = false;

    $scope.SelectFile = function (e, id) {
        //Code To Preview Image
        if (parseInt(id) === 1) {
            var reader = new FileReader();
            reader.onload = function (e1) {

                setTimeout(function () {
                    if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                        $scope.IS_PDF1 = 1;
                        $scope.PreviewImage = "";
                        $scope.PreviewPDF1 = e1.target.result;
                        console.log('Image Selected:' + $scope.PreviewPDF1);
                        $scope.$apply();
                    }
                    else {
                        $scope.IS_PDF1 = 0;
                        $scope.PreviewPDF1 = "";
                        $scope.PreviewImage = e1.target.result;
                        console.log('Image Selected:' + $scope.PreviewImage);
                        $scope.$apply();
                    }


                });
            };
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0].type);
            //Code To Edit Image
            var img = e.target.files[0];
            if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                $scope.IS_PDF1 = 1;
                $scope.IsImageEdited = true;
                $scope.$apply();
            }
            else {
                $scope.IS_PDF1 = 0;
                if (!pixelarity.open(img, false, function (res) {
                    //$("#result").attr("src", res);
                    $scope.PreviewImage = res;

                    //alert($scope.PreviewImage);
                    $scope.IsImageEdited = true;

                    $scope.$apply();
                }, "jpg", 0.7)) {
                    alert("Whoops! That is not an image!");
                }
            }

        }
        else if (parseInt(id) === 2) {
            var reader = new FileReader();
            reader.onload = function (e2) {

                setTimeout(function () {
                    if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                        $scope.IS_PDF2 = 1;
                        $scope.PreviewImage2 = "";
                        $scope.PreviewPDF2 = e2.target.result;
                        console.log('Image Selected:' + $scope.PreviewPDF2);
                        $scope.$apply();
                    }
                    else {
                        $scope.IS_PDF2 = 0;
                        $scope.PreviewPDF2 = "";
                        $scope.PreviewImage2 = e2.target.result;
                        console.log('Image Selected:' + $scope.PreviewImage2);
                        $scope.$apply();
                    }
                });
            };
            reader.readAsDataURL(e.target.files[0]);

            //Code To Edit Image
            var img = e.target.files[0];
            console.log(e.target.files[0].type);
            if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                $scope.IS_PDF2 = 1;

                $scope.IsImageEdited2 = true;
                $scope.$apply();
            }
            else {
                $scope.IS_PDF2 = 0;
                if (!pixelarity.open(img, false, function (res) {
                    //$("#result").attr("src", res);
                    $scope.PreviewImage2 = res;

                    //alert($scope.PreviewImage);
                    $scope.IsImageEdited2 = true;

                    $scope.$apply();
                }, "jpg", 0.7)) {
                    alert("Whoops! That is not an image!");
                }
            }
        }
        else if (parseInt(id) === 3) {
            var reader = new FileReader();
            reader.onload = function (e3) {

                setTimeout(function () {
                    if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                        $scope.IS_PDF3 = 1;
                        $scope.PreviewImage3 = "";
                        $scope.PreviewPDF3 = e3.target.result;
                        console.log('Image Selected:' + $scope.PreviewPDF3);
                        $scope.$apply();
                    }
                    else {
                        $scope.IS_PDF3 = 0;
                        $scope.PreviewPDF3 = "";
                        $scope.PreviewImage3 = e3.target.result;
                        console.log('Image Selected:' + $scope.PreviewImage3);
                        $scope.$apply();
                    }
                });
            };
            reader.readAsDataURL(e.target.files[0]);

            //Code To Edit Image
            var img = e.target.files[0];
            if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                $scope.IS_PDF3 = 1;

                $scope.IsImageEdited3 = true;
                $scope.$apply();
            }
            else {
                $scope.IS_PDF3 = 0;
                if (!pixelarity.open(img, false, function (res) {
                    //$("#result").attr("src", res);
                    $scope.PreviewImage3 = res;

                    //alert($scope.PreviewImage);
                    $scope.IsImageEdited3 = true;

                    $scope.$apply();
                }, "jpg", 0.7)) {
                    alert("Whoops! That is not an image!");
                }
            }
        }
        else if (parseInt(id) === 4) {
            var reader = new FileReader();
            reader.onload = function (e4) {

                setTimeout(function () {
                    if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                        $scope.IS_PDF4 = 1;
                        $scope.PreviewImage4 = "";
                        $scope.PreviewPDF4 = e4.target.result;
                        console.log('Image Selected:' + $scope.PreviewPDF4);
                        $scope.$apply();
                    }
                    else {
                        $scope.IS_PDF4 = 0;
                        $scope.PreviewPDF4 = "";
                        $scope.PreviewImage4 = e4.target.result;
                        console.log('Image Selected:' + $scope.PreviewImage4);
                        $scope.$apply();
                    }
                });
            };
            reader.readAsDataURL(e.target.files[0]);

            //Code To Edit Image
            var img = e.target.files[0];

            if (e.target.files[0].type.toLowerCase() === "application/pdf") {
                $scope.IS_PDF4 = 1;

                $scope.IsImageEdited4 = true;
                $scope.$apply();
            }
            else {
                $scope.IS_PDF4 = 0;
                if (!pixelarity.open(img, false, function (res) {
                    //$("#result").attr("src", res);
                    $scope.PreviewImage4 = res;

                    //alert($scope.PreviewImage);
                    $scope.IsImageEdited4 = true;

                    $scope.$apply();
                }, "jpg", 0.7)) {
                    alert("Whoops! That is not an image!");
                }
            }
        }
    };

});