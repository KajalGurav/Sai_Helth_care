app.service("AdminService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };
    
    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetallAdmin",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.PrintMonthlySalary = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/PrintMonthlySalary",
            data: JSON.stringify(tb_Admin)
        });
        return response;
    };

    this.GetMonthIncentive = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetEmpIncentive1",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.AddAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/AddAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/EditAdmin",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
    
    this.GetEmployee = function () {
        return $http.get("/Monthly_Salary/GetEmployee");
    };
    this.GetCompanyBank = function () {
        return $http.get("/Monthly_Salary/GetCompanyBank");
    };
    this.GetEmpLoan = function (id) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetEmpLoan",
            params: {
                id: id
            }
        });
        return response;
    }; 
    this.GetBasicSalary = function (id) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetBasicSalary",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetEmpIncentive = function (id) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetEmpIncentive",
            params: {
                id: id
            }
        });
        return response;
    };
    this.GetLoanDetails = function (id) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/GetLoanDetails",
            params: {
                id: id
            }
        });
        return response;
    };

    this.EmployeeTaskExport = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Monthly_Salary/EmployeeSalaryExport",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

});

app.controller("MonthlySalaryCtrl", function ($scope, AdminService) {

    $("#loader").css("display", '');
   
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.FARMER_SEARCH = null;
    GetEmployee();
    GetCompanyBank()
    GetTotalcount();
    $scope.EMP_LOAN_ID = 0;


    $scope.GetData = function () {
        GetTotalcount();
    }
    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = AdminService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.SalaryList = "";

                //alert(JSON.stringify($scope.AdminList));
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
        
        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            FARMER_NAME: $scope.FARMER_SEARCH,
            EMP_ID: $scope.EMP_ID,
            MONTH_NO: $scope.MONTH_NO 
        };

        return SearchingConditions;
    }

    function initController() {
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
        var getrecord = AdminService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.SalaryList = response.data;

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

    function RemoveBlankOption() {
        setTimeout(function () {
            var blankSelectOptions = $('option[value$="?"]'); //Remove first blank option from select list
            //alert(blankSelectOptions.length);
            if (blankSelectOptions.length > 0) {
                $(blankSelectOptions).remove(); //no need to loop, using remove() it will remove all blank options Existed on the document
            }

        }, 1000);
    }

    function Clear() {
        $scope.EMP_ID = "";
        $scope.SALARY_FOR_MONTH = "";
        $scope.SALARY_DATE = "";
        $scope.PRESENT_DAYS = "";
        $scope.ADVANCE_SALARY = "";
        $scope.LOAN_INSTALLMENT = "";
        $scope.CURRENT_MOBILE_BILL = "";
        $scope.EXTRA_MOBILE_BILL = "";
        $scope.INCENTIVE_AMOUNT = "";
        $scope.SALARY_BONUS = "";
        $scope.IS_SALARY_HOLD = "";
        $scope.NET_SALARY = "";
        $scope.GROSS_SALARY = "";
        $scope.TOTAL_DEDUCTION = "";
        $scope.BASIC_SALARY = "";
        $scope.TOTAL_SALARY = "";
        $scope.TOTAL_SALARY = "";
        $scope.SALARY_FOR_MONTH = "";
        $scope.MONTH_NO = "";
        RemoveBlankOption();
    }

    $scope.AdminClick = function () {
        $scope.Admin_Action = "Add Monthly Salary";
        Clear();
        $("#Salary_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.PRESENT_DAYS = 0;
    };

    $scope.SelectBank = function () {
        $scope.IsBankSelected = "No";
    }

    $scope.Print = function () {
        $scope.IsBankSelected = "Yes";


        var chkids = "";
        $.each($(".checkbox_th input[type='checkbox']:checked"), function () {
            chkids += $(this).val() + ',';
        });

        if (chkids !== "") {
            $scope.SALARY_ID = chkids;
        }
        else {
            if ($scope.SALARY_ID === null || $scope.SALARY_ID === undefined || $scope.SALARY_ID === "") {

                return false;
            }
        }

        tb_Admin = {
            SALARY_ID: $scope.SALARY_ID,
            B_ID: $scope.B_ID

        };
        AddproductRecord(tb_Admin);
    }


    function AddproductRecord(tb_Admin) {

        $scope.currentDate = new Date();

        var getrecord = AdminService.PrintMonthlySalary(tb_Admin);
        getrecord.then(function (response) {
            $scope.PrintList = response.data;
            $scope.TOTAL_SALARY = $scope.PrintList[$scope.PrintList.length-1].TOTAL_SALARY;
            $scope.LOGO = $scope.PrintList[0].LOGO;
            $scope.BANK_NAME = $scope.PrintList[0].BANK_NAME;
            $scope.BRANCH_NAME = $scope.PrintList[0].BRANCH_NAME;
            $scope.ACC_NO = $scope.PrintList[0].ACC_NO;

            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }
   

    $scope.getForUpdate = function (Salary) {
        Clear();

        $scope.SALARY_ID = Salary.SALARY_ID;
        $scope.EMP_ID = Salary.EMP_ID;
        $scope.EMP_NAME = Salary.EMP_NAME;
        $scope.SALARY_FOR_MONTH = Salary.SALARY_FOR_MONTH;
        $scope.BASIC_SALARY = Salary.SALERY_PER_MONTH;
        $scope.SALARY_DATE = Salary.SALARY_DATE;
        $scope.PRESENT_DAYS = parseInt(Salary.PRESENT_DAYS);
        $scope.ADVANCE_SALARY = parseInt(Salary.ADVANCE_SALARY);
        $scope.LOAN_INSTALLMENT = parseInt(Salary.LOAN_INSTALLMENT);
        $scope.CURRENT_MOBILE_BILL = parseInt(Salary.CURRENT_MOBILE_BILL);
        $scope.EXTRA_MOBILE_BILL = parseInt(Salary.EXTRA_MOBILE_BILL);
        $scope.INCENTIVE_AMOUNT = parseInt(Salary.INCENTIVE_AMOUNT);
        $scope.SALARY_BONUS = parseInt(Salary.SALARY_BONUS);
        $scope.IS_SALARY_HOLD = Salary.IS_SALARY_HOLD ? 'true' : 'false';
        $scope.REG_DATE = Salary.REG_DATE;
        $scope.EMP_LOAN_ID = Salary.EMP_LOAN_ID;
        $scope.B_ID = Salary.COMPANY_BANK_ID;
        $scope.TOTAL_DEDUCTION = $scope.ADVANCE_SALARY + $scope.LOAN_INSTALLMENT + $scope.CURRENT_MOBILE_BILL + $scope.EXTRA_MOBILE_BILL;
        $scope.Admin_Action = "Update Monthly Salary";
        $("#Salary_add").modal({ backdrop: 'static', keyboard: false }).modal("show");
        $scope.GetEmpIncentive(); $scope.GetGrossSalary(); GetMonthNo(); GetEmpLoan(); 
    };

  
    $scope.GetSalaryCalculation = function () {
        GetSalaryCalculation();
    }

    function GetSalaryCalculation() {
       $scope.NET_SALARY = $scope.GROSS_SALARY - $scope.TOTAL_DEDUCTION;

        $scope.TOTAL_SALARY = $scope.NET_SALARY + $scope.SALARY_BONUS + $scope.INCENTIVE_AMOUNT;
    }


    function GetMonthNo() {
        if ($scope.SALARY_FOR_MONTH == "January") {
            var currentMonth = 1;
        }
        else if ($scope.SALARY_FOR_MONTH == "February") {
            var currentMonth = 2;
        }
        else if ($scope.SALARY_FOR_MONTH == "March") {
            var currentMonth = 3;
        }
        else if ($scope.SALARY_FOR_MONTH == "April") {
            var currentMonth = 4;
        }
        else if ($scope.SALARY_FOR_MONTH == "May") {
            var currentMonth = 5;
        }
        else if ($scope.SALARY_FOR_MONTH == "June") {
            var currentMonth = 6;
        }
        else if ($scope.SALARY_FOR_MONTH == "July") {
            var currentMonth = 7;
        }
        else if ($scope.SALARY_FOR_MONTH == "August") {
            var currentMonth = 8;
        }
        else if ($scope.SALARY_FOR_MONTH == "September") {
            var currentMonth = 9;
        }
        else if ($scope.SALARY_FOR_MONTH == "Octomber") {
            var currentMonth = 10;
        }
        else if ($scope.SALARY_FOR_MONTH == "November") {
            var currentMonth = 11;
        }
        else if ($scope.SALARY_FOR_MONTH == "December") {
            var currentMonth = 12;
        }
        $scope.MONTH_NO = currentMonth;
    }

    $scope.GetGrossSalary = function () {
      
        GetMonthNo();

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        //var daysInMonth = new Date(currentYear, $scope.MONTH_NO, 0).getDate();

        //var SalaryPerDay = $scope.BASIC_SALARY / parseInt(daysInMonth);

        var SalaryPerDay = $scope.BASIC_SALARY / 30;

        if ($scope.PRESENT_DAYS > 30) {
            $scope.GROSS_SALARY = 30 * SalaryPerDay;
        }
        else {
            /*$scope.GROSS_SALARY = parseInt($scope.PRESENT_DAYS) * SalaryPerDay;*/
            $scope.GROSS_SALARY = Math.ceil(parseInt($scope.PRESENT_DAYS) * SalaryPerDay);

        }


        /* GetSalaryCalculation();*/
    }

    $scope.GetEmpIncentive = function () {
        GetMonthNo();
        var SearchingConditions = GetSearchingConditions();
        var getAdmin = AdminService.GetMonthIncentive(SearchingConditions);
        getAdmin.then(function (response) {
            $scope.IncentiveList = response.data;
            $scope.INCENTIVE_AMOUNT = $scope.IncentiveList[0].INCENTIVE_AMOUNT;
        });
    }

    function GetEmployee()
    {
        var getAdmin = AdminService.GetEmployee();
        getAdmin.then(function (response) {
            $scope.EmpList = response.data;
            RemoveBlankOption();
        });
      
    }

    function GetEmpLoan() {
        var getAdmin = AdminService.GetEmpLoan($scope.EMP_ID);
        getAdmin.then(function (response) {
            $scope.LoanList = response.data;
            RemoveBlankOption();
        });

    }

    function GetCompanyBank() {
        var getAdmin = AdminService.GetCompanyBank();
        getAdmin.then(function (response) {
            $scope.BankList = response.data;
            RemoveBlankOption();
        });

    }

    $scope.GetBasicSalary = function () {
        var getAdmin = AdminService.GetBasicSalary($scope.EMP_ID);
        getAdmin.then(function (response) {
            $scope.BasicSalaryList = response.data;
            $scope.BASIC_SALARY = parseInt($scope.BasicSalaryList.SALERY_PER_MONTH);
        });

        GetEmpLoan();
        GetEmpIncentive();
    }

    $scope.GetLoanDetails = function () {
        if ($scope.EMP_LOAN_ID == undefined) {
            $scope.EMP_LOAN_ID = 0;
        }
        var getAdmin = AdminService.GetLoanDetails($scope.EMP_LOAN_ID);
        getAdmin.then(function (response) {
            $scope.LoanDetailList = response.data;
            $scope.LOAN_AMOUNT = $scope.LoanDetailList.LOAN_AMOUNT;
            $scope.INTREST_RATE = $scope.LoanDetailList.INTREST_RATE;
            $scope.INSTALLMENT_AMOUNT = $scope.LoanDetailList.INSTALLMENT_AMOUNT;
            $scope.LOAN_OUTSTANDING = $scope.LoanDetailList.LOAN_OUTSTANDING;
            $scope.TotalDeduction();
        });
       
    }

    $scope.TotalDeduction = function () {
        if ($scope.ADVANCE_SALARY == undefined) {
            $scope.ADVANCE_SALARY = null;
        }
        if ($scope.INSTALLMENT_AMOUNT == undefined) {
            $scope.INSTALLMENT_AMOUNT = null;
        }
        if ($scope.CURRENT_MOBILE_BILL == undefined) {
            $scope.CURRENT_MOBILE_BILL = null;
        }
        if ($scope.EXTRA_MOBILE_BILL == undefined) {
            $scope.EXTRA_MOBILE_BILL = null;
        }
        var TOTAL_DEDUCTION = $scope.ADVANCE_SALARY + $scope.INSTALLMENT_AMOUNT + $scope.CURRENT_MOBILE_BILL + $scope.EXTRA_MOBILE_BILL;
        $scope.TOTAL_DEDUCTION = parseInt(TOTAL_DEDUCTION);
    }

    $scope.AddAdmin = function () {

        $scope.SALARY_DATE = $("#SALARY_DATE").val();
        $("#loader").css("display", '');
        tb_Admin = {
            SALARY_ID: $scope.SALARY_ID,
            EMP_ID: $scope.EMP_ID,
            SALARY_FOR_MONTH: $scope.SALARY_FOR_MONTH,
            SALARY_DATE: $scope.SALARY_DATE,
            PRESENT_DAYS: $scope.PRESENT_DAYS,
            ADVANCE_SALARY: $scope.ADVANCE_SALARY,
            LOAN_INSTALLMENT: $scope.INSTALLMENT_AMOUNT,
            CURRENT_MOBILE_BILL: $scope.CURRENT_MOBILE_BILL,
            EXTRA_MOBILE_BILL: $scope.EXTRA_MOBILE_BILL,
            INCENTIVE_AMOUNT: $scope.INCENTIVE_AMOUNT,
            SALARY_BONUS: $scope.SALARY_BONUS,
            EMP_LOAN_ID: $scope.EMP_LOAN_ID,
            B_ID: $scope.B_ID,
            TOTAL_SALARY: $scope.TOTAL_SALARY,
            NET_SALARY: $scope.NET_SALARY,
            GROSS_SALARY: $scope.GROSS_SALARY,
            IS_SALARY_HOLD: $scope.IS_SALARY_HOLD
        };
        if ($scope.Admin_Action === "Add Monthly Salary") {
            AddAdminRecord(tb_Admin);
        }
        else if ($scope.Admin_Action === "Update Monthly Salary") {
            EditAdminRecord(tb_Admin);
        }
    };

    function AddAdminRecord(tb_Admin) {
        var datalist = AdminService.AddAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === "true") {
                Clear(); GetTotalcount();
                alert("Monthly Salary added successfully.");
                $("#Salary_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success != undefined) {
                alert("Monthly Salary already added by " + d.data.success +".");
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
        var datalist = AdminService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetTotalcount();
                alert("Monthly Salary updated successfully.");
                $("#Salary_add").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Monthly Salary already added.");
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

    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    $scope.exportToExcel = function () {
        EmployeeTaskExport();
    }

    function EmployeeTaskExport() {
        var SearchingConditions = GetSearchingConditions();
        var getrecord = AdminService.EmployeeTaskExport(SearchingConditions);
        getrecord.then(function (response) {
            var blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Employee Task Report.xls';
            link.click();
            $("#loader").css("display", 'none')
        }, function () {
            $("#loader").css("display", 'none');
        });

    }


    $scope.print = function (id) {
        //tb_Admin = {
        //    Q_ID: $scope.Q_ID
        //}

        //var datalist = QuotationService.UpdateQuotationDetails(tb_Admin);
        //datalist.then(function (d) {
        //    if (d.data.success === true) {
        //        alert("Quotation Details updated successfully.");

        //$scope.IsBankSelected = "Yes";
        //        var printHtml = document.getElementById(id).outerHTML;
        //        var currentPage = document.body.innerHTML;
        //        var elementPage = '<html><body><div style=" padding: 0px 0px;">' + printHtml + '</div> </body></html>';

        //        var WindowObject = window.open();
        //        WindowObject.document.write(elementPage);
        //        WindowObject.document.close();

        $scope.IsBankSelected = "Yes";
      
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
                    window.location.href = "/Monthly_Salary/Index";
                }, 1000);


        //    }
        //    else if (d.data.success === false) {
        //        alert("Error occured while updating Quotation details");
        //    }
        //    else {
        //        alert("Error.");
        //    }
        //},
        //    function () {
        //        alert("Error.");
        //    }
        //);
    }

});