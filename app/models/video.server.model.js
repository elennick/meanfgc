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
        type: [String],
        trim: true,
        default: ''
    },
    description: {
        type: [String],
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
        unique: true,
        index: true,
        required: true,
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

VideoSchema.index({  description: 'text', title: 'text' });

VideoSchema.statics.findByParams = function (params, limit, callback) {
    console.log(params);
    var searchTextParam = params.searchText;
    var playerSearchParam = params.player;

    var query;

    if(!searchTextParam) {
        query = this.find({}).limit(limit);
        query.exec(function (err, docs) {
            callback(err, docs);
        });
    } else {
        query = this.find( { $text: { $search: searchTextParam } }).limit(limit);
        query.exec(function (err, docs) {
            callback(err, docs);
        });
    }
};

mongoose.model('Video', VideoSchema);
mongoose.model('Player',PlayerSchema);