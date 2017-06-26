/**
 * Created by janschmutz on 27.03.17.
 */
angular.module('myModel', []).factory('httpFactory', ['$http', function($http){

    var urlBase = '/api/event';
    var factory = {};

    factory.getEvents = function () {
        return $http.get(urlBase);
    };
    factory.getEvent = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    factory.insertEvent = function (event) {
        return $http.post(urlBase, event);
    };
    factory.updateEvent = function (event) {
        return $http.put(urlBase + '/' + event._id, event)
    };
    factory.getLocation = function (lat,long) {
        return $http.get('api/location?lat='+lat+'&long='+long);
    };
    return factory;

}]);