'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

/**
 * Gets a list of videos and their associate data
 */
exports.getVideos = function(req, res) {
    var limit = parseLimit(req.param('limit'));

    Video.findByParams(req.query, limit, function(err, docs) {
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(docs);
        }
    });
};

/**
 * Gets a list of unique player names that are similar to the 'player' query param
 */
exports.getPlayersAutocomplete = function(req, res) {
    var text = req.param('player');
    var limit = parseLimit(req.param('limit'));

    if(text) {
        Video.findPlayersLike(text, function(err, docs) {
            if(err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(docs);
            }
        })
    } else {
        res.send(404);
    }
};

/**
 * Tries to parse a limit # out of a value and if it fails, just defaults to 10... helper function for video route
 * functions since most of them allow limit as a param
 */
var parseLimit = function(limit) {
    var parsedLimit;

    try {
        parsedLimit = parseInt(limit);
    } catch(err) {}

    if(!parsedLimit) {
        parsedLimit = 10;
    }

    return parsedLimit;
};