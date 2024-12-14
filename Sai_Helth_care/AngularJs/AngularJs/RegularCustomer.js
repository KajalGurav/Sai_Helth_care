app.service("CustomerService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GetAllCustomers",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetState = function () {
        return $http.get("/Customer_Master/GetState");
    };


    this.GetCity = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GetCity",
            params: {
                id: id
            }
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

});


app.controller("RegularCustomerCtrl", function ($scope, CustomerService) {


    $("#loader").css("display", '');

    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();

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
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    //$scope.CUSTOMER_TYPE_ID = 1;
    $scope.CUSTOMER_NAME = null;
    $scope.FIRM_NAME = null;
    GetTotalcount();
    GetAllState();

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

        if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === null) {
            $scope.CUSTOMER_NAME = null;
        }
        //if ($scope.STATE_SEARCH === undefined || $scope.STATE_SEARCH === "" || $scope.STATE_SEARCH === "0") {
        //    $scope.STATE_SEARCH = null;
        //}


        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
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


    function GetAllState() {
        var getAdmin = CustomerService.GetState();
        getAdmin.then(function (response) {
            $scope.StateList = response.data;
        });
    }

    $scope.GetstateChange = function (id) {
        GetAllCity(id);
    };


    function GetAllCity(id) {

        if (id === 'SHIP_STATE_ID') {
            var getAdminShip = CustomerService.GetCity($scope.SHIP_STATE_ID);
            getAdminShip.then(function (response) {
                $scope.ShipCityList = response.data;
            });
        }
        else if (id === 'STATE_ID') {
            var getAdmin = CustomerService.GetCity($scope.STATE_ID);
            getAdmin.then(function (response) {
                $scope.CityList = response.data;

            });
        }

    }


    function Clear() {
        $scope.Customer_ID = "";
        $scope.UPLOAD_PAN_CERTIFICATE = "";
        $scope.UPLOAD_PNDT_CERTIFICATE = "";
        $scope.CUSTOMER_NAME = "";
        $scope.FIRM_NAME = "";
        $scope.CONTACT_NO = "";
        $scope.ALTERNATE_CONTACT_NO = "";
        $scope.EMAIL = "";
        $scope.ALTERNATE_EMAIL = "";
        $scope.BILLING_ADDRESS = "";
        $scope.SHIPPING_ADDRESS = "";
        $scope.ZIP_CODE = "";
        $scope.STATE_ID = "";
        $scope.CITY_ID = "";
        $scope.SHIP_STATE_ID = "";
        $scope.SHIP_CITY_ID = "";
        $scope.PAN_NO = "";
        $scope.GST_NO = "";
        $scope.TIN_NO = "";
        $scope.PNDT_NO = "";
        $scope.PNDT_VALIDITY = "";
        $scope.FIRM_ADDRESS = "";
        $scope.DEGREE_OF_CUSTOMER = "";
        $scope.SHIPPING_ZIP_CODE = "";



        $('#Profile_photo').val = "";
        $('#Profile').val = "";

    }



    $scope.AdminClick = function () {

        $scope.Admin_Action = "Add Customer";
        Clear();
        $("#Admin_Addupdate").modal("show");
        document.getElementById('divProfile').style.display = "none";
        document.getElementById('Profile1').style.display = "none";
        //document.getElementById('Profile2').style.display = "none";
    };


    $scope.getForUpdate = function (admin) {

        $scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        $scope.Admin_Action = "Update Customer";
        $("#Admin_Addupdate").modal("show");
        //  alert(admin.STATE_ID);
        // $scope._Party = response.data;


        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.CONTACT_NO = parseInt(admin.CONTACT_NO);
        $scope.ALTERNATE_CONTACT_NO = admin.ALTERNATE_CONTACT_NO;
        $scope.EMAIL = admin.EMAIL;
        $scope.ALTERNATE_EMAIL = admin.ALTERNATE_EMAIL;
        $scope.BILLING_ADDRESS = admin.BILLING_ADDRESS;
        $scope.SHIPPING_ADDRESS = admin.SHIPPING_ADDRESS;
        $scope.ZIP_CODE = parseInt(admin.ZIP_CODE);
        $scope.STATE_ID = parseInt(admin.STATE_ID);
        $scope.CITY_ID = parseInt(admin.CITY_ID);
        $scope.SHIP_STATE_ID = parseInt(admin.SHIP_STATE_ID);
        $scope.SHIP_CITY_ID = parseInt(admin.SHIP_CITY_ID);
        $scope.PAN_NO = admin.PAN_NO;
        $scope.GST_NO = admin.GST_NO;
        $scope.TIN_NO = admin.TIN_NO;
        $scope.PNDT_NO = admin.PNDT_NO;
        $scope.PNDT_VALIDITY = admin.PNDT_VALIDITY;
        //$scope.FIRM_ADDRESS = admin.FIRM_ADDRESS;
        $scope.FIRM_ADDRESS = admin.BILLING_ADDRESS;
        $scope.DEGREE_OF_CUSTOMER = admin.DEGREE_OF_CUSTOMER;
        $scope.UPLOAD_PNDT_CERTIFICATE = admin.UPLOAD_PNDT_CERTIFICATE;
        $scope.UPLOAD_PAN_CERTIFICATE = admin.UPLOAD_PAN_CERTIFICATE;
        $scope.SHIPPING_ZIP_CODE = parseInt(admin.SHIPPING_ZIP_CODE);

        //setTimeout(function myfunction() {
        //    var blankSelectOptions = $('option[value$="?"]');
        //    if (blankSelectOptions.length > 0) {
        //        $(blankSelectOptions).remove();
        //    }
        //    $("#STATE_ID").val($scope.STATE_ID);
        //    $("#CITY_ID").val($scope.CITY_ID);
        //    $("#SHIP_STATE_ID").val($scope.SHIP_STATE_ID);
        //    $("#SHIP_CITY_ID").val($scope.SHIP_CITY_ID);
        //}, 900);
        //GetAllState();
        GetAllCity('STATE_ID');
        GetAllCity('SHIP_STATE_ID');


    };



    $scope.AddAdmin = function () {

        $("#loader").css("display", '');
        $scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        console.log($("#PNDT_VALIDITY").val().length);
        //if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === "@." || $scope.CUSTOMER_NAME === null) {
        //    alert("Please Spcial Char Not Allowed ");
        //    return false;
        //}
        //return false;
        tb_Admin = {
            Customer_ID: $scope.Customer_ID,
            CUSTOMER_NAME: $scope.CUSTOMER_NAME,
            FIRM_NAME: $scope.FIRM_NAME,
            CONTACT_NO: $scope.CONTACT_NO,
            ALTERNATE_CONTACT_NO: $scope.ALTERNATE_CONTACT_NO,
            EMAIL: $scope.EMAIL,
            ALTERNATE_EMAIL: $scope.ALTERNATE_EMAIL,
            BILLING_ADDRESS: $scope.BILLING_ADDRESS,
            SHIPPING_ADDRESS: $scope.SHIPPING_ADDRESS,
            ZIP_CODE: $scope.ZIP_CODE,
            STATE_ID: $scope.STATE_ID,
            CITY_ID: $scope.CITY_ID,
            SHIP_STATE_ID: $scope.SHIP_STATE_ID,
            SHIP_CITY_ID: $scope.SHIP_CITY_ID,
            PAN_NO: $scope.PAN_NO,
            GST_NO: $scope.GST_NO,
            TIN_NO: $scope.TIN_NO,
            PNDT_NO: $scope.PNDT_NO,
            PNDT_VALIDITY: $scope.PNDT_VALIDITY,
            //FIRM_ADDRESS: $scope.FIRM_ADDRESS,
            FIRM_ADDRESS: $scope.BILLING_ADDRESS,
            DEGREE_OF_CUSTOMER: $scope.DEGREE_OF_CUSTOMER,
            SHIPPING_ZIP_CODE: $scope.SHIPPING_ZIP_CODE,

        };

        //return false;
        if ($scope.Admin_Action === "Add Customer") {
            tb_Admin = getImageData(UPLOAD_PNDT_CERTIFICATE, tb_Admin, 'Adharcard');
            tb_Admin.UPLOAD_PNDT_CERTIFICATE = tb_Admin.IsImageChoosen;

            //tb_Admin = getImageData(UPLOAD_PNDT_CERTIFICATE, tb_Admin);

            //tb_Admin.UPLOAD_PNDT_CERTIFICATE = tb_Admin.IsImageChoosen;

            tb_Admin = getImageData(UPLOAD_PAN_CERTIFICATE, tb_Admin, 'Driving');
            tb_Admin.UPLOAD_PAN_CERTIFICATE = tb_Admin.IsImageChoosendriving;



            //tb_Admin = getImageData(OTHER_IMG, tb_Admin, 'Pancard');
            //tb_Admin.OTHER_IMG = tb_Admin.IsImageChoosenPancard;


            //if (tb_Admin.UPLOAD_PAN_CERTIFICATE === null || tb_Admin.UPLOAD_PAN_CERTIFICATE === "No" || tb_Admin.UPLOAD_PAN_CERTIFICATE === "undefined") {
            //    alert("PAN Cirtificate is required.")

            //    $("#loader").css("display", 'none');

            //}
            //else if (tb_Admin.UPLOAD_PNDT_CERTIFICATE === null || tb_Admin.UPLOAD_PNDT_CERTIFICATE === "No" || tb_Admin.UPLOAD_PNDT_CERTIFICATE === "undefined") {
            //    alert("PNDT Cirtificate is required.")

            //    $("#loader").css("display", 'none');

            //}
            //else {
            //    AddAdminRecord(tb_Admin);
            //}
            AddAdminRecord(tb_Admin);

        }
        else if ($scope.Admin_Action === "Update Customer") {

            tb_Admin = getImageData(UPLOAD_PNDT_CERTIFICATE, tb_Admin, 'Adharcard');
            tb_Admin.UPLOAD_PNDT_CERTIFICATE = tb_Admin.IsImageChoosen;
            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.UPLOAD_PNDT_CERTIFICATE = "Yes";
            }
            else if (tb_Admin.IsImageChoosen === "No" && tb_Admin.Adharcard_Size == "Large Size") {
                alert("Please Upload Disease Pre Image Less Than 2 MB Size.")
                return false;
            }

            else {
                tb_Admin.UPLOAD_PNDT_CERTIFICATE = $scope.UPLOAD_PNDT_CERTIFICATE;
            }


            tb_Admin = getImageData(UPLOAD_PAN_CERTIFICATE, tb_Admin, 'Driving');
            tb_Admin.UPLOAD_PAN_CERTIFICATE = tb_Admin.IsImageChoosendriving;

            if (tb_Admin.IsImageChoosendriving === "Yes") {
                tb_Admin.UPLOAD_PAN_CERTIFICATE = "Yes";
            }
            else if (tb_Admin.IsImageChoosendriving === "No" && tb_Admin.Driving_Size == "Large Size") {
                alert("Please Upload Disease After Image Less Than 2 MB Size.")
                return false;
            }

            else {
                tb_Admin.UPLOAD_PAN_CERTIFICATE = $scope.UPLOAD_PAN_CERTIFICATE;
            }

            //tb_Admin = getImageData(OTHER_IMG, tb_Admin, 'Pancard');
            //tb_Admin.OTHER_IMG = tb_Admin.IsImageChoosenPancard;

            //if (tb_Admin.IsImageChoosenPancard === "Yes") {
            //    tb_Admin.OTHER_IMG = "Yes";
            //}
            //else if (tb_Admin.IsImageChoosenPancard === "No" && tb_Admin.Pancard_Size == "Large Size") {
            //    alert("Please Upload Disease After Image Less Than 2 MB Size.")
            //    return false;
            //}

            //else {
            //    tb_Admin.OTHER_IMG = $scope.OTHER_IMG;
            //}

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





    var UPLOAD_PNDT_CERTIFICATE = $('#UPLOAD_PNDT_CERTIFICATE');
    var UPLOAD_PAN_CERTIFICATE = $('#UPLOAD_PAN_CERTIFICATE');
    // var OTHER_IMG = $('#OTHER_IMG');



    ///adhar
    var reader = new FileReader();
    var fileName;
    var contentType;

    ///driving
    var Drivingreader = new FileReader();
    var DrivingfileName;
    var DrivingcontentType;





    UPLOAD_PNDT_CERTIFICATE.change(function () {
        // alert("Image Changed");
        ReadUploadedFilesData($(this));
    });

    UPLOAD_PAN_CERTIFICATE.change(function () {
        //alert("Image Changed");
        DrivingReadUploadedFilesData($(this));
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
                $('#UPLOAD_PNDT_CERTIFICATE_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

        reader.readAsDataURL(file[0]);
    }

    function DrivingReadUploadedFilesData(fileuploader) {
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
                $('#UPLOAD_PAN_CERTIFICATE_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

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


        if (Document_Type === "Adharcard") {
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
            tb_object.Adharcard_Size = result;
            return tb_object;

        }
        else if (Document_Type === "Driving") {
            var result = validateFileReader(chooseimageFileUploader);
            var IsImageChoosendriving = "No";
            //alert(result);
            if (result === "SaveImage") {
                IsImageChoosendriving = "Yes";
                // alert('Driving');
                var imageName = DrivingfileName.substring(0, DrivingfileName.lastIndexOf('.'));
                var imageExtension = '.' + DrivingfileName.substring(DrivingfileName.lastIndexOf('.') + 1);
                var imageBase64Data = Drivingreader.result;
                imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
            }
            else {
                result === "Large Size";
            }
            // alert(IsImageChoosendriving);
            tb_object.IsImageChoosendriving = IsImageChoosendriving;
            tb_object.ImageName1 = imageName;
            tb_object.ImageExtension1 = imageExtension;
            tb_object.ImageBase64Data1 = imageBase64Data;
            tb_object.Driving_Size = result;
            return tb_object;
        }
    }

    $scope.getAdmin = function (admin) {

        var getStatus = CustomerService.ChangeStatus(admin.Customer_ID);
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