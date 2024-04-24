var express = require("express");
var router = express.Router();
var recruteurModel = require("../model/recruteur");
var offreModel = require("../model/offer");
var userModel = require("../model/user");
const recruteur = require("../model/recruteur");

router.get("/account_recruteur", function (req, res, next) {
  res.render("recruteur/account_recruteur", { title: "Account Recruteur" });
});

router.get("/visualisation_offre", function (req, res, next) {
  result = recruteurModel.readCandidatures("En attente", function (result) {
    res.render("recruteur/demande_recruteur", {
      title: "Visualisation des offres",
      result: result,
    });
  });
});



// attention route à modifier selon l'utilisateur donc il faudra importer et rendre
// disponible le contexte dans le code

router.get("/quit_org", function (req, res, next) {
  result = recruteurModel.getOrgForRecruteur(1, function (result) {
    res.render("recruteur/quit_org", {
      title: "Quitter une organisation",
      result: result,
    });
  });
});

router.get("/home_recruteur", function (req, res, next) {
  result = offreModel.readAll("Active", function (result) {
    res.render("recruteur/home_recruteur", {
      title: "Accueil recruteur",
      result: result,
    });
  });
});


/* GET candidatures of user listing. */
router.get("/candidatures", function (req, res, next) {
  result = userModel.applied(3, function (result) {
    res.render("recruteur/candidatures", { title: "List des utilisateurs", result: result });
  });
});



module.exports = router;
