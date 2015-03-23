'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */

var PlayerSchema = new Schema({
    player: {
        type: String,
        trim: true,
        default: ''
    },
    character: {
        type: String,
        trim: true,
        default: ''
    }
});

var VideoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    players: [PlayerSchema],
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
    },
    type: {
        type: String,
        trim: true
    }

});


mongoose.model('Video', VideoSchema);
mongoose.model('Player',PlayerSchema);