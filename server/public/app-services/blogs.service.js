(function () {
    'use strict';

    angular
        .module('app')
        .factory('BlogsService', Service);

    function Service($http, $localStorage) {
        var service = {};
        
        service.getBlogs = getBlogs;
        service.addBlog = addBlog;

        return service;

        function addBlog(callback,blog) {
            $http.post('/api/blogs',blog)
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

        function getBlogs(callback) {
            $http.get('/api/blogs')
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