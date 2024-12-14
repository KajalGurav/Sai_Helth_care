﻿app.service("PaymentService", function ($http) {



    this.GetLatestRecords = function (tb_params) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };


    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/AddEditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetFirmList",
            params: {
                id: id
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

    this.GetProducDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetProducDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetProductDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetCustomerQuoteDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
        //return $http.get("/Quotation_Registration/GetProductDetails");

    };

    this.GetPaymentReceiptDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetPaymentReceiptDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    }
});


app.controller("PaymentCtrl", function ($scope, PaymentService) {

    $("#loader").css("display", 'none');
    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    $scope.FIRM_ID = parseInt(PARAM[3].split('=').pop());
    $scope.RECEIPT_NO = PARAM[4].split('=').pop();
    $scope.RECEIPT_NO = PARAM[4].split('=').pop();
    $scope.RECEIPT_ID = parseInt(PARAM[5].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    console.log(PARAM);
    if ($scope.PAGE_NAME === "Customer") {
        $scope.isCustomerNameVisible = false;  // Hide CUSTOMER_NAME field
    } else {
        $scope.isCustomerNameVisible = true;   // Show CUSTOMER_NAME field
    }


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


    if ($scope.RECEIPT_ID === 0) {
        $scope.Admin_Action = "Add Payment Receipt";
        $scope.Action = "Add";

        tb_params = {
            GenerateNoFor: "Receipt",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var LatestDocNo = PaymentService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            $scope.RECEIPT_NO = $scope.LatestRecord;
        });
        $scope.Admin_Action = "Add Payment Receipt";
        //document.getElementById("RECEIPT_NO").value = $scope.RECEIPT_NO;

        $("#PaymentReceipt").modal("show");
        if ($scope.PAYMENT_TYPE == "" || $scope.PAYMENT_TYPE == undefined || $scope.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }
        GetLatestRecord();
        GetAllCustomers();
        GetAllCustomerFirm();
    }

    else {
        $scope.Admin_Action = "Update Payment Receipt";
        $scope.Action = "Update";

        tb_Admin = {
            R_ID: $scope.RECEIPT_ID,
            PAYMENT_RECEIPT_NO: $scope.RECEIPT_NO,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID
        }
        var getReceiptList = PaymentService.GetPaymentReceiptDetails(tb_Admin);
        getReceiptList.then(function (response) {
            $scope.PaymentReceiptList = response.data;
            console.log($scope.PaymentReceiptList);
            getReceiptForUpdate($scope.PaymentReceiptList);

        });
    }

    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "Receipt",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var LatestDocNo = PaymentService.GetLatestRecords(tb_params);
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
    $scope.CUSTOMER_TYPE_ID = getCustomerTypeId($scope.CUSTOMER_TYPE);
    function getCustomerTypeId(customerType) {
        switch (customerType) {
            case "Regular": return 1;
            case "AERB": return 2;
            case "Medtronic": return 3;
            case "Carestream": return 4;
            case "Mindray": return 5;
            default: return null;
        }
    }

    function GetAllCustomers() {
        var getAdmin = PaymentService.GetAllCustomer(parseInt($scope.CUSTOMER_TYPE_ID));
        getAdmin.then(function (response) {
            $scope.PaymentCustomerList = response.data;
            // After fetching customers, auto-fill the customer name based on the CUSTOMER_ID
            autoFillCustomerName();
        });
    }
    function autoFillCustomerName() {
        if ($scope.CUSTOMER_ID) {
            var selectedCustomer = $scope.PaymentCustomerList.find(function (customer) {
                return customer.Customer_ID === $scope.CUSTOMER_ID;
            });

            if (selectedCustomer) {
                $scope.CUSTOMER_NAME = selectedCustomer.CUSTOMER_NAME;  // Auto-fill customer name
            }
        }
    }
    $scope.GetCustomerChange = function () {
        if (!$scope.CUSTOMER_NAME) {
            $scope.FIRM_NAME = "";
            $scope.FIRM_ID = null;
            return;
        }

        var selectedCustomer = $scope.PaymentCustomerList.find(function (customer) {
            return customer.CUSTOMER_NAME === $scope.CUSTOMER_NAME;
        });

        if (selectedCustomer) {
            $scope.CUSTOMER_ID = selectedCustomer.Customer_ID;
            $scope.FIRM_NAME = selectedCustomer.FIRM_NAME;
            $scope.FIRM_ID = selectedCustomer.F_ID;
            console.log(selectedCustomer);
            GetAllCustomerFirm();
        } else {
            $scope.CUSTOMER_ID = null;
            $scope.FIRM_NAME = null;
            $scope.FIRM_ID = null;
        }
    };

    $scope.onCustomerNameChange = function () {
        console.log("CUSTOMER_NAME changed to:", $scope.CUSTOMER_NAME);  // Debug log

        if (!$scope.CUSTOMER_NAME) {
            console.log("No customer name provided.");  // Debug log
            return;
        }

        // Find the selected customer based on customer name
        var selectedCustomer = $scope.PaymentCustomerList.find(function (customer) {
            return customer.CUSTOMER_NAME.trim().toLowerCase() === $scope.CUSTOMER_NAME.trim().toLowerCase();
        });

        if (selectedCustomer) {
            console.log("Selected customer details:", selectedCustomer);  // Debug log
            $scope.CUSTOMER_ID = selectedCustomer.Customer_ID;
            // Fetch firm's details for the selected customer
            GetAllCustomerFirm(selectedCustomer.Customer_ID);
        } else {
            console.log("No matching customer found.");  // Debug log
            $scope.CUSTOMER_ID = null;
            $scope.FIRM_NAME = null;
            $scope.FIRM_ID = null;
        }
    };




    function GetAllCustomerFirm() {
        var getAdmin = PaymentService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.PaymentCustomerFirmList = response.data;

            // Check if there is at least one firm and pre-select the firm if available
            if ($scope.PaymentCustomerFirmList.length > 0) {
                // Pre-select the first firm or a default based on your logic
                $scope.FIRM_ID = $scope.PaymentCustomerFirmList[0].F_ID; // Select the first firm by default
                $scope.FIRM_NAME = $scope.PaymentCustomerFirmList[0].FIRM_NAME; // Set the firm name
            }
        });
    }


    $scope.GetFirmChange = function () {
        if ($scope.FIRM_ID) {  // Check if FIRM_ID is selected
            console.log($scope.FIRM_ID);
            var firm = $scope.PaymentCustomerFirmList.find(x => x.F_ID === $scope.FIRM_ID);

            if (firm) {
                $scope.FIRM_NAME = firm.FIRM_NAME;
                console.log(firm);
            }
        }

        // Reset or update fields based on the selected firm
        GetAllCustomers();  // Refresh customer data

        // Clear payment-related fields
        $scope.PAYMENT_RECEIPT_TYPE = "";
        $scope.RECORD_ID = "";
        $scope.PAYMENT_TYPE = "";
        $scope.RECIEPT_FOR = "";
        $scope.TOTAL_AMOUNT = "";
        $scope.AMOUNT_RECEIVED = "";
        $scope.AMOUNT_REMAINING = "";
        $scope.TXN_ID = "";
        $scope.CustomerRecordList = "";

        // Control the visibility of elements based on payment type
        if (!$scope.PAYMENT_TYPE || $scope.PAYMENT_TYPE === "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }

        // Show or hide transaction date based on payment type
        if ($scope.PAYMENT_TYPE === "Cheque") {
            $("#TranscrtionDate").css("display", "block");
        } else {
            $("#TranscrtionDate").css("display", "none");
        }
    };



    $scope.GetReferenceNo = function () {
        Clear();
        var receiptType = $scope.PAYMENT_RECEIPT_TYPE;
        tb_Admin = {
            TYPE: receiptType,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID
        }
        var getAdmin = PaymentService.GetReferenceNoByType(tb_Admin);
        getAdmin.then(function (response) {
            $scope.CustomerRecordList = response.data;
            $scope.RECORD_ID = $scope.CustomerRecordList[0].Quot_ID;
            console.log($scope.CustomerRecordList);
            $scope.GetProductDetails();
        });
    }

    $scope.GetProductDetails = function () {
        Clear();
        if ($scope.RECORD_ID === null || $scope.RECORD_ID === undefined || $scope.RECORD_ID === "") {
            return false;
        }
        var DocType = $scope.PAYMENT_RECEIPT_TYPE;
        var recordList = $scope.CustomerRecordList.filter(x => x.Quot_ID == $scope.RECORD_ID)[0];
        var DocNo = recordList.REF_NO_LIST;
        var QuotId = $scope.RECORD_ID;
        if (DocNo === null || DocNo === undefined) {
            $scope.RECIEPT_FOR = "";
            $scope.TOTAL_AMOUNT = "";
            $scope.AMOUNT_RECEIVED = "";
            $scope.AMOUNT_REMAINING = "";
            return;
        }
        tb_Admin = {
            PTYPE: DocType,
            ID: DocNo,
            Q_ID: parseInt(QuotId),
            CUSTOMER_TYPE: $scope.CUSTOMER_TYPE_ID,
            CUSTOMER_ID: $scope.CUSTOMER_ID
        }

        if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
            var recordList = $scope.CustomerRecordList.filter(x => x.Quot_ID == $scope.RECORD_ID)[0];
            $scope.RECIEPT_FOR = recordList.RECEIPT_FOR;
            var getAdmin1 = PaymentService.GetProductDetails(tb_Admin);
            getAdmin1.then(function (response) {
                $scope.ProductDetList = response.data;
                $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.AMOUNT_RECEIVED = "";
                $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.Actual_Remaining_Amount = $scope.TOTAL_AMOUNT;
            });
        }
        else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
            var getAdmin = PaymentService.GetProducDetails(tb_Admin);
            getAdmin.then(function (response) {
                $scope.ProductDetailsList = response.data;
                $scope.RECIEPT_FOR = $scope.ProductDetailsList[0].PRODUCTNAME;
                $scope.TOTAL_AMOUNT = $scope.ProductDetailsList[0].TOTAL_AMOUNT;
                $scope.AMOUNT_RECEIVED = $scope.ProductDetailsList[0].AMOUNT_RECEIVED;
                $scope.AMOUNT_REMAINING = $scope.ProductDetailsList[0].AMOUNT_REMAINING;
                $scope.Actual_Remaining_Amount = $scope.ProductDetailsList[0].AMOUNT_REMAINING;
            });
        }

        else if ($scope.PAYMENT_RECEIPT_TYPE === "Invoice") {
            var recordList = $scope.CustomerRecordList.filter(x => x.Quot_ID == $scope.RECORD_ID)[0];
            $scope.RECIEPT_FOR = recordList.RECEIPT_FOR;
            var getAdmin1 = PaymentService.GetProductDetails(tb_Admin);
            getAdmin1.then(function (response) {
                $scope.ProductDetList = response.data;
                $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.AMOUNT_RECEIVED = "";
                $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.Actual_Remaining_Amount = $scope.TOTAL_AMOUNT;
                $scope.RECORD_ID1 = $scope.ProductDetList[0].Q_ID;
            });
        }
    }

    $scope.CalRemainingAmount = function () {
        if ($scope.AMOUNT_RECEIVED === 0 || $scope.AMOUNT_RECEIVED === undefined || $scope.AMOUNT_RECEIVED === null) {
            $scope.AMOUNT_REMAINING = $scope.Actual_Remaining_Amount;
        }
        else {
            console.log($scope.AMOUNT_RECEIVED)
            console.log($scope.Actual_Remaining_Amount)

            $scope.AMOUNT_REMAINING = $scope.Actual_Remaining_Amount - $scope.AMOUNT_RECEIVED;
            console.log($scope.AMOUNT_REMAINING)
        }
    }

    function Clear() {

        $scope.PAYMENT_TYPE = "";
        $scope.RECIEPT_FOR = "";
        $scope.TOTAL_AMOUNT = "";
        $scope.AMOUNT_RECEIVED = "";
        $scope.AMOUNT_REMAINING = "";
        $scope.TXN_ID = "";
        //$scope.Operation = "";
    }

    $scope.onPaymentType = function () {
        //alert($scope.PAYMENT_TYPE);
        if ($scope.PAYMENT_TYPE == "" || $scope.PAYMENT_TYPE == undefined || $scope.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }

        if ($scope.PAYMENT_TYPE == "Cheque") {
            $("#TranscrtionDate").css("display", "block");
        } else {
            $("#TranscrtionDate").css("display", "none");
        }
    }

    function getReceiptForUpdate(admin) {
        //Clear();
        if (admin[0].PAYMENT_TYPE == "" || admin[0].PAYMENT_TYPE == undefined || admin[0].PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }

        if (admin[0].PAYMENT_TYPE == "Cheque") {
            $("#TranscrtionDate").css("display", "block");
        } else {
            $("#TranscrtionDate").css("display", "none");
        }


        $scope.R_ID = parseInt(admin[0].R_ID);
        $scope.RECEIPT_NO = admin[0].PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_ID = parseInt(admin[0].CUSTOMER_ID);
        $scope.CUSTOMER_NAME = $scope.PaymentCustomerList[0].CUSTOMER_NAME;
        //$scope.CUSTOMER_TYPE = admin[0].CUSTOMER_TYPE;
        $scope.PAYMENT_RECEIPT_TYPE = admin[0].PAYMENT_RECEIPT_TYPE;
        //$scope.RECORD_ID = admin[0].PAYMENT_REF_NO;
        $scope.RECORD_ID = parseInt(admin[0].Q_ID);

        $scope.PAYMENT_TYPE = admin[0].PAYMENT_TYPE;
        $scope.RECIEPT_FOR = admin[0].RECIEPT_FOR;
        $scope.TOTAL_AMOUNT = parseInt(admin[0].PAYMENT_AMOUNT);
        $scope.AMOUNT_RECEIVED = parseInt(admin[0].AMOUNT_RECEIVED);
        $scope.AMOUNT_REMAINING = parseInt(admin[0].AMOUNT_REMAINING);
        $scope.Actual_Remaining_Amount = parseInt(admin[0].AMOUNT_REMAINING) + parseInt(admin[0].AMOUNT_RECEIVED);
        $scope.Operation = "Update";
        $scope.FIRM_ID = admin[0].FIRM_ID;
        $scope.FIRM_NAME = admin[0].FIRM_NAME;
        $scope.TXN_ID = admin[0].TXN_ID;
        $scope.CHEQUE_DATE = admin[0].CHEQUE_DATE;

        $scope.Admin_Action = "Update Payment Receipt";

        GetAllCustomers();
        GetAllCustomerFirm();
        $scope.GetReferenceNo();
        $scope.GetCustomerChange();
    };

    $scope.Cancel = function () {
        if ($scope.PAGE_NAME === "Master") {
            window.location.href = "/PaymentReceipt/Index?CustType=" + CUSTOMER_TYPE;
        }
        else if ($scope.PAGE_NAME === "Customer") {
            window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=6";
        }
    }

    $scope.AddUpdatePayment = function () {
        $("#loader").css("display", '');
        if (($scope.PAYMENT_TYPE != "" && $scope.PAYMENT_TYPE != undefined && $scope.PAYMENT_TYPE != "Cash") && ($scope.TXN_ID == "" || $scope.TXN_ID == undefined)) {
            alert("Please enter Cheque No./Transaction Id!");
            return false;
        }

        var recordList = $scope.CustomerRecordList.filter(x => x.Quot_ID == $scope.RECORD_ID)[0];

        if ($scope.PAYMENT_RECEIPT_TYPE === "Invoice") {
            $scope.QT_ID = parseInt($scope.RECORD_ID1);
        }
        else {
            $scope.QT_ID = parseInt($scope.RECORD_ID);
        }

        $scope.CHEQUE_DATE = $("#CHEQUE_DATE").val();

        var DocNo = recordList.REF_NO_LIST;
        if ($scope.Admin_Action === "Add Payment Receipt") {
            $scope.Operation = "Insert";
            tb_Admin = {
                PAYMENT_RECEIPT_NO: $scope.RECEIPT_NO,
                CUSTOMER_ID: $scope.CUSTOMER_ID,
                CUSTOMER_NAME: $scope.CUSTOMER_NAME,
                FIRM_ID: $scope.FIRM_ID,
                FIRM_NAME: $scope.FIRM_NAME,
                PAYMENT_REF_NO: DocNo,
                //Q_ID: parseInt($scope.RECORD_ID),
                Q_ID: $scope.QT_ID,
                PAYMENT_RECEIPT_TYPE: $scope.PAYMENT_RECEIPT_TYPE,
                PAYMENT_TYPE: $scope.PAYMENT_TYPE,
                RECIEPT_FOR: $scope.RECIEPT_FOR,
                PAYMENT_AMOUNT: $scope.TOTAL_AMOUNT,
                AMOUNT_RECEIVED: $scope.AMOUNT_RECEIVED,
                AMOUNT_REMAINING: $scope.AMOUNT_REMAINING,
                TXN_ID: $scope.TXN_ID,
                CHEQUE_DATE: $scope.CHEQUE_DATE,
                Operation: $scope.Operation
            };
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Payment Receipt") {
            tb_Admin = {
                R_ID: $scope.R_ID,
                PAYMENT_RECEIPT_NO: $scope.RECEIPT_NO,
                CUSTOMER_ID: $scope.CUSTOMER_ID,
                CUSTOMER_NAME: $scope.CUSTOMER_NAME,
                FIRM_ID: $scope.FIRM_ID,
                FIRM_NAME: $scope.FIRM_NAME,
                PAYMENT_REF_NO: DocNo,
                //Q_ID: parseInt($scope.RECORD_ID),
                Q_ID: $scope.QT_ID,
                PAYMENT_RECEIPT_TYPE: $scope.PAYMENT_RECEIPT_TYPE,
                PAYMENT_TYPE: $scope.PAYMENT_TYPE,
                RECIEPT_FOR: $scope.RECIEPT_FOR,
                PAYMENT_AMOUNT: $scope.TOTAL_AMOUNT,
                AMOUNT_RECEIVED: $scope.AMOUNT_RECEIVED,
                AMOUNT_REMAINING: $scope.AMOUNT_REMAINING,
                TXN_ID: $scope.TXN_ID,
                CHEQUE_DATE: $scope.CHEQUE_DATE,
                Operation: $scope.Operation
            };
            EditAdminRecord(tb_Admin);
        }
    };

    function AddAdminRecord(tb_Admin) {
        var datalist = PaymentService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                //Clear(); //GetRecordbyPaging();
                alert("Payment Receipt added successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/PaymentReceipt/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=6";
                }
                //window.location.pathname;
            }
            else if (d.data.success === false) {
                alert("Payment Receipt already added.");
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
        var datalist = PaymentService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                //Clear(); //GetRecordbyPaging();
                alert("Payment Receipt updated successfully.");
                //$("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    window.location.href = "/PaymentReceipt/Index?CustType=" + CUSTOMER_TYPE;
                }
                else if ($scope.PAGE_NAME === "Customer") {
                    window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=6";
                }
                //window.location.pathname;
            }
            else if (d.data.success === false) {
                alert("Payment Receipt already added.");
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

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

});