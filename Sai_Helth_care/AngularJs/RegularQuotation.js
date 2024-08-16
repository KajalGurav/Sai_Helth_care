app.service("QuotationService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions){
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetCustomerList = function () {
        return $http.get("/Quotation_Registration/GetCustomerList");
    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetFirmList",
            params: {
                id: id
            }
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

   


    this.GetRegularQotDetails = function () {
        return $http.get("/Quotation_Registration/GetRegularQotDetails");
    };


    this.GetProduct = function () {
        return $http.get("/Quotation_Registration/GetProduct");
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


    this.GetProducQotatDetails = function () {
        return $http.get("/Quotation_Registration/GetProducQotatDetails");
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


});


app.controller("RegularQuotationCtrl", function ($scope, QuotationService) {

    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 10;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetQuotation();
    GetAllProduct();
    GetAllCustomer();

    //GetProductQuotationDetails();
   
   
    
    
    function GetTotalcount() {
        alert("GetTotalcount");
        var SearchingConditions = GetSearchingConditions();
        var getcount = QuotationService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.RegularQuotationList = "";
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
            $scope.RegularQuotationList = response.data;
            
            //GetAllCustomer();
            //GetCustomerFirm();
            //$scope.Q_ID = $scope.RegularQuotationList[0].Q_ID;
            //$scope.QUOTATION_TYPE = $scope.RegularQuotationList[0].QUOTATION_TYPE;
            //$scope.CUSTOMER_ID = $scope.RegularQuotationList[0].CUSTOMER_ID;
            //$scope.FIRM_ID = $scope.RegularQuotationList[0].FIRM_ID;
            //$scope.QUOTATION_DATE = $scope.RegularQuotationList[0].QUOTATION_DATE;
            //$scope.PNDT_STATUS = $scope.RegularQuotationList[0].PNDT_STATUS;
            //$scope.PNDT_NO = $scope.RegularQuotationList[0].PNDT_NO;
            //$scope.STATUS = $scope.RegularQuotationList[0].STATUS;
            //$scope.PO_DATE = $scope.RegularQuotationList[0].PO_DATE;
            //$scope.PAYMENT_TERM = $scope.RegularQuotationList[0].PAYMENT_TERM;
            //$scope.NOTE = $scope.RegularQuotationList[0].NOTE;
            
            ////alert($scope.CUSTOMER_ID);
            ////GetAllCustomer();
            //setTimeout(function myfunction() {
            //    var blankSelectOptions = $('option[value$="?"]');
            //    if (blankSelectOptions.length > 0) {
            //        $(blankSelectOptions).remove();
            //    }
                
            //    $("#FIRM_ID").val($scope.FIRM_ID);
            //    //$("#CUSTOMER_ID").val($scope.CUSTOMER_ID);

            //}, 5000);
            
            

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


    $scope.getdate = function () {

        $scope.STARTING_DATE = $("#STARTING_DATE").val();
        $scope.ENDING_DATE = $("#ENDING_DATE").val();

        GetTotalcount();
    };


    function GetProductQuotationDetails() {
        var getAdmin = QuotationService.GetProducQotatDetails();
        getAdmin.then(function (response) {
            $scope.ProductQuotationList = response.data;
            alert(JSON.stringify($scope.ProductQuotationList);
        });
    }



     function GetAllProduct() {
         var getAdmin = QuotationService.GetProduct();
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;
        });
     }

    $scope.Getspare = function (Product) {
        //alert(Product.P_ID);
        $scope.P_ID = Product.P_ID;
        GetAllSparepart();
    };


    function GetAllSparepart() {
        //alert($scope.P_ID);
        var getAdmin = QuotationService.GetSparepart($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparepartList = response.data;

            $scope.SP_ID = $scope.SparepartList[0].SP_ID;
            
        });
    }


    function GetQuotation() {
        var getAdmin = QuotationService.GetRegularQotDetails();
        getAdmin.then(function (response) {
            $scope.QuotationList = response.data;
            

            $("#tempCustId").val($scope.QuotationList[0].CUSTOMER_ID);
            //alert($("#tempCustId").val());
            //console.log($scope.QuotationList[0].CUSTOMER_ID);
            //console.log($scope.QuotationList);


            GetCustomerFirm();
            $scope.Q_ID = $scope.QuotationList[0].Q_ID;
            $scope.QUOTATION_TYPE = $scope.QuotationList[0].QUOTATION_TYPE;
            $scope.CUSTOMER_ID = $scope.QuotationList[0].CUSTOMER_ID;
            $scope.FIRM_ID = $scope.QuotationList[0].FIRM_ID;
            $scope.QUOTATION_DATE = $scope.QuotationList[0].QUOTATION_DATE;
            $scope.PNDT_STATUS = $scope.QuotationList[0].PNDT_STATUS;
            $scope.PNDT_NO = $scope.QuotationList[0].PNDT_NO;
            $scope.STATUS = $scope.QuotationList[0].STATUS;
            $scope.PO_DATE = $scope.QuotationList[0].PO_DATE;
            $scope.PAYMENT_TERM = $scope.QuotationList[0].PAYMENT_TERM;
            $scope.NOTE = $scope.QuotationList[0].NOTE;

            //alert($scope.CUSTOMER_ID);
            //GetAllCustomer();
            setTimeout(function myfunction() {
                var blankSelectOptions = $('option[value$="?"]');
                if (blankSelectOptions.length > 0) {
                    $(blankSelectOptions).remove();
                }

                $("#FIRM_ID").val($scope.FIRM_ID);
                //$("#CUSTOMER_ID").val($scope.CUSTOMER_ID);

            }, 5000);

        });
    }



    function GetAllCustomer() {
        var getAdmin = QuotationService.GetCustomerList();
        getAdmin.then(function (response) {
            $scope.CustomerList = response.data; 
            
        });
    }

    $scope.GetFirmChange = function () {
        $scope.CUSTOMER_ID = $scope.CUSTOMER_ID;
        GetCustomerFirm();
        //alert();

    };


    function GetCustomerFirm() {
        var getAdmin = QuotationService.GetFirmList($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;
            setTimeout(function myfunction() {
                var blankSelectOptions = $('option[value$="?"]');
                if (blankSelectOptions.length > 0) {
                    $(blankSelectOptions).remove();
                }
                $("#CUSTOMER_ID").val($scope.CUSTOMER_ID);
                // $("#FIRM_ID").val($scope.FIRM_ID);

            }, 500);
        });
    }


    $scope.OnCategoryClick = function (id) {
        alert(id);
        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            GetRecordbyPaging();
            
           
        }
        else if (id === '1') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
            GetProductQuotationDetails();
            GetAllProduct();
            GetQuotation();
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
        $scope.PAYMENT_TERM = "";
        $scope.NOTE = "";

    }

    $scope.Clearall = function () {

        Clear();
    };



    $scope.getForUpdate = function () {
        // $scope.PO_DATE = $("#PO_DATE").val();

        tb_Admin = {

            QUOTATION_TYPE: $scope.QUOTATION_TYPE,
            QUOTATION_NO: $scope.QUOTATION_NO,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID,
            STATUS: $scope.STATUS,
            PNDT_STATUS: $scope.PNDT_STATUS,
            PNDT_NO: $scope.PNDT_NO,
            PO_DATE: $scope.PO_DATE,
            PAYMENT_TERM: $scope.PAYMENT_TERM,
            NOTE: $scope.NOTE,
            Q_ID: $scope.Q_ID,

        };

        // $scope.PO_DATE = $("#PO_DATE").val();

        EditAdminRecord(tb_Admin);

    };

   


    function EditAdminRecord(tb_Admin) {
        var datalist = QuotationService.EditAdmin(tb_Admin);
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




    ///////////////// PRODUCT QUOTATION ///////////

    $scope.AddProduct = function (Sparepart) {

        var chkids = "";
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            chkids += $(this).val() + ',';
        });
        if (chkids !== "") {
            $scope.SP_ID = chkids;
        }
        else {
            if ($scope.SP_ID === null || $scope.SP_ID === undefined || $scope.SP_ID === "") {
             
                return false;
            }
        }

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
        };
        //alert(tb_Admin.CUSTOMER_ID);
        AddproductRecord(tb_Admin);
    }

    $scope.GotoPage = function (Sparepart) {
        $scope.SP_ID = Sparepart.SP_ID;
        window.location.href = "/Quotation_Registration/ViewQuote/" + $scope.SP_ID;
        alert($scope.SP_ID);
    }
    function AddproductRecord(tb_Admin) {
        var datalist = QuotationService.AddProductDetails(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product added successfully.");
                $("#AddProductAccessories").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
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
            QUOTATION_ID: Quotation.QUOTATION_ID
        }

        var datalist = QuotationService.Admin_Delete(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                GetRecordbyPaging();
                alert("Product removed successfully.");
                $("#").modal("hide");
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



});