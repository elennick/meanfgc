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
        default: Date.now
    }
});

mongoose.model('Channel', ChannelSchema);