/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('Ctrl2', ['myModel']).controller('Controller2', function($scope, test) {
    var events = [];
    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';
    $scope.events;

    getEvents();

    function getEvents() {                       //Alle Events vom Server abfragen
        test.getEvents()
            .then(function (response) {
                $scope.events = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    /*var event = {                                   Beispiel Event an den Server schicken
        name: "testevent5"
    };
    test.insertEvent(event);*/

    FB.api('/me/events?fields=attending_count,category,description,start_time,place', function(response) {
        console.log(response);
    });

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