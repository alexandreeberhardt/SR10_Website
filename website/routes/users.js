var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const session = require('../utils/session.js');

/* GET users listing. */

router.get("/account", function (req, res, next) {
  const session = req.session;

  if (!session){
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }

    res.render("users/account_candidat", {
      title: "Compte personnel Recr'uT",
    });
});


router.get("/candidatures", function (req, res, next) {
  const session = req.session;

  if (!session){
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }

  const id = req.session.user.id_utilisateur; 
  userModel.applied(id, function (err, result) {
    if (err) {
      console.error("Erreur lors de la récupération des candidatures:", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }
    res.render("users/candidatures", { title: "Candidatures", result: result });
  });
});



module.exports = router;
