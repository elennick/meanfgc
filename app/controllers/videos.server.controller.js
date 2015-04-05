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
    var limit;

    try {
        limit = parseInt(req.param('limit'));
    } catch(err) {}

    if(!limit) {
        limit = 10;
    }

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
    var player = req.param('player');

    if(player) {
        var regex = new RegExp(player, 'i');
        var query = Video.find({ 'players.player': regex }).limit(10);

        query.exec(function(err, output) {
           if(err) {
               console.log(err);
               res.json(err);
           } else {
               var playersRes = [];
               for(var i = 0; i < output.length; i++) {
                   var video = output[i];
                   for(var j = 0; j < video.players.length; j++) {
                       var playerName = video.players[j].player;
                       if(playersRes.indexOf(playerName) === -1) {
                           playersRes.push(video.players[j].player);
                       }
                   }
               }
               res.json(playersRes);
           }
        });
    } else {
        res.send(404);
    }

};