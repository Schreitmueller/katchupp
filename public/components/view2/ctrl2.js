/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('Ctrl2', []).controller('Controller2', function($scope) {

    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';


    $scope.geocoder = new google.maps.Geocoder();
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
    }


});