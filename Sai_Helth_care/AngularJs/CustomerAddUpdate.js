app.service("CustomerService", function ($http) {

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

    this.GetForUpdate = function (id) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GetCustomerDetailsForUpdate",
            params: {
                customerID: id
            }
        });
        return response;
    };



});


app.controller("AddUpdateCustomerCtrl", function ($scope, CustomerService) {

    $("#loader").css("display", 'none');
    var PARAM = window.location.search.replace(/\?/, '').split('&');

    $scope.CUSTOMER_TYPE = PARAM[0].split('=').pop();
    $scope.CUSTOMER_ID = parseInt(PARAM[1].split('=').pop());
    var CUSTOMER_TYPE = $scope.CUSTOMER_TYPE;
    var CUSTOMER_ID = $scope.CUSTOMER_ID;
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

    if ($scope.CUSTOMER_ID === 0) {
        $scope.Admin_Action = "Add Customer";
        Clear();
    }
    else {
        /*$("#loader").css("display", '');*/
        $scope.Admin_Action = "Update Customer";
        var getAdmin = CustomerService.GetForUpdate($scope.CUSTOMER_ID);
        getAdmin.then(function (response) {
            $scope.CustomerDetailsList = response.data;
            //$scope.SHIP_STATE_ID = null;
            //$scope.SHIP_CITY_ID = null;
            getForUpdate($scope.CustomerDetailsList);
        });
    }


    


    GetAllState();

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
            if ($scope.SHIP_STATE_ID === "" || $scope.SHIP_STATE_ID === null || $scope.SHIP_STATE_ID === undefined) {
                $scope.ShipCityList = "";
            }
            else {
                var getAdminShip = CustomerService.GetCity($scope.SHIP_STATE_ID);
                getAdminShip.then(function (response) {
                    $scope.ShipCityList = response.data;
                });
            }
            
        }
        else if (id === 'STATE_ID') {
            if ($scope.STATE_ID === "" || $scope.STATE_ID === null || $scope.STATE_ID === undefined) {
                $scope.CityList = "";
            }
            else {
                var getAdmin = CustomerService.GetCity($scope.STATE_ID);
                getAdmin.then(function (response) {
                    $scope.CityList = response.data;

                });
            }
            
        }

    }


    function Clear() {
        $scope.Customer_ID = null;
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
        $scope.STATE_ID = null;
        $scope.CITY_ID = null;
        $scope.SHIP_STATE_ID = null;
        $scope.SHIP_CITY_ID = null;
        $scope.PAN_NO = "";
        $scope.GST_NO = "";
        $scope.TIN_NO = "";
        $scope.PNDT_NO = "";
        $scope.PNDT_VALIDITY = "";
        $scope.FIRM_ADDRESS = "";
        $scope.DEGREE_OF_CUSTOMER = "";
        $scope.SHIPPING_ZIP_CODE = "";
        
    }

    function getForUpdate(admin) {

        //console.log(admin);
        //$scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        $scope.Admin_Action = "Update Customer";
        //  alert(admin.STATE_ID);
        // $scope._Party = response.data;


        $scope.Customer_ID = admin.Customer_ID;
        $scope.CUSTOMER_NAME = admin.CUSTOMER_NAME;
        $scope.FIRM_NAME = admin.FIRM_NAME;
        $scope.CONTACT_NO = parseInt(admin.CONTACT_NO);
        $scope.ALTERNATE_CONTACT_NO = parseInt(admin.ALTERNATE_CONTACT_NO);
        $scope.EMAIL = admin.EMAIL;
        $scope.ALTERNATE_EMAIL = admin.ALTERNATE_EMAIL;
        $scope.BILLING_ADDRESS = admin.BILLING_ADDRESS;
        $scope.SHIPPING_ADDRESS = admin.SHIPPING_ADDRESS;
        $scope.ZIP_CODE = parseInt(admin.ZIP_CODE);
        $scope.STATE_ID = parseInt(admin.STATE_ID);
        $scope.CITY_ID = parseInt(admin.CITY_ID);
        //$scope.SHIP_STATE_ID = parseInt(admin.SHIP_STATE_ID);
        $scope.SHIP_STATE_ID = admin.SHIP_STATE_ID;
        //$scope.SHIP_CITY_ID = parseInt(admin.SHIP_CITY_ID);
        $scope.SHIP_CITY_ID = admin.SHIP_CITY_ID;
        $scope.PAN_NO = admin.PAN_NO;
        $scope.GST_NO = admin.GST_NO;
        $scope.TIN_NO = admin.TIN_NO;
        $scope.PNDT_NO = admin.PNDT_NO;
        //console.log(admin.PNDT_VALIDITY);
        $scope.PNDT_VALIDITY = admin.PNDT_VALIDITY;
        //console.log($scope.PNDT_VALIDITY.toString("dd-mm-yyyy"));
        //console.log(admin.PNDT_VALIDITY);
        if (admin.PNDT_VALIDITY !== "" && admin.PNDT_VALIDITY !== null && admin.PNDT_VALIDITY !== undefined) {
            var splitDate = admin.PNDT_VALIDITY.split("-");
            //console.log(splitDate);
            var year = splitDate.pop();
            //console.log(year);
            var month = splitDate.pop();
            //console.log(month);
            var day = splitDate.pop();
            //console.log(day);
            var today = year + "-" + month + "-" + day;
            //console.log(today);
            //$('#datePicker').val(today);
            $("#PNDT_VALIDITY").val(today);
        }

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
        if ($scope.SHIP_STATE_ID === 0) {
            $scope.SHIP_STATE_ID = null;
        }
        if ($scope.SHIP_CITY_ID === 0) {
            $scope.SHIP_CITY_ID = null;
        }

        GetAllCity('STATE_ID');
        GetAllCity('SHIP_STATE_ID');

        setTimeout(function () {
            $('#UPLOAD_PNDT_CERTIFICATE_PREVIEW').attr('src', $scope.UPLOAD_PNDT_CERTIFICATE);
            $('#UPLOAD_PAN_CERTIFICATE_PREVIEW').attr('src', $scope.UPLOAD_PAN_CERTIFICATE);
        }, 1000)

    };

    $scope.Cancel = function () {
        //window.location.href = "/Customer_Master/Index?CustType=" + $scope.CUSTOMER_TYPE;
        window.location.href = "/Customer_Master/Index?CustType=" + CUSTOMER_TYPE;
    }

    $scope.AddAdmin = function () {

        /*$("#loader").css("display", '');*/
        $scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        console.log($("#PNDT_VALIDITY").val().length);
        //if ($scope.CUSTOMER_NAME === undefined || $scope.CUSTOMER_NAME === "" || $scope.CUSTOMER_NAME === "@." || $scope.CUSTOMER_NAME === null) {
        //    alert("Please Spcial Char Not Allowed ");
        //    return false;
        //}
        //return false;
        tb_Admin = {
            Customer_ID: $scope.Customer_ID,
            CUSTOMER_TYPE_ID: $scope.CUSTOMER_TYPE_ID,
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
                Clear();
                HideErrorMessage();
                alert("Customer added successfully.");
                $("#loader").css("display", 'none');
                //window.location.href = "/Customer_Master/Index?CustType=" + $scope.CUSTOMER_TYPE;
                window.location.href = "/Customer_Master/Index?CustType=" + CUSTOMER_TYPE;
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
                Clear();
                HideErrorMessage();
                alert("Customer updated successfully.");
                $("#loader").css("display", 'none');
                //window.location.href = "/Customer_Master/Index?CustType=" + $scope.CUSTOMER_TYPE;
                window.location.href = "/Customer_Master/Index?CustType=" + CUSTOMER_TYPE;

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
        //else if (Document_Type === "Pancard") {
        //    var result = validateFileReader(chooseimageFileUploader);
        //    var IsImageChoosenPancard = "No";
        //    //alert(result);
        //    if (result === "SaveImage") {
        //        IsImageChoosenPancard = "Yes";
        //        //alert('Pancard');
        //        var imageName = PancardfileName.substring(0, PancardfileName.lastIndexOf('.'));
        //        var imageExtension = '.' + PancardfileName.substring(PancardfileName.lastIndexOf('.') + 1);
        //        var imageBase64Data = Pancardreader.result;
        //        imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
        //    }
        //    else {
        //        result === "Large Size";
        //    }
        //    // alert(IsImageChoosendriving);
        //    tb_object.IsImageChoosenPancard = IsImageChoosenPancard;
        //    tb_object.ImageName2 = imageName;
        //    tb_object.ImageExtension2 = imageExtension;
        //    tb_object.ImageBase64Data2 = imageBase64Data;
        //    tb_object.Pancard_Size = result;
        //    return tb_object;
        //}

    }


    //$scope.OpenFileUploader_AddBanner = function () {

    //    chooseimageFileUploader_AddBanner.click();
    //};


    //$scope.IsImageEdited = false;
    //$scope.SelectFile = function (e) {
    //    //Code To Preview Image
    //    var reader = new FileReader();
    //    reader.onload = function (e) {
    //        //$scope.PreviewImage = e.target.result;
    //        //$scope.$apply();

    //        setTimeout(function () {
    //            $scope.PreviewImage = e.target.result;
    //            console.log('Image Selected:' + $scope.PreviewImage);
    //            $scope.$apply();
    //        });
    //    };
    //    reader.readAsDataURL(e.target.files[0]);

    //    //Code To Edit Image
    //    var img = e.target.files[0];
    //    if (!pixelarity.open(img, false, function (res) {
    //        //$("#result").attr("src", res);
    //        $scope.PreviewImage = res;

    //        //alert($scope.PreviewImage);
    //        $scope.IsImageEdited = true;

    //        $scope.$apply();
    //    }, "jpg", 0.7)) {
    //        alert("Whoops! That is not an image!");
    //    }

    //};

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    function HideErrorMessage() {
        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }
});