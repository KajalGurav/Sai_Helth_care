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
    };

    this.GetProduct = function (productTypeID, Type) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetProduct",
            params: {
                productTypeID: productTypeID,
                Type: Type
            }
        });
        return response;
    };


    this.GetSparepart = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetSparepart",
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
        //  alert(tb_Admin.CUSTOMER_ID);
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/AddProductDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.UpdateProductDetails = function (tb_Admin) {
        //  alert(tb_Admin.CUSTOMER_ID);
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/UpdateProductDetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };



    this.GetProducQotatDetails = function (id) {

        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProductDetails",
            params: {
                id: id
            }
        });
        return response;

    };


    this.Admin_Delete = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/Delete_Admin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCompanyBankDetails = function (bankid) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetCmpnyBankDetails",
            params: {
                bankid: bankid
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");       
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
        //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");       
    };


    this.GetProducDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Quotation_Registration/GetProducDetails",
            params: {
                quoteId: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");       
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

    this.GetCategory = function () {
        return $http.get("/Product/GetCategory");
    };
});


app.controller("RegularQuotationCtrl", function ($scope, QuotationService) {

    GetAllCategory();
    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[2].split('=').pop());
    $scope.Q_ID = parseInt(PARAM[3].split('=').pop());
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

    clearTax();
    GetQuotation();
    GetallProductQuotDetails();
    GetallProducQotatDetails();
    $scope.StdAccDisplay = "No";
    var editor = CKEDITOR.instances.REMARKS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('REMARKS', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });

    function GetQuotation() {
        var getAdmin = QuotationService.GetRegularQotDetails($scope.Q_ID);
        getAdmin.then(function (response) {

            $scope.QuotationList = response.data;
            //console.log(JSON.stringify($scope.QuotationList));
            $("#tempCustId").val($scope.QuotationList[0].CUSTOMER_ID);
            if (parseInt($scope.QuotationList[0].AMOUNT_WITHOUT_TAX) >= 0) {
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


                if ($scope.QuotationList[0].IS_SPL_WARRANTY == "Yes") {
                    $scope.SPL_WARRANTY = "Yes";
                    $("#SpecialWarranty1").prop("checked", true);
                    $("#SpecialWarranty2").prop("checked", false);
                }
                else if ($scope.QuotationList[0].IS_SPL_WARRANTY == "No") {
                    $scope.SPL_WARRANTY = "No";
                    $("#SpecialWarranty1").prop("checked", false);
                    $("#SpecialWarranty2").prop("checked", true);
                }



                if ($scope.QuotationList[0].C_NAME == "Yes") {
                    $scope.C_NAME = "Yes";
                    $("#C_NAME1").prop("checked", true);
                    $("#C_NAME2").prop("checked", false);
                    document.getElementById('cName').style.display = "block";
                    document.getElementById('cName1').style.display = "block";
                    document.getElementById('cName2').style.display = "none";
                }
                else if ($scope.QuotationList[0].C_NAME == "No") {
                    $scope.C_NAME = "No";
                    $("#C_NAME1").prop("checked", false);
                    $("#C_NAME2").prop("checked", true);
                    document.getElementById('cName').style.display = "none";
                    document.getElementById('cName1').style.display = "none";
                    document.getElementById('cName2').style.display = "block";
                }

                $scope.WARRANTY_PERIOD = $scope.QuotationList[0].WARRANTY_IN_DMY;
                $scope.WARRANTY_VALUE = $scope.QuotationList[0].WARRANTY_PERIOD;
                $scope.SPL_WARRANTY = $scope.QuotationList[0].IS_SPL_WARRANTY;
                $scope.IS_REFURGISHED = $scope.QuotationList[0].IS_REFURGISHED;
                $scope.C_NAME = $scope.QuotationList[0].C_NAME;
            }
            GetAllProduct();

            $scope.REMARKS = $scope.QuotationList[0].NOTE;
            var editor = CKEDITOR.instances.REMARKS;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('REMARKS', {
                //language: 'fr',
                uiColor: '#9AB8F3'
            });
            CKEDITOR.instances.REMARKS.setData($scope.REMARKS);

            //GetCustomerFirm();
            $("#loader").css("display", 'none');
        });

    }

    $scope.GetMenuChange = function () {
        $scope.CUSTOMER_TYPE_ID1 = $scope.CUSTOMER_TYPE_ID;
        $scope.CUSTOMER_TYPE_ID = 0;
        GetAllProduct();
    }

    function GetAllProduct() {
        var productTypeID = 1;
        var Type = "New";
        if ($scope.CUSTOMER_TYPE_ID === 1) {
            productTypeID = 1;
        }
        else if ($scope.CUSTOMER_TYPE_ID === 3) {
            productTypeID = 3;
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5) {
            productTypeID = 2;
        }
        else if ($scope.CUSTOMER_TYPE_ID === 0) {
            productTypeID = parseInt($scope.CAT_ID);
            Type = "Regular";
        }

        var getAdmin = QuotationService.GetProduct(productTypeID, Type);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
            $scope.CUSTOMER_TYPE_ID = $scope.CUSTOMER_TYPE_ID1;
        });
    }



    //var openModalButton = document.querySelector("[data-target='#AddProductAccessories']");
    //openModalButton.on("click", function () {
    //    console.log("STDACCESSORIES");
    //    $("#STDACCESSORIES").checked = false;
    //    $("#checkAllChkboxStd").checked = false;
    //    $(".StdAccParts").each(function () {
    //        this.checked = false;
    //    });

    //    $("#checkAllChkbox").checked = false;
    //    $(".SparePart").each(function () {
    //        this.checked = false;
    //    });
    //});

    $scope.Cancel = function () {

        console.log("STDACCESSORIES");
        clearTax();

        // $document.getElementById("checkAllChkboxStd").checked = false;

        //alert($("#checkAllChkboxStd").val());
        //alert(document.getElementById("checkAllChkboxStd").checked);
        //$("#STDACCESSORIES").checked = false;
        document.getElementById("STDACCESSORIES").checked = false;
        //$("#checkAllChkboxStd").checked = false;
        document.getElementById("checkAllChkboxStd").checked = false;

        //alert($("#checkAllChkboxStd").val());
        //alert(document.getElementById("checkAllChkboxStd").checked);

        //$(".StdAccParts").each(function () {
        //    this.checked = false;
        //});
        var checkboxes = document.getElementsByClassName("StdAccParts");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        //document.getElementsByClassName("StdAccParts").each(function () {
        //    this.checked = false;
        //});
        document.getElementById("checkAllChkbox").checked = false;
        //$("#checkAllChkbox").checked = false;

        var checkboxes2 = document.getElementsByClassName("SparePart");
        for (var i = 0; i < checkboxes2.length; i++) {
            checkboxes2[i].checked = false;
        }

        $scope.ShowHideStdAcc();
        $("#AddProductAccessories").modal("hide");
    }

    $scope.GetSpareForUpdate = function (Product) {
        $scope.ACTION_STATUS = "UPDATE";
        $scope.Action = "Update";
        $scope.P_ID = Product.P_ID;
        $scope.QUOTATION_ID = Product.QUOTATION_ID;
        GetAllSparepart();
    };

    $scope.Getspare = function (Product) {
        //////////////
        $scope.ACTION_STATUS = "ADD";
        $scope.Action = "Add";
        document.getElementById("STDACCESSORIES").checked = false;

        document.getElementById("checkAllChkboxStd").checked = false;

        var checkboxes = document.getElementsByClassName("StdAccParts");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        document.getElementById("checkAllChkbox").checked = false;

        var checkboxes2 = document.getElementsByClassName("SparePart");
        for (var i = 0; i < checkboxes2.length; i++) {
            checkboxes2[i].checked = false;
        }
        ////////////
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


        $scope.P_ID = Product.P_ID;
        GetAllSparepart();
    };

    function GetAllSparepart() {
        //alert($scope.P_ID);
        var getAdmin = QuotationService.GetSparepart($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparepartList = response.data;
            //$scope.SP_ID = $scope.SparepartList[0].SP_ID;

        });
        var getStd = QuotationService.GetStdAccPart($scope.P_ID);
        getStd.then(function (response) {
            $scope.StdAccPartList = response.data;
            //$scope.SP_ID = $scope.SparepartList[0].SP_ID;

        });
    }

    function GetallProducQotatDetails() {
        $scope.total_PRODUCTPRICE = 0;
        $scope.total_ACCPRICE = 0;
        //var getAdmin = QuotationService.GetProducQotatDetails();
        //getAdmin.then(function (response) {
        //    //$scope.ProductQuotationList = response.data;


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
        //});
        var getProdList = QuotationService.GetProducDetails($scope.Q_ID);
        getProdList.then(function (response) {
            $scope.GroupProductList = response.data;
        });
    }

    function GetallProductQuotDetails() {
        $scope.total_PRODUCTPRICE = 0;
        $scope.total_ACCPRICE = 0;
        var getprodList = QuotationService.GetProducQotatDetails($scope.Q_ID);
        getprodList.then(function (result) {
            $scope.ProductQuotationList = result.data;

            var getAdmin = QuotationService.GetProductQuotDetails($scope.Q_ID);
            getAdmin.then(function (response) {
                $scope.ProductQuotList = response.data;
                $scope.total_PRODUCTPRICE = 0;
                $scope.total_ACCPRICE = 0;
                $scope._SPARE_PARTLIST2 = "";
                $scope._SPARE_PARTLISTS = "";
                $scope.PRODSUB = "";
                for (i = 0; i < $scope.ProductQuotList.length; i++) {
                    //var pos = i + 1;
                    $scope._SPARE_PARTLISTS = "";
                    var count = 0;
                    if (i === $scope.ProductQuotList.length - 1) {
                        if ($scope.ProductQuotList.length === 1) {
                            $scope.PRODSUB = $scope.PRODSUB.concat(" Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }
                        else {
                            $scope.PRODSUB = $scope.PRODSUB.slice(0, -2);

                            $scope.PRODSUB = $scope.PRODSUB.concat(" & Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                        }
                    }
                    else {
                        $scope.PRODSUB = $scope.PRODSUB.concat(" Refurbished ", $scope.ProductQuotList[i].M_NAME.concat(" ", $scope.ProductQuotList[i].PRODUCTNAME));
                    }
                    for (t = 0; t < $scope.ProductQuotationList.length; t++) {
                        //$scope.PRODSUB=$scope.PRODSUB.concat($scope.ProductQuotList[i].M_NAME);
                        if ($scope.ProductQuotationList[t].PRODUCTNAME === $scope.ProductQuotList[i].PRODUCTNAME) {
                            if ($scope.ProductQuotationList[t].AccID === 0) {
                                continue;
                            }
                            else {
                                $scope._SPARE_PARTLISTS = $scope.ProductQuotList[i].SPARE_PARTLIST;
                                if ($scope._SPARE_PARTLISTS.length > 0) {
                                    if ($scope._SPARE_PARTLISTS.length === 1 && $scope.ProductQuotList.length === 1) {
                                        $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._SPARE_PARTLISTS[count].SPARE_PART);
                                    }
                                    else {
                                        if (count < $scope._SPARE_PARTLISTS.length - 1 && i < $scope.ProductQuotList.length - 1) {
                                            $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._SPARE_PARTLISTS[count].SPARE_PART.concat(", "));
                                        }
                                        else {
                                            if (count === $scope._SPARE_PARTLISTS.length - 1 && i === $scope.ProductQuotList.length - 1) {
                                                if ($scope._SPARE_PARTLISTS.length === 1) {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._SPARE_PARTLISTS[count].SPARE_PART);
                                                } else {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(", ", $scope._SPARE_PARTLISTS[count].SPARE_PART);
                                                }

                                            }
                                            else {
                                                if (count === $scope._SPARE_PARTLISTS.length - 2 && i === $scope.ProductQuotList.length - 1) {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._SPARE_PARTLISTS[count].SPARE_PART);
                                                }
                                                else {
                                                    $scope.PRODSUB = $scope.PRODSUB.concat(" ", $scope._SPARE_PARTLISTS[count].SPARE_PART.concat(", "));
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
                                        $scope.ProductQuotationList[i].ACCPRICE = $scope._SPARE_PARTLIST2[count].ACCPRICE;
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
                //console.log($scope.final);
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

    //    click(event): void {
    //        if(this.checked) {
    //    event.preventDefault();
    //}
    //if (!this.disabled) {
    //    this.checked = true
    //    this.emitChange()
    //}
    //}


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
    ///////////////// PRODUCT QUOTATION ///////////

    $scope.AddProduct = function (Sparepart) {

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
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            var input = { Id: $(this).val().toString(), IsChecked: 1 };
            chkidsarr.push(input);
            //ArrIndex.push($("#id").val())
        });
        var chkids = "";
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            chkids += $(this).val() + ',';
            //ArrIndex.push($("#id").val())
        });
        if (chkids !== "") {
            $scope.SP_ID = chkids;
        }

        var chkquantids = "";
        for (let i = 0; i < chkidsarr.length; i++) {
            var id = "#Q" + chkidsarr[i].Id.toString();
            chkquantids += $(id).val().toString() + ',';
        }
        if (chkquantids !== "") {
            $scope.SPQ_ID = chkquantids;
        }

        if ($scope.QuotationList[0].QUOTATION_TYPE === "SpareParts") {
            if (chkquantids === "") {
                alert("Add Spare Parts");
                return false;
            } else {
                $scope.PRODUCT_QUANTITY = 0;
                $scope.PROCUCT_PRICE = 0;
            }
        }
        //Spare Parts Price
        var chkpriceids = "";
        for (let i = 0; i < chkidsarr.length; i++) {
            var id = "#PRICE" + chkidsarr[i].Id.toString();
            chkpriceids += $(id).val().toString() + ',';
        }
        if (chkpriceids !== "") {
            $scope.SPPRICE_ID = chkpriceids;
        }

        //Std Acc Id

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
            $scope.STD_ID = chkstdids;
        }
        //Std Acc Quantity
        var chkquantidstd = "";
        for (let i = 0; i < chkidsarrstd.length; i++) {
            var id = "#STD" + chkidsarrstd[i].Id.toString();
            chkquantidstd += $(id).val().toString() + ',';
        }
        if (chkquantidstd !== "") {
            $scope.STDQ_ID = chkquantidstd;
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
        if ($scope.SPPRICE_ID === null || $scope.SPPRICE_ID === undefined || $scope.SPPRICE_ID === "") {

            $scope.SPPRICE_ID = ',';
        }
        if ($scope.STDQ_ID === null || $scope.STDQ_ID === undefined || $scope.STDQ_ID === "") {

            $scope.STDQ_ID = ',';
        }

        CheckSTDACC();

        tB_product =
        {
            SP_ID1: $scope.SP_ID
        };

        var cusId = 0;
        if ($("#tempCustId").val() === null || $("#tempCustId").val() === undefined || $("#tempCustId").val() === 0 || $("#tempCustId").val() === "0") {
            cusId = $scope.QuotationList[0].CUSTOMER_ID;
        }

        else {
            cusId = $("#tempCustId").val();
        }

        tb_Admin = {
            Q_ID: $scope.Q_ID,
            P_ID: $scope.P_ID,
            //CUSTOMER_ID: $scope.CUSTOMER_ID,
            CUSTOMER_ID: cusId,
            PRODUCT_QUANTITY: $scope.PRODUCT_QUANTITY,
            PROCUCT_PRICE: $scope.PROCUCT_PRICE,
            SP_ID: $scope.SP_ID,
            IS_WITH_STANDARD_ACC: $scope.IS_WITH_STANDARD_ACC,
            SPQ_ID: $scope.SPQ_ID,
            SPPRICE_ID: $scope.SPPRICE_ID,
            STD_ID: $scope.STD_ID,
            Quantity: $scope.Quantity,
            Quantity1: $scope.Quantity1,
            QUOTATION_ID: $scope.QUOTATION_ID,
            STDQ_ID: $scope.STDQ_ID
        };
        //alert(tb_Admin.CUSTOMER_ID);

        if ($scope.ACTION_STATUS == "ADD") {
            AddproductRecord(tb_Admin);
        }
        else {
            UpdateproductRecord(tb_Admin);
        }
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
        window.location.href = "/Quotation_Registration/ViewQuote/" + $scope.SP_ID;
        alert($scope.SP_ID);
    }

    function AddproductRecord(tb_Admin) {
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

                }

                /*$("#AddProductAccessories").hide(); */
                clearTax();
                GetallProducQotatDetails();
                GetallProductQuotDetails();
                //IsIncludeTax(result);
                //calTax(gstamt);

                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
                //console.log(window.location.pathname.split("/").pop());
                //window.location.href = "/Quotation_Registration/ViewQuote/" + window.location.pathname.split("/").pop().toString();
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

    function UpdateproductRecord(tb_Admin) {
        tb_Admin.IS_WITH_STANDARD_ACC = $scope.IS_WITH_STANDARD_ACC;
        console.log($scope.IS_WITH_STANDARD_ACC);
        var datalist = QuotationService.UpdateProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Spare parts updated successfully.");
                /*$("#AddProductAccessories").hide(); */
                clearTax();
                GetallProducQotatDetails();
                GetallProductQuotDetails();
                //IsIncludeTax(result);
                //calTax(gstamt);

                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
                //console.log(window.location.pathname.split("/").pop());
                //window.location.href = "/Quotation_Registration/ViewQuote/" + window.location.pathname.split("/").pop().toString();
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

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }



    $scope.getFordelete = function (Quotation) {
        //console.log(Quotation.SPARE_PART);
        var tb_Admin = {
            QUOTATION_ID: Quotation.QUOTATION_ID,
            SPARE_PART: Quotation.SPARE_PART,
            PRODUCT_NAME: Quotation.PRODUCTNAME
        }

        var datalist = QuotationService.Admin_Delete(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                clearTax();
                alert("Product removed successfully.");
                GetallProducQotatDetails();
                GetallProductQuotDetails();
                //IsIncludeTax(result);
                //calTax(gstamt);
                /*$("#").modal("hide");*/
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
    $scope.IsDisabled = true;
    $scope.IsIncludeTax = function (result) {
        var s_option = result;
        $scope.IncOption = s_option;
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
                $scope.amtInwords = inWords(Math.round(($scope.FinalAmount)));
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
        console.log(($scope.final * s_option) / 100);
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
    //function SetIncludingTaxes() {
    //    var includingTaxes = "Including";
    //    if (typeof $scope.result === "Yes") {
    //        includingTaxes = "Including";
    //        $scope.IncludingTaxes = includingTaxes;
    //    }
    //    else {
    //        includingTaxes = "Excluding";
    //        $scope.IncludingTaxes = includingTaxes;
    //    }
    //}

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

    $scope.numTowords = function () {
        $('.btn-no').text("No");
        $('.btn-yes').text("Yes");

        if (typeof $scope.result === "undefined" || $scope.result.length < 1) {
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

        var txt;

        if (confirm("Do you want to print Standard Accessories! Press Ok if Yes and Cancel if No.")) {
            txt = "Yes";
        }
        else {
            txt = "No";
        }

        $scope.StdAccDisplay = txt;

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
                //alert(JSON.stringify($scope.cbd));
                //alert(JSON.stringify($scope.QuotationList[0].BANK_ID));
            });
        }

        else {
            if (typeof $scope.SPL_WARRANTY === "undefined") {
                $("#PrintQuotation").attr('disabled', 'disabled');
                $("#SaveQuotation").attr('disabled', 'disabled');
                alert("Please Select Special Warranty Option!");
                return false;
            }

            else {
                if ($scope.SPL_WARRANTY === "Yes") {
                    $("#Special_Warranty").css("display", 'block');
                }
                else if ($scope.SPL_WARRANTY === "No") {
                    $("#Special_Warranty").css("display", 'none');
                }
            }

            $("#QUotationAdd").modal("show");

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

            window.processHTML($scope.REMARKS, "QRemarks");

            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
            getData.then(function (response) {
                $scope.cbd = response.data;
                console.log(JSON.stringify($scope.cbd));
            });

        }

        if ($scope.QuotationList[0].IS_REFURGISHED == "True") {
            /*$scope.IS_REFURGISHED = "Yes";*/
            $("#Refurbished1").prop("checked", true);
            $("#Refurbished2").prop("checked", false);
            document.getElementById('isRefurbished2').style.display = "block";
            document.getElementById('isRefurbished1').style.display = "none";
        }

        else if ($scope.QuotationList[0].IS_REFURGISHED == "False") {
            /*$scope.IS_REFURGISHED = "No";*/
            $("#Refurbished1").prop("checked", false);
            $("#Refurbished2").prop("checked", true);
            document.getElementById('isRefurbished2').style.display = "none";
            document.getElementById('isRefurbished1').style.display = "block";
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

        if ($scope.QuotationList[0].QUOTATION_TYPE !== "SpareParts") {
            if (typeof $scope.SPL_WARRANTY === "undefined" || $scope.SPL_WARRANTY === '') {
                $("#PrintQuotation").attr('disabled', 'disabled');
                $("#SaveQuotation").attr('disabled', 'disabled');
                alert("Please Select Special Warranty Option!");
                return false;
            }
        }

        if ($scope.IS_REFURGISHED == undefined) {
            alert("Please Select Refurbished Word Option !");
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
            Q_ID: $scope.Q_ID,
            WARRANTY_IN_DMY: $scope.WARRANTY_PERIOD,
            WARRANTY_PERIOD: $scope.WARRANTY_VALUE,
            AMOUNT_WITHOUT_TAX: $scope.final,
            TAX_AMOUNT: $scope.Ttax,
            AMOUNT_WITH_TAX: $scope.AItax,
            TAX_PERCENTAGE: $scope.gstamt,
            AMOUNT_INC_TAX: $scope.IncludingTaxes,
            IS_SPL_WARRANTY: $scope.SPL_WARRANTY,
            IS_REFURGISHED: $scope.IS_REFURGISHED,
            C_NAME: $scope.C_NAME,
            //NOTE: $scope.REMARKS
            NOTE: CKEDITOR.instances.REMARKS.getData()
        }

        var datalist = QuotationService.UpdateQuotationDetails(tb_Admin);

        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Quotation Details updated successfully.");

                window.location.href = window.location.href;
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
        tb_Admin = {
            Q_ID: $scope.Q_ID,
            WARRANTY_IN_DMY: $scope.WARRANTY_PERIOD,
            WARRANTY_PERIOD: $scope.WARRANTY_VALUE,
            AMOUNT_WITHOUT_TAX: $scope.final,
            TAX_AMOUNT: $scope.Ttax,
            AMOUNT_WITH_TAX: $scope.AItax,
            TAX_PERCENTAGE: $scope.gstamt,
            AMOUNT_INC_TAX: $scope.IncludingTaxes,
            IS_SPL_WARRANTY: $scope.SPL_WARRANTY,
            IS_REFURGISHED: $scope.IS_REFURGISHED,
            C_NAME: $scope.C_NAME,
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
                    window.location.href = "/Quotation_Registration/Index?CustType=" + $scope.CUSTOMER_TYPE;
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

    function GetAllCategory() {
        var getAdmin = QuotationService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }
});