'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video');

exports.getVideos = function(req, res) {
    var videos = [];

    var video1 = new Video();
    video1.title = 'CEO Pools';
    video1.characters = [ 'Ryu', 'Guile' ];
    video1.players = [ 'Daigo', 'Nuckledu' ];
    video1.game = 'Ultra Street Fighter 4';
    video1.postedBy = 'YogaFlame24';
    video1.event = 'CEO 2013';
    videos.push(video1);

    var video2 = new Video();
    video2.title = 'SXSW Finals';
    video2.characters = [ 'Ryu', 'Guile' ];
    video2.players = [ 'Daigo', 'Nuckledu' ];
    video2.game = 'Ultra Street Fighter 4';
    video2.postedBy = 'bafael';
    video2.event = 'SXSW 2015';
    videos.push(video2);

    var video3 = new Video();
    video3.title = 'EVO 2014 Quarterfinals';
    video3.characters = [ 'Ryu', 'Guile' ];
    video3.players = [ 'Daigo', 'Nuckledu' ];
    video3.game = 'Ultra Street Fighter 4';
    video3.postedBy = 'YogaFlame24';
    video3.event = "Evolution 2014";
    videos.push(video1);

    res.json(videos);
};