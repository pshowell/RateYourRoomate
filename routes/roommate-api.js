var path = require('path');
var models = require('../models');

module.exports = function (app) {

    //Post new with picture
    app.post('/api/roommates', function (req, res) {
      var imgPath;
      var rmId = req.body.id;


        if (req.files.roommatePicture){
            return res.status(400).send('No files were uploaded.');
            var roommatePicture = req.files.roommatePicture;
            var rmId = req.user.id;
            var imgPath = '/RoommateImages/' +  rmId+ '_' + req.body.rmname + '.jpeg';

          roommatePicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });

        } else {
            imgPath = 'https://api.adorable.io/avatars/285/' + req.body.rmname + '.png'
        }

        models.Roommates.create({
            rmname: req.body.rmname,
            rmId: rmId,
            rmpicture: imgPath,
            rlocation: req.body.rlocation,
            rmgender: req.body.rmgender,
            withRoom: req.body.withRoom,
            rmage: req.body.rmage,
            rmbio: req.body.rmbio
        }).then(function () {
            res.redirect('/profile/view-roommates');
        });

    });

    //Upload roommate picture
    app.post('/api/newroommateimg/upload', function (req, res) {
        if (!req.files.roommatePicture) {
            return res.status(400).send('No files were uploaded');
        }

        var roommatePicture = req.files.roommatePicture;
<<<<<<< Updated upstream
        var roommateId = req.body.rmId;
=======
        var rmId = req.body.id;
>>>>>>> Stashed changes
        console.log(rmId);
        var imgPath = '/RoommateImages/' + rmId + '_' + req.body.rmname + '.jpeg';

        roommatePicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            models.Roommates.update({
                rmpicture: imgPath
            }, {
                where: {
                    id: rmId
                }
            });
            res.redirect('/profile/view-roommates');
        });
    });

    //Updating roommmate's info
    app.put('/api/update-roommate', function (req, res) {
        models.Roommates.update({
            rmname: req.body.rmname,
            rlocation: req.body.rlocation,
            withRoom: req.body.withRoom,
            rmage: req.body.rmage,
            rmgender:req.body.rmgender,
            rmbio: req.body.rmbio
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbRoommates) {
            res.redirect('/profile/view-roommates');
        });
    });

    //Delete roommate
    app.delete('/api/delete-roommate/:id', function (req, res) {
        models.Roommates.destroy({
            where: {
                id: req.params.rmId
            }
        }).then(function (dbRoommates) {
            res.send('deleted');
        });
    });

    //Get roommate
    app.get('/api/roommate/:id', function (req, res) {
        models.Roommates.findOne({
            where: {
                id: req.params.rmId * 1
            }
        }).then(function (dbRoommates) {
            res.redirect('/profile/view-roommates');
        });
    });
}
