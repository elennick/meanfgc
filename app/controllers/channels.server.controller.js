'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    Channel = mongoose.model('Channel');


exports.loadChannelData = function(req, res) {

    var returned = [];

    var channelDataSet = [
        {
            name: 'YogaFlame24',
            youtube_id: 'UC1UzB_b7NSxoRjhZZDicuqw',
        }  
    ];

    for (var i=0; i < channelDataSet.length; i++) {
        var channelData = channelDataSet[i];
        Channel.findOne({ 'name':channelData.name }, 'name', function(err, channel) {
            if (err) console.log(err);
            if (channel) console.log(channelData.name + ' already exists');
            else {
                new Channel(channelData).save();
                console.log(channelData.name + 'added');
            }
        });
    }
    res.send('OK');

};

