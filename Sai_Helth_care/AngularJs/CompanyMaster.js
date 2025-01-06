app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };



    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };
});

app.controller("CompanyMasterCtrl", function ($scope, AdminService) {

    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    // GetState();

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = AdminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.AdminList = "";

                //alert(JSON.stringify($scope.AdminList));
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }

    function GetState() {
        var getdatereport1 = AdminService.GetState();
        getdatereport1.then(function (response) {
            $scope.StateList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    $scope.GetCity = function () {
        GetAllCity();
    }

    function GetAllCity() {
        var getAdmin = AdminService.GetAllCity($scope.STATE_ID);
        getAdmin.then(function (response) {
            $scope.CityList = response.data;
            setTimeout(function myfunction() {
                var blankSelectOptions = $('option[value$="?"]');
                if (blankSelectOptions.length > 0) {
                    $(blankSelectOptions).remove();
                }
                $("#CITY_ID").val($scope.CITY_ID);
            }, 500);
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
            ROLE_ID: "Admin",
            ROLE_ID1: "Subadmin"
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
            $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
            $scope.pager.pages.length = totalPages;
            $scope.pager.currentPage = totalPages;
            $scope.page = totalPages - 1;
            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;
        GetRecordbyPaging();
    }

    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = AdminService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.AdminList = response.data;

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

    function Clear() {
        $scope.COMPANY_NAME = "";
        $scope.AUTHORITY_NAME = "";
        $scope.MOBILE_NO = "";
        $scope.ALT_MOBILE_NO = "";
        $scope.EMAIL_ID = "";
        $scope.COMPANY_REG_ADDRESS = "";
        $scope.COMPANY_COR_ADDRESS = "";
        $scope.ZIP_CODE = "";
        $scope.COMPANY_TYPE = "";
        $scope.PAN_NO = "";
        $scope.PNDT_NO = "";
        $scope.GST_NO = "";
        $scope.TIN_NO = "";
        $scope.COMPANY_PREFIX = "";

        $('#COMPANY_LETTERHEAD').val("");
        $('#COMPANY_SEAL').val("");
        $('#COMPANY_PNDT_CERTIFICATE').val("");

        $('#COMPANY_LETTERHEAD_PREVIEW').attr('src', "");
        $('#COMPANY_SEAL_PREVIEW').attr('src', "");
        $('#COMPANY_PNDT_CERTIFICATE_PREVIEW').attr('src', "");

        $scope.AddPayment.$setPristine(); // Set form to pristine state
        $scope.AddPayment.$setUntouched();
    }


    //$scope.getAdmin = function (admin) {
    //    var getAdmin = AdminService.GetadminById(admin.EMP_ID);
    //    getAdmin.then(function (response) {
    //        $scope._Party = response.data;
    //        $scope.EMP_ID = $scope._Party.EMP_ID;
    //    });
    //};

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Company";
        Clear();
        //$("#Admin_Addupdate").modal("show"); 
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");

    };

    $scope.getForUpdate = function (Admin) {
        Clear();



        $scope.COMPANY_ID = Admin.COMPANY_ID;
        $scope.COMPANY_NAME = Admin.COMPANY_NAME;
        $scope.AUTHORITY_NAME = Admin.AUTHORITY_NAME;
        $scope.MOBILE_NO = parseInt(Admin.MOBILE_NO);
        $scope.ALT_MOBILE_NO = parseInt(Admin.ALT_MOBILE_NO);
        $scope.EMAIL_ID = Admin.EMAIL_ID;
        $scope.COMPANY_REG_ADDRESS = Admin.COMPANY_REG_ADDRESS;
        $scope.COMPANY_COR_ADDRESS = Admin.COMPANY_COR_ADDRESS;
        $scope.ZIP_CODE = parseInt(Admin.ZIP_CODE);
        $scope.COMPANY_TYPE = Admin.COMPANY_TYPE;
        $scope.PAN_NO = Admin.PAN_NO;
        $scope.PNDT_NO = Admin.PNDT_NO;
        $scope.GST_NO = Admin.GST_NO;
        $scope.TIN_NO = Admin.TIN_NO;
        $scope.COMPANY_PREFIX = Admin.COMPANY_PREFIX;

        //$("#COMPANY_LETTERHEAD").val("");
        //$("#COMPANY_SEAL").val("");
        $('#COMPANY_LETTERHEAD_PREVIEW').attr('src', "");
        $('#COMPANY_SEAL_PREVIEW').attr('src', "");
        $('#COMPANY_PNDT_CERTIFICATE_PREVIEW').attr('src', "");

        $scope.COMPANY_LETTERHEAD = Admin.COMPANY_LETTERHEAD;
        $scope.COMPANY_SEAL = Admin.COMPANY_SEAL;
        $scope.COMPANY_PNDT_CERTIFICATE = Admin.COMPANY_PNDT_CERTIFICATE;

        setTimeout(function () {
            $('#COMPANY_LETTERHEAD_PREVIEW').attr('src', $scope.COMPANY_LETTERHEAD);
            $('#COMPANY_SEAL_PREVIEW').attr('src', $scope.COMPANY_SEAL);
            $('#COMPANY_PNDT_CERTIFICATE_PREVIEW').attr('src', $scope.COMPANY_PNDT_CERTIFICATE);
        }, 1000)

        $scope.Admin_Action = "Update Company";
        //$("#Admin_Addupdate").modal("show");  
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };


    $scope.AddAdmin = function () {
        $("#loader").css("display", '');
        tb_Admin = {

            COMPANY_ID: $scope.COMPANY_ID,
            COMPANY_NAME: $scope.COMPANY_NAME,
            AUTHORITY_NAME: $scope.AUTHORITY_NAME,
            MOBILE_NO: $scope.MOBILE_NO,
            ALT_MOBILE_NO: $scope.ALT_MOBILE_NO,
            EMAIL_ID: $scope.EMAIL_ID,
            COMPANY_REG_ADDRESS: $scope.COMPANY_REG_ADDRESS,
            COMPANY_COR_ADDRESS: $scope.COMPANY_COR_ADDRESS,
            ZIP_CODE: $scope.ZIP_CODE,
            COMPANY_TYPE: $scope.COMPANY_TYPE,
            PAN_NO: $scope.PAN_NO,
            PNDT_NO: $scope.PNDT_NO,
            GST_NO: $scope.GST_NO,
            TIN_NO: $scope.TIN_NO,
            COMPANY_PREFIX: $scope.COMPANY_PREFIX,

        };
        if ($scope.Admin_Action === "Add Company") {

            tb_Admin = getImageData(COMPANY_LETTERHEAD, tb_Admin, 'Header');
            tb_Admin.COMPANY_LETTERHEAD = tb_Admin.IsImageChoosen;

            if (tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") {
                alert("Aadhar card document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Large Size") {
                alert("Please Upload Aadharcard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            tb_Admin = getImageData(COMPANY_SEAL, tb_Admin, 'Stamp');
            tb_Admin.COMPANY_SEAL = tb_Admin.IsImageChoosenStamp;


            if (tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") {
                alert("PAN document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Large Size") {
                alert("Please Upload Pancard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }


            tb_Admin = getImageData(COMPANY_PNDT_CERTIFICATE, tb_Admin, 'PNDT');
            tb_Admin.COMPANY_PNDT_CERTIFICATE = tb_Admin.IsImageChoosenPNDT;


            //if (tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") {
            //    alert("Company PNDT certificate is required.")

            //    $("#loader").css("display", 'none');
            //    return;
            //}
            //else
            if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Large Size") {
                alert("Please Upload Company PNDT certificate Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Company") {

            tb_Admin = getImageData(COMPANY_LETTERHEAD, tb_Admin, 'Header');
            tb_Admin.COMPANY_LETTERHEAD = tb_Admin.IsImageChoosen;

            if (($scope.COMPANY_LETTERHEAD !== null || $scope.COMPANY_LETTERHEAD !== "No" || $scope.COMPANY_LETTERHEAD !== "undefined") && (tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined")) {
                tb_Admin.COMPANY_LETTERHEAD = $scope.COMPANY_LETTERHEAD;
            }
            else if (($scope.COMPANY_LETTERHEAD === null || $scope.COMPANY_LETTERHEAD === "No" || $scope.COMPANY_LETTERHEAD === "undefined") && (tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined")) {
                alert("Company Letter Head is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Large Size") {
                alert("Please Upload Company Letter Head Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_LETTERHEAD === null || tb_Admin.COMPANY_LETTERHEAD === "No" || tb_Admin.COMPANY_LETTERHEAD === "undefined") && tb_Admin.Header_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }


            tb_Admin = getImageData(COMPANY_SEAL, tb_Admin, 'Stamp');
            tb_Admin.COMPANY_SEAL = tb_Admin.IsImageChoosenStamp;

            if (($scope.COMPANY_SEAL !== null || $scope.COMPANY_SEAL !== "No" || $scope.COMPANY_SEAL !== "undefined") && (tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined")) {
                tb_Admin.COMPANY_SEAL = $scope.COMPANY_SEAL;
            }
            else if (($scope.COMPANY_SEAL === null || $scope.COMPANY_SEAL === "No" || $scope.COMPANY_SEAL === "undefined") && (tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined")) {
                alert("Company Seal is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Large Size") {
                alert("Please Upload Company Seal Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_SEAL === null || tb_Admin.COMPANY_SEAL === "No" || tb_Admin.COMPANY_SEAL === "undefined") && tb_Admin.Stamp_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            tb_Admin = getImageData(COMPANY_PNDT_CERTIFICATE, tb_Admin, 'PNDT');
            tb_Admin.COMPANY_PNDT_CERTIFICATE = tb_Admin.IsImageChoosenPNDT;

            if (($scope.COMPANY_PNDT_CERTIFICATE !== null || $scope.COMPANY_PNDT_CERTIFICATE !== "No" || $scope.COMPANY_PNDT_CERTIFICATE !== "undefined") && (tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined")) {
                tb_Admin.COMPANY_PNDT_CERTIFICATE = $scope.COMPANY_PNDT_CERTIFICATE;
            }
            //else if (($scope.COMPANY_PNDT_CERTIFICATE === null || $scope.COMPANY_PNDT_CERTIFICATE === "No" || $scope.COMPANY_PNDT_CERTIFICATE === "undefined") && (tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined")) {
            //    alert("Company PNDT certificate is required.")

            //    $("#loader").css("display", 'none');
            //    return;
            //}
            else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Large Size") {
                alert("Please Upload Company PNDT certificate Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.PNDT_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            EditAdminRecord(tb_Admin);
        }
    };


    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Company added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Company already added.");
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


    function EditAdminRecord(tb_Admin) {
        var datalist = AdminService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Company updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Company already added.");
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

    $scope.ChangeStatus = function (Admin) {
        $("#loader").css("display", '');
        var getStatus = AdminService.ChangeStatus(Admin.COMPANY_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


    var COMPANY_LETTERHEAD = $('#COMPANY_LETTERHEAD');
    var COMPANY_SEAL = $('#COMPANY_SEAL');
    var COMPANY_PNDT_CERTIFICATE = $('#COMPANY_PNDT_CERTIFICATE');


    var reader = new FileReader();
    var fileName;
    var contentType;

    var Pancardreader = new FileReader();
    var PancardfileName;
    var PancardcontentType;

    var PNDTreader = new FileReader();
    var PNDTfileName;
    var PNDTcontentType;

    COMPANY_LETTERHEAD.change(function () {
        // alert("Image Changed");
        ReadUploadedFilesData($(this));
    });

    COMPANY_SEAL.change(function () {
        //alert("Image Changed");
        PancardReadUploadedFilesData($(this));

    });

    COMPANY_PNDT_CERTIFICATE.change(function () {
        //alert("Image Changed");
        PNDTReadUploadedFilesData($(this));

    });


    function ReadUploadedFilesData(fileuploader) {
        var file = $(fileuploader[0].files);
        fileName = file[0].name;
        contentType = file[0].type;
        //reader.readAsDataURL(file[0]);
        // Check if a file is selected
        if (file[0]) {
            // Create a FileReader

            // Set the callback function when the file is loaded
            reader.onload = function (readerEvent) {
                // Set the preview image source
                $('#COMPANY_LETTERHEAD_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

        reader.readAsDataURL(file[0]);
    }

    function PancardReadUploadedFilesData(fileuploader) {
        var Pancardfile = $(fileuploader[0].files);
        PancardfileName = Pancardfile[0].name;
        PancardcontentType = Pancardfile[0].type;

        if (Pancardfile[0]) {
            // Create a FileReader
            // Set the callback function when the file is loaded
            Pancardreader.onload = function (readerEvent) {
                // Set the preview image source
                $('#COMPANY_SEAL_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }
        Pancardreader.readAsDataURL(Pancardfile[0]);
    }


    function PNDTReadUploadedFilesData(fileuploader) {
        var PNDTfile = $(fileuploader[0].files);
        PNDTfileName = PNDTfile[0].name;
        PNDTcontentType = PNDTfile[0].type;

        if (PNDTfile[0]) {
            // Create a FileReader
            // Set the callback function when the file is loaded
            PNDTreader.onload = function (readerEvent) {
                // Set the preview image source
                $('#COMPANY_PNDT_CERTIFICATE_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

        PNDTreader.readAsDataURL(PNDTfile[0]);
    }


    function validateFileReader(fileuploader) {
        if (typeof (FileReader) !== "undefined") {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp |.pdf)$/;

            if (fileuploader.val() === '') {
                return "Please Choose Image First";
            }
            else {
                var file = $(fileuploader[0].files);
                if (regex.test(file[0].name.toLowerCase())) {

                    var imageSize = Math.round(file[0].size / 1024);
                    //Check Image Size
                    if (imageSize < 2048) {
                        return "SaveImage";
                    }
                    else {
                        return 'Large Size';
                        //return 'Please Select Image Less Than 5 MB Size';
                    }

                } else {
                    return "Sorry... Invalid File";
                }
            }

        } else {
            return "Please Use Another Browser, This Browser is Not Supporting Image Uploader.";
        }
    }






    function getImageData(chooseimageFileUploader, tb_object, Document_Type) {


        if (Document_Type === "Header") {
            var result = validateFileReader(chooseimageFileUploader);
            // alert(result);
            var IsImageChoosen = "No";
            if (result === "SaveImage") {
                IsImageChoosen = "Yes";
                // alert('Adharcard');
                var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
                var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
                var imageBase64Data = reader.result;
                imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
            }
            else {
                result === "Large Size";
            }
            tb_object.IsImageChoosen = IsImageChoosen;
            tb_object.ImageName = imageName;
            tb_object.ImageExtension = imageExtension;
            tb_object.ImageBase64Data = imageBase64Data;
            tb_object.Header_Size = result;
            return tb_object;

        }
        else if (Document_Type === "Stamp") {
            var result = validateFileReader(chooseimageFileUploader);
            var IsImageChoosenStamp = "No";
            //alert(result);
            if (result === "SaveImage") {
                IsImageChoosenStamp = "Yes";
                //alert('Pancard');
                var imageName = PancardfileName.substring(0, PancardfileName.lastIndexOf('.'));
                var imageExtension = '.' + PancardfileName.substring(PancardfileName.lastIndexOf('.') + 1);
                var imageBase64Data = Pancardreader.result;
                imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
            }
            else {
                result === "Large Size";
            }
            // alert(IsImageChoosenBankPassbook);
            tb_object.IsImageChoosenStamp = IsImageChoosenStamp;
            tb_object.ImageName1 = imageName;
            tb_object.ImageExtension1 = imageExtension;
            tb_object.ImageBase64Data1 = imageBase64Data;
            tb_object.Stamp_Size = result;
            return tb_object;
        }
        else if (Document_Type === "PNDT") {
            var result = validateFileReader(chooseimageFileUploader);
            var IsImageChoosenPNDT = "No";
            //alert(result);
            if (result === "SaveImage") {
                IsImageChoosenPNDT = "Yes";
                var imageName = PNDTfileName.substring(0, PNDTfileName.lastIndexOf('.'));
                var imageExtension = '.' + PNDTfileName.substring(PNDTfileName.lastIndexOf('.') + 1);
                var imageBase64Data = PNDTreader.result;
                imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
            }
            else {
                result === "Large Size";
            }
            // alert(IsImageChoosenBankPassbook);
            tb_object.IsImageChoosenPNDT = IsImageChoosenPNDT;
            tb_object.ImageName2 = imageName;
            tb_object.ImageExtension2 = imageExtension;
            tb_object.ImageBase64Data2 = imageBase64Data;
            tb_object.PNDT_Size = result;
            return tb_object;
        }
    }


});