(function () {
    'use strict';

    angular
        .module('app')
        .controller('Hotels.AddController', Controller);

    function Controller($location, $localStorage, HotelsService) {
        var vm = this;
        vm.newHotel = {}
        vm.addHotel = addHotel;

        initController();

        function initController() {
        }

        function addHotel(){
            vm.newHotel.authorId = $localStorage.currentUser.username
        	HotelsService.addHotel(function(data){
        		if(!data){
        			console.log("Something went wrong");
        		}else{
        			$location.path('/hotels');
        		}
        	},vm.newHotel)
        }
    }

})();