app.service("CompanyDetailsService", function ($http) {

    this.GetCompanyDetails = function () {
        return $http.get("/Company_Master/GetCompanyDetails");
    };

    this.GetCompanyDocDetails = function () {
        return $http.get("/Company_Master/GetCompanyDocDetails");
    };
    this.AddEditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/AddEditDocDetailsAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
    this.AddEditBankAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/AddEditBankDetailsAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCompanyBankDetails = function () {
        var response = $http({
            method: "GET",
            url: "/Company_Master/GetCmpnyBankDetails",
            params: {
                bankid: 0
            }
        });
        return response;
    };

    this.ChangeStatusBank = function (id) {
        var response = $http({
            method: "POST",
            url: "/Company_Master/ChangeStatusBank",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

});


app.controller("CompanyCtrl", function ($scope, CompanyDetailsService) {

    $("#loader").css("display", '');
    GetCompanyDetails();
    GetCompanyDocDetails();
    GetAllBanks();

    function GetAllBanks() {
        var getAdmin = CompanyDetailsService.GetCompanyBankDetails();
        getAdmin.then(function (response) {
            $scope.CompanyBankList = response.data;
            $("#loader").css("display", 'none');
        });
    }

    function GetCompanyDetails() {
        var getCompanyDetails = CompanyDetailsService.GetCompanyDetails();
        getCompanyDetails.then(function (response) {
            $scope.CompanyDetails = response.data;
            $("#loader").css("display", 'none');
        });
    }

    function GetCompanyDocDetails() {
        var getCompanyDetails = CompanyDetailsService.GetCompanyDocDetails();
        getCompanyDetails.then(function (response) {
            $scope.CompanyDocDetails = response.data;
            $("#loader").css("display", 'none');
        });
    }

    //


    //$scope.DownloadFile = function (uri, name) {
    //    var winObj = window.open();

    //    var anchor = winObj.document.createElement("a");
    //    anchor.href = uri;
    //    var imgname = name + '.' + uri.split('.').pop();
    //    anchor.setAttribute('download', imgname);
    //    anchor.style.display = "none";
    //    winObj.document.body.appendChild(anchor);
    //    anchor.click();
    //    winObj.document.body.removeChild(anchor);
    //    winObj.history.back();
    //}

    $scope.DownloadFile = function (fileURL) {
        var downloadUrl = '/InvoiceMaster/DownloadDocument?FilePath=' + encodeURIComponent(fileURL);
        window.location.href = downloadUrl;
    }


    //$scope.DownloadFile = function (url) {
    //    window.open(url);
    //    window.focus();
    //    window.close();
    //}

    function Clear() {
        $scope.DOC_ID = "";
        $scope.COMPANY_ID = "";
        $scope.FILE_URL = "";
        $scope.FILE_TYPE = "";
        $scope.TITLE = "";
        $scope.DOC_TYPE = "";
        $scope.DOC_NO = "";
        $scope.UPLOAD_DOC = "";
        $scope.DOC_DATA = "";
        $scope.Operation = "";

        $('#DOC_DATA').val("");
        $('#DOC_DATA_Perview').attr('src', "");

        $scope.AddPaymentDoc.$setPristine(); // Set form to pristine state
        $scope.AddPaymentDoc.$setUntouched();

    }

    $scope.AddDoc = function () {
        $scope.Admin_Action = "Add Document";

        Clear();
        $("#Comp_add").modal("show");
        console.log($scope.AddPaymentDoc);
    }

    $scope.EditDoc = function (company) {
        Clear();
        $scope.Admin_Action = "Update Document";
        $scope.DOC_ID = company.DOC_ID;
        $scope.COMPANY_ID = company.COMPANY_ID;
        $scope.FILE_URL = company.FILE_URL;
        $scope.DOC_NO = company.DOC_NO;
        $scope.FILE_TYPE = company.FILE_TYPE;
        $scope.TITLE = company.DOC_TITLE;
        $scope.DOC_TYPE = company.DOC_TYPE;
        setTimeout(function () {
            $('#DOC_DATA_Perview').attr('src', $scope.FILE_URL);
          
        }, 1000)

        $("#Comp_add").modal("show");
    }

    $scope.AddDocAdmin = function () {
        $("#loader").css("display", '');

        if ($scope.Admin_Action === "Add Document") {
            tb_Admin = {
                COMPANY_ID: $scope.COMPANY_ID,
                DOC_TITLE: $scope.TITLE,
                DOC_TYPE: $scope.DOC_TYPE,
                DOC_NO: $scope.DOC_NO,
                FILE_URL: $scope.FILE_URL,
                FILE_TYPE: $scope.FILE_TYPE,
                Operation: "Insert",
                UPLOAD_DOC: $scope.UPLOAD_DOC,

            };
            tb_Admin = getImageData(UPLOAD_DOC, tb_Admin);
            tb_Admin.UPLOAD_DOC = tb_Admin.IsImageChoosen;

            if ((tb_Admin.UPLOAD_DOC === null || tb_Admin.UPLOAD_DOC === "No" || tb_Admin.UPLOAD_DOC === undefined) && tb_Admin.Adharcard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File! Please Rename or upload another Image.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.UPLOAD_DOC === null || tb_Admin.UPLOAD_DOC === "No" || tb_Admin.UPLOAD_DOC === undefined) && tb_Admin.Adharcard_Size == "Large Size") {
                alert("Please Upload Image Less Than 2 MB Size.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.UPLOAD_DOC === null || tb_Admin.UPLOAD_DOC === "No" || tb_Admin.UPLOAD_DOC === undefined) && tb_Admin.Adharcard_Size == "Please Choose Image First") {
                alert("Please Upload Image.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.Adharcard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")
                return false;
            }
            else {
                AddAdminDocRecord(tb_Admin);
                //$scope.OnCategoryClick(0);
            }
        }
        else if ($scope.Admin_Action === "Update Document") {
            tb_Admin = {
                DOC_ID: $scope.DOC_ID,
                COMPANY_ID: $scope.COMPANY_ID,
                DOC_TITLE: $scope.TITLE,
                DOC_TYPE: $scope.DOC_TYPE,
                DOC_NO: $scope.DOC_NO,
                FILE_URL: $scope.FILE_URL,
                FILE_TYPE: $scope.FILE_TYPE,
                Operation: "Update",
                UPLOAD_DOC: $scope.UPLOAD_DOC,

            };
            tb_Admin = getImageData(UPLOAD_DOC, tb_Admin);
            tb_Admin.UPLOAD_DOC = tb_Admin.IsImageChoosen;
            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.UPLOAD_DOC = "Yes";
            }
            else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.Adharcard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File! Please Rename or upload another Image.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.Adharcard_Size == "Large Size") {
                alert("Please Upload Image Less Than 2 MB Size.")
                return false;
            }
            //else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.Adharcard_Size == "Please Choose Image First") {
            //    alert("Please Upload Image.")
            //    return false;
            //}
            else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.Adharcard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")
                return false;
            }
            else {
                tb_Admin.UPLOAD_DOC = $scope.UPLOAD_DOC;
            }

            EditAdminDocRecord(tb_Admin);
            //$scope.OnCategoryClick(0);
        }
    };



    function AddAdminDocRecord(tb_Admin) {
        var datalist = CompanyDetailsService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetCompanyDocDetails();
                alert("Document Uploaded successfully.");
                $("#Comp_add").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;
            }
            else if (d.data.success === false) {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error Uploading Document.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }





    function EditAdminDocRecord(tb_Admin) {
        var datalist = CompanyDetailsService.AddEditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetCompanyDocDetails();
                alert("Document updated successfully.");
                $("#Comp_add").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;

            }
            else if (d.data.success === false) {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error Uploading Document.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    var UPLOAD_DOC = $('#DOC_DATA');

    var reader = new FileReader();
    var fileName;
    var contentType;

    UPLOAD_DOC.change(function () {
        // alert("Image Changed");
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
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/; //.gif|.bmp|.pdf)$/;

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

    var DOC_DATA = $('#DOC_DATA');
    var reader = new FileReader();
    var fileName;
    var contentType;

    DOC_DATA.change(function () {
        // alert("Image Changed");
        ReadUploadedFilesData($(this));
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
                $('#DOC_DATA_Perview').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

        reader.readAsDataURL(file[0]);
    }



    function getImageData(chooseimageFileUploader, tb_object) {
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

    //Bank
    function ClearBank() {
        $scope.COMPANY_ID = "";
        $scope.BANK_ID = "";
        $scope.BANK_NAME = "";
        $scope.IFSC_CODE = "";
        $scope.ACC_NO = "";
        $scope.ACC_HOLDER_NAME = "";
        $scope.BRANCH_NAME = "";
        $scope.Operation = "";

        $scope.AddPaymentBank.$setPristine(); // Set form to pristine state
        $scope.AddPaymentBank.$setUntouched();

    }

    $scope.AddBank = function () {
        $scope.AdminBank_Action = "Add Bank";

        ClearBank();
        $("#Comp_Bank").modal("show");
        //console.log($scope.AddPaymentBank);
    }

    $scope.EditBank = function (bank) {
        ClearBank();
        $scope.AdminBank_Action = "Update Bank";
        $scope.BANK_NAME = bank.BANK_NAME;
        $scope.BANK_ID = bank.B_ID;
        $scope.IFSC_CODE = bank.IFSC_CODE;
        $scope.ACC_NO = bank.ACC_NO;
        $scope.ACC_HOLDER_NAME = bank.ACC_HOLDER_NAME;
        $scope.BRANCH_NAME = bank.BRANCH_NAME;

        $("#Comp_Bank").modal("show");
    }

    $scope.AddBankAdmin = function () {
        $("#loader").css("display", '');

        if ($scope.AdminBank_Action === "Add Bank") {
            tb_Admin = {
                COMPANY_ID: $scope.COMPANY_ID,
                B_ID: $scope.BANK_ID,
                BANK_NAME: $scope.BANK_NAME,
                IFSC_CODE: $scope.IFSC_CODE,
                ACC_NO: $scope.ACC_NO,
                ACC_HOLDER_NAME: $scope.ACC_HOLDER_NAME,
                BRANCH_NAME: $scope.BRANCH_NAME,
                Operation: "Insert",

            };
            AddAdminBankRecord(tb_Admin);
            //$scope.OnCategoryClick(1);
        }
        else if ($scope.AdminBank_Action === "Update Bank") {
            tb_Admin = {
                COMPANY_ID: $scope.COMPANY_ID,
                B_ID: $scope.BANK_ID,
                BANK_NAME: $scope.BANK_NAME,
                IFSC_CODE: $scope.IFSC_CODE,
                ACC_NO: $scope.ACC_NO,
                ACC_HOLDER_NAME: $scope.ACC_HOLDER_NAME,
                BRANCH_NAME: $scope.BRANCH_NAME,
                Operation: "Update",

            };
            EditAdminBankRecord(tb_Admin);
            //$scope.OnCategoryClick(1);
        }
    };



    function AddAdminBankRecord(tb_Admin) {
        var datalist = CompanyDetailsService.AddEditBankAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                ClearBank(); GetAllBanks();
                alert("Bank details inserted successfully.");
                $("#Comp_Bank").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;

            }
            else if (d.data.success === false) {
                alert("Bank account already Exists!");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error inserting Bank details.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }





    function EditAdminBankRecord(tb_Admin) {
        var datalist = CompanyDetailsService.AddEditBankAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                ClearBank(); GetAllBanks();
                alert("Bank details updated successfully.");
                $("#Comp_Bank").modal("hide");
                $("#loader").css("display", 'none');
                //window.location.href = window.location.href;

            }
            else if (d.data.success === false) {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error updating Bank details.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }
    //Bank


    $scope.ChangeStatusBank = function (bank) {
        $("#loader").css("display", '');
        var getStatus = CompanyDetailsService.ChangeStatusBank(bank.B_ID);
        getStatus.then(function (response) {
            ClearBank(); GetAllBanks();
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };



    $scope.OnCategoryClick = function (id) {
        //alert(id);
        $(".catmenu_button_Desc").removeClass().addClass('catmenu_button_Desc catStyle_Desc');
        $('#' + id + '_catId_Desc').removeClass().addClass('catmenu_button_Desc catStyle_active_Desc');

        if (id === '0') {
            document.getElementById('Demoexample_0').style.display = "block";
            document.getElementById('Demoexample_1').style.display = "none";
            GetCompanyDocDetails();
        }
        else if (id === '1') {
            document.getElementById('Demoexample_0').style.display = "none";
            document.getElementById('Demoexample_1').style.display = "block";
            GetAllBanks();
        }
    }


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }
});