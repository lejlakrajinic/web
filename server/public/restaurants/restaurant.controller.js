(function() {
    'use strict';

    angular
        .module('app')
        .controller('Restaurants.CommentsController', Controller);

    function Controller($location, $localStorage, RestaurantsService, CommentsService) {
        var vm = this;
        vm.restaurantId = $location.path().split("/")[2];
        vm.restaurant = RestaurantsService.currentRestaurant;

        vm.newComment = {}
        vm.addComment = addComment;
        vm.getComments = getComments;
        vm.comments = []

        initController();

        function initController() {
            getComments();
        }

        function getComments() {
            CommentsService.getCommentsRestaurant(function(data) {
                vm.comments = data;
            }, vm.restaurantId);
        }

        function addComment() {
            vm.newComment.authorId = $localStorage.currentUser.username
            vm.newComment.restaurantId = vm.restaurantId
            console.log(vm.newComment)
            CommentsService.addComment(function(data) {
                vm.comments.push(vm.newComment);
                vm.newComment = {}
            }, vm.newComment)
        }
    }

})();