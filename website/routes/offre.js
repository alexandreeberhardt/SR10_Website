var express = require("express");
var router = express.Router();
var offreModel = require("../model/offer");


router.get("/offer", function (req, res, next) {
  result = offreModel.readAll("En attente", function (result) {
    console.log(result);
    res.render("offres/offre", {
      title: "Visualisation des offres",
      result: result,
    });
  });
});



module.exports = router;
