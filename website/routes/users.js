var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const session = require('../utils/session.js');

/* GET users listing. */
router.get("/", function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render("usersList", { title: "List des utilisateurs", users: result });
  });
});

/* Pas utile pour notre application
router.get("/userslist", function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render("users/userslist", {
      title: "List des utilisateurs",
      users: result,
    });
  });
}); */

router.get("/creation", function (req, res, next) {
    res.render("users/account_creation", {
      title: "Création d'un compte recr'uT",
      users: result,
    });
});



router.get("/account", function (req, res, next) {
    res.render("users/account_candidat", {
      title: "Compte personnel Recr'uT",
    });
});


router.get("/candidatures", function (req, res, next) {
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
