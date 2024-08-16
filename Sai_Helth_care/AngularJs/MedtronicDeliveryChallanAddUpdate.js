app.service("DeliveryChallanService", function ($http) {



    this.GenerateDCNumber = function (tb_params) {
        //var response = $http({
        //    method: "GET",
        //    url: "/Customer_Master/GenerateDCNumber",
        //});
        //return response;
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
        //var response = $http({
        //    method: "GET",
        //    url: "/Customer_Master/GetCustomerList",
        //});
        //return response;
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

    this.AddDCAccessories = function (tb_AddPartsAccessories) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/Add_DC_MedtronicAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };

    this.Get_DC_MedtronicAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/Get_DC_MedtronicAccessories",
            params: {
                DC_ID: id
            }
        });
        return response;
    };

    this.DeleteDCAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/Delete_DC_MedtronicAccessories",
            data: JSON.stringify(data),
            dataType: "json"
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
            url: "/Dilivery_Challan/Get_DC_MedtronicAccessories_ForPrint",
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
        
        //GetAllSparepart();
        //GetAllAccessories();

        $scope.DC_For = 'Accessories';
        $scope.DC_ID = null;
        GetAllCustomerFirm();
        GenerateDCNumber();
        GetAllCustomers();
        GetAllProduct();
        GetMaterial();
        GetDCStatus();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        Get_DC_MedtronicAccessories();
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

    function GetAllProduct() {
        var getAdmin = DeliveryChallanService.GetProduct(3,"New");
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
        }
    };


    function GetAllAccessories() {
        var getAdmin = DeliveryChallanService.GetMedtronicAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
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

    //***** AddPartsButtonClicked
    function Get_DC_MedtronicAccessories() {
        var getAdmin = DeliveryChallanService.Get_DC_MedtronicAccessories($scope.DC_ID);
        getAdmin.then(function (response) {
            $scope.DC_SparePartsAndAccessories = response.data;
           
        });
    };

    $scope.AddPartsButtonClicked = function () {
        $scope.AddPartsAccessories_Action = "Add";
        $scope.AddPartsAccessories();
    
    };

  
    $scope.AddPartsAccessories = function () {

        $scope.IsMainSystemSelected = undefined;
        $scope.IsAttachmentsSelected = undefined;
        $scope.IsToolsSelected = undefined;

        if ($scope.DC_For === "MAIN SYSTEM") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsMainSystemSelected = "No";
                return false;
            }
        }
        else if ($scope.DC_For === "ATTACHMENTS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsAttachmentsSelected = "No";
                return false;
            }
        }
        else if ($scope.DC_For === "TOOLS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsToolsSelected = "No";
                return false;
            }
        }


        $("#loader").css("display", '');
        tb_AddPartsAccessories = {
            DC_ID: $scope.DC_ID,
            DC_For: $scope.DC_For,
            MED_ACC_ID: $scope.MED_ACC_ID,
            SERIAL_NO: $scope.PART_SERIAL_NO,
            PART_QTY: $scope.PART_QTY,
            PART_PRICE: $scope.PART_PRICE,

        };
        if ($scope.AddPartsAccessories_Action === "Add") {
            AddPartsAccessories(tb_AddPartsAccessories);
        }
      
    };


    function AddPartsAccessories(tb_AddPartsAccessories) {


        var datalist = DeliveryChallanService.AddDCAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === 1) {
               
                Get_DC_MedtronicAccessories();
                $scope.PART_QTY = "";
                $scope.PART_PRICE = "";
                $scope.PART_SERIAL_NO = "";
                $scope.MED_ACC_ID = "";
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



    $scope.Delete_DC_MedtronicAccessories = function (data) {

        //alert(JSON.stringify(data));
        var datalist = DeliveryChallanService.DeleteDCAccessories(data);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_DC_MedtronicAccessories();
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

        //console.log(admin);

        //$scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        $scope.Admin_Action = "Update Challan";
        //  alert(admin.STATE_ID);
        // $scope._Party = response.data;


        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.DC_DATE = admin.DC_DATE;
        $scope.DC_Number = admin.DC_NUMBER;
        $("#DC_DATE").val(admin.DC_DATE);
        $scope.P_ID = parseInt(admin.P_ID);
        $scope.F_ID = parseInt(admin.F_ID);
        $scope.DC_QTY = parseInt(admin.QUANTITY);
        $scope.DC_PRICE = parseFloat(admin.PRICE);
        //$scope.IS_DCForSparePart = null;
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
        $scope.COMMENTS = admin.COMMENTS;
        GetAllCustomers();
        GetAllCustomerFirm();
        GetAllProduct();
        GetMaterial();
        GetDCStatus();
        GetIncludingAllTaxes();
        GetGSTPercentage();
        GetEmployee();
        GetAllAccessories();
        Get_DC_MedtronicAccessories();
    };

    $scope.AddUpdateAccount = function () {
        $("#loader").css("display", '');
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
                IS_DC_FOR_SPAREPARTS: null,
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
                IS_DC_FOR_SPAREPARTS: null,
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
        
    }
    $scope.CalculateAmountSparePart = function () {
        var partList=$scope.DC_SparePartsAndAccessories;
        $scope.Total_Price = 0;
        for (let i in partList) {
            $scope.Total_Price = $scope.Total_Price + (parseFloat(partList[i].PART_PRICE) * parseInt(partList[i].PART_QTY));
        }
        $scope.TOTAL_AMOUNT = $scope.Total_Price;

        CalculateTaxAmount();
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
                //Clear(); //GetRecordbyPaging();
                alert("Delivery Challan added successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
                }
                //window.location.pathname;
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
                //Clear(); //GetRecordbyPaging();
                alert("Delivery Challan updated successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
                }
                //window.location.pathname;
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

        //Clear();
        if ($scope.PAGE_NAME === "Master") {
            //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
            window.location.href = "/Dilivery_Challan/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=3";
        }

    };

    $scope.PrintChallan = function () {
        //PrintChallan();
        //function PrintChallan() {
        var getChallan = DeliveryChallanService.GetForPrintDetails($scope.DC_ID);
        getChallan.then(function (response) {
            $scope.ChallanList = response.data;
            //alert(JSON.stringify($scope.ChallanList) );

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
            //console.log($scope.AddPayment1);
            
       

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
        //window.location.href = window.location.href;
        //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE_NAME + "&CustId=" + CUSTOMER_ID + "&TabId=1";
    }

    $scope.UploadChallan = function () {
       
        var getChallan = DeliveryChallanService.GetChallanById($scope.DC_ID);
        getChallan.then(function (response) {
            $scope.ChallanImageList = response.data;
            //alert(JSON.stringify($scope.ChallanList) );
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

        $("#loader").css("display", '');
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
            //alert($scope.IMAGE_URL);
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
    //var chooseimageFileUploader_UpdateCategory = $('#chooseimageFileUploader_UpdateCategory');

    var reader = new FileReader();
    var fileName;
    var contentType;

    chooseimageFileUploader_AddBanner.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this));
    });
    //});

    //chooseimageFileUploader_AddCategory.change(function () {
    //    //alert("Image Changed");
    //    ReadUploadedFilesData($(this));
    //});


    function ReadUploadedFilesData(fileuploader) {
        $scope.CHALLAN_IMAGE = "";
        var file = $(fileuploader[0].files);

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

        //alert("image Details");
        //alert(fileName);
        //alert(JSON.stringify(contentType));


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
                    //if (regex.test(file[0].name.toLowerCase())) {

                    //var imageSize = Math.round(file[0].size / 1024);
                    ////Check Image Size
                    //if (imageSize < 1024) {
                    //    return "SaveImage";
                    //}
                    //else {
                    //    return 'Image Size Exceeded';
                    //}


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


    $scope.OpenFileUploader_AddBanner = function () {

        chooseimageFileUploader_AddBanner.click();
    };


    $scope.IsImageEdited = false;
    $scope.SelectFile = function (e) {
        //Code To Preview Image
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

    };



});