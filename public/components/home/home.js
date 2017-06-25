/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlHome', ['myModel']).controller('HomeController', function($scope, httpFactory) {

    $scope.events;
    $scope.status;
    getEvents();

    //API CALLS
    var i = 1;
    FB.api('/me/events?fields=attending_count,category,description,start_time,place,cover&since=1417508443', function(response) {
        console.log(response);
        console.log(date);
        nextPage(response);
    });
    function nextPage(response) {                                        // rekursive Funktion macht Http Get Req an die nächste Seite
        if(response.paging.next && i<3) {                                      // (Facebook SDK Pagination)
            FB.api(response.paging.next,'GET', {},function(response) {
                console.log(response);
                i++;
                nextPage(response);
            })
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
        httpFactory.updateEvents(event)
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
                $scope.events.push(event);
            }, function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
    }

});