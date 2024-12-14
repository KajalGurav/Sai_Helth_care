app.service("CustomerServiceCallService", function ($http) {

    this.GenerateServiceCallNumber = function (tb_params) {
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

    this.GetCustomer = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCustomer",
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

    this.GetSelectedProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/SparePart/GetSelectedProduct",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetMedtronicProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetProduct",
            params: {
                productTypeID: id,
                Type: "Medtronic"
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

    this.GetPriorityList = function () {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetPriorityList"
        });
        return response;
    };
    this.GetContractTypeList = function () {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetContractTypeList"
        });
        return response;
    };
    this.GetServiceTypeList = function () {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetServiceTypeList"
        });
        return response;
    };

    this.GetEmployee = function () {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetEmployee",
        });
        return response;
    };

    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/AddUpdateServiceCallRequestAssign",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetForUpdate = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/GetServiceCallRequestAssignForUpdate",
            params: {
                serviceCallID: id
            }
        });
        return response;
    };

    this.GetCallStatusList = function (SearchingConditions) {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetCallStatusList"
        });
        return response;
    };

    this.GetCompanyBankDetails = function () {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: 0
            }
        });
        return response;
    };
    this.getAmcDetail = function (id) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/getAmcDetail",
            params: {
                id: id
            }
        });
        return response;
    };
});


