(function () {
    'use strict';

    angular
        .module('app')
        .factory('CommentsService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.getCommentsHotel = getCommentsHotel;
        service.getCommentsRestaurant = getCommentsRestaurant;
        service.addComment = addComment;

        return service;

        function getCommentsHotel(callback,id) {
            $http.get('/api/hotels/'+id+'/comments')
                .success(function (response) {
                    if (response.success) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                });
        }

        function getCommentsRestaurant(callback,id) {
            $http.get('/api/restaurants/'+id+'/comments/')
                .success(function (response) {
                    if (response.success) {
                        callback(response.data);
                    } else {
                        callback(false);
                    }
                });
        }

        function addComment(callback,comment) {
            $http.post('/api/comments',comment)
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