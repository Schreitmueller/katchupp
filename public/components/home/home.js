/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlHome', ['myModel']).controller('HomeController', function($rootScope, $scope, httpFactory) {

    var mylong = $rootScope.coords.longitude;
    var mylat = $rootScope.coords.latitude;
    getLocation(mylong.toString(),mylat.toString());

    $scope.myevents = "Events";

    function getLocation(lat,long) {
        httpFactory.getLocation(lat,long)
            .then(function (response) {
                $scope.myevents = response.data;
            }, function (error) {
                console.log(error.message);
            });
    }
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