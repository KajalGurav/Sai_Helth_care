app.service("VendorPOViewService", function ($http) {


    this.GetVendorPODetails = function (id, CUSTOMER_TYPE_ID) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/GetVendorPODetailsForUpdate",
            params: {
                VPO_ID: id,
                CUSTOMER_TYPE_ID: CUSTOMER_TYPE_ID 
            }
        });
        return response;
    };


    //this.GetProduct = function (productTypeID) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/Quotation_Registration/GetProduct",
    //        params: {
    //            productTypeID: productTypeID
    //        }
    //    });
    //    return response;
    //};

    this.GetProduct = function (productTypeID, Type) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/GetProduct",
            params: {
                productTypeID: productTypeID,
                Type: Type
            }
        });
        return response;
    };

    this.GetAccessoriesByProductId = function (id,custTypeId) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/GetAccessoriesByProductId",
            params: {
                id: id,
                CUSTOMER_TYPE_ID: custTypeId
            }
        });
        return response;
    };

    this.AddProductDetails = function (tb_Admin) {
        //  alert(tb_Admin.CUSTOMER_ID);
        var response = $http({
            method: "POST",
            url: "/VendorPO/AddVendorPOProductAccessories",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };



    this.GetVendorPOProductList = function (id) {
       
        var response = $http({
            method: "POST",
            url: "/VendorPO/GetVendorPOProductList",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCmpnyBankDetails");       
    };


    this.Admin_Delete = function (vendorPOID, vendorprodID, vendorAccessoriesID) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/DeleteVendorPOProductAccessories",
            params: {
                vendorPOID: vendorPOID,
                vendorprodID: vendorprodID,
                vendorAccessoriesID: vendorAccessoriesID
            }
        });
        return response;
    };
  
    this.UpdateVendorPODetails = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/VendorPO/UpdateVendorPODetails",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetIncludingAllTaxes = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetIncludingAllTaxes",
        });
        return response;
    };
    this.GetGSTPercentage = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetGSTPercentage",
        });
        return response;
    };
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

