app.service("UrdproductService", function ($http) {

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


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.GetEmployeeEnginer = function () {
        var response = $http({
            method: "GET",
            url: "/Dilivery_Challan/GetEmployee"
        });
        return response;
        //return $http.get("/URDProductPurchase/GetEmployeeEnginer");
    };



    this.GetUrdProductDetails = function () {
        return $http.get("/URDProductPurchase/GetUrdProductDetails");
    };


    this.EditAdmin = function (tb_Admin) {

        var response = $http({
            method: "POST",
            url: "/URDProductPurchase/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
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


    this.GetCompanyDetails = function (companyid) {
        var response = $http({
            method: "GET",
            url: "/URDProductPurchase/GetCmpnyBankDetails",
            params: {
                companyid: companyid

            }
        });
        return response;
    };

    this.GetCustomerTypeList = function () {
        return $http.get("/URDProductPurchase/GetCustomerTypeList");
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



app.controller("UrdproductEditCtrl", function ($scope, UrdproductService) {

    $("#loader").css("display", '');
    GetAllCategory();
    GetAllUrdProduct();
    GetAllCustomerType();
    GetAllEmpEngineer();
    Get_IM_SparePartsAndAccessories();

    var editor = CKEDITOR.instances.PNDT_CELL;
    if (editor) { editor.destroy(true); }

    CKEDITOR.replace('PNDT_CELL', {
        uiColor: '#9AB8F3'
    });

    function GetCompany(id) {
        var getAdmin = UrdproductService.GetCompany(id);
        getAdmin.then(function (response) {
            $scope.CompanyDetails = response.data;
            $scope.COMPANY_PNDT_NO = $scope.CompanyDetails[0].PNDT_NO;
        });
    }

    function GetAllUrdProduct() {
        var getAdmin = UrdproductService.GetUrdProductDetails();
        getAdmin.then(function (response) {
            $scope.URdproducDetailstList = response.data;
            $scope.UP_ID = $scope.URdproducDetailstList[0].UP_ID;
            $scope.CUSTOMER_ID = $scope.URdproducDetailstList[0].CUSTOMER_ID;
            $scope.COMPANY_ID = $scope.URdproducDetailstList[0].COMPANY_ID;
            $scope.FIRM_ID = $scope.URdproducDetailstList[0].FIRM_ID;
            $scope.LETER_REF_NO = $scope.URdproducDetailstList[0].LETER_REF_NO;
            $scope.LETTER_DATE = $scope.URdproducDetailstList[0].LETTER_DATE;
            $scope.URD_STATUS = $scope.URdproducDetailstList[0].URD_STATUS;
            $scope.CAT_ID = $scope.URdproducDetailstList[0].CAT_ID;
            $scope.M_ID = $scope.URdproducDetailstList[0].M_ID;
            $scope.P_ID = $scope.URdproducDetailstList[0].P_ID;
            $scope.MRC_NO = $scope.URdproducDetailstList[0].MRC_NO;
            $scope.PNDT_CIRTIFICATE_NO = $scope.URdproducDetailstList[0].PNDT_CIRTIFICATE_NO;
            $scope.VALIDITY_DATE = $scope.URdproducDetailstList[0].VALIDITY_DATE;
            $scope.GOV_PERMITED_URD_REF_NO = $scope.URdproducDetailstList[0].GOV_PERMITED_URD_REF_NO;
            $scope.EMP_ENG_ID = $scope.URdproducDetailstList[0].EMP_ENG_ID;
            $scope.LETTER_RECIVED_DATE = $scope.URdproducDetailstList[0].LETTER_RECIVED_DATE;
            $scope.ACCESSORIES_DETAILS = $scope.URdproducDetailstList[0].ACCESSORIES_DETAILS;
            $scope.UPLOD_GOV_PERMISSION_LATER = $scope.URdproducDetailstList[0].UPLOD_GOV_PERMISSION_LATER;
            $scope.SERIAL_NO = $scope.URdproducDetailstList[0].SERIAL_NO;
            $scope.COMPANY_PNDT_NO = $scope.URdproducDetailstList[0].COMPANY_PNDT_NO;
            $scope.COMPANY_PNDT_CERTIFICATE = $scope.URdproducDetailstList[0].COMPANY_PNDT_CERTIFICATE;
            $scope.CUSTOMER_TYPE_ID = $scope.URdproducDetailstList[0].CUSTOMER_TYPE_ID;

            GetAllCustomer();
            GetAllManufacturer();
            GetAllCategory();
            GetAllProduct();
            GetAllEmpEngineer();
            GetCustomerFirm();
            getpndt();
            GetCompany(parseInt($scope.COMPANY_ID));
            GetAllAccessories();
            GetAllSparepart();

            $scope.PNDT_CELL = $scope.URdproducDetailstList[0].PNDT_CELL;
            var editor = CKEDITOR.instances.PNDT_CELL;
            if (editor) { editor.destroy(true); }

            CKEDITOR.replace('PNDT_CELL', {
                uiColor: '#9AB8F3'
            });
            CKEDITOR.instances.PNDT_CELL.setData($scope.PNDT_CELL);
            $("#loader").css("display", 'none');
        });
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
            $scope.PNDT_CIRTIFICATE_NO = $scope.CustomerPndtList[0].PNDT_NO;
            $scope.PNDT_VALIDITY = $scope.CustomerPndtList[0].PNDT_VALIDITY;
            $("#PNDT_VALIDITY").val($scope.PNDT_VALIDITY);
            $scope.FIRM_ADDRESS = $scope.CustomerPndtList[0].FIRM_ADDRESS;
            $scope.UPLOAD_PNDT_CERTIFICATE = $scope.CustomerPndtList[0].UPLOAD_PNDT_CERTIFICATE;
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

    function Clear() {

        $scope.UP_ID = "";
        $scope.LETER_REF_NO = "";
        $scope.LETTER_DATE = "";
        $scope.CUSTOMER_ID = "";
        $scope.COMPANY_ID = "";
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
        CKEDITOR.instances.PNDT_CELL.setData($scope.PNDT_CELL);

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
            PNDT_CELL: CKEDITOR.instances.PNDT_CELL.getData(),
            PNDT_NO: $scope.PNDT_NO,
            PNDT_VALIDITY: $scope.PNDT_VALIDITY,
            GOV_PERMITED_URD_REF_NO: $scope.GOV_PERMITED_URD_REF_NO,
            EMP_ENG_ID: $scope.EMP_ENG_ID,
            LETTER_RECIVED_DATE: $scope.LETTER_RECIVED_DATE,
            ACCESSORIES_DETAILS: $scope.ACCESSORIES_DETAILS,
            SERIAL_NO: $scope.SERIAL_NO,
            COMPANY_PNDT_NO: $scope.COMPANY_PNDT_NO,
        };


        tb_Admin = getImageData(Profile_photo, tb_Admin, 1);
        tb_Admin.UPLOD_GOV_PERMISSION_LATER = tb_Admin.IsImageChoosen;
        if (($scope.UPLOD_GOV_PERMISSION_LATER !== null || $scope.UPLOD_GOV_PERMISSION_LATER !== "No" || $scope.UPLOD_GOV_PERMISSION_LATER !== "undefined") && (tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined")) {
            tb_Admin.UPLOD_GOV_PERMISSION_LATER = $scope.UPLOD_GOV_PERMISSION_LATER;
        }
        else if (($scope.UPLOD_GOV_PERMISSION_LATER === null || $scope.UPLOD_GOV_PERMISSION_LATER === "No" || $scope.UPLOD_GOV_PERMISSION_LATER === "undefined") && (tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined")) {
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

        EditAdminRecord(tb_Admin);




    };

    function AddAdminRecord(tb_Admin) {
        var datalist = UrdproductService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("URD Product added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
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



    $scope.UpdateAdmin = function () {

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
            COMPANY_ID: $scope.COMPANY_ID,
            FIRM_ID: $scope.FIRM_ID,
            URD_STATUS: $scope.URD_STATUS,
            CAT_ID: $scope.CAT_ID,
            M_ID: $scope.M_ID,
            P_ID: $scope.P_ID,
            MRC_NO: $scope.MRC_NO,
            //PNDT_CELL: $scope.PNDT_CELL,
            PNDT_CELL: CKEDITOR.instances.PNDT_CELL.getData(),
            PNDT_CIRTIFICATE_NO: $scope.PNDT_CIRTIFICATE_NO,
            PNDT_VALIDITY: $scope.PNDT_VALIDITY,
            GOV_PERMITED_URD_REF_NO: $scope.GOV_PERMITED_URD_REF_NO,
            EMP_ENG_ID: $scope.EMP_ENG_ID,
            LETTER_RECIVED_DATE: $scope.LETTER_RECIVED_DATE,
            ACCESSORIES_DETAILS: $scope.ACCESSORIES_DETAILS,
            UPLOD_GOV_PERMISSION_LATER: $scope.UPLOD_GOV_PERMISSION_LATER,
            SERIAL_NO: $scope.SERIAL_NO,
            COMPANY_PNDT_NO: $scope.COMPANY_PNDT_NO,

        };

        tb_Admin = getImageData(Profile_photo, tb_Admin, 1);
        tb_Admin.UPLOD_GOV_PERMISSION_LATER = tb_Admin.IsImageChoosen;

        if (($scope.UPLOD_GOV_PERMISSION_LATER !== null || $scope.UPLOD_GOV_PERMISSION_LATER !== "No" || $scope.UPLOD_GOV_PERMISSION_LATER !== "undefined") && (tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined")) {
            tb_Admin.UPLOD_GOV_PERMISSION_LATER = $scope.UPLOD_GOV_PERMISSION_LATER;
        }
        else if (($scope.UPLOD_GOV_PERMISSION_LATER === null || $scope.UPLOD_GOV_PERMISSION_LATER === "No" || $scope.UPLOD_GOV_PERMISSION_LATER === "undefined") && (tb_Admin.UPLOD_GOV_PERMISSION_LATER === null || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "No" || tb_Admin.UPLOD_GOV_PERMISSION_LATER === "undefined")) {
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

        EditAdminRecord(tb_Admin);

    };


    function EditAdminRecord(tb_Admin) {
        var datalist = UrdproductService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear();
                alert("URD Product Updated successfully.");
                $("#loader").css("display", 'none');
                window.location.href = window.location.href;
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
                $("#loader").css("display", 'none');
            });
    }

    $scope.URDStatusChange = function () {
        $scope.GOV_PERMITED_URD_REF_NO = "";
        $scope.EMP_ENG_ID = "";
        $scope.LETTER_RECIVED_DATE = "";
        $scope.ACCESSORIES_DETAILS = "";
        $scope.UPLOD_GOV_PERMISSION_LATER = "";
        document.getElementById("Profile_photo").value = "";
    }

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
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.pdf)$/;

            if (fileuploader.val() === '') {
                return "Please Choose Image First";
            }
            else {
                var file = $(fileuploader[0].files);
                if (regex.test(file[0].name.toLowerCase())) {

                    var imageSize = Math.round(file[0].size / 1024);
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
       
    }

    window.processHTML = function (htmlContent, id) {
        var content = htmlContent.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, function (m) {
            return m.replace(/[\n\t]+/g, "");
        });
        $("#" + id).html(content);
    };

    $scope.PurchaseConfirmation = function () {

        var cust = $scope.CustomerList.filter(x => x.Customer_ID == parseInt($scope.CUSTOMER_ID))[0];
        $scope.CUSTOMER_NAME = cust.CUSTOMER_NAME;
        var firm = $scope.CustomerFirmList.filter(x => x.F_ID == parseInt($scope.FIRM_ID))[0];
        $scope.FIRM_NAME = firm.FIRM_NAME;

        var cat = $scope.CategoryList.filter(x => x.CAT_ID == $scope.CAT_ID)[0];
        $scope.CAT_NAME = cat.CAT_NAME;

        $scope.IS_US_MC = false;
        if ($scope.CAT_NAME === 'Ultrasound  Machine' || $scope.CAT_NAME === 'Ultrasound Machine') {
            $scope.IS_US_MC = true;
        }

        var manf = $scope.ManufacturerList.filter(x => x.M_ID == $scope.M_ID)[0];
        $scope.M_NAME = manf.M_NAME;

        var prod = $scope.ProductList.filter(x => x.P_ID == $scope.P_ID)[0];
        $scope.PRODUCT_NAME = prod.PRODUCT_NAME;

        window.processHTML($scope.PNDT_CELL, "PNDT_CELL1");

        var getCompany = UrdproductService.GetCompanyDetails($scope.COMPANY_ID);
        getCompany.then(function (response) {
            $scope.cbd = response.data;
            $scope.COMPANYNAME = $scope.cbd[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.cbd[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.cbd[0].ZIP_CODE;
            $scope.GST_NO = $scope.cbd[0].GST_NO;
            $scope.PAN_NO = $scope.cbd[0].PAN_NO;
        });

        $("#PurchaseConfirmation").modal("show");
    }
    $scope.EquipReceiveLetter = function () {

        if ($scope.URD_STATUS === "Pending" || $scope.URD_STATUS === "" || $scope.URD_STATUS === "undefined") {
            alert("Change URD status and Update necessary details for Equipment Recieved Letter.");
            return;
        }

        var cust = $scope.CustomerList.filter(x => x.Customer_ID == parseInt($scope.CUSTOMER_ID))[0];
        $scope.CUSTOMER_NAME = cust.CUSTOMER_NAME;
        var firm = $scope.CustomerFirmList.filter(x => x.F_ID == parseInt($scope.FIRM_ID))[0];
        $scope.FIRM_NAME = firm.FIRM_NAME;

        var cat = $scope.CategoryList.filter(x => x.CAT_ID == $scope.CAT_ID)[0];
        $scope.CAT_NAME = cat.CAT_NAME;
        $scope.IS_US_MC = false;
        if ($scope.CAT_NAME === 'Ultrasound  Machine' || $scope.CAT_NAME === 'Ultrasound Machine') {
            $scope.IS_US_MC = true;
        }

        var manf = $scope.ManufacturerList.filter(x => x.M_ID == $scope.M_ID)[0];
        $scope.M_NAME = manf.M_NAME;

        var prod = $scope.ProductList.filter(x => x.P_ID == $scope.P_ID)[0];
        $scope.PRODUCT_NAME = prod.PRODUCT_NAME;

        var eng = $scope.EmployeeEngList.filter(x => x.EMP_ID == $scope.EMP_ENG_ID)[0];
        $scope.EMP_NAME = eng.EMP_NAME;

        window.processHTML($scope.PNDT_CELL, "PNDT_CELL2");

        var getCompany = UrdproductService.GetCompanyDetails($scope.COMPANY_ID);
        getCompany.then(function (response) {
            $scope.cbd = response.data;
            $scope.COMPANYNAME = $scope.cbd[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.cbd[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.cbd[0].ZIP_CODE;
            $scope.GST_NO = $scope.cbd[0].GST_NO;
            $scope.PAN_NO = $scope.cbd[0].PAN_NO;
        });

        $("#EquipReceiveLetter").modal("show");
    }

    $scope.CustomerSaleLetter = function () {

        var cust = $scope.CustomerList.filter(x => x.Customer_ID == parseInt($scope.CUSTOMER_ID))[0];
        $scope.CUSTOMER_NAME = cust.CUSTOMER_NAME;

        var firm = $scope.CustomerFirmList.filter(x => x.F_ID == parseInt($scope.FIRM_ID))[0];
        $scope.FIRM_NAME = firm.FIRM_NAME;

        var cat = $scope.CategoryList.filter(x => x.CAT_ID == $scope.CAT_ID)[0];
        $scope.CAT_NAME = cat.CAT_NAME;
        $scope.IS_US_MC = false;
        if ($scope.CAT_NAME === 'Ultrasound  Machine' || $scope.CAT_NAME === 'Ultrasound Machine' ) {
            $scope.IS_US_MC = true;
        }

        var manf = $scope.ManufacturerList.filter(x => x.M_ID == $scope.M_ID)[0];
        $scope.M_NAME = manf.M_NAME;

        var prod = $scope.ProductList.filter(x => x.P_ID == $scope.P_ID)[0];
        $scope.PRODUCT_NAME = prod.PRODUCT_NAME;

        window.processHTML($scope.PNDT_CELL, "PNDT_CELL3");

        var getCompany = UrdproductService.GetCompanyDetails($scope.COMPANY_ID);
        getCompany.then(function (response) {
            $scope.cbd = response.data;
            $scope.COMPANYNAME = $scope.cbd[0].COMPANY_NAME;
            $scope.COMPANYREGADDRESS = $scope.cbd[0].COMPANY_REG_ADDRESS;
            $scope.ZIPCODE = $scope.cbd[0].ZIP_CODE;
            $scope.GST_NO = $scope.cbd[0].GST_NO;
            $scope.PAN_NO = $scope.cbd[0].PAN_NO;
        });
        $("#CustomerSaleLetter").modal("show");
    }

    $scope.Print = function (id) {

        var printHtml = document.getElementById(id).outerHTML;
        var currentPage = document.body.innerHTML;
        var elementPage = '<html><body><div style="padding:0 ; margin:0;">' + printHtml + '</div> </body></html>';

        var WindowObject = window.open();
        WindowObject.document.write(elementPage);
        WindowObject.document.close();
        setTimeout(function () {
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
        }, 1000);

    }


    $scope.DownloadDoc = function (fileURL, type) {
        if (!fileURL) {
            alert(type + " not uploaded.");
            return;
        }

        if (type === "UPLOAD_GOV_PERMISSION_LATER") {
            if (!fileURL) {
                alert("Gov. Permission Letter not uploaded.");
                return;
            }
        } else if (type === "UPLOAD_PNDT_CERTIFICATE") {
            if (!fileURL) {
                alert("Supplier PNDT Certificate not uploaded.");
                return;
            }
        } else if (type === "COMPANY_PNDT_CERTIFICATE") {
            if (!fileURL) {
                alert("Company PNDT Certificate not uploaded.");
                return;
            }
        }

        // Assuming the base64 string is stored in `fileURL`
        var downloadUrl = '/InvoiceMaster/DownloadDocument?filePath=' + encodeURIComponent(fileURL);
        window.location.href = downloadUrl;
    };




    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); 
        }
    }

    $scope.AddPartsButtonClicked = function () {

        var STD_ID = 0;
        if ($scope.STD_ID == undefined) {
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
            Get_IM_SparePartsAndAccessories();
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
    $scope.OnProductChange = function () {
        GetAllAccessories();
        GetAllSparepart();
    };


    function GetAllAccessories() {
        var getAdmin = UrdproductService.GetAllAccessories(parseInt($scope.P_ID)); 
        getAdmin.then(function (response) {
            $scope.AccessoriesList = response.data;
        });
    }


    function GetAllSparepart() {
        var getAdmin = UrdproductService.GetAllSparepart(parseInt($scope.P_ID));
        getAdmin.then(function (response) {
            $scope.SparePartList = response.data;
        });
    }
});