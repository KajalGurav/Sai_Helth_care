app.service("QuotationService", function ($http) {




    this.GetCustomerList = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCustomerList",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCustomerList");
    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/AddQuotation",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/UpdateQuotation",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
    //this.GetLatestRecords = function (idType) {
    //    var response = $http({
    //        method: "GET",
    //        url: "/Quotation_Registration/GetLatestRecordByType",
    //        params: {
    //            idType: idType
    //        }
    //    });
    //    return response;
    //};

    this.GetForUpdate = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetQuotationDetailsForUpdate",
            params: {
                quotationID: id
            }
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

});




app.controller("RegularQuotationAddCtrl", function ($scope, QuotationService) {

    $("#loader").css("display", 'none');

    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    $scope.Q_ID = parseInt(PARAM[3].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    var Q_ID = $scope.Q_ID;
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

    if ($scope.Q_ID === 0) {
        $scope.Admin_Action = "Add Quotation";
        $scope.Action = "Add";
        if ($scope.CUSTOMER_ID !== 0) {
            $scope.IS_DISABLE = true;
            GetCustomerFirm();
        } else {
            $scope.IS_DISABLE = false;
            $scope.CUSTOMER_ID = null;
        }
        var editor = CKEDITOR.instances.NOTE;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('NOTE', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        GetLatestRecord();
        GetAllCustomer();
        GetAllBanks();

        //console.log($scope.AddPayment);
    }
    else {
        $scope.Admin_Action = "Update Quotation";
        $scope.Action = "Update";
        if ($scope.CUSTOMER_ID !== 0) {
            $scope.IS_DISABLE = true;
        }
        var getAdmin = QuotationService.GetForUpdate($scope.Q_ID);
        getAdmin.then(function (response) {
            $scope.CustomerQuotationDetailsList = response.data;
            getForUpdate($scope.CustomerQuotationDetailsList);
        });
    }
    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "Quotation",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var LatestDocNo = QuotationService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            //$scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            $scope.QUOTATION_NO = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.QUOTATION_DATE = today;
        });
        //console.log($scope.AddPayment);
    }

    function GetAllCustomer() {
        var getAdmin = QuotationService.GetCustomerList($scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.CustomerList = response.data;
        });
    }

    function GetAllBanks() {
        var getAdmin = QuotationService.GetCompanyBankDetails();
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }
    $scope.GetFirmChange = function () {
        if ($scope.CUSTOMER_ID) {
            GetCustomerFirm();  // Populate Firm Name list based on selected Customer
        }
    };


    function GetCustomerFirm() {
        var getAdmin = QuotationService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;

            // Automatically select the first firm if only one is available
            if ($scope.CustomerFirmList.length === 1) {
                $scope.FIRM_ID = $scope.CustomerFirmList[0].F_ID;  // Automatically select first firm
            }
        });
    }
    //function GetQoutationDate() {
    //    $scope.QUOTATION_DATE = DateTime.Now.Date.ToString("dd/MM/yyyy");
    //    //$("#STARTING_DATE1").attr("value",DateTime.Now.Date.ToString("dd/MM/yyyy"));
    //}



    function getForUpdate(admin) {
        //$scope.PO_DATE = $("#PO_DATE").val();
        $scope.QUOTATION_TYPE = admin.QUOTATION_TYPE;
        $scope.QUOTATION_NO = admin.QUOTATION_NO;
        $scope.QUOTATION_DATE = admin.QUOTATION_DATE;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_ID = admin.FIRM_ID;
        $scope.STATUS = admin.STATUS;
        $scope.PNDT_STATUS = admin.PNDT_STATUS;
        $scope.PNDT_NO = admin.PNDT_NO;
        $scope.PO_DATE = admin.PO_DATE.toString("dd-mm-yyyy");
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_ID = admin.FIRM_ID;
        if ($scope.PAGE_NAME === 'Customer') {
            $scope.isReadOnly = true;
        }

        if ($scope.CUSTOMER_ID) {
            GetCustomerFirm();
        }

        if (admin.PO_DATE !== "" && admin.PO_DATE !== null && admin.PO_DATE !== undefined) {
            var splitDate = admin.PO_DATE.split("/");
            //console.log(splitDate);
            var year = splitDate.pop();
            //console.log(year);
            var month = splitDate.pop();
            //console.log(month);
            var day = splitDate.pop();
            //console.log(day);
            var today = year + "-" + month + "-" + day;
            //console.log(today);
            //$('#datePicker').val(today);
            $("#PO_DATE").val(today);
        }
        //$('#PO_DATE').datepicker('setDate', $scope.PO_DATE);
        $scope.PAYMENT_TERM = parseFloat(admin.PAYMENT_TERM);
        $scope.NOTE = admin.NOTE.replace(/[\n\r]/g, '');;
        $scope.AERB_OR_PNDT = admin.AERB_OR_PNDT;
        $scope.Q_ID = admin.Q_ID;
        $scope.BANK_ID = parseInt(admin.BANK_ID);
        var editor = CKEDITOR.instances.NOTE;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('NOTE', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        window.CKEDITOR.instances.NOTE.setData($scope.NOTE);
        GetAllCustomer();
        GetCustomerFirm();
        GetAllBanks();

        $scope.Admin_Action = "Update Quotation";
    };

    $scope.AddUpdateAdmin = function () {

        $scope.PO_DATE = $("#PO_DATE").val();
        //alert($("#PO_DATE").val());
        //alert($scope.PO_DATE);

        tb_Admin = {
            Q_ID: parseInt($scope.Q_ID),
            QUOTATION_TYPE: $scope.QUOTATION_TYPE,
            QUOTATION_NO: $scope.QUOTATION_NO,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            FIRM_ID: $scope.FIRM_ID,
            STATUS: $scope.STATUS,
            QUOTATION_DATE: $scope.QUOTATION_DATE,
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.PO_DATE,
            PAYMENT_TERM: $scope.PAYMENT_TERM,
            //NOTE: $scope.NOTE,
            AERB_OR_PNDT: $scope.AERB_OR_PNDT,
            BANK_ID: $scope.BANK_ID
            , NOTE: CKEDITOR.instances.NOTE.getData()

        };

        if ($scope.Admin_Action === "Add Quotation") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Quotation") {
            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = QuotationService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("Quotation added successfully.");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
                    window.location.href = "/Quotation_Registration/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=0";
                }
                //window.location.href = '/Quotation_Registration/Index/';
            }
            else if (d.data.success === false) {
                alert("Quotation already added.");
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
        var datalist = QuotationService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("Quotation Updated successfully.");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
                    window.location.href = "/Quotation_Registration/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=0";
                }
            }
            else if (d.data.success === false) {
                alert("Quotation already Updated.");
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



    function Clear() {

        $scope.QUOTATION_TYPE = "";
        //$scope.QUOTATION_NO = "";
        $scope.CUSTOMER_ID = null;
        $scope.FIRM_ID = null;
        //$scope.QUOTATION_DATE = "";
        $scope.PNDT_STATUS = "";
        $scope.PNDT_NO = "";
        $scope.PO_DATE = "";
        $scope.PAYMENT_TERM = "";
        $scope.NOTE = "";
        $scope.AERB_OR_PNDT = "";
        $scope.BANK_ID = null;
        $scope.STATUS = "";
        CKEDITOR.instances.NOTE.setData($scope.NOTE);

        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }

    $scope.Clearall = function () {

        //Clear();
        if ($scope.PAGE_NAME === "Master") {
            //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
            window.location.href = "/Quotation_Registration/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=0";
        }

    };



    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    var editor = CKEDITOR.instances.NOTE;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('NOTE', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });

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

});