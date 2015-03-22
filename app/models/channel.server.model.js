'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var ChannelSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: ''
    },
    youtube_id: {
        type: String,
        trim: true,
        default: ''
    },
    last_updated: {
        type: Date,
        trim: true,
        default: '1970-01-01T05:00:00.000Z'
    },
});

mongoose.model('Channel', ChannelSchema);