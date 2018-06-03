(function () {
    'use strict';

    angular
        .module('app')
        .controller('Restaurants.AddController', Controller);

    function Controller($location, $localStorage, RestaurantsService) {
        var vm = this;
        vm.newRestaurant = {}
        vm.addRestaurant = addRestaurant;

        initController();

        function initController() {
        }

        function addRestaurant(){
            vm.newRestaurant.authorId = $localStorage.currentUser.username
        	RestaurantsService.addRestaurant(function(data){
        		if(!data){
        			console.log("Something went wrong");
                    $location.path('/restaurants');
        		}else{
        			$location.path('/restaurants');
        		}
        	},vm.newRestaurant)
        }
    }

})();