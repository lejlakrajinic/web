(function () {
    'use strict';

    angular
        .module('app')
        .factory('HotelsService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.getHotelById = getHotelById;
        service.getHotels = getHotels;
        service.addHotel = addHotel;
        service.currentHotel = {};

        return service;

        function addHotel(callback,hotel) {
            $http.post('/api/hotels',hotel)
                .success(function (response) {
                    if (response.success) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                }).error(function(error){
                    console.log(error);
                });
        }

        function getHotels(callback) {
            $http.get('/api/hotels')
                .success(function (response) {
                    if (response.success) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                });
        }

        function getHotelById(callback,id) {
            $http.get('/api/hotels/'+id)
                .success(function (response) {
                    if (response.success) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                });
        }
    }
})();