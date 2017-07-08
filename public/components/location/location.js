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

    FB.api('/me/events?fields=attending_count,name,category,description,start_time,place,cover,end_time&since='+timestamp, function(response) {
        console.log(response.data);
        toServer(response);
        nextPage(response);
    });

    function nextPage(response) {                                        // rekursive Funktion macht Http Get Req an die nächste Seite
        if(response.paging.next && p<3) {                                      // (Facebook SDK Pagination)
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
                start_time: response.data[i].start_time,
                end_time: response.data[i].end_time,
                cover: response.data[i].cover.source
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

    $scope.getLocation = function (switchPath) {
        geolocationApi.getCurrentPosition()
            .then(function (response) {
                $scope.lat = response.coords.latitude;
                $scope.long = response.coords.longitude;
                $rootScope.coords = response.coords;
                if(switchPath) {
                    $location.path('/home');
                }
            }, function (error) {
                console.log(error.message);
            });
    };

    $scope.getNearbyCities = function(){
        // Working example url http://gd.geobytes.com/GetNearbyCities?radius=10000&Latitude=48.2656&Longitude=10.98461&limit=5
        console.log("Trying to get closest cities");
        httpFactory.getNearestCities($scope.lat,$scope.long)
            .then(function (response) {            //Asynchron mit Promise
                $scope.events = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
});