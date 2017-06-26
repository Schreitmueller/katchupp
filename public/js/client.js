/**
 * Created by janschmutz on 22.03.17.
 */
var app = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'LoginController', 'CtrlLocation', 'CtrlHome'])
    .run(function($rootScope, $location) {
        console.log("app run");
        $rootScope.rootFunc = function () {
            initiateFBLogin();
        }

        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            if (response.status === 'connected') {
                $rootScope.$apply( function() {
                    $location.path("/location").replace();
                });
                testAPI();
            } else {
                /*initiateFBLogin();*/
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

            checkLoginState();

        };

        function initiateFBLogin()
        {
            FB.login(function(response) {
                checkLoginState();
            },{scope: 'public_profile,email,user_events'});
        }

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
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
        }
    });


