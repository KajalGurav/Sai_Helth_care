app.service("SolutionService", function ($http) {

    this.TotalRecordCount = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Solution_bank/TotalRecordCount",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };


    this.getRecordbyPaging = function (SearchingConditions) {
        var response = $http({
            method: "POST",
            url: "/Solution_bank/GetSolutionBankList",
            data: JSON.stringify(SearchingConditions)
        });
        return response;
    };

    this.EditAdmin = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Solution_bank/UpdateSolutionBankAnswer",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };

});

app.controller("adminCtrl", function ($scope, SolutionService) {


    $("#loader").css("display", '');
    $scope.PageNo = 1;
    $scope.pageSize = 30;
    $scope.SEARCH_NAME = null;
    GetTotalcount();
  
    function GetTotalcount() {
        var SearchingConditions = GetSearchingConditions();
        var getcount = SolutionService.TotalRecordCount(SearchingConditions);
        getcount.then(function (d) {
            $scope.totalRecordCount = d.data.success;
            if ($scope.totalRecordCount === 0) {
                $scope.SolutionBankList = "";
            }
            $("#loader").css("display", 'none');
            initController();
        }, function () {
            $.notify("Error to load data...", "error");

        });

    }




    function GetSearchingConditions() {

        if ($scope.PRODUCT_SEARCH_NAME === undefined || $scope.PRODUCT_SEARCH_NAME === "" || $scope.PRODUCT_SEARCH_NAME === null) {
            $scope.PRODUCT_SEARCH_NAME = null;
        }

        var SearchingConditions = {
            PageNo: $scope.PageNo,
            pageSize: $scope.pageSize,
            SEARCH_NAME: $scope.SEARCH_NAME
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
            $scope.SolutionBankList = {};

            return;
        }
        $scope.pager = GetPager($scope.totalRecordCount, page, $scope.pageSize);
        $scope.PageNo = $scope.pager.currentPage;

        GetRecordbyPaging();
    }

    function GetRecordbyPaging() {
        $("#loader").css("display", '');
        var SearchingConditions = GetSearchingConditions();
        var getrecord = SolutionService.getRecordbyPaging(SearchingConditions);
        getrecord.then(function (response) {
            $scope.SolutionBankList = response.data;

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
        $scope.SB_ID = "";
        $scope.SOLUTION_DESCRIPTION = "";
    }
  
    $scope.getForUpdate = function (admin) {
        $scope.SB_ID = parseInt(admin.SB_ID);
        $scope.SOLUTION_DESCRIPTION = admin.SOLUTION_DESCRIPTION;
      
        $scope.Admin_Action = "Update Solution";
       
        $("#Admin_Addupdate").modal({ backdrop: 'static', keyboard: false }).modal("show");
    };



    $scope.UpdateAdmin = function () {
        $("#loader").css("display", '');

        tb_Admin = {
            SB_ID: parseInt($scope.SB_ID),
            SOLUTION_DESCRIPTION: $scope.SOLUTION_DESCRIPTION
        };
        if ($scope.Admin_Action === "Update Solution") {
          EditAdminRecord(tb_Admin);
        }
    };

    function EditAdminRecord(tb_Admin) {
        var datalist = SolutionService.EditAdmin(tb_Admin);
        datalist.then(function (d) {
            if (d.data.success === true) {
                Clear(); GetRecordbyPaging();
                alert("Solution updated successfully.");
                $("#Admin_Addupdate").modal("hide");
                $("#loader").css("display", 'none');
            }
            else if (d.data.success === false) {
                alert("Solution already added.");
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


    $scope.GoToPreviousNextPage = function (pagehistory) {
        if (pagehistory === "Previous") {
            history.back(); //Go to the previous page
        }
    }

    $scope.ViewSoltion = function (SOLUTION_DESCRIPTION) {
        $("#SolutionView").modal("show");
        $scope.ObservationAndSoltion = SOLUTION_DESCRIPTION;
    }

});