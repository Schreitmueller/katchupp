/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('Ctrl2', []).controller('Controller2', function($scope) {
    var events = [];
    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';
    FB.api('/me/events?fields=attending_count,category,description,start_time,place', function(response) {
        var events = [];
        var date = getCurrentDate();
        console.log(date);
        for(i=0; i<response.data.length; i++) {
            var event = response.data[i].start_time;
            var eventDate = event.substr(0, event.length - 14);
            if (eventDate == date) {
                events.push(response.data[i]);
            }
        }
        console.log(events);
    });
    function getCurrentDate() {
        var currentDate = new Date();
        var month = fillDigets(currentDate.getMonth() + 1);
        var day = fillDigets(currentDate.getDate());
        var year = currentDate.getFullYear().toString();
        return year + '-' + month + '-' + day;
        function fillDigets(nmbr) {
            var string = nmbr.toString();
            if (string.length == 1) {
                string = '0'+ string;
            }
            return string;
        }
    }

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