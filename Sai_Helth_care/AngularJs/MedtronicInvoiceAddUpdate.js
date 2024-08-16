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

    this.GetMedtronicAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/GetMedtronicAccessoriesList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddIMAccessories = function (tb_AddPartsAccessories) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Add_IM_MedtronicAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };

    this.Get_IM_MedtronicAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Get_IM_MedtronicAccessories",
            params: {
                INVOICE_ID: id
            }
        });
        return response;
    };

    this.DeleteIMAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_MedtronicAccessories",
            data: JSON.stringify(data),
            dataType: "json"
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
            url: "/InvoiceMaster/Get_IM_MedtronicAccessories_ForPrint",
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
            method: "POST",
            url: "/Quotation_Registration/GetMedtronicQuotationProductList",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetProductQuotDetails");
    };

    this.GetPartSerialNoListById = function (id, INVOICE_ACCESSORIES_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE) {
        var response = $http({
            method: "GET",
            url: "/InvoiceMaster/GetMedtronicPartSerialNoListById",
            params: {
                id: id,
                INVOICE_ACCESSORIES_ID: INVOICE_ACCESSORIES_ID,
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


app.controller("AddUpdateMedtronicInvoiceCtrl", function ($scope, InvoiceService) {

   
    $scope.Math = window.Math;
    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.Customer_ID = parseInt(PARAM[2].split('=').pop());
    $scope.INVOICE_ID = parseInt(PARAM[3].split('=').pop());

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

    $scope.IS_DISABLE = false;

    var editor = CKEDITOR.instances.PAYMENT_TERMS_DETAILS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('PAYMENT_TERMS_DETAILS', {
        //language: 'fr',
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
        //GetAllSparepart();
        //GetAllAccessories();

        if (PARAM.length == 6) {
            GetReferenceNo();

            GetQuotationProductDetails(parseInt($scope.Q_ID))
        }

        $scope.INVOICE_For = 'Accessories';
        $scope.INVOICE_ID = null;
        GetAllCustomerFirm();
        GenerateInvoiceNumber();
        GetAllCustomers();
        GetAllProduct();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        GetAllBanks();
        Get_IM_MedtronicAccessories();
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
            GetGSTPercentage();
            getForUpdate($scope.InvoiceDetailsList);
        });
    }

    function GetAllBanks() {
        var getAdmin = InvoiceService.GetCompanyDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
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

    function GetAllCustomers() {
        
        var getAdmin = InvoiceService.GetAllCustomer($scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.AllCustomerList = response.data;

        });
    }

    $scope.OnCustomerChange = function () {
        if ($scope.Customer_ID === undefined || $scope.Customer_ID === null || $scope.Customer_ID === "") {
            $scope.CustomerFirmList = [];
        }
        else {
            GetAllCustomerFirm();
        }
    };

    function GetAllCustomerFirm() {
        var getAdmin = InvoiceService.GetFirmList($scope.Customer_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;
        });
    }

    function GetAllProduct() {
        var getAdmin = InvoiceService.GetProduct(3, "New");
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
        });
    }

    $scope.OnProductChange = function () {
        if ($scope.P_ID === undefined || $scope.P_ID === null || $scope.P_ID === "") {
            $scope.AccessoriesList = [];

        }
        else {
            GetAllAccessories();
            GetProductSerialNoList($scope.P_ID, $scope.INVOICE_ID);
        }
    };

    function GetAllAccessories() {
        var getAdmin = InvoiceService.GetMedtronicAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
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

    //***** AddPartsButtonClicked
    function Get_IM_MedtronicAccessories() {
        var getAdmin = InvoiceService.Get_IM_MedtronicAccessories($scope.INVOICE_ID);
        getAdmin.then(function (response) {
            $scope.IM_SparePartsAndAccessories = response.data;

            $scope.AddUpdateInvoiceDisable = false;
            for (let i = 0; i < $scope.IM_SparePartsAndAccessories.length; i++) {
                if ($scope.IM_SparePartsAndAccessories[i].SERIAL_NO === "" || $scope.IM_SparePartsAndAccessories[i].SERIAL_NO === null || $scope.IM_SparePartsAndAccessories[i].SERIAL_NO === undefined) {
                    $scope.AddUpdateInvoiceDisable = true;
                }

            }

            CalculateTaxAmount();
        });
    };

    function DeletePartsOnPOChange() {
        $scope.P_ID = "";
        $scope.HSN_CODE = "";
        $scope.SERIAL_NO = "";
        $scope.INVOICE_QTY = "";
        $scope.INVOICE_PRICE = "";
        $scope.StockProductSerialNoList = "";

        if ($scope.IM_SparePartsAndAccessories.length > 0) {
            for (let i = 0; i < $scope.IM_SparePartsAndAccessories.length; i++) {
                var prod = $scope.IM_SparePartsAndAccessories[i];
                Delete_IM_MedtronicAccessories(prod);
            }
        }
    }

    $scope.AddPartsButtonClicked = function () {
        $scope.AddPartsAccessories_Action = "Add";
        $scope.AddPartsAccessories();
    
    };

    $scope.AddPartsAccessories = function () {

        $scope.IsMainSystemSelected = undefined;
        $scope.IsAttachmentsSelected = undefined;
        $scope.IsToolsSelected = undefined;

        if ($scope.PART_QTY === "" || $scope.PART_QTY === undefined || $scope.PART_QTY === null) {
            alert("Enter valid Part Quantity");
            return;
        }

        if ($scope.PART_PRICE === "" || $scope.PART_PRICE === undefined || $scope.PART_PRICE === null) {
            alert("Enter valid Part Price");
            return;
        }


        if ($scope.INVOICE_For === "MAIN SYSTEM") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsMainSystemSelected = "No";
                return false;
            }
        }
        else if ($scope.INVOICE_For === "ATTACHMENTS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsAttachmentsSelected = "No";
                return false;
            }
        }
        else if ($scope.INVOICE_For === "TOOLS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsToolsSelected = "No";
                return false;
            }
        }


        $("#loader").css("display", '');
        tb_AddPartsAccessories = {
            INVOICE_ID: $scope.INVOICE_ID,
            INVOICE_FOR: $scope.INVOICE_For,
            MED_ACC_ID: $scope.MED_ACC_ID,
            SERIAL_NO: $scope.PART_SERIAL_NO,
            PART_QTY: $scope.PART_QTY,
            PART_PRICE: $scope.PART_PRICE,
            HSN_CODE: $scope.PART_HSN_CODE,
            BATCH_NO: $scope.BATCH_NO,

        };
        if ($scope.AddPartsAccessories_Action === "Add") {
            AddPartsAccessories(tb_AddPartsAccessories);
        }
      
    };

    function GetReferenceNo() {
        var receiptType = "Quotation";
        tb_Admin = {
            TYPE: receiptType,
            CUSTOMER_ID: $scope.Customer_ID,
            FIRM_ID: $scope.F_ID
        }
        var getAdmin = InvoiceService.GetReferenceNoByType(tb_Admin);
        getAdmin.then(function (response) {
            $scope.PurchaseOrderList = response.data;
            if ($scope.Q_ID !== null && $scope.Q_ID !== undefined && $scope.Q_ID !== "") {

                var QuotID = parseInt($scope.Q_ID);
                var PO = $scope.PurchaseOrderList.filter(z => z.Quot_ID == QuotID)[0];
                if (PO !== undefined) {
                    $scope.PO_NUMBER = PO.REF_NO_LIST;
                    if ($scope.PO_NUMBER !== "" && $scope.PO_NUMBER !== null && $scope.PO_NUMBER !== undefined) {
                        $("#P_ID").prop("disabled", true);
                    }
                    else {
                        $scope.P_ID = null;
                        $("#P_ID").prop("disabled", false);
                    }
                }

            }

            //console.log($scope.PurchaseOrderList);
        });
    }

    $scope.GetReferenceNo = function () {
        GetReferenceNo();
    }

    function GetQuotationProductDetailsMain(PO_NUMBER) {
        DeletePartsOnPOChange();
        if (PO_NUMBER !== "" && PO_NUMBER !== null && PO_NUMBER !== undefined) {

            $("#P_ID").prop("disabled", true);

            var quot = $scope.PurchaseOrderList.filter(z => z.REF_NO_LIST === PO_NUMBER)[0];

            GetQuotationProductDetails(parseInt(quot.Quot_ID));
        }
        else {
            $scope.P_ID = null;
            $("#P_ID").prop("disabled", false);
        }
    }

    $scope.GetQuotationProductDetails = function (PO_NUMBER) {
        GetQuotationProductDetailsMain(PO_NUMBER);
    }

    function GetQuotationProductDetails(id) {
        var getAdmin = InvoiceService.GetProductQuotDetails(id);
        getAdmin.then(function (response) {
            $scope.ProductQuotList = response.data;
            AddPOProductToCart($scope.ProductQuotList, 3);
        });
    }

    function AddPOProductToCart(ProductQuotList, custTypeId) {
        if (ProductQuotList.length === 0) {
            alert("No Products found against selected Quotation Number");
            return;
        } else {

            $scope.P_ID = ProductQuotList[0].P_ID;
            //$scope.HSN_CODE = ProductQuotList[0].HSN_CODE;

            $scope.INVOICE_QTY = ProductQuotList[0].QUANTITY;
            $scope.INVOICE_PRICE = ProductQuotList[0].BASIC_PRICE;

            GetAllProduct();
            GetAllAccessories();
            GetProductSerialNoList($scope.P_ID, $scope.INVOICE_ID);

            //if (ProductQuotList[0].QUOTATION_TYPE === "Sales") {

            //    $scope.IS_INVOICEForSparePart = 0;
            //}
            //else {
            //    $scope.IS_INVOICEForSparePart = 1;
            //}
            $scope.INVOICE_For = "";

            if (custTypeId === 3) {

                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "MAIN SYSTEM";
                    var accList = ProductQuotList[i].MedtronicQuotationProductAccessoriesList.filter(z => z.MED_ACCESSORY_TYPE_ID == 1);
                    for (let j = 0; j < accList.length; j++) {
                        if (accList[j].QUANTITY > 1) {
                            for (let k = 0; k < accList[j].QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    MED_ACC_ID: accList[j].MED_ACC_ID,
                                    PART_QTY: 1,
                                    PART_PRICE: accList[j].BASIC_PRICE,
                                    HSN_CODE: accList[j].HSN_CODE,
                                    SERIAL_NO: null,
                                    BATCH_NO: null

                                };
                                AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                MED_ACC_ID: accList[j].MED_ACC_ID,
                                PART_QTY: accList[j].QUANTITY,
                                PART_PRICE: accList[j].BASIC_PRICE,
                                HSN_CODE: accList[j].HSN_CODE,
                                SERIAL_NO: null,
                                BATCH_NO: null

                            };
                            AddPartsAccessories(tb_AddPartsAccessories);
                        }

                    }
                }
                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "ATTACHMENTS";
                    var accList = ProductQuotList[i].MedtronicQuotationProductAccessoriesList.filter(z => z.MED_ACCESSORY_TYPE_ID == 2);
                    for (let j = 0; j < accList.length; j++) {
                        if (accList[j].QUANTITY > 1) {
                            for (let k = 0; k < accList[j].QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    MED_ACC_ID: accList[j].MED_ACC_ID,
                                    PART_QTY: 1,
                                    PART_PRICE: accList[j].BASIC_PRICE,
                                    HSN_CODE: accList[j].HSN_CODE,
                                    SERIAL_NO: null,
                                    BATCH_NO: null

                                };
                                AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                MED_ACC_ID: accList[j].MED_ACC_ID,
                                PART_QTY: accList[j].QUANTITY,
                                PART_PRICE: accList[j].BASIC_PRICE,
                                HSN_CODE: accList[j].HSN_CODE,
                                SERIAL_NO: null,
                                BATCH_NO: null
                            };
                            AddPartsAccessories(tb_AddPartsAccessories);
                        }

                    }
                }
                for (let i = 0; i < ProductQuotList.length; i++) {
                    $scope.INVOICE_For = "TOOLS";
                    var accList = ProductQuotList[i].MedtronicQuotationProductAccessoriesList.filter(z => z.MED_ACCESSORY_TYPE_ID == 3);
                    for (let j = 0; j < accList.length; j++) {
                        if (accList[j].QUANTITY > 1) {
                            for (let k = 0; k < accList[j].QUANTITY; k++) {
                                tb_AddPartsAccessories = {
                                    INVOICE_ID: $scope.INVOICE_ID,
                                    INVOICE_For: $scope.INVOICE_For,
                                    MED_ACC_ID: accList[j].MED_ACC_ID,
                                    PART_QTY: 1,
                                    PART_PRICE: accList[j].BASIC_PRICE,
                                    HSN_CODE: accList[j].HSN_CODE,
                                    SERIAL_NO: null,
                                    BATCH_NO: null

                                };
                                AddPartsAccessories(tb_AddPartsAccessories);
                            }
                        }
                        else {
                            tb_AddPartsAccessories = {
                                INVOICE_ID: $scope.INVOICE_ID,
                                INVOICE_For: $scope.INVOICE_For,
                                MED_ACC_ID: accList[j].MED_ACC_ID,
                                PART_QTY: accList[j].QUANTITY,
                                PART_PRICE: accList[j].BASIC_PRICE,
                                HSN_CODE: accList[j].HSN_CODE,
                                SERIAL_NO: null,
                                BATCH_NO: null
                            };
                            AddPartsAccessories(tb_AddPartsAccessories);
                        }

                    }
                }
            }
        }

    }

    function AddPartsAccessories(tb_AddPartsAccessories) {
        var datalist = InvoiceService.AddIMAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {
               
                Get_IM_MedtronicAccessories();
            }
            else if (d.data.success === -1) {
              
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
        $scope.PART_ID = part.MED_ACC_ID;
        $scope.NEW_INVOICE_For = part.INVOICE_FOR;
        $scope.NEW_PART_PRICE = part.PART_PRICE;
        $scope.NEW_HSN_CODE = part.HSN_CODE;
        $scope.NEW_SERIAL_NO = part.SERIAL_NO;
        $scope.NEW_BATCH_NO = part.BATCH_NO;
        $scope.ID = part.INVOICE_MED_ACC_ID;

        var INVOICE_ACCESSORIES_ID = $scope.ID;

        var P_STOCK_ID = null;
        if ($scope.NEW_PSERIAL_NO_ID == undefined || $scope.NEW_PSERIAL_NO_ID == "" || $scope.NEW_PSERIAL_NO_ID == null) {
            P_STOCK_ID = null;
        }
        else {
            P_STOCK_ID = parseInt($scope.NEW_PSERIAL_NO_ID)
        }

        GetSerialNoList($scope.PART_ID, INVOICE_ACCESSORIES_ID, $scope.INVOICE_ID, P_STOCK_ID, $scope.CUSTOMER_TYPE);


    }

    function GetSerialNoList(id, INVOICE_ACCESSORIES_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE) {
        var getAdmin = InvoiceService.GetPartSerialNoListById(id, INVOICE_ACCESSORIES_ID, invoiceID, P_STOCK_ID, CUSTOMER_TYPE);
        getAdmin.then(function (response) {
            $scope.StockPartSerialNoList = response.data;

            if ($scope.StockPartSerialNoList.length > 0) {
                if ($scope.NEW_SERIAL_NO === "" || $scope.NEW_SERIAL_NO === null || $scope.NEW_SERIAL_NO === undefined) {
                    $scope.NEW_SERIAL_NO_ID = "";
                    $scope.NEW_SERIAL_NO = "";
                    $scope.NEW_BATCH_NO = "";
                }
                else {
                    var part1 = $scope.StockPartSerialNoList.filter(z => z.PART_SERIAL_NO == $scope.NEW_SERIAL_NO)[0];
                    if (part1 === undefined || part1 === null) {
                        $scope.NEW_SERIAL_NO_ID = "";
                        $scope.NEW_SERIAL_NO = "";
                        $scope.NEW_BATCH_NO = "";
                    }
                    else {
                        $scope.NEW_SERIAL_NO_ID = part1.SP_STOCK_ID;
                        $scope.NEW_SERIAL_NO = part1.PART_SERIAL_NO;
                        $scope.NEW_BATCH_NO = part1.BATCH_NO;
                    }

                }

            }

        });
    }

    $scope.SelectSerialNo = function () {
        if ($scope.NEW_SERIAL_NO_ID === "" || $scope.NEW_SERIAL_NO_ID === null || $scope.NEW_SERIAL_NO_ID === undefined) {
            $scope.NEW_SERIAL_NO_ID = "";
            $scope.NEW_SERIAL_NO = "";
            $scope.NEW_BATCH_NO = "";
        }
        else {
            var part1 = $scope.StockPartSerialNoList.filter(z => z.SP_STOCK_ID == $scope.NEW_SERIAL_NO_ID)[0];
            if (part1 === undefined || part1 === null) {
                $scope.NEW_SERIAL_NO_ID = "";
                $scope.NEW_SERIAL_NO = "";
                $scope.NEW_BATCH_NO = "";
            }
            else {
                $scope.NEW_SERIAL_NO_ID = part1.SP_STOCK_ID;
                $scope.NEW_SERIAL_NO = part1.PART_SERIAL_NO;
                $scope.NEW_BATCH_NO = part1.BATCH_NO;
            }
        }
    }

    $scope.UpdatePartsAccessories = function () {

        $scope.EXPIRY_DATE1 = $("#EXPIRY_DATE1").val();
       /* $("#loader").css("display", '');*/
        tb_AddPartsAccessories = {
            ID: $scope.ID,
            INVOICE_ID: $scope.INVOICE_ID,
            INVOICE_For: $scope.NEW_INVOICE_For,
            PART_PRICE: $scope.NEW_PART_PRICE,
            HSN_CODE: $scope.NEW_HSN_CODE,
            BATCH_NO: $scope.NEW_BATCH_NO,
            SERIAL_NO: $scope.NEW_SERIAL_NO,
            EXPIRY_DATE1: $scope.EXPIRY_DATE1,
            MRP1: $scope.MRP1

        };

        UpdatePartsAccessories(tb_AddPartsAccessories);

    };

    function UpdatePartsAccessories(tb_AddPartsAccessories) {
        var datalist = InvoiceService.UpdatePartsAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                $("#SerialNo_Addupdate").modal("hide");
                Get_IM_MedtronicAccessories();
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

    function Delete_IM_MedtronicAccessories(data) {
        //alert(JSON.stringify(data));
        var datalist = InvoiceService.DeleteIMAccessories(data);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_IM_MedtronicAccessories();
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

    $scope.Delete_IM_MedtronicAccessories = function (data) {

        Delete_IM_MedtronicAccessories(data);
    }

    function getForUpdate(admin) {

        //console.log(admin);

        //$scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        $scope.Admin_Action = "Update Invoice";
        //  alert(admin.STATE_ID);
        // $scope._Party = response.data;

        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.INVOICE_DATE = admin.INVOICE_DATE;
        $scope.INVOICE_PO_NUMBER = admin.INVOICE_PO_NUMBER;
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
        $scope.INVOICE_PRICE = parseFloat(admin.PRICE);
        $scope.IS_INVOICEForSparePart = admin.IS_INVOICE_FOR_SPAREPARTS;
        $scope.TOTAL_AMOUNT = parseFloat(admin.TOTAL_AMOUNT);
        $scope.IAT_ID = parseInt(admin.INC_ALL_TAXES);
        $scope.GST_VALUE = parseInt(admin.GST);
        $scope.MRP = parseInt(admin.MRP);
        $scope.EXPIRY_DATE = admin.EXPIRY_DATE;
        $scope.PO_DATE = admin.PO_DATE;
        var getAdmin = InvoiceService.GetGSTPercentage();
        getAdmin.then(function (response) {
            $scope.GSTPercentageList = response.data;

            if ($scope.GST_VALUE === undefined || $scope.GST_VALUE === null || $scope.GST_VALUE === "") {
                $scope.GSTP_ID = null;
                $scope.GST_VALUE = null;
            }
            else {
                var gstlist = $scope.GSTPercentageList.filter(z => z.GST_PERC == $scope.GST_VALUE)[0];
                $scope.GSTP_ID = gstlist.GSTP_ID;
            }
            GetIncludingAllTaxes();
            //GetGSTPercentage();
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
        $scope.BANK_ID = parseInt(admin.BANK_ID);
        $scope.PNDT_ACKNOWLEDGEMENT_IMAGE = admin.PNDT_ACKNOWLEDGEMENT_IMAGE;
        $scope.PNDT_CERTIFICATE_IMAGE = admin.PNDT_CERTIFICATE_IMAGE;
        //$scope.BATCH_NO = admin.BATCH_NO;
        $scope.PO_NUMBER = admin.PO_NUMBER;
        $scope.IGST = admin.IGST;

        if ($scope.PO_NUMBER !== "" && $scope.PO_NUMBER !== null && $scope.PO_NUMBER !== undefined) {
            $("#P_ID").prop("disabled", true);
        }
        else {

            $("#P_ID").prop("disabled", false);
           
        }

        setTimeout(function () {
            $scope.PreviewImage = $scope.PNDT_ACKNOWLEDGEMENT_IMAGE;
            $scope.PreviewImage2 = $scope.PNDT_CERTIFICATE_IMAGE;
            $scope.$apply(); //this triggers a $digest
        });
        GetAllCustomers();
        GetAllCustomerFirm();
        GetAllProduct();
        GetIncludingAllTaxes();
        //GetGSTPercentage();
        GetEmployee();
        GetAllBanks();
        GetAllAccessories();
        Get_IM_MedtronicAccessories();
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
       /* $("#loader").css("display", '');*/
        $scope.INVOICE_DATE = $("#INVOICE_DATE").val();
        $scope.EXPIRY_DATE = $("#EXPIRY_DATE").val();
        $scope.PO_DATE = $("#PO_DATE").val();
        if ($scope.INVOICE_DATE === "" || $scope.INVOICE_DATE === undefined || $scope.INVOICE_DATE === null) {
            alert("Please select Invoice Date!");
            return;
        }
        if ($scope.IS_INVOICEForSparePart === "" || $scope.IS_INVOICEForSparePart === undefined || $scope.IS_INVOICEForSparePart === null) {
            alert("Please select Invoice For Spare Part field!");
            return;
        }
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
                DISPATCHED_THROUGH: $scope.DISPATCHED_THROUGH,
                DESTINATION: $scope.DESTINATION,
                SERIAL_NO_OF_TUBE: $scope.SERIAL_NO_OF_TUBE,
                SOFTWARE_VERSION: $scope.SOFTWARE_VERSION,
                NO_OF_TRANSDUCER: parseInt($scope.NO_OF_TRANSDUCER),
                PAYMENT_TERMS_DETAILS: CKEDITOR.instances.PAYMENT_TERMS_DETAILS.getData(),
                PO_NUMBER: $scope.PO_NUMBER,
                INVOICE_PO_NUMBER: $scope.INVOICE_PO_NUMBER,
                MRP: $scope.MRP,
                PO_DATE: $scope.PO_DATE,
                EXPIRY_DATE: $scope.EXPIRY_DATE,
                IGST: $scope.IGST,
                //BATCH_NO: $scope.BATCH_NO,
                ACTION: $scope.ACTION
            };

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
                DISPATCHED_THROUGH: $scope.DISPATCHED_THROUGH,
                DESTINATION: $scope.DESTINATION,
                SERIAL_NO_OF_TUBE: $scope.SERIAL_NO_OF_TUBE,
                SOFTWARE_VERSION: $scope.SOFTWARE_VERSION,
                NO_OF_TRANSDUCER: parseInt($scope.NO_OF_TRANSDUCER),
                PAYMENT_TERMS_DETAILS: CKEDITOR.instances.PAYMENT_TERMS_DETAILS.getData(),
                PO_NUMBER: $scope.PO_NUMBER,
                //BATCH_NO: $scope.BATCH_NO,
                ACTION: $scope.ACTION,
                MRP: $scope.MRP,
                IGST: $scope.IGST,
                PO_DATE: $scope.PO_DATE,
                EXPIRY_DATE: $scope.EXPIRY_DATE,
                INVOICE_PO_NUMBER: $scope.INVOICE_PO_NUMBER
            };

            EditAdminRecord(tb_Admin);
        }
    };

    $scope.CalculateTaxAmount = function () {
        CalculateTaxAmount();
    }

    function CalculateTaxAmount() {

        if (parseInt($scope.IS_INVOICEForSparePart) === 0) {
            if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
                $scope.GSTP_ID = "";
                $scope.IS_GST_INCLUDED = true;

                $scope.TAX_AMOUNT = 0;
                $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT;


            }
            else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
                $scope.IS_GST_INCLUDED = false;

                var gst = 0;
                if ($scope.GSTP_ID === "" || $scope.GSTP_ID === undefined || $scope.GSTP_ID === null) {
                    gst = 0;
                }
                else {
                    gst = $scope.GSTP_ID;
                }
                $scope.TAX_AMOUNT = ($scope.TOTAL_AMOUNT * gst) / 100;
                $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT + ($scope.TOTAL_AMOUNT * gst) / 100;

            }
        }
        else if (parseInt($scope.IS_INVOICEForSparePart) === 1) {
            if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
                $scope.GSTP_ID = "";
                $scope.IS_GST_INCLUDED = true;

                $scope.TAX_AMOUNT = 0;
                $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT;
            }
            else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
                $scope.IS_GST_INCLUDED = false;

                var gst = 0;

                var partList = $scope.IM_SparePartsAndAccessories;
                $scope.TAX_AMOUNT = 0;
                for (let i in partList) {
                    $scope.TAX_AMOUNT = $scope.TAX_AMOUNT + (parseFloat(partList[i].PART_TAX_AMOUNT));
                }
                $scope.TAX_AMOUNT = $scope.TAX_AMOUNT.toFixed(2);
                $scope.AMOUNT_INC_TAX = (Math.round((parseFloat($scope.TOTAL_AMOUNT) + parseFloat($scope.TAX_AMOUNT)) * 100) / 100).toFixed(2);

            }
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
        var partList=$scope.IM_SparePartsAndAccessories;
        $scope.Total_Price = 0;
        for (let i in partList) {
            $scope.Total_Price = $scope.Total_Price + (parseFloat(partList[i].PART_PRICE) * parseInt(partList[i].PART_QTY));
        }
        $scope.TOTAL_AMOUNT = $scope.Total_Price;

        CalculateTaxAmount();
    }

    $scope.IsIncludingTax = function () {
        if (parseInt($scope.IS_INVOICEForSparePart) === 0) {
            if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
                $scope.GSTP_ID = "";
                $scope.IS_GST_INCLUDED = true;

                $scope.TAX_AMOUNT = 0;
                $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT;
            }
            else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
                $scope.IS_GST_INCLUDED = false;
            }
        }
        else if (parseInt($scope.IS_INVOICEForSparePart) === 1) {
            if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
                $scope.GSTP_ID = "";
                $scope.IS_GST_INCLUDED = true;

                $scope.TAX_AMOUNT = 0;
                $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT;
            }
            else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {
                $scope.IS_GST_INCLUDED = false;
                CalculateTaxAmount();
            }
        }
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = InvoiceService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                //Clear(); //GetRecordbyPaging();
                alert("Invoice added successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
                }
                //window.location.pathname;
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
                //Clear(); //GetRecordbyPaging();
                alert("Invoice updated successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
                }
                //window.location.pathname;
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

    $scope.Cancel = function () {

        //Clear();
        if ($scope.PAGE_NAME === "Master") {
            //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
            window.location.href = "/InvoiceMaster/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=2";
        }

    };

    window.processHTML = function (htmlContent, id) {
        // Process the HTML content here
        // This could involve parsing the HTML, manipulating the DOM, or performing other operations

        // Example: Log the HTML content to the console
        //console.log($("#Description"));
        //console.log($("#Configuration"));
        //console.log(htmlContent);
        var content = htmlContent.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, function (m) {
            return m.replace(/[\n\t]+/g, "");
        });
        // Example: Display the HTML content in an element with id "result"
        $("#" + id).html(content);
    };

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

    $scope.PrintChallan = function () {
        //PrintChallan();
        //function PrintChallan() {
        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.ChallanList = response.data;
            //alert(JSON.stringify($scope.ChallanList) );

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
        //console.log($scope.AddPayment1);

    }

    $scope.getTotalNetAmount = function (products) {
        return (products.reduce(function (total, product) {
            return total + product.PART_TAXABLE_VALUE;
        }, 0)).toFixed(2);
    };

    // Function to calculate total CGST
    $scope.getTotalCGST = function (products) {
        return ($scope.getTotalNetAmount(products) * ((products[0].GST_PERCENTAGE / 2) / 100)).toFixed(2); 
    };

    // Function to calculate total SGST
    $scope.getTotalSGST = function (products) {
        return ($scope.getTotalNetAmount(products) * ((products[0].GST_PERCENTAGE / 2)/100)).toFixed(2);
    };

    $scope.PrintProformaInvoice = function () {

      
        //PrintChallan();
        //function PrintChallan() {
        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.InvoiceList = response.data;
            $scope.GSTIN_NUMBER = $scope.InvoiceList.GSTIN_NUMBER;
            $scope.COMMENTS = $scope.InvoiceList.COMMENTS;
            var groupedItems = {};

            var serialNumberCounter = 1;
            $scope.InvoiceList.ProductList.forEach(function (item) {
                if (!groupedItems[item.INVOICE_FOR]) {
                    groupedItems[item.INVOICE_FOR] = [];
                }
                item.customSerialNumber = serialNumberCounter++;
                groupedItems[item.INVOICE_FOR].push(item);
            });

            // Organize groups in a specific order
            $scope.orderedGroups = [
                { group: 'MAIN SYSTEM', items: groupedItems['MAIN SYSTEM'] || [] },
                { group: 'ATTACHMENTS', items: groupedItems['ATTACHMENTS'] || [] },
                { group: 'TOOLS', items: groupedItems['TOOLS'] || [] }
            ];


            var groupedItemsGST = {};
            $scope.InvoiceList.ProductList.forEach(function (item) {
                if (!groupedItemsGST[item.GST_PERCENTAGE]) {
                    groupedItemsGST[item.GST_PERCENTAGE] = [];
                }
                groupedItemsGST[item.GST_PERCENTAGE].push(item);
            });

            // Get sorted keys
            var sortedKeys = Object.keys(groupedItemsGST).sort();

            // Organize groups in a specific order
            $scope.orderedGroupsGST = sortedKeys.map(function (key) {
                return {
                    GST_PERCENTAGE: key,
                    products: groupedItemsGST[key]
                };
            });


            window.processHTML($scope.InvoiceList.PAYMENT_TERMS_DETAILS, "TNC");
            //$scope.amtInwords1 = inWords(Math.round($scope.InvoiceList.TAX_AMOUNT));
            //$scope.amtInwords2 = inWords(Math.round($scope.InvoiceList.AMOUNT_INC_TAX));

            //$scope.final = Math.round($scope.InvoiceList.AMOUNT_INC_TAX);
            //$scope.roundoff = ($scope.final - $scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);


            //if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
            //    var ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT / (1 + ($scope.InvoiceList.GST) / 100)).toFixed(2);

            //    $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
            //    $scope.AMOUNT_INC_TAX = ACTUAL_AMOUNT - TAX_AMOUNT;
            //}
            //else {
            //    $scope.ACTUAL_AMOUNT = $scope.InvoiceList.TOTAL_AMOUNT;
            //    $scope.AMOUNT_INC_TAX = $scope.InvoiceList.AMOUNT_INC_TAX;
            //}

            var TAX_AMOUNT = $scope.InvoiceList.TAX_AMOUNT;

            if ($scope.InvoiceList.IS_INVOICE_FOR_SPAREPARTS === 0) {

                $scope.amtInwords1 = inWords(Math.round($scope.InvoiceList.TAX_AMOUNT));
                $scope.amtInwords2 = inWords(Math.round($scope.InvoiceList.AMOUNT_INC_TAX));

                $scope.final = Math.round(parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT));
                //$scope.roundoff = (parseFloat($scope.final) - (parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT))).toFixed(2);
                //$scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT)) * 100) / 100).toFixed(2);
                $scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT))) * 100 / 100).toFixed(2);

                if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                    var ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT / (1 + ($scope.InvoiceList.GST) / 100)).toFixed(2);

                    $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
                    $scope.AMOUNT_INC_TAX = ACTUAL_AMOUNT - TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = ($scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);
                }
                else {
                    $scope.ACTUAL_AMOUNT = $scope.InvoiceList.TOTAL_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.InvoiceList.AMOUNT_INC_TAX;
                    $scope.AMOUNT_INC_TAX = ($scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);
                }
            }
            else if ($scope.InvoiceList.IS_INVOICE_FOR_SPAREPARTS === 1) {

                var partlist = $scope.InvoiceList.ProductList;
                $scope.ALL_TAX_AMOUNT = 0;
                $scope.PART_TAXABLE_AMOUNT = 0;
                for (let i in partlist) {
                    $scope.ALL_TAX_AMOUNT = $scope.ALL_TAX_AMOUNT + (parseFloat(partlist[i].PART_TAX_AMOUNT));
                    $scope.PART_TAXABLE_AMOUNT = $scope.PART_TAXABLE_AMOUNT + (parseFloat(partlist[i].PART_TAXABLE_VALUE));
                }

                $scope.final = Math.round(parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT) );
                //$scope.roundoff = (parseFloat($scope.final) - (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT))).toFixed(2);
                //$scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT)) * 100) / 100).toFixed(2);
                $scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT))) * 100 / 100).toFixed(2);

                $scope.ALL_AMOUNT_INC_TAX = (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT)).toFixed(2);

                $scope.amtInwords1 = inWords(Math.round($scope.ALL_TAX_AMOUNT));
                $scope.amtInwords2 = inWords(Math.round($scope.ALL_AMOUNT_INC_TAX));

                if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                    $scope.ACTUAL_AMOUNT = $scope.PART_TAXABLE_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.PART_TAXABLE_AMOUNT + $scope.ALL_TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.AMOUNT_INC_TAX.toFixed(2);
                }
                else {
                    $scope.ACTUAL_AMOUNT = $scope.PART_TAXABLE_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.PART_TAXABLE_AMOUNT + $scope.ALL_TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.AMOUNT_INC_TAX.toFixed(2);
                }


            }


            var getCompany = InvoiceService.GetCompanyDetails($scope.InvoiceList.BANK_ID);
            getCompany.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
                $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;
            });
        });


        //console.log($scope.AddPayment1);



    }

    $scope.PrintTaxInvoice = function () {

        //PrintChallan();
        //function PrintChallan() {

        if (confirm("Do you want to print Customer Name! Press Ok if Yes and Cancel if No.")) {
            document.getElementById('CustomerName').style.display = "block";
        }

        else {
            document.getElementById('CustomerName').style.display = "none";
        }

        var getChallan = InvoiceService.GetForPrintDetails($scope.INVOICE_ID);
        getChallan.then(function (response) {
            $scope.InvoiceList = response.data;

            $scope.GSTIN_NUMBER = $scope.InvoiceList.GSTIN_NUMBER;
            $scope.PO_DATE = $scope.InvoiceList.PO_DATE;
            $scope.GST_NO = $scope.InvoiceList.GST_NO;
            $scope.COMMENTS = $scope.InvoiceList.COMMENTS;

            if ($scope.GSTIN_NUMBER == "") {
                document.getElementById('GSTIN_NO').style.display = "none";
            }
            else {
                document.getElementById('GSTIN_NO').style.display = "block";
            }

            //if ($scope.PO_DATE == "") {
            //    document.getElementById('PO_DATE').style.display = "none";
            //}
            //else {
            //    document.getElementById('PO_DATE').style.display = "block";
            //}

            var groupedItems = {};

            var serialNumberCounter = 1;
            $scope.InvoiceList.ProductList.forEach(function (item) {
                if (!groupedItems[item.INVOICE_FOR]) {
                    groupedItems[item.INVOICE_FOR] = [];
                }
                item.customSerialNumber = serialNumberCounter++;
                groupedItems[item.INVOICE_FOR].push(item);
            });

            // Organize groups in a specific order
            $scope.orderedGroups = [
                { group: 'MAIN SYSTEM', items: groupedItems['MAIN SYSTEM'] || [] },
                { group: 'ATTACHMENTS', items: groupedItems['ATTACHMENTS'] || [] },
                { group: 'TOOLS', items: groupedItems['TOOLS'] || [] }
            ];
            

            var groupedItemsGST = {};
            $scope.InvoiceList.ProductList.forEach(function (item) {
                if (!groupedItemsGST[item.GST_PERCENTAGE]) {
                    groupedItemsGST[item.GST_PERCENTAGE] = [];
                }
                groupedItemsGST[item.GST_PERCENTAGE].push(item);
            });

            // Get sorted keys
            var sortedKeys = Object.keys(groupedItemsGST).sort();

            // Organize groups in a specific order
            $scope.orderedGroupsGST = sortedKeys.map(function (key) {
                return {
                    GST_PERCENTAGE: key,
                    products: groupedItemsGST[key]
                };
            });

            window.processHTML($scope.InvoiceList.PAYMENT_TERMS_DETAILS, "TNC1");
           

            

            var TAX_AMOUNT = $scope.InvoiceList.TAX_AMOUNT;

            if ($scope.InvoiceList.IS_INVOICE_FOR_SPAREPARTS === 0) {

                $scope.amtInwords1 = inWords(Math.round($scope.InvoiceList.TAX_AMOUNT));
                $scope.amtInwords2 = inWords(Math.round($scope.InvoiceList.AMOUNT_INC_TAX));

                $scope.final = Math.round(parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT));
                $scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.InvoiceList.AMOUNT_INC_TAX) + parseFloat($scope.InvoiceList.TAX_AMOUNT))) * 100 / 100).toFixed(2);
               

                if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                    var ACTUAL_AMOUNT = ($scope.InvoiceList.TOTAL_AMOUNT / (1 + ($scope.InvoiceList.GST) / 100)).toFixed(2);

                    $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
                    $scope.AMOUNT_INC_TAX = ACTUAL_AMOUNT - TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = ($scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);
                }
                else {
                    $scope.ACTUAL_AMOUNT = $scope.InvoiceList.TOTAL_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.InvoiceList.AMOUNT_INC_TAX;
                    $scope.AMOUNT_INC_TAX = ($scope.InvoiceList.AMOUNT_INC_TAX).toFixed(2);
                }
            }
            else if ($scope.InvoiceList.IS_INVOICE_FOR_SPAREPARTS === 1) {


                var partlist = $scope.InvoiceList.ProductList;
                $scope.ALL_TAX_AMOUNT = 0;
                $scope.PART_TAXABLE_AMOUNT = 0;
                for (let i in partlist) {
                    $scope.ALL_TAX_AMOUNT = $scope.ALL_TAX_AMOUNT + (parseFloat(partlist[i].PART_TAX_AMOUNT));
                    $scope.PART_TAXABLE_AMOUNT = $scope.PART_TAXABLE_AMOUNT + (parseFloat(partlist[i].PART_TAXABLE_VALUE));
                }

                $scope.final = Math.round(parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT));
                //$scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT)) * 100)/100).toFixed(2);
                $scope.roundoff = ((parseFloat($scope.final) - (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT))) * 100 / 100).toFixed(2);

                $scope.ALL_AMOUNT_INC_TAX = (parseFloat($scope.PART_TAXABLE_AMOUNT) + parseFloat($scope.ALL_TAX_AMOUNT)).toFixed(2);


                $scope.amtInwords1 = inWords(Math.round($scope.ALL_TAX_AMOUNT));
                $scope.amtInwords2 = inWords(Math.round($scope.ALL_AMOUNT_INC_TAX));

                if ($scope.InvoiceList.INC_ALL_TAXES === 1) {
                    $scope.ACTUAL_AMOUNT = $scope.PART_TAXABLE_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.PART_TAXABLE_AMOUNT + $scope.ALL_TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.AMOUNT_INC_TAX.toFixed(2);
                }
                else {
                    $scope.ACTUAL_AMOUNT = $scope.PART_TAXABLE_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.PART_TAXABLE_AMOUNT + $scope.ALL_TAX_AMOUNT;
                    $scope.AMOUNT_INC_TAX = $scope.AMOUNT_INC_TAX.toFixed(2);
                }

               

            }

            //alert(JSON.stringify($scope.ChallanList) );
            

            var getCompany = InvoiceService.GetCompanyDetails($scope.InvoiceList.BANK_ID);
            getCompany.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
                $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;

                if ($scope.GST_NO == "") {
                    document.getElementById('MGST_NO').style.display = "none";
                }
                else {
                    document.getElementById('MGST_NO').style.display = "block";
                }
            });
        });

    }

    $scope.PrintChallanDetails = function (id) {

        var printHtml = document.getElementById(id).outerHTML;
        var currentPage = document.body.innerHTML;
        var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';

        var WindowObject = window.open();
        WindowObject.document.write(elementPage);
        WindowObject.document.close();
        setTimeout(function () {
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
        }, 1000);

        //WindowObject.focus();
        //WindowObject.print();
        //WindowObject.close();

        //window.location.href = window.location.href;
        //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE_NAME + "&CustId=" + CUSTOMER_ID + "&TabId=1";
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    ///////////////////////////////// Image Validation ///////////////////////////////////////////////

    var chooseimageFileUploader_AddBanner = $('#chooseimageFileUploader_AddBanner');
    var chooseimageFileUploader_AddBanner2 = $('#chooseimageFileUploader_AddBanner2');
    //var chooseimageFileUploader_UpdateCategory = $('#chooseimageFileUploader_UpdateCategory');

    var reader = new FileReader();
    var fileName;
    var contentType;
    var reader2 = new FileReader();
    var fileName2;
    var contentType2;

    chooseimageFileUploader_AddBanner.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 1);
    });

    chooseimageFileUploader_AddBanner2.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this), 2);
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
                //Here Cancel Button Is Clicked In File Uploader
                //alert("File Not Selected");
                //$scope.PreviewImage = "";
                //$("#PostImage_img").removeAttr("src").attr("ng-src", "");
                //////$scope.$apply();
                setTimeout(function () {
                    $scope.PreviewImage = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName = file[0].name;
            contentType = file[0].type;
            reader.readAsDataURL(file[0]);
        }
        else {
            $scope.PNDT_CERTIFICATE_IMAGE = "";


            //To Check Cancel Button Is Clicked In File Uploader
            if (file.length > 0) {
                //alert("File Selected");

            }
            else {
                //Here Cancel Button Is Clicked In File Uploader
                //alert("File Not Selected");
                //$scope.PreviewImage = "";
                //$("#PostImage_img").removeAttr("src").attr("ng-src", "");
                //////$scope.$apply();
                setTimeout(function () {
                    $scope.PreviewImage2 = "";
                    console.log('Image Not Selected:' + $scope.PreviewImage2);
                    $scope.$apply(); //this triggers a $digest
                });

            }


            fileName2 = file[0].name;
            contentType2 = file[0].type;
            reader2.readAsDataURL(file[0]);
        }


        //alert("image Details");
        //alert(fileName);
        //alert(JSON.stringify(contentType));


    }

    function validateFileReader(fileuploader, id) {
        if (typeof (FileReader) !== "undefined") {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

            if (fileuploader.val() === '') {
                return "Please Choose Image First";
            }
            else {
                var file = $(fileuploader[0].files);
                var fileExtension = file[0].name.substr((file[0].name.lastIndexOf('.') + 1));
                var imgName = 'image.' + fileExtension;
                if (regex.test(imgName.toLowerCase())) {
                    //if (regex.test(file[0].name.toLowerCase())) {

                    //var imageSize = Math.round(file[0].size / 1024);
                    ////Check Image Size
                    //if (imageSize < 1024) {
                    //    return "SaveImage";
                    //}
                    //else {
                    //    return 'Image Size Exceeded';
                    //}

                    if (parseInt(id) === 1) {
                        if ($scope.IsImageEdited === false) {
                            var imageSize = Math.round(file[0].size / 1024);
                            //Check Image Size
                            //alert("Image Size : " + imageSize);
                            if (imageSize < 2560) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String = $scope.PreviewImage;
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
                            //return this.kbytes;
                            //alert("Edited Image Size : " + this.kbytes);

                            if (this.kbytes < 2560) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }
                        }
                    }
                    else {
                        if ($scope.IsImageEdited2 === false) {
                            var imageSize = Math.round(file[0].size / 1024);
                            //Check Image Size
                            //alert("Image Size : " + imageSize);
                            if (imageSize < 2560) {
                                return "SaveImage";
                            }
                            else {
                                return 'Image Size Exceeded';
                            }

                        }
                        else {
                            let base64String = $scope.PreviewImage2;
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
                            //return this.kbytes;
                            //alert("Edited Image Size : " + this.kbytes);

                            if (this.kbytes < 2560) {
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
                // alert('success Save Image');
                //var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
                //var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
                //var imageBase64Data = reader.result;
                //imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");


                var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
                var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                if ($scope.IsImageEdited === false) {
                    imageBase64Data = reader.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if ($scope.PreviewImage !== undefined && $scope.PreviewImage !== null && $scope.PreviewImage !== "") {
                        imageBase64Data = $scope.PreviewImage.split(';')[1].replace("base64,", "");
                    }

                }
            }
            //else {
            //    alert(result);
            //}

            tb_object.IsImageChoosen = IsImageChoosen;
            tb_object.ImageName = imageName;
            tb_object.ImageExtension = imageExtension;
            tb_object.ImageBase64Data = imageBase64Data;

            tb_object.result = result;

            return tb_object;
        }
        else {
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";
                // alert('success Save Image');
                //var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
                //var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
                //var imageBase64Data = reader.result;
                //imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");


                var imageName = fileName2.substring(0, fileName2.lastIndexOf('.'));
                var imageExtension = '.' + fileName2.substring(fileName2.lastIndexOf('.') + 1);
                var imageBase64Data = "";
                if ($scope.IsImageEdited2 === false) {
                    imageBase64Data = reader2.result;
                    imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
                }
                else {
                    if ($scope.PreviewImage2 !== undefined && $scope.PreviewImage2 !== null && $scope.PreviewImage2 !== "") {
                        imageBase64Data = $scope.PreviewImage2.split(';')[1].replace("base64,", "");
                    }

                }
            }
            //else {
            //    alert(result);
            //}

            tb_object.IsImageChoosen1 = IsImageChoosen;
            tb_object.ImageName1 = imageName;
            tb_object.ImageExtension1 = imageExtension;
            tb_object.ImageBase64Data1 = imageBase64Data;

            tb_object.result1 = result;

            return tb_object;
        }

    }

    $scope.OpenFileUploader_AddBanner = function (id) {
        if (parseInt(id) === 1) {
            chooseimageFileUploader_AddBanner.click();
        }
        else {
            chooseimageFileUploader_AddBanner2.click();
        }

    };

    $scope.IsImageEdited = false;

    $scope.IsImageEdited2 = false;

    $scope.SelectFile = function (e, id) {
        //Code To Preview Image
        if (parseInt(id) === 1) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //$scope.PreviewImage = e.target.result;
                //$scope.$apply();

                setTimeout(function () {
                    $scope.PreviewImage = e.target.result;
                    console.log('Image Selected:' + $scope.PreviewImage);
                    $scope.$apply();
                });
            };
            reader.readAsDataURL(e.target.files[0]);

            //Code To Edit Image
            var img = e.target.files[0];
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
        else {
            var reader = new FileReader();
            reader.onload = function (e) {
                //$scope.PreviewImage = e.target.result;
                //$scope.$apply();

                setTimeout(function () {
                    $scope.PreviewImage2 = e.target.result;
                    console.log('Image Selected:' + $scope.PreviewImage2);
                    $scope.$apply();
                });
            };
            reader.readAsDataURL(e.target.files[0]);

            //Code To Edit Image
            var img = e.target.files[0];
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

    };

    $scope.selectaccs = function (accs) {
        $scope.MED_ACC_ID = accs.MED_ACC_ID; // Update input field with selected product name
        $scope.ACCESSORY_NAME = accs.ACCESSORY_NAME; // Update input field with selected product name
      /*  $scope.PRODUCT_ID = product.PRODUCT_ID; // Store selected product ID in the model*/
        $scope.showOptions = false; // Hide options after selection
    };


});