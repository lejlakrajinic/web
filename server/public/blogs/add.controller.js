(function () {
    'use strict';

    angular
        .module('app')
        .controller('Blogs.AddController', Controller);

    function Controller($location, $localStorage, BlogsService) {
        var vm = this;
        vm.newBlog = {}
        vm.addBlog = addBlog;

        initController();

        function initController() {
        }

        function addBlog(){
            vm.newBlog.author = $localStorage.currentUser.username
        	BlogsService.addBlog(function(data){
        		if(!data){ // do same for error and success
                    $location.path('/blogs');
        		}else{
        			$location.path('/blogs');
        		}
        	},vm.newBlog)
        }
    }

})();