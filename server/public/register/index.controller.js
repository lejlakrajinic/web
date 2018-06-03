(function () {
    'use strict';

    angular
        .module('app')
        .controller('Register.IndexController', Controller);

    function Controller($location, AuthenticationService) {
        var vm = this;

        vm.register = register;

        initController();

        function initController() {
        };

        function register() {
            vm.loading = true;
            AuthenticationService.Register(vm.user, function (result) {
                if (result) {
                    $location.path('/');
                } else {
                    vm.error = 'Bad request';
                    vm.loading = false;
                }
            });
        };
    }

})();