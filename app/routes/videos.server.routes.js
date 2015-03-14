'use strict';

module.exports = function(app) {
    // Root routing
    var videos = require('../../app/controllers/videos.server.controller');
    app.route('/videos').get(videos.getVideos);
};