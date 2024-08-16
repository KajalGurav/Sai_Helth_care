app.service("DeliveryChallanService", function ($http) {



    this.GenerateDCNumber = function (tb_params) {
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

    this.GetMaterial = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetMaterial",
        });
        return response;
    };
    this.GetDCStatus = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetDCStatus",
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
            url: "/Dilivery_Challan/AddPartsAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };

    this.Get_DC_SparePartsAndAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/Get_DC_SparePartsAndAccessories",
            params: {
                DC_ID: id
            }
        });
        return response;
    };

    this.Delete_DC_SparePartsAndAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/Delete_DC_SparePartsAndAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };


    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/AddUpdateDeliveryChallan",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetForUpdate = function (id) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/GetDeliveryChallanForUpdate",
            params: {
                DC_ID: id
            }
        });
        return response;
    };
    this.GetForPrintDetails = function (id) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/GetDeliveryChallanForPrint",
            params: {
                DC_ID: id
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
    this.GetChallanById = function (id) {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetChallanById",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/UpdateChallanImage",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
});


app.controller("AddUpdateDeliveryChallanCtrl", function ($scope, DeliveryChallanService) {

    $("#loader").css("display", 'none');
    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.Customer_ID = parseInt(PARAM[2].split('=').pop());
    $scope.DC_ID = parseInt(PARAM[3].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.Customer_ID;
    var DC_ID = $scope.DC_ID;
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

    if ($scope.DC_ID === 0) {
        $scope.Admin_Action = "Add Challan";
        $scope.Action = "Add";
        if ($scope.Customer_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        

        $scope.DC_For = 'Accessories';
        $scope.DC_ID = null;
        GetAllCustomerFirm();
        GenerateDCNumber();
        GetAllCustomers();
        GetAllCategory();
        GetMaterial();
        GetDCStatus();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        Get_DC_SparePartsAndAccessories();
    }
    else {
        $scope.Admin_Action = "Update Challan";
        $scope.Action = "Update";
        if ($scope.Customer_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        var getAdmin = DeliveryChallanService.GetForUpdate($scope.DC_ID);
        getAdmin.then(function (response) {
            $scope.DeliveryChallanDetailsList = response.data;
            $scope.DC_For = 'Accessories';
            getForUpdate($scope.DeliveryChallanDetailsList);
        });
    }
    function GenerateDCNumber() {
        tb_params = {
            GenerateNoFor: "DeliveryChallan",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var getAdmin = DeliveryChallanService.GenerateDCNumber(tb_params);
        getAdmin.then(function (response) {
            $scope.DC_Number = response.data;
        });
    }
    function GetAllCustomers() {
        
        var getAdmin = DeliveryChallanService.GetAllCustomer($scope.CUSTOMER_TYPE_ID);
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
        var getAdmin = DeliveryChallanService.GetFirmList($scope.Customer_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;
        });
    }

    function GetAllCategory() {
        var getAdmin = DeliveryChallanService.GetCategory();
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
        var getAdmin = DeliveryChallanService.GetManufacturer(parseInt($scope.CAT_ID));
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
        var getAdmin = DeliveryChallanService.GetProduct(parseInt($scope.M_ID));
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
        }
    };


    function GetAllAccessories() {
        var getAdmin = DeliveryChallanService.GetAllAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }

    
    function GetAllSparepart() {
        var getAdmin = DeliveryChallanService.GetAllSparepart(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparePartList = response.data;
        });
    }

    function GetMaterial() {
        var getAdmin = DeliveryChallanService.GetMaterial();
        getAdmin.then(function (response) {
            $scope.MaterialList = response.data;
        });
    }
    function GetDCStatus() {
        var getAdmin = DeliveryChallanService.GetDCStatus();
        getAdmin.then(function (response) {
            $scope.DCStatusList = response.data;
        });
    }
    function GetIncludingAllTaxes() {
        var getAdmin = DeliveryChallanService.GetIncludingAllTaxes();
        getAdmin.then(function (response) {
            $scope.IncludingAllTaxesList = response.data;
        });
    }
    function GetGSTPercentage() {
        var getAdmin = DeliveryChallanService.GetGSTPercentage();
        getAdmin.then(function (response) {
            $scope.GSTPercentageList = response.data;
        });
    }
    function GetEmployee() {
        var getAdmin = DeliveryChallanService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }

    function Get_DC_SparePartsAndAccessories() {
        var getAdmin = DeliveryChallanService.Get_DC_SparePartsAndAccessories($scope.DC_ID);
        getAdmin.then(function (response) {
            $scope.DC_SparePartsAndAccessories = response.data;
           
        });
    };

    $scope.AddPartsButtonClicked = function () {

        if ($scope.DC_For == "SpareParts" && $scope.SP_SERIAL_NO == "") {
            alert("Please Add Serial No");
            return;
        }
        else if ($scope.DC_For == "Accessories" && $scope.ACC_SERIAL_NO == "") {
            alert("Please Add Serial No");
            return;
        }
       
        $scope.AddPartsAccessories_Action = "Add";
        $scope.AddPartsAccessories();

    
    };

  
    $scope.AddPartsAccessories = function () {

        $scope.IsAccessoriesSelected = undefined;
        $scope.IsSparePartSelected = undefined;

        if ($scope.DC_For === "Accessories") {
            if ($scope.STD_ID === undefined || $scope.STD_ID === null || $scope.STD_ID === "") {
                $scope.IsAccessoriesSelected = "No";
                return false;
            }
        }
        else if ($scope.DC_For === "SpareParts") {
            if ($scope.SP_ID === undefined || $scope.SP_ID === null || $scope.SP_ID === "") {
                $scope.IsSparePartSelected = "No";
                return false;
            }
        }



        /*$("#loader").css("display", '');*/
        tb_AddPartsAccessories = {
            DC_ID: $scope.DC_ID,
            DC_For: $scope.DC_For,
            STD_ID: $scope.STD_ID,
            SP_ID: $scope.SP_ID,
            PART_QTY: $scope.PART_QTY,
            PART_PRICE: $scope.PART_PRICE,
            ACC_SPARE_SERIAL_NO: $scope.ACC_SPARE_SERIAL_NO,
            SP_SERIAL_NO: $scope.SP_SERIAL_NO,
            ACC_SERIAL_NO: $scope.ACC_SERIAL_NO,

        };
        if ($scope.AddPartsAccessories_Action === "Add") {
            AddPartsAccessories(tb_AddPartsAccessories);
        }
      
    };


    function AddPartsAccessories(tb_AddPartsAccessories) {


        var datalist = DeliveryChallanService.AddPartsAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {
               
                Get_DC_SparePartsAndAccessories();
                $scope.STD_ID = "";
                $scope.SP_ID = "";
                $scope.SP_SERIAL_NO = "";
                $scope.ACC_SERIAL_NO = "";
                $scope.PART_QTY = "";
                $scope.PART_PRICE = "";
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



    $scope.Delete_DC_SparePartsAndAccessories = function (data) {
        var datalist = DeliveryChallanService.Delete_DC_SparePartsAndAccessories(data);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_DC_SparePartsAndAccessories();
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
        $scope.Admin_Action = "Update Challan";

        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.DC_DATE = admin.DC_DATE;
        $scope.DC_Number = admin.DC_NUMBER;
        $("#DC_DATE").val(admin.DC_DATE);
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.CAT_ID = parseInt(admin.CAT_ID);
        $scope.M_ID = parseInt(admin.M_ID);
        $scope.F_ID = parseInt(admin.F_ID);
        $scope.DC_QTY = parseInt(admin.QUANTITY);
        $scope.DC_PRICE = parseFloat(admin.PRICE);
        $scope.IS_DCForSparePart = admin.IS_DC_FOR_SPAREPARTS;
        $scope.TOTAL_AMOUNT = parseFloat(admin.TOTAL_AMOUNT);
        $scope.IAT_ID = parseInt(admin.INC_ALL_TAXES);
        $scope.GSTP_ID = parseInt(admin.GST);
        $scope.TAX_AMOUNT = parseFloat(admin.TAX_AMOUNT);
        $scope.AMOUNT_INC_TAX = parseFloat(admin.AMOUNT_INC_TAX);
        $scope.MATERIAL_ID = parseInt(admin.MATERIAL_ID);
        $scope.DC_CLOSE_DATE = admin.DC_CLOSE_DATE;
        $("#DC_CLOSE_DATE").val(admin.DC_CLOSE_DATE);
        $scope.DCS_ID = parseInt(admin.DCS_ID);
        $scope.EMP_ID = parseInt(admin.EMP_ID);
        $scope.PRODUCT_SERIAL_NO = admin.PRODUCT_SERIAL_NO;
        $scope.COMMENTS = admin.COMMENTS;
        GetAllCustomers();
        GetAllCustomerFirm();
        GetAllCategory();
        GetAllManufacturer();
        GetAllProduct();
        GetMaterial();
        GetDCStatus();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        GetAllAccessories();
        GetAllSparepart();
        Get_DC_SparePartsAndAccessories();
    };

    $scope.AddUpdateAccount = function () {
        /*$("#loader").css("display", '');*/
        $scope.DC_CLOSE_DATE = $("#DC_CLOSE_DATE").val();
        $scope.DC_DATE = $("#DC_DATE").val();
        if ($scope.Admin_Action === "Add Challan") {
            $scope.ACTION = "ADD";
            tb_Admin = {
                DC_NUMBER: $scope.DC_Number,
                Customer_ID: parseInt($scope.Customer_ID),
                DC_DATE: $scope.DC_DATE,
                P_ID: parseInt($scope.P_ID),
                F_ID: parseInt($scope.F_ID),
                QUANTITY: parseInt($scope.DC_QTY),
                PRICE: parseFloat($scope.DC_PRICE),
                IS_DC_FOR_SPAREPARTS: parseInt($scope.IS_DCForSparePart),
                TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
                INC_ALL_TAXES: $scope.INC_ALL_TAXES,
                GST: parseInt($scope.GSTP_ID),
                TAX_AMOUNT: parseFloat($scope.TAX_AMOUNT),
                AMOUNT_INC_TAX: parseFloat($scope.AMOUNT_INC_TAX),
                MATERIAL_ID: parseInt($scope.MATERIAL_ID),
                DC_CLOSE_DATE: $scope.DC_CLOSE_DATE,
                DCS_ID: parseInt($scope.DCS_ID),
                EMP_ID: parseInt($scope.EMP_ID),
                COMMENTS: $scope.COMMENTS,
                PRODUCT_SERIAL_NO: $scope.PRODUCT_SERIAL_NO,
                ACTION: $scope.ACTION
            };
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Challan") {
            $scope.ACTION = "UPDATE";
            tb_Admin = {
                DC_ID: $scope.DC_ID,
                DC_NUMBER: $scope.DC_Number,
                Customer_ID: parseInt($scope.Customer_ID),
                DC_DATE: $scope.DC_DATE,
                P_ID: parseInt($scope.P_ID),
                F_ID: parseInt($scope.F_ID),
                QUANTITY: parseInt($scope.DC_QTY),
                PRICE: parseFloat($scope.DC_PRICE),
                IS_DC_FOR_SPAREPARTS: parseInt($scope.IS_DCForSparePart),
                TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
                INC_ALL_TAXES: $scope.INC_ALL_TAXES,
                GST: parseInt($scope.GSTP_ID),
                TAX_AMOUNT: parseFloat($scope.TAX_AMOUNT),
                AMOUNT_INC_TAX: parseFloat($scope.AMOUNT_INC_TAX),
                MATERIAL_ID: parseInt($scope.MATERIAL_ID),
                DC_CLOSE_DATE: $scope.DC_CLOSE_DATE,
                DCS_ID: parseInt($scope.DCS_ID),
                EMP_ID: parseInt($scope.EMP_ID),
                COMMENTS: $scope.COMMENTS,
                ACTION: $scope.ACTION
            };
            EditAdminRecord(tb_Admin);
        }
    };

    $scope.CalculateTaxAmount = function () {
        CalculateTaxAmount();
    }

    function CalculateTaxAmount() {

        if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
            $scope.GSTP_ID = "";
            $scope.IS_GST_INCLUDED = true;

            $scope.TAX_AMOUNT = 0 ;
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

    $scope.CalculateAmountProduct = function () {
        if ($scope.DC_PRICE === undefined || $scope.DC_PRICE === "" || $scope.DC_PRICE === null) {
            $scope.DC_PRICE = 0;
        }
        if ($scope.DC_QTY === undefined || $scope.DC_QTY === "" || $scope.DC_QTY === null) {
            $scope.DC_QTY = 0;
        }
        $scope.TOTAL_AMOUNT = $scope.DC_PRICE * $scope.DC_QTY;
        
        CalculateTaxAmount();
        CalculateTotalAmount();
    }
    $scope.CalculateAmountSparePart = function () {
        var partList=$scope.DC_SparePartsAndAccessories;
        $scope.Total_Price = 0;
        for (let i in partList) {
            $scope.Total_Price = $scope.Total_Price + (parseFloat(partList[i].PART_PRICE) * parseInt(partList[i].PART_QTY));
        }
        $scope.TOTAL_AMOUNT1 = $scope.Total_Price;

        CalculateTaxAmount();
        CalculateTotalAmount();
    }

    function CalculateTotalAmount() {
        if ($scope.TOTAL_AMOUNT != undefined && $scope.TOTAL_AMOUNT1 != undefined) {
            $scope.TOTAL_AMOUNT = $scope.TOTAL_AMOUNT + $scope.TOTAL_AMOUNT1;
        }
        else if ($scope.TOTAL_AMOUNT != undefined && $scope.TOTAL_AMOUNT1 == undefined) {
            $scope.TOTAL_AMOUNT = $scope.TOTAL_AMOUNT;
        }
        else if ($scope.TOTAL_AMOUNT == undefined && $scope.TOTAL_AMOUNT1 != undefined) {
            $scope.TOTAL_AMOUNT = $scope.TOTAL_AMOUNT1;
        }

    }

    $scope.IsIncludingTax = function () {
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

    function AddAdminRecord(tb_Admin) {
        var datalist = DeliveryChallanService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Delivery Challan added successfully.");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
                }
            }
            else if (d.data.success === false) {
                alert("Delivery Challan already added.");
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
        var datalist = DeliveryChallanService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Delivery Challan updated successfully.");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
                }
            }
            else if (d.data.success === false) {
                alert("Delivery Challan already added.");
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
        if ($scope.PAGE_NAME === "Master") {
            window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
        }

    };

    $scope.PrintChallan = function () {

        if (confirm("Do you want to print Customer Name! Press Ok if Yes and Cancel if No.")) {
            document.getElementById('CustomerName').style.display = "block";
        } else {
            document.getElementById('CustomerName').style.display = "none";
        }

        var getChallan = DeliveryChallanService.GetForPrintDetails($scope.DC_ID);
        getChallan.then(function (response) {
            $scope.ChallanList = response.data;
        });
            
        var getCompany = DeliveryChallanService.GetCompanyDetails(0);
        getCompany.then(function (response) {
            $scope.CmpDetailsList = response.data;
            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
            $scope.COMPANY_LETTERHEAD = $scope.CmpDetailsList[0].COMPANY_LETTERHEAD;
            $scope.COMPANY_SEAL = $scope.CmpDetailsList[0].COMPANY_SEAL;
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
    }

    $scope.UploadChallan = function () {
       
        var getChallan = DeliveryChallanService.GetChallanById($scope.DC_ID);
        getChallan.then(function (response) {
            $scope.ChallanImageList = response.data;
            if ($scope.ChallanImageList !== null || $scope.ChallanImageList !== undefined || $scope.ChallanImageList !== "") {
                $scope.ADMIN_REMARK = $scope.ChallanImageList.ADMIN_REMARK;
                $scope.CHALLAN_IMAGE = $scope.ChallanImageList.CHALLAN_IMAGE;
                setTimeout(function () {
                    $scope.PreviewImage = $scope.CHALLAN_IMAGE;
                    $scope.$apply(); //this triggers a $digest
                });
            }
            $("#Admin_Addupdate").modal("show");
        });
    }


    $scope.AddImage = function () {

        /*$("#loader").css("display", '');*/
        tb_Admin = {
            DC_ID: $scope.DC_ID, //for update table
            ADMIN_REMARK: $scope.ADMIN_REMARK,
            CHALLAN_IMAGE: $scope.CHALLAN_IMAGE,

        }

        tb_Admin = getImageData(chooseimageFileUploader_AddBanner, tb_Admin);
        if (tb_Admin.IsImageChoosen === "Yes") {
            tb_Admin.CHALLAN_IMAGE = "Yes";
        }
        else {
            tb_Admin.CHALLAN_IMAGE = $scope.CHALLAN_IMAGE;
        }
        EditChallanRecord(tb_Admin);
    };



    function EditChallanRecord(tb_Admin) {
        var datalist = DeliveryChallanService.EditAdmin(tb_Admin);
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



    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


    ///////////////////////////////// Image Validation ///////////////////////////////////////////////


    var chooseimageFileUploader_AddBanner = $('#chooseimageFileUploader_AddBanner');
    var reader = new FileReader();
    var fileName;
    var contentType;

    chooseimageFileUploader_AddBanner.change(function () {
        ReadUploadedFilesData($(this));
    });


    function ReadUploadedFilesData(fileuploader) {
        $scope.CHALLAN_IMAGE = "";
        var file = $(fileuploader[0].files);

        if (file.length > 0) {
        }
        else {
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

    function validateFileReader(fileuploader) {
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
                   
                    if ($scope.IsImageEdited === false) {
                        var imageSize = Math.round(file[0].size / 1024);
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
                        if (this.kbytes < 2560) {
                            return "SaveImage";
                        }
                        else {
                            return 'Image Size Exceeded';
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

    function getImageData(chooseimageFileUploader, tb_object) {
        var result = validateFileReader(chooseimageFileUploader);
        var IsImageChoosen = "No";
        if (result === "SaveImage") {
            IsImageChoosen = "Yes";
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

        tb_object.IsImageChoosen = IsImageChoosen;
        tb_object.ImageName = imageName;
        tb_object.ImageExtension = imageExtension;
        tb_object.ImageBase64Data = imageBase64Data;

        tb_object.result = result;

        return tb_object;
    }


    $scope.OpenFileUploader_AddBanner = function () {

        chooseimageFileUploader_AddBanner.click();
    };


    $scope.IsImageEdited = false;
    $scope.SelectFile = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {

            setTimeout(function () {
                $scope.PreviewImage = e.target.result;
                console.log('Image Selected:' + $scope.PreviewImage);
                $scope.$apply();
            });
        };
        reader.readAsDataURL(e.target.files[0]);
        var img = e.target.files[0];
        if (!pixelarity.open(img, false, function (res) {
            $scope.PreviewImage = res;

            $scope.IsImageEdited = true;

            $scope.$apply();
        }, "jpg", 0.7)) {
            alert("Whoops! That is not an image!");
        }
    };
});