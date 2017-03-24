/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/view1', {
            templateUrl: 'components/login/login.html',
            controller: 'LoginController'
        })

        .when('/view2', {
            templateUrl: 'components/vie2/view2.html',
            controller: 'Controller2'
        })
        .otherwise({redirectTo: '/view1'});

    $locationProvider.html5Mode(true);

}]);