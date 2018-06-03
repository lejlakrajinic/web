(function () {
    'use strict';

    angular
        .module('app')
        .controller('Restaurants.IndexController', Controller);

    function Controller($location, $state, RestaurantsService) {
        var vm = this;
        vm.restaurants = {}
        vm.restaurantDetails = restaurantDetails

        initController();

        function initController() {
        	RestaurantsService.getRestaurants(function(restaurants){
        		vm.restaurants=restaurants;
        	})
        }

        function restaurantDetails(restaurant){
        	RestaurantsService.currentRestaurant = restaurant;
        	$state.go("restaurantDetails",{"id": restaurant._id});
        }
    }

})();