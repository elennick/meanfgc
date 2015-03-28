'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

exports.getVideos = function(req, res) {
    var limit;

    try {
        limit = parseInt(req.param('limit'));
    } catch(err) {}

    if(!limit) {
        limit = 10;
    }

    var searchText = req.param('searchText');
    if(!searchText) {
        var query = Video.find({}).limit(limit);
        query.exec(function (err, docs) {
            res.json(docs);
        });
    } else {
        Video.textSearch(searchText, { limit: limit },
            function(err, output) {
                if(err) {
                    console.log(err);
                    res.json(err);
                } else {
                    var docs = [];
                    for (var i = 0; i < output.results.length; i++) {
                        var obj = output.results[i].obj;
                        docs.push(obj);
                    }
                    res.json(docs);
                }
            });
    }
};