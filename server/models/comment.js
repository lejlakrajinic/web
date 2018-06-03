const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    authorId: {type:String, required: true},
    hotelId: {type:String, required: false}, //one of these is required
    restaurantId: {type:String, required: false},
    comment: {type:String, required: true}
});

module.exports = mongoose.model('comment', CommentSchema, 'comment');
