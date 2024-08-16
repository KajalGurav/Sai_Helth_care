app.service("CustomerService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/AERBCustomer/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/AERBCustomer/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetEmployee = function () {
        return $http.get("/AERBCustomer/GetEmployee");
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AERBCustomer/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/AERBCustomer/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


});



app.controller("AerbCustomerCtrl", function ($scope, CustomerService) {


    $("#loader").css("display", '');

    $scope.PageNo = 1;
    $scope.pageSize = 10;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetAllEmployee();

    function GetTotalcount() {

        var SearchingConditions = GetSearchingConditions();
        var getcount = CustomerService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.RegCustomerList = "";
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
            $scope.RegCustomerList = response.data;
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




    function GetAllEmployee() {
        var getAdmin = CustomerService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmployeeList = response.data;
        });
    }






    function Clear() {
        $scope.Customer_ID = "";
        $scope.UPLOAD_PAN_CERTIFICATE = "";
        $scope.UPLOAD_PNDT_CERTIFICATE = "";
        $scope.CUSTOMER_NAME = "";
        $scope.FIRM_NAME = "";
        $scope.FIRM_ADDRESS = "";
        $scope.CONTACT_NO = "";
        $scope.ALTERNATE_CONTACT_NO = "";
        $scope.EMAIL = "";
        $scope.ADD_EQUIPMENT = "";
        $scope.ELORA_USER_ID = "";
        $scope.UNIT = "";
        $scope.ELORA_PASSWORD = "";
        $scope.ALTERNATE_EMAIL = "";
        $scope.NO_OF_TLD = "";
        $scope.DOCUMENT_STATUS = "";
        $scope.REGISTRATION_STATUS = "";
        $scope.REPORT_STATUS = "";
        $scope.TOTAL_AMOUNT = "";
        $scope.BALANCE_PAYMENT = "";
        $scope.CHEQUE_NO = "";
        $scope.QA_DONE_BY = "";
        $scope.QA_DONE_ON_DATE = "";
        $scope.QA_SALE_PERSON = "";
        $scope.QA_DUE_DATE = "";
        $scope.QA_PERSON_COMMISSON = "";
        $scope.UPLOD_DOCUMETN = "";
        $scope.COMMENT = "";

        $scope.ZIP_CODE = "";
      
        $('#Profile_photo').val = "";
        $('#Profile').val = "";

    }

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Customer";
        $("#Admin_Addupdate").modal("show");
        Clear();

        document.getElementById('divProfile').style.display = "none";
    };


    $scope.getForUpdate = function (admin) {
       // alert(admin.ZIP_CODE);
        $scope.Admin_Action = "Update Customer";
        $("#Admin_Addupdate").modal("show");

        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.FIRM_ADDRESS = admin.FIRM_ADDRESS;
        $scope.ZIP_CODE = parseInt(admin.ZIP_CODE);
        $scope.CONTACT_NO = parseInt(admin.CONTACT_NO);
        $scope.ALTERNATE_CONTACT_NO = parseInt(admin.ALTERNATE_CONTACT_NO);
        $scope.EMAIL = admin.EMAIL;
        $scope.ADD_EQUIPMENT = admin.ADD_EQUIPMENT;
        $scope.ELORA_USER_ID = admin.ELORA_USER_ID;
        $scope.UNIT = admin.UNIT;
        $scope.ELORA_PASSWORD = admin.ELORA_PASSWORD;
        $scope.ALTERNATE_EMAIL = admin.ALTERNATE_EMAIL;
        $scope.NO_OF_TLD = admin.NO_OF_TLD;
        $scope.DOCUMENT_STATUS = admin.DOCUMENT_STATUS;
        $scope.REGISTRATION_STATUS = admin.REGISTRATION_STATUS;
        $scope.REPORT_STATUS = admin.REPORT_STATUS;
        $scope.TOTAL_AMOUNT = admin.TOTAL_AMOUNT;
        $scope.BALANCE_PAYMENT = admin.BALANCE_PAYMENT;
        $scope.CHEQUE_NO = admin.CHEQUE_NO;
        $scope.QA_DONE_BY = admin.QA_DONE_BY;
        $scope.QA_DONE_ON_DATE = admin.QA_DONE_ON_DATE;
        $scope.QA_SALE_PERSON = admin.QA_SALE_PERSON;
        $scope.QA_DUE_DATE = admin.QA_DUE_DATE;
        $scope.QA_PERSON_COMMISSON = admin.QA_PERSON_COMMISSON;
        $scope.COMMENT = admin.COMMENT;
       
    };



    $scope.AddAdmin = function () {
      
        $("#loader").css("display", '');

        tb_Admin = {
            Customer_ID: $scope.Customer_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            FIRM_ADDRESS: $scope.FIRM_ADDRESS,
            ZIP_CODE: $scope.ZIP_CODE,
            CONTACT_NO: $scope.CONTACT_NO,
            ALTERNATE_CONTACT_NO: $scope.ALTERNATE_CONTACT_NO,
            EMAIL: $scope.EMAIL,
            ADD_EQUIPMENT: $scope.ADD_EQUIPMENT,
            ELORA_USER_ID: $scope.ELORA_USER_ID,
            UNIT: $scope.UNIT,
            ELORA_PASSWORD: $scope.ELORA_PASSWORD,
            ALTERNATE_EMAIL: $scope.ALTERNATE_EMAIL,
            NO_OF_TLD: $scope.NO_OF_TLD,
            DOCUMENT_STATUS: $scope.DOCUMENT_STATUS,
            REGISTRATION_STATUS: $scope.REGISTRATION_STATUS,
            REPORT_STATUS: $scope.REPORT_STATUS,
            TOTAL_AMOUNT: $scope.TOTAL_AMOUNT,
            BALANCE_PAYMENT: $scope.BALANCE_PAYMENT,
            CHEQUE_NO: $scope.CHEQUE_NO,
            QA_DONE_BY: $scope.QA_DONE_BY,
            QA_DONE_ON_DATE: $scope.QA_DONE_ON_DATE,
            QA_SALE_PERSON: $scope.QA_SALE_PERSON,
            QA_DUE_DATE: $scope.QA_DUE_DATE,
            QA_PERSON_COMMISSON: $scope.QA_PERSON_COMMISSON,
            UPLOD_DOCUMETN: $scope.UPLOD_DOCUMETN,
            COMMENT: $scope.COMMENT,


        };
        if ($scope.Admin_Action === "Add Customer") {
            //alert($scope.Admin_Action);
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            tb_Admin.UPLOD_DOCUMETN = tb_Admin.IsImageChoosen;
            // alert(tb_Admin.CAT_IMAGE);
            //if (tb_Admin.UPLOD_DOCUMETN === null || tb_Admin.UPLOD_DOCUMETN === "No" || tb_Admin.UPLOD_DOCUMETN === "undefined") {
            //    alert("Banner image is required.")

            //    $("#loader").css("display", 'none');

            //}
            //else {
            //    AddAdminRecord(tb_Admin);
            //}
            AddAdminRecord(tb_Admin);
            
        }
        else if ($scope.Admin_Action === "Update Customer") {
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.UPLOD_DOCUMETN = "Yes";
            }
            else {
                tb_Admin.UPLOD_DOCUMETN = $scope.UPLOD_DOCUMETN;
            }
            EditAdminRecord(tb_Admin);
        }
    };



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

                alert("Error.");
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



    var Profile_photo = $('#Profile_photo');
    var reader = new FileReader();
    var fileName;
    var contentType;



    Profile_photo.change(function () {
        //alert("Image Changed");
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




    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});