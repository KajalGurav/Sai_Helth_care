app.service("QuotationService", function ($http) {

    this.GetRegularQotDetails = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetRegularQotDetails",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/MindrayQuotation/GetRegularQotDetails");
    };

    this.GetProduct = function (productTypeID, Type) {
        var response = $http({
            method: "POST",
            url: "/MindrayQuotation/GetMindrayProduct",
            params: {
                productTypeID: productTypeID,
                Type: Type
            }
        });
        return response;
    };

    this.GetProbepart = function (id) {
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

        var response = $http({
            method: "POST",
            url: "/MindrayQuotation/AddProductDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetProductDetails = function () {
        var config = {
            headers: { 'Accept': 'application/json' }
        };

        return $http.get("/MindrayQuotation/GetProductDetails", config);
    };

    this.Admin_Delete = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MindrayQuotation/Delete_Admin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCompanyBankDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: id
            }
        });
        return response;
    };

    this.GetProductQuotDetails = function () {
        //to get details in specific format
        return $http.get("/MindrayQuotation/GetProductQuotDetails");
    };
    this.GetProducDetails = function () {
        //to get details in specific format
        return $http.get("/MindrayQuotation/GetProducDetails");
    };

    this.UpdateQuotationDetails1 = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MindrayQuotation/UpdateQuotationDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetLatestRecords = function (idType) {
        var response = $http({
            method: "GET",
            url: "/MindrayQuotation/GetLatestRecordByType",
            params: {
                idType: idType
            }
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/Product/GetCategory");
    };

    this.UpdateProductDetails1 = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MindrayQuotation/UpdateProductDetails", // Ensure this URL matches your controller's action
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

});

