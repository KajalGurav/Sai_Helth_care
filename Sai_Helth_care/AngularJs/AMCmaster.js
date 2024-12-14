app.service("CustomerService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
    this.GetLatestUniqueCode = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetState = function () {
        return $http.get("/AMC_Master/GetState");
    };


    this.GetCity = function (id) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetCity",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetCategoryList = function () {
        var response = $http({
            method: "GET",
            url: "/AMC_Master/GetCategoryList"

        });
        return response;
    };

    this.GetProductList = function (id) {
        var response = $http({
            method: "GET",
            url: "/AMC_Master/GetProductList1",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetProduct = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProduct",
            params: {
                productTypeID: id
            }
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
        //    url: "/AMC_Master/GetCustomerList",
        //});
        //return response;
    };

    this.GetLatestRecords = function () {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetLatestRecord"
        });
        return response;
    };

    this.GetCmpnyBankDetails = function (bankid) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: bankid
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");
    };

    //this.GetCmpnyBankDetails = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Quotation_Registration/GetCmpnyBankDetails",
    //        params: {
    //            bankid: 0
    //        }
    //    });
    //    return response;
    //    //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");
    //};

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

    this.AddAMCAccessories = function (tb_AddPartsAccessories) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/AddAMCAccessories",
            data: JSON.stringify(tb_AddPartsAccessories),
            dataType: "json"
        });
        return response;
    };

    this.Get_AMCAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/Get_AMCAccessories",
            params: {
                AMC_CMC_ID: id
            }
        });
        return response;
    };

    this.DeleteAMCAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/DeleteAMCAccessories",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetCompany = function () {
        return $http.get("/Employee_Regi/GetCompany");
    };

});


