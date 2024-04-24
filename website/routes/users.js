var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const { removeAllListeners } = require("../model/db");

/* GET users listing. */
router.get("/", function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render("usersList", { title: "List des utilisateurs", users: result });
  });
});

router.get("/userslist", function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render("users/userslist", {
      title: "List des utilisateurs",
      users: result,
    });
  });
});

router.get("/creation", function (req, res, next) {
    res.render("users/account_creation", {
      title: "Création d'un compte recr'uT",
      users: result,
    });
});

router.post("/creation", function (req, res, next) {
  var email = req.body.email;
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var tel = req.body.tel;
  var password = req.body.password;
  result = userModel.create(
    email,
    nom,
    prenom,
    password,
    tel,
    function (result) {
      res.render("users/account_creation", {
        title: "Création d'un compte recr'uT",
        users: result,
      });
    },
  );
});


router.get("/account", function (req, res, next) {
    res.render("users/account_candidat", {
      title: "Compte personnel Recr'uT",
    });
});


/* GET candidatures of user listing. */
router.get("/candidatures", function (req, res, next) {
  result = userModel.applied(3, function (result) {
    res.render("users/candidatures", { title: "List des utilisateurs", result: result });
  });
});









module.exports = router;
