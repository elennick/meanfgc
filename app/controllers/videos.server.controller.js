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
    video1.title = 'SXSW Gaming - USF4 - Daigo Umehara vs GamerBee [13.3.2015] @evo2k @SXSWGaming @CapcomFighters';
    video1.characters = [ 'Evil Ryu', 'Adon' ];
    video1.players = [ 'Daigo Umehara', 'Gamerbee' ];
    video1.game = 'Ultra Street Fighter 4';
    video1.postedBy = 'ifrgames';
    video1.event = 'SXSW 2015';
    video1.videoId = 'uPSZGjiIUU0';
    video1.type = 'Match';
    videos.push(video1);

    var video2 = new Video();
    video2.title = 'APEX 2015: USFIV: Liquid NuckleDu vs SnakeEyez';
    video2.characters = [ 'Zangief', 'Guile' ];
    video2.players = [ 'SnakeEyez', 'NuckleDu' ];
    video2.game = 'Ultra Street Fighter 4';
    video2.postedBy = 'Bifuteki';
    video2.event = 'APEX 2015';
    video2.videoId = 'V3Xt5H134uU';
    video2.type = 'Match';
    videos.push(video2);

    var video3 = new Video();
    video3.title = 'Injustice: GAU @ NLBC #16 - AGE ChrisG vs Tsunna/EMP Tom Brady';
    video3.characters = [ 'Green Arrow', 'Doomsday' ];
    video3.players = [ 'ChrisG', 'Tom Brady' ];
    video3.game = 'Injustice: Gods Among Us';
    video3.postedBy = 'Team Spooky After Hours';
    video3.event = 'NLBC #16';
    video3.videoId = 'JzuHJdYS7IQ';
    video3.type = 'Match';
    videos.push(video3);

    var video4 = new Video();
    video4.title = 'Super Street Fighter 4 Tutorial - Chapter 3 Part 1';
    video4.characters = [ ];
    video4.players = [ 'VesperArcade' ];
    video4.game = 'Super Street Fighter 4';
    video4.postedBy = 'VesperArcade';
    video4.event = 'None';
    video4.videoId = 'wX9Ke34vcO0';
    video4.type = 'Tutorial';
    videos.push(video4);

    res.json(videos);
};