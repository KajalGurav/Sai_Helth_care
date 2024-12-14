app.service("VendorService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetCompany = function () {
        return $http.get("/Vendor_Registration/GetCompany");
    };

    this.GetState = function () {
        return $http.get("/Vendor_Registration/GetState");
    };


    this.GetCity = function (id) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/GetCity",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Vendor_Registration/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };
});


app.controller("VendorRegistrationCtrl", function ($scope, VendorService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    $scope.CITY_ID = null;
    GetTotalcount();
    GetCompany();
    GetState();



    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = VendorService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.VendorList = "";
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
            STATE_ID: $scope.STATE_SEARCH

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
        var getrecord = VendorService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.VendorList = response.data;

            $("#loader").css("display", 'none');
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


    function GetCompany() {
        var getdatereport1 = VendorService.GetCompany();
        getdatereport1.then(function (response) {
            $scope.CompanyList = response.data;
            RemoveBlankOption();
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    function RemoveBlankOption() {
        setTimeout(function () {
            var blankSelectOptions = $('option[value$="?"]'); //Remove first blank option from select list
            //alert(blankSelectOptions.length);
            if (blankSelectOptions.length > 0) {
                $(blankSelectOptions).remove(); //no need to loop, using remove() it will remove all blank options Existed on the document
            }

        }, 1000);
    }

    function GetState() {
        var getdatereport1 = VendorService.GetState();
        getdatereport1.then(function (response) {
            $scope.StateList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    $scope.GetstateChange = function () {

        GetAllCity();
    };

    function GetAllCity() {
        var getAdmin = VendorService.GetCity($scope.STATE_ID);
        getAdmin.then(function (response) {
            $scope.CityList = response.data;
            RemoveBlankOption();
        });
    }




    function Clear() {
        $scope.V_ID = "";
        $scope.COMPANY_ID = "";
        $scope.VENDOR_NAME = "";
        $scope.VENDOR_COMPANY = "";
        $scope.CONTACT_NO = "";
        $scope.ALTERNATE_CONTACT_NO = "";
        $scope.EMAIL = "";
        $scope.ALTERNATE_EMAIL = "";
        $scope.ADDRESS = "";
        $scope.STATE_ID = "";
        $scope.CITY_ID = "";
        $scope.ZIP_CODE = "";
        $scope.PAN_CARD_NO = "";
        $scope.GST_NO = "";
        $scope.TIN_NO = "";

    }


    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Vendor";
        Clear();
     
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };




    $scope.getForUpdate = function (admin) {
       
        $scope.Admin_Action = "Update Vendor";
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");

        $scope.V_ID = admin.V_ID;
        $scope.COMPANY_ID = admin.COMPANY_ID;
        $scope.VENDOR_NAME = admin.VENDOR_NAME;
        $scope.VENDOR_COMPANY = admin.VENDOR_COMPANY;
        $scope.CONTACT_NO = parseInt(admin.CONTACT_NO);
        $scope.ALTERNATE_CONTACT_NO = parseInt(admin.ALTERNATE_CONTACT_NO);
        $scope.EMAIL = admin.EMAIL;
        $scope.ALTERNATE_EMAIL = admin.ALTERNATE_EMAIL;
        $scope.ADDRESS = admin.ADDRESS;
        $scope.STATE_ID = admin.STATE_ID;
        $scope.CITY_ID = admin.CITY_ID;
       
        $scope.ZIP_CODE = parseInt(admin.ZIP_CODE);
        $scope.PAN_CARD_NO = admin.PAN_CARD_NO;
        $scope.GST_NO = admin.GST_NO;
        $scope.GST_NO = admin.GST_NO;
        $scope.TIN_NO = admin.TIN_NO;
       
        GetCompany();
        GetAllCity();
       
        setTimeout(function myfunction() {
            var blankSelectOptions = $('option[value$="?"]');
            if (blankSelectOptions.length > 0) {
                $(blankSelectOptions).remove();
            }
            $("#1COMPANY_ID").val($scope.COMPANY_ID);
            $("#STATE_ID").val($scope.STATE_ID);
            $("#CITY_ID").val($scope.CITY_ID);
            
        }, 300);
        
        

       
    };
   
    
    $scope.AddAdmin = function () {

        tb_Admin = {
            V_ID: $scope.V_ID,
            COMPANY_ID: $scope.COMPANY_ID,
            VENDOR_NAME: $scope.VENDOR_NAME,
            VENDOR_COMPANY: $scope.VENDOR_COMPANY,
            CONTACT_NO: $scope.CONTACT_NO,
            ALTERNATE_CONTACT_NO: $scope.ALTERNATE_CONTACT_NO,
            EMAIL: $scope.EMAIL,
            ALTERNATE_EMAIL: $scope.ALTERNATE_EMAIL,
            ADDRESS: $scope.ADDRESS,
            STATE_ID: $scope.STATE_ID,
            CITY_ID: $scope.CITY_ID,
            ZIP_CODE: $scope.ZIP_CODE,
            PAN_CARD_NO: $scope.PAN_CARD_NO,
            GST_NO: $scope.GST_NO,
            TIN_NO: $scope.TIN_NO,

        };
        if ($scope.Admin_Action === "Add Vendor") {

            AddAdminRecord(tb_Admin);
        }

        else if ($scope.Admin_Action === "Update Vendor") {

            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = VendorService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Vendor added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Vendor already added.");
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
        var datalist = VendorService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                GetRecordbyPaging();
                alert("Vendor updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Vendor already added.");
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

    $scope.getAdmin = function (admin) {

        var getStatus = VendorService.ChangeStatus(admin.V_ID);
        getStatus.then(function (response) {
            GetRecordbyPaging();
        }, function () {

        });
    };

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});