app.service("RegularService", function ($http) {


    this.GetRegularServiceReport = function () {
        var response = $http({
            method: "POST",
            url: "/MindrayServiceReport/GetRegularServiceReport",
            data: JSON.stringify()
        });
        return response;
    };

    this.GetSparepartCollection = function () {
        var response = $http({
            method: "POST",
            url: "/MindrayServiceReport/GetSparepartCollection",
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
            $scope.AdminList = response.data;
        },
            function () {
                $.notify("Error to load data...", "error");
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