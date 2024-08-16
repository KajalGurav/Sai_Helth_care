app.service("CustomerService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicCustomer/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MedtronicCustomer/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicCustomer/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MedtronicCustomer/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetState = function () {
        return $http.get("/MedtronicCustomer/GetState");
    };


    this.GetCity = function (id) {
        var response = $http({
            method: "POST",
            url: "/MedtronicCustomer/GetCity",
            params: {
                id: id
            }
        });
        return response;
    };


});


app.controller("MedtronicCtrl", function ($scope, CustomerService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 10;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetAllState();

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = CustomerService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.MedtronicList = "";
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
            //STARTING_DATE: $scope.STARTING_DATE,
            //ENDING_DATE: $scope.ENDING_DATE
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
        var getrecord = CustomerService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.MedtronicList = response.data;
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


    function GetAllState() {
        var getAdmin = CustomerService.GetState();
        getAdmin.then(function (response) {
            $scope.StateList = response.data;
        });
    }

    $scope.GetstateChange = function () {

        GetAllCity();
    };


    function GetAllCity() {
        var getAdmin = CustomerService.GetCity($scope.STATE_ID);
        getAdmin.then(function (response) {
            $scope.CityList = response.data;

        });
    }



    function Clear() {
        $scope.Customer_ID = "";
        $scope.CUSTOMER_NAME = "";
        $scope.FIRM_NAME = "";
        $scope.CONTACT_NO = "";
        $scope.ALTERNATE_CONTACT_NO = "";
        $scope.EMAIL = "";
        $scope.STATE_ID = "";
        $scope.ZIP_CODE = "";
        $scope.CITY_ID = "";
        $scope.ZIP_CODE = "";
        $scope.FIRM_ADDRESS = "";
        $scope.DEGREE_OF_CUSTOMER = "";

    }


  

    $scope.AdminClick = function () {
        
        $scope.Admin_Action = "Add Customer";
        Clear();
        $("#Admin_Addupdate").modal("show");

    };



    $scope.getForUpdate = function (admin) {


        $scope.Admin_Action = "Update Customer";
        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.FIRM_ADDRESS = admin.FIRM_ADDRESS;
        $scope.CONTACT_NO = parseInt(admin.CONTACT_NO);
        $scope.ALTERNATE_CONTACT_NO = parseInt(admin.ALTERNATE_CONTACT_NO);
        $scope.EMAIL = admin.EMAIL;
        $scope.STATE_ID = admin.STATE_ID;
        $scope.CITY_ID = admin.CITY_ID;
        $scope.ZIP_CODE = parseInt(admin.ZIP_CODE);
        $scope.BRANCH_NAME = admin.BRANCH_NAME;
        $scope.DEGREE_OF_CUSTOMER = admin.DEGREE_OF_CUSTOMER;
        $scope.PAN_NO = admin.PAN_NO;
        $scope.PNDT_NO = admin.PNDT_NO;
        $scope.PNDT_VALIDITY = admin.PNDT_VALIDITY;
        $scope.GST_NO = parseInt(admin.GST_NO);
        $scope.TIN_NO = parseInt(admin.TIN_NO);


            setTimeout(function myfunction() {
                var blankSelectOptions = $('option[value$="?"]');
                if (blankSelectOptions.length > 0) {
                    $(blankSelectOptions).remove();
                }
                $("#STATE_ID").val($scope.STATE_ID);
                $("#CITY_ID").val($scope.CITY_ID);
            }, 900);
            //GetAllState();
            GetAllCity();


        $("#Admin_Addupdate").modal("show");
        AddAdmin(tb_Admin);

    };

    $scope.AddAdmin = function () {

       // $scope.PNDT_VALIDITY = $("#STARTING_DATE1").val();
        tb_Admin = {
            Customer_ID: $scope.Customer_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            FIRM_ADDRESS: $scope.FIRM_ADDRESS,
            CONTACT_NO: $scope.CONTACT_NO,
            ALTERNATE_CONTACT_NO: $scope.ALTERNATE_CONTACT_NO,
            EMAIL: $scope.EMAIL,
            STATE_ID: $scope.STATE_ID,
            CITY_ID: $scope.CITY_ID,
            ZIP_CODE: $scope.ZIP_CODE,
            BRANCH_NAME: $scope.BRANCH_NAME,
            DEGREE_OF_CUSTOMER: $scope.DEGREE_OF_CUSTOMER,
            PAN_NO: $scope.PAN_NO,
            PNDT_NO: $scope.PNDT_NO,
            PNDT_NO: $scope.PNDT_NO,
            PNDT_VALIDITY: $scope.PNDT_VALIDITY,
            GST_NO: $scope.GST_NO,
            TIN_NO: $scope.TIN_NO,

        };
        if ($scope.Admin_Action === "Add Customer") {
            
            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Customer") {

            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = CustomerService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Customer added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Customer already added.");
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
        var datalist = CustomerService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Customer updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Customer already added.");
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






    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

});