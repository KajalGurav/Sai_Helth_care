app.service("LeaveService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Live_Application/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Live_Application/GetAllLeaveList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.GetLeaveDetails = function (id) {
        var response = $http({
            method: "GET",
            url: "/Live_Application/GetLeaveDetails",
            params: {
                id: id
            }
        });
        return response;
        //return $http.get("/Quotation_Registration/GetCustomerList");
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

    this.GetEmployeeList = function () {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetEmployeeList"
        });
        return response;
    };

    this.GetDepartmentList = function (id) {
        var response = $http({
            method: "GET",
            url: "/Live_Application/GetDepartmentList",
            params: {
                id: id
            }
        });
        return response;
     
    };



    this.LeaveCategoryList = function () {
        var response = $http({
            method: "POST",
            url: "/Live_Application/LeaveCategoryList"
        });
        return response;
    };

    this.LeaveStatusList = function () {
        var response = $http({
            method: "POST",
            url: "/Live_Application/LeaveStatusList"
        });
        return response;
    };

    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Live_Application/AddUpdateLeave",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Live_Application/AddUpdateLeave",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
});




app.controller("LeaveCtrl", function ($scope, LeaveService) {

    GetTotalcount();
    GetLeaveDetails();
    //GetLatestRecord();
    //GetallEmployee();
    //LeaveCategoryList();
    //LeaveStatusList();
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    $scope.EMP_ID1 = null;
    $scope.START_DATE = null;
    $scope.END_DATE = null;
    GetallEmployee();


    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = LeaveService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.LeaveList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");
        });

    }


    function GetSearchingConditions() {
        if ($scope.SEARCH_NAME === undefined || $scope.SEARCH_NAME === "" || $scope.SEARCH_NAME === null) {
            $scope.SEARCH_NAME = null;
        }

        if ($scope.EMP_ID1 === undefined || $scope.EMP_ID1 === "" || $scope.EMP_ID1 === null) {
            $scope.EMP_ID1 = null;
        }

        $scope.START_DATE = $("#START_DATE").val();
        $scope.END_DATE = $("#END_DATE").val();

        if ($scope.START_DATE === undefined || $scope.START_DATE === '') {
            $scope.START_DATE = null;
        }
        if ($scope.END_DATE === undefined || $scope.END_DATE === '') {
            $scope.END_DATE = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME,
            EMP_ID: $scope.EMP_ID1,
            START_DATE: $scope.START_DATE,
            END_DATE: $scope.END_DATE
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
        var getrecord = LeaveService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.LeaveList = response.data;
            //  alert(JSON.stringify($scope.RegularQuotationList));
            GetLatestRecord();

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



    function GetLeaveDetails() {
        var getAdmin = LeaveService.GetLeaveDetails($scope.LEAVE_ID);
        getAdmin.then(function (response) {
            $scope.LiveList = response.data;
        });
    }

    function GetLatestRecord() {
        tb_params = {
            GenerateNoFor: "Leave",
            CustomerTypeId: null
        }
        var LatestDocNo = LeaveService.GetLatestRecords(tb_params);
        LatestDocNo.then(function (response) {
            $scope.LatestRecord = response.data;
            //$scope.QUOTATION_NO = $scope.LatestRecord[0].RECORD_NO_NEW;
            $scope.APPLICATION_NO = $scope.LatestRecord;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            $scope.APPLICATION_DATE = today;
        });
        //console.log($scope.AddPayment);
    }

    function GetallEmployee() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = LeaveService.GetEmployeeList();
        GethomeList.then(function (response) {
            $scope.EmployeeList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }


    $scope.GetDepartment = function () {
        var GethomeList = LeaveService.GetDepartmentList($scope.EMP_ID);
        GethomeList.then(function (response) {
            $scope.DepartmentList = response.data;
            $scope.DEP_NAME = $scope.DepartmentList[0].DEP_NAME;
            $scope.DESI_NAME = $scope.DepartmentList[0].DESI_NAME;
        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }

    function LeaveCategoryList() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = LeaveService.LeaveCategoryList();
        GethomeList.then(function (response) {
            $scope.LeaveCategoryList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }

    function LeaveStatusList() {
        // alert(JSON.stringify($scope.STATELIST))
        var GethomeList = LeaveService.LeaveStatusList();
        GethomeList.then(function (response) {
            $scope.LeaveStatusList = response.data;

        }, function (Error) {
            // alert(JSON.stringify(Error));
        });
    }
    function Clear() {
        $scope.LEAVE_ID = null;
        $scope.EMP_ID = null;
        $scope.DEP_NAME = "";
        $scope.DESI_NAME = "";
        $scope.LEAVE_CAT_ID = null;
        $scope.LEAVE_STATUS_TYPE_ID = null;
        $scope.LEAVE_FROM_DATE = "";
        $scope.LEAVE_TO_DATE = "";
        $scope.LEAVE_TYPE = "";
        $scope.LEAVE_REASON = "";
        $scope.LEAVE_IN_DAYS = "";

        $scope.AddPayment.$setPristine();
        $scope.AddPayment.$setUntouched();
    }
    $scope.AddLeave = function () {
        Clear();
        $scope.Admin_Action = "Add Leave";
        $scope.ACTION = "ADD";
        $("#Comp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        GetLatestRecord();
        GetallEmployee();
        LeaveCategoryList();
        LeaveStatusList();

    }

    $scope.UpdateLeave = function (Leave) {
        Clear();
        $scope.Admin_Action = "Update Leave";
        $scope.ACTION = "UPDATE";
        $("#Comp_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.LEAVE_ID = parseInt(Leave.LEAVE_ID);
        $scope.APPLICATION_NO = Leave.APPLICATION_NO;
        $scope.APPLICATION_DATE = Leave.APPLICATION_DATE;
        $scope.EMP_ID = parseInt(Leave.EMP_ID);
        $scope.DEP_NAME = Leave.DEP_NAME;
        $scope.DESI_NAME = Leave.DESI_NAME;
        $scope.LEAVE_CAT_ID = parseInt(Leave.LEAVE_CAT_ID);
        $scope.LEAVE_STATUS_TYPE_ID = parseInt(Leave.LEAVE_STATUS_TYPE_ID);
        $scope.LEAVE_FROM_DATE = Leave.LEAVE_FROM_DATE;
        $scope.LEAVE_TO_DATE = Leave.LEAVE_TO_DATE;
        $scope.LEAVE_TYPE = Leave.LEAVE_TYPE;
        $scope.LEAVE_REASON = Leave.LEAVE_REASON;
        $scope.LEAVE_IN_DAYS = parseInt(Leave.LEAVE_IN_DAYS);
        GetallEmployee();
        LeaveCategoryList();
        LeaveStatusList();
    }
    $scope.AddUpdateAccount = function () {
        if ($("#APPLICATION_DATE").val() === undefined || $("#APPLICATION_DATE").val() === null || $("#APPLICATION_DATE").val() === "") {
            alert("Please Select Application Date!");
            return;
        }
        if ($scope.EMP_ID === undefined || $scope.EMP_ID === null || $scope.EMP_ID === "") {
            alert("Please Select Employee Name!");
            return;
        }

        
        if ($scope.LEAVE_CAT_ID === undefined || $scope.LEAVE_CAT_ID === null || $scope.LEAVE_CAT_ID === "") {
            alert("Please Select Leave Category!");
            return;
        }

        if ($("#LEAVE_FROM_DATE").val() === undefined || $("#LEAVE_FROM_DATE").val() === null || $("#LEAVE_FROM_DATE").val() === "") {
            alert("Please Select Leave From Date!");
            return;
        }
        if ($("#LEAVE_TO_DATE").val() === undefined || $("#LEAVE_TO_DATE").val() === null || $("#LEAVE_TO_DATE").val() === "") {
            alert("Please Select Leave To Date!");
            return;
        }
        if ($scope.LEAVE_TYPE === undefined || $scope.LEAVE_TYPE === null || $scope.LEAVE_TYPE === "") {
            alert("Please Select Leave Type!");
            return;
        }
        if ($scope.LEAVE_REASON === undefined || $scope.LEAVE_REASON === null || $scope.LEAVE_REASON === "") {
            alert("Please Enter Leave Reason!");
            return;
        }

        if ($scope.LEAVE_IN_DAYS === undefined || $scope.LEAVE_IN_DAYS === null || $scope.LEAVE_IN_DAYS === "") {
            alert("Please Enter Leave days!");
            return;
        }

        
        

        $scope.APPLICATION_DATE = $("#APPLICATION_DATE").val();
        $scope.LEAVE_FROM_DATE = $("#LEAVE_FROM_DATE").val();
        $scope.LEAVE_TO_DATE = $("#LEAVE_TO_DATE").val();
        tb_Admin = {
            APPLICATION_NO: $scope.APPLICATION_NO,
            APPLICATION_DATE: $scope.APPLICATION_DATE,
            EMP_ID: $scope.EMP_ID,
            DEP_ID: $scope.DEP_ID,
            LEAVE_FROM_DATE: $scope.LEAVE_FROM_DATE,
            LEAVE_TO_DATE: $scope.LEAVE_TO_DATE,
            LEAVE_REASON: $scope.LEAVE_REASON,
            LEAVE_IN_DAYS: $scope.LEAVE_IN_DAYS,
            LEAVE_TYPE: $scope.LEAVE_TYPE,
            LEAVE_CAT_ID: $scope.LEAVE_CAT_ID,
            LEAVE_STATUS_TYPE_ID: $scope.LEAVE_STATUS_TYPE_ID,
            LEAVE_ID: $scope.LEAVE_ID,
            LEAVE_CANCEL_REMARK: $scope.LEAVE_CANCEL_REMARK,
            ACTION: $scope.ACTION


        };

        if ($scope.Admin_Action === "Add Leave") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Leave") {
            EditAdminRecord(tb_Admin);
        }


    }

    function AddAdminRecord(tb_Admin) {
        var datalist = LeaveService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                GetRecordbyPaging();
                alert("Leave added successfully.");
                $("#Comp_add").modal("hide");
                $("#loader").css("display", 'none');

              
               
            }
            else if (d.data.success === false) {
                alert("Leave already added.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Please fill all Mandatory Fields.");
                $("#loader").css("display", 'none');
            }
        },
            function () {

                //alert("Error.");
                $("#loader").css("display", 'none');
            });
    }

    function EditAdminRecord(tb_Admin) {
        var datalist = LeaveService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                GetRecordbyPaging();
                alert("Leave Updated successfully.");
              
                $("#Comp_add").modal("hide");
             
            }
            else if (d.data.success === false) {
                alert("Leave already Updated.");
                $("#loader").css("display", 'none');
            }
            else {
                alert("Error.");
                $("#loader").css("display", 'none');
            }
        },
            function () {
                alert("Error.");
                $("#loader").css("display", 'none');
            });
    }


    $scope.PrintLeave = function (Leave) {
        $scope.LEAVE_ID = parseInt(Leave.LEAVE_ID);
        $scope.APPLICATION_NO = Leave.APPLICATION_NO;
        $scope.APPLICATION_DATE = Leave.APPLICATION_DATE;
        $scope.EMP_ID = parseInt(Leave.EMP_ID);
        var emp = $scope.EmployeeList.filter(x => x.EMP_ID == $scope.EMP_ID)[0];
        $scope.CONTACT_NO = emp.CONTACT_NO;
        $scope.ALTERNATE_CONT_NO = emp.ALTERNATE_CONT_NO;
        $scope.EMAIL = emp.EMAIL;
        $scope.ALTERNATE_EMAIL = emp.ALTERNATE_EMAIL;
        $scope.EMP_NAME = emp.EMP_NAME;

        $scope.DEP_NAME = Leave.DEP_NAME;
        $scope.DESI_NAME = Leave.DESI_NAME;
        $scope.LEAVE_CAT_ID = parseInt(Leave.LEAVE_CAT_ID);
        $scope.LEAVE_STATUS_TYPE_ID = parseInt(Leave.LEAVE_STATUS_TYPE_ID);
        $scope.LEAVE_FROM_DATE = Leave.LEAVE_FROM_DATE;
        $scope.LEAVE_TO_DATE = Leave.LEAVE_TO_DATE;
        $scope.LEAVE_TYPE = Leave.LEAVE_TYPE;
        $scope.LEAVE_REASON = Leave.LEAVE_REASON;
        $scope.LEAVE_IN_DAYS = parseInt(Leave.LEAVE_IN_DAYS);
    }

    $scope.Print = function (id) {


        var printHtml = document.getElementById(id).outerHTML;
        var currentPage = document.body.innerHTML;
        var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';

        var WindowObject = window.open();
        WindowObject.document.write(elementPage);
        WindowObject.document.close();
        setTimeout(function () {
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
            window.location.href = window.location.href;
        }, 1000);

        
    }
    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


});