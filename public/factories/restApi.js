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
    factory.getNearestCities = function(lat,long){
        // TODO PSC can't acces geobytes because of refused origin header
        var req = {
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: { 
                latlng : lat+","+long,
                key: "AIzaSyA0Zk0qkY2wof0ezmfB8TM3jzr08NKJ8ek"
            }
        };
        return $http(req);
    };
    return factory;

}]);