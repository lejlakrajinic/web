var mongoose = require('mongoose');
var comment = require('../models/comment');
var config = require('../config');


//Add comment
exports.savecomment = function(req, res, next) {
    const text = req.body.comment;
    const restaurantId = req.body.restaurantId;
    const hotelId = req.body.hotelId;
    const authorId = req.body.authorId;

    if (!text || !(restaurantId || hotelId) || !authorId) {
        return res.status(400).send({
            success: false,
            message: 'Posted data is not correct or incompleted.'
        });
    }

    // Add new comment
    let ocomment = new comment({
        authorId: authorId,
        comment: text,
        restaurantId: restaurantId,
        hotelId: hotelId
    });

    ocomment.save(function(err) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        }

        res.status(201).json({
            success: true,
            message: 'comment saved successfully'
        });
    });
}

exports.delcomment = function(req, res, next) {
    comment.remove({
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
            message: 'comment removed successfully'
        });
    });
}

//get all comments for certain type
exports.getcomments = function(req, res, next) {
    if (!(req.params.hotelId || req.params.restaurantId)) {
        return res.status(400).send({
            success: false,
            message: 'Posted data is not correct or incompleted.'
        });
    }
    if (req.params.hotelId) {
        comment.find({
            hotelId: req.params.hotelId
        }).exec(function(err, comment) {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Error processing request ' + err
                });
            }
            res.status(201).json({
                success: true,
                data: comment
            });
        });
    } else {
        comment.find({
            restaurantId: req.params.restaurantId
        }).exec(function(err, comment) {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Error processing request ' + err
                });
            }
            res.status(201).json({
                success: true,
                data: comment
            });
        });
    }

}