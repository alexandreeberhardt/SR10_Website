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


/* GET candidatures of user listing. */
router.get("/candidatures", function (req, res, next) {
  id = req.session.user.id_utilisateur;
  result = userModel.applied(id, function (result) {
    res.render("users/candidatures", { title: "Candidatures", result: result });
  });
});









module.exports = router;
