/**
 * Created by janschmutz on 22.03.17.
 */
angular.module('LoginController', ['myModel']).controller('LoginController', function($scope, $location, test) {

    $scope.tagline = 'Facebook Login';
    $scope.test = test.getUsers();
    console.log($scope.test);

    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            $scope.$apply( function() {
                $location.path("/view2").replace();
            });
            /*testAPI();*/
        } else {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1862483477353186',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

});