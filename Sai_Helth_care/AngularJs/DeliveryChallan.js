app.service("DeliveryChallanService", function ($http) {


    //this.GenerateDCNumber = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GenerateDCNumber",
    //    });
    //    return response;
    //};
    //this.GetAllCustomer = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Customer_Master/GetCustomerList",
    //    });
    //    return response;
    //};

    //this.GetFirmList = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Customer_Master/GetFirmList",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};

    //this.GetCategory = function () {
    //    return $http.get("/Product/GetCategory");
    //};

    //this.GetManufacturer = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Product/GetManufacturer",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};

    //this.GetProduct = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/SparePart/GetProduct",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};

    //this.GetAllAccessories = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Quotation_Registration/GetStdAccPart",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};
    //this.GetAllSparepart = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Quotation_Registration/GetSparepart",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};
    
    //this.GetMaterial = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GetMaterial",
    //    });
    //    return response;
    //};
    //this.GetDCStatus = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GetDCStatus",
    //    });
    //    return response;
    //};
    //this.GetIncludingAllTaxes = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GetIncludingAllTaxes",
    //    });
    //    return response;
    //};
    //this.GetGSTPercentage = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GetGSTPercentage",
    //    });
    //    return response;
    //};
    //this.GetEmployee = function () {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Dilivery_Challan/GetEmployee",
    //    });
    //    return response;
    //};

    //this.AddPartsAccessories = function (tb_AddPartsAccessories) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Dilivery_Challan/AddPartsAccessories",
    //        data: JSON.stringify(tb_AddPartsAccessories),
    //        dataType: "json"
    //    });
    //    return response;
    //};

    //this.Get_DC_SparePartsAndAccessories = function (id) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Dilivery_Challan/Get_DC_SparePartsAndAccessories",
    //        params: {
    //            id: id
    //        }
    //    });
    //    return response;
    //};

    //this.Delete_DC_SparePartsAndAccessories = function (data) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Dilivery_Challan/Delete_DC_SparePartsAndAccessories",
    //        data: JSON.stringify(data),
    //        dataType: "json"
    //    });
    //    return response;
    //};

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/GetDeliveryChallanList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

});

