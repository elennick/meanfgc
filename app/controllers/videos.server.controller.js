'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

exports.getVideos = function(req, res) {
    var query = Video.find({}).limit(10);
    query.exec(function(err, docs) {
        res.json(docs);
    });
};