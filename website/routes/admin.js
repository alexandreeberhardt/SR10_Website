var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const session = require('../utils/session.js');

/* GET users listing. */

router.post('/makeadmin', function (req, res, next) {
    const session = req.session;
    const id = session.user.id_utilisateur
    userModel.makeAdmin(id, req.body.reason, function (err, email) {
        if(err){
            // gérer l'erreur; afficher un mesage d'erreur ? 
            res.redirect('/users/account');
        }
        else if (email) {
                sendMail(
                    "Demande d'élévation de privilège Recr'UT ",
                    "Bonjour " + session.user.prenom + ",\n\n" +
                    "Votre demande pour devenir administrateur a bien été prise en compte.\n\n" +
                    "Vous recevrez une réponse sous peu\n\n" +
                    "Si vous n'êtes pas à l'origine de cette action veuillez contacter le support. \n\n"+
                    "Une agréable journée à vous,\n\nL'équipe Recr'UT.",
                    session.user.email);
        } 
        res.redirect('/users/account');
    });
});

module.exports = router;
