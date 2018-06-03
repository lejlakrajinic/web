(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .service('APIInterceptor', function($rootScope, $localStorage, $location) {
            var service = this;
            service.responseError = function(response) {
                if (response.status === 401) {
                    $rootScope.$broadcast('unauthorized');
                    $localStorage.currentUser = null;
                    $location.path('/login');
                }
                return response;
            };
        })
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $httpProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('hotels', {
                url: '/hotels',
                templateUrl: 'hotels/index.view.html',
                controller: 'Hotels.IndexController',
                controllerAs: 'vm'
            })
            .state('hotelsAdd', {
                url: '/hotels/add',
                templateUrl: 'hotels/add.view.html',
                controller: 'Hotels.AddController',
                controllerAs: 'vm'
            })
            .state('hotelDetails', {
                url: '/hotels/{id}',
                templateUrl: 'hotels/hotel.view.html',
                controller: 'Hotels.CommentsController',
                controllerAs: 'vm'
            })
            .state('restaurants', {
                url: '/restaurants',
                templateUrl: 'restaurants/index.view.html',
                controller: 'Restaurants.IndexController',
                controllerAs: 'vm'
            })
            .state('restaurantsAdd', {
                url: '/restaurants/add',
                templateUrl: 'restaurants/add.view.html',
                controller: 'Restaurants.AddController',
                controllerAs: 'vm'
            })
            .state('restaurantDetails', {
                url: '/restaurants/{id}',
                templateUrl: 'restaurants/restaurant.view.html',
                controller: 'Restaurants.CommentsController',
                controllerAs: 'vm'
            })
            .state('blogs', {
                url: '/blogs',
                templateUrl: 'blogs/index.view.html',
                controller: 'Blogs.IndexController',
                controllerAs: 'vm'
            })
            .state('blogsAdd', {
                url: '/blogs/add',
                templateUrl: 'blogs/add.view.html',
                controller: 'Blogs.AddController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'register/index.view.html',
                controller: 'Register.IndexController',
                controllerAs: 'vm'
            });
            $httpProvider.interceptors.push('APIInterceptor');
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var publicPages = ['/login', '/register'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();