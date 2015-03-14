'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

exports.getVideos = function(req, res) {
    var video = new Video();
    video.title = "EVO 2014 Quarterfinals";
    video.characters = [ "Ryu", "Guile" ];
    video.players = [ "Daigo", "Nuckledu" ];
    video.game = "Ultra Street Fighter 4";
    video.postedBy = "YogaFlame24";
    res.json(video);
};