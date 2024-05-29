var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
var adminModel = require("../model/admin");

const session = require('../utils/session.js');

/* GET users listing. */

router.post('/makeadmin', function (req, res, next) {
    const session = req.session;

    if (session.role != "Administrateur"){
          return res.status(403).send("Accès interdit.");
    }

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


router.get("/account", function (req, res, next) {
    const session = req.session;

    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }

    adminModel.demandeUsers((err, result1) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return res.status(500).send('Une erreur est survenue lors de la récupération des utilisateurs.');
        }
        adminModel.demandeOrg((result2) => {
            if(!result2) {
                console.error('Erreur lors de la récupération des organisations :', err);
                return res.status(500).send('Une erreur est survenue lors de la récupération des organisations.');    
            }
            const results = {
                "users": result1,
                "org": result2
            };
            console.log(results)
            res.render("admin/account", { title: "Account Admin", data : results });
        })

    });
});


router.get('/makeadmin/:id_user', function (req, res) {
    const id_user = req.params.id_user;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.demandeUsersbyId(id_user, function(err, result) {
        if (err) {
            console.error('Error fetching user details', err);
            return res.status(500).send('Error fetching user details');
        }   
        result = JSON.stringify(result)
        result = JSON.parse(result)
        const final = result[0]
        console.log(final)

        res.render('admin/makeadmin', 
        { 
            title: "valider une demande d'utilisateur", 
            nom: final.nom, prenom : final.prenom, id : final.id, 
            role:final.role, reason : final.reason
        });
    });
});

router.get('/acceptorg/:siret', function (req, res) {
    const id_user = req.params.siret;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    adminModel.demandeOrgbyId(id_user, function(err, result) {
        if (err) {
            console.error('Error fetching org details', err);
            return res.status(500).send('Error fetching org details');
        }   
        result = JSON.stringify(result)
        result = JSON.parse(result)
        const final = result[0]
        console.log(final)

        res.render('admin/acceptorg', 
        { 
            title: "valider une demande d'organisation", 
            result: final
        });
    });
});

router.post('/makeadmin/:id_user', function (req, res) {
    const id_user = req.params.id_user;
    const session = req.session;
    if (session.role !== "Administrateur") {
        return res.status(403).send("Accès interdit.");
    }
    
    // send data to database

});



module.exports = router;