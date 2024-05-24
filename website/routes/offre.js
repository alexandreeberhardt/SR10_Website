var express = require("express");
var router = express.Router();
var offreModel = require("../model/offer");
const session = require('../utils/session.js');


router.get("/offer", function (req, res, next) {
    const session = req.session;

    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

  result = offreModel.readAll("Active", function (result) {
    console.log(result);
    res.render("offres/offre", {
      title: "Visualisation des offres",
      result: result,
    });
  });
});

router.get('/:id_offre', function (req, res) {
    const session = req.session;

    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

  const id_offre = req.params.id_offre;
  offreModel.offreDetail(id_offre, function(err, result) {
      if (err) {
          console.error('Error fetching offer details', err);
          return res.status(500).send('Error fetching offer details');
      }
      if (result.length > 0) {
          res.render('offres/detail_offre', {offre: result, user: req.session.user });
      } else {
          res.status(404).send('Offer not found');
      }
  });
});


router.post('/:id_offre', function (req, res) {
    const session = req.session;
    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }

    const id_offre = req.params.id_offre;
    const id_utilisateur = req.session.user.id_utilisateur; 

    offreModel.already(id_offre, id_utilisateur, function (err, results) {
        if (err) {
            console.error('Error checking existing application', err);
            return res.status(500).send('Error processing your application');
        }
        if (results.length > 0) {
            res.status(409).render('offres/dejapostule', { title: "Postule",  offre: result, user: req.session.user });
        } else {
            offreModel.postule(id_offre, id_utilisateur, function (err, result) {
                if (err) {
                    console.error('Error applying for the offer', err);
                    return res.status(500).send('Error applying for the offer');
                }
                console.log("Vous venez de postuler ! id_offre :",id_offre, "id_utilisateur : ",id_utilisateur)
                res.render('offres/postule', { title: "Postule",  offre: result, user: req.session.user });
            });
        }
    });
});

module.exports = router;
