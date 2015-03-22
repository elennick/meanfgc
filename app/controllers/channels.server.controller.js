'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    Channel = mongoose.model('Channel');


var requestHttps = function(channelId,publishedAfter,nextPageToken) {
    
    var https = require('https');

    var path = '/youtube/v3/search?key=AIzaSyAhvqkZmykgopZc990N7NQvWGUkNEDlHes';
    path += ('&part=snippet');
    path += ('&maxResults=50');
    path += ('&channelId=' + channelId);
    path += ('&publishedAfter=' + publishedAfter);
    if (nextPageToken) {
        path += ('&pageToken=' + nextPageToken);
    }

    var options = {
        host: 'www.googleapis.com',
        path: path
    };

    var callback = function(response) {
        var request_data = '';

        response.on('data', function(chunk) {
            request_data += chunk;
        });

        response.on('end', function() {
            var json_data = JSON.parse(request_data);
            for (var i=0; i < json_data.items.length; i++) {
                var item = json_data.items[i];
                new Video({title: item.snippet.title, postDate: item.snippet.publishedAt, description: item.snippet.description,
                    postedBy: item.snippet.channelTitle, videoId: item.id.videoId}).save();
            }

            if (json_data.nextPageToken) {
                var nextPageToken = json_data.nextPageToken;
                console.log(nextPageToken);
                requestHttps(channelId, publishedAfter, nextPageToken);
            }
            else {
                console.log('done');
                Channel.findOne({'youtube_id': channelId}, 'last_updated', function(err, channel) {
                    if (err) {
                        console.log(err);
                    }
                    channel.last_updated = new Date().toISOString();
                    channel.save();
                });
            }
        });
    };

    https.request(options,callback).end();

};


exports.loadChannelVideos = function(req, res) {
    var channelName = req.query.channel;
    
    Channel.findOne({'name':channelName}, 'name youtube_id last_updated', function(err, channel) {
        if (err) console.log(err);
        if (channel) {
            var last_updated = new Date(channel.last_updated).toISOString();
            requestHttps(channel.youtube_id, last_updated, undefined);
        }
        else {
            res.sendStatus(404);
        }
    });

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