app.filter('unique', function () {
    return function (collection, key) {
        var output = [];
        var keys = {};

        angular.forEach(collection, function (item) {
            var value = item[key];
            if (!keys[value]) {
                keys[value] = true;
                output.push(item);
            }
        });

        return output;
    };
});

    
app.controller("VendorPOViewCtrl", function ($scope, VendorPOViewService) {


    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.PAGE_NAME = PARAM[0].split('=').pop();
    $scope.CUSTOMER_TYPE = PARAM[1].split('=').pop();
    $scope.VENDOR_ID = parseInt(PARAM[2].split('=').pop());
    $scope.VPO_ID = parseInt(PARAM[3].split('=').pop());
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

    GetVendorPODetails();
    

    var editor = CKEDITOR.instances.TERMS_AND_CONDITIONS;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('TERMS_AND_CONDITIONS', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });

    $scope.OnIncTaxChange = function () {
        $('#SaveVendorPO').removeAttr("disabled");
        $('#PrintVendorPO').removeAttr("disabled");
    }

    function GetIncludingAllTaxes() {
        var getAdmin = VendorPOViewService.GetIncludingAllTaxes();
        getAdmin.then(function (response) {
            $scope.IncludingAllTaxesList = response.data;
        });
    }
    function GetGSTPercentage() {
        var getAdmin = VendorPOViewService.GetGSTPercentage();
        getAdmin.then(function (response) {
            $scope.GSTPercentageList = response.data;
        });
    }

    function Clear() {
        $scope.PRODUCT_QUANTITY = "";
        $scope.PRODUCT_PRICE = "";
        $scope.IS_WITH_WARRANTY = "";
        $scope.WARRANTY_QTY = "";
        $scope.WARRANTY_PRICE = "";
        $scope.TAX_AMOUNT = "";
        $scope.AMOUNT_INC_TAX = "";
        $scope.TOTAL_AMOUNT = "";

        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }

    $scope.CalculateTaxAmount = function () {
        CalculateTaxAmount();
    }

    function CalculateTaxAmount() {


        if ($scope.IAT_ID === 1 || $scope.IAT_ID === "1") {
            
            var gst = 0;
            if ($scope.GSTP_ID === "" || $scope.GSTP_ID === undefined || $scope.GSTP_ID === null) {
                gst = 0;
            }
            else {
                gst = $scope.GSTP_ID;
            }
            var ACTUAL_AMOUNT = ($scope.TOTAL_AMOUNT / (1 + (parseInt(gst) / 100))).toFixed(0);
            $scope.ACTUAL_AMOUNT = ACTUAL_AMOUNT;
            $scope.TAX_AMOUNT = ($scope.TOTAL_AMOUNT - ACTUAL_AMOUNT).toFixed(0);
            $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT;

        }
        else if ($scope.IAT_ID === 0 || $scope.IAT_ID === "0") {

            var gst = 0;
            if ($scope.GSTP_ID === "" || $scope.GSTP_ID === undefined || $scope.GSTP_ID === null) {
                gst = 0;
            }
            else {
                gst = $scope.GSTP_ID;
            }
            $scope.ACTUAL_AMOUNT = $scope.TOTAL_AMOUNT;
            $scope.TAX_AMOUNT = ($scope.TOTAL_AMOUNT * gst) / 100;
            $scope.AMOUNT_INC_TAX = $scope.TOTAL_AMOUNT + ($scope.TOTAL_AMOUNT * gst) / 100;

        }
    }

    $scope.CalculateTotalAmount = function () {

        var productList = $scope.VendorPOProductList;
        $scope.Total_Price = 0;
        for (let i in productList) {
            $scope.Total_Price = $scope.Total_Price + (parseFloat(productList[i].PRICE) * parseInt(productList[i].QUANTITY)) + (parseFloat(productList[i].WARRANTY_QTY) * parseInt(productList[i].WARRANTY_PRICE));
            var partList = productList[i].VendorPOProductAccessoriesList.filter(x => x.VPO_P_ID === productList[i].VPO_P_ID);
            for (let j in partList) {
                $scope.Total_Price = $scope.Total_Price + (parseFloat(partList[j].PART_PRICE) * parseInt(partList[j].PART_QTY));
            }
        }
        
        $scope.TOTAL_AMOUNT = $scope.Total_Price;

        CalculateTaxAmount();

    }
    
    function GetVendorPOProductList() {
        var getAdmin = VendorPOViewService.GetVendorPOProductList($scope.VPO_ID);
        getAdmin.then(function (response) {
            $scope.VendorPOProductList = response.data;
            $scope.CalculateTotalAmount();
        });
    }
    function GetVendorPODetails() {
        var getAdmin = VendorPOViewService.GetVendorPODetails(parseInt($scope.VPO_ID), parseInt($scope.CUSTOMER_TYPE_ID));
        getAdmin.then(function (response) {
            $scope.VendorPODetailsList = response.data;
            $scope.IAT_ID = parseInt($scope.VendorPODetailsList.INC_ALL_TAXES);
            $scope.TOTAL_AMOUNT = $scope.VendorPODetailsList.TOTAL_AMOUNT;
            $scope.TAX_AMOUNT = $scope.VendorPODetailsList.TAX_AMOUNT;
            $scope.AMOUNT_INC_TAX = $scope.VendorPODetailsList.AMOUNT_INC_TAX;
            $scope.GSTP_ID = $scope.VendorPODetailsList.GST;

            GetAllProduct();
            GetIncludingAllTaxes();
            GetGSTPercentage();
            GetVendorPOProductList();
            $scope.TERMS_AND_CONDITIONS = $scope.VendorPODetailsList.TERMS_AND_CONDITIONS;
            var editor = CKEDITOR.instances.TERMS_AND_CONDITIONS;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('TERMS_AND_CONDITIONS', {
                //language: 'fr',
                uiColor: '#9AB8F3'
            });
            CKEDITOR.instances.TERMS_AND_CONDITIONS.setData($scope.TERMS_AND_CONDITIONS);

            //GetCustomerFirm();
            $("#loader").css("display", 'none');
        });
    }


    function GetAllProduct() {
        var productTypeID = 1;
        if ($scope.CUSTOMER_TYPE_ID === 1) {
            productTypeID = 1;
            Type = "Regular";
        }
        else if ($scope.CUSTOMER_TYPE_ID === 3) {
            productTypeID = 3;
            Type = "Medtronic";
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5) {
            productTypeID = 2;
            Type = "Mindray";
        }
        
        var getAdmin = VendorPOViewService.GetProduct(productTypeID, Type);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
        });
    }


    $scope.Cancel = function () {
        Clear();
        if ($scope.CUSTOMER_TYPE_ID === 1) {
            $("#checkAllChkbox1").prop("checked", false);
            $("#checkAllChkbox2").prop("checked", false);
            var checkboxes1 = document.getElementsByClassName("StdAcc");
            for (var i = 0; i < checkboxes1.length; i++) {
                checkboxes1[i].checked = false;
            }
            var checkboxes2 = document.getElementsByClassName("SpareParts");
            for (var i = 0; i < checkboxes2.length; i++) {
                checkboxes2[i].checked = false;
            }
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5) {
            $("#checkAllChkbox3").prop("checked", false);
            var checkboxes3 = document.getElementsByClassName("Probes");
            for (var i = 0; i < checkboxes3.length; i++) {
                checkboxes3[i].checked = false;
            }
        }
        else if ($scope.CUSTOMER_TYPE_ID === 3) {
            $("#checkAllChkbox4").prop("checked", false);
            $("#checkAllChkbox5").prop("checked", false);
            $("#checkAllChkbox6").prop("checked", false);
            var checkboxes4 = document.getElementsByClassName("MainSystem");
            for (var i = 0; i < checkboxes4.length; i++) {
                checkboxes4[i].checked = false;
            }
            var checkboxes5 = document.getElementsByClassName("Attachments");
            for (var i = 0; i < checkboxes5.length; i++) {
                checkboxes5[i].checked = false;
            }
            var checkboxes6 = document.getElementsByClassName("Tools");
            for (var i = 0; i < checkboxes6.length; i++) {
                checkboxes6[i].checked = false;
            }
        }
        $("#AddProductAccessories").modal("hide");
    }

    $scope.Getspare = function (Product) {
        Clear();
        $scope.P_ID = Product.P_ID;
        GetAllSparepart();
        

    };

    function GetAllSparepart() {
        //alert($scope.P_ID);
        var getAdmin = VendorPOViewService.GetAccessoriesByProductId($scope.P_ID,$scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.ProductAccessoriesSparePartList = response.data;
            

        })

    }

    ///////////////// PRODUCT VENDOR PO ///////////

    $scope.AddProduct = function () {
        if ($scope.IS_WITH_WARRANTY === undefined || $scope.IS_WITH_WARRANTY === null || $scope.IS_WITH_WARRANTY === "") {
            alert("Please Select Is With Warranty!");
            return;
        }
        var chkidsarr = [];
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            var input = { Id: $(this).val().toString(), IsChecked: 1 };
            chkidsarr.push(input);
        });
        var accessories = [];
        for (let i = 0; i < chkidsarr.length; i++) {
            var acc = $scope.ProductAccessoriesSparePartList.filter(x => x.ACC_ID === parseInt(chkidsarr[i].Id))[0];
            accessories.push({ VPO_ACC_ID: null, VPO_ID: parseInt($scope.VPO_ID), VPO_P_ID: null, ACC_ID: parseInt(chkidsarr[i].Id), ACC_TYPE_ID: parseInt(acc.ACC_TYPE_ID), PART_QTY: parseInt($("#Q" + chkidsarr[i].Id).val()), PART_PRICE: parseFloat($("#PART_PRICE" + chkidsarr[i].Id).val()) });
        }
        
        tb_Admin = {
            VPO_ID: $scope.VPO_ID,
            P_ID: $scope.P_ID,
            VENDOR_ID: $scope.VENDOR_ID,
            QUANTITY: parseInt($scope.PRODUCT_QUANTITY),
            PRICE: parseFloat($scope.PRODUCT_PRICE),
            IS_WITH_WARRANTY: parseInt($scope.IS_WITH_WARRANTY),
            WARRANTY_QTY: parseInt($scope.WARRANTY_QTY),
            WARRANTY_PRICE: parseFloat($scope.WARRANTY_PRICE),
            VendorPOProductAccessoriesList: accessories
        };
        AddproductRecord(tb_Admin);
    }
  
    function AddproductRecord(tb_Admin) {

        var datalist = VendorPOViewService.AddProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                $scope.VendorPOProductList = "";
                alert("Product added successfully.");
                GetVendorPOProductList();

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


    $scope.getFordelete = function (Product) {
        var VPO_ACC_ID = null;
        if (Product.VPO_ACC_ID !== undefined || Product.VPO_ACC_ID !== null || Product.VPO_ACC_ID !== "") {
            VPO_ACC_ID = parseInt(Product.VPO_ACC_ID);
        }


        //console.log(Quotation.SPARE_PART);

        var datalist = VendorPOViewService.Admin_Delete(parseInt(Product.VPO_ID), parseInt(Product.VPO_P_ID), VPO_ACC_ID);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                $scope.VendorPOProductList = "";
                alert("Product removed successfully.");
                GetVendorPOProductList();

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
        if (typeof $scope.IAT_ID === "undefined" || $scope.IAT_ID === null || $scope.IAT_ID === "" ) {
            $("#SaveVendorPO").attr('disabled', 'disabled');
            $("#PrintVendorPO").attr('disabled', 'disabled');
            alert("Please Select Inc. All Taxes Option!");
            return false;
        }

        if ($scope.VendorPOProductList.length <= 0 ) {
            $("#SaveVendorPO").attr('disabled', 'disabled');
            $("#PrintVendorPO").attr('disabled', 'disabled');
            alert("Please Select Product!");
            return false;
        }

        if ($scope.CUSTOMER_TYPE_ID === 1) {
            window.processHTML($scope.VendorPODetailsList.TERMS_AND_CONDITIONS, "TERMS");
            $("#VendorPO").modal("show");
        }
        else if ($scope.CUSTOMER_TYPE_ID === 2) {
            window.processHTML($scope.VendorPODetailsList.TERMS_AND_CONDITIONS, "TERMS");
            $("#VendorPO").modal("show");
        }
        else if ($scope.CUSTOMER_TYPE_ID === 3) {
            window.processHTML($scope.VendorPODetailsList.TERMS_AND_CONDITIONS, "TERMS2");
            $("#VendorPOMedtronic").modal("show");
        }
        else if ($scope.CUSTOMER_TYPE_ID === 5) {
            window.processHTML($scope.VendorPODetailsList.TERMS_AND_CONDITIONS, "TERMS1");
            $("#VendorPOMindray").modal("show");
        }

        

        
        $scope.amtInwords = inWords($scope.AMOUNT_INC_TAX);
        $scope.amtInwords2 = inWords($scope.TAX_AMOUNT);
        var getData = VendorPOViewService.GetCompanyDetails(0);
        getData.then(function (response) {
            $scope.COMPANY_DETAILS = response.data;
        });

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

    $scope.SavePODetails = function () {

        if (typeof $scope.IAT_ID === "undefined" || $scope.IAT_ID === null || $scope.IAT_ID === "" ) {
            $("#SaveVendorPO").attr('disabled', 'disabled');
            $("#PrintVendorPO").attr('disabled', 'disabled');
            alert("Please Select Inc. All Taxes Option!");
            return false;
        }
        if ($scope.VendorPOProductList.length <= 0) {
            $("#SaveVendorPO").attr('disabled', 'disabled');
            $("#PrintVendorPO").attr('disabled', 'disabled');
            alert("Please Select Product!");
            return false;
        }
        if ($scope.GSTP_ID === "" || $scope.GSTP_ID === undefined || $scope.GSTP_ID === null) {
            $scope.GSTP_ID = null;
        }


        tb_Admin = {
            VPO_ID: $scope.VPO_ID,
            TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
            TAX_AMOUNT: $scope.TAX_AMOUNT,
            GST: parseInt($scope.GSTP_ID),
            AMOUNT_INC_TAX: $scope.AMOUNT_INC_TAX,
            INC_ALL_TAXES: parseInt($scope.IAT_ID),
            TERMS_AND_CONDITIONS: CKEDITOR.instances.TERMS_AND_CONDITIONS.getData()
        }

        var datalist = VendorPOViewService.UpdateVendorPODetails(tb_Admin);

        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Vendor PO Details updated successfully.");
                
                window.location.href = window.location.href;
            }
            else if (d.data.success === false) {
                alert("Error occured while updating Vendor PO details");
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
            VPO_ID: $scope.VPO_ID,
            TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
            TAX_AMOUNT: $scope.TAX_AMOUNT,
            GST: parseInt($scope.GSTP_ID),
            AMOUNT_INC_TAX: $scope.AMOUNT_INC_TAX,
            INC_ALL_TAXES: parseInt($scope.IAT_ID),
            TERMS_AND_CONDITIONS: CKEDITOR.instances.TERMS_AND_CONDITIONS.getData()
        }

        var datalist = VendorPOViewService.UpdateVendorPODetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                alert("Vendor PO Details updated successfully.");

                var printHtml = document.getElementById(id).outerHTML;
                var currentPage = document.body.innerHTML;
                var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body> </html>';

                //var textContent;
                //if ($scope.CUSTOMER_TYPE_ID === 1 || $scope.CUSTOMER_TYPE_ID === 5) {
                //    textContent = 'Admi.Office:' + $scope.COMPANY_DETAILS[0].COMPANY_REG_ADDRESS.toString() + ' - ' + $scope.COMPANY_DETAILS[0].ZIP_CODE.toString() + '.';
                //}
                //else {
                //    textContent = 'Admi. Office: Office No. 55, 5th Floor, Business Bay, Near Sopan Hospital,Mumbai Naka, Nashik - 422 001.';
                //}
                //var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body> <footer> <div style="position: fixed; width: 100%; bottom: 0px; margin-top: 10px; text-align: center; padding-top: 5px;">< h5 style = "color: #145da0; margin: 200px 0 0 4px;" > ' + textContent +'</h5> </div> </footer> </html>';
                
                var WindowObject = window.open();
                
                WindowObject.document.write(elementPage);
               
                WindowObject.document.close();

                setTimeout(function () {
                    WindowObject.focus();
                    WindowObject.print();
                    WindowObject.close();
                    window.location.href = "/VendorPO/Index?CustType=" + $scope.CUSTOMER_TYPE;
                }, 1000);
                
                           
            }
            else if (d.data.success === false) {
                alert("Error occured while updating Vendor PO details");
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

    $scope.formatPrice = function () {
        if ($scope.PRODUCT_PRICE) {
            $scope.PRODUCT_PRICE = parseFloat($scope.PRODUCT_PRICE).toFixed(2);
        }
    };



});