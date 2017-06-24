/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('LoginController', ['myModel']).controller('LoginController', function($rootScope, $scope, $location, test) {
    $scope.tagline = 'Facebook Login';
    $scope.testFunc = $rootScope.rootFunc; //bind function to rootScop so it canbe accessed from main controller (js/routes.js)
});