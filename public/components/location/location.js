/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlLocation', ['myModel','Geo']).controller('LocationController', function($rootScope, $scope, httpFactory, geolocationApi) {

    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';
    $scope.getLocation = function () {
        geolocationApi.getCurrentPosition()
            .then(function (response) {
                $scope.lat = response.coords.latitude;
                $scope.long = response.coords.longitude;
            }, function (error) {
                console.log(error.message);
            });
    };


/*    $scope.geocoder = new google.maps.Geocoder();
    $scope.geocode= function () {
        console.log("Geocode " + $scope.address);

        $scope.geocoder.geocode( { "address": $scope.address}, function(results, status) {
                console.log("Status: " + status);
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {

                var location = results[0].geometry.location;
               $scope.lat = location.lat();
               $scope.long = location.lng();                    //location wird erst beim 2ten click angezeigt weil die verarbeitung noch nicht
            }                                                   //abgeschlossen ist. Entweder mit $scope.$digest() oder besser nem promise lösen
        });
    }*/


});