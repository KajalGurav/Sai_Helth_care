app.service("SalesLeadService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Sales_Lead/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Sales_Lead/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetalleEmoloyee = function () {
        return $http.get("/Sales_Lead/GetEmployee");
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Sales_Lead/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Sales_Lead/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.SalesLeadExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Sales_Lead/SalesLeadExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
});



app.controller("SalesLeadCtrl", function ($scope, SalesLeadService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetalleEmoloyee();

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = SalesLeadService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.SalesLeadList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }

    $scope.GetData = function () {
        GetTotalcount();
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
            EMP_ID: parseInt($scope.EMP_ID),
            STATE_ID: $scope.STATE_SEARCH
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
            $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
            $scope.pager.pages.length = totalPages;
            $scope.pager.currentPage = totalPages;
            $scope.page = totalPages - 1;
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
        var getrecord = SalesLeadService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.SalesLeadList = response.data;
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



    function GetalleEmoloyee() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = SalesLeadService.GetalleEmoloyee();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }



    function Clear() {
        $scope.DSR_LEAD_ID = "";
        $scope.EMP_ID = "";
        $scope.COMPANY_ID = "";
        $scope.DSR_DATE = "";
        $scope.CUSTOMER_NAME = "";
        $scope.FIRM_NAME = "";
        $scope.FIRM_ADDRESS = "";
        $scope.CITY_NAME = "";
        $scope.MOBILE_NO = "";
        $scope.MODALITY = "";
        $scope.EMAIL_ID = "";
        $scope.PROJECHTED_MODEL = "";
        $scope.CUSTOMER_REQUIREMENT = "";
        $scope.SALES_PERSON_COMMITMENTS = "";
        $scope.FORCASTED_MONTH = "";
        $scope.PRICE = "";
        $scope.BUY_PERCENT = "";
        $scope.ENQUIRY_TYPE = "";
        $scope.UPLOAD_VISITING_CARD = "";
        $('#Profile_photo').val = "";


    }






    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Leads";
        Clear();
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        document.getElementById('divProfile').style.display = "none";
    };


    $scope.getForUpdate = function (admin) {

        $scope.DSR_DATE = $("#DSR_DATE").val();

        $scope.DSR_LEAD_ID = admin.DSR_LEAD_ID;
        $scope.EMP_ID = admin.EMP_ID;
        $scope.DSR_DATE = admin.DSR_DATE;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.CITY_NAME = admin.CITY_NAME;
        $scope.FIRM_ADDRESS = admin.FIRM_ADDRESS;
        $scope.MOBILE_NO = parseInt(admin.MOBILE_NO); 
        $scope.EMAIL_ID = admin.EMAIL_ID;
        $scope.MODALITY = admin.MODALITY;
        $scope.PROJECHTED_MODEL = admin.PROJECHTED_MODEL;
        $scope.CUSTOMER_REQUIREMENT = admin.CUSTOMER_REQUIREMENT;
        $scope.SALES_PERSON_COMMITMENTS = admin.SALES_PERSON_COMMITMENTS;
        $scope.FORCASTED_MONTH = admin.FORCASTED_MONTH;
        $scope.PRICE = parseInt(admin.PRICE);
        $scope.BUY_PERCENT = parseInt(admin.BUY_PERCENT);
        $scope.ENQUIRY_TYPE = admin.ENQUIRY_TYPE;
        $scope.UPLOAD_VISITING_CARD = admin.UPLOAD_VISITING_CARD;

        setTimeout(function myfunction() {
            var blankSelectOptions = $('option[value$="?"]');
            if (blankSelectOptions.length > 0) {
                $(blankSelectOptions).remove();
            }
            $("#EMP_ID").val($scope.EMP_ID);
        }, 500);

        GetalleEmoloyee();
       

        $scope.Admin_Action = "Update Leads";
        $("#Admin_Addupdate").modal("show");
        AddAdmin(tb_Admin);

    };



    $scope.AddAdmin = function () {
        $("#loader").css("display", '');



        $scope.DSR_DATE = $("#DSR_DATE").val();

        tb_Admin = {


            DSR_LEAD_ID: $scope.DSR_LEAD_ID, //for update table
            EMP_ID: $scope.EMP_ID,
            DSR_DATE: $scope.DSR_DATE,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            CITY_NAME: $scope.CITY_NAME,
            FIRM_ADDRESS: $scope.FIRM_ADDRESS,
            MOBILE_NO: $scope.MOBILE_NO,
            EMAIL_ID: $scope.EMAIL_ID,
            MODALITY: $scope.MODALITY,
            PROJECHTED_MODEL: $scope.PROJECHTED_MODEL,
            CUSTOMER_REQUIREMENT: $scope.CUSTOMER_REQUIREMENT,
            SALES_PERSON_COMMITMENTS: $scope.SALES_PERSON_COMMITMENTS,
            FORCASTED_MONTH: $scope.FORCASTED_MONTH,
            PRICE: $scope.PRICE,
            BUY_PERCENT: $scope.BUY_PERCENT,
            ENQUIRY_TYPE: $scope.ENQUIRY_TYPE,
            UPLOAD_VISITING_CARD: $scope.UPLOAD_VISITING_CARD,

        };

        if ($scope.Admin_Action === "Add Leads") {
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            tb_Admin.UPLOAD_VISITING_CARD = tb_Admin.IsImageChoosen;
            //if (tb_Admin.UPLOAD_VISITING_CARD === null || tb_Admin.UPLOAD_VISITING_CARD === "No" || tb_Admin.UPLOAD_VISITING_CARD === "undefined") {
            //    alert("Visiting Card is required.")

            //    $("#loader").css("display", 'none');

            //}
            //else {
            //    AddAdminRecord(tb_Admin);
            //}

            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Leads") {
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.UPLOAD_VISITING_CARD = "Yes";
            }
            else {
                tb_Admin.UPLOAD_VISITING_CARD = $scope.UPLOAD_VISITING_CARD;
            }
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = SalesLeadService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Sales Leads added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Sales Leads already added.");
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
        var datalist = SalesLeadService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Sales Leads updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Sales Leads already added.");
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



    $scope.ChangeStatus = function () {
        $("#loader").css("display", '');
        var getStatus = SalesLeadService.ChangeStatus($scope.BANNER_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#Admin_View").modal("hide");
            $("#loader").css("display", 'none');
            $.notify(response.data, "error");
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });

    };



    var Profile_photo = $('#Profile_photo');
    var reader = new FileReader();
    var fileName;
    var contentType;



    Profile_photo.change(function () {
        ReadUploadedFilesData($(this));
    });



    function ReadUploadedFilesData(fileuploader) {
        var file = $(fileuploader[0].files);
        fileName = file[0].name;
        contentType = file[0].type;
        reader.readAsDataURL(file[0]);

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
                    if (imageSize < 5120) {
                        return "SaveImage";
                    }
                    else {
                        return 'Please Select Image Less Than 5 MB Size';
                    }

                } else {
                    return "Sorry... Invalid File";
                }
            }

        } else {
            return "Please Use Another Browser, This Browser is Not Supporting Image Uploader.";
        }
    }

    function getImageData(chooseimageFileUploader, tb_object) {
        var result = validateFileReader(chooseimageFileUploader);
        var IsImageChoosen = "No";
        if (result === "SaveImage") {
            IsImageChoosen = "Yes";
            // alert('success Save Image');
            var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
            var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
            var imageBase64Data = reader.result;
            imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
        }
        tb_object.IsImageChoosen = IsImageChoosen;
        tb_object.ImageName = imageName;
        tb_object.ImageExtension = imageExtension;
        tb_object.ImageBase64Data = imageBase64Data;
        return tb_object;
    }

    $scope.exportToExcel = function () {
        SalesLeadExport();
    }

    function SalesLeadExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = SalesLeadService.SalesLeadExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Sales Lead Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

});