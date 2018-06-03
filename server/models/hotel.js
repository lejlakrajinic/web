const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    authorId: {type:String, required: true},
    name: {type:String, required: true},
    description: {type:String, required: true}
});

module.exports = mongoose.model('hotel', HotelSchema, 'hotel');
