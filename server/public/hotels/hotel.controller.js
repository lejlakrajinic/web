(function() {
    'use strict';

    angular
        .module('app')
        .controller('Hotels.CommentsController', Controller);

    function Controller($location, $localStorage, HotelsService, CommentsService) {
        var vm = this;
        vm.hotelId = $location.path().split("/")[2];
        vm.hotel = HotelsService.currentHotel;

        vm.newComment = {}
        vm.addComment = addComment;
        vm.getComments = getComments;
        vm.comments = []

        initController();

        function initController() {
            getComments();
        }

        function getComments() {
            CommentsService.getCommentsHotel(function(data) {
                vm.comments = data;
            }, vm.hotelId);
        }

        function addComment() {
            vm.newComment.authorId = $localStorage.currentUser.username
            vm.newComment.hotelId = vm.hotelId
            console.log(vm.newComment)
            CommentsService.addComment(function(data) {
                vm.comments.push(vm.newComment);
                vm.newComment = {}
            }, vm.newComment)
        }
    }

})();