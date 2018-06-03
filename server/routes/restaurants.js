var mongoose = require('mongoose');
var restaurant = require('../models/restaurant');
var config = require('../config');


//Add or update restaurant
exports.saverestaurant = function(req, res, next) {
    const restaurantId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const authorId = req.body.authorId;

    if (!name || !description || !authorId) {
        return res.status(400).send({
            success: false,
            message: 'Posted data is not correct or incompleted.'
        });
    } else {

	// if id is present update restaurant
        if (restaurantId) {
            //Edit restaurant
            restaurant.findById(restaurantId).exec(function(err, restaurant) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }

                if (restaurant) {
                    restaurant.description = description;
                    restaurant.authorId = authorId;
                    restaurant.name = name;
                }
                restaurant.save(function(err) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            message: 'Error processing request ' + err
                        });
                    }
                    res.status(201).json({
                        success: true,
                        message: 'restaurant updated successfully'
                    });
                });
            });

        } else { //if not create a new one in database

            // Add new restaurant
            let orestaurant = new restaurant({
                authorId: authorId,
                name: name,
                description: description
            });

            orestaurant.save(function(err) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'Error processing request ' + err
                    });
                }

                res.status(201).json({
                    success: true,
                    message: 'restaurant saved successfully'
                });
            });

        }
    }
}

exports.delrestaurant = function(req, res, next) {
    restaurant.remove({
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
            message: 'restaurant removed successfully'
        });
    });
}

exports.getrestaurant = function(req, res, next) {
        restaurant.find({
            _id: req.params.id
        }).exec(function(err, restaurant) {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Error processing request ' + err
                });
            }
            res.status(201).json({
                success: true,
                data: restaurant
            });
        });
    }
    // get all restaurants
exports.getrestaurants = function(req, res, next) {
    restaurant.find({}).exec(function(err, restaurant) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        }
        res.status(201).json({
            success: true,
            data: restaurant
        });
    });
}