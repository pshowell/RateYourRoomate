var db = require("../models");
var passport = require("passport");
var application = application = require('./application');

module.exports = function(app) {
    app.get('/login', application.IsAuthenticated, function(req,res) {
        res.redirect("/users/" + req.user.username)
    })

    app.post('/authenticate',
    passport.authenticate('local',{
    successRedirect: '/login',
    failureRedirect: '/'
    })
    )
    app.get('/login', function(req,res) {
        res.render("login")
    })
    app.get('/logout', application.destroySession)

    app.get('/signup', function(req,res) {
        res.render("signup")

    })

        app.get('/authors', function(req,res) {
        res.render("authors")

    })


        app.get('/manage', function(req,res) {
        res.render("manage")

    })

    app.post('/register', function(req, res){
        db.User.findOne({where: {username: req.username}}).then(function (user){
            if(!user) {
                db.User.create({
                    username: req.body.username,
                    password: req.body.password,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName
                }).then(function(dbUser,err){
                    if (err) {
                        console.log(err);
                        res.redirect("/")
                    }
                });
            } else {
                console.log('user doesnt exist yet...');
                res.redirect('/signup')
            }
        })
        res.redirect('/')
    });
}
