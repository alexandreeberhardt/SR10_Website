var express = require("express");
var router = express.Router();
var recruteurModel = require("../model/recruteur");
var offreModel = require("../model/offer");
var userModel = require("../model/user");
const recruteur = require("../model/recruteur");
const session = require('../utils/session.js');
const { PassThrough } = require("nodemailer/lib/xoauth2/index.js");

router.get("/account_recruteur", function (req, res, next) {``

  const session = req.session;
  console.log(session.role)
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
  }

  res.render("recruteur/account_recruteur", { title: "Account Recruteur" });
});

router.get("/visualisation_offre", function (req, res, next) {
  const session = req.session;


  if (session.role != "Recruteur"){
    if (!session){$
      return res.status(403).send("Accès interdit.");
    }
  }

  result = recruteurModel.readCandidatures("En attente", function (result) {
    res.render("recruteur/demande_recruteur", {
      title: "Visualisation des offres",
      result: result,
    });
  });
});

router.get("/home_recruteur", function (req, res, next) {
  const session = req.session;

  if (session.role != "Recruteur"){
    
      return res.status(403).send("Accès interdit.");
    
  }

  result = offreModel.readAll("Active", function (result) {
    const session = req.session;

    res.render("recruteur/home_recruteur", {
      title: "Accueil recruteur",
      result: result,
    });
  });
});

/* GET candidatures of user listing. */
router.get("/candidatures", function (req, res, next) {
  const session = req.session;

  if (session.role != "Recruteur"){
    
      return res.status(403).send("Accès interdit.");
    
  }

  id = session.user.id_utilisateur;
  result = userModel.applied(id, function (result) {
    res.render("recruteur/candidatures", { title: "Candidatures", result: result });
  });
});

/* GET organisation of user. */
router.get("/quit_org", function (req, res, next) {
  const session = req.session;


  if (session.role != "Recruteur"){
    
      return res.status(403).send("Accès interdit.");
    
  }

  id = req.session.user.id_utilisateur;
  result = recruteurModel.getOrgForRecruteur(id, function (result) {
    res.render("recruteur/quit_org", { title: "Quitter une organisation", result: result });
  });
});


// à sécuriser dans le futur 
router.post('/quit_org', function (req, res, next) {
  const session = req.session;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    siret = req.body.Type;
    id = req.session.user.id_utilisateur;
    result = recruteurModel.quitOrg(id, siret, function (result) {
      if(result){
        res.redirect("/recruteur/account_recruteur")
      }else{
        // afficher un message d'erreur ?
        res.render('/recruteur/account_recruteur', {title: 'Quittez une organisation', error: 'Une erreur est survenue lors de l opération.'});
      }
    });
});


router.get("/recruter", function (req, res, next) {
  const session = req.session;

  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
    if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
  }
  id = session.user.id_utilisateur;
result = recruteurModel.readAllOffres(id, function (result) {
  console.log(result);
  res.render("recruteur/recruter", {
    title: "Visualisation des offres",
    result: result,
    role: session.role
  });
});
});



router.get('/recruter/:id_offre', function (req, res) {
  const session = req.session;

  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
    if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
  }
const id_offre = req.params.id_offre;

recruteurModel.getAllCandidats(id_offre, function(err, result) {
    if (err) {
        console.error('Error fetching offer details', err);
        return res.status(500).send('Error fetching offer details');
    }
    if (result.length > 0) {
        res.render('recruteur/all_candidats', {role: session.role, id_offre:id_offre, candidats: result});
    } else {
        res.status(404).send('Offer not found');
    }
});
});

module.exports = router;
