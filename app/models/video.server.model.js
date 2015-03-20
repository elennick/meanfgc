'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var VideoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    characters: [{
        type: String,
        trim: true,
        default: ''
    }],
    players: [{
        type: String,
        trim: true
    }],
    postDate: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: String,
        trim: true
    },
    game: {
        type: String,
        trim: true
    },
    videoId: {
        type: String,
        trim: true
    },
    event: {
        type: String,
        trim: true
    }

});

mongoose.model('Video', VideoSchema);