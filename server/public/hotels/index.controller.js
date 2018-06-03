(function () {
    'use strict';

    angular
        .module('app')
        .controller('Hotels.IndexController', Controller);

    function Controller($location, $state, HotelsService) {
        var vm = this;
        vm.hotels = {}
        vm.hotelDetails = hotelDetails;

        initController();

        function initController() {
        	HotelsService.getHotels(function(hotels){
        		vm.hotels=hotels;
        	})
        }

        function hotelDetails(hotel){
        	HotelsService.currentHotel = hotel;
        	$state.go("hotelDetails",{"id": hotel._id});
        }
    }

})();