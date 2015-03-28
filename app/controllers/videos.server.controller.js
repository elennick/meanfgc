'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

exports.getVideos = function(req, res) {
    var limit = req.param('limit');
    if(!limit) {
        limit = 10;
    }

    var searchText = req.param('search');
    if(!searchText) {
        var query = Video.find({}).limit(limit);
        query.exec(function (err, docs) {
            res.json(docs);
        });
    } else {
        Video.textSearch(searchText,
            { limit: limit },
            function(err, output) {
                if(err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log(output);
                    res.json(output);
                }
            });
    }
};