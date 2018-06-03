const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    author: {type:String, required: true},
    title: {type:String, required: true},
    text: {type:String, required: true}
});

module.exports = mongoose.model('Blog', BlogSchema, 'Blog');
