var express = require('express');
var router = express.Router();
var recruteurModel = require('../model/recruteur');

router.get('/account_recruteur', function(req, res, next) {
  res.render('recruteur/account_recruteur', { title: 'Account Recruteur'});
});


router.get('/visualisation_offre', function(req, res, next) {
  result=recruteurModel.readCandidatures("En attente",function(result){
  res.render('recruteur/demande_recruteur', { title: 'Visualisation des offres', result:
  result });
});
});




module.exports = router;