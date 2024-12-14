app.service("AdminService", function ($http) {

    this.GetAdminProfile = function () {
        return $http.get("/AdminMaster/GetAdminProfile");
        
    };



    //this.EditAdmin = function (tb_Admin) {
    //    var response = $http({
    //        method: "POST",
    //        url: "/AdminMaster/EditProfile",
    //        data: JSON.stringify(tb_Admin),
    //        dataType: "json"
    //    });
    //    return response;
    //};





});

app.controller("AdminCtrl", function ($scope, AdminService) {
    $("#loader").css("display", 'none');
    GetAdminDetails();

    function GetAdminDetails() {
        var getAdmin = AdminService.GetAdminProfile();
        getAdmin.then(function (response) {
            $scope.Admin = response.data;
            console.log(JSON.stringify($scope.Admin));
            //$("#tempCustId").val($scope.CustomerList[0].CUSTOMER_ID);
        });
    }
    //alert();
    //$("#loader").css("display", '');
    //GetAdminDetails();
    //function GetAdminDetails() {
    //    var getAdmin = AdminService.GetAdminProfile();
    //    getAdmin.then(function (response) {
    //        $scope._Party = response.data;
    //        $("#loader").css("display", 'none');
    //        $scope.EMP_ID = $scope._Party.EMP_ID;
    //        $scope.EMP_NAME = $scope._Party.EMP_NAME;
    //        $scope.DESI_NAME = $scope._Party.DESI_NAME;
    //        $scope.EMP_DOB = $scope._Party.EMP_DOB;
    //        $scope.CONTACT_NO = parseInt($scope._Party.CONTACT_NO);
    //        //$scope.PASSWORD = $scope._Party.PASSWORD;
    //        $scope.PERMENENT_ADDRESS = $scope._Party.PERMENENT_ADDRESS;
    //        $scope.EMAIL = $scope._Party.EMAIL;
    //    });
    //}

    //$scope.AddAdmin = function () {

    //    $("#loader").css("display", '');
    //    tb_Admin = {
    //        ADMIN_ID: $scope.ADMIN_ID, //for update table
    //        ADMIN_NAME: $scope.ADMIN_NAME,
    //        DESIGNATION = $scope._Party.DESIGNATION;
    //        DATE_OF_BIRTH = $scope._Party.DATE_OF_BIRTH;
    //        MOBILE_NO: $scope.MOBILE_NO,
    //        ADDRESS: $scope.ADDRESS,
    //        EMAIL: $scope.EMAIL,
    //        //PASSWORD: $scope.PASSWORD,
    //        //ADMIN_PHOTO: $scope.ADMIN_PHOTO
    //    };




    //    var datalist = AdminService.EditAdmin(tb_Admin);
    //    datalist.then(function (d) {
    //        if (d.data.success === true) {
    //            alert("Profile updated successfully.");
    //            window.location.href = '/Home/Index';
    //            $("#loader").css("display", 'none');
    //        }
    //        else if (d.data.success === false) {
    //            alert("Profile not updated.");
    //            $("#loader").css("display", 'none');
    //        }
    //        else {
    //            alert("Error.");
    //        }
    //    },
    //        function () {
    //            alert("Error.");
    //            $("#loader").css("display", 'none');
    //        });
    //};








});