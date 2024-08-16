app.service("CustomerPaymentService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/PaymentReceipt/GetPaymentReceiptList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    //this.GetPaymentCompanyDetails = function () {
    //    return $http.get("/PaymentReceipt/GetPaymentCompanyDetails");
    //};
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
});


app.controller("adminCtrl", function ($scope, CustomerPaymentService) {

    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();

    //$scope.PAGE_NAME = "Master";
    //if ($scope.PAGE_NAME == "Master"){
    //    $scope.CUSTOMER_TYPE_ID = null;
    //}
    //else
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
    $scope.pageSize = 30;
    $scope.CUSTOMER_ID = null;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;
    //$("#loader").css("display", '');
    //Clear();
    //$scope.PageNo = 1;
    //$scope.pageSize = 10;
    //$scope.FARMER_SEARCH = null;
    //$scope.STATE_SEARCH = null;
    GetTotalcount();


    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = CustomerPaymentService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.PaymentReceiptList = "";
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
            STARTING_DATE:$scope.STARTING_DATE,
            ENDING_DATE:$scope.ENDING_DATE
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
        var getrecord = CustomerPaymentService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.PaymentReceiptList = response.data;
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

    $scope.PreviewPR = function (admin) {
        $scope.RECEIPT_NO = admin.PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_ID = admin.CUSTOMER_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.CUSTOMER_TYPE = admin.CUSTOMER_TYPE;
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

        $scope.amtInwords = inWords($scope.AMOUNT_RECEIVED);

        var getCompany = CustomerPaymentService.GetCompanyDetails(parseInt($scope.BANK_ID));
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
            //var getCmpDetails = CustomerPaymentService.GetPaymentCompanyDetails();
            //getCmpDetails.then(function (response) {
            //    $scope.CmpDetailsList = response.data;
            //    $scope.COMPANYNAME = $scope.CmpDetailsList.COMPANY_NAME;
            //    $scope.COMPANYREGADDRESS = $scope.CmpDetailsList.COMPANY_REG_ADDRESS;
            //    $scope.ZIPCODE = $scope.CmpDetailsList.ZIP_CODE;
            //    //$("#tempCustId").val($scope.RegularQuotationList[0].Q_ID);
            //});

            
            $("#PreviewPR").modal("show");
        }
        

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

    }

    $scope.ShowReceiptFor = function (admin) {
        $scope.RECEIPT_NO = admin.PAYMENT_RECEIPT_NO;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.RECORD_ID = admin.PAYMENT_REF_NO;
        $scope.RECIEPT_FOR = admin.RECIEPT_FOR;
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
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

        //str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }

});