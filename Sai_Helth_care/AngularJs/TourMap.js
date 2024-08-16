app.service("TourService", function ($http) {

    this.GetTourMap = function (tb_Admin) {
        var response = $http({
            method: "POST",
            url: "/Employee_Regi/GetTourMap",
            data: JSON.stringify(tb_Admin),
            dataType: "json"
        });
        return response;
    };
});


app.controller("TourCtrl", function ($scope, TourService) {

  


    $scope.getdate = function () {

        //alert(1);



        $scope.STARTING_DATE = $("#STARTING_DATE").val();


        if ($scope.STARTING_DATE === "" || $scope.STARTING_DATE == 'undefined' || $scope.STARTING_DATE == null) {
            DATE = null;
        } else {
            DATE = DateToString($scope.STARTING_DATE);

        }



        tb_obj = {

            EMPLOYEE_ID: $scope.EMPLOYEE_ID,
            DATE: DATE
        }

        GetTourMap(tb_obj);
    }

    function DateToString(DT) {
        var dateFormatted;

        var monthNumber = [{ MID: "01", MNAME: "Jan" }, { MID: "02", MNAME: "Feb" }, { MID: "03", MNAME: "Mar" }, { MID: "04", MNAME: "Apr" }, { MID: "05", MNAME: "May" },
        { MID: "06", MNAME: "Jun" }, { MID: "07", MNAME: "Jul" }, { MID: "08", MNAME: "Aug" }, { MID: "09", MNAME: "Sep" }, { MID: "10", MNAME: "Oct" }, { MID: "11", MNAME: "Nov" },
        { MID: "12", MNAME: "Dec" }];
        var dateArray = DT.split('/');
        for (iC in monthNumber) {
            let R = monthNumber[iC];
            if (R.MID == dateArray[1]) {
                dateFormatted = dateArray[0] + ' ' + R.MNAME + ' ' + dateArray[2];
            }
        }
        return dateFormatted;
    }

    function GetTourMap(tb_obj) {
        var getState = TourService.GetTourMap(tb_obj);
        getState.then(function (response) {
            $scope.TourList = response.data;
            //alert(JSON.stringify($scope.EmpList));

            if (response.data.length == 0) {
                alert("Visit not available to map!");

                var mapOptions = {
                    center: new google.maps.LatLng('20.0333', '73.833298'),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                // alert(markers.length);
                var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

                return;
            }

            var markers = $scope.TourList;
            var mapOptions = {
                center: new google.maps.LatLng(markers[0].LATITUDE, markers[0].LONGITUDE),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // alert(markers.length);
            var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
            var infoWindow = new google.maps.InfoWindow();
            var lat_lng = new Array();
            var latlngbounds = new google.maps.LatLngBounds();
            var legend = document.getElementById("legend");
            legend.innerHTML = "";
            var useAplhabets = document.getElementById("alphabet").checked;
            var start_letter_code = useAplhabets ? 97 : 1;
            var marker_color = "009BEE";
            var marker_text_color = "FFFFFF";
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var labelIndex = 0;
            // alert(markers.length);
            for (i = 0; i < markers.length; i++) {

                var character = useAplhabets ? String.fromCharCode(start_letter_code).toUpperCase() : start_letter_code;
                start_letter_code++;

                var data = markers[i];
                //alert(markers[i]);

                var myLatlng = new google.maps.LatLng(data.LATITUDE, data.LONGITUDE);
                lat_lng.push(myLatlng);

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: data.TYPE + ", Time:" + data.TIME ,
                    distance: data.Distance,
                    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + character + "|" + marker_color + "|" + marker_text_color
                    //label: labels[labelIndex++ % labels.length],
                });

                latlngbounds.extend(marker.position);
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        infoWindow.close();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(map, marker);
                    });
                })(marker, data);
                latlngbounds.extend(marker.position);
                legend.innerHTML += "<div style = 'margin:5px'><img align = 'middle' src = '" + marker.icon + "' />&nbsp;" + marker.title + " " + "Approx km :" + " " + marker.distance + " " + "km" + "</div>";

            }

            var bounds = new google.maps.LatLngBounds();

            console.log("bounds");
            console.log(bounds);

            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);

            //***********ROUTING****************//

            //Initialize the Path Array
            var path = new google.maps.MVCArray();

            //Initialize the Direction Service
            var service = new google.maps.DirectionsService();

            //Set the Path Stroke Color
            var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

            //Loop and Draw Path Route between the Points on MAP
            for (var i = 0; i < lat_lng.length; i++) {
                if ((i + 1) < lat_lng.length) {
                    var src = lat_lng[i];
                    var des = lat_lng[i + 1];
                    path.push(src);
                    poly.setPath(path);
                    service.route({
                        origin: src,
                        destination: des,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    }, function (result, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                path.push(result.routes[0].overview_path[i]);
                            }
                        }
                    });
                }
            }
        });
    }
});