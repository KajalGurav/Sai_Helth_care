
app.service("adminService", function ($http) {
    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };



    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };


    this.GetCompanyDetails = function () {
        return $http.get("/Customer_Master/GetCompanyDetails");
    };

    this.UpdateQuotationDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/UpdateQuotationPODetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
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

    this.GetAllCustomer = function () {
        var response = $http({
            method: "GET",
            url: "/Customer_Master/GetCustomerList",
        });
        return response;
    };

    this.GetLatestRecords = function (idType) {
        var response = $http({
            method: "GET",
            url: "/Customer_Master/GetLatestRecordByType",
            params: {
                idType: idType
            }
        });
        return response;
    };




});

app.controller('adminCtrl', function ($scope, adminService) {

    $("#loader").css("display", 'none');

    $scope.GetStatus = function () {

        //alert($scope.CUSTOMER_TYPE);
        if ($scope.CUSTOMER_TYPE === 'Regular Customer') {
            document.getElementById('Regular').style.display = "block";
            document.getElementById('AERB').style.display = "none";
        }
        else if ($scope.CUSTOMER_TYPE === 'Medtronic Customer') {
            document.getElementById('AERB').style.display = "none";
            document.getElementById('Regular').style.display = "block";
        }
        else if ($scope.CUSTOMER_TYPE === 'Carestream Customer') {
            document.getElementById('AERB').style.display = "none";
            document.getElementById('Regular').style.display = "block";
        }
        else {
            document.getElementById('AERB').style.display = "block";
            document.getElementById('Regular').style.display = "none";
        }
    }
    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    //new Section 
    /*$("#loader").css("display", '');*/

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    $scope.CUSTOMER_NAME = null;
    GetTotalcount();
    // GetState();

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = adminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.AdminList = "";

                //alert(JSON.stringify($scope.AdminList));
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
        if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
            $scope.STATE_SEARCH = null;
        }
        if ($scope.PNDT_SEARCH === undefined || $scope.PNDT_SEARCH === "" || $scope.PNDT_SEARCH === null) {
            $scope.PNDT_SEARCH = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            STATE_ID: $scope.STATE_SEARCH,
            PNDT_NO: $scope.PNDT_SEARCH,
            ROLE_ID: "Admin",
            ROLE_ID1: "Subadmin"
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

            $scope.pager.pages.length = 0;
            $scope.FarmerList = {};

            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;

        GetRecordbyPaging();
    }

    function GetRecordbyPaging() {
        /* $("#loader").css("display", '');*/
        var SearchingConditions = GetSearchingConditions();
        var getrecord = adminService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.AdminList = response.data;

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
        $scope.COMPANY_NAME = "";
        $scope.AUTHORITY_NAME = "";
        $scope.MOBILE_NO = "";
        $scope.ALT_MOBILE_NO = "";
        $scope.EMAIL_ID = "";
        $scope.COMPANY_REG_ADDRESS = "";
        $scope.COMPANY_COR_ADDRESS = "";
        $scope.ZIP_CODE = "";
        $scope.COMPANY_TYPE = "";
        $scope.PAN_NO = "";
        $scope.PNDT_NO = "";
        $scope.GST_NO = "";
        $scope.TIN_NO = "";


    }


    //$scope.getAdmin = function (admin) {
    //    var getAdmin = AdminService.GetadminById(admin.EMP_ID);
    //    getAdmin.then(function (response) {
    //        $scope._Party = response.data;
    //        $scope.EMP_ID = $scope._Party.EMP_ID;
    //    });
    //};

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Company";
        Clear();
        $("#Admin_Addupdate").modal("show");

    };

    $scope.getForUpdate = function (Admin) {

        $scope.COMPANY_ID = Admin.COMPANY_ID;
        $scope.COMPANY_NAME = Admin.COMPANY_NAME;
        $scope.AUTHORITY_NAME = Admin.AUTHORITY_NAME;
        $scope.MOBILE_NO = parseInt(Admin.MOBILE_NO);
        $scope.ALT_MOBILE_NO = parseInt(Admin.ALT_MOBILE_NO);
        $scope.EMAIL_ID = Admin.EMAIL_ID;
        $scope.COMPANY_REG_ADDRESS = Admin.COMPANY_REG_ADDRESS;
        $scope.COMPANY_COR_ADDRESS = Admin.COMPANY_COR_ADDRESS;
        $scope.ZIP_CODE = parseInt(Admin.ZIP_CODE);
        $scope.COMPANY_TYPE = Admin.COMPANY_TYPE;
        $scope.PAN_NO = Admin.PAN_NO;
        $scope.PNDT_NO = parseInt(Admin.PNDT_NO);
        $scope.GST_NO = parseInt(Admin.GST_NO);
        $scope.TIN_NO = parseInt(Admin.TIN_NO);


        $scope.Admin_Action = "Update Company";

        $("#Admin_Addupdate").modal("show");





    };


    $scope.AddAdmin = function () {
        /* $("#loader").css("display", '');*/
        tb_Admin = {

            COMPANY_ID: $scope.COMPANY_ID,
            COMPANY_NAME: $scope.COMPANY_NAME,
            AUTHORITY_NAME: $scope.AUTHORITY_NAME,
            MOBILE_NO: $scope.MOBILE_NO,
            ALT_MOBILE_NO: $scope.ALT_MOBILE_NO,
            EMAIL_ID: $scope.EMAIL_ID,
            COMPANY_REG_ADDRESS: $scope.COMPANY_REG_ADDRESS,
            COMPANY_COR_ADDRESS: $scope.COMPANY_COR_ADDRESS,
            ZIP_CODE: $scope.ZIP_CODE,
            COMPANY_TYPE: $scope.COMPANY_TYPE,
            PAN_NO: $scope.PAN_NO,
            PNDT_NO: $scope.PNDT_NO,
            GST_NO: $scope.GST_NO,
            TIN_NO: $scope.TIN_NO,

        };
        if ($scope.Admin_Action === "Add Company") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Company") {
            EditAdminRecord(tb_Admin);
        }
    };


    function AddAdminRecord(tb_Admin) {
        var datalist = adminService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Company added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Company already added.");
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
        var datalist = adminService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Company updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Company already added.");
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

    $scope.ChangeStatus = function () {
        /*  $("#loader").css("display", '');*/
        var getStatus = adminService.ChangeStatus($scope.EMP_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#Admin_View").modal("hide");
            $("#loader").css("display", 'none');
            $.notify(response.data, "error");
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };


    $scope.AdminReceiptClick = function () {
        $scope.AdminReceipt_Action = "Add Receipt";
        Clear();
        $("#PaymentReceipt").modal("show");
        GetAllCustomers();
    };
    function GetAllCustomers() {

        var getAdmin = adminService.GetAllCustomer();
        getAdmin.then(function (response) {
            $scope.PaymentCustomerList = response.data;
        });
    }

    $scope.GetCustomerChange = function () {
        console.log($scope.CUSTOMER_ID);
        var id = $scope.CUSTOMER_ID;
        var Customer = $scope.PaymentCustomerList.filter(x => x.Customer_ID == id)[0];
        $scope.CUSTOMER_NAME = Customer.CUSTOMER_NAME;
        $scope.CUSTOMER_TYPE = Customer.CUSTOMER_TYPE;
        console.log(Customer);
        GetAllCustomerFirm();
    };
    function GetAllCustomerFirm() {
        var getAdmin = adminService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.PaymentCustomerFirmList = response.data;

        });
    }

    //$scope.exportToExcel = function () {
    //    CustomerMasterExport();
    //}
    //function ProductStockExport() {
    //    var SearchingConditions = GetSearchingConditions();
    //    var getrecord = adminService.CustomerMasterExport(SearchingConditions);
    //    getrecord.then(function (response) {
    //        if (response.status === 404) {
    //            alert("No Data Found");
    //            return;
    //        }
    //        else {
    //            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
    //            var link = document.createElement('a');
    //            link.href = window.URL.createObjectURL(blob);
    //            link.download = 'Customer Report.xls';
    //            link.click();
    //            $("#loader").css("display", 'none')
    //        }
    //    }, function () {
    //        $("#loader").css("display", 'none');
    //    });
    function GetSearchingConditions() {

        if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.CUSTOMER_NAME = null;
        }
        //$scope.START_DATE = $("#START_DATE").val();
        //$scope.END_DATE = $("#END_DATE").val();

        //if ($scope.START_DATE === undefined || $scope.START_DATE === '') {
        //    $scope.START_DATE = null;
        //}
        //if ($scope.END_DATE === undefined || $scope.END_DATE === '') {
        //    $scope.END_DATE = null;
        //}

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME,
            START_DATE: $scope.START_DATE,
            END_DATE: $scope.END_DATE,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME

        };

        return SearchingConditions;

    }

    $scope.CustomerMasterExport = function () {
        GetTotalcount();
    };
    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = adminService.TotalRecordCount(SearchingConditions);
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


        $scope.exportToExcel = function () {
            CustomerMasterExport();
        };

        function CustomerMasterExport() {
            var SearchingConditions = GetSearchingConditions();
            adminService.CustomerMasterExport(SearchingConditions).then(function (response) {
                if (response.status === 404) {
                    alert("No Data Found");
                    return;
                } else {
                    var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'Customer_Master_Report.xls';
                    link.click();
                }
            }, function () {
                $.notify("Error during export...", "error");
            }).finally(function () {
                $("#loader").css("display", 'none');
            });

        });