var express = require("express");
var router = express.Router();
var recruteurModel = require("../model/recruteur");
var offreModel = require("../model/offer");
var userModel = require("../model/user");
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
  console.log(filename)
  const filePath = `./uploads/${filename}`; 
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
  if (session.role != "Recruteur"){return res.status(403).send("Accès interdit.");}
  id = req.session.user.id_utilisateur;
  result = recruteurModel.getOrgForRecruteur(id, function (result) {
    res.render("recruteur/quit_org", { title: "Quitter une organisation", result: result });
  });
});


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
        res.render('/recruteur/account_recruteur', {title: 'Quittez une organisation', error: 'Une erreur est survenue lors de l opération.'});
      }
    });
});

router.post('/disable_offer', function (req, res) {
  const session = req.session;
  const id_offer = req.body.id_offre;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    result = recruteurModel.disableOffre(id_offer, function (err,result) {
      if(err){
        console.log("erreur disable offer")
      }
      res.redirect('/recruteur/recruter')
    });
});


router.post('/modifyint', function (req, res) {
  const session = req.session;
  const id_fp = req.body.id_fp;
  const new_int = req.body.int;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    result = recruteurModel.modifyIntitule(id_fp,new_int, function (err,result) {
      if(err){
        console.log("erreur disable offer")
      }
      res.redirect('/recruteur/recruter')
    });
});

router.post('/modifysmax', function (req, res) {
  const session = req.session;
  const id_fp = req.body.id_fp;
  const smax = req.body.smax;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    result = recruteurModel.modifySalMax(id_fp,smax, function (err,result) {
      if(err){
        console.log("erreur disable offer")
      }
      res.redirect('/recruteur/recruter')
    });
});

router.post('/modifysmin', function (req, res) {
  const session = req.session;
  const id_fp = req.body.id_fp;
  const smin = req.body.smin;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    result = recruteurModel.modifySalMin(id_fp,smin, function (err,result) {
      if(err){
        console.log("erreur disable offer")
      }
      res.redirect('/recruteur/recruter')
    });
});

router.post('/modifyrt', function (req, res) {
  const session = req.session;
  const id_fp = req.body.id_fp;
  const value = req.body.rythme;
  if (session.role != "Recruteur"){
      return res.status(403).send("Accès interdit.");
    
  }
    result = recruteurModel.modifyRTravail(id_fp,value, function (err,result) {
      if(err){
        console.log("erreur disable offer")
      }
      res.redirect('/recruteur/recruter')
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


router.get("/historique", function (req, res, next) {
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
  res.render("recruteur/historique", {
    title: "Historique",
    result: result,
    role: session.role
  });
});
});


router.get('/historique/:id_offre', async function (req, res) {
  const session = req.session;

  if (!session) {
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }
  if (session.role !== "Recruteur") {
    return res.status(403).send("Accès interdit.");
  }

  const id_offre = req.params.id_offre;

  try {
    const candidats = await new Promise((resolve, reject) => {
      recruteurModel.getAllCandidatsVerified(id_offre, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (candidats.length > 0) {
      await Promise.all(candidats.map(async (element) => {
        const id_cand = element['id_candidature'];
        element['files'] = [];
        try {
          const files = await new Promise((resolve, reject) => {
            offreModel.getFile(id_cand, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (files.length > 0) {
            files.forEach(item => {
              const path = String(item['path']);
              const downloadPath = path.replace('uploads','download');
              console.log(downloadPath)
              element['files'].push(downloadPath);
            });
          } else {
            console.log(`Aucun fichier trouvé pour l'id_candidature: ${id_cand}`);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération des fichiers", err);
          return res.status(500).send('Error fetching files');
        }
      }));
      console.log(candidats)
      res.render('recruteur/all_candidats_historique', { role: session.role, id_offre: id_offre, candidats: candidats });
    } else {
      res.status(304).send('Aucun utilisateur n\'a postulé ou votre offre n\'existe pas');
    }
  } catch (err) {
    console.error('Error fetching offer details', err);
    res.status(500).send('Error fetching offer details');
  }
});

router.get('/recruter/:id_offre', async function (req, res) {
  const session = req.session;

  if (!session) {
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }
  if (session.role !== "Recruteur") {
    return res.status(403).send("Accès interdit.");
  }

  const id_offre = req.params.id_offre;

  try {
    const candidats = await new Promise((resolve, reject) => {
      recruteurModel.getAllCandidats(id_offre, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (candidats.length > 0) {
      await Promise.all(candidats.map(async (element) => {
        const id_cand = element['id_candidature'];
        element['files'] = [];
        try {
          const files = await new Promise((resolve, reject) => {
            offreModel.getFile(id_cand, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
          if (files.length > 0) {
            files.forEach(item => {
              const path = String(item['path']);
              const downloadPath = path.replace('uploads','download');
              console.log(downloadPath)
              element['files'].push(downloadPath);
            });
          } else {
            console.log(`Aucun fichier trouvé pour l'id_candidature: ${id_cand}`);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération des fichiers", err);
          return res.status(500).send('Error fetching files');
        }
      }));
      console.log(candidats)
      res.render('recruteur/all_candidats', { role: session.role, id_offre: id_offre, candidats: candidats });
    } else {
      res.status(304).send('Aucun utilisateur n\'a postulé ou votre offre n\'existe pas');
    }
  } catch (err) {
    console.error('Error fetching offer details', err);
    res.status(500).send('Error fetching offer details');
  }
});


router.get('/candidature/:id_candidature/:state',async function (req, res){
  const session = req.session;
  const id_candidature = req.params.id_candidature;
  const state = req.params.state;
  if (!session) {
    return res.status(403).send("Accès interdit. Veuillez vous connecter.");
  }
  if (session.role !== "Recruteur") {
    return res.status(403).send("Accès interdit.");
  }
  recruteurModel.modifyCand(id_candidature,state,function(err,result){
    if(err){
      console.error('Erreur de la requete', err);
      return res.status(500).send('Erreur lors du traitement de votre demande.');
    }else{
      res.redirect('/recruteur/recruter')
    }
  })
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
