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
    var searchTextParam = params.searchText;
    var playerSearchParam = params.player;

    var query;

    if (searchTextParam) {
        query = this.find( { $text: { $search: searchTextParam } },
                           { score: { $meta: 'textScore' } } )
                    .sort( { score: { $meta: 'textScore' } } )
                    .limit( limit );
    } else if(playerSearchParam) {
        query = this.find( { 'players.player': playerSearchParam } )
                    .limit( limit );
    } else {
        query = this.find( {} )
                    .limit( limit );
    }

    query.exec(function (err, docs) {
        callback(err, docs);
    });
};

VideoSchema.statics.findPlayersLike = function(text, callback) {
    var regex = new RegExp(text, 'i');
    var query = this.find({ 'players.player': regex }).limit(10);

    query.exec(function(err, output) {
        if(err) {
            console.log(err);
            callback(err, output);
        } else {
            var playersRes = [];
            for(var i = 0; i < output.length; i++) {
                var video = output[i];
                for(var j = 0; j < video.players.length; j++) {
                    var playerName = video.players[j].player;
                    if(playersRes.indexOf(playerName) === -1) {
                        playersRes.push(video.players[j].player);
                    }
                }
            }
            callback(err, playersRes);
        }
    });
};

mongoose.model('Video', VideoSchema);
mongoose.model('Player', PlayerSchema);