/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('Ctrl2', []).controller('Controller2', function($scope) {

    $scope.tagline = 'Youre logged in';
    FB.api('/me/events', function(response) {
        console.log(response);

    });

});