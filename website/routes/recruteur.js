var express = require("express");
var router = express.Router();
var recruteurModel = require("../model/recruteur");
var offreModel = require("../model/offer");
var userModel = require("../model/user");
const recruteur = require("../model/recruteur");
const session = require('../utils/session.js');
const { PassThrough } = require("nodemailer/lib/xoauth2/index.js");
const fs = require('fs');


router.get("/account_recruteur", function (req, res, next) {``
  let info = req.session.user;
  info.role = req.session.role;
  const session = req.session;
  console.log(session.role)
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
  }

  res.render("recruteur/account_recruteur", { title: "Account Recruteur",info:info });
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

router.get("/download/:filename", function (req, res) {
  console.log("coucou")
  const filename = req.params.filename;
  const filePath = `./upload/${filename}`; 
  console.log(filePath)
  fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {
          console.log(`Le fichier ${filePath} n'existe pas ou il n'y a pas de droit de lecture.`);
          return res.status(404).send("Le fichier demandé n'existe pas.");
      } else {
          res.download(filePath);
      }
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

        res.status(304).send('Aucun utilisateur n\'a postulé ou votre offre n\'existe pas');
    }
});
});

router.get("/poster_offre", function (req, res, next) {
  const session = req.session;

  if (!session){
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
    if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
  }
  id = session.user.id_utilisateur;
  recruteurModel.getIntitule(id,function(err,results){
    if (err) {
      console.error('Erreur lors du get intitule', err);
      return res.status(500).send('Erreur lors du traitement de votre demande.');
    }
    else {
      console.log(results);
      res.render("recruteur/poster_offre", {
        title: "Poster une offre",
        role: session.role,
        fiche_poste: results
      });
    } 
    });
    

  }
);

router.post('/creer_fiche_de_poste', function (req, res) {
  const session = req.session;
    
    if (!session) {
      return res.status(403).send("Accès interdit. Veuillez vous connecter.");
    }
  
    if (session.role != "Recruteur") {
      return res.status(403).send("Accès interdit.");
    }
  
    const id_offre = req.body.id_offre;
    const id_utilisateur = req.session.user.id_utilisateur;
    
    const {
      intitule,
      rythme_travail,
      salaire_min,
      salaire_max,
      description,
      statuts_poste,
      adresse,
      ville,
      postcode,
      pays,
      responsable_hierarchique
    } = req.body;
  
    if (!intitule || !rythme_travail || !salaire_min || !salaire_max || !description || !statuts_poste || !responsable_hierarchique || !adresse || !ville || !postcode || !pays) {
      return res.status(400).send("Tous les champs sont requis.");
    }
    userModel.addaddress(adresse, ville,postcode,pays,function(err, lieu){
      if (err) {
        console.error('Erreur lors de la création du lieu de la fiche de poste', err);
        return res.status(500).send('Erreur lors du traitement de votre demande.');
      }
      else if (lieu){
        recruteurModel.creerFichePoste(intitule, rythme_travail, salaire_min, salaire_max, description, statuts_poste, id_utilisateur, responsable_hierarchique, function (err, results) {
          if (err) {
            console.error('Erreur lors de la création de la fiche de poste', err);
            return res.status(500).send('Erreur lors du traitement de votre demande.');
          }
          res.render('recruteur/fiche_cree', {offre: result, user: req.session.user, role: session.role });
          console.log('Fiche de poste créée avec succès.');
        });
      }


    })
  
    
  });
   

  router.post('/creer_Offre', function (req, res) {
    const session = req.session;
      
      if (!session) {
        return res.status(403).send("Accès interdit. Veuillez vous connecter.");
      }
    
      if (session.role != "Recruteur") {
        return res.status(403).send("Accès interdit.");
      }
    
      const id_utilisateur = req.session.user.id_utilisateur;
      
      const {
        expiration, indications, fiche_poste
      } = req.body;
    
      if (!expiration || !indications || !fiche_poste) {
        return res.status(400).send("Tous les champs sont requis.");
      }
    
      recruteurModel.creerOffre( expiration, indications, fiche_poste, function (err, results) {
        if (err) {
          console.error('Erreur lors de la création de l\'offre', err);
          return res.status(500).send('Erreur lors du traitement de votre demande.');
        }
        else {
          recruteurModel.getIdOffre(function(err,idOffre){
            if (err) {
              console.error("Erreur lors de la récupération de  l'id de l'offre", err);
              return res.status(500).send('Erreur lors du traitement de votre demande.');
            }
            else {
              recruteurModel.getSiret(id_utilisateur,function(err,siret){
                if (err) {
                  console.error('Erreur lors de la récupération du siret', err);
                  return res.status(500).send('Erreur lors du traitement de votre demande.');
                }
                else {
                  console.log(siret[0].organisation, idOffre[0].id_offre);
                  recruteurModel.offreOrga(siret[0].organisation, idOffre[0].id_offre, function(err,results){
                    if (err) {
                      console.error('Erreur lors du post Offre Orga', err);
                      return res.status(500).send('Erreur lors du traitement de votre demande.');
                    }
                    else {
                      res.render('recruteur/offre_cree', {offre: result, user: req.session.user, role: session.role });
                      console.log("offre crée avec succès !");

                    }


                  })
                  

                }


              })

            }
          }
        
        )

        }
    
      });
    });






module.exports = router;
