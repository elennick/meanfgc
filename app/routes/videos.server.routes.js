'use strict';

module.exports = function(app) {
    // Root routing
    var videos = require('../../app/controllers/videos.server.controller');
    var channels = require('../../app/controllers/channels.server.controller');

    // user facing
    app.route('/videos').get(videos.getVideos);
    app.route('/players').get(videos.getPlayersAutocomplete);

    // admin facing
    app.route('/load_channel_data').get(channels.loadChannelData);
    app.route('/load_channel_videos').get(channels.loadChannelVideos);
    app.route('/parse_videos').get(channels.parseVideos);
};