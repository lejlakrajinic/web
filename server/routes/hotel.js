var mongoose = require('mongoose');
var hotel = require('../models/hotel');
var config = require('../config');


//Add or update hotel
exports.savehotel = function(req, res, next) {
    const hotelId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const authorId = req.body.authorId;

    if (!name || !description || !authorId) {
        return res.status(400).send({
            success: false,
            message: 'Posted data is not correct or incompleted.'
        });
    } else {

	// if id is present update hotel
        if (hotelId) {
            //Edit hotel
            hotel.findById(hotelId).exec(function(err, hotel) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }

                if (hotel) {
                    hotel.description = description;
                    hotel.authorId = authorId;
                    hotel.name = name;
                }
                hotel.save(function(err) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'Error processing request ' + err
                        });
                    }
                    res.status(201).json({
                        success: true,
                        message: 'hotel updated successfully'
                    });
                });
            });

        } else { //if not create a new one in database

            // Add new hotel
            let ohotel = new hotel({
                authorId: authorId,
                name: name,
                description: description
            });

            ohotel.save(function(err) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }
                res.status(201).json({
                    success: true,
                    message: 'hotel saved successfully',
                    data: ohotel
                });
            });

        }
    }
}

exports.delhotel = function(req, res, next) {
    hotel.remove({
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
            message: 'hotel removed successfully'
        });
    });
}

exports.gethotel = function(req, res, next) {
        hotel.find({
            _id: req.params.id
        }).exec(function(err, hotel) {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Error processing request ' + err
                });
            }
            res.status(201).json({
                success: true,
                data: hotel
            });
        });
    }
    // get all hotels
exports.gethotels = function(req, res, next) {
    hotel.find({}).exec(function(err, hotel) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        }
        res.status(201).json({
            success: true,
            data: hotel
        });
    });
}