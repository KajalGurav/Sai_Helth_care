app.service("CustomerService", function ($http) {
    //#region Quot
    this.GetCustomerDetails = function (id) {


        var response = $http({
            method: "GET",
            url: "/Customer_Master/GetCustomerDetails",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Customer_Master/GetCustomerDetails");
    };

    this.GetRecordbyPaging_Quotation = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetAllQuotationList",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };
    this.GetRecordbyPaging_PurchaseOrder = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetAllPurchaseOrderList",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };

    this.GetRecordbyPaging_PaymentReceipt = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetPaymentReceiptList",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };

    this.GetRecordbyPaging_ServiceCall = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/GetAllServiceCallRequestAssign",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };

    this.GetRecordbyPaging_DeliveryChallan = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/Dilivery_Challan/GetDeliveryChallanList",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };

    this.GetRecordbyPaging_Invoice = function (tb_Params) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/GetInvoiceMasterList",
            data: JSON.stringify(tb_Params),
            dataType: "json"
        });
        return response;
    };

    //16-06-2023 Rajendra
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

    this.GetProductQuotDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProductQuotDetails",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetProductQuotDetails");
    };

    this.GetProductMindrayQuotDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/MindrayQuotation/GetProductQuotDetails",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetProductQuotDetails");
    };




    this.GetLatestRecords = function (idType) {
        var response = $http({
            method: "GET",
            url: "/PaymentReceipt/GetLatestRecordByType",
            params: {
                idType: idType
            }
        });
        return response;
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

    //this.getRecordbyPaging = function (SearchingConditions) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/PaymentReceipt/GetallAdmin",
    //        data: JSON.stringify(SearchingConditions)
    //    });
    //    return response;
    //};

    this.DeleteRecord = function () {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/DeleteRecord",
            data: JSON.stringify(),
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

    this.GetPaymentFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetAllPaymentCustomer = function () {
        var response = $http({
            method: "GET",
            url: "/PaymentReceipt/GetCustomerList",
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

    this.GetProducDetailsQuot = function (tb_Admin) {
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


    this.AddQuotation = function (tb_Admin) {
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
            url: "/Quotation_Registration/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCompanyBankDetails = function (ID) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: ID
            }
        });
        return response;
    };
    //#endregion
    // AMC

    //#region
    this.GetAMCCMCDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetAMCCMCDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    }

    this.AddAdminAMC = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdminAMC = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetFirmListAMC = function (id) {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetCategoryListAMC = function () {
        var response = $http({
            method: "GET",
            url: "/AMC_Master/GetCategoryList"

        });
        return response;
    };

    this.GetProductListAMC = function (id) {
        var response = $http({
            method: "GET",
            url: "/Customer_Master/GetProductList1",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetProductListAMCMedtronic = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProduct",
            params: {
                productTypeID: id
            }
        });
        return response;
    };

    this.GetAllCustomerAMC = function (id) {
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

    this.GetLatestRecordsAMC = function () {
        var response = $http({
            method: "POST",
            url: "/AMC_Master/GetLatestRecord"
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/Product/GetCategory");
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

    this.GetLatestUniqueCode = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
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

    //#endregion
    //

    this.GetCompany = function () {
        return $http.get("/Employee_Regi/GetCompany");
    };

    this.Delete_IM_SparePartsAndAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_SparePartsAndAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };

    this.Delete_IM_MedtronicAccessories = function (data) {
        var response = $http({
            method: "POST",
            url: "/InvoiceMaster/Delete_IM_MedtronicAccessories",
            data: JSON.stringify(data),
            dataType: "json"
        });
        return response;
    };
});
app.controller('CustomerDetailsController', function ($scope, CustomerService) {
    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.CUSTOMER_TYPE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[1].split('=').pop());
    $scope.TAB_ID = PARAM[2].split('=').pop();
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    var CUSTOMER_TYPE_NAME = $scope.CUSTOMER_TYPE_NAME;

    if ($scope.CUSTOMER_TYPE_NAME === "Regular") {
        $scope.CUSTOMER_TYPE_ID = 1;
        $scope.PO_LABEL = "Refurbished PO";
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
        $scope.PO_LABEL = "Mindray PO";
    }

    ///////////////////////////////////////
    $scope.OnCategoryClick = function (id) {
        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');

        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            //GetCustomerQuoteDetails();
            GetRecordbyPaging_Quotation();
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
        }

        else if (id === '1') {
            GetRecordbyPaging_PurchaseOrder();
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            //var getAdmin = CustomerService.GetProductQuotDetails();
            //getAdmin.then(function (response) {
            //    $scope.ProductQuotList = response.data;
            //});
        }

        else if (id === '2') {
            GetRecordbyPaging_Invoice();
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "block";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";


        }

        else if (id === '3') {
            GetRecordbyPaging_DeliveryChallan();
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "block";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            //GetallRoomDetails();
        }

        else if (id === '4') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "block";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetallCaseSheet();
        }

        else if (id === '5') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "block";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetallCasehistory();
        }

        else if (id === '6') {

            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "block";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            //PaymentReceiptDetails();
            $scope.CUSTOMER_ID = CUSTOMER_ID;
            GetRecordbyPaging_PaymentReceipt();


        }

        else if (id === '7') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "block";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            $scope.CUSTOMER_ID = CUSTOMER_ID;
            GetRecordbyPaging_ServiceCall();
        }

        else if (id === '8') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "block";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetallClearance();

        }

        else if (id === '9') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "block";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            AMCCMCDetails();

        }

        else if (id === '10') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "block";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetallDoctorCasehistory();

        }

        else if (id === '11') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "block";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetAll();
        }

        else if (id === '12') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "block";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "none";
            GetDealerPayment();
            GetAll();
        }

        else if (id === '13') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "block";
            //document.getElementById('Demoexample_14').style.display = "none";
            //GetDealerPayment();
            GetAll();

        }

        else if (id === '14') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "none";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "block";
            //GetDealerPayment();
            GetAll();

        }

        else if (id === '15') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "block";
            document.getElementById('Demoexample_16').style.display = "none";
            AMCCMCDetails();

        }

        else if (id === '16') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "none";
            document.getElementById('Demoexample_2').style.display = "none";
            document.getElementById('Demoexample_3').style.display = "none";
            document.getElementById('Demoexample_4').style.display = "none";
            //document.getElementById('Demoexample_5').style.display = "none";
            document.getElementById('Demoexample_6').style.display = "none";
            document.getElementById('Demoexample_7').style.display = "none";
            document.getElementById('Demoexample_8').style.display = "none";
            document.getElementById('Demoexample_9').style.display = "none";
            document.getElementById('Demoexample_10').style.display = "none";
            document.getElementById('Demoexample_11').style.display = "none";
            document.getElementById('Demoexample_15').style.display = "none";
            document.getElementById('Demoexample_16').style.display = "block";
            //document.getElementById('Demoexample_12').style.display = "none";
            //document.getElementById('Demoexample_13').style.display = "none";
            //document.getElementById('Demoexample_14').style.display = "block";
            //GetDealerPayment();
            $scope.CUSTOMER_ID = CUSTOMER_ID;
            GetRecordbyPaging_ServiceCall();

        }
    }
    ///////////////////////////////////////

    //Searching Parameters :
    $scope.PageNo = 1;
    $scope.pageSize = 1000;
    //$scope.CUSTOMER_TYPE_ID = 1;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    $scope.CALL_PRIORITY_TYPE_ID = null;
    $scope.CALL_STATUS = null;
    GetCustomer();
    //GetAllCustomersQuot();
    //GetAllBanks();
    //GetRecordbyPaging_Quotation();
    $scope.OnCategoryClick($scope.TAB_ID);

    function GetCustomer() {
        var getCustomer = CustomerService.GetCustomerDetails($scope.CUSTOMER_ID);
        getCustomer.then(function (response) {
            $scope.CustomerList = response.data;

            $scope.QCUSTOMER_ID = $scope.CustomerList[0].Customer_ID;
            //$scope.QFIRM_ID = $scope.CustomerList[0].FIRM_ID;
            $scope.QCUSTOMER_TYPE = $scope.CustomerList[0].CUSTOMER_TYPE_ID;

            GetAllCustomerFirmQuot();

            //console.log(JSON.stringify($scope.CustomerList));
            //$("#tempCustId").val($scope.CustomerList[0].CUSTOMER_ID);
        });
    }

    function GetSearchingConditions() {

        if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.CUSTOMER_NAME = null;
        }
        //if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
        //    $scope.STATE_SEARCH = null;
        //}


        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            //CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_ID: CUSTOMER_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE,
            CALL_PRIORITY_TYPE_ID: $scope.CALL_PRIORITY_TYPE_ID,
            CALL_STATUS: $scope.CALL_STATUS
        };

        return SearchingConditions;

    }


    function GetProductDetailsQuot_ForQuotation() {
        var DocType = "Quotation";
        if ($scope.CustomerQuotationList.length > 0) {
            for (let z = 0; z < $scope.CustomerQuotationList.length; z++) {
                var DocNo = $scope.CustomerQuotationList[z].QUOTATION_NO;
                if (DocNo === null || DocNo === undefined) {
                    $scope.CustomerQuotationList[z].QUOTATION_FOR = "";
                    continue;
                }
                tb_Admin = {
                    PTYPE: DocType,
                    ID: DocNo,
                    CUSTOMER_ID: $scope.CustomerQuotationList[z].CUSTOMER_ID
                }
                var getAdmin = CustomerService.GetProducDetailsQuot(tb_Admin);
                getAdmin.then(function (response) {
                    $scope.ProductDetailsListQuot = response.data;
                    $scope.PRODUCT_NAME = "";

                    //var id = $scope.FIRM_ID;
                    //var Firm = $scope.PaymentCustomerFirmList.filter(x => x.F_ID == id)[0];
                    //$scope.CUSTOMER_TYPE = Firm.CUSTOMER_TYPE_ID;
                    if ($scope.CUSTOMER_TYPE_ID === 1 || $scope.CUSTOMER_TYPE_ID === "1") {
                        /*if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {*/
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(") Refurbished "), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.CustomerQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin1 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin1.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}
                    }
                    else if ($scope.CUSTOMER_TYPE_ID === 5 || $scope.CUSTOMER_TYPE_ID === "5") {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            $scope.PRODUCT_NAME = "Mindray Make";
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                if (i < $scope.ProductDetailsListQuot.length - 1) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC.concat(" ", "&")));
                                }
                                else {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC));  //Do the math!
                                }
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                //$scope._PROBE_PARTLIST = $scope.ProductDetailsListQuot[i].PROBE_PARTLIST;

                                //if ($scope._PROBE_PARTLIST.length > 0) {
                                //    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Probe Parts:");
                                //    for (j = 0; j < $scope._PROBE_PARTLIST.length; j++) {
                                //        if (j < $scope._PROBE_PARTLIST.length - 1) {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat(","));
                                //        }
                                //        else {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat("\n"));
                                //        }
                                //    }
                                //}
                            }
                        }
                        $scope.CustomerQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;

                    }
                    else {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(")"), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.CustomerQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;


                    }
                    //console.log($scope.ProductDetailsListQuot);
                    //alert(JSON.stringify($scope.ProductDetailsListQuot));
                });

            }
        }
    }

    //1 tab : Quotation :-
    function GetRecordbyPaging_Quotation() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_Quotation(SearchingConditions);
        getrecord.then(function (response) {
            $scope.CustomerQuotationList = response.data;
            $("#loader").css("display", 'none');

            //GetProductDetailsQuot_ForQuotation();

        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }

    function GetProductDetailsQuot_ForPO() {
        var DocType = "Quotation";
        if ($scope.PurchaseOrderList.length > 0) {
            for (let z = 0; z < $scope.PurchaseOrderList.length; z++) {
                var DocNo = $scope.PurchaseOrderList[z].QUOTATION_NO;
                if (DocNo === null || DocNo === undefined) {
                    $scope.PurchaseOrderList[z].QUOTATION_FOR = "";
                    continue;
                }
                tb_Admin = {
                    PTYPE: DocType,
                    ID: DocNo,
                    CUSTOMER_ID: $scope.PurchaseOrderList[z].CUSTOMER_ID
                }
                var getAdmin = CustomerService.GetProducDetailsQuot(tb_Admin);
                getAdmin.then(function (response) {
                    $scope.ProductDetailsListQuot = response.data;
                    $scope.PRODUCT_NAME = "";

                    //var id = $scope.FIRM_ID;
                    //var Firm = $scope.PaymentCustomerFirmList.filter(x => x.F_ID == id)[0];
                    //$scope.CUSTOMER_TYPE = Firm.CUSTOMER_TYPE_ID;
                    if ($scope.CUSTOMER_TYPE_ID === 1 || $scope.CUSTOMER_TYPE_ID === "1") {
                        /*if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {*/
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(") Refurbished "), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.PurchaseOrderList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;

                    }
                    else if ($scope.CUSTOMER_TYPE_ID === 5 || $scope.CUSTOMER_TYPE_ID === "5") {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            $scope.PRODUCT_NAME = "Mindray Make";
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                if (i < $scope.ProductDetailsListQuot.length - 1) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC.concat(" ", "&")));
                                }
                                else {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC));  //Do the math!
                                }
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                //$scope._PROBE_PARTLIST = $scope.ProductDetailsListQuot[i].PROBE_PARTLIST;

                                //if ($scope._PROBE_PARTLIST.length > 0) {
                                //    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Probe Parts:");
                                //    for (j = 0; j < $scope._PROBE_PARTLIST.length; j++) {
                                //        if (j < $scope._PROBE_PARTLIST.length - 1) {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat(","));
                                //        }
                                //        else {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat("\n"));
                                //        }
                                //    }
                                //}
                            }
                        }
                        $scope.PurchaseOrderList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin1 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin1.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}
                    }
                    else {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(")"), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.PurchaseOrderList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin2 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin2.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}

                    }
                    //console.log($scope.ProductDetailsListQuot);
                    //alert(JSON.stringify($scope.ProductDetailsListQuot));
                });

            }
        }
    }

    //2 tab : PurchaseOrder :-
    function GetRecordbyPaging_PurchaseOrder() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_PurchaseOrder(SearchingConditions);
        getrecord.then(function (response) {
            $scope.PurchaseOrderList = response.data;
            $("#loader").css("display", 'none');
            //GetProductDetailsQuot_ForPO();
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }

    //2 tab : PaymentReceipt :-
    function GetRecordbyPaging_PaymentReceipt() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_PaymentReceipt(SearchingConditions);
        getrecord.then(function (response) {
            $scope.PaymentReceiptList = response.data;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }

    //3 tab : Delivery Challan
    function GetRecordbyPaging_Invoice() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_Invoice(SearchingConditions);
        getrecord.then(function (response) {
            $scope.InvoiceList = response.data;

            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }

    //3 tab : Delivery Challan
    function GetRecordbyPaging_DeliveryChallan() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_DeliveryChallan(SearchingConditions);
        getrecord.then(function (response) {
            $scope.DeliveryChallanList = response.data;

            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }

    //7 tab : Service Call
    function GetRecordbyPaging_ServiceCall() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = CustomerService.GetRecordbyPaging_ServiceCall(SearchingConditions);
        getrecord.then(function (response) {
            $scope.ServiceCallList = response.data;

            $("#loader").css("display", 'none');
            ;
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');


        });
    }


    //function GetCustomerQuoteDetails() {
    //    var getCustomerQuote = CustomerService.GetCustomerQuoteDetails($scope.CUSTOMER_ID);
    //    getCustomerQuote.then(function (response) {
    //        $scope.RegularQuotationList = response.data;
    //        GetProductDetailsQuot();
    //        //console.log(JSON.stringify($scope.RegularQuotationList));
    //        //$("#tempCustId").val($scope.RegularQuotationList[0].Q_ID);
    //    });
    //}
    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
    //#region PO

    function clear() {
        $scope.QUOTE_ID = "";
        $scope.QUOTATION_NO = "";
        $scope.PO_DATE = "";
        $scope.AMOUNT_WITHOUT_TAX = "";
        $scope.TAX_AMOUNT = "";
        $scope.AMOUNT_WITH_TAX = "";
        $scope.AMOUNT_INC_TAX = "";
        $scope.TAX_PERCENTAGE = "";
        $scope.PAYMENT_TERM_DETAILS = "";
        CKEDITOR.instances.PAYMENT_TERM_DETAILS.setData("");
        $scope.REMARKS = "";
        CKEDITOR.instances.REMARKS.setData("");
        $scope.QUOTDATE = "";
        $scope.FIRMNAME = "";
        $scope.BILLINGADD = "";
        $scope.BILLINGZIP = "";
        $scope.SHIPPINGADD = "";
        $scope.SHIPPINGZIP = "";
        $scope.WARRANTYPERIOD = "";
        $scope.ProductQuotList = "";
        $scope.CmpDetailsList = "";
        $scope.COMPANYNAME = "";
        $scope.COMPANYREGADDRESS = "";
        $scope.ZIPCODE = "";
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

    CKEDITOR.replace('PAYMENT_TERM_DETAILS', {
        //language: 'fr',
        uiColor: '#9AB8F3'
        //height: 250,
        //extraPlugins: 'colorbutton,colordialog'

    });


    CKEDITOR.replace('REMARKS', {
        //language: 'fr',
        uiColor: '#9AB8F3'
        //height: 250,
        //extraPlugins: 'colorbutton,colordialog'

    });

    $scope.getForPurchaseOrder = function (admin) {
        clear();
        $scope.QUOTE_ID = admin.Q_ID;
        //$scope.QUOTATION_NO = "SMS/Quot/" + admin.Q_ID.toString();
        $scope.QUOTATION_NO = admin.QUOTATION_NO;
        $scope.PO_DATE = admin.PO_DATE;
        $scope.AMOUNT_WITHOUT_TAX = admin.AMOUNT_WITHOUT_TAX;
        $scope.TAX_AMOUNT = admin.TAX_AMOUNT;
        $scope.AMOUNT_WITH_TAX = admin.AMOUNT_WITH_TAX;
        $scope.AMOUNT_INC_TAX = admin.AMOUNT_INC_TAX;
        $scope.TAX_PERCENTAGE = admin.TAX_PERCENTAGE;
        $scope.PAYMENT_TERM_DETAILS = admin.PAYMENT_TERM_DETAILS.replace(/[\n\t\r]+/g, "");
        //CKEDITOR.instances["PAYMENT_TERM_DETAILS"].setData("<p>test5</p>");
        //CKEDITOR.instances.PAYMENT_TERM_DETAILS.setData($scope.PAYMENT_TERM_DETAILS);
        var editor = CKEDITOR.instances.PAYMENT_TERM_DETAILS;
        if (editor) { editor.destroy(true); }
        CKEDITOR.replace('PAYMENT_TERM_DETAILS', {
            //language: 'fr',
            uiColor: '#9AB8F3'
            //height: 250,
            //extraPlugins: 'colorbutton,colordialog'

        });
        CKEDITOR.instances.PAYMENT_TERM_DETAILS.setData($scope.PAYMENT_TERM_DETAILS, function () {
            this.checkDirty();
            console.log(this.checkDirty());// true
        });


        //var editor = window.CKEDITOR.instances['PAYMENT_TERM_DETAILS'];
        //editor.setData('<p>50% on delivery</p>');
        //var text = editor.setData('<p>50% on delivery</p>');
        //console.log(text);
        //console.log(CKEDITOR.instances.PAYMENT_TERM_DETAILS.getData());
        $scope.REMARKS = admin.NOTE.replace(/[\n\t\r]+/g, "");

        var editor2 = CKEDITOR.instances.REMARKS;
        if (editor2) { editor2.destroy(true); }
        CKEDITOR.replace('REMARKS', {
            //language: 'fr',
            uiColor: '#9AB8F3'
            //height: 250,
            //extraPlugins: 'colorbutton,colordialog'

        });
        CKEDITOR.instances.REMARKS.setData($scope.REMARKS, function () {
            this.checkDirty();
            console.log(this.checkDirty());// true
        });
        $scope.QUOTDATE = admin.QUOTATION_DATE;
        console.log('Purchase Order');
        $scope.FIRMNAME = admin.FIRM_NAME;
        $scope.BILLINGADD = admin.BILLING_ADDRESS;
        $scope.BILLINGZIP = admin.ZIP_CODE;
        $scope.SHIPPINGADD = admin.SHIPPING_ADDRESS;
        $scope.SHIPPINGZIP = admin.SHIPPING_ZIP_CODE;
        $scope.WARRANTYPERIOD = admin.WARRANTY_PERIOD;
        $scope.WARRANTYDMY = admin.WARRANTY_IN_DMY;
        //$scope.CUSTOMER_TYPE = admin.CUSTOMER_TYPE;
        $scope.CUSTOMER_TYPE_ID = admin.CUSTOMER_TYPE_ID;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $('#PO_DATE').datepicker('setDate', $scope.PO_DATE);
        if ($scope.CUSTOMER_TYPE_ID === "5" || $scope.CUSTOMER_TYPE_ID === 5) {
            var getAdmin = CustomerService.GetProductMindrayQuotDetails(admin.Q_ID);
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;

            });
            //console.log($scope.AddPayment1);
        }
        else {
            var getAdmin = CustomerService.GetProductQuotDetails(admin.Q_ID);
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;

            });
            //console.log($scope.AddPayment1);
        }

    }


    $scope.CalculateTAX = function () {
        clearTax();
        if ($scope.AMOUNT_INC_TAX === "Including") {
            $scope.TAX_AMOUNT = Math.round($scope.AMOUNT_WITHOUT_TAX - Math.round($scope.AMOUNT_WITHOUT_TAX / (1 + ($scope.TAX_PERCENTAGE / 100))));//Math.round($scope.AMOUNT_WITHOUT_TAX * $scope.TAX_PERCENTAGE / 100);
            $scope.AMOUNT_WITH_TAX = $scope.AMOUNT_WITHOUT_TAX;//Math.round($scope.AMOUNT_WITHOUT_TAX * $scope.TAX_PERCENTAGE / 100) + $scope.AMOUNT_WITHOUT_TAX;
            $scope.FinalAmount = $scope.AMOUNT_WITH_TAX;
        }
        else if ($scope.AMOUNT_INC_TAX === "Excluding") {
            $scope.TAX_AMOUNT = Math.round($scope.AMOUNT_WITHOUT_TAX * $scope.TAX_PERCENTAGE / 100);
            $scope.AMOUNT_WITH_TAX = Math.round($scope.AMOUNT_WITHOUT_TAX * $scope.TAX_PERCENTAGE / 100) + $scope.AMOUNT_WITHOUT_TAX;
            $scope.FinalAmount = $scope.AMOUNT_WITH_TAX;
        }

    }
    function clearTax() {
        $scope.TAX_AMOUNT = "";
        $scope.AMOUNT_WITH_TAX = "";
        $scope.FinalAmount = "";
        $scope.amtInwords = "";
    }

    $scope.PreviewPO = function () {
        if ($("#PO_DATE").val() === "" || $("#PO_DATE").val() === undefined || $("#PO_DATE").val() === null) {
            alert("Enter P.O. Date");
            return false;
        }
        $scope.PO_DATE = $("#PO_DATE").val();

        var editor = window.CKEDITOR.instances['PAYMENT_TERM_DETAILS'];
        $scope.PAYMENT_TERM_DETAILS = editor.getData();
        $scope.PAYMENT_TERM_DETAILS = $scope.PAYMENT_TERM_DETAILS.replace(/<\/?p>/g, '');

        var editor2 = window.CKEDITOR.instances['REMARKS'];
        $scope.REMARKS = editor2.getData();
        $scope.REMARKS = $scope.REMARKS.replace(/<\/?p>/g, '');

        if ($scope.PAYMENT_TERM_DETAILS === "" || $scope.PAYMENT_TERM_DETAILS === undefined || $scope.PAYMENT_TERM_DETAILS === null) {
            alert("Enter Payment Terms Details");
            return false;
        }

        if ($scope.AMOUNT_INC_TAX === "Including") {
            $scope.FinalAmount = $scope.AMOUNT_WITH_TAX;
        }
        else {
            $scope.FinalAmount = $scope.AMOUNT_WITHOUT_TAX;
        }

        $scope.ProductQuotList;

        $scope.PRODSUB = "";
        if ($scope.CUSTOMER_TYPE_ID === 1 || $scope.CUSTOMER_TYPE_ID === "1" || $scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            if ($scope.ProductQuotList.length > 0) {
                for (i = 0; i < $scope.ProductQuotList.length; i++) {
                    $scope._IS_WITH_STANDARD_ACC = $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC;
                    if (i <= $scope.ProductQuotList.length - 1) {
                        if (i === $scope.ProductQuotList.length - 1) {
                            if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                                $scope.PRODSUB = $scope.PRODSUB.concat("Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition as complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC)));
                            }
                            else {
                                $scope.PRODSUB = $scope.PRODSUB.concat("Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                            }

                        }
                        else {
                            if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                                $scope.PRODSUB = $scope.PRODSUB.concat("Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition as complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC.concat(", "))));
                            }
                            else {
                                $scope.PRODSUB = $scope.PRODSUB.concat("Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(", ")));
                            }

                        }

                    } else {
                        if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" & Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition as complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC)));
                        }
                        else {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" & Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }

                    }
                }
            }
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5 || $scope.CUSTOMER_TYPE_ID === "5") {
            $scope.PRODSUB = "";
            for (i = 0; i < $scope.ProductQuotList.length; i++) {
                var count = 0;
                if (i === $scope.ProductQuotList.length - 1) {
                    if ($scope.ProductQuotList.length === 1) {
                        $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope.ProductQuotList[i].M_NAME.concat(" Make ", $scope.ProductQuotList[i].PRODUCTNAME));
                    }
                    else {
                        $scope.PRODSUB = $scope.PRODSUB.slice(0, -2);

                        $scope.PRODSUB = $scope.PRODSUB.concat(" & ", $scope.ProductQuotList[i].M_NAME.concat(" Make ", $scope.ProductQuotList[i].PRODUCTNAME));
                    }
                }
                else {
                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope.ProductQuotList[i].M_NAME.concat(" Make ", $scope.ProductQuotList[i].PRODUCTNAME));
                }
            }
        }
        else {
            if ($scope.ProductQuotList.length > 0) {
                for (i = 0; i < $scope.ProductQuotList.length; i++) {
                    $scope._IS_WITH_STANDARD_ACC = $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC;
                    if (i <= $scope.ProductQuotList.length - 1) {
                        if (i === $scope.ProductQuotList.length - 1) {
                            if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                                $scope.PRODSUB = $scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition AS complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC)));
                            }
                            else {
                                $scope.PRODSUB = $scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                            }

                        }
                        else {
                            if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                                $scope.PRODSUB = $scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition AS complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC.concat(", "))));
                            }
                            else {
                                $scope.PRODSUB = $scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(", ")));
                            }

                        }

                    } else {
                        if ($scope._IS_WITH_STANDARD_ACC.length > 0) {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" & ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME.concat(" Definition AS complete ", $scope.ProductQuotList[i].IS_WITH_STANDARD_ACC)));
                        }
                        else {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" & ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }

                    }
                }
            }
        }


        $scope.amtInwords = inWords($scope.FinalAmount);
        var getCmpDetails = CustomerService.GetCompanyDetails();
        getCmpDetails.then(function (response) {
            $scope.CmpDetailsList = response.data;
            $scope.COMPANYNAME = $scope.CmpDetailsList.COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList.COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.CmpDetailsList.ZIP_CODE;
            $scope.COMPANY_LETTERHEAD = $scope.CmpDetailsList.COMPANY_LETTERHEAD;
        }
        );



        if ($scope.CUSTOMER_TYPE_ID === 1 || $scope.CUSTOMER_TYPE_ID === "1" || $scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            window.processHTML($scope.REMARKS, "PORemarks");
            window.processHTML($scope.PAYMENT_TERM_DETAILS, "paymentTerms");
            $("#POAdd").modal("show");
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5 || $scope.CUSTOMER_TYPE_ID === "5") {
            window.processHTML($scope.REMARKS, "PORemarksMindray");
            window.processHTML($scope.PAYMENT_TERM_DETAILS, "paymentTermsMindray");
            $("#POAddMindray").modal("show");
        }



    }

    $scope.UpdateQuotDetails = function (id) {

        tb_Admin = {
            Q_ID: $scope.QUOTE_ID,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_TYPE: $scope.CUSTOMER_TYPE,
            PO_DATE: $scope.PO_DATE,
            AMOUNT_WITHOUT_TAX: $scope.AMOUNT_WITHOUT_TAX,
            TAX_AMOUNT: $scope.TAX_AMOUNT,
            AMOUNT_WITH_TAX: $scope.AMOUNT_WITH_TAX,
            //PAYMENT_TERM_DETAILS: $scope.PAYMENT_TERM_DETAILS,
            PAYMENT_TERM_DETAILS: $scope.PAYMENT_TERM_DETAILS,
            QUOTATION_NO: $scope.QUOTATION_NO,
            NOTE: $scope.REMARKS
        }
        var datalist = CustomerService.UpdateQuotationDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("PO Details updated successfully.");
                var printHtml = document.getElementById(id).outerHTML;
                var currentPage = document.body.innerHTML;
                var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';

                var WindowObject = window.open();
                WindowObject.document.write(elementPage);
                WindowObject.document.close();
                WindowObject.focus();
                WindowObject.print();
                WindowObject.close();
                //window.location.href = window.location.href;
                window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE_NAME + "&CustId=" + CUSTOMER_ID + "&TabId=1";
            }
            else if (d.data.success === false) {
                alert("Error occured while updating PO details");
            }
            else {
                alert("Error.");
            }
        },
            function () {
                alert("Error.");
            }
        );
    }
    //#endregion
    function inWords(num) {
        var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        if (num === 0) {
            return 'Zero';
        }
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

    //Payment Receipt Section Start
    //#region Payment Receipt 

    $("#loader").css("display", '');
    PaymentClear();

    function GetAllCustomers() {
        var getAdmin = CustomerService.GetAllPaymentCustomer();
        getAdmin.then(function (response) {
            $scope.PaymentCustomerList = response.data;
        });
    }


    $scope.GetCustomerChange = function () {
        console.log($scope.CUSTOMER_ID);
        if ($scope.CUSTOMER_ID === null || $scope.CUSTOMER_ID === undefined || $scope.CUSTOMER_ID === "") {

        }
        else {
            var id = $scope.CUSTOMER_ID;
            var Customer = $scope.PaymentCustomerList.filter(x => x.Customer_ID == id)[0];
            $scope.CUSTOMER_NAME = Customer.CUSTOMER_NAME;
            console.log(Customer);
        }
        GetAllCustomerFirm();
    };

    function GetAllCustomerFirm() {
        var getAdmin = CustomerService.GetPaymentFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.PaymentCustomerFirmList = response.data;

        });
    }

    $scope.GetFirmChange = function () {
        if ($scope.CUSTOMER_ID === "") {
            $scope.CUSTOMER_ID = "";
        }
        if ($scope.FIRM_ID === null || $scope.FIRM_ID === undefined || $scope.FIRM_ID === "") {

        }
        else {
            console.log($scope.FIRM_ID);
            var id = $scope.FIRM_ID;
            var Firm = $scope.PaymentCustomerFirmList.filter(x => x.F_ID == id)[0];
            $scope.FIRM_NAME = Firm.FIRM_NAME;
            $scope.CUSTOMER_TYPE = Firm.CUSTOMER_TYPE_ID;
            console.log(Firm);
        }

        GetAllCustomers();
        $scope.PAYMENT_RECEIPT_TYPE = "";
        $scope.RECORD_ID = "";
        $scope.PAYMENT_TYPE = "";
        $scope.RECIEPT_FOR = "";
        $scope.TOTAL_AMOUNT = "";
        $scope.AMOUNT_RECEIVED = "";
        $scope.AMOUNT_REMAINING = "";
        $scope.TXN_ID = "";
        $scope.CustomerRecordList = "";
        if ($scope.PAYMENT_TYPE == "" || $scope.PAYMENT_TYPE == undefined || $scope.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }
    };

    $scope.GetReferenceNo = function () {
        var receiptType = $scope.PAYMENT_RECEIPT_TYPE;
        tb_Admin = {
            TYPE: receiptType,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID
        }
        var getAdmin = CustomerService.GetReferenceNoByType(tb_Admin);
        getAdmin.then(function (response) {
            $scope.CustomerRecordList = response.data;
            console.log($scope.CustomerRecordList);
        });
    }

    $scope.GetProductDetails = function () {
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
            var getAdmin1 = CustomerService.GetProductDetails(tb_Admin);
            getAdmin1.then(function (response) {
                $scope.ProductDetList = response.data;
                $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.AMOUNT_RECEIVED = "";
                $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                $scope.Actual_Remaining_Amount = $scope.TOTAL_AMOUNT;
            });
        }
        else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
            var getAdmin = CustomerService.GetProducDetails(tb_Admin);
            getAdmin.then(function (response) {
                $scope.ProductDetailsList = response.data;
                $scope.RECIEPT_FOR = $scope.ProductDetailsList[0].PRODUCTNAME;
                $scope.TOTAL_AMOUNT = $scope.ProductDetailsList[0].TOTAL_AMOUNT;
                $scope.AMOUNT_RECEIVED = $scope.ProductDetailsList[0].AMOUNT_RECEIVED;
                $scope.AMOUNT_REMAINING = $scope.ProductDetailsList[0].AMOUNT_REMAINING;
                $scope.Actual_Remaining_Amount = $scope.ProductDetailsList[0].AMOUNT_REMAINING;
            });
        }


    }

    $scope.CalRemainingAmount = function () {

        if ($scope.AMOUNT_RECEIVED === 0 || $scope.AMOUNT_RECEIVED === undefined || $scope.AMOUNT_RECEIVED === null) {
            $scope.AMOUNT_REMAINING = $scope.TOTAL_AMOUNT;
        }
        else {
            $scope.AMOUNT_REMAINING = $scope.TOTAL_AMOUNT - $scope.AMOUNT_RECEIVED;
        }
    }


    function PaymentClear() {
        $scope.R_ID = "";
        $scope.RECEIPT_NO = "";
        $scope.CUSTOMER_ID = "";
        $scope.CUSTOMER_NAME = "";
        $scope.CUSTOMER_TYPE = "";
        $scope.FIRM_ID = "";
        $scope.FIRM_NAME = "";
        $scope.STATE_ID = "";
        $scope.STATE_NAME = "";
        $scope.CITY_ID = "";
        $scope.CITY_NAME = "";
        $scope.PAYMENT_RECEIPT_TYPE = "";
        $scope.RECORD_ID = "";
        $scope.PAYMENT_TYPE = "";
        $scope.RECIEPT_FOR = "";
        $scope.TOTAL_AMOUNT = "";
        $scope.AMOUNT_RECEIVED = "";
        $scope.AMOUNT_REMAINING = "";
        $scope.TXN_ID = "";
        $scope.Operation = "";
    }

    function PaymentReceiptDetails() {
        tb_Admin = {
            R_ID: 0,
            PAYMENT_RECEIPT_NO: "",
            CUSTOMER_ID: 0,
            FIRM_ID: 0
        }
        var getReceiptList = CustomerService.GetPaymentReceiptDetails(tb_Admin);
        getReceiptList.then(function (response) {
            $scope.PaymentReceiptList = response.data;
            console.log($scope.PaymentReceiptList);
        });
    }
    $scope.onPaymentType = function () {
        //alert($scope.PAYMENT_TYPE);
        if ($scope.PAYMENT_TYPE == "" || $scope.PAYMENT_TYPE == undefined || $scope.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }

    }

    $scope.AdminReceiptClick = function () {
        PaymentClear();
        $scope.CUSTOMER_ID = $scope.CustomerList[0].Customer_ID;
        $scope.FIRM_ID = $scope.CustomerList[0].FIRM_ID;
        $scope.CUSTOMER_NAME = $scope.CustomerList[0].CUSTOMER_NAME;
        $scope.FIRM_NAME = $scope.CustomerList[0].FIRM_NAME;
        var LatestDocNo = CustomerService.GetLatestRecords("Receipt");
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            $scope.RECEIPT_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
        });
        $scope.Admin_ActionPR = "Add Payment Receipt";
        //document.getElementById("RECEIPT_NO").value = $scope.RECEIPT_NO;

        $("#PaymentReceipt").modal("show");
        if ($scope.PAYMENT_TYPE == "" || $scope.PAYMENT_TYPE == undefined || $scope.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }
        GetAllCustomers();
        GetAllCustomerFirm();
    };

    $scope.getReceiptForUpdate = function (admin) {
        PaymentClear();
        if (admin.PAYMENT_TYPE == "" || admin.PAYMENT_TYPE == undefined || admin.PAYMENT_TYPE == "Cash") {
            $("#idTranscrtion").css("display", "none");
        } else {
            $("#idTranscrtion").css("display", "block");
        }
        //$scope.CONTRACT_TO = new Date(admin.CONTRACT_TO);
        //document.getElementById("CONTRACT_TO").value = new Date(admin.CONTRACT_TO);
        $scope.R_ID = admin.R_ID;
        $scope.RECEIPT_NO = admin.PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.PAYMENT_RECEIPT_TYPE = admin.PAYMENT_RECEIPT_TYPE;
        //$scope.RECORD_ID = admin.PAYMENT_REF_NO;
        $scope.RECORD_ID = parseInt(admin.Q_ID);
        $scope.PAYMENT_TYPE = admin.PAYMENT_TYPE;
        $scope.RECIEPT_FOR = admin.RECIEPT_FOR;
        $scope.TOTAL_AMOUNT = admin.PAYMENT_AMOUNT;
        $scope.AMOUNT_RECEIVED = admin.AMOUNT_RECEIVED;
        $scope.AMOUNT_REMAINING = admin.AMOUNT_REMAINING;
        $scope.TXN_ID = admin.TXN_ID;
        $scope.Operation = "Update";
        $scope.FIRM_ID = admin.FIRM_ID;
        $scope.FIRM_NAME = admin.FIRM_NAME;


        $scope.Admin_ActionPR = "Update Payment Receipt";
        $("#PaymentReceipt").modal("show");

        GetAllCustomers();
        GetAllCustomerFirm();
        $scope.GetReferenceNo();
    };


    $scope.PreviewPR = function (admin) {
        $scope.RECEIPT_NO = admin.PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.PAYMENT_RECEIPT_TYPE = admin.PAYMENT_RECEIPT_TYPE;
        $scope.RECORD_ID = admin.PAYMENT_REF_NO;

        if (admin.BANK_ID === undefined || admin.BANK_ID === null || admin.BANK_ID === "") {
            $scope.BANK_ID = 0;
        }
        else {
            $scope.BANK_ID = admin.BANK_ID;
        }

        $scope.PAYMENT_TYPE = admin.PAYMENT_TYPE;
        $scope.RECIEPT_FOR = admin.RECIEPT_FOR;
        $scope.TOTAL_AMOUNT = admin.PAYMENT_AMOUNT;
        $scope.AMOUNT_RECEIVED = admin.AMOUNT_RECEIVED;
        $scope.AMOUNT_REMAINING = admin.AMOUNT_REMAINING;
        $scope.FIRM_ID = admin.FIRM_ID;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.FIRM_ADDRESS = admin.FIRM_ADDRESS;
        $scope.FIRM_ZIP_CODE = admin.FIRM_ZIP_CODE;
        $scope.RECEIPT_GEN_DATE = admin.RECEIPT_GEN_DATE;
        $scope.STATE_ID = admin.STATE_ID;
        $scope.STATE_NAME = admin.STATE_NAME;
        $scope.CITY_ID = admin.CITY_ID;
        $scope.CITY_NAME = admin.CITY_NAME;
        $scope.TXN_ID = admin.TXN_ID;

        $scope.PayamtInwords = inWords($scope.AMOUNT_RECEIVED);

        var getCompany = CustomerService.GetCompanyBankDetails(parseInt($scope.BANK_ID));
        getCompany.then(function (response) {
            $scope.CmpDetailsList = response.data;
            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
            $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
            $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;
        });

        if ($scope.CUSTOMER_TYPE_ID === 3 || $scope.CUSTOMER_TYPE_ID === "3") {
            $("#PreviewPRMed").modal("show");
        } else {
            //var getCmpDetails = CustomerService.GetPaymentCompanyDetails();
            //getCmpDetails.then(function (response) {
            //    $scope.CmpDetailsList = response.data;
            //    $scope.COMPANYNAME = $scope.CmpDetailsList.COMPANY_NAME;
            //    $scope.COMPANYREGADDRESS = $scope.CmpDetailsList.COMPANY_REG_ADDRESS;
            //    $scope.ZIPCODE = $scope.CmpDetailsList.ZIP_CODE;
            //    //$("#tempCustId").val($scope.RegularQuotationList[0].Q_ID);
            //});
            $("#PreviewPRMed").modal("show");
        }

    }

    $scope.ShowReceiptFor = function (admin) {
        $scope.RECEIPT_NO = admin.PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.RECORD_ID = admin.PAYMENT_REF_NO;
        $scope.RECIEPT_FOR = admin.RECIEPT_FOR;
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
        }, 1000);

        //window.location.href = window.location.href;
    }

    $scope.AddUpdateAccount = function () {
        $("#loader").css("display", '');
        if (($scope.PAYMENT_TYPE != "" && $scope.PAYMENT_TYPE != undefined && $scope.PAYMENT_TYPE != "Cash") && ($scope.TXN_ID == "" || $scope.TXN_ID == undefined)) {
            alert("Please enter Cheque No./Transaction Id!");
            return false;
        }
        var recordList = $scope.CustomerRecordList.filter(x => x.Quot_ID == $scope.RECORD_ID)[0];
        var DocNo = recordList.REF_NO_LIST;
        if ($scope.Admin_ActionPR === "Add Payment Receipt") {
            $scope.Operation = "Insert";
            tb_Admin = {
                PAYMENT_RECEIPT_NO: $scope.RECEIPT_NO,
                CUSTOMER_ID: $scope.CUSTOMER_ID,
                CUSTOMER_NAME: $scope.CUSTOMER_NAME,
                FIRM_ID: $scope.FIRM_ID,
                FIRM_NAME: $scope.FIRM_NAME,
                PAYMENT_REF_NO: DocNo,
                Q_ID: parseInt($scope.RECORD_ID),
                PAYMENT_RECEIPT_TYPE: $scope.PAYMENT_RECEIPT_TYPE,
                PAYMENT_TYPE: $scope.PAYMENT_TYPE,
                RECIEPT_FOR: $scope.RECIEPT_FOR,
                PAYMENT_AMOUNT: $scope.TOTAL_AMOUNT,
                AMOUNT_RECEIVED: $scope.AMOUNT_RECEIVED,
                AMOUNT_REMAINING: $scope.AMOUNT_REMAINING,
                TXN_ID: $scope.TXN_ID,
                Operation: $scope.Operation
            };
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_ActionPR === "Update Payment Receipt") {
            tb_Admin = {
                R_ID: $scope.R_ID,
                PAYMENT_RECEIPT_NO: $scope.RECEIPT_NO,
                CUSTOMER_ID: $scope.CUSTOMER_ID,
                CUSTOMER_NAME: $scope.CUSTOMER_NAME,
                FIRM_ID: $scope.FIRM_ID,
                FIRM_NAME: $scope.FIRM_NAME,
                PAYMENT_REF_NO: DocNo,
                Q_ID: parseInt($scope.RECORD_ID),
                PAYMENT_RECEIPT_TYPE: $scope.PAYMENT_RECEIPT_TYPE,
                PAYMENT_TYPE: $scope.PAYMENT_TYPE,
                RECIEPT_FOR: $scope.RECIEPT_FOR,
                PAYMENT_AMOUNT: $scope.TOTAL_AMOUNT,
                AMOUNT_RECEIVED: $scope.AMOUNT_RECEIVED,
                AMOUNT_REMAINING: $scope.AMOUNT_REMAINING,
                TXN_ID: $scope.TXN_ID,
                Operation: $scope.Operation
            };
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = CustomerService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                PaymentClear(); PaymentReceiptDetails();
                alert("Payment Receipt added successfully.");
                $("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');
                window.location.pathname;
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
        var datalist = CustomerService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                PaymentClear(); PaymentReceiptDetails();
                alert("Payment Receipt updated successfully.");
                $("#PaymentReceipt").modal("hide");
                $("#loader").css("display", 'none');
                window.location.pathname;
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
    //#endregion
    //Payment Receipt Section End

    //Add Quotation Section Start
    //#region Quotation 



    function QuotClear() {
        $scope.QCUSTOMER_ID = "";
        //$scope.CUSTOMER_TYPE = "";
        $scope.QFIRM_ID = "";
        $scope.QUOTATION_TYPE = "";
        $scope.QUOTATION_DATE = "";
        $scope.PNDT_STATUS = "";
        $scope.PNDT_NO = "";
        $scope.QPO_DATE = "";
        $scope.PAYMENT_TERM = "";
        $scope.AERB_OR_PNDT = "";
        $scope.STATUS = "";
        $scope.NOTE = "";
        $scope.BANK_ID = "";
        CKEDITOR.instances.NOTE.setData($scope.NOTE);
    }

    //$scope.Clearall = function () {

    //    QuotClear();
    //};

    function GetAllCustomersQuot() {
        var getAdmin = CustomerService.GetAllCustomer();
        getAdmin.then(function (response) {
            $scope.QuotCustomerList = response.data;
        });
    }

    function GetAllCustomerFirmQuot() {
        var getAdmin = CustomerService.GetFirmList($scope.QCUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.QuotCustomerFirmList = response.data;
            $scope.QFIRM_ID = $scope.QuotCustomerFirmList[0].F_ID;
        });
    }
    function GetAllBanks() {
        var getAdmin = CustomerService.GetCompanyBankDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }

    $scope.AddQuotationBtnClicked = function () {
        var editor = CKEDITOR.instances.NOTE;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('NOTE', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        QuotClear();

        $scope.QCUSTOMER_ID = $scope.CustomerList[0].Customer_ID;
        $scope.QFIRM_ID = $scope.QuotCustomerFirmList[0].F_ID;
        $scope.QCUSTOMER_TYPE = $scope.CustomerList[0].CUSTOMER_TYPE_ID;

        var LatestDocNo = CustomerService.GetLatestRecords("Quotation");
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            $scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.QUOTATION_DATE = today;
        });


        $scope.Admin_Action = "Add Quotation";
        //document.getElementById("RECEIPT_NO").value = $scope.RECEIPT_NO;

        $("#Admin_Addupdate").modal("show");
        //GetAllCustomersQuot();
        //GetAllCustomerFirmQuot();
        //GetAllBanks();

    };


    $scope.getForUpdate = function (admin) {
        var editor = CKEDITOR.instances.NOTE;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('NOTE', {
            //language: 'fr',
            uiColor: '#9AB8F3'
        });
        QuotClear();

        //$scope.PO_DATE = $("#PO_DATE").val();
        $scope.QUOTATION_NO = "";
        $scope.QUOTATION_TYPE = admin.QUOTATION_TYPE;
        $scope.QUOTATION_NO = admin.QUOTATION_NO;
        $scope.QUOTATION_DATE = "";
        $scope.QUOTATION_DATE = admin.QUOTATION_DATE;
        $scope.QCUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.QFIRM_ID = admin.FIRM_ID;
        $scope.STATUS = admin.STATUS;
        $scope.PNDT_STATUS = admin.PNDT_STATUS;
        $scope.PNDT_NO = admin.PNDT_NO;
        $scope.QPO_DATE = admin.PO_DATE;
        $('#QPO_DATE').datepicker('setDate', $scope.QPO_DATE);
        $scope.PAYMENT_TERM = parseFloat(admin.PAYMENT_TERM);
        //$scope.NOTE = admin.NOTE.replace(/[\n\r]/g, '');
        $scope.NOTE = admin.NOTE.replace(/[\n\t\r]+/g, "");
        var editor = CKEDITOR.instances.NOTE;
        if (editor) { editor.destroy(true); }

        CKEDITOR.replace('NOTE', {
            //language: 'fr',
            uiColor: '#9AB8F3',

        });
        CKEDITOR.instances.NOTE.setData($scope.NOTE);
        $scope.AERB_OR_PNDT = admin.AERB_OR_PNDT;
        $scope.BANK_ID = admin.BANK_ID;
        $scope.Q_ID = admin.Q_ID;
        //window.CKEDITOR.instances.NOTE1.setData($scope.NOTE);
        $("#Admin_Addupdate").modal("show");


        GetAllCustomersQuot();
        GetAllCustomerFirmQuot();
        GetAllBanks();
        //setTimeout(function myfunction() {
        //    var blankSelectOptions = $('option[value$="?"]');
        //    if (blankSelectOptions.length > 0) {
        //        $(blankSelectOptions).remove();
        //    }
        //    $("#CUSTOMER_ID").val($scope.CUSTOMER_ID);
        //    $("#FIRM_ID").val($scope.FIRM_ID);

        //}, 1200);




        $scope.Admin_Action = "Update Quotation";
        //AddAdmin(tb_Admin);



    };

    $scope.AddQuotationBtnClicked = function () {

        //$scope.PO_DATE = $("#PO_DATE").val();
        var date = $("#QPO_DATE").val().split(' ');
        $scope.QPO_DATE = date.pop();
        //alert($("#PO_DATE").val());
        //alert($scope.PO_DATE);
        tb_Admin = {
            QUOTATION_TYPE: $scope.QUOTATION_TYPE,
            QUOTATION_NO: $scope.QUOTATION_NO,
            CUSTOMER_ID: $scope.QCUSTOMER_ID,
            FIRM_ID: $scope.QFIRM_ID,
            STATUS: $scope.STATUS,
            QUOTATION_DATE: $scope.QUOTATION_DATE,
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.QPO_DATE,
            PAYMENT_TERM: $scope.PAYMENT_TERM,
            //NOTE: $scope.NOTE,
            NOTE: CKEDITOR.instances.NOTE.getData(),
            AERB_OR_PNDT: $scope.AERB_OR_PNDT,
            BANK_ID: $scope.BANK_ID,
            Q_ID: $scope.Q_ID

        };
        if ($scope.Admin_Action === "Update Quotation") {

            EditAdminRecordQuot(tb_Admin);
        }
        else if ($scope.Admin_Action === "Add Quotation") {
            AddQuotation(tb_Admin);
        }

    }

    function AddQuotation(tb_Admin) {
        var id = $scope.QCUSTOMER_ID;
        var datalist = CustomerService.AddQuotation(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                QuotClear();
                alert("Quotation added successfully.");
                //$("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
                window.location.href = window.location.href;
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

    function EditAdminRecordQuot(tb_Admin) {
        var id = $scope.QCUSTOMER_ID;
        var datalist = CustomerService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                QuotClear();
                alert("Quotation updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
                window.location.href = window.location.href;
            }
            else if (d.data.success === false) {
                alert("Quotation already added.");
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

    function GetProductDetailsQuot() {
        var DocType = "Quotation";
        if ($scope.RegularQuotationList.length > 0) {
            for (let z = 0; z < $scope.RegularQuotationList.length; z++) {
                var DocNo = $scope.RegularQuotationList[z].QUOTATION_NO;
                if (DocNo === null || DocNo === undefined) {
                    $scope.RegularQuotationList[z].QUOTATION_FOR = "";
                    continue;
                }
                tb_Admin = {
                    PTYPE: DocType,
                    ID: DocNo,
                    CUSTOMER_ID: $scope.RegularQuotationList[z].CUSTOMER_ID
                }
                var getAdmin = CustomerService.GetProducDetailsQuot(tb_Admin);
                getAdmin.then(function (response) {
                    $scope.ProductDetailsListQuot = response.data;
                    $scope.PRODUCT_NAME = "";

                    //var id = $scope.FIRM_ID;
                    //var Firm = $scope.PaymentCustomerFirmList.filter(x => x.F_ID == id)[0];
                    //$scope.CUSTOMER_TYPE = Firm.CUSTOMER_TYPE_ID;
                    if ($scope.RegularQuotationList[z].CUSTOMER_TYPE === 1 || $scope.RegularQuotationList[z].CUSTOMER_TYPE === "1") {
                        /*if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {*/
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(") Refurbished "), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.RegularQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin1 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin1.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}
                    }
                    else if ($scope.RegularQuotationList[z].CUSTOMER_TYPE === 5 || $scope.RegularQuotationList[z].CUSTOMER_TYPE === "5") {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            $scope.PRODUCT_NAME = "Mindray Make";
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                if (i < $scope.ProductDetailsListQuot.length - 1) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC.concat(" ", "&")));
                                }
                                else {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_PROBE_ACC));  //Do the math!
                                }
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                //$scope._PROBE_PARTLIST = $scope.ProductDetailsListQuot[i].PROBE_PARTLIST;

                                //if ($scope._PROBE_PARTLIST.length > 0) {
                                //    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Probe Parts:");
                                //    for (j = 0; j < $scope._PROBE_PARTLIST.length; j++) {
                                //        if (j < $scope._PROBE_PARTLIST.length - 1) {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat(","));
                                //        }
                                //        else {
                                //            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._PROBE_PARTLIST[j].PROBE_NAME.concat("\n"));
                                //        }
                                //    }
                                //}
                            }
                        }
                        $scope.RegularQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin1 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin1.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}
                    }
                    else {
                        //if ($scope.PAYMENT_RECEIPT_TYPE === "Quotation" || $scope.PAYMENT_RECEIPT_TYPE === "PurchaseOrder") {
                        if ($scope.ProductDetailsListQuot.length > 0) {
                            for (i = 0; i < $scope.ProductDetailsListQuot.length; i++) {
                                var pos = i + 1;
                                $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat((pos).toString().concat(")"), $scope.ProductDetailsListQuot[i].M_NAME.concat(" ", $scope.ProductDetailsListQuot[i].PRODUCTNAME.concat(" ", $scope.ProductDetailsListQuot[i].IS_WITH_STANDARD_ACC)));  //Do the math!
                                //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                                $scope._SPARE_PARTLIST = $scope.ProductDetailsListQuot[i].SPARE_PARTLIST;

                                if ($scope._SPARE_PARTLIST.length > 0) {
                                    $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" & ", "Spare Parts:");
                                    for (j = 0; j < $scope._SPARE_PARTLIST.length; j++) {
                                        if (j < $scope._SPARE_PARTLIST.length - 1) {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat(","));
                                        }
                                        else {
                                            $scope.PRODUCT_NAME = $scope.PRODUCT_NAME.concat(" ", $scope._SPARE_PARTLIST[j].SPARE_PART.concat("\n"));
                                        }
                                    }
                                }
                            }
                        }
                        $scope.RegularQuotationList[z].QUOTATION_FOR = $scope.PRODUCT_NAME;
                        //var getAdmin2 = CustomerService.GetProductDetails(tb_Admin);
                        //getAdmin2.then(function (response) {
                        //    $scope.ProductDetList = response.data;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //    $scope.AMOUNT_RECEIVED = "";
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetList[0].AMOUNT_WITH_TAX;
                        //});
                        //}
                        //else if ($scope.PAYMENT_RECEIPT_TYPE === "AMC" || $scope.PAYMENT_RECEIPT_TYPE === "CMC") {
                        //    $scope.RECIEPT_FOR = $scope.ProductDetailsListQuot[0].PRODUCTNAME;
                        //    $scope.TOTAL_AMOUNT = $scope.ProductDetailsListQuot[0].TOTAL_AMOUNT;
                        //    $scope.AMOUNT_RECEIVED = $scope.ProductDetailsListQuot[0].AMOUNT_RECEIVED;
                        //    $scope.AMOUNT_REMAINING = $scope.ProductDetailsListQuot[0].AMOUNT_REMAINING;
                        //}

                    }
                    //console.log($scope.ProductDetailsListQuot);
                    //alert(JSON.stringify($scope.ProductDetailsListQuot));
                });
            }
        }
    }
    //#endregion
    //Add Quotation Section End


    //Add/Edit AMC CMC Section Start

    //#region AMC CMC 
    $scope.AMC_COMPANY_ID = null;
    $scope.AMC_FARMER_SEARCH = null;
    GetAllCustomersAMC();
    GetAllCategoriesAMC();
    GetAllBanksAMC();
    GetCompanyAMC();
    function GetCompanyAMC() {
        var getdatereport1 = CustomerService.GetCompany();
        getdatereport1.then(function (response) {
            $scope.CompanyList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    function GetAllBanksAMC() {
        //if ($scope.BANK_ID === undefined || $scope.BANK_ID === null) {
        //    $scope.BANK_ID = 0;
        //}

        //var getAdmin = CustomerService.GetCompanyBankDetails($scope.BANK_ID);
        var getAdmin = CustomerService.GetCompanyBankDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankListAMC = response.data;
        });
    }

    function GetAllCustomersAMC() {
        var getAdmin = CustomerService.GetAllCustomerAMC(parseInt($scope.CUSTOMER_TYPE_ID));
        getAdmin.then(function (response) {
            $scope.CustomerListAMC = response.data;
        });
    }

    $scope.AMCSearchAdmin = function () {
        AMCCMCDetails();
    }
    function AMCCMCDetails() {
        if ($scope.AMC_FARMER_SEARCH === undefined || $scope.AMC_FARMER_SEARCH === "" || $scope.AMC_FARMER_SEARCH === null) {
            $scope.AMC_FARMER_SEARCH = null;
        }

        tb_Admin = {
            AMC_CMC_ID: 0,
            CONTRACT_DOCUMENT_NO: null,
            CUSTOMER_ID: CUSTOMER_ID,
            AMC_COMPANY_ID: $scope.AMC_COMPANY_ID,
            FIRM_ID: null,
            FARMER_NAME: $scope.AMC_FARMER_SEARCH,

        }

        var getAMCList = CustomerService.GetAMCCMCDetails(tb_Admin);
        getAMCList.then(function (response) {
            $scope.AMCCMCList = response.data;
            console.log($scope.AMCCMCList);
        });
    }

    //$scope.GetCustomerChangeAMC = function () {
    //    console.log($scope.AMCCUSTOMER_ID);
    //    var id = $scope.AMCCUSTOMER_ID;
    //    var Customer = $scope.CustomerListAMC.filter(x => x.Customer_ID == id)[0];
    //    $scope.AMCCUSTOMER_NAME = Customer.CUSTOMER_NAME;
    //    $scope.AMCCUSTOMER_TYPE = Customer.CUSTOMER_TYPE;
    //    console.log(Customer);
    //    GetAllCustomerFirmAMC();
    //};
    function GetAllCustomerFirmAMC() {
        var getAdmin = CustomerService.GetFirmListAMC($scope.AMCCUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmListAMC = response.data;

        });
    }


    function GetAllCategoriesAMC() {
        var getAdmin = CustomerService.GetCategoryListAMC();
        getAdmin.then(function (response) {
            $scope.CategoryListAMC = response.data;
        });
    }

    $scope.GetCategoryChangeAMC = function () {

        var id = $scope.CAT_ID;
        var Category = $scope.CategoryListAMC.filter(x => x.CAT_ID == id)[0];
        $scope.PRODUCT_NAME = Category.CAT_NAME;
        $scope.CONTRACT_TYPE_DETAILS = "";
        console.log(Category);
        GetAllProductsAMC();
    };
    function GetAllProductsAMC() {
        if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
            var getAdmin = CustomerService.GetProductListAMCMedtronic(3);
            getAdmin.then(function (response) {
                $scope.ProductListAMC = response.data;
            });
        }
        else {
            var getAdmin = CustomerService.GetProductListAMC($scope.CAT_ID);
            getAdmin.then(function (response) {
                $scope.ProductListAMC = response.data;

            });
        }

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
            /* alert("Please select Is Fees Including GST field");*/
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
        if (!$scope.FEES || !$scope.IS_FEES_INC_GST) {
            $scope.FEES_IN_GST = 0;
            return;
        }
        if ($scope.IS_FEES_INC_GST === null || $scope.IS_FEES_INC_GST === "" || $scope.IS_FEES_INC_GST === undefined) {
            /*alert("Please select Is Fees Including GST field");*/
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



        /*$("#loader").css("display", '');*/
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

    $scope.GetModelChangeAMC = function () {
        console.log($scope.P_ID);

        var id = $scope.P_ID;

        var Product = $scope.ProductListAMC.filter(x => x.P_ID == id)[0];
        $scope.MODEL_NAME = Product.PRODUCT_NAME;

        $scope.OnProductChange();
        console.log(Product);
    };

    function ClearAMC() {
        $scope.CONTRACT_DOCUMENT_NO = "";
        $scope.CONTRACT_TYPE = "";
        $scope.CONTRACT_PERIOD = "";
        $scope.CONTRACT_DATE = "";
        $scope.AMCCUSTOMER_ID = "";
        $scope.AMCCUSTOMER_NAME = "";
        $scope.AMCCUSTOMER_TYPE = "";
        $scope.AMCFIRM_ID = "";
        $scope.AMCCUSTOMER_FIRM_NAME = "";
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

    $scope.AdminClickAMC = function () {
        ClearAMC();
        $scope.AMCCUSTOMER_ID = $scope.CustomerList[0].Customer_ID;
        $scope.AMCFIRM_ID = $scope.CustomerList[0].FIRM_ID;
        $scope.AMCCUSTOMER_TYPE_ID = $scope.CustomerList[0].CUSTOMER_TYPE_ID;
        $scope.AMCCUSTOMER_NAME = $scope.CustomerList[0].CUSTOMER_NAME;
        $scope.AMCCUSTOMER_FIRM_NAME = $scope.CustomerList[0].FIRM_NAME;

        if ($scope.CUSTOMER_TYPE_ID === 3) {
            GetAllProductsAMC();
            $scope.AMC_CMC_ID = null;
            Get_AMCAccessories();
            tb_Admin = {
                GenerateNoFor: "AMC-CMC",
                CustomerTypeId: $scope.CUSTOMER_TYPE_ID
            }
            var LatestDocNo = CustomerService.GetLatestUniqueCode(tb_Admin);
            LatestDocNo.then(function (response) {
                $scope.LatestRecordAMC = response.data;
                $scope.CONTRACT_DOCUMENT_NO = $scope.LatestRecordAMC;
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
                $scope.LatestRecordAMC = response.data;
                $scope.CONTRACT_DOCUMENT_NO = $scope.LatestRecordAMC;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $scope.CONTRACT_DATE = today;
            });
        }

        $scope.Admin_Action_AMC = "Add AMC/CMC";

        GetAllCustomersAMC();
        GetAllCustomerFirmAMC();
        $("#AMC_AddUpdate").modal("show");
        console.log($scope.AddPaymentAMC);
    };

    $scope.getForUpdateAMC = function (admin) {

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
        $scope.AMCCUSTOMER_ID = admin.CUSTOMER_ID;
        //$scope.GetCustomerChangeAMC();
        $scope.AMCCUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.AMCCUSTOMER_TYPE_ID = admin.CUSTOMER_TYPE;
        //document.getElementById("CUSTOMER_ID").value = admin.CUSTOMER_ID;
        $scope.AMCFIRM_ID = admin.FIRM_ID;
        $scope.AMCCUSTOMER_FIRM_NAME = admin.CUSTOMER_FIRM_NAME;
        $scope.CAT_ID = admin.CAT_ID;
        if ($scope.CUSTOMER_TYPE_ID === 3) {
            GetAllProductsAMC();
        }
        else {
            $scope.GetCategoryChangeAMC();
        }
        $scope.PRODUCT_NAME = admin.PRODUCT_NAME;
        //document.getElementById("CAT_ID").value = admin.CAT_ID;
        $scope.P_ID = admin.P_ID;
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
        $scope.Admin_Action_AMC = "Update AMC/CMC";
        $("#AMC_AddUpdate").modal("show");
        GetAllCustomerFirmAMC();
        $scope.CONTRACT_DATE = admin.CONTRACT_DATE;
        $scope.CONTRACT_FROM = admin.CONTRACT_FROM;
        $('#CONTRACT_FROM').datepicker('setDate', $scope.CONTRACT_FROM);
        $scope.CONTRACT_TO = admin.CONTRACT_TO;
        $('#CONTRACT_TO').datepicker('setDate', $scope.CONTRACT_TO);
        $scope.BANK_ID = parseInt(admin.BANK_ID);
        $scope.CONTRACT_TYPE_DETAILS = admin.CONTRACT_TYPE_DETAILS;

    };

    $scope.AddUpdateAccountAMC = function () {
        if ((companyId === 1 || companyId === 13) &&
            (!$scope.FEES_IN_GST || $scope.IS_FEES_INC_GST === undefined)) {
            alert("Please fill all mandatory fields for Fees In GST and Is Fees Including GST!");
            return;
        }

        if (!$("#CONTRACT_DATE").val()) {
            alert("Please Select Contract Date!");
            return;
        }

        $scope.CONTRACT_DATE = $("#CONTRACT_DATE").val();
        $scope.CONTRACT_FROM = $("#CONTRACT_FROM").val();
        $scope.CONTRACT_TO = $("#CONTRACT_TO").val();

        if ($scope.CONTRACT_TYPE !== 'CMC') {
            $scope.CONTRACT_TYPE_DETAILS = null;
        }

        let tb_Admin = {
            CONTRACT_DOCUMENT_NO: $scope.CONTRACT_DOCUMENT_NO,
            CONTRACT_TYPE: $scope.CONTRACT_TYPE,
            CONTRACT_PERIOD: $scope.CONTRACT_PERIOD,
            CUSTOMER_ID: $scope.AMCCUSTOMER_ID,
            CUSTOMER_NAME: $scope.AMCCUSTOMER_NAME,
            CUSTOMER_TYPE: $scope.AMCCUSTOMER_TYPE_ID,
            FIRM_ID: $scope.AMCFIRM_ID,
            CUSTOMER_FIRM_NAME: $scope.AMCCUSTOMER_FIRM_NAME,
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

        if ($scope.Admin_Action_AMC === "Add AMC/CMC") {
            AddAdminRecordAMC(tb_Admin);
        } else if ($scope.Admin_Action_AMC === "Update AMC/CMC") {
            EditAdminRecordAMC(tb_Admin);
        }
    };


    function AddAdminRecordAMC(tb_Admin) {
        var datalist = CustomerService.AddAdminAMC(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                ClearAMC(); AMCCMCDetails();
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

    function EditAdminRecordAMC(tb_Admin) {
        var datalist = CustomerService.EditAdminAMC(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                ClearAMC(); AMCCMCDetails();
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

    //$scope.PreviewAMC = function (admin) {

    //    $scope.CONTRACT_DETAILS = admin;


    //    if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
    //        $scope.CONTRACT_DETAILS = admin;
    //        $scope.AMC_CMC_ID = $scope.CONTRACT_DETAILS.AMC_CMC_ID;
    //        Get_AMCAccessories();
    //        $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES_IN_GST);

    //        $scope.CmpDetailsList = "";
    //        $scope.COMPANYNAME = "";
    //        $scope.COMPANYREGADDRESS = "";
    //        $scope.ZIPCODE = "";
    //        var getCmpDetails = CustomerService.GetCompanyBankDetails(admin.BANK_ID);
    //        //var getCmpDetails = CustomerService.GetCompanyBankDetails(0);
    //        getCmpDetails.then(function (response) {
    //            $scope.CmpDetailsList = response.data;
    //            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
    //            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
    //            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
    //            //$("#tempCustId").val($scope.RegularQuotationList[0].Q_ID);
    //        });
    //        if (admin.CONTRACT_TYPE === "AMC") {
    //            $("#AMCMedtronicDocument").modal("show");
    //        }
    //        else if (admin.CONTRACT_TYPE === "CMC") {
    //            $("#CMCMedtronicDocument").modal("show");
    //        }
    //    }

    //    else {
    //        $scope.CONTRACT_DETAILS = admin;
    //        $scope.CHEQUE = 'false';
    //        $scope.CASH = 'false';
    //        $scope.ONLINE_RTGS = 'false';
    //        $scope.CHEQUE2 = 'false';
    //        $scope.CASH2 = 'false';
    //        $scope.ONLINE_RTGS2 = 'false';

    //        if ($scope.CONTRACT_DETAILS.CONTRACT_TYPE === "AMC") {
    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cheque') {
    //                //document.getElementById("cheque").checked = true;
    //                $scope.CHEQUE = 'true';
    //            }
    //            else {
    //                //document.getElementById("cheque").checked = 'false';
    //                $scope.CHEQUE = 'false';
    //            }

    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cash') {
    //                //document.getElementById("cash").checked = 'true';
    //                $scope.CASH = 'true';
    //            }
    //            else {
    //                //document.getElementById("cash").checked = 'false';
    //                $scope.CASH = 'false';
    //            }
    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Online/RTGS') {
    //                //document.getElementById("cash").checked = 'true';
    //                $scope.ONLINE_RTGS = 'true';
    //            }
    //            else {
    //                //document.getElementById("cash").checked = 'false';
    //                $scope.ONLINE_RTGS = 'false';
    //            }
    //        }
    //        else {
    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cheque') {
    //                //document.getElementById("cheque2").checked = 'true';
    //                $scope.CHEQUE2 = 'true';
    //            }
    //            else {
    //                //document.getElementById("cheque2").checked = 'false';
    //                $scope.CHEQUE2 = 'false';
    //            }

    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Cash') {
    //                //document.getElementById("cash2").checked = 'true';
    //                $scope.CASH2 = 'true';
    //            }
    //            else {
    //                //document.getElementById("cash2").checked = 'false';
    //                $scope.CASH2 = 'false';
    //            }
    //            if ($scope.CONTRACT_DETAILS.FEES_PAID_BY === 'Online/RTGS') {
    //                //document.getElementById("cash").checked = 'true';
    //                $scope.ONLINE_RTGS2 = 'true';
    //            }
    //            else {
    //                //document.getElementById("cash").checked = 'false';
    //                $scope.ONLINE_RTGS2 = 'false';
    //            }
    //        }

    //        $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES_IN_GST);
    //        $scope.CmpDetailsList = "";
    //        $scope.COMPANYNAME = "";
    //        $scope.COMPANYREGADDRESS = "";
    //        $scope.ZIPCODE = "";
    //        var getCmpDetails = CustomerService.GetCompanyBankDetails(admin.BANK_ID);

    //        getCmpDetails.then(function (response) {
    //            $scope.CmpDetailsList = response.data;
    //            $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
    //            $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
    //            $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
    //        });
    //        if (admin.CONTRACT_TYPE === "AMC") {
    //            $("#AMCDocument").modal("show");
    //        }
    //        else if (admin.CONTRACT_TYPE === "CMC") {
    //            $("#CMCDocument").modal("show");
    //        }
    //    }
    //}

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
    $scope.PreviewAMC = function (admin) {

        $scope.CONTRACT_DETAILS = admin;


        if ($scope.CUSTOMER_TYPE_NAME === "Medtronic") {
            $scope.CONTRACT_DETAILS = admin;
            $scope.AMC_CMC_ID = $scope.CONTRACT_DETAILS.AMC_CMC_ID;
            Get_AMCAccessories();
            $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES);

            $scope.CmpDetailsList = "";
            $scope.COMPANYNAME = "";
            $scope.COMPANYREGADDRESS = "";
            $scope.ZIPCODE = "";
            var getCmpDetails = CustomerService.GetCompanyBankDetails(admin.BANK_ID);
            //var getCmpDetails = CustomerService.GetCompanyBankDetails(0);
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

            $scope.amtInwords = inWords($scope.CONTRACT_DETAILS.FEES);
            $scope.CmpDetailsList = "";
            $scope.COMPANYNAME = "";
            $scope.COMPANYREGADDRESS = "";
            $scope.ZIPCODE = "";
            var getCmpDetails = CustomerService.GetCompanyBankDetails(admin.BANK_ID);

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
        }
    }


    $scope.PrintAMC = function (id) {

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

    //////////// ADD DeliveryChallan //////////////////
    $scope.AddDeliveryChallan_btn_Clicked = function () {

        ClearDeliveryChallanModal();
        $scope.Action = "Add";

        $("#AddUpdateDeliveryChallan").modal("show");
    }

    ///////////////// UPDATE DeliveryChallan //////////////////////

    $scope.UpdateDeliveryChallan_btn_Clicked = function (DeliveryChallan) {
        ClearDeliveryChallanModal();
        $scope.Action = "Update";
        $("#AddupdateDeliveryChallanlist").modal("show");
        $scope.DeliveryChallan_ID = DeliveryChallan.DeliveryChallan_ID;
        $scope.DeliveryChallan_NAME = DeliveryChallan.DeliveryChallan_NAME;
        $scope.DeliveryChallan_PHOTO = DeliveryChallan.DeliveryChallan_PHOTO;
        $scope.DeliveryChallan_TYPE = DeliveryChallan.DeliveryChallan_TYPE;
        $scope.STATE_ID = DeliveryChallan.STATE_ID;
        $scope.GetDistrict();
        $scope.CITY_ID = DeliveryChallan.CITY_ID;
        $scope.USER_TYPE = DeliveryChallan.USER_TYPE;

        setTimeout(function myfunction() {
            var blankSelectOptions = $('option[value$="?"]');
            if (blankSelectOptions.length > 0) {
                $(blankSelectOptions).remove();
            }
            $scope.PreviewImage = $scope.DeliveryChallan_PHOTO;
            $scope.$apply();
        }, 500);
    }

    $scope.AddupdateDeliveryChallanlist = function () {

        var tb_DeliveryChallan = {
            DeliveryChallan_ID: $scope.DeliveryChallan_ID,
            DeliveryChallan_NAME: $scope.DeliveryChallan_NAME,
            DeliveryChallan_PHOTO: $scope.DeliveryChallan_PHOTO,
            DeliveryChallan_TYPE: $scope.DeliveryChallan_TYPE,
            CITY_ID: $scope.CITY_ID,
            STATE_ID: $scope.STATE_ID,
            USER_TYPE: $scope.USER_TYPE
        }

        if ($scope.Action === "Add") {
            tb_DeliveryChallan = getImageData(chooseimageFileUploader_AddDeliveryChallan, tb_DeliveryChallan);
            tb_DeliveryChallan.DeliveryChallan_PHOTO = tb_DeliveryChallan.IsImageChoosen;

            if (tb_DeliveryChallan.DeliveryChallan_PHOTO === "No") {
                alert("Please Choose DeliveryChallan Image");
                return false;
            }

            if (tb_DeliveryChallan.CITY_ID === undefined) {
                alert("Please Choose District Name");
                return false;
            }

            if (tb_DeliveryChallan.USER_TYPE === undefined) {
                alert("Please Choose User Type");
                return false;
            }
            AddDeliveryChallan(tb_DeliveryChallan);
        }
        else if ($scope.Action === "Update") {
            tb_DeliveryChallan = getImageData(chooseimageFileUploader_AddDeliveryChallan, tb_DeliveryChallan);
            if (tb_DeliveryChallan.IsImageChoosen === "Yes") {
                tb_DeliveryChallan.DeliveryChallan_PHOTO = "Yes";
            }
            else {
                tb_DeliveryChallan.DeliveryChallan_PHOTO = $scope.DeliveryChallan_PHOTO;
            }
            UpdateDeliveryChallan(tb_DeliveryChallan);
        }
    }

    function ClearDeliveryChallanModal() {
        $scope.DeliveryChallan_ID = "";
        $scope.DeliveryChallan_PHOTO = "";
        $scope.DeliveryChallan_NAME = "";
    }

    function AddDeliveryChallan(tb_DeliveryChallan) {
        var data = DeliveryChallanService.AddDeliveryChallan(tb_DeliveryChallan);
        data.then(function (response) {

            if (response.data.success === 1) {
                alert("DeliveryChallan Added Successfully");
                $("#AddupdateDeliveryChallanlist").modal("hide");
                GetTotalcount();
            }
            else if (response.data.success === -1) {
                alert("DeliveryChallan Already Exist.");

            }
            else {
                alert("Error to add DeliveryChallan");
            }

        }, function (error) {
            alert("Error to add DeliveryChallan..." + JSON.stringify(error));
        });
    }

    function UpdateDeliveryChallan(tb_DeliveryChallan) {
        var data = DeliveryChallanService.UpdateDeliveryChallan(tb_DeliveryChallan);
        data.then(function (response) {


            if (response.data.success === 1) {
                alert("DeliveryChallan Updated Successfully");
                $("#AddupdateDeliveryChallanlist").modal("hide");
                GetTotalcount();
            }
            else if (response.data.success === -1) {
                alert(" DeliveryChallan Name Already Exist.");

            }
            else {
                alert("Error to update DeliveryChallan");
            }
        }, function (error) {
            alert("Error to update DeliveryChallan..." + JSON.stringify(error));
        });
    }

    $scope.DeleteRecord = function () {

        var data = DeliveryChallanService.DeleteRecord();
        data.then(function (response) {

            if (response.data.success === 1) {
                alert("DeliveryChallan Added Successfully");
                $("#AddupdateDeliveryChallanlist").modal("hide");
                GetTotalcount();
            }
            else if (response.data.success === -1) {
                alert("DeliveryChallan Already Exist.");

            }
            else {
                alert("Error to add DeliveryChallan");
            }

        }, function (error) {
            alert("Error to add DeliveryChallan..." + JSON.stringify(error));
        });
    }

    $scope.DeleteExistingRecord = function (id) {
        var data = {
            INVOICE_ID: 0,
            INVOICE_FOR: null,
            INVOICE_MED_ACC_ID: null
        }

        if (id == "Regular") {
            var datalist = CustomerService.Delete_IM_SparePartsAndAccessories(data);
        }
        else if (id == "Medtronic") {
            var datalist = CustomerService.Delete_IM_MedtronicAccessories(data);
        }
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_IM_SparePartsAndAccessories();
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
    $scope.updatePaymentMode = function (paymentMode) {
        $scope.CASH2 = paymentMode === 'Cash';
        $scope.CHEQUE2 = paymentMode === 'Cheque';
        $scope.ONLINE_RTGS2 = paymentMode === 'Online/RTGS';
    };

});