app.controller("AMCCtrl", function ($scope, CustomerService) {
    $scope.COMPANY_ID = window.companyId || null;

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.CUSTOMER_TYPE_NAME = PARAM[0].split('=').pop();
    if ($scope.CUSTOMER_TYPE_NAME === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
    }
    else if ($scope.CUSTOMER_TYPE_NAME === "AERB") {
        $scope.CUSTOMER_TYPE_ID = 2;
    }
    else if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
        $scope.CUSTOMER_TYPE_ID = 3;
    }
    else if ($scope.CUSTOMER_TYPE_NAME === "Carestream") {
        $scope.CUSTOMER_TYPE_ID = 4;
    }
    else if ($scope.CUSTOMER_TYPE_NAME === "Mindray") {
        $scope.CUSTOMER_TYPE_ID = 5;
    }

    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.COMPANY_ID = null;
    $scope.STATE_SEARCH = null;

    GetTotalcount();
    GetAllState();
    GetAllCustomers();
    GetAllCategories();
    GetAllBanks();
    GetCompany();
    function GetCompany() {
        var getdatereport1 = CustomerService.GetCompany();
        getdatereport1.then(function (response) {
            $scope.CompanyList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }
    function GetAllBanks() {
        //if ($scope.BANK_ID === undefined || $scope.BANK_ID === null) {
        //    $scope.BANK_ID = 0;
        //}

        //var getAdmin = CustomerService.GetCmpnyBankDetails($scope.BANK_ID);
        var getAdmin = CustomerService.GetCmpnyBankDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = CustomerService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.AMCCMCList = "";
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

        if ($scope.COMPANY_ID === undefined || $scope.COMPANY_ID === "" || $scope.COMPANY_ID === null || $scope.COMPANY_ID === "0") {
            $scope.COMPANY_ID = null;
        }
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.FARMER_SEARCH,
            STATE_ID: $scope.STATE_SEARCH,
            COMPANY_ID: $scope.COMPANY_ID,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            //STARTING_DATE: $scope.STARTING_DATE,
            //ENDING_DATE: $scope.ENDING_DATE
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
        var getrecord = CustomerService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.AMCCMCList = response.data;
            $("#loader").css("display", 'none');
            ;
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

    function GetAllState() {
        var getAdmin = CustomerService.GetState();
        getAdmin.then(function (response) {
            $scope.StateList = response.data;
        });
    }

    $scope.GetstateChange = function () {

        GetAllCity();
    };


    function GetAllCity() {
        var getAdmin = CustomerService.GetCity($scope.STATE_ID);
        getAdmin.then(function (response) {
            $scope.CityList = response.data;

        });
    }


    function GetAllCustomers() {
        var getAdmin = CustomerService.GetAllCustomer(parseInt($scope.CUSTOMER_TYPE_ID));
        getAdmin.then(function (response) {
            $scope.CustomerList = response.data;
        });
    }

    $scope.GetCustomerChange = function () {
        console.log($scope.CUSTOMER_ID);
        var id = $scope.CUSTOMER_ID;
        var Customer = $scope.CustomerList.filter(x => x.Customer_ID == id)[0];
        $scope.CUSTOMER_NAME = Customer.CUSTOMER_NAME;
        //$scope.CUSTOMER_TYPE_ID = Customer.CUSTOMER_TYPE_ID;
        console.log(Customer);
        GetAllCustomerFirm();

    };
    function GetAllCustomerFirm() {
        var getAdmin = CustomerService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;
            GetAllCategories();
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
        var getAdmin = CustomerService.GetMedtronicAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }

    function GetAllCategories() {
        var getAdmin = CustomerService.GetCategoryList();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }

    $scope.GetCategoryChange = function () {
        console.log($scope.CAT_ID);
        var id = $scope.CAT_ID;
        var Category = $scope.CategoryList.filter(x => x.CAT_ID == id)[0];
        $scope.PRODUCT_NAME = Category.CAT_NAME;
        $scope.CONTRACT_TYPE_DETAILS = "";
        console.log(Category);
        GetAllProducts();
    };
    function GetAllProducts() {
        if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
            var getAdmin = CustomerService.GetProduct(3);
            getAdmin.then(function (response) {
                $scope.ProductList = response.data;
            });
        }
        else {
            var getAdmin = CustomerService.GetProductList($scope.CAT_ID);
            getAdmin.then(function (response) {
                $scope.ProductList = response.data;

            });
        }

    }

    //
    //***** AddPartsButtonClicked
    function Get_AMCAccessories() {
        var getAdmin = CustomerService.Get_AMCAccessories($scope.AMC_CMC_ID);
        getAdmin.then(function (response) {
            $scope.AMCAccessories = response.data;
            $scope.FEES = 0;
            for (let i = 0; i < $scope.AMCAccessories.length; i++) {
                $scope.FEES = parseFloat($scope.FEES) + (parseFloat($scope.AMCAccessories[i].AMC_AMOUNT) * parseInt($scope.AMCAccessories[i].QUANTITY));
            }
            console.log($scope.FEES);
        });
    };

    $scope.AddPartsButtonClicked = function () {
        $scope.AddPartsAccessories_Action = "Add";
        $scope.AddPartsAccessories();

    };


    $scope.CalAmtIncTaxReg = function () {
        if ($scope.IS_FEES_INC_GST === null || $scope.IS_FEES_INC_GST === "" || $scope.IS_FEES_INC_GST === undefined) {
            /*       alert("Please select Is Fees Including GST field");*/
            return;
        }
        if ($scope.IS_FEES_INC_GST === "true" || $scope.IS_FEES_INC_GST === true) {
            if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
                $scope.FEES_IN_GST = 0;
            }
            else {
                if ($scope.FEES === undefined || $scope.FEES === null || $scope.FEES === "") {
                    $scope.FEES_IN_GST = 0;
                }
                else {
                    $scope.FEES_IN_GST = $scope.FEES;
                }
            }
        }
        else if ($scope.IS_FEES_INC_GST === "false" || $scope.IS_FEES_INC_GST === false) {
            if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
                $scope.FEES_IN_GST = 0;
            }
            else {
                if ($scope.FEES === undefined || $scope.FEES === null || $scope.FEES === "") {
                    $scope.FEES_IN_GST = 0;
                }
                else {
                    $scope.FEES_IN_GST = $scope.FEES + ($scope.FEES * (18 / 100));
                }
            }
        }

    }

    $scope.CalAmtIncTax = function () {
        if ($scope.IS_FEES_INC_GST === null || $scope.IS_FEES_INC_GST === "" || $scope.IS_FEES_INC_GST === undefined) {
            /*    alert("Please select Is Fees Including GST field");*/
            return;
        }
        if ($scope.IS_FEES_INC_GST === "true" || $scope.IS_FEES_INC_GST === true) {
            if ($scope.GST_PERCENTAGE === undefined || $scope.GST_PERCENTAGE === null || $scope.GST_PERCENTAGE === "") {
                $scope.FEES_IN_GST = 0;
            }
            else {
                $scope.FEES_IN_GST = $scope.FEES;
            }
        }
        else if ($scope.IS_FEES_INC_GST === "false" || $scope.IS_FEES_INC_GST === false) {
            if ($scope.GST_PERCENTAGE === undefined || $scope.GST_PERCENTAGE === null || $scope.GST_PERCENTAGE === "") {
                $scope.FEES_IN_GST = 0;
            }
            else {
                $scope.FEES_IN_GST = $scope.FEES + ($scope.FEES * ((parseInt($scope.GST_PERCENTAGE)) / 100));
            }
        }


    }

    $scope.AddPartsAccessories = function () {

        $scope.IsMainSystemSelected = undefined;
        $scope.IsAttachmentsSelected = undefined;
        $scope.IsToolsSelected = undefined;

        if ($scope.AMC_For === "MainSystem") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsMainSystemSelected = "No";
                return false;
            }
        }
        else if ($scope.AMC_For === "Attachments") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsAttachmentsSelected = "No";
                return false;
            }
        }
        else if ($scope.AMC_For === "Tools") {
            if ($scope.MED_ACC_ID === undefined || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === "") {
                $scope.IsToolsSelected = "No";
                return false;
            }
        }




        tb_AddPartsAccessories = {
            AMC_CMC_ID: $scope.AMC_CMC_ID,
            AMC_For: $scope.AMC_For,
            MED_ACC_ID: $scope.MED_ACC_ID,
            SERIAL_NO: $scope.PART_SERIAL_NO,
            QUANTITY: parseInt($scope.PART_QTY),
            AMC_AMOUNT: parseFloat($scope.PART_PRICE),

        };
        if ($scope.AddPartsAccessories_Action === "Add") {
            AddPartsAccessories(tb_AddPartsAccessories);
        }

    };


    function AddPartsAccessories(tb_AddPartsAccessories) {


        var datalist = CustomerService.AddAMCAccessories(tb_AddPartsAccessories);
        datalist.then(function (d) {
            if (d.data.success === true) {

                Get_AMCAccessories();
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {

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



    $scope.DeleteAMCAccessories = function (data) {


        var datalist = CustomerService.DeleteAMCAccessories(data.AMC_MEDACC_ID);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Get_AMCAccessories();
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

    //

    $scope.GetFirmChange = function () {
        console.log($scope.FIRM_ID);
        var id = $scope.FIRM_ID;
        var Firm = $scope.CustomerFirmList.filter(x => x.F_ID == id)[0];
        $scope.CUSTOMER_FIRM_NAME = Firm.FIRM_NAME;
        console.log(Firm);
    };
    $scope.GetModelChange = function () {
        console.log($scope.P_ID);
        var id = $scope.P_ID;
        var Product = $scope.ProductList.filter(x => x.P_ID == id)[0];
        $scope.MODEL_NAME = Product.PRODUCT_NAME;
        //if ($scope.CUSTOMER_TYPE == "5") {
        //    var Product = $scope.ProductList.filter(x => x.MP_ID == id)[0];
        //    $scope.MODEL_NAME = Product.PRODUCT_NAME;
        //}
        //else {
        //    var Product = $scope.ProductList.filter(x => x.P_ID == id)[0];
        //    $scope.MODEL_NAME = Product.PRODUCT_NAME;
        //}
        $scope.OnProductChange();
        console.log(Product);
    };

    function Clear() {
        $scope.CONTRACT_DOCUMENT_NO = "";
        $scope.CONTRACT_TYPE = "";
        $scope.CONTRACT_PERIOD = "";
        $scope.CONTRACT_DATE = "";
        $scope.CUSTOMER_ID = "";
        $scope.CUSTOMER_NAME = "";
        $scope.CUSTOMER_TYPE = "";
        $scope.FIRM_ID = "";
        $scope.CUSTOMER_FIRM_NAME = "";
        $scope.CAT_ID = "";
        $scope.PRODUCT_NAME = "";
        $scope.P_ID = "";
        $scope.MODEL_NAME = "";
        $scope.MODEL_SERIAL_NO = "";
        $scope.CONTRACT_FROM = "";
        $scope.CONTRACT_TO = "";
        $scope.PM_VISIT = "";
        $scope.CM_VISIT = "";
        $scope.IS_FEES_INC_GST = "";
        $scope.FEES = "";
        $scope.FEES_IN_GST = "";
        $scope.PAID_FEES = "";
        $scope.FEES_PAID_BY = "";
        $scope.COMMENTS = "";
        $scope.AMC_CMC_STATUS = "";
        $scope.BANK_ID = "";
        $scope.CONTRACT_TYPE_DETAILS = "";
    }



    $scope.AdminClick = function () {
        Clear();
        if ($scope.CUSTOMER_TYPE_ID === 3) {
            GetAllProducts();
            $scope.AMC_CMC_ID = null;
            Get_AMCAccessories();
            tb_Admin = {
                GenerateNoFor: "AMC-CMC",
                CustomerTypeId: $scope.CUSTOMER_TYPE_ID
            }
            var LatestDocNo = CustomerService.GetLatestUniqueCode(tb_Admin);
            LatestDocNo.then(function (response) {
                $scope.LatestRecord = response.data;
                $scope.CONTRACT_DOCUMENT_NO = $scope.LatestRecord;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $scope.CONTRACT_DATE = today;
            });
        }
        else {
            tb_Admin = {
                GenerateNoFor: "AMC-CMC",
                CustomerTypeId: $scope.CUSTOMER_TYPE_ID
            }
            var LatestDocNo = CustomerService.GetLatestUniqueCode(tb_Admin);
            LatestDocNo.then(function (response) {
                $scope.LatestRecord = response.data;
                $scope.CONTRACT_DOCUMENT_NO = $scope.LatestRecord;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $scope.CONTRACT_DATE = today;
            });
        }


        $scope.Admin_Action = "Add AMC/CMC";

        $("#AMC_AddUpdate").modal({ backdrop: 'static', keyboard: false }).modal("show");

        //document.getElementById('divProfile').style.display = "none";
        //document.getElementById('Profile1').style.display = "none";
        //document.getElementById('Profile2').style.display = "none";
    };


    $scope.getForUpdate = function (admin) {
        //document.getElementById("FIRM_ID").value = admin.FIRM_ID;
        //document.getElementById("P_ID").value = admin.P_ID;
        $scope.AMC_CMC_ID = admin.AMC_CMC_ID;
        if ($scope.CUSTOMER_TYPE_ID === 3) {
            Get_AMCAccessories();
        }
        $scope.CONTRACT_DATE = "";
        $scope.CONTRACT_FROM = "";
        $scope.CONTRACT_TO = "";
        $scope.CONTRACT_DOCUMENT_NO = admin.CONTRACT_DOCUMENT_NO;
        $scope.CONTRACT_TYPE = admin.CONTRACT_TYPE;
        $scope.CONTRACT_PERIOD = admin.CONTRACT_PERIOD.toString();
        //document.getElementById("CONTRACT_PERIOD").value = admin.CONTRACT_PERIOD;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.FIRM_ID = admin.FIRM_ID;
        $scope.GetCustomerChange();
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.CUSTOMER_TYPE_ID = admin.CUSTOMER_TYPE;
        //document.getElementById("CUSTOMER_ID").value = admin.CUSTOMER_ID;
        $scope.CUSTOMER_FIRM_NAME = admin.CUSTOMER_FIRM_NAME;
        $scope.CAT_ID = admin.CAT_ID;
        if ($scope.CUSTOMER_TYPE_ID === 3) {
            GetAllProducts();
        }
        else {
            $scope.GetCategoryChange();
        }
        $scope.PRODUCT_NAME = admin.PRODUCT_NAME;
        //document.getElementById("CAT_ID").value = admin.CAT_ID;
        $scope.P_ID = admin.P_ID;
        $scope.OnProductChange();
        $scope.MODEL_NAME = admin.MODEL_NAME;
        $scope.MODEL_SERIAL_NO = admin.MODEL_SERIAL_NO;
        $scope.PM_VISIT = admin.PM_VISIT;
        $scope.CM_VISIT = admin.CM_VISIT;
        $scope.IS_FEES_INC_GST = admin.IS_FEES_INC_GST;
        $scope.FEES = admin.FEES;
        $scope.FEES_IN_GST = admin.FEES_IN_GST;
        $scope.GST_PERCENTAGE = admin.GST_PERCENTAGE;
        $scope.PAID_FEES = admin.PAID_FEES;
        $scope.FEES_PAID_BY = admin.FEES_PAID_BY;
        $scope.COMMENTS = admin.COMMENTS;
        $scope.AMC_CMC_STATUS = admin.AMC_CMC_STATUS;
        $scope.Admin_Action = "Update AMC/CMC";

        $("#AMC_AddUpdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        //let d = new Date(admin.CONTRACT_FROM);
        //let datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');

        //document.getElementById("CONTRACT_FROM").value = "";
        //document.getElementById("CONTRACT_TO").value = "";
        $scope.CONTRACT_DATE = admin.CONTRACT_DATE;
        //$scope.CONTRACT_DATE = new Date(admin.CONTRACT_DATE);
        //document.getElementById("CONTRACT_DATE").value = new Date(admin.CONTRACT_DATE);
        $scope.CONTRACT_FROM = admin.CONTRACT_FROM;
        $('#CONTRACT_FROM').datepicker('setDate', $scope.CONTRACT_FROM);
        //$scope.CONTRACT_FROM = new Date(admin.CONTRACT_FROM);

        //document.getElementById("CONTRACT_FROM").value = new Date(admin.CONTRACT_FROM);
        $scope.CONTRACT_TO = admin.CONTRACT_TO;
        $('#CONTRACT_TO').datepicker('setDate', $scope.CONTRACT_TO);
        $scope.BANK_ID = parseInt(admin.BANK_ID);
        $scope.CONTRACT_TYPE_DETAILS = admin.CONTRACT_TYPE_DETAILS;
        //$scope.CONTRACT_TO = new Date(admin.CONTRACT_TO);
        //document.getElementById("CONTRACT_TO").value = new Date(admin.CONTRACT_TO);



        //setTimeout(function myfunction() {
        //    var blankSelectOptions = $('option[value$="?"]');
        //    if (blankSelectOptions.length > 0) {
        //        $(blankSelectOptions).remove();
        //    }
        //    $("#CUSTOMER_ID").val($scope.CUSTOMER_ID);
        //    $("#FIRM_ID").val($scope.FIRM_ID);
        //    $("#CAT_ID").val($scope.CAT_ID);
        //    $("#P_ID").val($scope.P_ID);

        //}, 900);

    };

    $scope.AddUpdateAccount = function () {
        // Mandatory field check for specific companies
        if ((companyId === 1 || companyId === 13) &&
            (!$scope.FEES_IN_GST || $scope.IS_FEES_INC_GST === undefined)) {
            alert("Please fill all mandatory fields for Fees In GST and Is Fees Including GST!");
            return;
        }

        // Existing data preparation
        tb_Admin = {
            CONTRACT_DOCUMENT_NO: $scope.CONTRACT_DOCUMENT_NO,
            CONTRACT_TYPE: $scope.CONTRACT_TYPE,
            CONTRACT_PERIOD: $scope.CONTRACT_PERIOD,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            CUSTOMER_TYPE: $scope.CUSTOMER_TYPE_ID,
            FIRM_ID: $scope.FIRM_ID,
            CUSTOMER_FIRM_NAME: $scope.CUSTOMER_FIRM_NAME,
            CAT_ID: $scope.CAT_ID,
            PRODUCT_NAME: $scope.PRODUCT_NAME,
            P_ID: $scope.P_ID,
            MODEL_NAME: $scope.MODEL_NAME,
            MODEL_SERIAL_NO: $scope.MODEL_SERIAL_NO,
            PM_VISIT: $scope.PM_VISIT,
            CM_VISIT: $scope.CM_VISIT,
            IS_FEES_INC_GST: $scope.IS_FEES_INC_GST,
            FEES: $scope.FEES,
            FEES_IN_GST: $scope.FEES_IN_GST,
            GST_PERCENTAGE: $scope.GST_PERCENTAGE,
            PAID_FEES: $scope.PAID_FEES,
            FEES_PAID_BY: $scope.FEES_PAID_BY,
            COMMENTS: $scope.COMMENTS,
            AMC_CMC_STATUS: $scope.AMC_CMC_STATUS,
            CONTRACT_DATE: $scope.CONTRACT_DATE,
            CONTRACT_FROM: $scope.CONTRACT_FROM,
            CONTRACT_TO: $scope.CONTRACT_TO,
            BANK_ID: $scope.BANK_ID,
            CONTRACT_TYPE_DETAILS: $scope.CONTRACT_TYPE_DETAILS
        };

        if ($scope.Admin_Action === "Add AMC/CMC") {
            AddAdminRecord(tb_Admin);
        } else if ($scope.Admin_Action === "Update AMC/CMC") {
            EditAdminRecord(tb_Admin);
        }
    };




    function AddAdminRecord(tb_Admin) {
        var datalist = CustomerService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("AMC/CMC added successfully.");
                $("#AMC_AddUpdate").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;
            }
            else if (d.data.success === false) {
                alert("AMC/CMC already added.");
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
        var datalist = CustomerService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("AMC/CMC updated successfully.");
                $("#AMC_AddUpdate").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;
            }
            else if (d.data.success === false) {
                alert("AMC/CMC already added.");
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

    $scope.PreviewPR = function (admin) {
        if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
            $scope.CONTRACT_DETAILS = admin;
            $scope.AMC_CMC_ID = $scope.CONTRACT_DETAILS.AMC_CMC_ID;
            Get_AMCAccessories();
            $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES_IN_GST);

            $scope.CmpDetailsList = "";
            $scope.COMPANYNAME = "";
            $scope.COMPANYREGADDRESS = "";
            $scope.ZIPCODE = "";
            var getCmpDetails = CustomerService.GetCmpnyBankDetails(admin.BANK_ID);
            //var getCmpDetails = CustomerService.GetCmpnyBankDetails();
            getCmpDetails.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                //$("#tempCustId").val($scope.RegularQuotationList[0].Q_ID);
            });
            if (admin.CONTRACT_TYPE === "AMC") {
                $("#AMCMedtronicDocument").modal("show");
            }
            else if (admin.CONTRACT_TYPE === "CMC") {
                $("#CMCMedtronicDocument").modal("show");
            }
        }

        else {
            $scope.CONTRACT_DETAILS = admin;

            $scope.IS_FEES_INC_GST = $scope.CONTRACT_DETAILS.IS_FEES_INC_GST;

            if ($scope.CONTRACT_DETAILS.CONTRACT_TYPE == "AMC") {
                if ($scope.IS_FEES_INC_GST == true) {
                    document.getElementById('ContractFees1').style.display = "none";
                    document.getElementById('ContractFees2').style.display = "block";
                    $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES_IN_GST);
                }
                else {
                    document.getElementById('ContractFees1').style.display = "block";
                    document.getElementById('ContractFees2').style.display = "none";
                    $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES);
                }
            }

            else if ($scope.CONTRACT_DETAILS.CONTRACT_TYPE == "CMC") {
                if ($scope.IS_FEES_INC_GST == true) {
                    document.getElementById('ContractFees3').style.display = "none";
                    document.getElementById('ContractFees4').style.display = "block";
                    $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES_IN_GST);
                }
                else {
                    document.getElementById('ContractFees3').style.display = "block";
                    document.getElementById('ContractFees4').style.display = "none";
                    $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES);
                }
            }

            $scope.CHEQUE = 'false';
            $scope.CASH = 'false';
            $scope.ONLINE_RTGS = 'false';
            $scope.CHEQUE2 = 'false';
            $scope.CASH2 = 'false';
            $scope.ONLINE_RTGS2 = 'false';

            if ($scope.CONTRACT_DETAILS.CONTRACT_TYPE === "AMC") {
                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cheque') {
                    //document.getElementById("cheque").checked = true;
                    $scope.CHEQUE = 'true';
                }
                else {
                    //document.getElementById("cheque").checked = 'false';
                    $scope.CHEQUE = 'false';
                }

                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cash') {
                    //document.getElementById("cash").checked = 'true';
                    $scope.CASH = 'true';
                }
                else {
                    //document.getElementById("cash").checked = 'false';
                    $scope.CASH = 'false';
                }

                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Online/RTGS') {
                    //document.getElementById("cash").checked = 'true';
                    $scope.ONLINE_RTGS = 'true';
                }
                else {
                    //document.getElementById("cash").checked = 'false';
                    $scope.ONLINE_RTGS = 'false';
                }
            }

            else {
                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cheque') {
                    //document.getElementById("cheque2").checked = 'true';
                    $scope.CHEQUE2 = 'true';
                }
                else {
                    //document.getElementById("cheque2").checked = 'false';
                    $scope.CHEQUE2 = 'false';
                }

                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cash') {
                    //document.getElementById("cash2").checked = 'true';
                    $scope.CASH2 = 'true';
                }
                else {
                    //document.getElementById("cash2").checked = 'false';
                    $scope.CASH2 = 'false';
                }
                if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Online/RTGS') {
                    //document.getElementById("cash").checked = 'true';
                    $scope.ONLINE_RTGS2 = 'true';
                }
                else {
                    //document.getElementById("cash").checked = 'false';
                    $scope.ONLINE_RTGS2 = 'false';
                }
            }

            $scope.CmpDetailsList = "";
            $scope.COMPANYNAME = "";
            $scope.COMPANYREGADDRESS = "";
            $scope.ZIPCODE = "";
            var getCmpDetails = CustomerService.GetCmpnyBankDetails(admin.BANK_ID);
            getCmpDetails.then(function (response) {
                $scope.CmpDetailsList = response.data;
                $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
            });
            if (admin.CONTRACT_TYPE === "AMC") {
                $("#AMCDocument").modal("show");
            }
            else if (admin.CONTRACT_TYPE === "CMC") {
                $("#CMCDocument").modal("show");
            }

            if ($scope.CONTRACT_DETAILS.COMMENTS == "") {
                document.getElementById('Comment').style.display = "none";
                document.getElementById('Comment1').style.display = "none";
            }
            else {
                document.getElementById('Comment').style.display = "block";
                document.getElementById('Comment1').style.display = "block";
            }
        }
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
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
        }

        return str;
    }

    $scope.Print = function (id) {

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
            window.location.href = window.location.href;
        }, 1000);

    }
    $scope.updateFees = function () {
        // Ensure that IS_FEES_INC_GST is not null, undefined, or empty
        if ($scope.IS_FEES_INC_GST === null || $scope.IS_FEES_INC_GST === undefined || $scope.IS_FEES_INC_GST === "") {
            return; // Exit if the field is not selected
        }

        // Handle "Yes" for including GST
        if ($scope.IS_FEES_INC_GST === true || $scope.IS_FEES_INC_GST === "true") {
            if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
                $scope.FEES_IN_GST = 0; // Set Fees In GST to 0 for customer type 3
            } else {
                // Set Fees In GST to the value of FEES when GST is included
                $scope.FEES_IN_GST = ($scope.FEES && $scope.FEES !== "") ? $scope.FEES : 0;
            }
        }
        // Handle "No" for including GST
        else if ($scope.IS_FEES_INC_GST === false || $scope.IS_FEES_INC_GST === "false") {
            if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
                $scope.FEES_IN_GST = 0; // Set Fees In GST to 0 for customer type 3
            } else {
                // If FEES is provided, calculate the fee with 18% GST
                $scope.FEES_IN_GST = ($scope.FEES && $scope.FEES !== "")
                    ? $scope.FEES + ($scope.FEES * (18 / 100))
                    : 0;
            }
        }
    };


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

});