app.controller("CustomerServiceCallCtrl", function ($scope, CustomerServiceCallService) {

    $("#loader").css("display", 'none');

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    $scope.SERVICE_CALL_ID = parseInt(PARAM[3].split('=').pop());
    $scope.P_ID = parseInt(PARAM[4].split('=').pop());
    $scope.AmcCmcId = parseInt(PARAM[5].split('=').pop());
    $scope.EnqId = parseInt(PARAM[6].split('=').pop());

    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    var M_ID;
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
    console.log($scope.AddServiceCall);
   

    if ($scope.AmcCmcId != 0) {
        GetAmcDetails();
        function GetAmcDetails() {
            var getAdmin = CustomerServiceCallService.getAmcDetail($scope.AmcCmcId);
            getAdmin.then(function (response) {
                $scope.AmcDetailList = response.data;

                $scope.CUSTOMER_ID = $scope.AmcDetailList[0].CUSTOMER_ID;
                $scope.OnCustomerChange();
                $scope.F_ID = $scope.AmcDetailList[0].FIRM_ID;
                $scope.CAT_ID = $scope.AmcDetailList[0].CAT_ID;
                $scope.OnCategoryChange();
                $scope.P_ID = $scope.AmcDetailList[0].MODEL_ID;
                GetSelectedProduct();


            });
        }
    }

    if ($scope.CUSTOMER_TYPE_ID == 3) {
        GetAllProduct();
    }
    else {
        GetSelectedProduct();
    }
    function GetSelectedProduct() {
        var getAdmin = CustomerServiceCallService.GetSelectedProduct(parseInt($scope.P_ID));
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
             M_ID = $scope.ProductList[0].M_ID;
            $scope.CAT_ID = $scope.ProductList[0].CAT_ID;
            $scope.OnCategoryChange();
           /* $scope.OnManufacturerChange();*/

        });
    }

    if ($scope.SERVICE_CALL_ID === 0) {
        $scope.Admin_Action = "Add Service Call";
        $scope.Action = "Add";
       /* $scope.CUSTOMER_ID = null;*/
        if ($scope.CUSTOMER_ID !== 0 && $scope.CUSTOMER_ID !== null) {
           
            $scope.IS_DISABLE = true;
        }

        $scope.SERVICE_CALL_ID = null;
        GetAllCustomers();
        //GetAllCustomerFirm();
        GenerateServiceCallNumber();
        GetEmployee();
        GetPriorityList();
        GetCallStatusList();
        GetContractTypeList();
        GetServiceTypeList();

        if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            GetAllProduct();
        }
        else {
            GetAllCategory();
        }
        GetAllBanks();
        
    }

    else {
        $scope.Admin_Action = "Update Service Call";
        $scope.Action = "Update";
        if ($scope.CUSTOMER_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        var getAdmin = CustomerServiceCallService.GetForUpdate($scope.SERVICE_CALL_ID);
        getAdmin.then(function (response) {
            $scope.ServiceCallDetailsList = response.data;
            getForUpdate($scope.ServiceCallDetailsList);
        });
    }

    function GetPriorityList() {
        var getcount = CustomerServiceCallService.GetPriorityList();
        getcount.then(function (d) {
            $scope.CallPriorityList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GetAllBanks() {
        var getAdmin = CustomerServiceCallService.GetCompanyBankDetails();
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }

    function GetCallStatusList() {
        var getcount = CustomerServiceCallService.GetCallStatusList();
        getcount.then(function (d) {
            $scope.CallStatusList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GetContractTypeList() {
        var getcount = CustomerServiceCallService.GetContractTypeList();
        getcount.then(function (d) {
            $scope.ContractTypeList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GetServiceTypeList() {
        var getcount = CustomerServiceCallService.GetServiceTypeList();
        getcount.then(function (d) {
            $scope.ServiceTypeList = d.data;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error");
        });
    }

    function GenerateServiceCallNumber() {
        tb_params = {
            GenerateNoFor: "ServiceCall",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var getAdmin = CustomerServiceCallService.GenerateServiceCallNumber(tb_params);
        getAdmin.then(function (response) {
            $scope.SERVICE_CALL_NUMBER = response.data;
        });
    }

    function GetAllCustomers() {

        if ($scope.CUSTOMER_ID != 0) {
            var getAdmin = CustomerServiceCallService.GetCustomer($scope.CUSTOMER_ID);
            getAdmin.then(function (response) {
                $scope.CustomerList = response.data;
                $scope.CUSTOMER_ID = CUSTOMER_ID;
                $scope.ADDRESS = $scope.CustomerList[0].BILLING_ADDRESS;
                GetAllCustomerFirm();
            });
        }
        else {
            var getAdmin = CustomerServiceCallService.GetAllCustomer($scope.CUSTOMER_TYPE_ID);
            getAdmin.then(function (response) {
                $scope.CustomerList = response.data;
                $scope.CUSTOMER_ID = CUSTOMER_ID;
                /* $scope.ADDRESS = $scope.CustomerList[0].BILLING_ADDRESS;*/
                GetAllCustomerFirm();
            });
        }
        
        
    }

    $scope.OnCustomerChange = function () {
        if ($scope.CUSTOMER_ID === undefined || $scope.CUSTOMER_ID === null || $scope.CUSTOMER_ID === "") {
            $scope.CustomerFirmList = [];
        }
        else {
            GetAllCustomerFirm();
        }
    };

    function GetAllCustomerFirm() {
        var getAdmin = CustomerServiceCallService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;

            if (CUSTOMER_ID != 0) {
                $scope.F_ID = $scope.CustomerFirmList[0].F_ID;
            }
        });
    }

    function GetAllCategory() {
        var getAdmin = CustomerServiceCallService.GetCategory();
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
        $scope.M_ID = M_ID;
        var getAdmin = CustomerServiceCallService.GetManufacturer(parseInt($scope.CAT_ID));
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
        if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            var getAdmin = CustomerServiceCallService.GetMedtronicProduct(3);
            getAdmin.then(function (response) {
                $scope.ProductList = response.data;
            });
        }
        else {
            var getAdmin = CustomerServiceCallService.GetProduct(parseInt($scope.M_ID));
            getAdmin.then(function (response) {
                $scope.ProductList = response.data;
            });
        }
        
    }

    $scope.OnProductChange = function () {
        if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            if ($scope.P_ID === undefined || $scope.P_ID === null || $scope.P_ID === "") {
                $scope.AccessoriesList = [];

            }
            else {
                GetAllAccessories();
            }
        }
    };

    function GetAllAccessories() {
        var getAdmin = CustomerServiceCallService.GetMedtronicAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }
   
    function GetEmployee() {
        var getAdmin = CustomerServiceCallService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }

    function GetManufacturerForEditForm() {
        var getAdmin = CustomerServiceCallService.GetManufacturer(parseInt($scope.CAT_ID));
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;

        });
    }

    function getForUpdate(admin) {

        //console.log(admin);

        //$scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        $scope.Admin_Action = "Update Service Call";
        //  alert(admin.STATE_ID);
        // $scope._Party = response.data;


        $scope.CUSTOMER_ID = parseInt(admin.CUSTOMER_ID);
        $scope.F_ID = parseInt(admin.F_ID);
        $scope.SERVICE_CALL_ID = admin.SERVICE_CALL_ID;
        $scope.SERVICE_CALL_NUMBER = admin.SERVICE_CALL_NUMBER;
        $scope.ADDRESS = admin.ADDRESS;
        $scope.CALL_ASSIGN_DATE = admin.CALL_ASSIGN_DATE;
        $scope.SCHEDULE_CALL_DATE = admin.SCHEDULE_CALL_DATE;
        $("#CALL_ASSIGN_DATE").val(admin.CALL_ASSIGN_DATE);
        $("#SCHEDULE_CALL_DATE").val(admin.SCHEDULE_CALL_DATE);
        
        $scope.EMP_ID = parseInt(admin.EMP_ID);
        $scope.CONTRACT_TYPE_ID = parseInt(admin.CONTRACT_TYPE_ID);
        $scope.SERVICE_TYPE_ID = parseInt(admin.SERVICE_TYPE_ID);
        $scope.CALL_PRIORITY_TYPE_ID = parseInt(admin.CALL_PRIORITY_TYPE_ID);
        $scope.CALL_STATUS = admin.CALL_STATUS;
        $scope.Service_For = admin.SERVICE_FOR;
        $scope.DESCRIPTION = admin.DESCRIPTION;
        $scope.BANK_ID = admin.BANK_ID;
        GetAllCustomers();
        GetAllCustomerFirm();
        if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            $scope.MED_ACC_ID = parseInt(admin.MED_ACC_ID);
            $scope.P_ID = parseInt(admin.P_ID);
            GetAllProduct();
            GetAllAccessories();
        }
        else {
            $scope.CAT_ID = parseInt(admin.CAT_ID);
            $scope.M_ID = parseInt(admin.M_ID);
            $scope.P_ID = parseInt(admin.P_ID);
            GetAllCategory();
            GetManufacturerForEditForm();
            GetAllProduct();
        }
        
        GetEmployee();
        GetPriorityList();
        GetCallStatusList();
        GetContractTypeList();
        GetServiceTypeList();
        GetAllBanks();
    };

    $scope.AddUpdateAccount = function () {
        $("#loader").css("display", '');
        if ($("#CALL_ASSIGN_DATE").val() === undefined || $("#CALL_ASSIGN_DATE").val() === null || $("#CALL_ASSIGN_DATE").val() === "") {
            alert("Call Assign Date is required");
            return false;
        }
        if ($("#SCHEDULE_CALL_DATE").val() === undefined || $("#SCHEDULE_CALL_DATE").val() === null || $("#SCHEDULE_CALL_DATE").val() === "") {
            alert("Schedule Call Date is required");
            return false;
        }

        $scope.IsMainSystemSelected = undefined;
        $scope.IsAttachmentsSelected = undefined;
        $scope.IsToolsSelected = undefined;

        if ($scope.Service_For === "MAIN SYSTEM") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsMainSystemSelected = "No";
                return false;
            }
        }
        else if ($scope.Service_For === "ATTACHMENTS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsAttachmentsSelected = "No";
                return false;
            }
        }
        else if ($scope.Service_For === "TOOLS") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsToolsSelected = "No";
                return false;
            }
        }

        $scope.CALL_ASSIGN_DATE = $("#CALL_ASSIGN_DATE").val();
        $scope.SCHEDULE_CALL_DATE = $("#SCHEDULE_CALL_DATE").val();
        if ($scope.Admin_Action === "Add Service Call") {
            $scope.ACTION = "ADD";
            tb_Admin = {
                SERVICE_CALL_NUMBER: $scope.SERVICE_CALL_NUMBER,
                ADDRESS: $scope.ADDRESS,
                CUSTOMER_ID: parseInt($scope.CUSTOMER_ID),
                F_ID: parseInt($scope.F_ID),
                CALL_ASSIGN_DATE: $scope.CALL_ASSIGN_DATE,
                SCHEDULE_CALL_DATE: $scope.SCHEDULE_CALL_DATE,
                P_ID: parseInt($scope.P_ID),
                CONTRACT_TYPE_ID: parseInt($scope.CONTRACT_TYPE_ID),
                SERVICE_TYPE_ID: parseInt($scope.SERVICE_TYPE_ID),
                CALL_PRIORITY_TYPE_ID: parseInt($scope.CALL_PRIORITY_TYPE_ID),
                CALL_STATUS: $scope.CALL_STATUS,
                EMP_ID: parseInt($scope.EMP_ID),
                DESCRIPTION: $scope.DESCRIPTION,
                SERVICE_FOR: $scope.Service_For,
                MED_ACC_ID: parseInt($scope.MED_ACC_ID),
                BANK_ID: parseInt($scope.BANK_ID),
                EnqId: parseInt($scope.EnqId),
                ACTION: $scope.ACTION
            };
            //alert(JSON.stringify(tb_Admin));
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Service Call") {
            $scope.ACTION = "UPDATE";
            tb_Admin = {
                SERVICE_CALL_ID: $scope.SERVICE_CALL_ID,
                SERVICE_CALL_NUMBER: $scope.SERVICE_CALL_NUMBER,
                ADDRESS: $scope.ADDRESS,
                CUSTOMER_ID: parseInt($scope.CUSTOMER_ID),
                F_ID: parseInt($scope.F_ID),
                CALL_ASSIGN_DATE: $scope.CALL_ASSIGN_DATE,
                SCHEDULE_CALL_DATE: $scope.SCHEDULE_CALL_DATE,
                P_ID: parseInt($scope.P_ID),
                CONTRACT_TYPE_ID: parseInt($scope.CONTRACT_TYPE_ID),
                SERVICE_TYPE_ID: parseInt($scope.SERVICE_TYPE_ID),
                CALL_PRIORITY_TYPE_ID: parseInt($scope.CALL_PRIORITY_TYPE_ID),
                CALL_STATUS: $scope.CALL_STATUS,
                EMP_ID: parseInt($scope.EMP_ID),
                DESCRIPTION: $scope.DESCRIPTION,
                SERVICE_FOR: $scope.Service_For,
                MED_ACC_ID: parseInt($scope.MED_ACC_ID),
                BANK_ID: parseInt($scope.BANK_ID),
                ACTION: $scope.ACTION
            };
            //alert(JSON.stringify(tb_Admin));
            EditAdminRecord(tb_Admin);
        }
    };

    function AddAdminRecord(tb_Admin) {
        var datalist = CustomerServiceCallService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Service Call added successfully.");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Customer_Service_Master/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=16";
                }
            }
            else if (d.data.success === false) {
                alert("Service Call already added.");
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
        var datalist = CustomerServiceCallService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Service Call updated successfully.");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/Customer_Service_Master/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=7";
                }
            }
            else if (d.data.success === false) {
                alert("Service Call already added.");
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
            window.location.href = "/Customer_Service_Master/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=7";
        }
    };

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back();
        }
    }

    $scope.selectaccs = function (Customer) {
        $scope.CUSTOMER_ID = Customer.Customer_ID;
        $scope.CUSTOMER_NAME = Customer.CUSTOMER_NAME;
        $scope.showOptions = false;
        $scope.OnCustomerChange();
    };
});