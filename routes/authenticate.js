var authController = require('../controllers/auth_controller.js');

module.exports = function (app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/logout', authController.logout);
    app.get('/', authController.home);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));
    app.get('/home', function(req,res) {
          res.render("home")
      })

      app.get('/roommates', function(req,res) {
            res.render("roommates")
      })
    app.get('/roommate', function(req,res) {
                  res.render("roommate")

        })
        app.get('/dashboard', function(req,res) {
                      res.render("dashboard")

            })

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}
