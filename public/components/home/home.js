/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('CtrlHome', ['myModel']).controller('HomeController', function($scope, httpFactory) {

    $scope.events;
    $scope.status;
    getEvents();

    function getEvents() {                       //Alle Events vom Server abfragen
        httpFactory.getEvents()
            .then(function (response) {            //Asynchron mit Promise
                $scope.events = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    function updateEvents(event) {                       
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

    FB.api('/me/events?fields=attending_count,category,description,start_time,place', function(response) {
        console.log(response);
    });

});