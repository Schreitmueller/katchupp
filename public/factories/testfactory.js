/**
 * Created by janschmutz on 27.03.17.
 */
angular.module('myModel', []).factory('test', function(){
    var users = ['John', 'James', 'Jake'];
    var factory = {};
    factory.getUsers = function (){
        return users;
    };
    return factory;
});