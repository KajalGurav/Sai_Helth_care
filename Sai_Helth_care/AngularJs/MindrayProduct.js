app.service("CategoryService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MindrayProduct/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/MindrayProduct/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MindrayProduct/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.GetCategory = function () {
        return $http.get("/Product/GetCategory");
    };
    this.GetadminById = function (id) {
        var response = $http({
            method: "GET",
            url: "/MindrayProduct/GetadminById",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };



    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/MindrayProduct/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Product/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

});

app.controller("ProductCtrl", function ($scope, CategoryService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetAllCategory();
    function GetAllCategory() {
        var getAdmin = CategoryService.GetCategory();
        getAdmin.then(function (response) {
            $scope.CategoryList = response.data;
        });
    }

    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = CategoryService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.ProductList = "";
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
        var getrecord = CategoryService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.ProductList = response.data;

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
        $scope.CAT_ID = "";
        $scope.P_ID = "";
        $scope.DESCRIPTION = "";
        $scope.CONFIGURATION = "";
        $scope.PRODUCT_NAME = "";
        $scope.HSN_CODE = "";
        $scope.PRODUCT_IMAGE = "";
        $("#product_photo").val("");
        CKEDITOR.instances.editor_AnswerEng.setData($scope.DESCRIPTION);
        CKEDITOR.instances.editor_AnswerEngConf.setData($scope.CONFIGURATION);

    }


    $scope.getAdmin = function (admin) {
        var getAdmin = CategoryService.GetadminById(admin.P_ID);
        getAdmin.then(function (response) {
            $scope._Party = response.data;
            $scope.CAT_ID = $scope._Party.CAT_ID;
            $scope.P_ID = $scope._Party.P_ID;
            $scope.PRODUCT_IMAGE = $scope._Party.PRODUCT_IMAGE;
            $scope.HSN_CODE = $scope._Party.HSN_CODE;
            //CKEDITOR.instances.editor_AnswerEng.setData($scope._Party.DESCRIPTION);
            //CKEDITOR.instances.editor_AnswerEngConf.setData($scope._Party.CONFIGURATION);
            //$scope.DESCRIPTION = $scope._Party.DESCRIPTION;
            //$scope.CONFIGURATION = $scope._Party.CONFIGURATION;
        });
    };

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Product";
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
        Clear();
        document.getElementById('divProfile').style.display = "none";
    };


    $scope.getForUpdate = function (admin) {
        var getAdmin = CategoryService.GetadminById(admin.P_ID);
        getAdmin.then(function (response) {
            $scope._Party = response.data;
            $scope.CAT_ID = $scope._Party.CAT_ID;
            $scope.P_ID = $scope._Party.P_ID;
            $scope.PRODUCT_NAME = $scope._Party.PRODUCT_NAME;
            $scope.HSN_CODE = $scope._Party.HSN_CODE;
            $scope.PRODUCT_IMAGE = "";
            $("#product_photo").val("");
            CKEDITOR.instances.editor_AnswerEng.setData($scope._Party.DESCRIPTION);
            CKEDITOR.instances.editor_AnswerEngConf.setData($scope._Party.CONFIGURATION);

            $scope.Admin_Action = "Update Product";
           
            $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
            document.getElementById('divProfile').style.display = "block";
        });

    };



    $scope.AddAdmin = function () {
        $("#loader").css("display", '');

        tb_Admin = {

            CAT_ID: $scope.CAT_ID, 
            P_ID: $scope.P_ID, //for update table
            PRODUCT_NAME: $scope.PRODUCT_NAME,
            HSN_CODE: $scope.HSN_CODE,
            DESCRIPTION: CKEDITOR.instances.editor_AnswerEng.getData(),
            CONFIGURATION: CKEDITOR.instances.editor_AnswerEngConf.getData(),
        };
        
        //if (CKEDITOR.instances.editor_AnswerEng.getData().length < 1) {
        //    alert("Product Description is required.");
        //    return false;
        //}
        if (CKEDITOR.instances.editor_AnswerEngConf.getData().length < 1) {
            alert("Product Configuration is required.");
            return false;
        }
        if ($scope.Admin_Action === "Add Product") {
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            tb_Admin.PRODUCT_IMAGE = tb_Admin.IsImageChoosen;
            // alert(tb_Admin.PRODUCT_IMAGE);

            if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === "No" || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Sorry... Invalid File") {
                alert("Sorry... Invalid File! Please Rename or upload another Image.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === "No" ||tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Wrong Image Size") {
                alert("Image should be of Dimension: 512 * 512 pixels.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === "No" || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Large Size") {
                alert("Please Select Image Less Than 500 KB Size.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === "No" || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Please Choose Image First") {
                alert("Product image is required.")
                $("#loader").css("display", 'none');
                return false;
            }
            else if ((tb_Admin.IsImageChoosen === "No" || tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.docSize == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")
                return false;
            }
            else if (tb_Admin.IsImageChoosen === "Yes"){
                AddAdminRecord(tb_Admin);
                
            }
            //AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Product") {
            tb_Admin = getImageData(Profile_photo, tb_Admin);
            tb_Admin.PRODUCT_IMAGE = tb_Admin.IsImageChoosen;
            //if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Sorry... Invalid File") {
            //    alert("Sorry... Invalid File! Please Rename or upload another Image.")
            //    $("#loader").css("display", 'none');
            //    return false;
            //}
            //else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Wrong Image Size") {
            //    alert("Image should be of Dimension: 512 * 512 pixels.")
            //    $("#loader").css("display", 'none');
            //    return false;
            //}
            //else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Large Size") {
            //    alert("Please Select Image Less Than 500 KB Size.")
            //    $("#loader").css("display", 'none');
            //    return false;
            //}
            //else if ((tb_Admin.PRODUCT_IMAGE === null || tb_Admin.PRODUCT_IMAGE === undefined) && tb_Admin.docSize == "Please Choose Image First") {
            //    alert("Product image is required.")
            //    $("#loader").css("display", 'none');
            //    return false;
            //}
            //else if (( tb_Admin.IsImageChoosen === null || tb_Admin.IsImageChoosen === undefined) && tb_Admin.docSize == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
            //    alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")
            //    return false;
            //}

            if (tb_Admin.IsImageChoosen === "Yes") {
                tb_Admin.PRODUCT_IMAGE = "Yes";
            }
            else {
                if (tb_Admin.docSize == "Sorry... Invalid File") {
                    alert("Sorry... Invalid File! Please Rename or upload another Image.")
                    $("#loader").css("display", 'none');
                    return false;
                }
                else if (tb_Admin.docSize == "Wrong Image Size") {
                    alert("Image should be of Dimension: 512 * 512 pixels.")
                    $("#loader").css("display", 'none');
                    return false;
                }
                else if (tb_Admin.docSize == "Large Size") {
                    alert("Please Select Image Less Than 500 KB Size.")
                    $("#loader").css("display", 'none');
                    return false;
                }
                else if (tb_Admin.docSize == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                    alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")
                    return false;
                }
                else {
                    tb_Admin.PRODUCT_IMAGE = $scope.PRODUCT_IMAGE;
                }
            }
            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
        var datalist = CategoryService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all mandatory fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }





    function EditAdminRecord(tb_Admin) {
        var datalist = CategoryService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Product updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Product already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all mandatory fields.");
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
        var getStatus = CategoryService.ChangeStatus(Admin.P_ID);
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



    var Profile_photo = $('#product_photo');
    var reader = new FileReader();
    var fileName;
    var contentType;



    Profile_photo.change(function () {
        //alert("Image Changed");
        ReadUploadedFilesData($(this));
    });

    var height;
    var width;

    function ReadUploadedFilesData(fileuploader) {
        height = 0;
        width = 0;
        var file = $(fileuploader[0].files);
        fileName = file[0].name;
        contentType = file[0].type;
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            //Validate the File Height and Width.

            image.onload = function () {

                width = this.width;
                height = this.height;
            };
                        
        };
    }

    function validateFileReader(fileuploader) {
        if (typeof (FileReader) !== "undefined") {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.pdf)$/;

            if (fileuploader.val() === '') {
                return "Please Choose Image First";
            }
            else {

                if (width !== 512 && height !== 512) {

                   return "Wrong Image Size" ;
                }

                var file = $(fileuploader[0].files);
                //if (regex.test(file[0].name.toLowerCase())) {


                //    var imageSize = Math.round(file[0].size / 1024);
                //    //Check Image Size
                //    if (imageSize < 2048) {
                //        return "SaveImage";
                //    }
                //    else {
                //        return 'Large Size';
                //        //return 'Please Select Image Less Than 5 MB Size';
                //    }

                //} else {
                //    return "Sorry... Invalid File";
                //}

                var imageSize = Math.round(file[0].size / 1024);
                //Check Image Size
                if (imageSize < 2048) {
                    return "SaveImage";
                }
                else {
                    return 'Large Size';
                    //return 'Please Select Image Less Than 5 MB Size';
                }
            }

        } else {
            return "Please Use Another Browser, This Browser is Not Supporting Image Uploader.";
        }
    }

    //function validateFileReader(fileuploader, callback) {
    //    if (typeof (FileReader) !== "undefined") {
    //        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    //        if (fileuploader.val() === '') {
    //            callback("Please Choose Image First") ;
    //        }
    //        else {
    //            var file = $(fileuploader[0].files);
    //            if (regex.test(file[0].name.toLowerCase())) {

    //                var imageSize = Math.round(file[0].size / 1024);


                    
    //                var reader = new FileReader();

    //                //Read the contents of Image File.
    //                reader.readAsDataURL(file[0]);
    //                reader.onload = function (e) {

    //                    //Initiate the JavaScript Image object.
    //                    var image = new Image();

    //                    //Set the Base64 string return from FileReader as source.
    //                    image.src = e.target.result;

    //                    //Validate the File Height and Width.

    //                    image.onload = function () {

    //                        var width = this.width;
    //                        var height = this.height;
    //                        if (width !== 512 && height !== 512) {

    //                            callback("Wrong Image Size") ;
    //                        }
    //                        //Check Image Size
    //                        else if (imageSize < 512) {
    //                            callback("SaveImage") ;
    //                        }
    //                        else {
    //                            callback("Large Size") ;
    //                        }
    //                    };
    //                };
                    

    //            } else {
    //                callback("Sorry... Invalid File") ;
    //            }
    //        }

    //    } else {
    //        callback("Please Use Another Browser, This Browser is Not Supporting Image Uploader.") ;
    //    }
    //}

    //function getImageData(chooseimageFileUploader, tb_object) {
    //    var result;
    //    validateFileReader(chooseimageFileUploader, function (val) {
    //        result = val;

    //        var IsImageChoosen = "No";
    //        if (result === "SaveImage") {
    //            IsImageChoosen = "Yes";
    //            // alert('success Save Image');
    //            var imageName = fileName.substring(0, fileName.lastIndexOf('.'));
    //            var imageExtension = '.' + fileName.substring(fileName.lastIndexOf('.') + 1);
    //            var imageBase64Data = reader.result;
    //            imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
    //        }
    //        tb_object.IsImageChoosen = IsImageChoosen;
    //        tb_object.ImageName = imageName;
    //        tb_object.ImageExtension = imageExtension;
    //        tb_object.ImageBase64Data = imageBase64Data;
    //        tb_object.docSize = result;
    //        return tb_object;
    //    });
    //}

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
        tb_object.docSize = result;
        return tb_object;
        
    }


    CKEDITOR.replace('editor_AnswerEng', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });
    CKEDITOR.replace('editor_AnswerEngConf', {
        //language: 'fr',
        uiColor: '#9AB8F3'
    });
});