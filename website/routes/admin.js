var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
var adminModel = require("../model/admin");

const session = require('../utils/session.js');

/* GET users listing. */

router.post('/makeadmin', function (req, res, next) {
    const session = req.session;

    if (session.role != "Administrateur"){
        if (!session){
          return res.status(403).send("Accès interdit.");
        }
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

    if (session.role != "Administrateur"){
        if (!session){
          return res.status(403).send("Accès interdit.");
        }
      }

    let results  = {
            "items1": [],
            "items2" : []
            }
    
    adminModel.demandeUsers(function(err,res1){
        if(err){
            res.render("error",err) 
        }else{
            // on fait appel à la 2e pour récupérer tout ce dont on a besoin
            console.log(res1)
            adminModel.demandeOrg(function(err,res2){
                if(err){
                    res.render("error",err) 
                }else{
                    // On ajoute tout dans le tableau
                    console.log(res2)
                }
            })

        }

    }
)

    res.render("admin/account", { title: "Account Admin" });
  });



module.exports = router;
