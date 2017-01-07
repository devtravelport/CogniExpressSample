var passport = require('passport');
var localStrategy = require('passport-local');
var mongodb = require('mongodb').MongoClient;

var strategyFunction = function () {
    passport.use(new localStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, function (usernameInput, passwordInput, done) {
        //Sign In var url = 'mongodb://localhost:27017/booksAPI'
        var url = 'mongodb://vishalgcogni:river808@ds127988.mlab.com:27988/booksapi'
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');
            collection.findOne({
                username: usernameInput
            }, function (err, results) {
                if (results.password === passwordInput) {
                    var user = results;
                    done(null, user);
                } else {
                    done(null, false)
                }
            })
        })
    }))
    //return strategyFunction;
}

module.exports = strategyFunction;
