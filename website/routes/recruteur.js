var express = require('express');
var router = express.Router();
var recruteurModel = require('../model/recruteur');
var offreModel = require('../model/offer');


router.get('/account_recruteur', function(req, res, next) {
  res.render('recruteur/account_recruteur', { title: 'Account Recruteur'});
});


router.get('/visualisation_offre', function(req, res, next) {
  result=recruteurModel.readCandidatures("En attente",function(result){
  res.render('recruteur/demande_recruteur', { title: 'Visualisation des offres', result:
  result });
});
});

router.get('/home_recruteur', function(req, res, next) {
  result=offreModel.readAll("Active",function(result){
  res.render('recruteur/home_recruteur', { title: 'Accueil recruteur', result:
  result });
});
});



module.exports = router;
