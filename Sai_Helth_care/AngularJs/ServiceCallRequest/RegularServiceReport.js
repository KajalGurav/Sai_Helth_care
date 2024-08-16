app.service("RegularService", function ($http) {

    
    this.GetRegularServiceReport = function () {
        var response = $http({
            method: "POST",
            url: "/RegularServiceReport/GetRegularServiceReport",
            data: JSON.stringify()
        });
        return response;
    };

    this.GetSparepartCollection = function () {
        var response = $http({
            method: "POST",
            url: "/RegularServiceReport/GetSparepartCollection",
            data: JSON.stringify()
        });
        return response;
    };

});

app.controller("RegularServiceCtrl", function ($scope, RegularService) {

    GetRegularServiceReport();
    GetSparepartCollection();
    function GetRegularServiceReport() {
        var getrecord = RegularService.GetRegularServiceReport();
        getrecord.then(function (response) {
            $scope.ServiceList = response.data;
            $scope.ServiceReportID = $scope.ServiceList[0].ServiceReportID;
            $scope.CustomerDetails = $scope.ServiceList[0].CustomerDetails;
            $scope.NatureOfProblem= $scope.ServiceList[0].NatureOfProblem;
            $scope.WorkDoneSolution = $scope.ServiceList[0].WorkDoneSolution;
            $scope.ServiceCharges = $scope.ServiceList[0].ServiceCharges;
            $scope.Total = $scope.ServiceList[0].Total;
            $scope.EngineerRemark = $scope.ServiceList[0].EngineerRemark;
            $scope.BANK_NAME = $scope.ServiceList[0].BANK_NAME;
            $scope.ACC_NO = $scope.ServiceList[0].ACC_NO;
            $scope.IFSC_CODE = $scope.ServiceList[0].IFSC_CODE;
            $scope.Date = $scope.ServiceList[0].Date;
            $scope.ModelNumber = $scope.ServiceList[0].ModelNumber;
            $scope.Make = $scope.ServiceList[0].Make;
            $scope.SWVersion = $scope.ServiceList[0].SWVersion;
            $scope.SerialNumber =$scope.ServiceList[0].SerialNumber;
            $scope.EMP_NAME = $scope.ServiceList[0].EMP_NAME;
            $scope.CompanyType = $scope.ServiceList[0].CompanyType;
            $scope.ServiceType = $scope.ServiceList[0].ServiceType;
            $scope.AmountInWord = $scope.ServiceList[0].AmountInWord;
            $scope.PaymentsDetails = $scope.ServiceList[0].PaymentsDetails;
            $scope.PaidAmount = $scope.ServiceList[0].PaidAmount;
            $scope.BalanceAmount = $scope.ServiceList[0].BalanceAmount;
            $scope.SelectWork = $scope.ServiceList[0].SelectWork;
            $scope.SelectCategory = $scope.ServiceList[0].SelectCategory;

            $scope.HospitalDiagnosticCenter = $scope.ServiceList[0].HospitalDiagnosticCenter;
            $scope.Address = $scope.ServiceList[0].Address;
            $scope.Department = $scope.ServiceList[0].Department;
            $scope.ContactPerson = $scope.ServiceList[0].ContactPerson;
            $scope.Telephone = $scope.ServiceList[0].Telephone;
            $scope.MobileNumber = $scope.ServiceList[0].MobileNumber;
            $scope.ZipPostalCode = $scope.ServiceList[0].ZipPostalCode;
            $scope.Title = $scope.ServiceList[0].Title;
            $scope.Email = $scope.ServiceList[0].Email;
            $scope.Accessories = $scope.ServiceList[0].Accessories;
            $scope.Warranty = $scope.ServiceList[0].Warranty;
            $scope.WarrantyStartDate = $scope.ServiceList[0].WarrantyStartDate;
            $scope.WarrantyEndDate = $scope.ServiceList[0].WarrantyEndDate;
            $scope.ServiceInformation = $scope.ServiceList[0].ServiceInformation;
            $scope.MalfunctionDescription = $scope.ServiceList[0].MalfunctionDescription;
            $scope.ServiceProcess = $scope.ServiceList[0].ServiceProcess;
            $scope.SatisfactionFeedback = $scope.ServiceList[0].SatisfactionFeedback;
            $scope.Comment = $scope.ServiceList[0].Comment;
            $scope.CustomerName = $scope.ServiceList[0].CustomerName;
            $scope.EngineerName = $scope.ServiceList[0].EngineerName;
            $scope.BankID = $scope.ServiceList[0].BankID;
            $scope.ModelName = $scope.ServiceList[0].ModelName;
            $scope.CS_SpecificSuggestion = $scope.ServiceList[0].CS_SpecificSuggestion;
            $scope.CompanyLogo = $scope.ServiceList[0].CompanyLogo;
            $scope.SafetyInspection = $scope.ServiceList[0].SafetyInspection;
            $scope.FunctionTest = $scope.ServiceList[0].FunctionTest;
            $scope.SoftwareUpgrade = $scope.ServiceList[0].SoftwareUpgrade;
            $scope.NewSoftwareVersion = $scope.ServiceList[0].NewSoftwareVersion;
           /* updateCheckboxes();*/
            var valuesArray = $scope.SelectWork.split(',');
            var valuesArray1 = $scope.SelectCategory.split(',');

            for (var i = 0; i < valuesArray.length; i++) {
                if (valuesArray[i] == "Earthing") {
                    $scope.Earthing = true;
                }
                if (valuesArray[i] == "Carban brushesh length") {
                    $scope.CarbanBrusheshLength=true
                }
                if (valuesArray[i] == "Cooling in console") {
                    $scope.CoolingInConsole=true;
                }
                if (valuesArray[i] == "Patient table grising and oliling") {
                    $scope.PatientTableGrisingAndOliling = true;
                }
                if (valuesArray[i] == "Supply voltage 3 phase") {
                    $scope.SupplyVoltage3Phase = true;
                }
                if (valuesArray[i] == "Colling in gantry room") {
                    $scope.CollingInGantryRoom = true;
                }
                if (valuesArray[i] == "Slip ring clean") {
                    $scope.SlipRingClean = true;
                }
                if (valuesArray[i] == "Console UPS backup") {
                    $scope.ConsoleUPSBackup = true;
                }
                if (valuesArray[i] == "Carban brushesh length") {
                    $scope.CarbanBrusheshLength = true;
                }
                if (valuesArray[i] == "Neutral") {
                    $scope.Neutral = true;
                }
                if (valuesArray[i] == "Ear") {
                    $scope.Ear = true;
                }
            }


            for (var i = 0; i < valuesArray1.length; i++) {
                if (valuesArray1[i] == "Breakdown") {
                    $scope.Breakdown = "Breakdown";
                }
                if (valuesArray1[i] == "Upgrade") {
                    $scope.Upgrade = "Upgrade"
                }
                if (valuesArray1[i] == "Customer Visit") {
                    $scope.CustomerVisit = "Customer Visit";
                }
                if (valuesArray1[i] == "Installation") {
                    $scope.Installation = "Installation";
                }
                if (valuesArray1[i] == "Field fault correction") {
                    $scope.FieldFaultCorrection = "Field fault correction";
                }
                if (valuesArray1[i] == "Others") {
                    $scope.Others = "Others";
                }
            }

        },
            function () {
            $.notify("Error to load data...", "error");
            });
        
    }

    function updateCheckboxes() {
        var SelectCategory = $scope.SelectCategory;
        var categoriesArray = SelectCategory.split(',');

        categoriesArray.forEach(function (category) {
            switch (category.trim()) {
                case 'Breakdown':
                    $scope.categories.Breakdown = true;
                    break;
                case 'Installation':
                    $scope.categories.Installation = true;
                    break;
                case 'Upgrade':
                    $scope.categories.Upgrade = true;
                    break;
                case 'Field fault correction':
                    $scope.categories.FieldFaultCorrection = true;
                    break;
                case 'Customer Visit':
                    $scope.categories.CustomerVisit = true;
                    break;
                default:
                    break;
            }
        });
    }

    function GetSparepartCollection() {
        var getrecord = RegularService.GetSparepartCollection();
        getrecord.then(function (response) {
            $scope.SpCollectionList = response.data;
        },
            function () {
                $.notify("Error to load data...", "error");
            });
    }
});