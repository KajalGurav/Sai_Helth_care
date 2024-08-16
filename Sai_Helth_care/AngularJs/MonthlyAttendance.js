app.service("ReportService", function ($http) {


    this.GetReport = function (dms) {


        //alert(JSON.stringify(dms));

        var response = $http({
            method: "POST",
            url: "/Attendance/GetallAdmin",
            data: JSON.stringify(dms)
        });
        return response;
    };

    //this.GetAllEmployee = function () {
    //    return $http.get("/LeaveReport/GetAllEmployee");
    //};

    this.GetAllEmployee = function () {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetEmployeeList"
        });
        return response;
    };

});





app.controller("AdminCtrl", function ($scope, ReportService) {

    $scope.STARTING_DATE = null;
    $scope.ENDING_DATE = null;


    GetRecord();
    GetAllEmployee();
    function GetAllEmployee() {
        var getState = ReportService.GetAllEmployee();
        getState.then(function (response) {
            $scope.EmployeeList1 = response.data;
        });
    }
    function GetRecord() {
        var dealer = {
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE,
            EMPLOYEE_ID: $scope.EMP_ID,

        };
        var getdatereport = ReportService.GetReport(dealer);
        getdatereport.then(function (response) {
            $scope.EmployeeList = response.data;
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
        });

    }

    //function convertDate(inputFormat) {
    //    function pad(s) { return (s < 10) ? '0' + s : s; }
    //    var d = new Date(inputFormat)
    //    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    //}
    //$scope.exportToExcel = function () {
    //    var wb = XLSX.utils.table_to_book(document.getElementById('dvData'));
    //    var date = new Date();
    //    var rand = getRandomInteger(100000, 999999);
    //    var name = 'Attendence' + rand.toString() + '-' + convertDate(date) + '.xlsx';
    //    XLSX.writeFile(wb, name);
    //};



    //function getRandomInteger(min, max) {
    //    min = Math.ceil(min);
    //    max = Math.floor(max);
    //    return Math.floor(Math.random() * (max - min + 1)) + min;
    //}


    $scope.getdate = function () {
        $scope.STARTING_DATE = $("#STARTING_DATE1").val();
        $scope.ENDING_DATE = $("#ENDING_DATE1").val();

        $("#loader").css("display", '');
        var dms =
        {
            STARTING_DATE: $scope.STARTING_DATE,
            ENDING_DATE: $scope.ENDING_DATE,
            EMPLOYEE_ID: $scope.EMP_ID,
            // SALESTEAM_ID: $scope.SALESTEAM_ID
        };
        var getcount = ReportService.GetReport(dms);
        getcount.then(function (response) {
            $scope.EmployeeList = response.data;
            $("#loader").css("display", 'none');
        }, function () {
            // $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    };



    //$scope.GetbtnExport = function () {
    //    window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
    //    e.preventDefault();
    //    //$("#btnExport").click(function (e) {

    //    //});

    //}


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }


    $scope.exportToExcel = function () {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        $scope.SDATE = $("#STARTING_DATE1").val();
        $scope.EDATE = $("#ENDING_DATE1").val();
        if ($scope.SDATE === undefined || $scope.SDATE === null || $scope.SDATE === "") {
            $scope.SDATE = firstDay.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
        if ($scope.EDATE === undefined || $scope.EDATE === null || $scope.EDATE === "") {
            $scope.EDATE = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
        var wb = XLSX.utils.table_to_book(document.getElementById('dvData'));
        //  var rand = getRandomInteger(100000, 999999);
        var name = 'Monthly Attendence Report' + ' Date Range: ' + convertDate($scope.SDATE) + '-' + convertDate($scope.EDATE) + '.xlsx';
        XLSX.writeFile(wb, name);
    }
    function convertDate(inputFormat) {
        //function pad(s) { return (s < 10) ? '0' + s : s; }
        //var d = new Date(inputFormat)
        //return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')

        function pad(s) { return (s < 10) ? '0' + s : s; }
        var dateComponents = inputFormat.split('/');

        // Ensure the array has three components (day, month, year)
        if (dateComponents.length === 3) {
            var day = parseInt(dateComponents[0], 10);
            var month = parseInt(dateComponents[1], 10) - 1; // Months are zero-based
            var year = parseInt(dateComponents[2], 10);

            // Create a new Date object
            var d = new Date(year, month, day);

            // Check if the date is valid
            if (!isNaN(d.getTime())) {
                // Format the date using underscores
                return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('_');
            }
        }

        // Return an empty string if the date is not valid
        return '';
    }


});

