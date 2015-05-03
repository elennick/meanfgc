'use strict';

module.exports = function(app) {
    // Root routing
    var videos = require('../../app/controllers/videos.server.controller');
    var channels = require('../../app/controllers/channels.server.controller');

    app.route('/videos').get(videos.getVideos);
    app.route('/players').get(videos.getPlayersAutocomplete);
};