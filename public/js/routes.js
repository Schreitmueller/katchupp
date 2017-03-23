/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/view1', {
            templateUrl: 'views/view1.html',
            controller: 'Controller1'
        })

        .when('/view2', {
            templateUrl: 'views/view2.html',
            controller: 'Controller2'
        })
        .otherwise({redirectTo: '/view1'});

    $locationProvider.html5Mode(true);

}]);