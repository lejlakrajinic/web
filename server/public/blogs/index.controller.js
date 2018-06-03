(function () {
    'use strict';

    angular
        .module('app')
        .controller('Blogs.IndexController', Controller);

    function Controller($location, $state, BlogsService) {
        var vm = this;
        vm.blogs = {}

        initController();

        function initController() {
        	BlogsService.getBlogs(function(blogs){
        		vm.blogs=blogs;
        	})
        }
    }

})();