/**
 * Created by janschmutz on 27.03.17.
 */
angular.module('myModel', []).factory('test', ['$http', function($http){

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

    return factory;

}]);