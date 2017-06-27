/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlLocation', ['myModel','Geo']).controller('LocationController', function($rootScope, $scope, $location, httpFactory, geolocationApi) {

    $scope.lat=0;
    $scope.long=0;
    $scope.tagline = 'Youre logged in';
    $scope.status = 'Bitte warten bis deine upcoming Events an den Server geschickt wurden...';

    //API CALLS
    var p = 1;
    var time = Math.round(new Date().getTime()/1000);
    var timestamp = time.toString();

    FB.api('/me/events?fields=attending_count,name,category,description,start_time,place,cover&since='+timestamp, function(response) {
        console.log(response.data);
        toServer(response);
        nextPage(response);
    });

    function nextPage(response) {                                        // rekursive Funktion macht Http Get Req an die nächste Seite
        if(response.paging.next && i<3) {                                      // (Facebook SDK Pagination)
            FB.api(response.paging.next,'GET', {},function(response) {
                console.log(response);
                p++;
                toServer(response);
                nextPage(response);
            })
        }
    }
    function toServer(response) {                                       //alle events an den server schicken bzw. updaten.
        for(i=0; i<response.data.length; i++) {
            var event = {
                _id: response.data[i].id,
                name: response.data[i].name,
                description: response.data[i].description,
                attending_count: response.data[i].attending_count,
                latitude: response.data[i].place.location.latitude,
                longitude: response.data[i].place.location.longitude,
                city: response.data[i].place.location.city,
                start_time: response.data[i].start_time
            };
            updateEvents(event);
        }
        $scope.status = 'Your Events have been successfully sent to the Server or updated';
    }

    //REST Functions

    function getEvents() {                       //Alle Events vom Server abfragen
        httpFactory.getEvents()
            .then(function (response) {            //Asynchron mit Promise
                $scope.events = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    function updateEvents(event) {                 //update Event -> falls Event nicht existiert, wird per upsert neues Event erstellt
        httpFactory.updateEvent(event)
            .then(function (response) {
                console.log(response);
            }, function (error) {
                $scope.status = 'Unable to update customer data: ' + error.message;
            });
    }
    function insertEvent(event) {      //Event an den Server schicken (manuell-> besser update, Doppelte Events möglich)
        httpFactory.insertEvent(event)
            .then(function (response) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
            }, function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
    }

    //Geolocation

    $scope.getLocation = function () {
        geolocationApi.getCurrentPosition()
            .then(function (response) {
                $scope.lat = response.coords.latitude;
                $scope.long = response.coords.longitude;
                $rootScope.coords = response.coords;
                $location.path('/home');
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