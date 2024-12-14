app.service("VendorAddEditService", function ($http) {




    this.GetVendorList = function (id) {
        var response = $http({
            method: "GET",
            url: "/VendorPO/GetVendorList",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCustomerList");
    };

    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/AddUpdateVendorPO",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetForUpdate = function (id, CUSTOMER_TYPE_ID) {
        var response = $http({
            method: "GET",
            url: "/VendorPO/GetVendorPODetailsForUpdate",
            params: {
                VPO_ID: id,
                CUSTOMER_TYPE_ID: CUSTOMER_TYPE_ID
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
});




app.controller("VendorPOAddEditCtrl", function ($scope, VendorAddEditService) {

    $("#loader").css("display", 'none');
    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.VENDOR_ID = parseInt(PARAM[2].split('=').pop());
    $scope.VPO_ID = parseInt(PARAM[3].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var VENDOR_ID = $scope.VENDOR_ID;
    var VPO_ID = $scope.VPO_ID;
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



    var editor = CKEDITOR.instances.TERMS_AND_CONDITIONS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('TERMS_AND_CONDITIONS', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });

    
    if ($scope.VPO_ID === 0) {
        $scope.Admin_Action = "Add PO";
        $scope.Action = "Add";

        $scope.VENDOR_ID = null;
       
        var editor = CKEDITOR.instances.TERMS_AND_CONDITIONS;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('TERMS_AND_CONDITIONS', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        GetLatestRecord();
        GetAllVendors();
       
        
    }
    else {
        $scope.Admin_Action = "Update PO";
        $scope.Action = "UPDATE";
        
        var getAdmin = VendorAddEditService.GetForUpdate($scope.VPO_ID, $scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.CustomerQuotationDetailsList = response.data;
            getForUpdate($scope.CustomerQuotationDetailsList);
        });
    }
    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "VendorPO",
            CustomerTypeId: parseInt($scope.CUSTOMER_TYPE_ID)
        }
        var LatestDocNo = VendorAddEditService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            $scope.VPO_NUMBER = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.VPO_DATE = today;
        });
        //console.log($scope.AddPayment);
    }

    function GetAllVendors() {
        var getAdmin = VendorAddEditService.GetVendorList();
        getAdmin.then(function (response) {
            $scope.VendorList = response.data;
        });
    }

    function getForUpdate(admin) {
        var editor = CKEDITOR.instances.TERMS_AND_CONDITIONS;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('TERMS_AND_CONDITIONS', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        $scope.VPO_NUMBER = admin.VPO_NUMBER;
        $scope.VPO_DATE = admin.VPO_DATE;
        $("#VPO_DATE").val(admin.VPO_DATE);
        $scope.VENDOR_ID = admin.VENDOR_ID;
        $scope.TERMS_AND_CONDITIONS = admin.TERMS_AND_CONDITIONS;
        $scope.VPO_ID = admin.VPO_ID;
        
        window.CKEDITOR.instances.TERMS_AND_CONDITIONS.setData($scope.TERMS_AND_CONDITIONS);
        GetAllVendors();

        $scope.Admin_Action = "Update PO";
    };

    $scope.AddUpdateAdmin = function () {
        if ($("#VPO_DATE").val() === undefined || $("#VPO_DATE").val() === null || $("#VPO_DATE").val() === "") {
            alert("Select PO Date!");
            return;
        }

        $scope.VPO_DATE = $("#VPO_DATE").val();
        

        tb_Admin = {
            VPO_ID: $scope.VPO_ID,
            VPO_NUMBER: $scope.VPO_NUMBER,
            VENDOR_ID: $scope.VENDOR_ID,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            VPO_DATE: $scope.VPO_DATE,
            TERMS_AND_CONDITIONS: CKEDITOR.instances.TERMS_AND_CONDITIONS.getData(),
            ACTION: $scope.Action

        };

        if ($scope.Admin_Action === "Add PO") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update PO") {
            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = VendorAddEditService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("PO added successfully.");
                $("#loader").css("display", 'none');

                if ($scope.PAGE_NAME === "Master") {
                    //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
                    window.location.href = "/VendorPO/Index?CustType=" + CUSTOMER_TYPE;
                }
                //window.location.href = '/Quotation_Registration/Index/';
            }
            else if (d.data.success === false) {
                alert("PO already added.");
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
        var datalist = VendorAddEditService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("PO Updated successfully.");
                $("#loader").css("display", 'none');
                if ($scope.PAGE_NAME === "Master") {
                    //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
                    window.location.href = "/VendorPO/Index?CustType=" + CUSTOMER_TYPE;
                }
            }
            else if (d.data.success === false) {
                alert("PO already Updated.");
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

        $scope.VENDOR_ID = "";
        $scope.VPO_DATE = "";
        $scope.TERMS_AND_CONDITIONS = "";
        CKEDITOR.instances.TERMS_AND_CONDITIONS.setData($scope.TERMS_AND_CONDITIONS);
        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }

    $scope.Clearall = function () {

        //Clear();
        if ($scope.PAGE_NAME === "Master") {
            //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
            window.location.href = "/VendorPO/Index?CustType=" + CUSTOMER_TYPE;
        }
        

    };



    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

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