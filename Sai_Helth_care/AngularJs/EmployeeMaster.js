app.service("EmployeeService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.GetCompany = function () {
        return $http.get("/Employee_Regi/GetCompany");
    };

    this.GetDepartment = function () {
        return $http.get("/Employee_Regi/GetDepartment");
    };

    this.GetDesignaton = function (id) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetDesignaton",
            params: {
                id: id
            }
        });
        return response;
    };

    this.GetState = function () {
        return $http.get("/Employee_Regi/GetState");
    };

    
    this.GetCity = function (id) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetCity",
            params: {
                id: id
            }
        });
        return response;
    };


    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };


    this.InsertAccess = function (tB_lab) {

        var request = $http({
            method: 'post',
            url: '/Employee_Regi/AddUpdate',
            data: tB_lab
        });
        return request;
    };

    this.getModuleUpdate1 = function (id) {
        var response = $http({
            method: "GET",
            url: "/Employee_Regi/getModuleUpdate1",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };

    this.ChangeStatus = function (id) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/ChangeStatus",
            params: {
                id: JSON.stringify(id)
            }
        });
        return response;
    };
});




app.controller("EmployeeCtrl", function ($scope, EmployeeService) {

    $("#loader").css("display", '');
   //$scope.IsSubmit = false;
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    $scope.STATE_SEARCH = null;
    GetTotalcount();
    GetCompany();
    


    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = EmployeeService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.EmployeeList = "";
              
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
            START_DATE: $("#STARTING_DATE1").val(),
            END_DATE: $("#ENDING_DATE1").val(),
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
        var getrecord = EmployeeService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.EmployeeList = response.data;

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

    $scope.GetData = function () {
        if ($("#STARTING_DATE1").val() == "" || $("#STARTING_DATE1").val() == undefined || $("#ENDING_DATE1").val() == "" || $("#ENDING_DATE1").val() == undefined) {
            alert("Please select date range.");
            return;
        }
        GetTotalcount();
    }


    function GetCompany() {
        var getdatereport1 = EmployeeService.GetCompany();
        getdatereport1.then(function (response) {
            $scope.CompanyList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }


    function GetDepartment() {
        var getdatereport1 = EmployeeService.GetDepartment();
        getdatereport1.then(function (response) {
            $scope.DepartmentList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    $scope.DepartmentChange = function () {
        //alert();
        GetAllDesignation();
    };

    function GetAllDesignation() {
        /*alert($scope.DEPARTMENT_ID);*/
        if ($scope.DEPARTMENT_ID === "" || $scope.DEPARTMENT_ID === null || $scope.DEPARTMENT_ID === undefined) {
            $scope.DesignationList = "";
        }
        else {
            var getAdmin = EmployeeService.GetDesignaton($scope.DEPARTMENT_ID);
            getAdmin.then(function (response) {
                $scope.DesignationList = response.data;

            });
        }
       
    }


    function GetState() {
        var getdatereport1 = EmployeeService.GetState();
        getdatereport1.then(function (response) {
            $scope.StateList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }

    //function GetAllState() {
    //    var getAdmin = EmployeeService.GetState();
    //    getAdmin.then(function (response) {
    //        $scope.StateList = response.data;
    //    });
    //}

    $scope.GetstateChange = function () {

        GetAllCity();
    };

    function GetAllCity() {
        if ($scope.STATE_ID === "" || $scope.STATE_ID === null || $scope.STATE_ID === undefined) {
            $scope.CityList = "";
        }
        else {
            var getAdmin = EmployeeService.GetCity($scope.STATE_ID);
            getAdmin.then(function (response) {
                $scope.CityList = response.data;

            });
        }
        
    }



    ///==============//==============//===========/




    function Clear() {
        $scope.EMP_ID = "";
        $scope.COMPANY_ID = "";
        $scope.EMP_NAME = "";
        $scope.CONTACT_NO = "";
        $scope.ALTERNATE_CONT_NO = "";
        $scope.EMAIL = "";
        $scope.ALTERNATE_EMAIL = "";
        $scope.EMP_DOB = "";
        $scope.DEPARTMENT_ID = null;
        $scope.DESIGNATION_ID = null;
        $scope.PERMENENT_ADDRESS = "";
        $scope.STATE_ID = null;
        $scope.CITY_ID = null;
        $scope.ZIP_CODE = "";
        $scope.SALERY_PER_MONTH = "";
        $scope.MARRIED_STATUS = "";
        $scope.PHYSICAL_DUSABILITY = "";
        $scope.BANK_NAME = "";
        $scope.ACCOUNT_NO = "";
        $scope.IFSC_CODE = "";
        $scope.PAN_CARD_NO = "";
        $scope.ADHAR_CARD_NO = "";
        $scope.PASSWORD = "";
        $scope.UPLOD_PAN_CARD = "";
        $scope.UPLOD_ADHAR_CARD = "";
        $scope.UPLOD_BANK_PASS = "";

        $('#UPLOD_ADHAR_CARD').val("");
        $('#UPLOD_PAN_CARD').val("");
        $('#UPLOD_BANK_PASS').val("");

        $('#UPLOD_ADHAR_CARD_PREVIEW').attr('src', "");
        $('#UPLOD_PAN_CARD_PREVIEW').attr('src', "");
        $('#UPLOD_BANK_PASS_PREVIEW').attr('src', "");
        
        $scope.EmployeeAddEdit.$setPristine();
        $scope.EmployeeAddEdit.$setUntouched();
    }


    $scope.AdminClick = function () {

        $scope.Admin_Action = "Add Employee";
        console.log($scope.EmployeeAddEdit.EMAIL);
        
        Clear();

        GetState();
        GetDepartment();

        var passwordInput = document.getElementById('PASSWORD');
        var eyeIcon = document.getElementById('eye-icon');

        passwordInput.type = 'password';
        eyeIcon.className = 'fa fa-eye';

        //$("#Admin_Addupdate").modal("show"); 
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");

        //document.getElementById('divProfile').style.display = "none";
        //document.getElementById('Profile1').style.display = "none";
        //document.getElementById('Profile2').style.display = "none";
    };


    $scope.getForUpdate = function (Admin) {
        Clear();

        

        var passwordInput = document.getElementById('PASSWORD');
        var eyeIcon = document.getElementById('eye-icon');

        passwordInput.type = 'password';
        eyeIcon.className = 'fa fa-eye';

        $scope.EMP_ID = Admin.EMP_ID;
        $scope.COMPANY_ID = Admin.COMPANY_ID;
        $scope.EMP_NAME = Admin.EMP_NAME;
        $scope.CONTACT_NO = Admin.CONTACT_NO;
        $scope.ALTERNATE_CONT_NO = Admin.ALTERNATE_CONT_NO;
        $scope.EMAIL = Admin.EMAIL;
        $scope.ALTERNATE_EMAIL = Admin.ALTERNATE_EMAIL;
        $scope.EMP_DOB = Admin.EMP_DOB;
        $scope.DEPARTMENT_ID = Admin.DEPARTMENT_ID;
        $scope.DESIGNATION_ID = Admin.DESIGNATION_ID;
        $scope.PERMENENT_ADDRESS = Admin.PERMENENT_ADDRESS;
        $scope.STATE_ID = Admin.STATE_ID;
        $scope.CITY_ID = Admin.CITY_ID;
        $scope.ZIP_CODE = parseInt(Admin.ZIP_CODE);
        $scope.SALERY_PER_MONTH = parseInt(Admin.SALERY_PER_MONTH);
        $scope.MARRIED_STATUS = Admin.MARRIED_STATUS;
        $scope.PHYSICAL_DUSABILITY = Admin.PHYSICAL_DUSABILITY;
        $scope.BANK_NAME = Admin.BANK_NAME;
        $scope.ACCOUNT_NO = parseInt(Admin.ACCOUNT_NO);
        $scope.IFSC_CODE = Admin.IFSC_CODE;
        $scope.PAN_CARD_NO = Admin.PAN_CARD_NO;
        $scope.ADHAR_CARD_NO = parseInt(Admin.ADHAR_CARD_NO);
        $scope.PASSWORD = Admin.PASSWORD;

        $('#UPLOD_ADHAR_CARD_PREVIEW').attr('src', "");
        $('#UPLOD_PAN_CARD_PREVIEW').attr('src', "");
        $('#UPLOD_BANK_PASS_PREVIEW').attr('src', "");

        $scope.UPLOD_ADHAR_CARD = Admin.UPLOD_ADHAR_CARD;
        $scope.UPLOD_PAN_CARD = Admin.UPLOD_PAN_CARD;
        $scope.UPLOD_BANK_PASS = Admin.UPLOD_BANK_PASS;


       
        GetCompany();
        GetAllCity();
        GetState();
        GetDepartment();
        GetAllDesignation();
        setTimeout(function myfunction() {

            $('#UPLOD_ADHAR_CARD_PREVIEW').attr('src', $scope.UPLOD_ADHAR_CARD);
            $('#UPLOD_PAN_CARD_PREVIEW').attr('src', $scope.UPLOD_PAN_CARD);
            $('#UPLOD_BANK_PASS_PREVIEW').attr('src', $scope.UPLOD_BANK_PASS);

        }, 2000);

        $scope.Admin_Action = "Update Employee";
       
        //$("#Admin_Addupdate").modal("show");
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
      
            
    };



    $scope.AddAdmin = function () {
        //$scope.IsSubmit = true;
        $("#loader").css("display", '');
        $scope.EMP_DOB = $("#EMP_DOB").val();

        if ($scope.EMP_DOB === "" || $scope.EMP_DOB === null || $scope.EMP_DOB === undefined) {
            alert("Select Date Of Birth");
            return;
        }

        if ($scope.MARRIED_STATUS === "" || $scope.MARRIED_STATUS === null || $scope.MARRIED_STATUS === undefined) {
            alert("Select Married Status");
            return;
        }

        if ($scope.PHYSICAL_DUSABILITY === "" || $scope.PHYSICAL_DUSABILITY === null || $scope.PHYSICAL_DUSABILITY === undefined) {
            alert("Select Physical Disability");
            return;
        }

        tb_Admin = {
            EMP_ID: $scope.EMP_ID, 
            COMPANY_ID: $scope.COMPANY_ID,
            EMP_NAME: $scope.EMP_NAME,
            CONTACT_NO: $scope.CONTACT_NO,
            ALTERNATE_CONT_NO: $scope.ALTERNATE_CONT_NO,
            EMAIL: $scope.EMAIL,
            ALTERNATE_EMAIL: $scope.ALTERNATE_EMAIL,
            EMP_DOB: $scope.EMP_DOB,
            DEPARTMENT_ID: $scope.DEPARTMENT_ID,
            DESIGNATION_ID: $scope.DESIGNATION_ID,
            PERMENENT_ADDRESS: $scope.PERMENENT_ADDRESS,
            STATE_ID: $scope.STATE_ID,
            CITY_ID: $scope.CITY_ID,
            ZIP_CODE: $scope.ZIP_CODE,
            SALERY_PER_MONTH: $scope.SALERY_PER_MONTH,
            MARRIED_STATUS: $scope.MARRIED_STATUS,
            PHYSICAL_DUSABILITY: $scope.PHYSICAL_DUSABILITY,
            BANK_NAME: $scope.BANK_NAME,
            ACCOUNT_NO: $scope.ACCOUNT_NO,
            IFSC_CODE: $scope.IFSC_CODE,
         //   UPLOD_BANK_PASS: $scope.UPLOD_BANK_PASS,
            PAN_CARD_NO: $scope.PAN_CARD_NO,
            ADHAR_CARD_NO: $scope.ADHAR_CARD_NO,
            PASSWORD: $scope.PASSWORD,
          //  UPLOD_ADHAR_CARD: $scope.UPLOD_ADHAR_CARD,
           // UPLOD_PAN_CARD: $scope.UPLOD_PAN_CARD,

        };

        if ($scope.Admin_Action === "Add Employee") {
            tb_Admin = getImageData(UPLOD_ADHAR_CARD, tb_Admin, 'Aadharcard');
            tb_Admin.UPLOD_ADHAR_CARD = tb_Admin.IsImageChoosen;

            if (tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") {
                alert("Aadhar card document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Large Size") {
                alert("Please Upload Aadharcard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            tb_Admin = getImageData(UPLOD_PAN_CARD, tb_Admin, 'Pancard');
            tb_Admin.UPLOD_PAN_CARD = tb_Admin.IsImageChoosenPancard;


            if (tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") {
                alert("PAN document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Large Size") {
                alert("Please Upload Pancard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            tb_Admin = getImageData(UPLOD_BANK_PASS, tb_Admin, 'BankPassBook');
            tb_Admin.UPLOD_BANK_PASS = tb_Admin.IsImageChoosenBankPassbook;

            if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Large Size") {
                alert("Please Upload Bank PassBook Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }
            
            //else if (tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") {
            //    alert("Current image is required.")

            //    $("#loader").css("display", 'none');

            //}
            AddAdminRecord(tb_Admin);
            //AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Employee") {
            tb_Admin = getImageData(UPLOD_ADHAR_CARD, tb_Admin, 'Aadharcard');
            tb_Admin.UPLOD_ADHAR_CARD = tb_Admin.IsImageChoosen;

            if (($scope.UPLOD_ADHAR_CARD !== null || $scope.UPLOD_ADHAR_CARD !== "No" || $scope.UPLOD_ADHAR_CARD !== "undefined") && (tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined")) {
                tb_Admin.UPLOD_ADHAR_CARD = $scope.UPLOD_ADHAR_CARD;
            }
            else if (($scope.UPLOD_ADHAR_CARD === null || $scope.UPLOD_ADHAR_CARD === "No" || $scope.UPLOD_ADHAR_CARD === "undefined") &&(tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined")) {
                alert("Aadhar card document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Large Size") {
                alert("Please Upload Aadharcard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_ADHAR_CARD === null || tb_Admin.UPLOD_ADHAR_CARD === "No" || tb_Admin.UPLOD_ADHAR_CARD === "undefined") && tb_Admin.Adharcard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }


            tb_Admin = getImageData(UPLOD_PAN_CARD, tb_Admin, 'Pancard');
            tb_Admin.UPLOD_PAN_CARD = tb_Admin.IsImageChoosenPancard;

            if (($scope.UPLOD_PAN_CARD !== null || $scope.UPLOD_PAN_CARD !== "No" || $scope.UPLOD_PAN_CARD !== "undefined") && (tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined")) {
                tb_Admin.UPLOD_PAN_CARD = $scope.UPLOD_PAN_CARD;
            }
            else if (($scope.UPLOD_PAN_CARD === null || $scope.UPLOD_PAN_CARD === "No" || $scope.UPLOD_PAN_CARD === "undefined") &&(tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined")) {
                alert("PAN document is required.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Large Size") {
                alert("Please Upload Pancard Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_PAN_CARD === null || tb_Admin.UPLOD_PAN_CARD === "No" || tb_Admin.UPLOD_PAN_CARD === "undefined") && tb_Admin.Pancard_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            tb_Admin = getImageData(UPLOD_BANK_PASS, tb_Admin, 'BankPassBook');
            tb_Admin.UPLOD_BANK_PASS = tb_Admin.IsImageChoosenBankPassbook;

            if (($scope.UPLOD_BANK_PASS !== null || $scope.UPLOD_BANK_PASS !== "No" || $scope.UPLOD_BANK_PASS !== "undefined") && (tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined")) {
                tb_Admin.UPLOD_BANK_PASS = $scope.UPLOD_BANK_PASS;
            }
            else if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Large Size") {
                alert("Please Upload Bank PassBook Image Less Than 2 MB Size.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Sorry... Invalid File") {
                alert("Sorry... Invalid File.")

                $("#loader").css("display", 'none');
                return;
            }
            else if ((tb_Admin.UPLOD_BANK_PASS === null || tb_Admin.UPLOD_BANK_PASS === "No" || tb_Admin.UPLOD_BANK_PASS === "undefined") && tb_Admin.BankPassbook_Size == "Please Use Another Browser, This Browser is Not Supporting Image Uploader.") {
                alert("Please Use Another Browser, This Browser is Not Supporting Image Uploader.")

                $("#loader").css("display", 'none');
                return;
            }

            EditAdminRecord(tb_Admin);
        }
    };



    function AddAdminRecord(tb_Admin) {
      //  alert('dfg');
        var datalist = EmployeeService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Employee added successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Employee already added.");
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
        var datalist = EmployeeService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Employee updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Employee already added.");
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
        var getStatus = EmployeeService.ChangeStatus(Admin.EMP_ID);
        getStatus.then(function (response) {
            Clear(); GetRecordbyPaging();
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };



    var UPLOD_ADHAR_CARD = $('#UPLOD_ADHAR_CARD');
    var UPLOD_PAN_CARD = $('#UPLOD_PAN_CARD');
    var UPLOD_BANK_PASS = $('#UPLOD_BANK_PASS');



    ///adhar
    var reader = new FileReader();
    var fileName;
    var contentType;

    ///driving
    var Drivingreader = new FileReader();
    var DrivingfileName;
    var DrivingcontentType;



    ///Pancard
    var Pancardreader = new FileReader();
    var PancardfileName;
    var PancardcontentType;



    UPLOD_ADHAR_CARD.change(function () {
        // alert("Image Changed");
        ReadUploadedFilesData($(this));
    });

    UPLOD_PAN_CARD.change(function () {
        //alert("Image Changed");
        PancardReadUploadedFilesData($(this));
        
    });


    UPLOD_BANK_PASS.change(function () {
        //alert("Image Changed");
        DrivingReadUploadedFilesData($(this));
    });

    ///adharcvard
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
                $('#UPLOD_ADHAR_CARD_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL
            
        }

        reader.readAsDataURL(file[0]);
    }

    ///Driving
    function DrivingReadUploadedFilesData(fileuploader) {
        var Drivingfile = $(fileuploader[0].files);
        DrivingfileName = Drivingfile[0].name;
        DrivingcontentType = Drivingfile[0].type;

        if (Drivingfile[0]) {
            // Create a FileReader
           

            // Set the callback function when the file is loaded
            Drivingreader.onload = function (readerEvent) {
                // Set the preview image source
                $('#UPLOD_BANK_PASS_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }

        Drivingreader.readAsDataURL(Drivingfile[0]);


    }


    ///Pancard
    function PancardReadUploadedFilesData(fileuploader) {
        var Pancardfile = $(fileuploader[0].files);
        PancardfileName = Pancardfile[0].name;
        PancardcontentType = Pancardfile[0].type;

        if (Pancardfile[0]) {
            // Create a FileReader
            
            // Set the callback function when the file is loaded
            Pancardreader.onload = function (readerEvent) {
                // Set the preview image source
                $('#UPLOD_PAN_CARD_PREVIEW').attr('src', readerEvent.target.result);
            };

            // Read the file as a Data URL

        }
        Pancardreader.readAsDataURL(Pancardfile[0]);
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


        if (Document_Type === "Aadharcard") {
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
        else if (Document_Type === "BankPassBook") {
            var result = validateFileReader(chooseimageFileUploader);
            var IsImageChoosenBankPassbook = "No";
            //alert(result);
            if (result === "SaveImage") {
                IsImageChoosenBankPassbook = "Yes";
                // alert('Driving');
                var imageName = DrivingfileName.substring(0, DrivingfileName.lastIndexOf('.'));
                var imageExtension = '.' + DrivingfileName.substring(DrivingfileName.lastIndexOf('.') + 1);
                var imageBase64Data = Drivingreader.result;
                imageBase64Data = imageBase64Data.split(';')[1].replace("base64,", "");
            }
            else {
                result === "Large Size";
            }
            // alert(IsImageChoosenBankPassbook);
            tb_object.IsImageChoosenBankPassbook = IsImageChoosenBankPassbook;
            tb_object.ImageName1 = imageName;
            tb_object.ImageExtension1 = imageExtension;
            tb_object.ImageBase64Data1 = imageBase64Data;
            tb_object.BankPassbook_Size = result;
            return tb_object;
        }
        else if (Document_Type === "Pancard") {
            var result = validateFileReader(chooseimageFileUploader);
            var IsImageChoosenPancard = "No";
            //alert(result);
            if (result === "SaveImage") {
                IsImageChoosenPancard = "Yes";
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
            tb_object.IsImageChoosenPancard = IsImageChoosenPancard;
            tb_object.ImageName2 = imageName;
            tb_object.ImageExtension2 = imageExtension;
            tb_object.ImageBase64Data2 = imageBase64Data;
            tb_object.Pancard_Size = result;
            return tb_object;
        }

    }




    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

///////////////////////////Admin Permission Model//////////////////////////////////////

    $scope.AddUpdate1 = function () {

        $("#loader").css("display", '');

        $scope.Customer_Master = $("#Customer_Master").is(":checked");
        $scope.Regular_Customer = $("#Regular_Customer").is(":checked");
        $scope.AERB_Customer = $("#AERB_Customer").is(":checked");
        $scope.Medtronic_Customer = $("#Medtronic_Customer").is(":checked");
        $scope.Mindray_Customer = $("#Mindray_Customer").is(":checked");

        $scope.Customer_Service = $("#Customer_Service").is(":checked");
        $scope.Service_Call_Assign = $("#Service_Call_Assign").is(":checked");
        $scope.Regular = $("#Regular").is(":checked");
        $scope.AERB = $("#AERB").is(":checked");

        $scope.Medtronic = $("#Medtronic").is(":checked");
        $scope.Mindray = $("#Mindray").is(":checked");
        $scope.Sales_Lead = $("#Sales_Lead").is(":checked");
        $scope.Regular_Product_Master = $("#Regular_Product_Master").is(":checked");

        $scope.Category = $("#Category").is(":checked");
        $scope.Manufacturer = $("#Manufacturer").is(":checked");
        $scope.Regular_Product = $("#Regular_Product").is(":checked");
        $scope.Spare_Part = $("#Spare_Part").is(":checked");

        $scope.URD_Product_Purchase = $("#URD_Product_Purchase").is(":checked");
        $scope.Standard_Accessories = $("#Standard_Accessories").is(":checked");
        $scope.Mindray_Product_Master = $("#Mindray_Product_Master").is(":checked");
        $scope.Mindray_Product = $("#Mindray_Product").is(":checked");
        $scope.Probe_Specifications = $("#Probe_Specifications").is(":checked");
        $scope.Medtronic_Products_List = $("#Medtronic_Products_List").is(":checked");

        $scope.Medtronic_Product = $("#Medtronic_Product").is(":checked");
        $scope.Main_System = $("#Main_System").is(":checked");
        $scope.Attachments = $("#Attachments").is(":checked");
        $scope.Tools = $("#Tools").is(":checked");
        $scope.Incentive = $("#Incentive").is(":checked");
        $scope.Incentive_Master = $("#Incentive_Master").is(":checked");

        $scope.Incentive_Scheme = $("#Incentive_Scheme").is(":checked");
        $scope.Quotation_Master = $("#Quotation_Master").is(":checked");
        $scope.Regular_Quotation = $("#Regular_Quotation").is(":checked");
        $scope.AERB_Quotation = $("#AERB_Quotation").is(":checked");
        $scope.Medtronic_Quotation = $("#Medtronic_Quotation").is(":checked");
        $scope.Mindray_Quotation = $("#Mindray_Quotation").is(":checked");

        $scope.Report_Master = $("#Report_Master").is(":checked");
        $scope.Attendance_Report = $("#Attendance_Report").is(":checked");
        $scope.Leave_Report = $("#Leave_Report").is(":checked");
        $scope.Monthly_Salary_Report = $("#Monthly_Salary_Report").is(":checked");
        $scope.Daily_Activity = $("#Daily_Activity").is(":checked");
        $scope.Delivery_Challan = $("#Delivery_Challan").is(":checked");
        $scope.Regular_DC = $("#Regular_DC").is(":checked");
        $scope.AERB_DC = $("#AERB_DC").is(":checked");
        $scope.Medtronic_DC = $("#Medtronic_DC").is(":checked");
        $scope.Mindray_DC = $("#Mindray_DC").is(":checked");
        $scope.AMC_CMC_Master = $("#AMC_CMC_Master").is(":checked");
        $scope.AMC_CMC_Regular = $("#AMC_CMC_Regular").is(":checked");
        $scope.AMC_CMC_AERB = $("#AMC_CMC_AERB").is(":checked");

        $scope.AMC_CMC_Medtronic = $("#AMC_CMC_Medtronic").is(":checked");
        $scope.AMC_CMC_Mindray = $("#AMC_CMC_Mindray").is(":checked");
        $scope.Payment_Receipt = $("#Payment_Receipt").is(":checked");
        $scope.Payment_Receipt_Regular = $("#Payment_Receipt_Regular").is(":checked");
        $scope.Payment_Receipt_AERB = $("#Payment_Receipt_AERB").is(":checked");
        $scope.Payment_Receipt_Medtronic = $("#Payment_Receipt_Medtronic").is(":checked");
        $scope.Payment_Receipt_Mindray = $("#Payment_Receipt_Mindray").is(":checked");
        $scope.Salary_Wages = $("#Salary_Wages").is(":checked");
        $scope.Salary_Increment = $("#Salary_Increment").is(":checked");
        $scope.Advance_Salary = $("#Advance_Salary").is(":checked");
        $scope.Employee_Loan = $("#Employee_Loan").is(":checked");
        $scope.Setting = $("#Setting").is(":checked");
        $scope.Company_Master = $("#Company_Master").is(":checked");

        $scope.Employee_Registration = $("#Employee_Registration").is(":checked");
        $scope.Department_Master = $("#Department_Master").is(":checked");

        $scope.Designation_Master = $("#Designation_Master").is(":checked");
        $scope.Solution_Bank = $("#Solution_Bank").is(":checked");

        $scope.City_Master = $("#City_Master").is(":checked");
        $scope.Vender_Registration = $("#Vender_Registration").is(":checked");


        $scope.Invoice_Master = $("#Invoice_Master").is(":checked");
        $scope.Invoice_Regular = $("#Invoice_Regular").is(":checked");

        $scope.Invoice_AERB = $("#Invoice_AERB").is(":checked");
        $scope.Invoice_Medtronic = $("#Invoice_Medtronic").is(":checked");

        $scope.Invoice_Mindray = $("#Invoice_Mindray").is(":checked");

        $scope.Vendor_PO_Master = $("#Vendor_PO_Master").is(":checked");
        $scope.Vendor_PO_Regular = $("#Vendor_PO_Regular").is(":checked");
        $scope.Vendor_PO_AERB = $("#Vendor_PO_AERB").is(":checked");
        $scope.Vendor_PO_Medtronic = $("#Vendor_PO_Medtronic").is(":checked");
        $scope.Vendor_PO_Mindray = $("#Vendor_PO_Mindray").is(":checked");

        $scope.Employee_Expense_Master = $("#Employee_Expense_Master").is(":checked");


        tb_Admin = {
            EMP_ID: $scope.EMP_ID,
            Customer_Master: $scope.Customer_Master, //for update table
            Regular_Customer: $scope.Regular_Customer,
            AERB_Customer: $scope.AERB_Customer,
            Medtronic_Customer: $scope.Medtronic_Customer,
            Mindray_Customer: $scope.Mindray_Customer,
            Customer_Service: $scope.Customer_Service,

            Service_Call_Assign: $scope.Service_Call_Assign,
            Regular: $scope.Regular,
            AERB: $scope.AERB,
            Medtronic: $scope.Medtronic,

            Mindray: $scope.Mindray,
            Sales_Lead: $scope.Sales_Lead,
            Regular_Product_Master: $scope.Regular_Product_Master,
            Category: $scope.Category,

            Manufacturer: $scope.Manufacturer,
            Regular_Product: $scope.Regular_Product,
            Spare_Part: $scope.Spare_Part,
            URD_Product_Purchase: $scope.URD_Product_Purchase,

            Standard_Accessories: $scope.Standard_Accessories,
            Mindray_Product_Master: $scope.Mindray_Product_Master,
            Mindray_Product: $scope.Mindray_Product,
            Probe_Specifications: $scope.Probe_Specifications,
            Medtronic_Products_List: $scope.Medtronic_Products_List,
            Medtronic_Product: $scope.Medtronic_Product,

            Main_System: $scope.Main_System,
            Attachments: $scope.Attachments,
            Tools: $scope.Tools,
            Incentive: $scope.Incentive,
            Incentive_Master: $scope.Incentive_Master,
            Incentive_Scheme: $scope.Incentive_Scheme,

            Quotation_Master: $scope.Quotation_Master,
            Regular_Quotation: $scope.Regular_Quotation,
            AERB_Quotation: $scope.AERB_Quotation,
            Medtronic_Quotation: $scope.Medtronic_Quotation,
            Mindray_Quotation: $scope.Mindray_Quotation,
            Report_Master: $scope.Report_Master,

            Attendance_Report: $scope.Attendance_Report,
            Leave_Report: $scope.Leave_Report,
            Monthly_Salary_Report: $scope.Monthly_Salary_Report,
            Daily_Activity: $scope.Daily_Activity,
            Delivery_Challan: $scope.Delivery_Challan,

            Regular_DC: $scope.Regular_DC,
            AERB_DC: $scope.AERB_DC,
            Medtronic_DC: $scope.Medtronic_DC,
            Mindray_DC: $scope.Mindray_DC,
            AMC_CMC_Master: $scope.AMC_CMC_Master,
            AMC_CMC_Regular: $scope.AMC_CMC_Regular,
            AMC_CMC_AERB: $scope.AMC_CMC_AERB,
            AMC_CMC_Medtronic: $scope.AMC_CMC_Medtronic,

            AMC_CMC_Mindray: $scope.AMC_CMC_Mindray,
            Payment_Receipt: $scope.Payment_Receipt,

            Payment_Receipt_Regular: $scope.Payment_Receipt_Regular,
            Payment_Receipt_AERB: $scope.Payment_Receipt_AERB,
            Payment_Receipt_Medtronic: $scope.Payment_Receipt_Medtronic,
            Payment_Receipt_Mindray: $scope.Payment_Receipt_Mindray,
            Salary_Wages: $scope.Salary_Wages,
            Salary_Increment: $scope.Salary_Increment,
            Advance_Salary: $scope.Advance_Salary,
            Employee_Loan: $scope.Employee_Loan,

            Setting: $scope.Setting,
            Company_Master: $scope.Company_Master,

            Employee_Registration: $scope.Employee_Registration,
            Department_Master: $scope.Department_Master,
            Designation_Master: $scope.Designation_Master,
            Solution_Bank: $scope.Solution_Bank,
            City_Master: $scope.City_Master,
            Vender_Registration: $scope.Vender_Registration,

            Invoice_Master: $scope.Invoice_Master,
            Invoice_Regular: $scope.Invoice_Regular,
            Invoice_AERB: $scope.Invoice_AERB,
            Invoice_Medtronic: $scope.Invoice_Medtronic,
            Invoice_Mindray: $scope.Invoice_Mindray,

            Vendor_PO_Master: $scope.Vendor_PO_Master,
            Vendor_PO_Regular: $scope.Vendor_PO_Regular,
            Vendor_PO_AERB: $scope.Vendor_PO_AERB,
            Vendor_PO_Medtronic: $scope.Vendor_PO_Medtronic,
            Vendor_PO_Mindray: $scope.Vendor_PO_Mindray,

            Employee_Expense_Master: $scope.Employee_Expense_Master
        };

        var datalist = EmployeeService.InsertAccess(tb_Admin);

        datalist.then(function (d) {
            if (d.data.success === 1) {
                alert("Permission update successfully.");
                location.reload();

                $("#Module").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === -1) {
                alert("Permission not update.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error.");
                $("#loader").css("display", 'none');
            }
        },
            function () {
                $("#loader").css("display", 'none');
                alert("Error.");
            });
    };


    $scope.GetAdminPermision = function (admin) {
        $("#Module").modal({ backdrop: 'static', keyboard: false }).modal("show");

        var getAdmin = EmployeeService.getModuleUpdate1(admin.EMP_ID);
        getAdmin.then(function (response) {
            $scope._Permission = response.data;
            $scope.EMP_ID = admin.EMP_ID;


            const fieldToExclude = 'EMP_ID';

            const isSelectAll = Object.keys($scope._Permission).every(key => {
                const value = $scope._Permission[key];
                return key === fieldToExclude || (value === 'True' || value === null || value === '' || value === undefined);

            });

            if (isSelectAll) {
                $('#SelectAll').prop('checked', false);
            }
            else {
                $('#SelectAll').prop('checked', true);
            }

            $scope.Customer_Master = $scope._Permission.Customer_Master;
            if ($scope.Customer_Master === "True") {
                $('#Customer_Master').prop('checked', true);
            }
            else {
                $('#Customer_Master').prop('checked', false);
            }


            $scope.Regular_Customer = $scope._Permission.Regular_Customer;
            if ($scope.Regular_Customer === "True") {
                $('#Regular_Customer').prop('checked', true);
            }
            else {
                $('#Regular_Customer').prop('checked', false);
            }

            $scope.AERB_Customer = $scope._Permission.AERB_Customer;
            if ($scope.AERB_Customer === "True") {
                $('#AERB_Customer').prop('checked', true);
            }
            else {
                $('#AERB_Customer').prop('checked', false);
            }

            $scope.Medtronic_Customer = $scope._Permission.Medtronic_Customer;
            if ($scope.Medtronic_Customer === "True") {
                $('#Medtronic_Customer').prop('checked', true);
            }
            else {
                $('#Medtronic_Customer').prop('checked', false);
            }

            $scope.Mindray_Customer = $scope._Permission.Mindray_Customer;
            if ($scope.Mindray_Customer === "True") {
                $('#Mindray_Customer').prop('checked', true);
            }
            else {
                $('#Mindray_Customer').prop('checked', false);
            }


            $scope.Customer_Service = $scope._Permission.Customer_Service;
            if ($scope.Customer_Service === "True") {
                $('#Customer_Service').prop('checked', true);
            }
            else {
                $('#Customer_Service').prop('checked', false);
            }


            $scope.Service_Call_Assign = $scope._Permission.Service_Call_Assign;
            if ($scope.Service_Call_Assign === "True") {
                $('#Service_Call_Assign').prop('checked', true);
            }
            else {
                $('#Service_Call_Assign').prop('checked', false);
            }


            $scope.Regular = $scope._Permission.Regular;
            if ($scope.Regular === "True") {
                $('#Regular').prop('checked', true);
            }
            else {
                $('#Regular').prop('checked', false);
            }

            $scope.AERB = $scope._Permission.AERB;
            if ($scope.AERB === "True") {
                $('#AERB').prop('checked', true);
            }
            else {
                $('#AERB').prop('checked', false);
            }

            ///////////////////////////////////////////////////////////////////////////////////
            $scope.Medtronic = $scope._Permission.Medtronic;
            if ($scope.Medtronic === "True") {
                $('#Medtronic').prop('checked', true);
            }
            else {
                $('#Medtronic').prop('checked', false);
            }


            $scope.Mindray = $scope._Permission.Mindray;
            if ($scope.Mindray === "True") {
                $('#Mindray').prop('checked', true);
            }
            else {
                $('#Mindray').prop('checked', false);
            }


            $scope.Sales_Lead = $scope._Permission.Sales_Lead;
            if ($scope.Sales_Lead === "True") {
                $('#Sales_Lead').prop('checked', true);
            }
            else {
                $('#Sales_Lead').prop('checked', false);
            }

            $scope.Regular_Product_Master = $scope._Permission.Regular_Product_Master;
            if ($scope.Regular_Product_Master === "True") {
                $('#Regular_Product_Master').prop('checked', true);
            }
            else {
                $('#Regular_Product_Master').prop('checked', false);
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////

            $scope.Category = $scope._Permission.Category;
            if ($scope.Category === "True") {
                $('#Category').prop('checked', true);
            }
            else {
                $('#Category').prop('checked', false);
            }


            $scope.Manufacturer = $scope._Permission.Manufacturer;
            if ($scope.Manufacturer === "True") {
                $('#Manufacturer').prop('checked', true);
            }
            else {
                $('#Manufacturer').prop('checked', false);
            }


            $scope.Regular_Product = $scope._Permission.Regular_Product;
            if ($scope.Regular_Product === "True") {
                $('#Regular_Product').prop('checked', true);
            }
            else {
                $('#Regular_Product').prop('checked', false);
            }

            $scope.Spare_Part = $scope._Permission.Spare_Part;
            if ($scope.Spare_Part === "True") {
                $('#Spare_Part').prop('checked', true);
            }
            else {
                $('#Spare_Part').prop('checked', false);
            }
            //////////////////////////////////////////////////////////////////////////////
            $scope.URD_Product_Purchase = $scope._Permission.URD_Product_Purchase;
            if ($scope.URD_Product_Purchase === "True") {
                $('#URD_Product_Purchase').prop('checked', true);
            }
            else {
                $('#URD_Product_Purchase').prop('checked', false);
            }

            $scope.Standard_Accessories = $scope._Permission.Standard_Accessories;
            if ($scope.Standard_Accessories === "True") {
                $('#Standard_Accessories').prop('checked', true);
            }
            else {
                $('#Standard_Accessories').prop('checked', false);
            }


            $scope.Mindray_Product_Master = $scope._Permission.Mindray_Product_Master;
            if ($scope.Mindray_Product_Master === "True") {
                $('#Mindray_Product_Master').prop('checked', true);
            }
            else {
                $('#Mindray_Product_Master').prop('checked', false);
            }


            $scope.Mindray_Product = $scope._Permission.Mindray_Product;
            if ($scope.Mindray_Product === "True") {
                $('#Mindray_Product').prop('checked', true);
            }
            else {
                $('#Mindray_Product').prop('checked', false);
            }



            $scope.Probe_Specifications = $scope._Permission.Probe_Specifications;
            //alert($scope.NO_ACTIVITY);
            if ($scope.Probe_Specifications === "True") {
                $('#Probe_Specifications').prop('checked', true);
            }
            else {
                $('#Probe_Specifications').prop('checked', false);
            }


            $scope.Medtronic_Products_List = $scope._Permission.Medtronic_Products_List;
            if ($scope.Medtronic_Products_List === "True") {
                $('#Medtronic_Products_List').prop('checked', true);
            }
            else {
                $('#Medtronic_Products_List').prop('checked', false);
            }


            $scope.Medtronic_Product = $scope._Permission.Medtronic_Product;
            if ($scope.Medtronic_Product === "True") {
                $('#Medtronic_Product').prop('checked', true);
            }
            else {
                $('#Medtronic_Product').prop('checked', false);
            }


            $scope.Main_System = $scope._Permission.Main_System;
            if ($scope.Main_System === "True") {
                $('#Main_System').prop('checked', true);
            }
            else {
                $('#Main_System').prop('checked', false);
            }

            $scope.Attachments = $scope._Permission.Attachments;
            if ($scope.Attachments === "True") {
                $('#Attachments').prop('checked', true);
            }
            else {
                $('#Attachments').prop('checked', false);
            }


            $scope.Tools = $scope._Permission.Tools;
            if ($scope.Tools === "True") {
                $('#Tools').prop('checked', true);
            }
            else {
                $('#Tools').prop('checked', false);
            }


            $scope.Incentive = $scope._Permission.Incentive;
            if ($scope.Incentive === "True") {
                $('#Incentive').prop('checked', true);
            }
            else {
                $('#Incentive').prop('checked', false);
            }


            $scope.Incentive_Master = $scope._Permission.Incentive_Master;
            if ($scope.Incentive_Master === "True") {
                $('#Incentive_Master').prop('checked', true);
            }
            else {
                $('#Incentive_Master').prop('checked', false);
            }


            $scope.Incentive_Scheme = $scope._Permission.Incentive_Scheme;
            if ($scope.Incentive_Scheme === "True") {
                $('#Incentive_Scheme').prop('checked', true);
            }
            else {
                $('#Incentive_Scheme').prop('checked', false);
            }


            $scope.Quotation_Master = $scope._Permission.Quotation_Master;
            if ($scope.Quotation_Master === "True") {
                $('#Quotation_Master').prop('checked', true);
            }
            else {
                $('#Quotation_Master').prop('checked', false);
            }


            $scope.Regular_Quotation = $scope._Permission.Regular_Quotation;
            if ($scope.Regular_Quotation === "True") {
                $('#Regular_Quotation').prop('checked', true);
            }
            else {
                $('#Regular_Quotation').prop('checked', false);
            }


            $('#AERB_Quotation').prop('checked', true);
            $scope.AERB_Quotation = $scope._Permission.AERB_Quotation;
            if ($scope.AERB_Quotation === "True") {
            }
            else {
                $('#AERB_Quotation').prop('checked', false);
            }


            $scope.Medtronic_Quotation = $scope._Permission.Medtronic_Quotation;
            if ($scope.Medtronic_Quotation === "True") {
                $('#Medtronic_Quotation').prop('checked', true);
            }
            else {
                $('#Medtronic_Quotation').prop('checked', false);
            }


            $scope.Mindray_Quotation = $scope._Permission.Mindray_Quotation;
            if ($scope.Mindray_Quotation === "True") {
                $('#Mindray_Quotation').prop('checked', true);
            }
            else {
                $('#Mindray_Quotation').prop('checked', false);
            }




            $scope.Report_Master = $scope._Permission.Report_Master;
            if ($scope.Report_Master === "True") {
                $('#Report_Master').prop('checked', true);
            }
            else {
                $('#Report_Master').prop('checked', false);
            }

            $scope.Attendance_Report = $scope._Permission.Attendance_Report;
            if ($scope.Attendance_Report === "True") {
                $('#Attendance_Report').prop('checked', true);
            }
            else {
                $('#Attendance_Report').prop('checked', false);
            }

            $scope.Leave_Report = $scope._Permission.Leave_Report;
            if ($scope.Leave_Report === "True") {
                $('#Leave_Report').prop('checked', true);
            }
            else {
                $('#Leave_Report').prop('checked', false);
            }


            $scope.Monthly_Salary_Report = $scope._Permission.Monthly_Salary_Report;
            if ($scope.Monthly_Salary_Report === "True") {
                $('#Monthly_Salary_Report').prop('checked', true);
            }
            else {
                $('#Monthly_Salary_Report').prop('checked', false);
            }


            $scope.Daily_Activity = $scope._Permission.Daily_Activity;
            if ($scope.Daily_Activity === "True") {
                $('#Daily_Activity').prop('checked', true);
            }
            else {
                $('#Daily_Activity').prop('checked', false);
            }


            $scope.Delivery_Challan = $scope._Permission.Delivery_Challan;
            if ($scope.Delivery_Challan === "True") {
                $('#Delivery_Challan').prop('checked', true);
            }
            else {
                $('#Delivery_Challan').prop('checked', false);
            }


            $scope.Regular_DC = $scope._Permission.Regular_DC;
            if ($scope.Regular_DC === "True") {
                $('#Regular_DC').prop('checked', true);
            }
            else {
                $('#Regular_DC').prop('checked', false);
            }


            $scope.AERB_DC = $scope._Permission.AERB_DC;
            if ($scope.AERB_DC === "True") {
                $('#AERB_DC').prop('checked', true);
            }
            else {
                $('#AERB_DC').prop('checked', false);
            }

            $scope.Medtronic_DC = $scope._Permission.Medtronic_DC;
            if ($scope.Medtronic_DC === "True") {
                $('#Medtronic_DC').prop('checked', true);
            }
            else {
                $('#Medtronic_DC').prop('checked', false);
            }

            $scope.Mindray_DC = $scope._Permission.Mindray_DC;
            if ($scope.Mindray_DC === "True") {
                $('#Mindray_DC').prop('checked', true);
            }
            else {
                $('#Mindray_DC').prop('checked', false);
            }


            $scope.AMC_CMC_Master = $scope._Permission.AMC_CMC_Master;
            if ($scope.AMC_CMC_Master === "True") {
                $('#AMC_CMC_Master').prop('checked', true);
            }
            else {
                $('#AMC_CMC_Master').prop('checked', false);
            }


            $scope.AMC_CMC_Regular = $scope._Permission.AMC_CMC_Regular;
            if ($scope.AMC_CMC_Regular === "True") {
                $('#AMC_CMC_Regular').prop('checked', true);
            }
            else {
                $('#AMC_CMC_Regular').prop('checked', false);
            }

            $scope.AMC_CMC_AERB = $scope._Permission.AMC_CMC_AERB;
            if ($scope.AMC_CMC_AERB === "True") {
                $('#AMC_CMC_AERB').prop('checked', true);
            }
            else {
                $('#AMC_CMC_AERB').prop('checked', false);
            }


            $scope.AMC_CMC_Medtronic = $scope._Permission.AMC_CMC_Medtronic;
            if ($scope.AMC_CMC_Medtronic === "True") {
                $('#AMC_CMC_Medtronic').prop('checked', true);
            }
            else {
                $('#AMC_CMC_Medtronic').prop('checked', false);
            }

            $scope.AMC_CMC_Mindray = $scope._Permission.AMC_CMC_Mindray;
            if ($scope.AMC_CMC_Mindray === "True") {
                $('#AMC_CMC_Mindray').prop('checked', true);
            }
            else {
                $('#AMC_CMC_Mindray').prop('checked', false);
            }


            $scope.Payment_Receipt = $scope._Permission.Payment_Receipt;
            if ($scope.Payment_Receipt === "True") {
                $('#Payment_Receipt').prop('checked', true);
            }
            else {
                $('#Payment_Receipt').prop('checked', false);
            }

            $scope.Payment_Receipt_Regular = $scope._Permission.Payment_Receipt_Regular;
            if ($scope.Payment_Receipt_Regular === "True") {
                $('#Payment_Receipt_Regular').prop('checked', true);
            }
            else {
                $('#Payment_Receipt_Regular').prop('checked', false);
            }


            $scope.Payment_Receipt_AERB = $scope._Permission.Payment_Receipt_AERB;
            if ($scope.Payment_Receipt_AERB === "True") {
                $('#Payment_Receipt_AERB').prop('checked', true);
            }
            else {
                $('#Payment_Receipt_AERB').prop('checked', false);
            }


            $scope.Payment_Receipt_Medtronic = $scope._Permission.Payment_Receipt_Medtronic;
            if ($scope.Payment_Receipt_Medtronic === "True") {
                $('#Payment_Receipt_Medtronic').prop('checked', true);
            }
            else {
                $('#Payment_Receipt_Medtronic').prop('checked', false);
            }

            $scope.Payment_Receipt_Mindray = $scope._Permission.Payment_Receipt_Mindray;
            if ($scope.Payment_Receipt_Mindray === "True") {
                $('#Payment_Receipt_Mindray').prop('checked', true);
            }
            else {
                $('#Payment_Receipt_Mindray').prop('checked', false);
            }

            ///////////////////////////////////////////////////////////////////////////////////
            $scope.Salary_Wages = $scope._Permission.Salary_Wages;
            if ($scope.Salary_Wages === "True") {
                $('#Salary_Wages').prop('checked', true);
            }
            else {
                $('#Salary_Wages').prop('checked', false);
            }


            $scope.Salary_Increment = $scope._Permission.Salary_Increment;
            if ($scope.Salary_Increment === "True") {
                $('#Salary_Increment').prop('checked', true);
            }
            else {
                $('#Salary_Increment').prop('checked', false);
            }


            $scope.Advance_Salary = $scope._Permission.Advance_Salary;
            if ($scope.Advance_Salary === "True") {
                $('#Advance_Salary').prop('checked', true);
            }
            else {
                $('#Advance_Salary').prop('checked', false);
            }

            $scope.Employee_Loan = $scope._Permission.Employee_Loan;
            if ($scope.Employee_Loan === "True") {
                $('#Employee_Loan').prop('checked', true);
            }
            else {
                $('#Employee_Loan').prop('checked', false);
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////

            $scope.Setting = $scope._Permission.Setting;
            if ($scope.Setting === "True") {
                $('#Setting').prop('checked', true);
            }
            else {
                $('#Setting').prop('checked', false);
            }


            $scope.Company_Master = $scope._Permission.Company_Master;
            if ($scope.Company_Master === "True") {
                $('#Company_Master').prop('checked', true);
            }
            else {
                $('#Company_Master').prop('checked', false);
            }


            $scope.Employee_Registration = $scope._Permission.Employee_Registration;
            if ($scope.Employee_Registration === "True") {
                $('#Employee_Registration').prop('checked', true);
            }
            else {
                $('#Employee_Registration').prop('checked', false);
            }

            $scope.Department_Master = $scope._Permission.Department_Master;
            if ($scope.Department_Master === "True") {
                $('#Department_Master').prop('checked', true);
            }
            else {
                $('#Department_Master').prop('checked', false);
            }
            //////////////////////////////////////////////////////////////////////////////
            $scope.Designation_Master = $scope._Permission.Designation_Master;
            if ($scope.Designation_Master === "True") {
                $('#Designation_Master').prop('checked', true);
            }
            else {
                $('#Designation_Master').prop('checked', false);
            }

            $scope.Solution_Bank = $scope._Permission.Solution_Bank;
            if ($scope.Solution_Bank === "True") {
                $('#Solution_Bank').prop('checked', true);
            }
            else {
                $('#Solution_Bank').prop('checked', false);
            }


            $scope.City_Master = $scope._Permission.City_Master;
            if ($scope.City_Master === "True") {
                $('#City_Master').prop('checked', true);
            }
            else {
                $('#City_Master').prop('checked', false);
            }


            $scope.Vender_Registration = $scope._Permission.Vender_Registration;
            if ($scope.Vender_Registration === "True") {
                $('#Vender_Registration').prop('checked', true);
            }
            else {
                $('#Vender_Registration').prop('checked', false);
            }



            $scope.Invoice_Master = $scope._Permission.Invoice_Master;
            if ($scope.Invoice_Master === "True") {
                $('#Invoice_Master').prop('checked', true);
            }
            else {
                $('#Invoice_Master').prop('checked', false);
            }



            $scope.Invoice_Regular = $scope._Permission.Invoice_Regular;
            if ($scope.Invoice_Regular === "True") {
                $('#Invoice_Regular').prop('checked', true);
            }
            else {
                $('#Invoice_Regular').prop('checked', false);
            }

            $scope.Invoice_AERB = $scope._Permission.Invoice_AERB;
            if ($scope.Invoice_AERB === "True") {
                $('#Invoice_AERB').prop('checked', true);
            }
            else {
                $('#Invoice_AERB').prop('checked', false);
            }

            $scope.Invoice_Medtronic = $scope._Permission.Invoice_Medtronic;
            if ($scope.Invoice_Medtronic === "True") {
                $('#Invoice_Medtronic').prop('checked', true);
            }
            else {
                $('#Invoice_Medtronic').prop('checked', false);
            }


            $scope.Invoice_Mindray = $scope._Permission.Invoice_Mindray;
            if ($scope.Invoice_Mindray === "True") {
                $('#Invoice_Mindray').prop('checked', true);
            }
            else {
                $('#Invoice_Mindray').prop('checked', false);
            }

            $scope.Vendor_PO_Master = $scope._Permission.Vendor_PO_Master;
            if ($scope.Vendor_PO_Master === "True") {
                $('#Vendor_PO_Master').prop('checked', true);
            }
            else {
                $('#Vendor_PO_Master').prop('checked', false);
            }

            $scope.Vendor_PO_Regular = $scope._Permission.Vendor_PO_Regular;
            if ($scope.Vendor_PO_Regular === "True") {
                $('#Vendor_PO_Regular').prop('checked', true);
            }
            else {
                $('#Vendor_PO_Regular').prop('checked', false);
            }

            $scope.Vendor_PO_AERB = $scope._Permission.Vendor_PO_AERB;
            if ($scope.Vendor_PO_AERB === "True") {
                $('#Vendor_PO_AERB').prop('checked', true);
            }
            else {
                $('#Vendor_PO_AERB').prop('checked', false);
            }

            $scope.Vendor_PO_Medtronic = $scope._Permission.Vendor_PO_Medtronic;
            if ($scope.Vendor_PO_Medtronic === "True") {
                $('#Vendor_PO_Medtronic').prop('checked', true);
            }
            else {
                $('#Vendor_PO_Medtronic').prop('checked', false);
            }

            $scope.Vendor_PO_Mindray = $scope._Permission.Vendor_PO_Mindray;
            if ($scope.Vendor_PO_Mindray === "True") {
                $('#Vendor_PO_Mindray').prop('checked', true);
            }
            else {
                $('#Vendor_PO_Mindray').prop('checked', false);
            }

            $scope.Employee_Expense_Master = $scope._Permission.Employee_Expense_Master;
            if ($scope.Employee_Expense_Master === "True") {
                $('#Employee_Expense_Master').prop('checked', true);
            }
            else {
                $('#Employee_Expense_Master').prop('checked', false);
            }
        });
    };


    $scope.HRMS = function (id) {

        switch (id) {
            case "SelectAll":
                if ($("#SelectAll").is(":checked")) {
                    $('#SelectAll').prop('checked', true);
                    $('#Customer_Master').prop('checked', true);
                    $('#Regular_Customer').prop('checked', true);
                    $('#AERB_Customer').prop('checked', true);
                    $('#Medtronic_Customer').prop('checked', true);
                    $('#Mindray_Customer').prop('checked', true);

                    $('#Customer_Service').prop('checked', true);
                    $('#Service_Call_Assign').prop('checked', true);
                    $('#Regular').prop('checked', true);
                    $('#AERB').prop('checked', true);
                    $('#Medtronic').prop('checked', true);
                    $('#Mindray').prop('checked', true);
                    $('#Sales_Lead').prop('checked', true);

                    $('#Regular_Product_Master').prop('checked', true);
                    $('#Category').prop('checked', true);
                    $('#Manufacturer').prop('checked', true);
                    $('#Regular_Product').prop('checked', true);
                    $('#Spare_Part').prop('checked', true);
                    $('#URD_Product_Purchase').prop('checked', true);
                    $('#Standard_Accessories').prop('checked', true);

                    $('#Mindray_Product_Master').prop('checked', true);
                    $('#Mindray_Product').prop('checked', true);
                    $('#Probe_Specifications').prop('checked', true);

                    $('#Medtronic_Products_List').prop('checked', true);
                    $('#Medtronic_Product').prop('checked', true);
                    $('#Main_System').prop('checked', true);
                    $('#Attachments').prop('checked', true);
                    $('#Tools').prop('checked', true);

                    $('#Incentive').prop('checked', true);
                    $('#Incentive_Master').prop('checked', true);
                    $('#Incentive_Scheme').prop('checked', true);

                    $('#Quotation_Master').prop('checked', true);
                    $('#Regular_Quotation').prop('checked', true);
                    $('#AERB_Quotation').prop('checked', true);
                    $('#Medtronic_Quotation').prop('checked', true);
                    $('#Mindray_Quotation').prop('checked', true);

                    $('#Report_Master').prop('checked', true);
                    $('#Attendance_Report').prop('checked', true);
                    $('#Leave_Report').prop('checked', true);
                    $('#Monthly_Salary_Report').prop('checked', true);

                    $('#Daily_Activity').prop('checked', true);

                    $('#AERB_DC').prop('checked', true);
                    $('#Medtronic_DC').prop('checked', true);
                    $('#Mindray_DC').prop('checked', true);
                    $('#Regular_DC').prop('checked', true);
                    $('#Delivery_Challan').prop('checked', true);

                    $('#AMC_CMC_Master').prop('checked', true);
                    $('#AMC_CMC_Regular').prop('checked', true);
                    $('#AMC_CMC_AERB').prop('checked', true);
                    $('#AMC_CMC_Medtronic').prop('checked', true);
                    $('#AMC_CMC_Mindray').prop('checked', true);

                    $('#Payment_Receipt').prop('checked', true);
                    $('#Payment_Receipt_Regular').prop('checked', true);
                    $('#Payment_Receipt_AERB').prop('checked', true);
                    $('#Payment_Receipt_Medtronic').prop('checked', true);
                    $('#Payment_Receipt_Mindray').prop('checked', true);

                    $('#Salary_Wages').prop('checked', true);
                    $('#Salary_Increment').prop('checked', true);
                    $('#Advance_Salary').prop('checked', true);
                    $('#Employee_Loan').prop('checked', true);

                    $('#Setting').prop('checked', true);
                    $('#Company_Master').prop('checked', true);
                    $('#Employee_Registration').prop('checked', true);
                    $('#Department_Master').prop('checked', true);
                    $('#Designation_Master').prop('checked', true);
                    $('#Solution_Bank').prop('checked', true);
                    $('#City_Master').prop('checked', true);
                    $('#Vender_Registration').prop('checked', true);

                    $('#Invoice_Master').prop('checked', true);
                    $('#Invoice_Regular').prop('checked', true);
                    $('#Invoice_AERB').prop('checked', true);
                    $('#Invoice_Medtronic').prop('checked', true);
                    $('#Invoice_Mindray').prop('checked', true);

                    $('#Vendor_PO_Master').prop('checked', true);
                    $('#Vendor_PO_Regular').prop('checked', true);
                    $('#Vendor_PO_AERB').prop('checked', true);
                    $('#Vendor_PO_Medtronic').prop('checked', true);
                    $('#Vendor_PO_Mindray').prop('checked', true);

                    $('#Employee_Expense_Master').prop('checked', true);
                }
                else {
                    $('#SelectAll').prop('checked', false);
                    $('#Customer_Master').prop('checked', false);
                    $('#Regular_Customer').prop('checked', false);
                    $('#AERB_Customer').prop('checked', false);
                    $('#Medtronic_Customer').prop('checked', false);
                    $('#Mindray_Customer').prop('checked', false);

                    $('#Customer_Service').prop('checked', false);
                    $('#Service_Call_Assign').prop('checked', false);
                    $('#Regular').prop('checked', false);
                    $('#AERB').prop('checked', false);
                    $('#Medtronic').prop('checked', false);
                    $('#Mindray').prop('checked', false);
                    $('#Sales_Lead').prop('checked', false);

                    $('#Regular_Product_Master').prop('checked', false);
                    $('#Category').prop('checked', false);
                    $('#Manufacturer').prop('checked', false);
                    $('#Regular_Product').prop('checked', false);
                    $('#Spare_Part').prop('checked', false);
                    $('#URD_Product_Purchase').prop('checked', false);
                    $('#Standard_Accessories').prop('checked', false);

                    $('#Mindray_Product_Master').prop('checked', false);
                    $('#Mindray_Product').prop('checked', false);
                    $('#Probe_Specifications').prop('checked', false);

                    $('#Medtronic_Products_List').prop('checked', false);
                    $('#Medtronic_Product').prop('checked', false);
                    $('#Main_System').prop('checked', false);
                    $('#Attachments').prop('checked', false);
                    $('#Tools').prop('checked', false);

                    $('#Incentive').prop('checked', false);
                    $('#Incentive_Master').prop('checked', false);
                    $('#Incentive_Scheme').prop('checked', false);

                    $('#Quotation_Master').prop('checked', false);
                    $('#Regular_Quotation').prop('checked', false);
                    $('#AERB_Quotation').prop('checked', false);
                    $('#Medtronic_Quotation').prop('checked', false);
                    $('#Mindray_Quotation').prop('checked', false);

                    $('#Report_Master').prop('checked', false);
                    $('#Attendance_Report').prop('checked', false);
                    $('#Leave_Report').prop('checked', false);
                    $('#Monthly_Salary_Report').prop('checked', false);

                    $('#Daily_Activity').prop('checked', false);

                    $('#AERB_DC').prop('checked', false);
                    $('#Medtronic_DC').prop('checked', false);
                    $('#Mindray_DC').prop('checked', false);
                    $('#Regular_DC').prop('checked', false);
                    $('#Delivery_Challan').prop('checked', false);

                    $('#AMC_CMC_Master').prop('checked', false);
                    $('#AMC_CMC_Regular').prop('checked', false);
                    $('#AMC_CMC_AERB').prop('checked', false);
                    $('#AMC_CMC_Medtronic').prop('checked', false);
                    $('#AMC_CMC_Mindray').prop('checked', false);

                    $('#Payment_Receipt').prop('checked', false);
                    $('#Payment_Receipt_Regular').prop('checked', false);
                    $('#Payment_Receipt_AERB').prop('checked', false);
                    $('#Payment_Receipt_Medtronic').prop('checked', false);
                    $('#Payment_Receipt_Mindray').prop('checked', false);

                    $('#Salary_Wages').prop('checked', false);
                    $('#Salary_Increment').prop('checked', false);
                    $('#Advance_Salary').prop('checked', false);
                    $('#Employee_Loan').prop('checked', false);

                    $('#Setting').prop('checked', false);
                    $('#Company_Master').prop('checked', false);
                    $('#Employee_Registration').prop('checked', false);
                    $('#Department_Master').prop('checked', false);
                    $('#Designation_Master').prop('checked', false);
                    $('#Solution_Bank').prop('checked', false);
                    $('#City_Master').prop('checked', false);
                    $('#Vender_Registration').prop('checked', false);

                    $('#Invoice_Master').prop('checked', false);
                    $('#Invoice_Regular').prop('checked', false);
                    $('#Invoice_AERB').prop('checked', false);
                    $('#Invoice_Medtronic').prop('checked', false);
                    $('#Invoice_Mindray').prop('checked', false);

                    $('#Vendor_PO_Master').prop('checked', false);
                    $('#Vendor_PO_Regular').prop('checked', false);
                    $('#Vendor_PO_AERB').prop('checked', false);
                    $('#Vendor_PO_Medtronic').prop('checked', false);
                    $('#Vendor_PO_Mindray').prop('checked', false);

                    $('#Employee_Expense_Master').prop('checked', false);

                }
                break;
            case "Customer_Master":
                if ($("#Customer_Master").is(":checked")) {
                    $('#Customer_Master').prop('checked', true);
                    $('#Regular_Customer').prop('checked', true);
                    $('#AERB_Customer').prop('checked', true);
                    $('#Medtronic_Customer').prop('checked', true);
                    $('#Mindray_Customer').prop('checked', true);
                }
                else {
                    $('#Customer_Master').prop('checked', false);
                    $('#Regular_Customer').prop('checked', false);
                    $('#AERB_Customer').prop('checked', false);
                    $('#Medtronic_Customer').prop('checked', false);
                    $('#Mindray_Customer').prop('checked', false);

                }
                break;
            case "Customer_Service":
                if ($("#Customer_Service").is(":checked")) {
                    $('#Customer_Service').prop('checked', true);
                    $('#Service_Call_Assign').prop('checked', true);
                    $('#Regular').prop('checked', true);
                    $('#AERB').prop('checked', true);
                    $('#Medtronic').prop('checked', true);
                    $('#Mindray').prop('checked', true);
                    $('#Sales_Lead').prop('checked', true);
                  
                }
                else {
                    $('#Customer_Service').prop('checked', false);
                    $('#Service_Call_Assign').prop('checked', false);
                    $('#Regular').prop('checked', false);
                    $('#AERB').prop('checked', false);
                    $('#Medtronic').prop('checked', false);
                    $('#Mindray').prop('checked', false);
                    $('#Sales_Lead').prop('checked', false);
               

                }
                break;
            case "Regular_Product_Master":
                if ($("#Regular_Product_Master").is(":checked")) {
                    $('#Regular_Product_Master').prop('checked', true);
                    $('#Category').prop('checked', true);
                    $('#Manufacturer').prop('checked', true);
                    $('#Regular_Product').prop('checked', true);
                    $('#Spare_Part').prop('checked', true);
                    $('#URD_Product_Purchase').prop('checked', true);
                    $('#Standard_Accessories').prop('checked', true);
                }
                else {
                    $('#Regular_Product_Master').prop('checked', false);
                    $('#Category').prop('checked', false);
                    $('#Manufacturer').prop('checked', false);
                    $('#Regular_Product').prop('checked', false);
                    $('#Spare_Part').prop('checked', false);
                    $('#URD_Product_Purchase').prop('checked', false);
                    $('#Standard_Accessories').prop('checked', false);
                }
                break;
            case "Mindray_Product_Master":
                if ($("#Mindray_Product_Master").is(":checked")) {
                    $('#Mindray_Product_Master').prop('checked', true);
                    $('#Mindray_Product').prop('checked', true);
                    $('#Probe_Specifications').prop('checked', true);
                   


                }
                else {
                    $('#Mindray_Product_Master').prop('checked', false);
                    $('#Mindray_Product').prop('checked', false);
                    $('#Probe_Specifications').prop('checked', false);
                 

                }
                break;

            case "Medtronic_Products_List":
                if ($("#Medtronic_Products_List").is(":checked")) {
                    $('#Medtronic_Products_List').prop('checked', true);
                    $('#Medtronic_Product').prop('checked', true);
                    $('#Main_System').prop('checked', true);
                    $('#Attachments').prop('checked', true);
                    $('#Tools').prop('checked', true);

                }
                else {
                    $('#Medtronic_Products_List').prop('checked', false);
                    $('#Medtronic_Product').prop('checked', false);
                    $('#Main_System').prop('checked', false);
                    $('#Attachments').prop('checked', false);
                    $('#Tools').prop('checked', false);

                }
                break;

          
            case "Incentive":
                if ($("#Incentive").is(":checked")) {

                    $('#Incentive').prop('checked', true);
                    $('#Incentive_Master').prop('checked', true);
                    $('#Incentive_Scheme').prop('checked', true);
                   
                }
                else {
                    $('#Incentive').prop('checked', false);
                    $('#Incentive_Master').prop('checked', false);
                    $('#Incentive_Scheme').prop('checked', false);


                }
                break;
            case "Quotation_Master":
                if ($("#Quotation_Master").is(":checked")) {


                    $('#Quotation_Master').prop('checked', true);
                    $('#Regular_Quotation').prop('checked', true);
                    $('#AERB_Quotation').prop('checked', true);
                    $('#Medtronic_Quotation').prop('checked', true);
                    $('#Mindray_Quotation').prop('checked', true);
                   

                }
                else {

                    $('#Quotation_Master').prop('checked', false);
                    $('#Regular_Quotation').prop('checked', false);
                    $('#AERB_Quotation').prop('checked', false);
                    $('#Medtronic_Quotation').prop('checked', false);
                    $('#Mindray_Quotation').prop('checked', false);
                }
                break;
            case "Report_Master":
                if ($("#Report_Master").is(":checked")) {
                    $('#Report_Master').prop('checked', true);
                    $('#Attendance_Report').prop('checked', true);
                    $('#Leave_Report').prop('checked', true);
                    $('#Monthly_Salary_Report').prop('checked', true);
                }
                else {

                    $('#Report_Master').prop('checked', false);
                    $('#Attendance_Report').prop('checked', false);
                    $('#Leave_Report').prop('checked', false);
                    $('#Monthly_Salary_Report').prop('checked', false);
                }
                break;
            case "Delivery_Challan":
                if ($("#Delivery_Challan").is(":checked")) {
                    $('#AERB_DC').prop('checked', true);
                    $('#Medtronic_DC').prop('checked', true);
                    $('#Mindray_DC').prop('checked', true);
                    $('#Regular_DC').prop('checked', true);
                    $('#Delivery_Challan').prop('checked', true);
                   
                }
                else {
                    $('#AERB_DC').prop('checked', false);
                    $('#Medtronic_DC').prop('checked', false);
                    $('#Mindray_DC').prop('checked', false);
                    $('#Regular_DC').prop('checked', false);
                    $('#Delivery_Challan').prop('checked', false);
                }
                break;

            case "AMC_CMC_Master":
                if ($("#AMC_CMC_Master").is(":checked")) {
                    $('#AMC_CMC_Master').prop('checked', true);
                    $('#AMC_CMC_Regular').prop('checked', true);
                    $('#AMC_CMC_AERB').prop('checked', true);
                    $('#AMC_CMC_Medtronic').prop('checked', true);
                    $('#AMC_CMC_Mindray').prop('checked', true);

                }
                else {
                    $('#AMC_CMC_Master').prop('checked', false);
                    $('#AMC_CMC_Regular').prop('checked', false);
                    $('#AMC_CMC_AERB').prop('checked', false);
                    $('#AMC_CMC_Medtronic').prop('checked', false);
                    $('#AMC_CMC_Mindray').prop('checked', false);
                }
                break;

            case "Payment_Receipt":
                if ($("#Payment_Receipt").is(":checked")) {
                    $('#Payment_Receipt').prop('checked', true);
                    $('#Payment_Receipt_Regular').prop('checked', true);
                    $('#Payment_Receipt_AERB').prop('checked', true);
                    $('#Payment_Receipt_Medtronic').prop('checked', true);
                    $('#Payment_Receipt_Mindray').prop('checked', true);

                }
                else {
                    $('#Payment_Receipt').prop('checked', false);
                    $('#Payment_Receipt_Regular').prop('checked', false);
                    $('#Payment_Receipt_AERB').prop('checked', false);
                    $('#Payment_Receipt_Medtronic').prop('checked', false);
                    $('#Payment_Receipt_Mindray').prop('checked', false);
                }
                break;

            case "Salary_Wages":
                if ($("#Salary_Wages").is(":checked")) {
                    $('#Salary_Wages').prop('checked', true);
                    $('#Salary_Increment').prop('checked', true);
                    $('#Advance_Salary').prop('checked', true);
                    $('#Employee_Loan').prop('checked', true);
                 
                }
                else {
                    $('#Salary_Wages').prop('checked', false);
                    $('#Salary_Increment').prop('checked', false);
                    $('#Advance_Salary').prop('checked', false);
                    $('#Employee_Loan').prop('checked', false);

                }
                break;

            case "Setting":
                if ($("#Setting").is(":checked")) {
                    $('#Setting').prop('checked', true);
                    $('#Company_Master').prop('checked', true);
                    $('#Employee_Registration').prop('checked', true);
                    $('#Department_Master').prop('checked', true);
                    $('#Designation_Master').prop('checked', true);
                    $('#Solution_Bank').prop('checked', true);
                    $('#City_Master').prop('checked', true);
                    $('#Vender_Registration').prop('checked', true);
                }
                else {
                    $('#Setting').prop('checked', false);
                    $('#Company_Master').prop('checked', false);
                    $('#Employee_Registration').prop('checked', false);
                    $('#Department_Master').prop('checked', false);
                    $('#Designation_Master').prop('checked', false);
                    $('#Solution_Bank').prop('checked', false);
                    $('#City_Master').prop('checked', false);
                    $('#Vender_Registration').prop('checked', false);
                }
                break;

            case "Invoice_Master":
                if ($("#Invoice_Master").is(":checked")) {
                    $('#Invoice_Master').prop('checked', true);
                    $('#Invoice_Regular').prop('checked', true);
                    $('#Invoice_AERB').prop('checked', true);
                    $('#Invoice_Medtronic').prop('checked', true);
                    $('#Invoice_Mindray').prop('checked', true);
                 
                }
                else {
                    $('#Invoice_Master').prop('checked', false);
                    $('#Invoice_Regular').prop('checked', false);
                    $('#Invoice_AERB').prop('checked', false);
                    $('#Invoice_Medtronic').prop('checked', false);
                    $('#Invoice_Mindray').prop('checked', false);
                }
                break;
            case "Vendor_PO_Master":
                if ($("#Vendor_PO_Master").is(":checked")) {
                    $('#Vendor_PO_Master').prop('checked', true);
                    $('#Vendor_PO_Regular').prop('checked', true);
                    $('#Vendor_PO_AERB').prop('checked', true);
                    $('#Vendor_PO_Medtronic').prop('checked', true);
                    $('#Vendor_PO_Mindray').prop('checked', true);

                }
                else {
                    $('#Vendor_PO_Master').prop('checked', false);
                    $('#Vendor_PO_Regular').prop('checked', false);
                    $('#Vendor_PO_AERB').prop('checked', false);
                    $('#Vendor_PO_Medtronic').prop('checked', false);
                    $('#Vendor_PO_Mindray').prop('checked', false);
                }
                break; 
            case "1":
                $('#Customer_Master').prop('checked', true);
                break;
            case "2":
                $('#Customer_Service').prop('checked', true);
                break;
            case "3":
                $('#Regular_Product_Master').prop('checked', true);
                break;
            case "4":
                $('#Mindray_Product_Master').prop('checked', true);
                break;
            case "5":
                $('#Medtronic_Products_List').prop('checked', true);
                break;
            case "6":
                $('#Incentive').prop('checked', true);
                break;
            case "7":
                $('#Quotation_Master').prop('checked', true);
                break;
            case "8":
                $('#Report_Master').prop('checked', true);
                break;
            case "9":
                $('#Delivery_Challan').prop('checked', true);
                break;
            case "10":
                $('#AMC_CMC_Master').prop('checked', true);
                break;
            case "11":
                $('#Payment_Receipt').prop('checked', true);
                break;
            case "12":
                $('#Salary_Wages').prop('checked', true);
                break;
            case "13":
                $('#Setting').prop('checked', true);
                break;
            case "14":
                $('#Invoice_Master').prop('checked', true);
                break;
            case "15":
                $('#Vendor_PO_Master').prop('checked', true);
                break;

        }

    }

});