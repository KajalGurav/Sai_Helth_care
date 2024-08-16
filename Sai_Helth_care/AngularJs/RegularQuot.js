app.service("RegProductService", function ($http) {


    //this.GetProduct = function () {
    //    return $http.get("/Quotation_Registration/GetProduct");
    //};

    
    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetallProduct",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordby = function () {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetallAdmin",
            data: JSON.stringify()
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



});


app.controller("Quotetion", function ($scope, RegProductService) {

    

    $scope.OnCategoryClick = function (id) {

        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            GetRecordby();
        }

        else if (id === '1') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
           
        }
    }

   

    function GetRecordby() {
        alert();
        var SearchingConditions = GetSearchingConditions();
        var getrecord = RegProductService.getRecordby();
        getrecord.then(function (response) {
            $scope.RegularQuotationList = response.data;
            alert(JSON.stringify($scope.RegularQuotationList));
            ;
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
            FARMER_NAME: $scope.FARMER_SEARCH,
            STATE_ID: $scope.STATE_SEARCH

        };

        return GetRecordbyPaging;

    }

    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = RegProductService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.ProductList = response.data;
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }


    //function GetAllProduct() {
    //    var getAdmin = RegProductService.GetProduct();
    //    getAdmin.then(function (response) {
    //        $scope.ProductList = response.data;
    //        alert(JSON.stringify($scope.ProductList));
    //    });
    //}



    //$scope.getForUpdate = function (admin){
    //    alert(admin.Q_ID);
    //    //$scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
    //    $scope.Q_ID = admin.Q_ID;
    //    $scope.QUOTATION_TYPE = admin.QUOTATION_TYPE;
    //    $scope.QUOTATION_NO = admin.QUOTATION_NO;
    //    $scope.Customer_ID = admin.Customer_ID;
    //    $scope.FIRM_ID = admin.FIRM_ID;
    //    $scope.STATUS = admin.STATUS;
    //    $scope.QUOTATION_DATE = admin.QUOTATION_DATE;
    //    $scope.PNDT_STATUS = admin.PNDT_STATUS;
    //    $scope.PNDT_NO = admin.PNDT_NO;
    //    $scope.PO_DATE = admin.PO_DATE;
    //    $scope.PAYMENT_TERM = admin.PAYMENT_TERM;
    //    $scope.NOTE = admin.NOTE;
    //    setTimeout(function myfunction() {
    //        var blankSelectOptions = $('option[value$="?"]');
    //        if (blankSelectOptions.length > 0) {
    //            $(blankSelectOptions).remove();
    //        }
    //        $("#Customer_ID").val($scope.Customer_ID);
     
    //    }, 500);

    //};



   

    $("#checkAllChkbox").change(function () {
        
        $(".checkbox_th input:checkbox").prop('checked', $(this).prop("checked"));
    });




    $scope.AddAdmin = function () {

        tb_Admin = {

            CAT_ID: $scope.CAT_ID,
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

        EditAdminRecord(tb_Admin);
    }

    function EditAdminRecord(tb_Admin) {
        var datalist = RegProductService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Quotation Updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Quotation already added.");
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



});