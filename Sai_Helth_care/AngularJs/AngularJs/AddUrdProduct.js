app.service("UrdproductService", function ($http) {
    
    //this.GetCustomerList = function () {
    //    return $http.get("/URDProductPurchase/GetCustomerList");
    //}; 
    this.GetCustomerList = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetCustomerList",
            params: {
                id: id
            }
        });
        return response;
    };

    this.Delete_IM_SparePartsAndAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/Delete_IM_SparePartsAndAccessories",
            params: {
                id: id
            }
        });
        return response;
    };

    this.Get_IM_SparePartsAndAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/Get_IM_SparePartsAndAccessories",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetCustomerTypeList = function () {
        return $http.get("/URDProductPurchase/GetCustomerTypeList");
    };

    this.GetFirmList = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetFirmList",
            params: {
                id: id
            }
        });
        return response;
    };


    this.GetFirmListgetpndt = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetFirmListgetpndt",
            params: {
                id: id
            }
        });
        return response;
    };



    this.GetCategory = function () {
        return $http.get("/URDProductPurchase/GetCategory");
    };

    this.GetManufacturer = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetManufacturer",
            params: {
                id: id
            }
        });
        return response;
    };


    this.GetProduct = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetProduct",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetCompany = function (id) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/GetCompany",
            params: {
                cid: id
            }
        });
        return response;
    };


    this.GetEmployeeEnginer = function () {
        return $http.get("/URDProductPurchase/GetEmployeeEnginer");
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/AddAdmin",
            data: JSON.stringify(tb_Admin),
            datatype: "json"
        });
        return response;
    };


    this.GetLatestRecords = function (tb_params) {
        var response = $http({
            method: "POST",
            url: "/Customer_Master/GenerateUniqueCode",
            data: JSON.stringify(tb_params),
            dataType: "json"
        });
        return response;
    };

    this.GetAllAccessories = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetStdAccPart",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetAllSparepart = function (id) {
        var response = $http({
            method: "POST",
            url: "/Quotation_Registration/GetSparepart",
            params: {
                id: id
            }
        });
        return response;
    };

    this.AddAccessories = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/AddAccessories",
            data: JSON.stringify(tb_Admin),
            datatype: "json"
        });
        return response;
    };
});




