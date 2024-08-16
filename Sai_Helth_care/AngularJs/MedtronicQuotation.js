app.service("QuotationService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetCustomerList = function () {
        return $http.get("/MedtronicQuotation/GetCustomerList");
    };


    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetMedtronicQotDetails = function () {
        return $http.get("/MedtronicQuotation/GetMedtronicQotDetails");
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetProduct = function () {
        return $http.get("/MedtronicQuotation/GetProduct");
    };


    this.GetSparepart = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/GetSparepart",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetStdAccPart = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetStdAccPart",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddProductDetails = function (tb_Admin) {
       //   alert(tb_Admin.CUSTOMER_ID);
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/AddProductDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetProductDetails = function () {
        return $http.get("/MedtronicQuotation/GetProductDetails");
    };


    this.Admin_Delete = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicQuotation/Delete_Admin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCompanyBankDetails = function () {
        return $http.get("/MedtronicQuotation/GetCmpnyBankDetails");
    };
    this.GetProductQuotDetails = function () {
        //to get details in specific format
        return $http.get("/MedtronicQuotation/GetProductQuotDetails");
    };

    this.GetProducDetails = function () {
        //to get details in specific format
        return $http.get("/MedtronicQuotation/GetProducDetails");
    };

    this.UpdateQuotationDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/UpdateQuotationDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetLatestRecords = function (idType) {
        var response = $http({
            method: "GET",
            url: "/MedtronicQuotation/GetLatestRecordByType",
            params: {
                idType: idType
            }
        });
        return response;
    };

});

