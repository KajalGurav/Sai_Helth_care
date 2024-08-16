app.service("CustomerServiceCallService", function ($http) {



    this.GetForPrint = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Service_Master/GetServiceCallReportForPrint",
            params: {
                serviceCallID: id
            }
        });
        return response;
    };

    this.GetCompanyBankDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Customer_Service_Master/GetCmpnyBankDetails",
            params: {
                bankid: id
            }
        });
        return response;
    };
});


app.controller("CustomerServiceCallReportCtrl", function ($scope, CustomerServiceCallService) {


    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    $scope.SERVICE_CALL_ID = parseInt(PARAM[3].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    var SERVICE_CALL_ID = $scope.SERVICE_CALL_ID;
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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    $scope.REPORT_DATE = today;

    GetForPrint();

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

    function inWords(num) {
        var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        if(num == 0) return 'Zero Only'
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
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : '';
        }

        return str;
    }


    function GetForPrint() {
        var getAdmin = CustomerServiceCallService.GetForPrint($scope.SERVICE_CALL_ID);
        getAdmin.then(function (response) {
            $scope.ServiceCallDetailsList = response.data;
            $scope.SparePartList = $scope.ServiceCallDetailsList.sparePartsList;
            $scope.BANK_ID = $scope.ServiceCallDetailsList.BANK_ID;

            $scope.FinalAmount = 0;
            if ($scope.SparePartList !== null && $scope.SparePartList !== undefined) {
                if ($scope.SparePartList.length > 0) {
                    for (let i = 0; i < $scope.SparePartList.length; i++) {
                        $scope.FinalAmount = $scope.FinalAmount + Math.round($scope.SparePartList[i].AMOUNT * $scope.SparePartList[i].QUANTITY);
                    }
                }

            }
            

            $scope.FinalAmountInWords = inWords(Math.round($scope.FinalAmount));

            if ($scope.BANK_ID !== null && $scope.BANK_ID !== "" && $scope.BANK_ID !== undefined) {
                var getCompany = CustomerServiceCallService.GetCompanyBankDetails($scope.BANK_ID);
                getCompany.then(function (response) {
                    $scope.CmpDetailsList = response.data;
                    $scope.COMPANYNAME = $scope.CmpDetailsList[0].COMPANY_NAME;
                    $scope.COMPANYREGADDRESS = $scope.CmpDetailsList[0].COMPANY_REG_ADDRESS;
                    $scope.ZIPCODE = $scope.CmpDetailsList[0].ZIP_CODE;
                    $scope.GST_NO = $scope.CmpDetailsList[0].GST_NO;
                    $scope.PAN_NO = $scope.CmpDetailsList[0].PAN_NO;
                });
            }


        });
    }
   

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

});