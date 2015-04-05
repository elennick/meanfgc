'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Player = mongoose.model('Player'),
    Video = mongoose.model('Video');

/**
 * Globals
 */
var video1, video2, dupeOfVideo1;
var player1, player2, player3, player4;

/**
 * Unit tests
 */
describe('Video Model Unit Tests:', function () {
    before(function (done) {
        player1 = new Player({
            player: 'Evan',
            character: 'Ryu'
        });
        player2 = new Player({
            player: 'BK',
            character: 'Rose'
        });
        player3 = new Player({
            player: 'Daigo',
            character: 'Evil Ryu'
        });
        player4 = new Player({
            player: 'JWong',
            character: 'Rufus'
        });

        video1 = new Video({
            title: 'This is a long and wordy title so that we can search on it.',
            description: 'Test Video 1',
            players: [player1, player2],
            postedBy: 'TestUser1',
            game: 'USF4',
            videoId: '1234567890',
            event: 'Evo',
            type: 'Match'
        });
        video2 = new Video({
            title: 'Test Title 2',
            description: 'This is a very elaborate description so that we can search on it.',
            players: [player3, player4],
            postedBy: 'TestUser2',
            game: 'UMVC3',
            videoId: '0987654321',
            event: 'CEO',
            type: 'Match'
        });
        dupeOfVideo1 = new Video({
            title: 'awegaewg',
            description: 'aewgewg',
            players: [player2, player4],
            postedBy: 'aewgaewg',
            game: 'aewgeg',
            videoId: '1234567890',
            event: 'aegaewg',
            type: 'awegaeg'
        });

        done();
    });

    describe('Video Model Get', function () {
        it('should start with no videos', function (done) {
            Video.find({}, function (err, docs) {
                docs.should.have.length(0);
                done();
            });
        });

        it('should be able to save videos', function (done) {
            video1.save(done);
        });

        it('should be able to save another video with a different video id', function (done) {
            video2.save(done);
        });

        it('should fail to save a video with an existing video id', function (done) {
            return dupeOfVideo1.save(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should fail to save a video with no video id', function (done) {
            dupeOfVideo1.videoId = '';
            return dupeOfVideo1.save(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to limit videos returned', function (done) {
            return Video.findByParams([], 1, function (err, docs) {
                should.not.exist(err);
                docs.should.have.length(1);
                done();
            });
        });

        it('should be able to return results by player name', function (done) {
            var params = {};
            params.player = player1.player;

            return Video.findByParams(params, 10, function (err, docs) {
                should.not.exist(err);
                docs.should.have.length(1);
                docs[0].players[0].player.should.equal(player1.player);
                done();
            });
        });

        it('should be able to return results by description', function (done) {
            var params = {};
            params.searchText = 'very elaborate description';

            return Video.findByParams(params, 1, function (err, docs) {
                should.not.exist(err);
                docs.should.have.length(1);
                docs[0].description[0].should.equal(video2.description[0]);
                done();
            });
        });

        it('should be able to return results by title', function (done) {
            var params = {};
            params.searchText = 'long and wordy title';

            return Video.findByParams(params, 1, function (err, docs) {
                should.not.exist(err);
                docs.should.have.length(1);
                docs[0].title[0].should.equal(video1.title[0]);
                done();
            });
        });

        //TODO this fails at the moment because player search is actually not implemented properly... it currently
        //TODO returns both players from a video in a result instead of just returning ones similar to the search text
//        it('should be able to return autocomplete results for player names', function (done) {
//            return Video.findPlayersLike('Eva', function (err, docs) {
//                should.not.exist(err);
//                docs.should.have.length(1);
//                docs[0].should.equal(player1.player);
//                done();
//            });
//        });
    });

    after(function (done) {
        Video.remove().exec();
        done();
    });
});