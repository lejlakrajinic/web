(function() {
    'use strict';

    angular
        .module('app')
        .service('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Register = Register;
        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Register(user, callback) {
            $http.post('/api/signup', user)
                .success(function(response) {
                    callback(true);
                })
                .error(function(error) {
                    callback(false);
                });
        }

        function Login(username, password, callback) {
            $http.post('/api/login', {
                    username: username,
                    password: password
                })
                .success(function(response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {
                            username: username,
                            token: response.token
                        };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(response);
                    }
                })
                .error(function(error) {
                    console.log(error);
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();