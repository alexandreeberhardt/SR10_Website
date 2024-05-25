var express = require("express");
var router = express.Router();
var userModel = require("../model/user");
const session = require('../utils/session.js');
const sendMail = require('../utils/mail.js');
const user = require("../model/user");


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
          return res.status(409).render('users/cantunpostule', { title: "Cantunpostule",  offre: result, user: req.session.user });
      } else {
        userModel.unpostule(id_offre, id_utilisateur, function (err, result) {
              if (err) {
                  console.error('Error unapplying for the offer', err);
                  return res.status(500).send('Error unapplying for the offer');
              }
              console.log("Vous venez de dépostuler ! id_offre :",id_offre, "id_utilisateur : ",id_utilisateur)
              res.render('users/unpostule', { title: "Unpostule",  offre: result, user: req.session.user });
            });
      }
  });
});
router.post('/askedadmin', function (req, res) {
  const id_utilisateur = req.session.user.id_utilisateur; 
  const session = req.session;
  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
  userModel.alreadyadmin(id_utilisateur, function (err, results) {
      if (err) {
          console.error('Error checking existing application', err);
          return res.status(500).send('Error processing your application');
      }
      if (results.length === 0) {
          return res.status(409).render('users/cantunaskadmin');
      } else {
        userModel.unaskadmin(id_utilisateur, function (err, result) {
              if (err) {
                  console.error('Error unapplying for the offer', err);
                  return res.status(500).send('Error unapplying for the offer');
              }
              else {
              console.log("Vous venez de perdre vos droits admin mdr ! ")
              res.render('users/unaskedadmin');}
            });
      }
  });
});

router.post('/orga_cree/:siret', function (req, res) {
  const id_utilisateur = req.session.user.id_utilisateur; 
  const session = req.session;
  const siret = req.params.siret;

  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
  userModel.verifsiret(siret, function (err, results) {
      if (err) {
          console.error('Error checking existing application', err);
          return res.status(500).send('Error processing your application');
      }
      if (results.length === 0) {
          return res.status(409).send("Org non trouvée");
      } else {
        userModel.supporga(siret, function (err, result) {
              if (err) {
                  console.error('Error unapplying for the offer', err);
                  return res.status(500).send('Error unapplying for the offer');
              }
              else {
              console.log("Vous venez de supprimer votre organisation ! ")
              res.render('users/supporga');}
            });
      }
  });
});

router.get('/orga_cree/:siret', function (req, res) {
  const session = req.session;
    if (!session){
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }
  const siret = req.params.siret;
  userModel.verifsiret(siret, function(err, result) {
      if (err) {
          console.error('Error fetching offer details', err);
          return res.status(500).send('Error fetching offer details');
      }
      if (result.length > 0) {
          res.render('users/orga_cree', {siret: siret});
      } else {
          res.status(404).send('orga not found');
      }
  });
});


router.post('/makeadmin', function (req, res, next) {
  const session = req.session;
  if (!session){
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }

  const id_utilisateur = req.session.user.id_utilisateur; 
  userModel.alreadyadmin(id_utilisateur,function (err, result) {
    if (result.length>0){
      res.render('users/askedadmin');
    }
    else {
  userModel.makeAdmin(id_utilisateur, req.body.reason, function (err, email) {
      if(err){
          // gérer l'erreur; afficher un mesage d'erreur ? 
          res.redirect('/users/account');
      }
      else if (email) {
                sendMail(
                  "Demande d'élévation de privilège Recr'UT ",
                  "Bonjour " + session.user.prenom + ",\n\n" +
                  "Votre demande pour devenir administrateur a bien été prise en compte.\n\n" +
                  "Vous recevrez une réponse sous peu\n\n" +
                  "Si vous n'êtes pas à l'origine de cette action veuillez contacter le support. \n\n"+
                  "Une agréable journée à vous,\n\nL'équipe Recr'UT.",
                  session.user.email);
      } 
      res.render('users/askadmin');
  });
}
});
});



router.post('/add_org', function (req, res, next) {
  const session = req.session;
  if (!session){
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }

  const id_utilisateur = req.session.user.id_utilisateur; 
  userModel.addaddress(req.body.adresse, req.body.ville, req.body.postcode, req.body.pays, function (err, lieu){
    if(err){
      // gérer l'erreur; afficher un mesage d'erreur ? 
      console.log("C'est l'adresse qui bug");
      res.redirect('/users/account');
  }
  else if (lieu){

  userModel.createorg(req.body.siret, req.body.nom, lieu, req.body.type, id_utilisateur, function (err, email, siret) {
      if(err){
          // gérer l'erreur; afficher un mesage d'erreur ? 
          res.redirect('/users/account');
      }
      else if (email) {
                sendMail(
                  "Demande de création d'entreprise sur Recr'UT ",
                  "Bonjour" + session.user.prenom + ",\n\n" +
                  "Vous avez demandé à ajouter votre entreprise, nous allons la valider dans les plus brefs délais\n"+
                  "Une agréable journée à vous,\n\nL'équipe Recr'UT.",
                  session.user.email);
      } 
      res.redirect(302, `/users/orga_cree/${req.body.siret}`);

      //res.render('/users/orga_cree',{siret:req.body.siret});   // siret = req.body.siret
  });
}
});
});

router.get("/add_org", function (req, res, next) {
  res.render('/users/orga_cree',{siret:req.body.siret});
});

module.exports = router;
