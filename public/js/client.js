/**
 * Created by janschmutz on 22.03.17.
 */
var app = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'LoginController', 'Ctrl2'])

app.run(function() {
    console.log("app run");

});