app.controller("MindrayQuotationCtrl", function ($scope, QuotationService) {

    var splitted = window.location.pathname.split('/');
    var Type = "New";
    $scope.MQ_ID = parseInt(splitted.pop());
    console.log(splitted);
    var MQ_ID = $scope.MQ_ID;
    GetAllCategory();
    var PARAM = window.location.search.replace(/\?/, '').split('&');
    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
    $scope.IS_WITH_PROBE_ACC = false;  // Default to false
    $scope.ProbepartList = []; 

    if (splitted.join('/') === "/MindrayQuotation/ViewQuote") {
        GetQuotation();
        GetAllProduct();
        GetProductQuotationDetails();
        GetallProductQuotDetails();
        $scope.StdAccDisplay = "No";
    }

    function GetAllBanks() {
        var getAdmin = QuotationService.GetCompanyBankDetails(0);
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
        });
    }

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = QuotationService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.MindrayQuotationList = "";
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
            $scope.MindrayQuotationList = {};

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
            $scope.MindrayQuotationList = response.data;
            $("#loader").css("display", 'none');
            ;
        }, function () {
            //$.notify("Error to load data...", "error");
            alert("Error to load data...");
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

    $scope.getdate = function () {

        $scope.STARTING_DATE = $("#STARTING_DATE").val();
        $scope.ENDING_DATE = $("#ENDING_DATE").val();

        GetTotalcount();
    };

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
            var id = $scope.FIRM_ID;
            var Firm = $scope.CustomerFirmList.filter(x => x.F_ID == id)[0];
            $scope.FIRM_NAME = Firm.FIRM_NAME;
        });

    }

    function GetProductQuotationDetails() {
        $scope.total_PRODUCTPRICE = 0;
        $scope.total_ACCPRICE = 0;

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
                //console.log(response.data);
                $scope.ProductQuotList = response.data;

                $scope.total_PRODUCTPRICE = 0;
                $scope.total_ACCPRICE = 0;
                $scope._PROBE_PARTLIST2 = "";
                $scope._PROBE_PARTLISTS = "";
                $scope.PRODSUB = "";
                for (i = 0; i < $scope.ProductQuotList.length; i++) {
                    //var pos = i + 1;
                    $scope._SPARE_PARTLISTS = "";
                    var count = 0;
                    if (i === $scope.ProductQuotList.length - 1) {
                        if ($scope.ProductQuotList.length === 1) {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }
                        else {
                            $scope.PRODSUB = $scope.PRODSUB.slice(0, -2);

                            $scope.PRODSUB = $scope.PRODSUB.concat(" & ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }
                    }
                    else {
                        $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                    }
                    for (t = 0; t < $scope.ProductQuotationList.length; t++) {
                        //$scope.PRODSUB=$scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME);
                        if ($scope.ProductQuotationList[t].PRODUCTNAME === $scope.ProductQuotList[i].PRODUCTNAME) {
                            if ($scope.ProductQuotationList[t].AccID === 0) {
                                continue;
                            }
                            else {
                                $scope._PROBE_PARTLISTS = $scope.ProductQuotList[i].PROBE_PARTLIST;
                                if ($scope._PROBE_PARTLISTS.length > 0) {
                                    if ($scope._PROBE_PARTLISTS.length === 1 && $scope.ProductQuotList.length === 1) {
                                        $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._PROBE_PARTLISTS[count].PROBE_NAME);
                                    }
                                    else {
                                        if (count < $scope._PROBE_PARTLISTS.length - 1 && i < $scope.ProductQuotList.length - 1) {
                                            $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._PROBE_PARTLISTS[count].PROBE_NAME.concat(", "));
                                        }
                                        else {
                                            if (count === $scope._PROBE_PARTLISTS.length - 1 && i === $scope.ProductQuotList.length - 1) {
                                                if ($scope._PROBE_PARTLISTS.length === 1) {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._PROBE_PARTLISTS[count].PROBE_NAME);
                                                } else {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(", ", $scope._PROBE_PARTLISTS[count].PROBE_NAME);
                                                }

                                            }
                                            else {
                                                if (count === $scope._PROBE_PARTLISTS.length - 2 && i === $scope.ProductQuotList.length - 1) {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._PROBE_PARTLISTS[count].PROBE_NAME);
                                                }
                                                else {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._PROBE_PARTLISTS[count].PROBE_NAME.concat(", "));
                                                }
                                            }
                                        }
                                    }
                                    count = count + 1;
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
                if ($scope.ProductQuotList.length > 0) {
                    for (j = 0; j < $scope.ProductQuotList.length; j++) {
                        $scope._PROBE_PARTLIST2 = "";
                        var count = 0;
                        for (i = 0; i < $scope.ProductQuotationList.length; i++) {

                            if ($scope.ProductQuotationList[i].PRODUCTNAME === $scope.ProductQuotList[j].PRODUCTNAME) {
                                if ($scope.ProductQuotationList[i].AccID === 0) {
                                    continue;
                                }
                                else {
                                    if (count < $scope.ProductQuotList[j].PROBE_PARTLIST.length) {
                                        $scope._PROBE_PARTLIST2 = $scope.ProductQuotList[j].PROBE_PARTLIST;
                                        $scope.ProductQuotationList[i].PROBE_QUANTITY = $scope._PROBE_PARTLIST2[count].PROBE_QUANTITY;
                                        $scope.ProductQuotationList[i].ACCPRICE = $scope._PROBE_PARTLIST2[count].ACCPRICE;
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
                        if (parseInt($scope.ProductQuotList[i].QUANTITY) === 0) {
                            $scope._PROBE_PARTLIST2 = $scope.ProductQuotList[i].PROBE_PARTLIST;
                            for (j = 0; j < $scope._PROBE_PARTLIST2.length; j++) {
                                //console.log($scope._SPARE_PARTLIST[j].SPARE_PART + ' for ' + $scope._SPARE_PARTLIST[j].ACCPRICE);
                                $scope.total_ACCPRICE = $scope.total_ACCPRICE + (parseInt($scope._PROBE_PARTLIST2[j].PROBE_QUANTITY) * parseInt($scope._PROBE_PARTLIST2[j].ACCPRICE));
                                //console.log($scope._SPARE_PARTLIST[j].SPARE_PART+'=' + parseInt($scope.total_ACCPRICE));//Do the math!
                            }//loop through the array
                        }
                        else {
                            $scope.total_ACCPRICE = $scope.total_ACCPRICE + 0;
                        }



                    }
                }


                $scope.final = $scope.total_PRODUCTPRICE + $scope.total_ACCPRICE;

            });
        });
    }

    $scope.ShowHideStdAcc = function () {
     
        if ($scope.IS_WITH_PROBE_ACC === true) { // If checkbox is checked
            if (!$scope.ProbepartList || $scope.ProbepartList.length < 1) {
                $scope.IS_WITH_PROBE_ACC = "No";  // Set to "No" if no accessories are available
                document.getElementById("StdAccTB").style.display = "none";
                alert("No Probe Accessories available for this product!");
                return;
            }
            $scope.IS_WITH_PROBE_ACC = "Yes"; // Set to "Yes" if accessories are available
            document.getElementById("StdAccTB").style.display = "block";
        } else { // If checkbox is unchecked
            $scope.IS_WITH_PROBE_ACC = "No";
            document.getElementById("StdAccTB").style.display = "none";
        }
    };


    $scope.GetMenuChange = function () {
        Type = "Category";
        GetAllProduct();
    }

    function GetAllProduct() {
        var productTypeID = 2;
        if (Type == "Category") {
            var productTypeID = $scope.CAT_ID;
        }
        else {
            var productTypeID = 2;
        }
        var getAdmin = QuotationService.GetProduct(productTypeID, Type);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
            productTypeID = 2;
        });
    }

    $scope.Cancel = function () {

        console.log("STDACCESSORIES");

        document.getElementById("STDACCESSORIES").checked = false;
        //$("#checkAllChkboxStd").checked = false;
        document.getElementById("checkAllChkboxStd").checked = false;

        var checkboxes = document.getElementsByClassName("StdAccParts");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        $scope.ShowHideStdAcc();
        $("#AddProductAccessories").modal("hide");
    }

    $scope.Getspare = function (Product) {

        $scope.ACTION_STATUS = "ADD";
        $scope.Action = "Add";
        document.getElementById("STDACCESSORIES").checked = false;



        if ($scope.QuotationList[0].QUOTATION_TYPE != "SpareParts") {
            $("#prodQuant").removeAttr("disabled");
            document.getElementById("prodQuant").required = true;
            $("#prodPrice").removeAttr("disabled");
            document.getElementById("prodPrice").required = true;
        }
        else {
            $("#prodQuant").prop("disabled", "disabled");
            //document.getElementById("prodQuant").required = false;
            $("#prodQuant").value = 0;
            $("#prodPrice").prop("disabled", "disabled");
            //document.getElementById("prodPrice").required = false;
            $("#prodPrice").value = 0;
        }

        //$scope.MP_ID = Product.MP_ID;
        $scope.MP_ID = Product.P_ID;
        GetAllSparepart();
    };

    function GetAllSparepart() {
        if (!$scope.MP_ID) {
            console.error("MP_ID is not defined");
            return;
        }

        QuotationService.GetProbepart($scope.MP_ID).then(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.ProbepartList = response.data;
                console.log("ProbepartList loaded:", $scope.ProbepartList);
            } else {
                $scope.ProbepartList = [];
                console.warn("No probe parts found for MP_ID:", $scope.MP_ID);
            }
        }).catch(function (error) {
            console.error("Error fetching probe parts:", error);
            $scope.ProbepartList = [];
        });
    }

    function GetQuotation() {
        var getAdmin = QuotationService.GetRegularQotDetails($scope.MQ_ID);
        getAdmin.then(function (response) {
            clearTax();
            $scope.QuotationList = response.data;
            //console.log(JSON.stringify($scope.QuotationList));
            $("#tempCustId").val($scope.QuotationList[0].CUSTOMER_ID);
            if (parseInt($scope.QuotationList[0].AMOUNT_WITHOUT_TAX) > 0) {
                $scope.final = parseInt($scope.QuotationList[0].AMOUNT_WITHOUT_TAX);
                if ($scope.QuotationList[0].AMOUNT_INC_TAX == "Including") {
                    $scope.result = "Yes";
                    $scope.IncOption = $scope.result;
                    $("#contactChoice1").prop("checked", true);
                    $("#contactChoice2").prop("checked", false);
                }
                else if ($scope.QuotationList[0].AMOUNT_INC_TAX == "Excluding") {
                    $scope.result = "No";
                    $scope.IncOption = $scope.result;
                    $("#contactChoice2").prop("checked", true);
                    $("#contactChoice1").prop("checked", false);
                }

                if ($scope.QuotationList[0].AMOUNT_INC_TAX == "Including") {
                    $scope.IsDisabled = true;
                    if ($scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
                        $scope.Ttax = Math.round($scope.final - Math.round($scope.final / 1.12));//Math.round($scope.final * 1.12) - $scope.final;
                        $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.12);
                        $scope.FinalAmount = $scope.AItax;
                        $scope.gstamt = 12;
                        document.getElementById('taxNote').style.display = "block";
                        document.getElementById('taxNote').innerHTML = '<b>Amount Including 12% GST</b>';
                    } else if ($scope.QuotationList[0].QUOTATION_TYPE === 'Service') {
                        $scope.Ttax = Math.round($scope.final - Math.round($scope.final / 1.18));//Math.round($scope.final * 1.18) - $scope.final;
                        $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.18);
                        $scope.FinalAmount = $scope.AItax;
                        $scope.gstamt = 18;
                        document.getElementById('taxNote').style.display = "block";
                        document.getElementById('taxNote').innerHTML = '<b>Amount Including 18% GST</b>'
                    }
                    else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
                        $scope.Ttax = Math.round($scope.final - Math.round($scope.final / (1 + (parseInt($scope.QuotationList[0].TAX_PERCENTAGE) / 100))));
                        $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.18);
                        $scope.FinalAmount = $scope.AItax;
                        $scope.gstamt = parseInt($scope.QuotationList[0].TAX_PERCENTAGE);
                        document.getElementById('taxNote').style.display = "block";
                        document.getElementById('taxNote').innerHTML = '<b>Amount Including ' + $scope.QuotationList[0].TAX_PERCENTAGE + '% GST</b>'
                    }

                    //alert($scope.Ttax);
                } else if ($scope.QuotationList[0].AMOUNT_INC_TAX == "Excluding") {
                    $scope.IsDisabled = false;
                    $scope.gstamt = $scope.QuotationList[0].TAX_PERCENTAGE.toString();
                    //$("#gstamt").val($scope.gstamt);
                    $scope.Ttax = Math.round(($scope.final * $scope.gstamt) / 100);
                    $scope.AItax = $scope.final + $scope.Ttax;
                    $scope.FinalAmount = $scope.final;
                    document.getElementById('taxNote').style.display = "none";
                    document.getElementById('taxNote').innerHTML = '';
                } //else { alert("wrong selection"); }

                $scope.WARRANTY_PERIOD = $scope.QuotationList[0].WARRANTY_IN_DMY;
                $scope.WARRANTY_VALUE = $scope.QuotationList[0].WARRANTY_PERIOD;
                $scope.SPL_WARRANTY = $scope.QuotationList[0].IS_SPL_WARRANTY;

            }
            $scope.REMARKS = $scope.QuotationList[0].NOTE;
            GetAllProduct();

            if ($scope.QuotationList[0].QUOTATION_TYPE == "SpareParts") {
                window.processHTML($scope.QuotationList[0].NOTE, "QRemarks1");
            }

            else {
                window.processHTML($scope.QuotationList[0].NOTE, "QRemarks");
            }
            $("#loader").css("display", 'none');
        });
    }

    $scope.OnCategoryClick = function (id) {

        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            var editor = CKEDITOR.instances.NOTE;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('NOTE', {
                //language: 'fr',
                uiColor: '#9AB8F3'
            });
            //Clear();
            GetQuotation();
            //$scope.PO_DATE = $("#PO_DATE").val();
            $scope.PO_DATE = "";
            $scope.MQ_ID = $scope.QuotationList[0].MQ_ID;
            $scope.QUOTATION_TYPE = $scope.QuotationList[0].QUOTATION_TYPE;
            $scope.QUOTATION_NO = "";
            $scope.QUOTATION_NO = $scope.QuotationList[0].QUOTATION_NO;
            $scope.CUSTOMER_ID = $scope.QuotationList[0].CUSTOMER_ID;
            $scope.CUSTOMER_NAME = $scope.QuotationList[0].CUSTOMER_NAME;
            $scope.FIRM_ID = $scope.QuotationList[0].FIRM_ID;
            $scope.FIRM_NAME = $scope.QuotationList[0].FIRM_NAME;
            $scope.QUOTATION_DATE = $scope.QuotationList[0].QUOTATION_DATE;
            $scope.PNDT_STATUS = $scope.QuotationList[0].PNDT_STATUS;
            $scope.PNDT_NO = $scope.QuotationList[0].PNDT_NO;
            $scope.PO_DATE = $scope.QuotationList[0].PO_DATE;
            $scope.PAYMENT_TERM = parseFloat($scope.QuotationList[0].PAYMENT_TERM);
            $scope.STATUS = $scope.QuotationList[0].STATUS;
            $scope.NOTE = $scope.QuotationList[0].NOTE;

            var editor = CKEDITOR.instances.NOTE;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('NOTE', {
                //language: 'fr',
                uiColor: '#9AB8F3'
            });
            CKEDITOR.instances.NOTE.setData($scope.NOTE);

            $scope.REMARKS = $scope.QuotationList[0].NOTE;

            $scope.AERB_OR_PNDT = $scope.QuotationList[0].AERB_OR_PNDT;
            $scope.BANK_ID = parseInt($scope.QuotationList[0].BANK_ID);
            $('#PO_DATE').datepicker('setDate', $scope.PO_DATE);


            GetAllCustomer();
            GetCustomerFirm();
            GetAllBanks();


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
        //$scope.QUOTATION_NO = "";
        $scope.CUSTOMER_ID = "";
        $scope.FIRM_ID = "";
        //.QUOTATION_DATE = "";
        $scope.PNDT_STATUS = "";
        $scope.PNDT_NO = "";
        $scope.PO_DATE = "";
        $scope.PAYMENT_TERM = "";
        $scope.NOTE = "";
        $scope.AERB_OR_PNDT = "";
        $scope.BANK_ID = "";
        CKEDITOR.instances.NOTE.setData($scope.NOTE);
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
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.PO_DATE,
            PAYMENT_TERM: parseFloat($scope.PAYMENT_TERM),
            //NOTE: $scope.NOTE,
            NOTE: CKEDITOR.instances.NOTE.getData(),
            AERB_OR_PNDT: $scope.AERB_OR_PNDT,
            BANK_ID: $scope.BANK_ID,
            MQ_ID: $scope.MQ_ID,

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
            //NOTE: $scope.NOTE,
            NOTE: CKEDITOR.instances.NOTE.getData(),
            AERB_OR_PNDT: $scope.AERB_OR_PNDT,
            BANK_ID: $scope.BANK_ID

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
                Clear(); GetRecordbyPaging();
                alert("Quotation added successfully.");
                /*$("#Admin_Addupdate").modal("hide");*/
                $("#loader").css("display", 'none');
                window.location.href = "/MindrayQuotation/Index";
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
                /*$("#Admin_Addupdate").modal("hide");*/
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

    $scope.AddProduct = function () {
        if ($scope.QuotationList[0].QUOTATION_TYPE !== "SpareParts") {
            //alert(document.getElementById("prodQuant").value);
            if (document.getElementById("prodQuant").value === "" || document.getElementById("prodQuant").value === "0" || document.getElementById("prodQuant").value === 0) {
                alert("Please enter valid Product Quantity!");
                return false;
            }
            //alert(document.getElementById("prodPrice").value);
            if (document.getElementById("prodPrice").value === "" || document.getElementById("prodPrice").value === "0" || document.getElementById("prodPrice").value === 0) {
                alert("Please enter valid Product Price!");
                return false;
            }
        }
        $scope.Action = "Add";
        $scope.IS_WITH_STANDARD_ACC = "No";
        //Spare Parts Id
        var ArrIndex = new Array();
        var chkidsarr = [];
        var chkidsarrstd = [];
        $.each($(".checkbox_std input[type='checkbox']:checked"), function () {
            var input = { Id: $(this).val().toString(), IsChecked: 1 };
            chkidsarrstd.push(input);
        });
        var chkstdids = "";
        $.each($(".checkbox_std input[type='checkbox']:checked"), function () {
            chkstdids += $(this).val() + ',';
        });
        if (chkstdids !== "") {
            $scope.PS_ID = chkstdids;
        }

        //Std Acc Quantity
        var chkquantidstd = "";
        for (let i = 0; i < chkidsarrstd.length; i++) {
            var id = "#Q" + chkidsarrstd[i].Id.toString();
            chkquantidstd += $(id).val().toString() + ',';
        }
        if (chkquantidstd !== "") {
            $scope.PSQ_ID = chkquantidstd;
        }


        if ($scope.QuotationList[0].QUOTATION_TYPE === "SpareParts") {
            if (chkstdids === "") {
                alert("Add Probe Parts");
                return false;
            } else {
                $scope.PRODUCT_QUANTITY = 0;
                $scope.PROCUCT_PRICE = 0;
            }
        }
        //
        var chkpriceids = "";
        for (let i = 0; i < chkidsarrstd.length; i++) {
            var id = "#PRICE" + chkidsarrstd[i].Id.toString();
            chkpriceids += $(id).val().toString() + ',';
        }
        if (chkpriceids !== "") {
            $scope.PSPRICE_ID = chkpriceids;
        }



        //if ($scope.SP_ID === null || $scope.SP_ID === undefined || $scope.SP_ID === "") {

        //    $scope.SP_ID = ',';
        //}
        if ($scope.PS_ID === null || $scope.PS_ID === undefined || $scope.PS_ID === "") {

            $scope.PS_ID = ',';
        }
        //if ($scope.SPQ_ID === null || $scope.SPQ_ID === undefined || $scope.SPQ_ID === "") {

        //    $scope.SPQ_ID = ',';
        //}
        if ($scope.PSQ_ID === null || $scope.PSQ_ID === undefined || $scope.PSQ_ID === "") {

            $scope.PSQ_ID = ',';
        }
        if ($scope.PSPRICE_ID === null || $scope.PSPRICE_ID === undefined || $scope.PSPRICE_ID === "") {

            $scope.PSPRICE_ID = ',';
        }

        CheckSTDACC();
        //tB_product =
        //{
        //    SP_ID1: $scope.SP_ID
        //};
        var cusId = 0;
        if ($("#tempCustId").val() === null || $("#tempCustId").val() === undefined || $("#tempCustId").val() === 0 || $("#tempCustId").val() === "0") {
            cusId = $scope.QuotationList[0].CUSTOMER_ID;
        }
        else {
            cusId = $("#tempCustId").val();
        }
        var tb_Admin = {
            MP_ID: $scope.MP_ID,
            CUSTOMER_ID: cusId,
            PRODUCT_QUANTITY: $scope.PRODUCT_QUANTITY,
            PROCUCT_PRICE: $scope.PROCUCT_PRICE,
            PS_ID: $scope.PS_ID,
            IS_WITH_PROBE_ACC: $scope.IS_WITH_PROBE_ACC,
            PSQ_ID: $scope.PSQ_ID,
            PSPRICE_ID: $scope.PSPRICE_ID,
        };

        if ($scope.ACTION_STATUS == "ADD") {
            AddproductRecord(tb_Admin); // Call Add method
        } else {
            UpdateProductRecord(tb_Admin); // Corrected call for Update
        }
    };


    function CheckSTDACC() {
        var isCheck = false;
        $scope.IS_WITH_PROBE_ACC = "No";
        var value = "";
        if (document.getElementById("STDACCESSORIES").checked === true) {
            value = $('.STD_ACC:checked').val();
        }
        if (value !== "") {
            console.log(value);
            isCheck = true;
            $scope.IS_WITH_PROBE_ACC = "Yes";
        }

    };

    $scope.GotoPage = function (Sparepart) {
        $scope.SP_ID = Sparepart.SP_ID;
        window.location.href = "/MindrayQuotation/ViewQuote/" + $scope.SP_ID;
        alert($scope.SP_ID);
    }

    function AddproductRecord(tb_Admin) {
        debugger
        tb_Admin.IS_WITH_STANDARD_ACC = $scope.IS_WITH_STANDARD_ACC;
        console.log($scope.IS_WITH_STANDARD_ACC);
        var datalist = QuotationService.AddProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                if ($scope.Action == "Add") {

                    alert("Product added successfully.");
                }
                else if ($scope.Action == "Update") {
                    alert("Product updateded successfully.");
                    //$("#AddProductAccessories").modal("hide");
                    //$("#loader").css("display", 'none');
                }
                clearTax();
                //Clear();
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                //GetRecordbyPaging();
                //alert("Product added successfully.");
                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = "/MindrayQuotation/ViewQuote/" + window.location.pathname.split("/").pop().toString();
            }
            else if (d.data.success === false) {
                alert("Product already added. Please remove existing Product and add again.");
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


    function UpdateProductRecord(tb_Admin) {
        debugger;
        tb_Admin.IS_WITH_STANDARD_ACC = $scope.IS_WITH_STANDARD_ACC; // Bind additional property
        console.log($scope.IS_WITH_STANDARD_ACC);

        // Call the service to update product details
        var datalist = QuotationService.UpdateProductDetails1(tb_Admin);
        datalist.then(function (response) {
            console.log("Response received: ", response);  // Log the entire response for debugging

            if (response.data && response.data.success === true) {
                alert("Product updated successfully.");
                clearTax(); // Clear Tax fields (if any)
                GetProductQuotationDetails(); // Refresh product quotation details
                GetallProductQuotDetails();   // Refresh all product details

                // Close modal and hide loader
                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (response.data && response.data.errorCode === 'PRODUCT_EXISTS') {
                alert("Product already added. Please remove the existing product and add again.");
                $("#loader").css("display", 'none');
            }
            else {
                console.error("Error details: ", response.data); // Log the error details
                alert("Error occurred while updating product. Please try again.");
                $("#loader").css("display", 'none');
            }
        },
            function (error) {
                // Log the error for debugging
                console.error("Service error:", error);
                alert("Error occurred while communicating with the server.");
                $("#loader").css("display", 'none');
            });
    }







    $scope.getFordelete = function (Quotation) {

        // alert()
        var tb_Admin = {
            QUOTATION_ID: Quotation.QUOTATION_ID,
            PROBE_NAME: Quotation.PROBE_NAME,
            PRODUCT_NAME: Quotation.PRODUCTNAME
        }

        var datalist = QuotationService.Admin_Delete(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                clearTax();
                //GetRecordbyPaging();
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                alert("Product removed successfully.");
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
            $scope.IsDisabled = true;
            if ($scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
                $scope.Ttax = Math.round($scope.final - Math.round($scope.final / 1.12));//Math.round($scope.final * 1.12) - $scope.final;
                $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.12);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = 12;
                document.getElementById('taxNote').style.display = "block";
                document.getElementById('taxNote').innerHTML = '<b>Amount Including 12% GST</b>';
            } else if ($scope.QuotationList[0].QUOTATION_TYPE === 'Service') {
                $scope.Ttax = Math.round($scope.final - Math.round($scope.final / 1.18));//Math.round($scope.final * 1.18) - $scope.final;
                $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.18);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = 18;
                document.getElementById('taxNote').style.display = "block";
                document.getElementById('taxNote').innerHTML = '<b>Amount Including 18% GST</b>'
            }
            else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
                $('.btn-no').text("18");
                $('.btn-yes').text("12");
                var txt;
                if (confirm("Press Ok for 12% GST and Cancel for 18% GST")) {
                    txt = "12";
                } else {
                    txt = "18";
                }
                $scope.SpareGst = txt;

                $scope.Ttax = Math.round($scope.final - Math.round($scope.final / (1 + (parseInt($scope.SpareGst) / 100))));//Math.round($scope.final * 1.18) - $scope.final;
                $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.18);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = parseInt($scope.SpareGst);
                document.getElementById('taxNote').style.display = "block";
                document.getElementById('taxNote').innerHTML = '<b>Amount Including ' + $scope.SpareGst + '% GST</b>'
            }

            //alert($scope.Ttax);
        } else if (s_option == "No") {
            $scope.IsDisabled = false;
            document.getElementById('taxNote').style.display = "none";
            document.getElementById('taxNote').innerHTML = '';
        } //else { alert("wrong selection"); }
    }

    $scope.calTax = function (gstamt) {
        var s_option = gstamt;
        //alert(s_option);
        $scope.Ttax = Math.round(($scope.final * s_option) / 100);
        $scope.AItax = $scope.final + $scope.Ttax;
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
        $('#SaveQuotation').removeAttr("disabled");
    });

    $("input[name=SpecialWarranty]:radio").click(function () { // attack a click event on all radio buttons with name 'radiogroup'
        $('#PrintQuotation').removeAttr("disabled");
        $('#SaveQuotation').removeAttr("disabled");
    });

    window.processHTML = function (htmlContent, id) {

        var content = htmlContent.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, function (m) {
            return m.replace(/[\n\t]+/g, "");
        });
        // Example: Display the HTML content in an element with id "result"
        if (id === "Description") {
            $("#Description").html(content);
        }
        else if (id === "Configuration") {
            $("#Configuration").html(content);
        }
        else {
            $("#" + id).html(content);
        }
    };

    $scope.numTowords = function () {
        $('.btn-no').text("No");
        $('.btn-yes').text("Yes");
        var txt;

        if (typeof $scope.result === "undefined" || $scope.result === '') {
            $("#PrintQuotation").attr('disabled', 'disabled');
            $("#SaveQuotation").attr('disabled', 'disabled');
            alert("Please Select Including All Taxes Option!");
            return false;
        }

        if ($scope.FinalAmount <= 0) {
            $("#PrintQuotation").attr('disabled', 'disabled');
            $("#SaveQuotation").attr('disabled', 'disabled');
            alert("Please Select Product!");
            return false;
        }


        if ($scope.QuotationList[0].QUOTATION_TYPE == "SpareParts") {

            $("#QUotationAddSpare").modal("show");

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

            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
            getData.then(function (response) {
                $scope.cbd = response.data;
                //console.log(JSON.stringify($scope.cbd));
            });
        }
        else {

            if (confirm("Do you want to print Product Specifications! Press Ok if Yes and Cancel if No.")) {
                txt = "Yes";
            } else {
                txt = "No";
            }
            $scope.SpecsDisplay = txt;

            if ($scope.SpecsDisplay === "Yes") {
                $("#prodDescription").css("display", 'block');
                $("#prodDescription").css("height", '');
                $("#prodDescHeader").css("display", 'block');
                $("#prodDescHeader").css("height", '');
            }
            else if ($scope.SpecsDisplay === "No") {
                $("#prodDescription").css("display", 'none');
                $("#prodDescription").css("height", 0);
                $("#prodDescHeader").css("display", 'none');
                $("#prodDescHeader").css("height", 0);
            }


            window.processHTML($scope.ProductQuotList[0].DESCRIPTION, "Description");
            window.processHTML($scope.ProductQuotList[0].CONFIGURATION, "Configuration");

            const imgElement = document.getElementById("productImage");
            imgElement.src = $scope.ProductQuotList[0].PRODUCT_IMAGE;
            //$("#productImage").prop("src", $scope.ProductQuotList[0].PRODUCT_IMAGE);

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

            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
            getData.then(function (response) {
                $scope.cbd = response.data;
                //console.log(JSON.stringify($scope.cbd));
            });

            $("#QUotationAdd").modal("show");
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

    $scope.SaveQuotDetails = function () {

        if (typeof $scope.result === "undefined" || $scope.result === '') {
            $("#PrintQuotation").attr('disabled', 'disabled');
            $("#SaveQuotation").attr('disabled', 'disabled');
            alert("Please Select Including All Taxes Option!");
            return false;
        }

        if ($scope.FinalAmount <= 0) {
            $("#PrintQuotation").attr('disabled', 'disabled');
            $("#SaveQuotation").attr('disabled', 'disabled');
            alert("Please Select Product!");
            return false;
        }

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

        if (typeof $scope.SPL_WARRANTY === "undefined" || $scope.SPL_WARRANTY === '' || $scope.SPL_WARRANTY === null) {
            $scope.SPL_WARRANTY = "No";
        }

        tb_Admin = {
            WARRANTY_IN_DMY: $scope.WARRANTY_PERIOD,
            WARRANTY_PERIOD: $scope.WARRANTY_VALUE,
            AMOUNT_WITHOUT_TAX: $scope.final,
            TAX_AMOUNT: $scope.Ttax,
            AMOUNT_WITH_TAX: $scope.AItax,
            TAX_PERCENTAGE: $scope.gstamt,
            AMOUNT_INC_TAX: $scope.IncludingTaxes,
            IS_SPL_WARRANTY: $scope.SPL_WARRANTY,
            NOTE: $scope.REMARKS

        }

        var datalist = QuotationService.UpdateQuotationDetails1(tb_Admin);

        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Quotation Details updated successfully.");
                GetQuotation();
                //GetAllProduct();
                GetProductQuotationDetails();
                GetallProductQuotDetails();
                //window.location.href = window.location.href;
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

    $scope.print = function (id) {
        if (typeof $scope.REMARKS === "undefined" || $scope.REMARKS === '' || $scope.REMARKS === null) {
            $scope.REMARKS = "";
        }
        if (typeof $scope.SPL_WARRANTY === "undefined" || $scope.SPL_WARRANTY === '' || $scope.SPL_WARRANTY === null) {
            $scope.SPL_WARRANTY = "No";
        }
        tb_Admin = {
            WARRANTY_IN_DMY: $scope.WARRANTY_PERIOD,
            WARRANTY_PERIOD: $scope.WARRANTY_VALUE,
            AMOUNT_WITHOUT_TAX: $scope.final,
            TAX_AMOUNT: $scope.Ttax,
            AMOUNT_WITH_TAX: $scope.AItax,
            TAX_PERCENTAGE: $scope.gstamt,
            AMOUNT_INC_TAX: $scope.IncludingTaxes,
            IS_SPL_WARRANTY: $scope.SPL_WARRANTY,
            NOTE: $scope.REMARKS

        }

        var datalist = QuotationService.UpdateQuotationDetails1(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Quotation Details updated successfully.");
                var printHtml = document.getElementById(id).outerHTML;
                var currentPage = document.body.innerHTML;
                var WindowObject = window.open();
                var elementPage; // = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';
                if ($scope.SpecsDisplay === "Yes") {
                    elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';
                }
                else {
                    elementPage = '<html><head><style type="text/css" > #prodDescription{display:none !important; height:0px; visibility: hidden !important;} #prodDescHeader{display:none !important; height:0px; visibility: hidden !important;} </style></head><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';
                }

                //WindowObject.document.write('<style type="text/css" > table tr td {font-size:12px;}table > thead > tr >th , table> tbody > tr > td {font-size:10px}  #dontprint{display:none} .dontshow{display:display} </style>');
                WindowObject.document.write(elementPage);
                WindowObject.document.close();

                setTimeout(function () {
                    // Trigger the print
                    WindowObject.focus();
                    WindowObject.print();
                    WindowObject.close();
                    if ($scope.PAGE_NAME === "Master") {
                        //window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
                        window.location.href = "/Quotation_Registration/Index?CustType=" + CUSTOMER_TYPE;
                    }
                    else if ($scope.PAGE_NAME === "Customer") {
                        //window.location.href = "/Customer_Master/CustomerDetails?CustType=" + $scope.CUSTOMER_TYPE + "&CustId=" + $scope.CUSTOMER_ID+"&TabId=0";
                        window.location.href = "/Customer_Master/CustomerDetails?CustType=" + CUSTOMER_TYPE + "&CustId=" + CUSTOMER_ID + "&TabId=0";
                    }
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
    $scope.GetSpareForUpdate = function (Product) {
        debugger;
        $scope.ACTION_STATUS = "UPDATE";
        $scope.Action = "Update";
        $scope.P_ID = Product.P_ID;
        $scope.QUOTATION_ID = Product.QUOTATION_ID;
      
        // Fetch and assign data to scope variables
        var getProductDetails = QuotationService.GetProductDetails($scope.P_ID); // Replace with API fetching specific product
        getProductDetails.then(function (response) {
            const updatedProduct = response.data; // Assume server sends the latest product details
            $scope.PRODUCT_QUANTITY = updatedProduct.QUANTITY;
            $scope.PRODUCT_PRICE = updatedProduct.PRODUCTPRICE;
            $scope.IS_WITH_PROBE_ACC = updatedProduct.IS_WITH_PROBE_ACC; // Correct the scope property
            $scope.Std_Acc = updatedProduct.CheckSTDACC;

            // Call ShowHideStdAcc after the data is loaded
            $scope.ShowHideStdAcc();
        });
    };


    function GetAllCategory() {
        var getAdmin = QuotationService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }
});