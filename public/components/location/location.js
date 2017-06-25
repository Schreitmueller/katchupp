/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlLocation', []).controller('LocationController', function($scope) {

    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';
    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    function showPosition(position) {
        console.log(position.coords);
    }

/*    $scope.geocoder = new google.maps.Geocoder();
    $scope.geocode= function () {
        console.log("Geocode " + $scope.address);

        $scope.geocoder.geocode( { "address": $scope.address}, function(results, status) {
                console.log("Status: " + status);
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {

                var location = results[0].geometry.location;
               $scope.lat = location.lat();
               $scope.long = location.lng();
            }
        });
    }*/


});