app.controller('DeliveryChallanCtrl', function ($scope, DeliveryChallanService) {

    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;

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

    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 10;
    $scope.CUSTOMER_ID = null;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;

    GetTotalcount();


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = DeliveryChallanService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.DeliveryChallanList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }



    function GetSearchingConditions() {

        if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.CUSTOMER_NAME = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE
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
        var getrecord = DeliveryChallanService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.DeliveryChallanList = response.data;
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


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
    ////Delete Below Code :
    ////$scope.Customer_ID = 89;
    //GetAllSparepart();
    //GetAllAccessories();

    //$scope.DC_For = 'Accessories';
    //$scope.DC_ID = null;

    //GenerateDCNumber();
    //GetAllCustomers();
    //GetAllCategory();
    //GetMaterial();
    //GetDCStatus();
    //GetIncludingAllTaxes();
    //GetGSTPercentage();
    //GetEmployee();
    //Get_DC_SparePartsAndAccessories();

    //function GenerateDCNumber() {
    //    var getAdmin = DeliveryChallanService.GenerateDCNumber();
    //    getAdmin.then(function (response) {
    //        $scope.DC_Number = "SMS/DC/" + response.data;
    //    });
    //}
    //function GetAllCustomers() {
    //    var getAdmin = DeliveryChallanService.GetAllCustomer();
    //    getAdmin.then(function (response) {
    //        $scope.AllCustomerList = response.data;

    //    });
    //}
    //$scope.OnCustomerChange = function () {
    //    if ($scope.Customer_ID === undefined || $scope.Customer_ID === null || $scope.Customer_ID === "") {
    //        $scope.CustomerFirmList = [];
    //    }
    //    else {
    //        GetAllCustomerFirm();
    //    }
    //};
    //function GetAllCustomerFirm() {
    //    var getAdmin = DeliveryChallanService.GetFirmList($scope.Customer_ID);
    //    getAdmin.then(function (response) {
    //        $scope.CustomerFirmList = response.data;
    //    });
    //}

    //function GetAllCategory() {
    //    var getAdmin = DeliveryChallanService.GetCategory();
    //    getAdmin.then(function (response) {
    //        $scope.CategoryList = response.data;
    //    });
    //}

    //$scope.OnCategoryChange = function () {
    //    if ($scope.CAT_ID === undefined || $scope.CAT_ID === null || $scope.CAT_ID === "") {
    //        $scope.ManufacturerList = [];
    //    }
    //    else {
    //        GetAllManufacturer();
    //    }
    //};
    //function GetAllManufacturer() {
    //    var getAdmin = DeliveryChallanService.GetManufacturer($scope.CAT_ID);
    //    getAdmin.then(function (response) {
    //        $scope.ManufacturerList = response.data;
    //    });
    //}
    //$scope.OnManufacturerChange = function () {
    //    if ($scope.M_ID === undefined || $scope.M_ID === null || $scope.M_ID === "") {
    //        $scope.ProductList = [];
    //    }
    //    else {
    //        GetAllProduct();
    //    }
    //};

    //function GetAllProduct() {
    //    var getAdmin = DeliveryChallanService.GetProduct($scope.M_ID);
    //    getAdmin.then(function (response) {
    //        $scope.ProductList = response.data;
    //    });
    //}
    //$scope.OnProductChange = function () {
    //    if ($scope.P_ID === undefined || $scope.P_ID === null || $scope.P_ID === "") {
    //        $scope.SparePartList = [];
    //    }
    //    else {
    //        GetAllSparepart();
    //    }
    //};


    //function GetAllAccessories() {
    //    var getAdmin = DeliveryChallanService.GetAllAccessories(8); // ($scope.P_ID);
    //    getAdmin.then(function (response) {
    //        $scope.AccessoriesList = response.data;
    //    });
    //}
    //function GetAllSparepart() {
    //    var getAdmin = DeliveryChallanService.GetAllSparepart(207); // ($scope.P_ID);
    //    getAdmin.then(function (response) {
    //        $scope.SparePartList = response.data;
    //    });
    //}

    //function GetMaterial() {
    //    var getAdmin = DeliveryChallanService.GetMaterial();
    //    getAdmin.then(function (response) {
    //        $scope.MaterialList = response.data;
    //    });
    //}
    //function GetDCStatus() {
    //    var getAdmin = DeliveryChallanService.GetDCStatus();
    //    getAdmin.then(function (response) {
    //        $scope.DCStatusList = response.data;
    //    });
    //}
    //function GetIncludingAllTaxes() {
    //    var getAdmin = DeliveryChallanService.GetIncludingAllTaxes();
    //    getAdmin.then(function (response) {
    //        $scope.IncludingAllTaxesList = response.data;
    //    });
    //}
    //function GetGSTPercentage() {
    //    var getAdmin = DeliveryChallanService.GetGSTPercentage();
    //    getAdmin.then(function (response) {
    //        $scope.GSTPercentageList = response.data;
    //    });
    //}
    //function GetEmployee() {
    //    var getAdmin = DeliveryChallanService.GetEmployee();
    //    getAdmin.then(function (response) {
    //        $scope.EmployeeList = response.data;
    //    });
    //}

    ////***** AddPartsButtonClicked
    //function Get_DC_SparePartsAndAccessories () {
    //    var getAdmin = DeliveryChallanService.Get_DC_SparePartsAndAccessories($scope.DC_ID);
    //    getAdmin.then(function (response) {
    //        $scope.DC_SparePartsAndAccessories = response.data;
    //        //alert(JSON.stringify($scope.DC_SparePartsAndAccessories));
    //    });
    //};

    //$scope.AddPartsButtonClicked = function () {
    //    $scope.AddPartsAccessories_Action = "Add";
    //    $scope.AddPartsAccessories();
    //    //ClearAddPartsAccessories();
    //    //$("#AddPartsAccessories_Addupdate").modal("show");
    //};

    ////$scope.getForUpdate = function (Admin) {

    ////    $scope.COMPANY_ID = Admin.COMPANY_ID;
    ////    $scope.COMPANY_NAME = Admin.COMPANY_NAME;
    ////    $scope.AUTHORITY_NAME = Admin.AUTHORITY_NAME;
    ////    $scope.MOBILE_NO = parseInt(Admin.MOBILE_NO);
    ////    $scope.ALT_MOBILE_NO = parseInt(Admin.ALT_MOBILE_NO);
    ////    $scope.EMAIL_ID = Admin.EMAIL_ID;
    ////    $scope.COMPANY_REG_ADDRESS = Admin.COMPANY_REG_ADDRESS;
    ////    $scope.COMPANY_COR_ADDRESS = Admin.COMPANY_COR_ADDRESS;
    ////    $scope.ZIP_CODE = parseInt(Admin.ZIP_CODE);
    ////    $scope.COMPANY_TYPE = Admin.COMPANY_TYPE;
    ////    $scope.PAN_NO = Admin.PAN_NO;
    ////    $scope.PNDT_NO = parseInt(Admin.PNDT_NO);
    ////    $scope.GST_NO = parseInt(Admin.GST_NO);
    ////    $scope.TIN_NO = parseInt(Admin.TIN_NO);


    ////    $scope.Admin_Action = "Update Company";

    ////    $("#Admin_Addupdate").modal("show");
    ////};


    //$scope.AddPartsAccessories = function () {

    //    $scope.IsAccessoriesSelected = undefined;
    //    $scope.IsSparePartSelected = undefined;

    //    if ($scope.DC_For === "Accessories") {
    //        if ($scope.STD_ID === undefined || $scope.STD_ID === null || $scope.STD_ID === "") {
    //            $scope.IsAccessoriesSelected = "No";
    //            return false;
    //        }
    //    }
    //    else if ($scope.DC_For === "SpareParts") {
    //        if ($scope.SP_ID === undefined || $scope.SP_ID === null || $scope.SP_ID === "") {
    //            $scope.IsSparePartSelected = "No";
    //            return false;
    //        }
    //    }



    //    $("#loader").css("display", '');
    //    tb_AddPartsAccessories = {
    //        DC_ID: $scope.DC_For,
    //        DC_For: $scope.DC_For,
    //        STD_ID: $scope.STD_ID,
    //        SP_ID: $scope.SP_ID,
    //        PART_QTY: $scope.PART_QTY,
    //        PART_PRICE: $scope.PART_PRICE,

    //    };
    //    if ($scope.AddPartsAccessories_Action === "Add") {
    //        AddPartsAccessories(tb_AddPartsAccessories);
    //    }
    //    //else if ($scope.Admin_Action === "Update Company") {
    //    //    EditAdminRecord(tb_Admin);
    //    //}
    //};


    //function AddPartsAccessories(tb_AddPartsAccessories) {

    //    //alert(JSON.stringify(tb_AddPartsAccessories));

    //    var datalist = DeliveryChallanService.AddPartsAccessories(tb_AddPartsAccessories);
    //    datalist.then(function (d) {
    //        if (d.data.success === 1) {
    //            //Clear(); GetRecordbyPaging();
    //            //alert("Company added successfully.");
    //            //$("#Admin_Addupdate").modal("hide");
    //            //$("#loader").css("display", 'none');
    //            Get_DC_SparePartsAndAccessories();
    //        }
    //        else if (d.data.success === -1) {
    //            //alert("Company already added.");
    //            //$("#loader").css("display", 'none');
    //        }
    //        else {
    //            alert("Please fill all Mandatory Fields.");
    //            $("#loader").css("display", 'none');
    //        }
    //    },
    //        function () {

    //            alert("Error.");
    //            $("#loader").css("display", 'none');
    //        });
    //}


    ////function EditAdminRecord(tb_Admin) {
    ////    var datalist = DeliveryChallanService.EditAdmin(tb_Admin);
    ////    datalist.then(function (d) {
    ////        if (d.data.success === true) {
    ////            Clear(); GetRecordbyPaging();
    ////            alert("Company updated successfully.");
    ////            $("#Admin_Addupdate").modal("hide");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else if (d.data.success === false) {
    ////            alert("Company already added.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else {
    ////            alert("Please fill all Mandatory Fields.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////    },
    ////        function () {

    ////            alert("Error.");
    ////            $("#loader").css("display", 'none');
    ////        });
    ////}

    //$scope.Delete_DC_SparePartsAndAccessories = function (data) {

    //    //alert(JSON.stringify(data));
    //    var datalist = DeliveryChallanService.Delete_DC_SparePartsAndAccessories(data);
    //    datalist.then(function (d) {
    //        if (d.data.success === 1) {
    //            Get_DC_SparePartsAndAccessories();
    //        }
    //        else {
    //            alert("Error Occured.");
    //            $("#loader").css("display", 'none');
    //        }
    //    },
    //        function () {

    //            alert("Error.");
    //            $("#loader").css("display", 'none');
    //        });

    //}


    ////*****

























    //$("#DC_DATE").datepicker({ changeMonth: true, changeYear: true,/* maxDate: 0*/ });
    //$("#DC_DATE").datepicker("option", "dateFormat", "dd/mm/yy");
    //$("#DC_DATE").datepicker("option", "monthNamesShort", ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    //$("#DC_DATE").datepicker("option", "showMonthAfterYear", false);
    //$("#DC_DATE").datepicker("option", "yearRange", "2000:2060");


    ////$scope.GetStatus = function () {

    ////    //alert($scope.CUSTOMER_TYPE);
    ////    if ($scope.CUSTOMER_TYPE === 'Regular Customer') {
    ////        document.getElementById('Regular').style.display = "block";
    ////        document.getElementById('AERB').style.display = "none";
    ////    }
    ////    else if ($scope.CUSTOMER_TYPE === 'Medtronic Customer') {
    ////        document.getElementById('AERB').style.display = "none";
    ////        document.getElementById('Regular').style.display = "block";
    ////    }
    ////    else if ($scope.CUSTOMER_TYPE === 'Carestream Customer') {
    ////        document.getElementById('AERB').style.display = "none";
    ////        document.getElementById('Regular').style.display = "block";
    ////    }
    ////    else {
    ////        document.getElementById('AERB').style.display = "block";
    ////        document.getElementById('Regular').style.display = "none";
    ////    }
    ////}
    ////$scope.GoToPreviousNextPage = function (pagehistory) {
    ////    if (pagehistory === "Previous") {
    ////        history.back(); //Go to the previous page
    ////    }
    ////}

    //////new Section 
    ////$("#loader").css("display", '');

    ////$scope.PageNo = 1;
    ////$scope.pageSize = 10;
    ////$scope.FARMER_SEARCH = null;
    ////$scope.STATE_SEARCH = null;
    ////GetTotalcount();
    ////// GetState();

    ////function GetTotalcount() {
    ////    var SearchingConditions = GetSearchingConditions();
    ////    var getcount = DeliveryChallanService.TotalRecordCount(SearchingConditions);
    ////    getcount.then(function (d) {
    ////        $scope.totalRecordCount = d.data.success;
    ////        if ($scope.totalRecordCount === 0) {
    ////            $scope.AdminList = "";

    ////            //alert(JSON.stringify($scope.AdminList));
    ////        }
    ////        $("#loader").css("display", 'none');
    ////        initController();
    ////    }, function () {
    ////        $.notify("Error to load data...", "error");

    ////    });

    ////}


    ////function GetSearchingConditions() {

    ////    if ($scope.FARMER_SEARCH === undefined || $scope.FARMER_SEARCH === "" || $scope.FARMER_SEARCH === null) {
    ////        $scope.FARMER_SEARCH = null;
    ////    }
    ////    if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
    ////        $scope.STATE_SEARCH = null;
    ////    }


    ////    var SearchingConditions = {
    ////        PageNo: $scope.PageNo,
    ////        pageSize: $scope.pageSize,
    ////        FARMER_NAME: $scope.FARMER_SEARCH,
    ////        STATE_ID: $scope.STATE_SEARCH,
    ////        ROLE_ID: "Admin",
    ////        ROLE_ID1: "Subadmin"
    ////    };

    ////    return SearchingConditions;

    ////}

    ////function initController() {
    ////    // initialize to page 1
    ////    setPage(1);
    ////}

    ////$scope.setPage = function (page) {
    ////    setPage(page);
    ////};


    ////$scope.setPage = function (page) {
    ////    setPage(page);
    ////};
    ////function setPage(page) {

    ////    var totalPages = Math.ceil($scope.totalRecordCount / $scope.pageSize);
    ////    if (page < 0 || page > totalPages) {

    ////        $scope.pager.pages.length = 0;
    ////        $scope.FarmerList = {};

    ////        return;
    ////    }
    ////    $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
    ////    $scope.PageNo = $scope.pager.currentPage;

    ////    GetRecordbyPaging();
    ////}

    ////function GetRecordbyPaging() {
    ////    $("#loader").css("display", '');
    ////    var SearchingConditions = GetSearchingConditions();
    ////    var getrecord = DeliveryChallanService.getRecordbyPaging(SearchingConditions);
    ////    getrecord.then(function (response) {
    ////        $scope.AdminList = response.data;

    ////        $("#loader").css("display", 'none');
    ////    }, function () {
    ////        $.notify("Error to load data...", "error");
    ////        $("#loader").css("display", 'none');
    ////    });
    ////}

    ////function GetPager(totalItems, currentPage, pageSize) {
    ////    $scope.page = currentPage - 1;
    ////    currentPage = currentPage || 1;

    ////    pageSize = pageSize || 100;

    ////    var totalPages = Math.ceil(totalItems / pageSize);
    ////    var startPage, endPage;
    ////    if (totalPages <= 10) {

    ////        startPage = 1;
    ////        endPage = totalPages;
    ////    } else {

    ////        if (currentPage <= 6) {
    ////            startPage = 1;
    ////            endPage = 10;
    ////        } else if (currentPage + 4 >= totalPages) {
    ////            startPage = totalPages - 9;
    ////            endPage = totalPages;
    ////        } else {
    ////            startPage = currentPage - 5;
    ////            endPage = currentPage + 4;
    ////        }
    ////    }

    ////    var startIndex = (currentPage - 1) * pageSize;
    ////    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    ////    var pages = range(startPage, endPage);

    ////    return {
    ////        totalItems: totalItems,
    ////        currentPage: currentPage,
    ////        pageSize: pageSize,
    ////        totalPages: totalPages,
    ////        startPage: startPage,
    ////        endPage: endPage,
    ////        startIndex: startIndex,
    ////        endIndex: endIndex,
    ////        pages: pages
    ////    };
    ////}
    ////function range(start, end) {
    ////    var ans = [];
    ////    for (let i = start; i <= end; i++) {
    ////        ans.push(i);
    ////    }
    ////    return ans;
    ////}

    ////$scope.SearchAdmin = function () {

    ////    GetTotalcount();
    ////};

    ////function Clear() {
    ////    $scope.COMPANY_NAME = "";
    ////    $scope.AUTHORITY_NAME = "";
    ////    $scope.MOBILE_NO = "";
    ////    $scope.ALT_MOBILE_NO = "";
    ////    $scope.EMAIL_ID = "";
    ////    $scope.COMPANY_REG_ADDRESS = "";
    ////    $scope.COMPANY_COR_ADDRESS = "";
    ////    $scope.ZIP_CODE = "";
    ////    $scope.COMPANY_TYPE = "";
    ////    $scope.PAN_NO = "";
    ////    $scope.PNDT_NO = "";
    ////    $scope.GST_NO = "";
    ////    $scope.TIN_NO = "";


    ////}


    //////$scope.getAdmin = function (admin) {
    //////    var getAdmin = DeliveryChallanService.GetadminById(admin.EMP_ID);
    //////    getAdmin.then(function (response) {
    //////        $scope._Party = response.data;
    //////        $scope.EMP_ID = $scope._Party.EMP_ID;
    //////    });
    //////};

    ////$scope.AdminClick = function () {
    ////    $scope.Admin_Action = "Add Company";
    ////    Clear();
    ////    $("#Admin_Addupdate").modal("show");

    ////};

    ////$scope.getForUpdate = function (Admin) {

    ////    $scope.COMPANY_ID = Admin.COMPANY_ID;
    ////    $scope.COMPANY_NAME = Admin.COMPANY_NAME;
    ////    $scope.AUTHORITY_NAME = Admin.AUTHORITY_NAME;
    ////    $scope.MOBILE_NO = parseInt(Admin.MOBILE_NO);
    ////    $scope.ALT_MOBILE_NO = parseInt(Admin.ALT_MOBILE_NO);
    ////    $scope.EMAIL_ID = Admin.EMAIL_ID;
    ////    $scope.COMPANY_REG_ADDRESS = Admin.COMPANY_REG_ADDRESS;
    ////    $scope.COMPANY_COR_ADDRESS = Admin.COMPANY_COR_ADDRESS;
    ////    $scope.ZIP_CODE = parseInt(Admin.ZIP_CODE);
    ////    $scope.COMPANY_TYPE = Admin.COMPANY_TYPE;
    ////    $scope.PAN_NO = Admin.PAN_NO;
    ////    $scope.PNDT_NO = parseInt(Admin.PNDT_NO);
    ////    $scope.GST_NO = parseInt(Admin.GST_NO);
    ////    $scope.TIN_NO = parseInt(Admin.TIN_NO);


    ////    $scope.Admin_Action = "Update Company";

    ////    $("#Admin_Addupdate").modal("show");





    ////};


    ////$scope.AddAdmin = function () {
    ////    $("#loader").css("display", '');
    ////    tb_Admin = {

    ////        COMPANY_ID: $scope.COMPANY_ID,
    ////        COMPANY_NAME: $scope.COMPANY_NAME,
    ////        AUTHORITY_NAME: $scope.AUTHORITY_NAME,
    ////        MOBILE_NO: $scope.MOBILE_NO,
    ////        ALT_MOBILE_NO: $scope.ALT_MOBILE_NO,
    ////        EMAIL_ID: $scope.EMAIL_ID,
    ////        COMPANY_REG_ADDRESS: $scope.COMPANY_REG_ADDRESS,
    ////        COMPANY_COR_ADDRESS: $scope.COMPANY_COR_ADDRESS,
    ////        ZIP_CODE: $scope.ZIP_CODE,
    ////        COMPANY_TYPE: $scope.COMPANY_TYPE,
    ////        PAN_NO: $scope.PAN_NO,
    ////        PNDT_NO: $scope.PNDT_NO,
    ////        GST_NO: $scope.GST_NO,
    ////        TIN_NO: $scope.TIN_NO,

    ////    };
    ////    if ($scope.Admin_Action === "Add Company") {
    ////        AddAdminRecord(tb_Admin);
    ////    }
    ////    else if ($scope.Admin_Action === "Update Company") {
    ////        EditAdminRecord(tb_Admin);
    ////    }
    ////};


    ////function AddAdminRecord(tb_Admin) {
    ////    var datalist = DeliveryChallanService.AddAdmin(tb_Admin);
    ////    datalist.then(function (d) {
    ////        if (d.data.success === true) {
    ////            Clear(); GetRecordbyPaging();
    ////            alert("Company added successfully.");
    ////            $("#Admin_Addupdate").modal("hide");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else if (d.data.success === false) {
    ////            alert("Company already added.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else {
    ////            alert("Please fill all Mandatory Fields.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////    },
    ////        function () {

    ////            alert("Error.");
    ////            $("#loader").css("display", 'none');
    ////        });
    ////}


    ////function EditAdminRecord(tb_Admin) {
    ////    var datalist = DeliveryChallanService.EditAdmin(tb_Admin);
    ////    datalist.then(function (d) {
    ////        if (d.data.success === true) {
    ////            Clear(); GetRecordbyPaging();
    ////            alert("Company updated successfully.");
    ////            $("#Admin_Addupdate").modal("hide");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else if (d.data.success === false) {
    ////            alert("Company already added.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////        else {
    ////            alert("Please fill all Mandatory Fields.");
    ////            $("#loader").css("display", 'none');
    ////        }
    ////    },
    ////        function () {

    ////            alert("Error.");
    ////            $("#loader").css("display", 'none');
    ////        });
    ////}

    ////$scope.ChangeStatus = function () {
    ////    $("#loader").css("display", '');
    ////    var getStatus = DeliveryChallanService.ChangeStatus($scope.EMP_ID);
    ////    getStatus.then(function (response) {
    ////        Clear(); GetRecordbyPaging();
    ////        $("#Admin_View").modal("hide");
    ////        $("#loader").css("display", 'none');
    ////        $.notify(response.data, "error");
    ////    }, function () {
    ////        $.notify("Error to load data...", "error");
    ////        $("#loader").css("display", 'none');
    ////    });
    ////};


    ////$scope.AdminReceiptClick = function () {
    ////    $scope.AdminReceipt_Action = "Add Receipt";
    ////    Clear();
    ////    $("#PaymentReceipt").modal("show");
    ////    GetAllCustomers();
    ////};




});