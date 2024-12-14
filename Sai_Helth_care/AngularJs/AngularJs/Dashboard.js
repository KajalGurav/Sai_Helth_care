app.service("HomeService", function ($http) {
    this.DashBoardCount = function () {
        return $http.get("/Home/GetallHomeCount");
    };
    this.DashBoardCount1 = function () {
        return $http.get("/Home/GetallHomeCount1");
    };
});
app.controller("HomeCtrl", function ($scope, HomeService){
    /* $("#loader").css("display",'');*/
    $("#loader").css("display", 'none');
    GetHomecount1();
    GetHomecount();
    function GetHomecount() {
        var getdatereport1 = HomeService.DashBoardCount();
        getdatereport1.then(function (response) {
            $scope.HomeList = response.data;
            /*GetallTodaysProductEnquiery();*/
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }

    function GetHomecount1() {
        var getdatereport2 = HomeService.DashBoardCount1();
        getdatereport2.then(function (response) {
            $scope.HomeList1 = response.data;
            /*GetallTodaysProductEnquiery();*/
            $("#loader").css("display", 'none');
        }, function () {
            $.notify("Error to load data...", "error");
            $("#loader").css("display", 'none');
        });
    }
   
});