app.controller("UrdproductAddCtrl", function ($scope, UrdproductService) {
    GetCompany();
    GetAllCategory();
    /*GetAllCustomer();*/
    GetAllEmpEngineer();
    GetLatestRecord();
    GetAllCustomerType();
    Get_IM_SparePartsAndAccessories();

    var editor = CKEDITOR.instances.PNDT_CELL;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('PNDT_CELL', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });

    function GetCompany() {
        var getAdmin = UrdproductService.GetCompany(null);
        getAdmin.then(function (response) {
            $scope.CompanyDetails = response.data;
            $scope.COMPANY_PNDT_NO = $scope.CompanyDetails[0].PNDT_NO;
        });
    }


    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "URDProductPurchase",
            CustomerTypeId: null
        }
        var LatestDocNo = UrdproductService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            //$scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            $scope.LETER_REF_NO = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.LETTER_DATE = today;
            $("#loader").css("display", 'none');
        });
        //console.log($scope.AddPayment);
    }


    function GetAllCustomerType() {
        var getAdmin = UrdproductService.GetCustomerTypeList();
        getAdmin.then(function (response) {
            $scope.CustomerTypeList = response.data;
        });
    }

    $scope.TypeCustomerList = function () {
        GetAllCustomer();
    };
    function GetAllCustomer() {
        var getAdmin = UrdproductService.GetCustomerList($scope.CUSTOMER_TYPE_ID);
        getAdmin.then(function (response) {
            $scope.CustomerList = response.data;
            $("#tempCustId").val($scope.PNDT_NO);
            $("#tempPNDTno").val($scope.CustomerList.PNDT_NO);
            // $("#tempPNDTValidity").val($scope.CustomerList[0].PNDT_VALIDITY);
            //console.log($scope.QuotationList);
            //alert($("#tempPNDTno").val());
            //alert($("#tempPNDTValidity").val());
        });
    }


    $scope.GetFirmChange = function () {

        GetCustomerFirm();
        getpndt();
    };


    function GetCustomerFirm() {
        var getAdmin = UrdproductService.GetFirmList(parseInt($scope.CUSTOMER_ID));
        getAdmin.then(function (response) {
            $scope.CustomerFirmList = response.data;

        });
    }




    function getpndt() {
        var getAdmin = UrdproductService.GetFirmListgetpndt(parseInt($scope.CUSTOMER_ID));
        getAdmin.then(function (response) {
            $scope.CustomerPndtList = response.data;
            $scope.PNDT_NO = $scope.CustomerPndtList[0].PNDT_NO;
            $scope.PNDT_VALIDITY = $scope.CustomerPndtList[0].PNDT_VALIDITY;
            $("#PNDT_VALIDITY").val($scope.PNDT_VALIDITY);
            $scope.FIRM_ADDRESS = $scope.CustomerPndtList[0].FIRM_ADDRESS;
            //alert(JSON.stringify($scope.CustomerPndtList));
            //  alert($scope.PNDT_VALIDITY);

        });
    }

    function GetAllEmpEngineer() {
        var getAdmin = UrdproductService.GetEmployeeEnginer();
        getAdmin.then(function (response) {
            $scope.EmployeeEngList = response.data;
        });
    }

    function GetAllCategory() {
        var getAdmin = UrdproductService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }


    $scope.GetMenuChange = function () {

        GetAllManufacturer();
    };


    function GetAllManufacturer() {
        var getAdmin = UrdproductService.GetManufacturer($scope.CAT_ID);
        getAdmin.then(function (response) {
            $scope.ManufacturerList = response.data;

        });
    }



    $scope.GetProductChange = function () {

        GetAllProduct();
    };


    function GetAllProduct() {
        var getAdmin = UrdproductService.GetProduct($scope.M_ID);
        getAdmin.then(function (response) {
            $scope.ProductList = response.data;

        });
    }


    function GetAllEmpEngineer() {
        var getAdmin = UrdproductService.GetEmployeeEnginer();
        getAdmin.then(function (response) {
            $scope.EmployeeEngList = response.data;
        });
    }


    $scope.AddAdmin = function () {

        

        $("#loader").css("display", '');

        $scope.LETTER_DATE = $("#LETTER_DATE").val();
        $scope.LETTER_RECIVED_DATE = $("#LETTER_RECIVED_DATE").val();
        $scope.PNDT_VALIDITY = $("#PNDT_VALIDITY").val();
        if ($scope.LETTER_DATE === "" || $scope.LETTER_DATE === null || $scope.LETTER_DATE === "undefined") {
            alert("Letter date is required");
            return;
        }

        if ($scope.URD_STATUS === "Issue") {
            if ($scope.LETTER_RECIVED_DATE === "" || $scope.LETTER_RECIVED_DATE === null || $scope.LETTER_RECIVED_DATE === "undefined") {
                alert("Letter Received date is required");
                return;
            }
        }
        let pndtCell = CKEDITOR.instances.PNDT_CELL.getData();
        if (pndtCell === "" || pndtCell === undefined || pndtCell === null) {
            alert("Please add P.N.D.T Cell!");
            return;
        }

        tb_Admin = {
            UP_ID: $scope.UP_ID,
            LETER_REF_NO: $scope.LETER_REF_NO,
            LETTER_DATE: $scope.LETTER_DATE,
            CUSTOMER_ID: $scope.CUSTOMER_ID,
            FIRM_ID: $scope.FIRM_ID,
            URD_STATUS: $scope.URD_STATUS,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            P_ID: $scope.P_ID,
            MRC_NO: $scope.MRC_NO,
            //PNDT_CELL: $scope.PNDT_CELL,
            PNDT_CELL: CKEDITOR.instances.PNDT_CELL.getData(),
            PNDT_NO: $scope.PNDT_NO,
            PNDT_VALIDITY: $scope.PNDT_VALIDITY,
            GOV_PERMITED_URD_REF_NO: $scope.GOV_PERMITED_URD_REF_NO,
            EMP_ENG_ID: $scope.EMP_ENG_ID,
            LETTER_RECIVED_DATE: $scope.LETTER_RECIVED_DATE,
            ACCESSORIES_DETAILS: $scope.ACCESSORIES_DETAILS,
            ACCESSORIES_DETAILS: $scope.ACCESSORIES_DETAILS,
            ACCESSORIES_DETAILS: $scope.ACCESSORIES_DETAILS,
            SERIAL_NO: $scope.SERIAL_NO
        };

        tb_Admin = getImageData(Profile_photo, tb_Admin, 1);
        tb_Admin.UPLOD_GOV_PERMISSION_LATER = tb_Admin.IsImageChoosen;

        if (($scope.UPLOD_GOV_PERMISSION_LATER === null || $scope.UPLOD_GOV_PERMISSION_LATER === "No" || $scope.UPLOD_GOV_PERMISSION_LATER === "undefined") && (tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined")) {
            alert("Gov. Permission Letter is required.")

            $("#loader").css("display", 'none');
            return;
        }
        else if ((tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined") && tb_Admin.result == "Please Select Image Less Than 2 MB Size") {
            alert("Please Select Image Less Than 2 MB Size")

            $("#loader").css("display", 'none');
            return;
        }
        else if ((tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined") && tb_Admin.result == "Sorry... Invalid File") {
            alert("Sorry... Invalid File.")

            $("#loader").css("display", 'none');
            return;
        }
        else if ((tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined") && tb_Admin.result == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
            alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

            $("#loader").css("display", 'none');
            return;
        }


        //tb_Admin = getImageData(Profile_photo2, tb_Admin, 2);
        //tb_Admin.COMPANY_PNDT_CERTIFICATE = tb_Admin.IsImageChoosen2;

        //if (($scope.COMPANY_PNDT_CERTIFICATE === null || $scope.COMPANY_PNDT_CERTIFICATE === "No" || $scope.COMPANY_PNDT_CERTIFICATE === "undefined") && (tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined")) {
        //    alert("Company PNDT Certificate is required.")

        //    $("#loader").css("display", 'none');
        //    return;
        //}
        //else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.result2 == "Please Select Image Less Than 2 MB Size") {
        //    alert("Please Select Image Less Than 2 MB Size")

        //    $("#loader").css("display", 'none');
        //    return;
        //}
        //else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.result2 == "Sorry... Invalid File") {
        //    alert("Sorry... Invalid File.")

        //    $("#loader").css("display", 'none');
        //    return;
        //}
        //else if ((tb_Admin.COMPANY_PNDT_CERTIFICATE === null || tb_Admin.COMPANY_PNDT_CERTIFICATE === "No" || tb_Admin.COMPANY_PNDT_CERTIFICATE === "undefined") && tb_Admin.result2 == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
        //    alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

        //    $("#loader").css("display", 'none');
        //    return;
        //}


            AddAdminRecord(tb_Admin);
      

      

    };

    function AddAdminRecord(tb_Admin) {
        var datalist = UrdproductService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("URD Product added successfully.");
                $("#loader").css("display", 'none');
                window.location.href ="/URDProductPurchase/Index"
            }
            else if (d.data.success === false) {
                alert("URD Product already added.");
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




    function Clear() {

        $scope.UP_ID = "";
        $scope.LETER_REF_NO = "";
        $scope.LETTER_DATE = "";
        $scope.CUSTOMER_ID = "";
        $scope.FIRM_ID = "";
        $scope.URD_STATUS = "";
        $scope.CAT_ID = "";
        $scope.M_ID = "";
        $scope.P_ID = "";
        $scope.MRC_NO = "";
        $scope.PNDT_CELL = "";
        $scope.PNDT_CIRTIFICATE_NO = "";
        $scope.VALIDITY_DATE = "";
        $scope.GOV_PERMITED_URD_REF_NO = "";
        $scope.EMP_ENG_ID = "";
        $scope.LETTER_RECIVED_DATE = "";
        $scope.ACCESSORIES_DETAILS = "";
        $scope.UPLOD_GOV_PERMISSION_LATER = "";
        $scope.COMPANY_PNDT_CERTIFICATE = "";
        $scope.SERIAL_NO = "";
        $scope.COMPANY_PNDT_NO = "";
        $('#Profile_photo').val = "";
       // $('#Profile_photo2').val = "";

    }

    var Profile_photo = $('#Profile_photo');
    var reader = new FileReader();
    var fileName;
    var contentType;

    //var Profile_photo2 = $('#Profile_photo2');
    //var reader2 = new FileReader();
    //var fileName2;
    //var contentType2;

    Profile_photo.change(function () {

        ReadUploadedFilesData($(this));
    });


    //Profile_photo2.change(function () {

    //    ReadUploadedFilesData2($(this));
    //});



    function ReadUploadedFilesData(fileuploader) {
        var file = $(fileuploader[0].files);
        fileName = file[0].name;
        contentType = file[0].type;
        reader.readAsDataURL(file[0]);

    }

    //function ReadUploadedFilesData2(fileuploader) {
    //    var file = $(fileuploader[0].files);
    //    fileName2 = file[0].name;
    //    contentType2 = file[0].type;
    //    reader2.readAsDataURL(file[0]);

    //}

    function validateFileReader(fileuploader) {
        if (typeof (FileReader) !== "undefined") {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.pdf)$/;

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
                        return 'Please Select Image Less Than 2 MB Size';
                    }

                } else {
                    return "Sorry... Invalid File";
                }
            }

        } else {
            return "Please Use Another Browser, This Browser is Not Supporting Image Uploader.";
        }
    }

    function getImageData(chooseimageFileUploader, tb_object, id) {
        var result = validateFileReader(chooseimageFileUploader);
        var IsImageChoosen = "No";
        if (id === 1) {
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
            tb_object.result = result;
            return tb_object;
        }
        //else if (id === 2) {
        //    if (result === "SaveImage") {
        //        IsImageChoosen = "Yes";
        //        // alert('success Save Image');
        //        var imageName = fileName2.substring(0, fileName2.lastIndexOf('.'));
        //        var imageExtension = '.' + fileName2.substring(fileName2.lastIndexOf('.') + 1);
        //        var imageBase64Data = reader2.result;
        //        imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
        //    }
        //    tb_object.IsImageChoosen2 = IsImageChoosen;
        //    tb_object.ImageName2 = imageName;
        //    tb_object.ImageExtension2 = imageExtension;
        //    tb_object.ImageBase64Data2 = imageBase64Data;
        //    tb_object.result2 = result;
        //    return tb_object;
        //}
    }

    $scope.URDStatusChange = function () {
        $scope.GOV_PERMITED_URD_REF_NO = "";
        $scope.EMP_ENG_ID = "";
        $scope.LETTER_RECIVED_DATE = "";
        $scope.ACCESSORIES_DETAILS = "";
        $scope.UPLOD_GOV_PERMISSION_LATER = "";
        document.getElementById("Profile_photo").value = "";
    }

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


    $scope.OnProductChange = function () {
        GetAllAccessories();
        GetAllSparepart();
    };


    function GetAllAccessories() {
        var getAdmin = UrdproductService.GetAllAccessories(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }


    function GetAllSparepart() {
        var getAdmin = UrdproductService.GetAllSparepart(parseInt($scope.P_ID)); // ($scope.P_ID);
        getAdmin.then(function (response) {
            $scope.SparePartList = response.data;
        });
    }

    $scope.AddPartsButtonClicked = function () {
        var STD_ID = 0;
        if ($scope.INVOICE_For == "SpareParts") {
            var STD_ID = $scope.SP_ID;
        }
        else {
            var STD_ID = $scope.STD_ID;
        }
      
        tb_Admin = {
            STD_ID: STD_ID,
            P_ID: $scope.P_ID,
            QUANTITY: $scope.QUANTITY,
            PRODUCT_FOR: $scope.INVOICE_For,
            CUSTOMER_ID: $scope.CUSTOMER_ID
        }
        var getAdmin = UrdproductService.AddAccessories(tb_Admin); 
        getAdmin.then(function (response) {
           /* $scope.SparePartList = response.data;*/
            Get_IM_SparePartsAndAccessories();
            $scope.STD_ID = "";
        });
    }
   
    function Get_IM_SparePartsAndAccessories() {
        var getAdmin = UrdproductService.Get_IM_SparePartsAndAccessories();
        getAdmin.then(function (response) {
            $scope.IM_SparePartsAndAccessories = response.data;

        });
    };

    $scope.Delete_IM_SparePartsAndAccessories = function (dcsa) {
        $scope.URD_ACC_ID = dcsa.URD_ACC_ID;
        Delete_IM_SparePartsAndAccessories(dcsa);
    }

    function Delete_IM_SparePartsAndAccessories(data) {
        var datalist = UrdproductService.Delete_IM_SparePartsAndAccessories($scope.URD_ACC_ID);
        datalist.then(function (d) {
            if (d.data.success === 1) {
                Get_IM_SparePartsAndAccessories();
            }
            else {
                alert("Error Occured.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });

    }

});