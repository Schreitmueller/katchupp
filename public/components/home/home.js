/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlHome', ['myModel']).controller('HomeController', function($scope, httpFactory) {

    $scope.status;


    //API CALLS
    var p = 1;
    var time = Math.round(new Date().getTime()/1000);
    var timestamp = time.toString();
    console.log(timestamp);

    FB.api('/me/events?fields=attending_count,name,category,description,start_time,place,cover&since='+timestamp, function(response) {
        console.log(response);
        toServer(response);
        nextPage(response);
    });
    getEvents();

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
                city: response.data[i].place.location.city
            };
            updateEvents(event);
        }
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
                $scope.status = 'Event successfully updated';
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

});