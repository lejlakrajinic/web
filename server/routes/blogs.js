var mongoose = require('mongoose');
var blog = require('../models/blog');
var config = require('../config');


//Add or update blog
exports.saveblog = function(req, res, next) {
    const blogId = req.params.id;
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;

    if (!title || !text || !author) {
        return res.status(400).send({
            success: false,
            message: 'Posted data is not correct or incompleted.'
        });
    } else {

	// if id is present update blog
        if (blogId) {
            //Edit blog
            blog.findById(blogId).exec(function(err, blog) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }

                if (blog) {
                    blog.text = text;
                    blog.author = author;
                    blog.title = title;
                }
                blog.save(function(err) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            message: 'Error processing request ' + err
                        });
                    }
                    res.status(201).json({
                        success: true,
                        message: 'blog updated successfully'
                    });
                });
            });

        } else { //if not create a new one in database

            // Add new blog
            let oblog = new blog({
                author: author,
                title: title,
                text: text
            });

            oblog.save(function(err) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }

                res.status(201).json({
                    success: true,
                    message: 'blog saved successfully'
                });
            });

        }
    }
}

exports.delblog = function(req, res, next) {
    blog.remove({
        _id: req.params.id
    }, function(err) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        }
        res.status(201).json({
            success: true,
            message: 'blog removed successfully'
        });
    });
}

    // get all blogs
exports.getblogs = function(req, res, next) {
    blog.find({}).exec(function(err, blog) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        }
        res.status(201).json({
            success: true,
            data: blog
        });
    });
}