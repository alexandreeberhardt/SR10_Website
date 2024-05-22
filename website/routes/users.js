var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const session = require('../utils/session.js');


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
router.get('/candidatures/:id_offre', function (req, res) {
  const session = req.session;
    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }
  const id_offre = req.params.id_offre;
  userModel.alreadyDetail(id_offre, function(err, result) {
      if (err) {
          console.error('Error fetching offer details', err);
          return res.status(500).send('Error fetching offer details');
      }
      if (result.length > 0) {
          res.render('users/detail_candidatures', { offre: result, user: req.session.user });
      } else {
          res.status(404).send('Offer not found');
      }
  });
});

router.post('/candidatures/:id_offre', function (req, res) {
  const id_offre = req.params.id_offre;
  const id_utilisateur = req.session.user.id_utilisateur; 
  const session = req.session;
  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
  userModel.already(id_offre, id_utilisateur, function (err, results) {
      if (err) {
          console.error('Error checking existing application', err);
          return res.status(500).send('Error processing your application');
      }
      if (results.length === 0) {
          return res.status(409).send('Vous n\'avez pas encore postulé à cette offre'); // Il faudra faire une page plus belle 
      } else {
        userModel.unpostule(id_offre, id_utilisateur, function (err, result) {
              if (err) {
                  console.error('Error unapplying for the offer', err);
                  return res.status(500).send('Error unapplying for the offer');
              }
              console.log("Vous venez de dépostuler ! id_offre :",id_offre, "id_utilisateur : ",id_utilisateur)
              res.send('Vous venez de dépostuler ! ')  // C'est ici qu'on pourra rajouter un pop-up qui annonce qu'on a posulé  ||| res.render('offres/offer');
          });
      }
  });
});

module.exports = router;