app.controller("MedtronicQuotationCtrl", function ($scope, QuotationService) {
    var splitted = window.location.pathname.split('/');
    splitted.pop();
    if (splitted.join('/') === "/MedtronicQuotation/ViewQuote") {
        GetDetailsQuotation();
        GetAllProduct();
        GetProductQuotationDetails();
        GetallProductQuotDetails();
        $scope.StdAccDisplay = "No";

    }
    else if (window.location.pathname === "/MedtronicQuotation/Index") {
        $("#loader").css("display", '');
        $scope.PageNo = 1;
        $scope.pageSize = 10;
        $scope.FARMER_SEARCH = null;
        $scope.STATE_SEARCH = null;
        GetTotalcount();
    }
    else if (window.location.pathname === "/MedtronicQuotation/MedtronicQueAdd") {
        GetAllCustomer();
        GetLatestRecord();
        function GetLatestRecord() {
            var LatestDocNo = QuotationService.GetLatestRecords("Quotation");
            LatestDocNo.then(function (response) {
                $scope.LatestRecord = response.data;
                $scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            });
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.QUOTATION_DATE = today;
        }
    }

    
    //GetDetailsQuotation();
    //GetAllCustomer();
    //GetallProductQuotDetails();

    

    

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = QuotationService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.MedtronicQuotationList = "";
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

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.FARMER_SEARCH,
            STATE_ID: $scope.STATE_SEARCH,
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

            $scope.pager.pages.length = 0;
            $scope.FarmerList = {};

            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;

        GetRecordbyPaging();
    }


    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = QuotationService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.MedtronicQuotationList = response.data;

            //GetProductQuotationDetails();

            //$scope.Q_ID = $scope.MedtronicQuotationList[0].Q_ID;
            //$scope.QUOTATION_TYPE = $scope.MedtronicQuotationList[0].QUOTATION_TYPE;
            //$scope.CUSTOMER_ID = $scope.MedtronicQuotationList[0].CUSTOMER_ID;
            //$scope.FIRM_ID = $scope.MedtronicQuotationList[0].FIRM_ID;
            //$scope.QUOTATION_DATE = $scope.MedtronicQuotationList[0].QUOTATION_DATE;
            //$scope.PNDT_STATUS = $scope.MedtronicQuotationList[0].PNDT_STATUS;
            //$scope.PNDT_NO = $scope.MedtronicQuotationList[0].PNDT_NO;
            //$scope.STATUS = $scope.MedtronicQuotationList[0].STATUS;
            //$scope.PO_DATE = $scope.MedtronicQuotationList[0].PO_DATE;
            //$scope.PAYMENT_TERM = $scope.MedtronicQuotationList[0].PAYMENT_TERM;
            //$scope.NOTE = $scope.MedtronicQuotationList[0].NOTE;

            //$scope.QUOTATION_DATE = $("#QUOTATION_DATE").val();
            //$scope.PO_DATE = $("#PO_DATE").val();


            //setTimeout(function myfunction() {
            //    var blankSelectOptions = $('option[value$="?"]');
            //    if (blankSelectOptions.length > 0) {
            //        $(blankSelectOptions).remove();
            //    }
            //    $("#CUSTOMER_ID").val($scope.CUSTOMER_ID);
            //    $("#FIRM_ID").val($scope.FIRM_ID);

            //}, 500);

            //GetAllCustomer();


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

    function GetDetailsQuotation() {
        var getAdmin = QuotationService.GetMedtronicQotDetails();
        getAdmin.then(function (response) {
            $scope.MedtronicQuotDetailList = response.data;
           // alert(JSON.stringify($scope.MedtronicQuotDetailList));

            $("#tempCustId").val($scope.MedtronicQuotDetailList[0].CUSTOMER_ID);
           // alert($("#tempCustId").val());
            //console.log($scope.QuotationList[0].CUSTOMER_ID);
            //console.log($scope.QuotationList);

            //Load Product data in Left Table
            GetAllProduct();
        });
    }

    $scope.SearchAdmin = function () {

        GetTotalcount();
    };


    function GetProductQuotationDetails() {
        $scope.total_PRODUCTPRICE = 0;
        $scope.total_ACCPRICE = 0;
        //var getAdmin = QuotationService.GetProductDetails();
        //getAdmin.then(function (response) {
        //    $scope.ProductQuotationList = response.data;
        //    var getProdList = QuotationService.GetProducDetails();
        //    getProdList.then(function (response) {
        //        $scope.GroupProductList = response.data;
        //    })
        //    //console.log(JSON.stringify($scope.ProductQuotationList) + "Lenght" + $scope.ProductQuotationList.length);

        //    //if ($scope.ProductQuotationList.length > 0) {
        //    //    //for (i = 0; i < $scope.ProductQuotationList.length; i++) {  //loop through the array
        //    //    //    $scope.total_PRODUCTPRICE = $scope.total_PRODUCTPRICE + parseInt($scope.ProductQuotationList[i].PRODUCTPRICE);  //Do the math!
        //    //    //}  

        //    //    $scope.total_PRODUCTPRICE = parseInt($scope.ProductQuotationList[0].QUANTITY) * parseInt($scope.ProductQuotationList[0].PRODUCTPRICE);  //Do the math!

        //    //    for (i = 0; i < $scope.ProductQuotationList.length; i++) {  //loop through the array
        //    //        //console.log($scope.ProductQuotationList[i].ACCPRICE);
        //    //        //console.log(parseInt(($scope.ProductQuotationList[i].ACCPRICE).replace(',', '')));
        //    //        $scope.total_ACCPRICE = $scope.total_ACCPRICE + parseInt(($scope.ProductQuotationList[i].ACCPRICE).replace(',', ''));  //Do the math!
        //    //    }
        //    //} 
        //    //$scope.final = $scope.total_PRODUCTPRICE + $scope.total_ACCPRICE;

        //    //alert($scope.total_PRODUCTPRICE);
        //});
        var getProdList = QuotationService.GetProducDetails();
        getProdList.then(function (response) {
            $scope.GroupProductList = response.data;
        });
    }


    function GetallProductQuotDetails() {
        $scope.total_PRODUCTPRICE = 0;
        $scope.total_ACCPRICE = 0;

        var getprodList = QuotationService.GetProductDetails();
        getprodList.then(function (result) {
            $scope.ProductQuotationList = result.data;

            var getAdmin = QuotationService.GetProductQuotDetails();
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;
                $scope.total_PRODUCTPRICE = 0;
                $scope.total_ACCPRICE = 0;
                $scope._SPARE_PARTLIST2 = "";

                if ($scope.ProductQuotList.length > 0) {
                    for (j = 0; j < $scope.ProductQuotList.length; j++) {
                        $scope._SPARE_PARTLIST2 = "";
                        var count = 0;
                        for (i = 0; i < $scope.ProductQuotationList.length; i++) {

                            if ($scope.ProductQuotationList[i].PRODUCTNAME === $scope.ProductQuotList[j].PRODUCTNAME) {
                                if ($scope.ProductQuotationList[i].AccID === 0) {
                                    continue;
                                }
                                else {
                                    if (count < $scope.ProductQuotList[j].SPARE_PARTLIST.length) {
                                        $scope._SPARE_PARTLIST2 = $scope.ProductQuotList[j].SPARE_PARTLIST;
                                        $scope.ProductQuotationList[i].SPARE_QUANTITY = $scope._SPARE_PARTLIST2[count].SPARE_QUANTITY;
                                    }
                                    count = count + 1;
                                }
                            }
                            else {
                                continue;
                            }
                        }
                    }

                }

                if ($scope.ProductQuotList.length > 0) {
                    //for (i = 0; i < $scope.ProductQuotationList.length; i++) {  //loop through the array
                    //    $scope.total_PRODUCTPRICE = $scope.total_PRODUCTPRICE + parseInt($scope.ProductQuotationList[i].PRODUCTPRICE);  //Do the math!
                    //}  

                    //$scope.total_PRODUCTPRICE=0
                    for (i = 0; i < $scope.ProductQuotList.length; i++) {
                        $scope.total_PRODUCTPRICE = $scope.total_PRODUCTPRICE + parseInt($scope.ProductQuotList[i].QUANTITY) * parseInt($scope.ProductQuotList[i].PRODUCTPRICE);  //Do the math!
                        //console.log(parseInt($scope.ProductQuotList[i].PRODUCTPRICE)+ '*'+parseInt($scope.ProductQuotList[i].QUANTITY) +'='+ parseInt($scope.total_PRODUCTPRICE));
                        $scope._SPARE_PARTLIST2 = $scope.ProductQuotList[i].SPARE_PARTLIST;
                        for (j = 0; j < $scope._SPARE_PARTLIST2.length; j++) {
                            //console.log($scope._SPARE_PARTLIST[j].SPARE_PART + ' for ' + $scope._SPARE_PARTLIST[j].ACCPRICE);
                            $scope.total_ACCPRICE = $scope.total_ACCPRICE + (parseInt($scope._SPARE_PARTLIST2[j].SPARE_QUANTITY) * parseInt($scope._SPARE_PARTLIST2[j].ACCPRICE));
                            //console.log($scope._SPARE_PARTLIST[j].SPARE_PART+'=' + parseInt($scope.total_ACCPRICE));//Do the math!
                        }//loop through the array

                        //console.log(parseInt(($scope.ProductQuotationList[i].ACCPRICE).replace(',', '')));
                    }
                }
                //console.log($scope.total_PRODUCTPRICE);
                //console.log($scope.total_ACCPRICE);

                $scope.final = $scope.total_PRODUCTPRICE + $scope.total_ACCPRICE;   
                //console.log(JSON.stringify($scope.ProductQuotationList) + "Lenght" + $scope.ProductQuotationList.length);

                //if ($scope.ProductQuotationList.length > 0) {
                //    //for (i = 0; i < $scope.ProductQuotationList.length; i++) {  //loop through the array
                //    //    $scope.total_PRODUCTPRICE = $scope.total_PRODUCTPRICE + parseInt($scope.ProductQuotationList[i].PRODUCTPRICE);  //Do the math!
                //    //}  

                //    $scope.total_PRODUCTPRICE = parseInt($scope.ProductQuotationList[0].QUANTITY) * parseInt($scope.ProductQuotationList[0].PRODUCTPRICE);  //Do the math!

                //    for (i = 0; i < $scope.ProductQuotationList.length; i++) {  //loop through the array
                //        //console.log($scope.ProductQuotationList[i].ACCPRICE);
                //        //console.log(parseInt(($scope.ProductQuotationList[i].ACCPRICE).replace(',', '')));
                //        $scope.total_ACCPRICE = $scope.total_ACCPRICE + parseInt(($scope.ProductQuotationList[i].ACCPRICE).replace(',', ''));  //Do the math!
                //    }
                //}

                //$scope.final = $scope.total_PRODUCTPRICE + $scope.total_ACCPRICE;
            });
        });
    }

    $scope.getdate = function () {

        $scope.STARTING_DATE = $("#STARTING_DATE").val();
        $scope.ENDING_DATE = $("#ENDING_DATE").val();

        GetTotalcount();
    };

    $scope.ShowHideStdAcc = function () {
        if (document.getElementById("STDACCESSORIES").checked === true) {
            value = $('.STD_ACC:checked').val();
            console.log(value);
            isCheck = true;
            $scope.IS_WITH_STANDARD_ACC = "Yes";
            document.getElementById("StdAccTB").style.display = "block";
            document.getElementById("STDACCESSORIES").checked = true;
            if ($scope.StdAccPartList.length < 1) {
                isCheck = false;
                $scope.IS_WITH_STANDARD_ACC = "No";
                document.getElementById("StdAccTB").style.display = "none";
                document.getElementById("STDACCESSORIES").checked = false;
                $("#STDACCESSORIES").change(function () {
                    if (!this.checked) {
                        document.getElementById("checkAllChkboxStd").checked = false;
                        $(".StdAccParts").each(function () {
                            this.checked = false;
                        });
                    }
                });
                alert("No Standard Accessories available for this product!");
            }
        }
        else {
            isCheck = false;
            $scope.IS_WITH_STANDARD_ACC = "No";
            document.getElementById("StdAccTB").style.display = "none";
            document.getElementById("STDACCESSORIES").checked = false;
            $("#STDACCESSORIES").change(function () {
                if (!this.checked) {
                    document.getElementById("checkAllChkboxStd").checked = false;
                    $(".StdAccParts").each(function () {
                        this.checked = false;
                    });
                }
            });
        }
    }



    function GetAllCustomer() {
        var getAdmin = QuotationService.GetCustomerList();
        getAdmin.then(function (response) {
            $scope.CustomerList = response.data;
        });
    }


    $scope.GetFirmChange = function () {
        console.log($scope.CUSTOMER_ID);
        var id = $scope.CUSTOMER_ID;
        var Customer = $scope.CustomerList.filter(x => x.Customer_ID == id)[0];
        $scope.CUSTOMER_NAME = Customer.CUSTOMER_NAME;
        GetCustomerFirm();

    };


    function GetCustomerFirm() {
        var getAdmin = QuotationService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;
            console.log($scope.CustomerFirmList);
            var id = $scope.FIRM_ID;
            var Firm = $scope.CustomerFirmList.filter(x => x.F_ID == id)[0];
            $scope.FIRM_NAME = Firm.FIRM_NAME;
        });
    }

    function GetAllProduct() {
        var getAdmin = QuotationService.GetProduct();
        getAdmin.then(function (response) {
            
            $scope.ProductList = response.data;
            GetProductQuotationDetails();
            GetallProductQuotDetails();
        });
    }




    $scope.Getspare = function (Product) {
        //alert(Product.P_ID);
        $scope.P_ID = Product.P_ID;
        GetAllSparepart();
    };


    function GetAllSparepart() {
        
        var getAdmin = QuotationService.GetSparepart($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparepartList = response.data;

            $scope.SP_ID = $scope.SparepartList[0].SP_ID;

        });
        var getStd = QuotationService.GetStdAccPart($scope.P_ID);
        getStd.then(function (response) {
            $scope.StdAccPartList = response.data;
            //$scope.SP_ID = $scope.SparepartList[0].SP_ID;

        });
    }

    
    $scope.OnCategoryClick = function (id) {

        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
           
           
            Clear();
            GetDetailsQuotation();
            console.log($scope.AddPayment1);
            console.log($scope.MedtronicQuotDetailList[0]);
            //$scope.PO_DATE = $("#PO_DATE").val();
            $scope.Q_ID = $scope.MedtronicQuotDetailList[0].Q_ID;
            $scope.QUOTATION_TYPE = $scope.MedtronicQuotDetailList[0].QUOTATION_TYPE;
            $scope.QUOTATION_NO = "";
            $scope.QUOTATION_NO = $scope.MedtronicQuotDetailList[0].QUOTATION_NO;
            $scope.CUSTOMER_ID = $scope.MedtronicQuotDetailList[0].CUSTOMER_ID;
            $scope.CUSTOMER_NAME = $scope.MedtronicQuotDetailList[0].CUSTOMER_NAME;
            $scope.FIRM_ID = $scope.MedtronicQuotDetailList[0].FIRM_ID;
            $scope.FIRM_NAME = $scope.MedtronicQuotDetailList[0].FIRM_NAME;
            $scope.QUOTATION_DATE = $scope.MedtronicQuotDetailList[0].QUOTATION_DATE;
            $scope.PNDT_STATUS = $scope.MedtronicQuotDetailList[0].PNDT_STATUS;
            $scope.PNDT_NO = $scope.MedtronicQuotDetailList[0].PNDT_NO;
            $scope.PO_DATE = $scope.MedtronicQuotDetailList[0].PO_DATE;
           // $("#PO_DATE").value = $scope.PO_DATE;
            $scope.PAYMENT_TERM = $scope.MedtronicQuotDetailList[0].PAYMENT_TERM;
            $scope.STATUS = $scope.MedtronicQuotDetailList[0].STATUS;
            $scope.NOTE = $scope.MedtronicQuotDetailList[0].NOTE;

            //setTimeout(function myfunction() {
            //    var blankSelectOptions = $('option[value$="?"]');
            //    if (blankSelectOptions.length > 0) {
            //        $(blankSelectOptions).remove();
            //    }

            //    $("#CUSTOMER_ID").val($scope.CUSTOMER_ID);
            //    $("#FIRM_ID").val($scope.FIRM_ID);
            //}, 1200);
            GetAllCustomer();
            GetCustomerFirm();
            //var id = $scope.FIRM_ID;
            //var Firm = $scope.CustomerFirmList.filter(x => x.F_ID == id)[0];
            //$scope.FIRM_NAME = Firm.FIRM_NAME;
        }
        else if (id === '1') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
            //GetRecordbyPaging();
            GetAllProduct();
            GetProductQuotationDetails();
            GetallProductQuotDetails();
        }
    }



    function Clear() {

        $scope.QUOTATION_TYPE = "";
        $scope.QUOTATION_NO = "";
        $scope.CUSTOMER_ID = "";
        $scope.FIRM_ID = "";
        $scope.QUOTATION_DATE = "";
        $scope.PNDT_STATUS = "";
        $scope.PNDT_NO = "";
        $scope.PO_DATE = "";
        $scope.PRODUCT_QUANTITY = "";
        $scope.PROCUCT_PRICE = "";
        $scope.PAYMENT_TERM = "";
        $scope.NOTE = "";

    }

    $scope.Clearall = function () {

        Clear();
    };



    $scope.getForUpdate = function () {


        $scope.PO_DATE = $("#PO_DATE").val();
        tb_Admin = {

            QUOTATION_TYPE: $scope.QUOTATION_TYPE,
            QUOTATION_NO: $scope.QUOTATION_NO,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID,
            STATUS: $scope.STATUS,
            QUOTATION_DATE: $scope.QUOTATION_DATE,
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.PO_DATE,
            PAYMENT_TERM: $scope.PAYMENT_TERM,
            NOTE: $scope.NOTE,
            Q_ID: $scope.Q_ID,

        };

        EditAdminRecord(tb_Admin);

    };

    $scope.AddAdmin = function () {

        $scope.PO_DATE = $("#PO_DATE").val();

        tb_Admin = {

            QUOTATION_TYPE: $scope.QUOTATION_TYPE,
            QUOTATION_NO: $scope.QUOTATION_NO,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID,
            STATUS: $scope.STATUS,
            QUOTATION_DATE: $scope.QUOTATION_DATE,
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.PO_DATE,
            PAYMENT_TERM: $scope.PAYMENT_TERM,
            NOTE: $scope.NOTE,

        };

        //if ($scope.Admin_Action === "Add Quotation") {

        //    AddAdminRecord(tb_Admin);
        //}

        //else if ($scope.Admin_Action === "Update Quotation") {

        //    EditAdminRecord(tb_Admin);
        //}

        AddAdminRecord(tb_Admin);
    }

    function AddAdminRecord(tb_Admin) {
        var datalist = QuotationService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                Clear();
                alert("Quotation added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
                window.location.href = "/MedtronicQuotation/Index"; 
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
                //GetRecordbyPaging();
                alert("Quotation Updated successfully.");
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



    ///////////////// PRODUCT QUOTATION ///////////

    $scope.AddProduct = function (Sparepart) {
        //Spare Parts Id
        var chkidsarr = [];
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            var input = { Id: $(this).val().toString(), IsChecked: 1 };
            chkidsarr.push(input);
        });
        var chkids = "";
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            chkids += $(this).val() + ',';
        });
        if (chkids !== "") {
            $scope.SP_ID = chkids;
        }
        //else {
        //    if ($scope.SP_ID === null || $scope.SP_ID === undefined || $scope.SP_ID === "") {

        //        return false;
        //    }
        //}

        //Spare Parts Quantity
        var chkquantids = "";
        for (let i = 0; i < chkidsarr.length; i++) {
            var id = "#Q" + chkidsarr[i].Id.toString();
            chkquantids += $(id).val().toString() + ',';
        }
        if (chkquantids !== "") {
            $scope.SPQ_ID = chkquantids;
        }

        //Std Acc Id

        var chkstdids = "";
        $.each($(".checkbox_std input[type='checkbox']:checked"), function () {
            chkstdids += $(this).val() + ',';
        });
        if (chkstdids !== "") {
            $scope.STD_ID = chkstdids;
        }

        if ($scope.SP_ID === null || $scope.SP_ID === undefined || $scope.SP_ID === "") {

            $scope.SP_ID = ',';
        }
        if ($scope.STD_ID === null || $scope.STD_ID === undefined || $scope.STD_ID === "") {

            $scope.STD_ID = ',';
        }
        if ($scope.SPQ_ID === null || $scope.SPQ_ID === undefined || $scope.SPQ_ID === "") {

            $scope.SPQ_ID = ',';
        }
        CheckSTDACC();

        tB_product =
        {
            SP_ID1: $scope.SP_ID
        };
        tb_Admin = {
            P_ID: $scope.P_ID,
            //CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_ID: $("#tempCustId").val(),
            PRODUCT_QUANTITY: $scope.PRODUCT_QUANTITY,
            PROCUCT_PRICE: $scope.PROCUCT_PRICE,
            SP_ID: $scope.SP_ID,
            IS_WITH_STANDARD_ACC: $scope.IS_WITH_STANDARD_ACC,
            SPQ_ID: $scope.SPQ_ID,
            STD_ID: $scope.STD_ID
        };
        //alert(tb_Admin.CUSTOMER_ID);
        AddproductRecord(tb_Admin);
    }

    function CheckSTDACC() {
        var isCheck = false;
        $scope.IS_WITH_STANDARD_ACC = "No";
        var value = "";
        if (document.getElementById("STDACCESSORIES").checked === true) {
            value = $('.STD_ACC:checked').val();
        }
        if (value !== "") {
            console.log(value);
            isCheck = true;
            $scope.IS_WITH_STANDARD_ACC = "Yes";
        }

    };

    $scope.GotoPage = function (Sparepart) {
        $scope.SP_ID = Sparepart.SP_ID;
        window.location.href = "/MedtronicQuotation/ViewQuote/" + $scope.SP_ID;
        alert($scope.SP_ID);
    }
    function AddproductRecord(tb_Admin) {
        var datalist = QuotationService.AddProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                clearTax();
                //Clear();
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                //IsIncludeTax(result);
                //calTax(gstamt);
                alert("Product added successfully.");
                /*$("#AddProductAccessories").modal("hide");*/
                $("#loader").css("display", 'none');
                window.location.href = "/MedtronicQuotation/ViewQuote/" + window.location.pathname.split("/").pop().toString();
            }
            else if (d.data.success === false) {
                alert("Product already added. Please remove existing Product and add again.");
                $("#loader").css("display", 'none');
            }
            else {
                //alert("Error.");
                $("#loader").css("display", 'none');
            }
        },
            function () {
                //alert("Error.");
                $("#loader").css("display", 'none');
            });
    }



    $scope.getFordelete = function (Quotation) {

        // alert()
        var tb_Admin = {
            QUOTATION_ID: Quotation.QUOTATION_ID,
            SPARE_PART: Quotation.SPARE_PART,
            PRODUCT_NAME: Quotation.PRODUCTNAME
        }

        var datalist = QuotationService.Admin_Delete(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                clearTax();
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                //IsIncludeTax(result);
                //calTax(gstamt);
                alert("Product removed successfully.");
              /*  $("#").modal("hide");*/
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {

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

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    $scope.IsDisabled = true;
    //alert($scope.IsDisabled);
    $scope.IsIncludeTax = function (result) {
        var s_option = result;
        //alert(s_option);
        if (s_option == "Yes") {
            if ($scope.MedtronicQuotDetailList[0].QUOTATION_TYPE === 'Sales') {
                $scope.Ttax = Math.round($scope.final * 1.12) - $scope.final;
                $scope.AItax = Math.round($scope.final * 1.12);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = 12;
            } else if ($scope.MedtronicQuotDetailList[0].QUOTATION_TYPE === 'Service') {
                $scope.Ttax = Math.round($scope.final * 1.18) - $scope.final;
                $scope.AItax = Math.round($scope.final * 1.18);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = 18;
            }
            //alert($scope.Ttax);
        } else if (s_option == "No") {
            $scope.IsDisabled = false;
        } //else { alert("wrong selection"); }
    }

    $scope.calTax = function (gstamt) {
        var s_option = gstamt;
        //alert(s_option);
        $scope.Ttax = Math.round(($scope.final * s_option) / 100);
        $scope.AItax = $scope.final + $scope.Ttax;
        console.log(($scope.final * s_option) / 100);
        $scope.FinalAmount = $scope.final;
    }

    function clearTax() {
        $scope.result = "";
        $scope.gstamt = "";
        $scope.Ttax = "";
        $scope.AItax = "";
        $scope.FinalAmount = "";
        $scope.IsDisabled = true;
        $scope.ProductQuotList = "";
    }

    $("input[name=contact]:radio").click(function () { // attack a click event on all radio buttons with name 'radiogroup'
        $('#PrintQuotation').removeAttr("disabled");
    });

    $scope.numTowords = function () {
        $('.btn-no').text("No");
        $('.btn-yes').text("Yes");
        var txt;
        if (confirm("Do you want to print Standard Accessories! Press Ok if Yes and Cancel if No.")) {
            txt = "Yes";
        } else {
            txt = "No";
        }
        $scope.StdAccDisplay = txt;

        if (typeof $scope.result === "undefined") {
            $("#PrintQuotation").attr('disabled', 'disabled');
            alert("Please Select Including All Taxes Option!");
        }
        else {
            var includingTaxes = "Including";
            if ($scope.result === "Yes") {
                includingTaxes = "Including";
                $scope.IncludingTaxes = includingTaxes;
            }
            else {
                includingTaxes = "Excluding";
                $scope.IncludingTaxes = includingTaxes;
            }
            if (typeof $scope.WARRANTY_VALUE === "undefined" || $scope.WARRANTY_VALUE === '') {
                $scope.WARRANTY_VALUE = 0;
            }
            if (typeof $scope.WARRANTY_PERIOD === "undefined" || $scope.WARRANTY_PERIOD === '') {
                $scope.WARRANTY_PERIOD = "Months";
            }
            if (typeof $scope.REMARKS !== "undefined" && $scope.REMARKS !== '') {
                $("#REMARKS_SECTION").css("display", 'block');
            }
            else if (typeof $scope.REMARKS === "undefined" && $scope.REMARKS !== '') {
                $("#REMARKS_SECTION").css("display", 'none');
            }
            else if ($scope.REMARKS === '' && typeof $scope.REMARKS !== "undefined") {
                $("#REMARKS_SECTION").css("display", 'none');
            }
            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails();
            getData.then(function (response) {
                $scope.cbd = response.data;
                console.log(JSON.stringify($scope.cbd));
            });
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

    $scope.print = function (id) {
        tb_Admin = {
            WARRANTY_IN_DMY: $scope.WARRANTY_PERIOD,
            WARRANTY_PERIOD: $scope.WARRANTY_VALUE,
            AMOUNT_WITHOUT_TAX: $scope.final,
            TAX_AMOUNT: $scope.Ttax,
            AMOUNT_WITH_TAX: $scope.AItax,
            TAX_PERCENTAGE: $scope.gstamt,
            AMOUNT_INC_TAX: $scope.IncludingTaxes,
            NOTE: $scope.REMARKS
        }

        var datalist = QuotationService.UpdateQuotationDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Quotation Details updated successfully.");
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
            else if (d.data.success === false) {
                alert("Error occured while updating Quotation details");
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
});