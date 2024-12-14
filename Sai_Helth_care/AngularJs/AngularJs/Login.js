app.service("LoginService", function ($http) {

    this.GetCompany = function () {
        return $http.get("/Home/GetCompany");
    };
});



app.controller("LoginCtrl", function ($scope, LoginService) {


    $("#loader").css("display", '');
    GetCompany();
   


    function GetCompany() {
        var getdatereport1 = LoginService.GetCompany();
        getdatereport1.then(function (response) {
            $scope.CompanyList = response.data;
        }, function () {
            $.notify("Error to load data...", "error");
        });
    }


});