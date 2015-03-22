'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    Channel = mongoose.model('Channel');


var requestHttps = function(channelId,publishedAfter,nextPageToken, cb) {
    
    var https = require('https');
    var options = {
        host: 'www.googleapis.com',
        path: '/youtube/v3/search?key=AIzaSyAhvqkZmykgopZc990N7NQvWGUkNEDlHes'
    };

    options.path += ('&part=snippet');
    options.path += ('&maxResults=50');
    options.path += ('&channelId=' + channelId);
    options.path += ('&publishedAfter=' + publishedAfter);
    if (nextPageToken) {
        options.path += ('&nextPageToken=' + nextPageToken);
    }

    var callback = function(response) {
        var request_data = '';

        response.on('data', function(chunk) {
            request_data += chunk;
        });

        response.on('end', function() {
            if (cb && typeof cb === 'function') {
                cb(request_data);
            }
        });
    };

    https.request(options,callback).end();

};

exports.loadChannelData = function(req, res) {

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
            if (channel) console.log(channelData.name + ' channel already exists');
            else {
                new Channel(channelData).save();
                console.log(channelData.name + ' channel added');
            }
        });
    }
    res.send('OK');

};

exports.loadChannelVideos = function(req, res) {
    var channelName = req.query.channel;

    requestHttps('UC1UzB_b7NSxoRjhZZDicuqw', '2015-01-01T00:00:00Z', undefined, function(data) {
        var json_data = JSON.parse(data);
        if (json_data.nextPageToken) {
            console.log(JSON.stringify(json_data.nextPageToken));
            requestHttps('UC1UzB_b7NSxoRjhZZDicuqw','2015-01-01T00:00:00Z', json_data.nextPageToken, this); 
        }
        else {
            res.send('OK');
        }        
        res.send(JSON.stringify(json_data.nextPageToken));    
    });
    

    Channel.findOne({'name':channelName}, 'name youtube_id last_updated', function(err, channel) {
        if (err) console.log(err);
        if (channel) {

        }
    });

};


