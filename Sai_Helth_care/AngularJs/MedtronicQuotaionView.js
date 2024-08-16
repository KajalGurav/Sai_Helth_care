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

    this.GetMedtronicAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicAccessories/GetMedtronicAccessoriesById",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddProductDetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/AddMedtronicQuotProduct",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetMedtronicQuotationProductList = function (id) {
       
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetMedtronicQuotationProductList",
            params: {
                id: id
            }
        });
        return response;  
    };


    this.Admin_Delete = function (quotID, productID, medAccessoriesID) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/DeleteMedtronicQuotationProductAccessories",
            params: {
                quotID: quotID,
                productID: productID,
                medAccessoriesID: medAccessoriesID
            }
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
    $scope.Math = window.Math;
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
    GetMedtronicQuotationProductList();
    
    function GetQuotation() {
        
        var getAdmin = QuotationService.GetRegularQotDetails($scope.Q_ID);
        getAdmin.then(function (response) {
            
            $scope.QuotationList = response.data;

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
                        $scope.Ttax = 0;//Math.round($scope.final * 1.12) - $scope.final;
                        $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.12);
                        $scope.FinalAmount = $scope.AItax;
                        $scope.gstamt = $scope.QuotationList[0].TAX_PERCENTAGE;
                    } else if ($scope.QuotationList[0].QUOTATION_TYPE === 'Service') {
                        $scope.Ttax = 0;//Math.round($scope.final * 1.18) - $scope.final;
                        $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.18);
                        $scope.FinalAmount = $scope.AItax;
                        $scope.gstamt = $scope.QuotationList[0].TAX_PERCENTAGE;
                    }
                    else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
                        GetMedtronicQuotationProductList();
                    }

                    //alert($scope.Ttax);
                } else if ($scope.QuotationList[0].AMOUNT_INC_TAX == "Excluding") {
                    if ($scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
                        $scope.IsDisabled = false;
                        $scope.gstamt = $scope.QuotationList[0].TAX_PERCENTAGE.toString();
                        //$("#gstamt").val($scope.gstamt);
                        $scope.Ttax = Math.round(($scope.final * $scope.gstamt) / 100);
                        $scope.AItax = $scope.final + $scope.Ttax;
                        $scope.FinalAmount = $scope.final;
                    }
                    else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {

                        $scope.IsDisabled = false;
                        GetMedtronicQuotationProductList();
                    }
                    else{
                        $scope.IsDisabled = false;
                        $scope.gstamt = $scope.QuotationList[0].TAX_PERCENTAGE.toString();
                        //$("#gstamt").val($scope.gstamt);
                        $scope.Ttax = Math.round(($scope.final * $scope.gstamt) / 100);
                        $scope.AItax = $scope.final + $scope.Ttax;
                        $scope.FinalAmount = $scope.AItax;
                    }
                    
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
                $scope.WARRANTY_PERIOD = $scope.QuotationList[0].WARRANTY_IN_DMY;
                $scope.WARRANTY_VALUE = $scope.QuotationList[0].WARRANTY_PERIOD;
                $scope.SPL_WARRANTY = $scope.QuotationList[0].IS_SPL_WARRANTY;
               
            }
            GetAllProduct();

            $scope.REMARKS = $scope.QuotationList[0].NOTE;
            $scope.SUBJECT = $scope.QuotationList[0].SUBJECT;
            var editor = CKEDITOR.instances.REMARKS;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('REMARKS', {
                //language: 'fr',
                uiColor: '#9AB8F3'
            });
            CKEDITOR.instances.REMARKS.setData($scope.REMARKS);

            $("#loader").css("display", 'none');
            //GetCustomerFirm();
        });
    }

    function GetMedtronicQuotationProductList() {
        var getAdmin = QuotationService.GetMedtronicQuotationProductList($scope.Q_ID);
        getAdmin.then(function (response) {
            $scope.QuotationProductList = response.data;

            $scope.T_TOTAL_PRICE = $scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList[$scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList.length-1].T_TOTAL_PRICE;
            $scope.TOTAL_BASIC_PRICE = $scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList[$scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList.length - 1].TOTAL_BASIC_PRICE;
            $scope.TOTAL_GST = $scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList[$scope.QuotationProductList[0].MedtronicQuotationProductAccessoriesList.length - 1].TOTAL_GST;
            $scope.final = 0;
            if ($scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
                $scope.final = $scope.QuotationProductList[0].BASIC_PRICE * $scope.QuotationProductList[0].QUANTITY;
            }
            else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
                $scope.Ttax = 0;
                $scope.AItax = 0;
                $scope.FinalAmount = 0;
                for (let x = 0; x < $scope.QuotationProductList.length; x++) {
                    var MedtronicQuotationProductAccessoriesList = $scope.QuotationProductList[x].MedtronicQuotationProductAccessoriesList;
                    for (let y = 0; y < MedtronicQuotationProductAccessoriesList.length; y++) {
                        var accitem = MedtronicQuotationProductAccessoriesList[y];
                       
                        $scope.Ttax = $scope.Ttax + ((accitem.PART_TOTAL_AMOUNT * accitem.GST_PERCENTAGE) / 100);

                        $scope.final = $scope.final + (accitem.PART_TOTAL_AMOUNT);

                    }
                }
                $scope.Ttax = parseFloat($scope.Ttax).toFixed(0);
                $scope.AItax = parseFloat(parseFloat($scope.final) + parseFloat($scope.Ttax)).toFixed(0);
                $scope.FinalAmount = $scope.AItax;
            }
            else if ($scope.QuotationList[0].QUOTATION_TYPE === 'Service') {
                $scope.final = $scope.QuotationProductList[0].BASIC_PRICE * $scope.QuotationProductList[0].QUANTITY;
            }

        });
    }

    $scope.StdAccDisplay = "No";
    var editor = CKEDITOR.instances.REMARKS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('REMARKS', {
        uiColor: '#9AB8F3'
    });

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
            Type = "Category";
        }
        var getAdmin = QuotationService.GetProduct(productTypeID, Type);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
            $scope.CUSTOMER_TYPE_ID = $scope.CUSTOMER_TYPE_ID1;
        });
    }

    $scope.Cancel = function () {

        var checkboxes1 = document.getElementsByClassName("MainSystem");
        for (var i = 0; i < checkboxes1.length; i++) {
            checkboxes1[i].checked = false;
        }
        var checkboxes2 = document.getElementsByClassName("Attachments");
        for (var i = 0; i < checkboxes2.length; i++) {
            checkboxes2[i].checked = false;
        }
        var checkboxes3 = document.getElementsByClassName("Tools");
        for (var i = 0; i < checkboxes3.length; i++) {
            checkboxes3[i].checked = false;
        }

        $("#AddProductAccessories").modal("hide");
    }

    $scope.Getspare = function (Product) {
        $scope.PART_QTY = 1;
        $scope.P_ID = Product.P_ID;
        GetAllSparepart();
        setTimeout(function () {
            if ($scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
                //document.getElementById("checkAllChkbox1").checked = true;

                //var checkboxes1 = document.getElementsByClassName("MainSystem");
                //for (var i = 0; i < checkboxes1.length; i++) {
                //    checkboxes1[i].checked = true;
                //}

                //document.getElementById("checkAllChkbox2").checked = true;

                //var checkboxes2 = document.getElementsByClassName("Attachments");
                //for (var i = 0; i < checkboxes2.length; i++) {
                //    checkboxes2[i].checked = true;
                //}

                //document.getElementById("checkAllChkbox3").checked = true;

                //var checkboxes3 = document.getElementsByClassName("Tools");
                //for (var i = 0; i < checkboxes3.length; i++) {
                //    checkboxes3[i].checked = true;
                //}
            }
            else {
                document.getElementById("checkAllChkbox1").checked = false;

                var checkboxes1 = document.getElementsByClassName("MainSystem");
                for (var i = 0; i < checkboxes1.length; i++) {
                    checkboxes1[i].checked = false;
                }

                document.getElementById("checkAllChkbox2").checked = false;

                var checkboxes2 = document.getElementsByClassName("Attachments");
                for (var i = 0; i < checkboxes2.length; i++) {
                    checkboxes2[i].checked = false;
                }

                document.getElementById("checkAllChkbox3").checked = false;

                var checkboxes3 = document.getElementsByClassName("Tools");
                for (var i = 0; i < checkboxes3.length; i++) {
                    checkboxes3[i].checked = false;
                }
            }
        }, 2000);

        $scope.PRODUCT_QUANTITY = Product.PRODUCT_QUANTITY;
        $scope.PRODUCT_PRICE = Product.BASIC_PRICE;
        $scope.PRODUCT_GST = Product.GST_PERCENTAGE;

        
        ////////////
        if ($scope.QuotationList[0].QUOTATION_TYPE != "SpareParts") {
           
            $("#prodQuant").removeAttr("disabled");
            $("#prodQuant").value = 1;
            document.getElementById("prodQuant").required = true;
            $("#prodPrice").removeAttr("disabled");
            $("#prodPrice").value = parseInt($scope.PRODUCT_PRICE);
            document.getElementById("prodPrice").required = true;
            $("#prodGST").removeAttr("disabled");
            $("#prodGST").value = parseInt($scope.PRODUCT_GST);
            document.getElementById("prodGST").required = true;
        }
        else {
            $("#prodQuant").prop("disabled", "disabled");
            //document.getElementById("prodQuant").required = false;
            $("#prodQuant").value=0;
            $("#prodPrice").prop("disabled", "disabled");
            //document.getElementById("prodPrice").required = false;
            $("#prodPrice").value = 0;
            $("#prodGST").prop("disabled", "disabled");
            //document.getElementById("prodPrice").required = false;
            $("#prodGST").value = 0;
        }

    };

    function GetAllSparepart() {
        var getAdmin = QuotationService.GetMedtronicAccessories($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparepartList = response.data;
        })
    }

    $scope.CalculateBasicPrice = function (obj) {
        var id = obj.MED_ACC_ID;
        var productMRP = 0;
        if (obj.MRP === null || obj.MRP === undefined || obj.MRP === "") {
            productMRP = 0;
        } else {
            productMRP = parseFloat(obj.MRP);
        }
        var dicountPercentage = 0;
        if ($("#DISCOUNT" + id).val() > 100) {
            dicountPercentage = 100;
            $("#DISCOUNT" + id).val(dicountPercentage);
        }
        if ($("#DISCOUNT" + id).val() < 0) {
            dicountPercentage = 0;
            $("#DISCOUNT" + id).val(dicountPercentage);
        }
        if ($("#DISCOUNT" + id).val() === null || $("#DISCOUNT" + id).val() === undefined || $("#DISCOUNT" + id).val() === "") {
            dicountPercentage = 0;
            $("#DISCOUNT" + id).val(dicountPercentage);
        }
        else {
            dicountPercentage = parseFloat($("#DISCOUNT" + id).val());
        }

        var basicPrice = Math.round(((parseFloat(productMRP) * 100) / (parseFloat(obj.GST_PERCENTAGE) + 100)) * ((100 - parseFloat(dicountPercentage)) / 100));
        console.log(basicPrice);
        $("#BASIC_PRICE" + id).val(basicPrice);
        $scope.CalculatePartTotalAmount(obj);
    }

    $scope.CalculatePartTotalAmount = function (obj) {
        var id = obj.MED_ACC_ID;
        var Qty = parseInt($("#Q" + id).val());
        var basicPrice = 0;
        if ($("#BASIC_PRICE" + id).val() === null || $("#BASIC_PRICE" + id).val() === undefined || $("#BASIC_PRICE" + id).val() === "") {
            basicPrice = 0;
        } else {
            basicPrice = parseFloat($("#BASIC_PRICE" + id).val());
        }

        var partAmount = Math.round(Qty * (parseFloat(basicPrice)));
        $("#PART_TOTAL_AMOUNT" + id).val(partAmount);
    }

    ///////////////// PRODUCT QUOTATION ///////////

    $scope.AddProduct = function (Sparepart) {
        if ($scope.QuotationList[0].QUOTATION_TYPE !== "SpareParts") {
            if (document.getElementById("prodQuant").value === "" || document.getElementById("prodQuant").value === "0" || document.getElementById("prodQuant").value === 0) {
                alert("Please enter valid Product Quantity!");
                return false;
            }
            if (document.getElementById("prodGST").value === "" || document.getElementById("prodGST").value === "0" || document.getElementById("prodGST").value === 0) {
                alert("Please enter valid Product GST!");
                return false;
            }
            if (document.getElementById("prodPrice").value === "" || document.getElementById("prodPrice").value === "0" || document.getElementById("prodPrice").value === 0) {
                alert("Please enter valid Product Price!");
                return false;
            }
            if ($scope.ATTACHMENTS_ID === "" || $scope.ATTACHMENTS_ID === null || $scope.ATTACHMENTS_ID === undefined
                || $scope.TOOLS_ID === "" || $scope.TOOLS_ID === null || $scope.TOOLS_ID === undefined 
                || $scope.MED_ACC_ID === "" || $scope.MED_ACC_ID === null || $scope.MED_ACC_ID === undefined )
            {
                alert("Please Select Atleast Any One From Main System,Attachments Or Tools ");
                return false;
            }
        }

        var chkidsarr = [];
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            var input = { Id: $(this).val().toString(), IsChecked: 1 };
            chkidsarr.push(input);
        });
        var accessories = [];
        for (let i = 0; i < chkidsarr.length; i++) {
            
            accessories.push({ MQPA_ID: null, Q_ID: parseInt($scope.Q_ID), P_ID: parseInt($scope.P_ID), MED_ACC_ID: parseInt(chkidsarr[i].Id), QUANTITY: parseInt($("#Q" + chkidsarr[i].Id).val()), MRP: parseInt($("#MRP" + chkidsarr[i].Id).val()), BASIC_PRICE: parseFloat($("#BASIC_PRICE" + chkidsarr[i].Id).val()), DISCOUNT: parseFloat($("#DISCOUNT" + chkidsarr[i].Id).val()), GST_PERCENTAGE: parseInt($("#GST_PERCENTAGE" + chkidsarr[i].Id).val()), PART_TOTAL_AMOUNT: parseFloat($("#PART_TOTAL_AMOUNT" + chkidsarr[i].Id).val()), });
        }
        if (accessories === null || accessories.length === 0) {
            alert("Please Select Atleast Any One From Main System,Attachments Or Tools ");
            return false;
        }
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
            CUSTOMER_ID: parseInt(cusId),
            QUANTITY: parseInt($scope.PRODUCT_QUANTITY),
            BASIC_PRICE: parseFloat($scope.PRODUCT_PRICE),
            GST_PERCENTAGE: parseInt($scope.PRODUCT_GST),
            MedtronicQuotationProductAccessoriesList: accessories
        };
        AddproductRecord(tb_Admin);
    }
  
    function AddproductRecord(tb_Admin) {

        var datalist = QuotationService.AddProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Product added successfully.");
                GetMedtronicQuotationProductList();
               
                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
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

    $scope.getFordelete = function (Product) {
        var MED_ACC_ID = null;
        if (Product.MED_ACC_ID !== undefined || Product.MED_ACC_ID !== null || Product.MED_ACC_ID !== "") {
            MED_ACC_ID = parseInt(Product.MED_ACC_ID);
        }
        
        var datalist = QuotationService.Admin_Delete(parseInt(Product.Q_ID), parseInt(Product.P_ID), MED_ACC_ID);
        datalist.then(function (d) {
            if (d.data.success === true) {
                clearTax();
                alert("Product removed successfully.");
                GetMedtronicQuotationProductList();
                
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
                $scope.Ttax = 0;//Math.round($scope.final * 1.12) - $scope.final;
                $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.12);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = $scope.QuotationProductList[0].GST_PERCENTAGE;
                //document.getElementById('taxNote').style.display = "block";
                //document.getElementById('taxNote').innerHTML = '<b>Amount Including 12% GST</b>';
            } else if ($scope.QuotationList[0].QUOTATION_TYPE === 'Service') {
                $scope.Ttax = 0;//Math.round($scope.final * 1.12) - $scope.final;
                $scope.AItax = Math.round($scope.final);//Math.round($scope.final * 1.12);
                $scope.FinalAmount = $scope.AItax;
                $scope.gstamt = $scope.QuotationProductList[0].GST_PERCENTAGE;
                //document.getElementById('taxNote').style.display = "block";
                //document.getElementById('taxNote').innerHTML = '<b>Amount Including 18% GST</b>'
            }
            else if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
               
            }

            //alert($scope.Ttax);
        } else if (s_option == "No") {
            $scope.IsDisabled = false;
            if ($scope.QuotationList[0].QUOTATION_TYPE === 'SpareParts') {
              
            } else {
                
                $scope.calTax($scope.gstamt);
            }
           
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
   
    window.processHTML = function (htmlContent, id) {
        var content = htmlContent.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, function (m) {
            return m.replace(/[\n\t]+/g, "");
        });
      
        $("#" + id).html(content);
    };

    $scope.numTowords = function () {
       
        if ($scope.FinalAmount <= 0 && $scope.QuotationList[0].QUOTATION_TYPE === 'Sales') {
            $("#PrintQuotation").attr('disabled', 'disabled');
            $("#SaveQuotation").attr('disabled', 'disabled');
            alert("Please Select Product!");
            return false;
        }

        if ($scope.QuotationList[0].QUOTATION_TYPE === "SpareParts") {

            $("#QuotationMedtronicSparePart").modal("show");

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
            window.processHTML($scope.REMARKS, "QTerms");
            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
            getData.then(function (response) {
                $scope.cbd = response.data;
            });
        }
        else if($scope.QuotationList[0].QUOTATION_TYPE === "Sales") {
            $('.btn-no').text("No");
            $('.btn-yes').text("Yes");
            if (typeof $scope.result === "undefined" || $scope.result.length < 1) {
                $("#PrintQuotation").attr('disabled', 'disabled');
                $("#SaveQuotation").attr('disabled', 'disabled');
                alert("Please Select Including All Taxes Option!");
                return false;
            }

            $("#QuotationMedtronic").modal("show");

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
            window.processHTML($scope.REMARKS, "QRemarks");
            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
            getData.then(function (response) {
                $scope.cbd = response.data;
                console.log(JSON.stringify($scope.cbd));
            });

        }
        else if ($scope.QuotationList[0].QUOTATION_TYPE === "Service") {

            $("#QuotationMedtronicService").modal("show");

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
            window.processHTML($scope.REMARKS, "QTermsService");
            $scope.amtInwords = inWords($scope.FinalAmount);
            var getData = QuotationService.GetCompanyBankDetails($scope.QuotationList[0].BANK_ID);
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

    $scope.SaveQuotDetails = function () {

        if ($scope.QuotationList[0].QUOTATION_TYPE !== "SpareParts") {
            if (typeof $scope.result === "undefined" || $scope.result === '') {
                $("#PrintQuotation").attr('disabled', 'disabled');
                $("#SaveQuotation").attr('disabled', 'disabled');
                alert("Please Select Including All Taxes Option!");
                return false;
            }
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

        if (typeof $scope.SPL_WARRANTY === "undefined" || $scope.SPL_WARRANTY === '' || $scope.SPL_WARRANTY === null ) {
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
            SUBJECT: $scope.SUBJECT,
            IS_REFURGISHED: "False",
            C_NAME: "No",
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
            IS_REFURGISHED: "False",
            C_NAME: "False",
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
        function() {
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