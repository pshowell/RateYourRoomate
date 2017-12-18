
var bCrypt = require('bcrypt-nodejs')

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if(user) {
                    return done(null, false, {
                        message: 'There is already an account associated with that email address'
                    });
                }else{
                    var userPassowrd = generateHash(password);

                    var data = {
                        email: email,
                        password: userPassowrd,
                        name: req.body.name,
                        picture: 'https://api.adorable.io/avatars/285/' + email + '.png',
                        location: req.body.location,
                        gender: req.body.gender,
                        age: req.body.age,
                        bio: req.body.bio
                    };

                    User.create(data).then(function(newUser, created) {
                        if(!newUser) {
                            return done(null, false);
                        }

                        if(newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            var User = user;
          var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if(!user) {
                    return done(null, false, {
                        message: 'No user with email address: ' + email
                    });
                }
                if(!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }

              var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log('Error:', err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if(user) {
                done(null, user.get());
            }else{
                done(user.errors, null);
            }
        });
    });
}
