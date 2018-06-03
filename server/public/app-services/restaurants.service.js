(function () {
    'use strict';

    angular
        .module('app')
        .factory('RestaurantsService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.getRestaurantById = getRestaurantById;
        service.getRestaurants = getRestaurants;
        service.addRestaurant = addRestaurant;
        service.currentRestaurant = {};

        return service;

        function addRestaurant(callback,restaurant) {
            $http.post('/api/restaurants',restaurant)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    } else {
                        callback(false);
                    }
                });
        }

        function getRestaurants(callback) {
            $http.get('/api/restaurants')
                .success(function (response) {
                    if (response) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                });
        }

        function getRestaurantById(callback,id) {
            $http.get('/api/restaurants/'+id)
                .success(function (response) {
                    if (response) {
                        callback(response);
                    } else {
                        callback(false);
                    }
                }).error(function(error){
                	callback(error);
                });
        }
    }
})();