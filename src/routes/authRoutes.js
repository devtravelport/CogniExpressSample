var express = require('express');
var passport = require('passport');
var mongodb = require('mongodb').MongoClient;

var router = function () {
    var authRouter = express.Router();

    authRouter
        .route('/signup')
        .post(function (req, res) {
            // var url = 'mongodb://localhost:27017/booksAPI'
            var url = 'mongodb://vishalgcogni:river808@ds127988.mlab.com:27988/booksapi'
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');

                var user = {
                    username: req.body.userName, //this username is from index.ejs
                    password: req.body.password
                }

                collection.insert(user, function (err, results) {
                    req
                        .login(results, function () {
                            res.redirect('/auth/profile')
                        })
                })
            })
        })

    authRouter
        .route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/')
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        })

    authRouter
        .route('/signIn')
        .post(passport.authenticate('local', {failureRedirect: '/'}), function (req, res) {
            res.redirect('/auth/profile');
        });
    return authRouter;
}

module.exports = router;